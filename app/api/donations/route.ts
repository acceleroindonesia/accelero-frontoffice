import { NextRequest, NextResponse } from 'next/server'

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
    } = body

    // Validation
    if (!amount || amount < 10000) {
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

    // Create donation ID
    const donationId = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // In production, save to database
    const donation = {
      id: donationId,
      projectId: projectId || 'general',
      amount,
      frequency,
      motivation,
      message: message || null,
      donorName: anonymous ? 'Anonymous' : donorName,
      donorEmail,
      donorPhone: donorPhone || null,
      anonymous,
      newsletter,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    // TODO: Save to database
    console.log('New donation:', donation)

    // TODO: Generate payment gateway link (Midtrans/Xendit)
    // const paymentLink = await generatePaymentLink(donation);

    return NextResponse.json({
      success: true,
      donationId: donation.id,
      message: 'Donation created successfully',
    })
  } catch (error) {
    console.error('Error creating donation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process donation' },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const donorEmail = searchParams.get('email')

    // TODO: Fetch from database
    const donations = [
      {
        id: 'DON-123456',
        amount: 500000,
        frequency: 'one-time',
        status: 'completed',
        createdAt: '2025-01-15T10:00:00Z',
        projectTitle: 'Reading Excellence Program',
      },
    ]

    return NextResponse.json({
      success: true,
      donations,
    })
  } catch (error) {
    console.error('Error fetching donations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donations' },
      { status: 500 },
    )
  }
}
