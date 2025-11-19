'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Master from '@components/Layout/Master'
import Section from '@components/Section/Section'
import Heading from '@components/Heading/Heading'
import Form from './components/Form'
import Loader from '@components/Loader/Loader'
import { getSession } from 'next-auth/react'

const Page: React.FC = () => {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataProp, setDataProp] = useState<any>({
    orderId: id,
  })

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession()
      if (!session?.user) {
        setError('You must be signed in to view this page.')
        setLoading(false)
        window.location.href = '/members/signin'
        return
      }
      if (!id) {
        setError('Missing order ID.')
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/payment/${id}`)
        const json = await res.json()

        if (!res.ok) throw new Error(json.error || 'Failed to fetch order')

        setData(json)
        setDataProp({
          user: session.user,
          orderId: id,
          status: json.status || 'UNPAID',
        })
      } catch (err: any) {
        setError(err.message || 'Failed to load data.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <Loader type="inline" color="white" text="Loading order..." />

  if (error || !data) {
    return (
      <Master>
        <div className="error-container">
          <h2 className="error-title">⚠️ Something went wrong</h2>
          <p className="error-text">{error ?? 'We couldn’t find your order. Please try again.'}</p>
          <div className="error-actions">
            <a href="/" className="error-link">
              Go to homepage
            </a>
            <button onClick={() => location.reload()} className="error-button">
              Retry
            </button>
          </div>
        </div>
      </Master>
    )
  }

  let { event, venue, date, tickets, total } = data

  return (
    <Master>
      <Section className="white-background">
        <div className="container">
          <div className="center">
            <Heading type={1} color="white" text="Buy tickets" />
            <p className="white">
              Please enter your personal & payment details. We will issue and send your tickets to
              your e-mail address immediately.
            </p>
          </div>

          <div className="padding-top center">
            <div className="padding-top">
              <Heading type={5} color="white" text="Details" />
              <p>
                <strong>Event</strong> {event}
              </p>
              <p>
                <strong>Venue</strong> {venue}
              </p>
              <p>
                <strong>Date</strong>{' '}
                {new Date(date).toLocaleString('en-UK', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="form shrink">
            <table className="table">
              <thead>
                <tr>
                  <th className="left">Name</th>
                  <th className="center">Qty.</th>
                  <th className="right">Price</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket: any, i: number) => (
                  <tr key={i}>
                    <td className="left">{ticket.type}</td>
                    <td className="center">{ticket.quantity}</td>
                    <td className="right">Rp {Number(ticket.price).toLocaleString('id-ID')}</td>
                  </tr>
                ))}
                <tr>
                  <td className="right" colSpan={3}>
                    <strong>Total : </strong> Rp {Number(total).toLocaleString('id-ID')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Form data={dataProp} />

          <div className="paragraph-container center">
            <p>
              By clicking place payment button I agree to the&nbsp;
              <Link href="/legal/terms-of-service" className="red">
                Terms of service
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </Master>
  )
}

export default Page
