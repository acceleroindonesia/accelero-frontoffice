import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@utils/Prisma'

/**
 * iPaymu will POST payment notifications here.
 *
 * You MUST:
 * - return HTTP 200 quickly
 * - update your DB by referenceId (your donation_id / orderId)
 *
 * The exact iPaymu payload fields can vary by product.
 * We handle common shapes defensively and store the raw payload for audit.
 */
export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || ''

  let payload: any = null
  try {
    if (contentType.includes('application/json')) {
      payload = await req.json()
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await req.text()
      payload = Object.fromEntries(new URLSearchParams(text))
    } else {
      // fallback
      payload = await req.json().catch(async () => ({ raw: await req.text() }))
    }
  } catch {
    payload = null
  }

  // Try several possible keys for referenceId
  const referenceId =
    payload?.referenceId ??
    payload?.ReferenceId ??
    payload?.reference_id ??
    payload?.ref ??
    payload?.Ref

  // Try several possible keys for status
  const providerStatus =
    payload?.status ??
    payload?.Status ??
    payload?.transactionStatus ??
    payload?.TransactionStatus ??
    payload?.PaymentStatus

  if (!referenceId || typeof referenceId !== 'string') {
    // Still reply 200 so provider doesn't keep retrying forever
    return NextResponse.json({ ok: true, received: true }, { status: 200 })
  }

  // Map provider status -> your app status (adjust to your business rules)
  const normalized = String(providerStatus || '').toLowerCase()
  const nextStatus =
    normalized.includes('success') || normalized.includes('paid') || normalized === 'berhasil'
      ? 'paid'
      : normalized.includes('expire') || normalized.includes('expired')
        ? 'expired'
        : normalized.includes('cancel')
          ? 'canceled'
          : normalized.includes('fail')
            ? 'failed'
            : 'processing'

  // Update donations if referenceId matches donation_id
  // (If you also use iPaymu for orders/events, you can add similar update logic there.)
  try {
    await prisma.donations.updateMany({
      where: { donation_id: referenceId },
      data: {
        status: nextStatus,
        updated_at: new Date(),
        metadata: {
          // Keep whatever you already store + append notify payload
          notify: payload,
        } as any,
      },
    })
  } catch (e) {
    // Don’t throw: webhook must respond 200. Log server-side.
    console.error('ipaymu notify update failed', e)
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
