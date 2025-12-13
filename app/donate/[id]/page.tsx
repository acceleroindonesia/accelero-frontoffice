'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import Master from '@components/Layout/Master'
import Section from '@components/Section/Section'
import Heading from '@components/Heading/Heading'
import Loader from '@components/Loader/Loader'

type DonationStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled'

type DonationApiResponse = {
  success?: boolean
  error?: string
  donation?: {
    donation_id: string
    amount: string | number
    status: DonationStatus
    donor_name?: string | null
    donor_email?: string | null
    payment_method?: string | null
    payment_channel?: string | null
    metadata?: any
    created_at?: string | null
  }
}

const DonationPaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [donation, setDonation] = useState<DonationApiResponse['donation'] | null>(null)

  const ipaymuData = useMemo(() => donation?.metadata?.ipaymu?.Data, [donation])

  useEffect(() => {
    const fetchDonation = async () => {
      if (!id) return
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/donations/${id}`)
        const json = (await res.json()) as DonationApiResponse

        if (!res.ok || !json.success || !json.donation) {
          throw new Error(json.error || 'Failed to load donation')
        }

        setDonation(json.donation)
      } catch (e: any) {
        setError(e?.message || 'Failed to load donation')
      } finally {
        setLoading(false)
      }
    }

    fetchDonation()
  }, [id])

  if (loading) return <Loader type="inline" color="white" text="Loading payment..." />

  if (error || !donation) {
    return (
      <Master>
        <div className="error-container">
          <h2 className="error-title">Payment info not available</h2>
          <p className="error-text">{error ?? 'Please try again.'}</p>
          <div className="error-actions">
            <button onClick={() => router.push('/donate')} className="error-button">
              Back to Donate
            </button>
            <button onClick={() => location.reload()} className="error-button">
              Retry
            </button>
          </div>
        </div>
      </Master>
    )
  }

  const status = donation.status
  const paymentNo = ipaymuData?.PaymentNo
  const via = ipaymuData?.Via
  const channel = ipaymuData?.Channel
  const total = ipaymuData?.Total
  const fee = ipaymuData?.Fee
  const expired = ipaymuData?.Expired

  return (
    <Master>
      <Section className="white-background">
        <div className="container">
          <div className="center">
            <Heading type={1} color="white" text="Donation Payment" />
            <p className="white">
              Please complete your payment before expiry. Your donation will be confirmed after
              payment is received.
            </p>
          </div>

          <div className="padding-top center">
            <div className="form shrink">
              <div className="paragraph-container">
                <p>
                  <strong>Donation ID:</strong> {donation.donation_id}
                </p>
                <p>
                  <strong>Status:</strong> {status}
                </p>
              </div>

              <hr />

              <div className="paragraph-container">
                <p>
                  <strong>Method:</strong> {via || donation.payment_method || '-'}
                </p>
                <p>
                  <strong>Channel:</strong> {channel || donation.payment_channel || '-'}
                </p>
                <p>
                  <strong>VA / Payment Number:</strong> {paymentNo || '-'}
                </p>
                <p>
                  <strong>Fee:</strong> Rp{' '}
                  {typeof fee === 'number' ? fee.toLocaleString('id-ID') : (fee ?? '-')}
                </p>
                <p>
                  <strong>Total to Pay:</strong> Rp{' '}
                  {typeof total === 'number'
                    ? total.toLocaleString('id-ID')
                    : (total ?? donation.amount)}
                </p>
                <p>
                  <strong>Expired:</strong> {expired || '-'}
                </p>
              </div>

              <div className="padding-top center">
                {paymentNo ? (
                  <button
                    className="error-button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(String(paymentNo))
                      alert('VA / Payment number copied!')
                    }}
                  >
                    Copy VA Number
                  </button>
                ) : null}

                <button className="error-button" onClick={() => location.reload()}>
                  Refresh Status
                </button>

                <button className="error-button" onClick={() => router.push('/donate')}>
                  Back to Donate
                </button>
              </div>

              {status === 'completed' ? (
                <div className="padding-top center">
                  <p className="white">
                    <strong>Thank you!</strong> Your donation payment is completed.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Section>
    </Master>
  )
}

export default DonationPaymentPage
