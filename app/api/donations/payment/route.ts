import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@utils/Prisma'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { donationId, senderAccountNumber, amount } = body

    if (!donationId || !senderAccountNumber) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 },
      )
    }

    // Validate account number format (basic validation)
    if (senderAccountNumber.length < 8 || !/^\d+$/.test(senderAccountNumber)) {
      return NextResponse.json(
        { success: false, error: 'Invalid account number format' },
        { status: 400 },
      )
    }

    // Check if donation exists
    const donation = await prisma.donations.findUnique({
      where: { donation_id: donationId },
    })

    if (!donation) {
      return NextResponse.json({ success: false, error: 'Donation not found' }, { status: 404 })
    }

    // Update donation with sender account info
    const updated = await prisma.donations.update({
      where: { donation_id: donationId },
      data: {
        sender_account_number: senderAccountNumber,
        status: 'processing', // Admin needs to verify
        is_verified: false,
        paid_at: new Date(),
        updated_at: new Date(),
      },
    })

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to donor

    return NextResponse.json(
      {
        success: true,
        message: 'Payment confirmation received. We will verify your donation shortly.',
        donation: {
          id: updated.donation_id,
          status: updated.status,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error confirming payment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to confirm payment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
