'use client'

import { useState, useEffect } from 'react'
import { getSession, signOut } from 'next-auth/react'
import Link from 'next/link'

// hooks
import useAlert from '@hooks/useAlert'

// components
import Input from '@components/Form/Input'
import Button from '@components/Button/Button'
import Loader from '@components/Loader/Loader'

// utils
import Request, { type IRequest, type IResponse } from '@utils/Request'

interface IFormProps {
  name: string
  email: string
  phoneNumber: string
  emailVerified: boolean
}

const FormMain: React.FC = () => {
  const { showAlert, hideAlert } = useAlert()
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState<IFormProps>({
    name: '',
    email: '',
    phoneNumber: '',
    emailVerified: false,
  })

  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession()
      if (!session?.user) {
        showAlert({ type: 'error', text: 'Unauthorized or session expired.' })
        setLoading(false)
        return
      }

      setUserId(session!.user!.id)
      const parameters: IRequest = {
        url: `/api/user/${session!.user!.id}`,
        method: 'GET',
      }

      const res: IResponse = await Request.getResponse(parameters)
      const { status, data } = res

      if (status === 200) {
        setFormValues({
          name: data.name ?? '',
          email: data.email ?? '',
          phoneNumber: data.phoneNumber ?? '',
          emailVerified: data.emailVerified ?? '',
        })
      } else {
        showAlert({ type: 'error', text: data?.title ?? 'Failed to fetch profile.' })
      }

      setLoading(false)
    }

    fetchUser()
  }, [showAlert])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendActivation = async () => {
    if (!formValues.email || !formValues.name) {
      showAlert({ type: 'error', text: 'Email and name required.' })
      return
    }

    const res = await fetch('/api/email/activation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formValues.email, name: formValues.name }),
    })

    const data = await res.json()
    if (res.ok) {
      showAlert({ type: 'success', text: 'Activation email sent!' })
    } else {
      showAlert({ type: 'error', text: data?.error ?? 'Failed to send email' })
    }
  }

  const handleSignOut = (): void => {
    signOut({ callbackUrl: '/' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    hideAlert()

    if (!userId) {
      showAlert({ type: 'error', text: 'User ID not found.' })
      return
    }

    setLoading(true)

    const parameters: IRequest = {
      url: `/api/user/${userId}`,
      method: 'PUT',
      postData: {
        name: formValues.name,
        phoneNumber: formValues.phoneNumber,
      },
    }

    const res: IResponse = await Request.getResponse(parameters)
    const { status, data } = res

    if (status === 200) {
      showAlert({ type: 'success', text: 'Profile updated successfully!' })
    } else {
      showAlert({ type: 'error', text: data?.title ?? 'Failed to update profile.' })
    }

    setLoading(false)
  }

  if (loading) {
    return <Loader type="inline" color="white" text="Loading your profile..." />
  }

  return (
    <form className="form shrink" noValidate onSubmit={(e) => void handleSubmit(e)}>
      <div className="form-elements">
        {/* Name */}
        <div className="form-line">
          <div className="one-line">
            <div className="label-line">
              <label htmlFor="name">Name</label>
            </div>
            <Input
              type="text"
              name="name"
              value={formValues.name}
              maxLength={64}
              placeholder="Enter your name"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Phone number */}
        <div className="form-line">
          <div className="one-line">
            <div className="label-line">
              <label htmlFor="phoneNumber">Phone number</label>
            </div>
            <Input
              type="tel"
              name="phoneNumber"
              value={formValues.phoneNumber}
              maxLength={20}
              placeholder="Enter your phone number"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email (readonly) */}
        <div className="form-line">
          <div className="one-line">
            <div className="label-line flex flex-v-center flex-space-between">
              <label htmlFor="email">
                E-mail address {formValues.emailVerified ? '(verified)' : '(not verified)'}
              </label>
              <Link href="/members/email" className="red">
                Change e-mail
              </Link>
            </div>
            <Input
              type="email"
              name="email"
              value={formValues.email}
              maxLength={128}
              placeholder="Enter your e-mail address"
              disabled
              required
              onChange={() => {}}
            />
            {!formValues.emailVerified && (
              <Button
                type="button"
                color="red-filled"
                text="Resend Activation Email"
                onClick={() => void handleSendActivation()}
              />
            )}
          </div>
        </div>

        {/* Password (readonly) */}
        <div className="form-line">
          <div className="label-line flex flex-v-center flex-space-between">
            <label htmlFor="password">Password</label>
            <Link href="/members/password" className="red">
              Change password
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            value="dummypassword"
            maxLength={64}
            disabled
            required
            placeholder={''}
          />
        </div>
        {/* Buttons */}
        <div className="form-buttons">
          <Button type="submit" color="red-filled" text="Update profile" />
        </div>
      </div>
    </form>
  )
}

export default FormMain
