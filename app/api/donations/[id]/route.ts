import { NextRequest, NextResponse } from 'next/server'
import prisma from '@utils/Prisma'

function safeJsonDonation(row: any) {
  return {
    ...row,
    id: typeof row.id === 'bigint' ? row.id.toString() : row.id,
    project_id: typeof row.project_id === 'bigint' ? row.project_id.toString() : row.project_id,
    user_id: typeof row.user_id === 'bigint' ? row.user_id.toString() : row.user_id,
    amount: typeof row.amount === 'bigint' ? row.amount.toString() : row.amount,
  }
}

export async function GET(_request: NextRequest, ctx: { params: Promise<{ donationId: string }> }) {
  try {
    const { donationId } = await ctx.params

    const donation = await prisma.donations.findUnique({
      where: { donation_id: donationId },
    })

    if (!donation) {
      return NextResponse.json({ success: false, error: 'Donation not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      donation: safeJsonDonation(donation),
    })
  } catch (error) {
    console.error('Error fetching donation:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch donation' }, { status: 500 })
  }
}
