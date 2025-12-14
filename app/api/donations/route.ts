import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@utils/Prisma'
import CryptoJS from 'crypto-js'

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

function ipaymuTimestamp(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  )
}

async function createIpaymuDirectPayment(body: {
  name: string
  phone: string
  email: string
  amount: number
  comments: string
  notifyUrl: string
  referenceId: string
  paymentMethod: string
  paymentChannel: string
}) {
  const baseUrl = requireEnv('IPAYMU_BASE_URL')
  const va = requireEnv('IPAYMU_VA')
  const apiKey = requireEnv('IPAYMU_API_KEY')

  const timestamp = ipaymuTimestamp()
  const method = 'POST'
  const path = '/api/v2/payment/direct'

  const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body))
  const stringToSign = `POST:${va}:${bodyEncrypt}:${apiKey}`
  const signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringToSign, apiKey))

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      va,
      signature,
      timestamp,
    },
    body,
  })

  return {
    ok: res.ok,
    status: res.status,
    json,
  }
}

/* =======================
   Utils
======================= */

function toBigIntOrNull(value: unknown): bigint | null {
  if (value === null || value === undefined) return null
  if (typeof value === 'bigint') return value
  if (typeof value === 'number' && Number.isFinite(value)) return BigInt(Math.trunc(value))
  if (typeof value === 'string' && /^[0-9]+$/.test(value)) return BigInt(value)
  return null
}

async function resolveProjectId(projectId: unknown): Promise<bigint | null> {
  const asBigInt = toBigIntOrNull(projectId)
  if (asBigInt !== null) return asBigInt

  if (typeof projectId === 'string' && projectId.trim()) {
    const project = await prisma.project.findUnique({
      where: { projectId },
      select: { id: true },
    })
    if (project) return project.id
  }

  return null
}

function safeJsonDonation(row: any) {
  return {
    ...row,
    id: String(row.id),
    project_id: row.project_id ? String(row.project_id) : null,
    user_id: row.user_id ? String(row.user_id) : null,
    amount: String(row.amount),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      projectId,
      amount,
      donorName,
      donorEmail,
      donorPhone,
      paymentMethod,
      paymentChannel,
      anonymous,
      message,
      userId,
    } = body

    if (!amount || Number(amount) < 10000) {
      return NextResponse.json(
        { success: false, error: 'Minimum donation is Rp 10,000' },
        { status: 400 },
      )
    }

    if (!donorName || !donorEmail) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 },
      )
    }

    const project_id = await resolveProjectId(projectId)
    const user_id = toBigIntOrNull(userId)
    const donationId = `DON-${Date.now()}`

    const created = await prisma.donations.create({
      data: {
        donation_id: donationId,
        project_id,
        user_id,
        donor_name: anonymous ? 'Anonymous' : donorName,
        donor_email: donorEmail,
        donor_phone: donorPhone ?? null,
        amount: BigInt(amount),
        status: 'pending',
        payment_method: paymentMethod ?? 'va',
        payment_channel: paymentChannel ?? 'bca',
        message: message ?? null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    })

    // ⚠️ MATCH OFFICIAL SAMPLE TYPES
    const ipaymuPayload = {
      name: created.donor_name,
      phone: created.donor_phone ?? '',
      email: created.donor_email,
      amount: Number(created.amount), // NUMBER (important)
      comments: `Donation ${created.donation_id}`,
      notifyUrl: requireEnv('IPAYMU_NOTIFY_URL'),
      referenceId: created.donation_id,
      paymentMethod: created.payment_method,
      paymentChannel: created.payment_channel,
    }

    const payRes = await createIpaymuDirectPayment(ipaymuPayload)

    if (!payRes.ok) {
      await prisma.donations.update({
        where: { donation_id: created.donation_id },
        data: { status: 'failed' },
      })

      return NextResponse.json(
        { success: false, error: 'iPaymu failed', details: payRes.json },
        { status: 502 },
      )
    }

    const data = payRes.json?.Data

    const updated = await prisma.donations.update({
      where: { donation_id: created.donation_id },
      data: {
        status: 'processing',
        transaction_id: data?.TransactionId ? String(data.TransactionId) : null,
        metadata: { ipaymu: payRes.json },
        updated_at: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      donation: safeJsonDonation(updated),
      ipaymu: payRes.json,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

/* =======================
   GET – Payment Channels
======================= */

export async function GET() {
  try {
    const baseUrl = requireEnv('IPAYMU_BASE_URL')
    const va = requireEnv('IPAYMU_VA')
    const apiKey = requireEnv('IPAYMU_API_KEY')

    const timestamp = ipaymuTimestamp()

    const empty = ''
    const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(empty))
    const stringToSign = `GET:${va}:${bodyEncrypt}:${apiKey}`
    const signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringToSign, apiKey))

    const res = await fetch(`${baseUrl}/api/v2/payment-channels`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        va: va,
        timestamp: timestamp,
        signature: signature,
      },
      cache: 'no-store',
    })

    const json = await res.json()
    return NextResponse.json(json)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payment channels' },
      { status: 500 },
    )
  }
}
