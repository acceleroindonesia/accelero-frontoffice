import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@utils/Prisma'

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

function ipaymuTimestamp(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  )
}

function sha256Hex(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex')
}

function hmacSha256Hex(secret: string, input: string): string {
  return crypto.createHmac('sha256', secret).update(input).digest('hex')
}

async function createIpaymuDirectPayment(params: Record<string, unknown>) {
  const baseUrl = requireEnv('IPAYMU_BASE_URL')
  const va = requireEnv('IPAYMU_VA')
  const apiKey = requireEnv('IPAYMU_API_KEY')

  // ✅ use iPaymu-style timestamp
  const timestamp = ipaymuTimestamp()

  const form = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) form.append(key, String(item))
    } else if (value !== undefined && value !== null) {
      form.append(key, String(value))
    }
  }

  const bodyString = form.toString()
  const bodyHash = sha256Hex(bodyString)

  const method = 'POST'
  const path = '/api/v2/payment/direct'
  const stringToSign = `${method}:${va}:${bodyHash}:${apiKey}`
  const signature = hmacSha256Hex(apiKey, stringToSign)

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      va,
      timestamp,
      // ✅ DO NOT COMMENT THIS OUT
      signature,
    },
    body: bodyString,
  })

  const json = await res.json().catch(() => null)

  return {
    ok: res.ok,
    status: res.status,
    json,
  }
}

function toBigIntOrNull(value: unknown): bigint | null {
  if (value === null || value === undefined) return null
  if (typeof value === 'bigint') return value
  if (typeof value === 'number' && Number.isFinite(value)) return BigInt(Math.trunc(value))
  if (typeof value === 'string') {
    const v = value.trim()
    if (v === '' || v.toLowerCase() === 'general') return null
    if (/^[0-9]+$/.test(v)) return BigInt(v)
  }
  return null
}

async function resolveProjectId(projectId: unknown): Promise<bigint | null> {
  // Accept: null / "general" / numeric id / string project_id from projects table
  const asBigInt = toBigIntOrNull(projectId)
  if (asBigInt !== null) return asBigInt

  if (typeof projectId === 'string') {
    const key = projectId.trim()
    if (key === '' || key.toLowerCase() === 'general') return null

    const project = await prisma.project.findUnique({
      where: { projectId: key }, // maps to projects.project_id (string)
      select: { id: true },
    })

    if (project) return project.id
  }

  // If still not resolved, treat as invalid input
  throw new Error('Invalid projectId')
}

