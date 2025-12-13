import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@utils/Prisma'

export async function POST(request: NextRequest) {
  try {
    // iPaymu usually calls notifyUrl with JSON or form.
    // We'll accept both.
    const contentType = request.headers.get('content-type') || ''
    let payload: any = null

    if (contentType.includes('application/json')) {
      payload = await request.json()
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const form = await request.formData()
      payload = Object.fromEntries(form.entries())
    } else {
      // Fallback
      payload = await request.json().catch(async () => {
        const form = await request.formData().catch(() => null)
        return form ? Object.fromEntries(form.entries()) : null
      })
    }

    // IMPORTANT:
    // You must confirm exact notify fields from iPaymu docs / your logs.
    // Commonly you’ll get ReferenceId + status + TransactionId.
    const referenceId =
      payload?.ReferenceId ?? payload?.referenceId ?? payload?.reference_id ?? payload?.refId
    const statusRaw = (payload?.Status ?? payload?.status ?? '').toString().toLowerCase()

    if (!referenceId) {
      return NextResponse.json(
        { success: false, error: 'Missing ReferenceId', payload },
        { status: 400 },
      )
    }

    // Map gateway status => your DB status
    // Please adjust once you confirm iPaymu’s exact status values.
    const newStatus =
      statusRaw === 'success' || statusRaw === 'paid' || statusRaw === 'settlement'
        ? 'completed'
        : statusRaw === 'expired'
          ? 'failed'
          : statusRaw === 'cancel' || statusRaw === 'cancelled'
            ? 'cancelled'
            : 'processing'

    const updated = await prisma.donations.update({
      where: { donation_id: String(referenceId) },
      data: {
        status: newStatus,
        paid_at: newStatus === 'completed' ? new Date() : null,
        metadata: {
          // keep previous metadata and append notify payload
          notify: payload,
        },
        updated_at: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      donationId: updated.donation_id,
      status: updated.status,
    })
  } catch (error) {
    console.error('iPaymu notify error:', error)
    return NextResponse.json({ success: false, error: 'Failed to process notify' }, { status: 500 })
  }
}
