'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Master from '@components/Layout/Master'

const PaymentThankYouPage = () => {
  const router = useRouter()
  const sp = useSearchParams()

  const referenceId = sp.get('referenceId') || sp.get('ref') || sp.get('ReferenceId')
  const sessionId = sp.get('sessionId') || sp.get('SessionID')

  useEffect(() => {
    // Optional: if you prefer to auto-redirect somewhere after a short delay
    // const t = setTimeout(() => router.push('/'), 5000)
    // return () => clearTimeout(t)
  }, [router])

  return (
    <Master>
      <div className="container" style={{ padding: '48px 16px' }}>
        <h1>Thank you!</h1>
        <p>
          Your payment page has been opened/completed. If you just finished paying, we’ll verify it
          shortly.
        </p>

        {referenceId ? (
          <p>
            <strong>Reference ID:</strong> {referenceId}
          </p>
        ) : null}

        {sessionId ? (
          <p>
            <strong>Session ID:</strong> {sessionId}
          </p>
        ) : null}

        <div style={{ marginTop: 16 }}>
          <button onClick={() => router.push('/')} className="submit-btn">
            Back to home
          </button>
        </div>
      </div>
    </Master>
  )
}

export default PaymentThankYouPage