function safeJsonDonation(row: any) {
  // Prevent BigInt JSON crash
  return {
    ...row,
    id: typeof row.id === 'bigint' ? row.id.toString() : row.id,
    project_id: typeof row.project_id === 'bigint' ? row.project_id.toString() : row.project_id,
    user_id: typeof row.user_id === 'bigint' ? row.user_id.toString() : row.user_id,
    amount: typeof row.amount === 'bigint' ? row.amount.toString() : row.amount,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      projectId,
      amount,
      frequency,
      motivation,
      message,
      donorName,
      donorEmail,
      donorPhone,
      anonymous,
      newsletter,
      userId,
      paymentMethod,
      paymentChannel,
    } = body

    // Validation
    if (!amount || Number(amount) < 10000) {
      return NextResponse.json(
        { success: false, error: 'Minimum donation is Rp 10,000' },
        { status: 400 },
      )
    }

    if (!donorEmail || !donorName) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 },
      )
    }

    const project_id = await resolveProjectId(projectId)
    const user_id = userId ? toBigIntOrNull(userId) : null
    if (userId && user_id === null) {
      return NextResponse.json({ success: false, error: 'Invalid userId' }, { status: 400 })
    }

    // Create donation ID
    const donationId = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // 1) CREATE FIRST in DB (pending)
    const created = await prisma.donations.create({
      data: {
        donation_id: donationId,
        project_id, // can be null now (matches your current DDL)
        user_id,
        donor_name: anonymous ? 'Anonymous' : donorName,
        donor_email: donorEmail,
        donor_phone: donorPhone || null,
        amount: BigInt(Math.trunc(Number(amount))),
        frequency: frequency || 'one-time',
        status: 'pending',
        payment_method: paymentMethod || 'va',
        payment_channel: paymentChannel || 'cimb',
        message: message || null,
        is_anonymous: Boolean(anonymous),
        metadata: {
          motivation: motivation ?? null,
          newsletter: Boolean(newsletter),
        },
        created_at: new Date(),
        updated_at: new Date(),
      },
    })

    // 2) Call iPaymu
    const notifyUrl = requireEnv('IPAYMU_NOTIFY_URL')
    const successUrl = requireEnv('IPAYMU_SUCCESS_URL')
    const cancelUrl = requireEnv('IPAYMU_CANCEL_URL')

    const ipaymuParams = {
      name: created.donor_name ?? donorName,
      phone: created.donor_phone ?? '',
      email: created.donor_email ?? donorEmail,
      amount: created.amount.toString(),

      notifyUrl,
      referenceId: created.donation_id,

      paymentMethod: created.payment_method ?? 'va',
      paymentChannel: created.payment_channel ?? 'cimb',

      expired: '24',
      comments: `Donation ${created.donation_id}`,
      feeDirection: 'BUYER',
      escrow: '0',

      'product[]': ['Donation'],
      'qty[]': ['1'],
      'price[]': [created.amount.toString()],
      'weight[]': ['1'],
      'width[]': ['1'],
      'height[]': ['1'],
      'length[]': ['1'],

      // If you truly don't ship anything, we can remove these later (depends on iPaymu rules)
      deliveryArea: '17473',
      deliveryAddress: 'GROGOL, GROGOL PETAMBURAN, JAKARTA BARAT, 11450',
      shipping: 'IDEXPRESS',
      shippingService: 'STD',

      account: requireEnv('IPAYMU_VA'),
      successUrl,
      cancelUrl,
    }

    const payRes = await createIpaymuDirectPayment(ipaymuParams)

    if (!payRes.ok) {
      // Mark failed
      await prisma.donations.update({
        where: { donation_id: created.donation_id },
        data: {
          status: 'failed',
          metadata: {
            ...(typeof created.metadata === 'object' && created.metadata
              ? (created.metadata as any)
              : {}),
            ipaymu_error: payRes.json ?? null,
          },
          updated_at: new Date(),
        },
      })

      return NextResponse.json(
        {
          success: false,
          donationId: created.donation_id,
          error: 'Failed to create iPaymu payment',
          details: payRes.json,
        },
        { status: 502 },
      )
    }

    // Expected shape (like you pasted):
    // { Status: 200, Success: true, Data: { TransactionId, PaymentNo, Expired, ... } }
    const data = payRes.json?.Data

    // 3) Update donation with payment data + status processing
    const updated = await prisma.donations.update({
      where: { donation_id: created.donation_id },
      data: {
        status: 'processing',
        transaction_id: data?.TransactionId ? String(data.TransactionId) : null,
        paid_at: null,
        metadata: {
          ...(typeof created.metadata === 'object' && created.metadata
            ? (created.metadata as any)
            : {}),
          ipaymu: payRes.json ?? null,
          payment_no: data?.PaymentNo ?? null,
          expired_at: data?.Expired ?? null,
          fee: data?.Fee ?? null,
          total: data?.Total ?? null,
          via: data?.Via ?? null,
          channel: data?.Channel ?? null,
        },
        updated_at: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      donationId: updated.donation_id,
      donation: safeJsonDonation(updated),
      ipaymu: payRes.json,
      message: 'Donation created and payment instruction generated',
    })
  } catch (error) {
    console.error('Error creating donation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process donation' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const baseUrl = requireEnv('IPAYMU_BASE_URL')
    const va = requireEnv('IPAYMU_VA')
    const apiKey = requireEnv('IPAYMU_API_KEY')

    const timestamp = ipaymuTimestamp()

    const method = 'GET'
    const path = '/api/v2/payment-channels'

    // GET has empty body => sha256('')
    const bodyHash = sha256Hex('')

    const stringToSign = `${method}:${va}:${bodyHash}:${apiKey}`
    const signature = hmacSha256Hex(apiKey, stringToSign)

    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        va,
        timestamp,
        signature,
      },
      cache: 'no-store',
    })

    const json = await res.json().catch(() => null)

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch payment channels', details: json },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true, ...json })
  } catch (error) {
    console.error('ipaymu payment-channels error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payment channels' },
      { status: 500 },
    )
  }
}
