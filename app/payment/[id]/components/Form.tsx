'use client'

import { useState } from 'react'

// hooks
import useAlert from '@hooks/useAlert'

// components
import Input from '@components/Form/Input'
import Button from '@components/Button/Button'
import Loader from '@components/Loader/Loader'
import Heading from '@components/Heading/Heading'
import Select from '@components/Form/Select'

// utils
import Request, { type IRequest, type IResponse } from '@utils/Request'

// interfaces
interface IFormProps {
  name: string
  email: string
  emailVerified: Date | null // null if not verified, true if verified, false if not verified
  status: string // UNPAID, PENDING, PAID, CANCELLED
  paymentSegment: string
  paymentMethod: string
  cardCvc: string
  cardName: string
  cardNumber: string
  cardExpiration: string
}

const paymentOptions = {
  bank: ['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB Niaga', 'Permata', 'Danamon', 'BTN', 'OCBC NISP'],
  ewallet: ['OVO', 'GoPay', 'DANA', 'ShopeePay', 'LinkAja', 'Alipay'],
  qris: ['QRIS Standard Indonesia'],
  card: ['Visa', 'MasterCard', 'JCB'],
}

interface IFormProps1 {
  data: {
    user?: any
    orderId?: any
    status?: string // UNPAID, PENDING, PAID, CANCELLED
  }
}

const Form: React.FC<IFormProps1> = ({ data }) => {
  const { showAlert, hideAlert } = useAlert()
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<IFormProps>({
    name: data?.user.name || '',
    email: data?.user.email || '',
    emailVerified: data?.user.emailVerified || null,
    status: data?.status || 'UNPAID',
    paymentSegment: '',
    paymentMethod: '',
    cardCvc: '',
    cardName: '',
    cardNumber: '',
    cardExpiration: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault()
    hideAlert()
    setLoading(true)

    try {
      if (!formValues.emailVerified) {
        showAlert({ type: 'warning', text: 'Please verify your email address first.' })
        setLoading(false)
        return
      }

      if (!formValues.paymentSegment || !formValues.paymentMethod) {
        showAlert({ type: 'warning', text: 'Please select both payment segment and method.' })
        setLoading(false)
        return
      }

      const payload = {
        paymentSegment: formValues.paymentSegment,
        paymentMethod: formValues.paymentMethod,
      }

      const parameters: IRequest = {
        url: `/api/payment/${data.orderId}`,
        method: 'PUT',
        postData: payload,
      }

      const res: IResponse = await Request.getResponse(parameters)
      if (res.status === 200) {
        showAlert({ type: 'success', text: 'Payment method selected successfully.' })
        setTimeout(() => {
          window.location.href = `/members/tickets`
        }, 1000)
      } else {
        showAlert({ type: 'error', text: res.data?.results ?? 'Something went wrong' })
      }
    } catch (err) {
      console.error('Payment submission failed:', err)
      showAlert({ type: 'error', text: 'Unexpected error during payment.' })
    }

    setLoading(false)
  }

  const methodsBySegment = formValues.paymentSegment
    ? paymentOptions[formValues.paymentSegment as keyof typeof paymentOptions]
    : []

  return loading ? (
    <Loader type="inline" color="white" text="Hang on a second" />
  ) : (
    <form className="form shrink" noValidate onSubmit={handleSubmit}>
      <div className="form-elements">
        <div className="form-line padding-top">
          <Heading type={5} color="white" text="Buyer info" />
        </div>
        <div className="form-line">
          <div className="flex flex-v-center flex-space-between">
            <div className="two-line">
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                name="name"
                value={formValues.name}
                readOnly={true}
                maxLength={48}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="two-line">
              <label htmlFor="email">E-mail address</label>
              <Input
                type="email"
                name="email"
                readOnly={true}
                value={formValues.email}
                maxLength={64}
                placeholder="Enter your e-mail address"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-line padding-top">
          <Heading type={5} color="white" text="Payment" />
          <Heading type={6} color="white" text={`Status: ${formValues.status}`} />
          <p>
            Please select your payment method. If you choose credit card, make sure the name on the
            matches your name.
          </p>
        </div>

        <div className="form-line flex flex-col gap-6 md:flex-row">
          <div className="flex-1">
            <Select
              name="paymentSegment"
              value={formValues.paymentSegment}
              onChange={handleChange}
              required
              label="Segment"
            >
              <option value="">-- Select Segment --</option>
              <option value="bank">🏦 Bank Virtual Account</option>
              <option value="ewallet">📱 E-Wallet</option>
              <option value="qris">🔳 QRIS</option>
              <option value="card">💳 Credit Card</option>
            </Select>
          </div>

          {formValues.paymentSegment && (
            <div className="flex-1 animate-fade-in">
              <Select
                name="paymentMethod"
                value={formValues.paymentMethod}
                onChange={handleChange}
                required
                label="Provider"
              >
                <option value="">-- Select Provider --</option>
                {methodsBySegment.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </div>

        {formValues.paymentSegment === 'card' && (
          <>
            <div className="form-line">
              <div className="flex flex-v-center flex-space-between">
                <div className="two-line">
                  <label htmlFor="cardName">Name on card</label>
                  <Input
                    type="text"
                    name="cardName"
                    value={formValues.cardName}
                    maxLength={48}
                    placeholder="Enter name on card"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="two-line">
                  <label htmlFor="cardNumber">Card number</label>
                  <Input
                    type="text"
                    name="cardNumber"
                    value={formValues.cardNumber}
                    maxLength={16}
                    placeholder="Enter your card number"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-line">
              <div className="flex flex-v-center flex-space-between">
                <div className="two-line">
                  <label htmlFor="cardExpiration">Expiration date</label>
                  <Input
                    type="text"
                    name="cardExpiration"
                    value={formValues.cardExpiration}
                    maxLength={4}
                    placeholder="MMYY"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="two-line">
                  <label htmlFor="cardCvc">Security number</label>
                  <Input
                    type="text"
                    name="cardCvc"
                    value={formValues.cardCvc}
                    maxLength={3}
                    placeholder="CVC"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="form-buttons">
          <Button type="submit" color="red-filled" text="Place payment & Issue tickets" />
        </div>
      </div>
    </form>
  )
}

export default Form
