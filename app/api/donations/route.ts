import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@utils/Prisma'

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
      frequency,
      motivation,
      message,
      anonymous,
      newsletter,
      userId,
    } = body

    // Validation
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

    // Resolve project ID
    const project_id = await resolveProjectId(projectId)
    const user_id = toBigIntOrNull(userId)

    // Generate unique donation ID
    const donationId = `DON-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    // Create donation record with pending status
    const created = await prisma.donations.create({
      data: {
        donation_id: donationId,
        project_id,
        user_id,
        donor_name: anonymous ? 'Anonymous' : donorName,
        donor_email: donorEmail,
        donor_phone: donorPhone ?? null,
        amount: BigInt(amount),
        status: 'pending', // Will be updated when payment proof is uploaded
        payment_method: 'qris',
        payment_channel: 'qris',
        message: message ?? null,
        metadata: {
          frequency: frequency ?? 'one-time',
          motivation: motivation ?? null,
          anonymous: anonymous ?? false,
          newsletter: newsletter ?? true,
        },
        created_at: new Date(),
        updated_at: new Date(),
      },
    })

    // Return success with donation ID (for QRIS modal)
    return NextResponse.json({
      success: true,
      donationId: created.donation_id,
      donation: safeJsonDonation(created),
    })
  } catch (err) {
    console.error('Donation creation error:', err)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

// GET endpoint to fetch donation details (optional, for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const donationId = searchParams.get('donationId')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    const whereClause: any = {}

    if (donationId) {
      whereClause.donation_id = donationId
    }

    if (status) {
      whereClause.status = status
    }

    const donations = await prisma.donations.findMany({
      where: whereClause,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      donations: donations.map(safeJsonDonation),
    })
  } catch (err) {
    console.error('Fetch donations error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
