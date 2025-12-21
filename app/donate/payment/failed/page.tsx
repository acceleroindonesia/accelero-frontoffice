'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Master from '@components/Layout/Master'

const PaymentFailedPage = () => {
  const router = useRouter()
  const sp = useSearchParams()

  const referenceId = sp.get('referenceId') || sp.get('ref') || sp.get('ReferenceId')

  return (
    <Master>
      <div className="container" style={{ padding: '48px 16px' }}>
        <h1>Payment not completed</h1>
        <p>The payment was canceled or failed. You can try again.</p>

        {referenceId ? (
          <p>
            <strong>Reference ID:</strong> {referenceId}
          </p>
        ) : null}

        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <button onClick={() => router.back()} className="submit-btn">
            Try again
          </button>
          <button onClick={() => router.push('/')} className="submit-btn">
            Back to home
          </button>
        </div>
      </div>
    </Master>
  )
}

export default PaymentFailedPage
