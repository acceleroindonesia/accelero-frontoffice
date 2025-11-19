'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useAlert from '@hooks/useAlert'
import toolBox from '@utils/ToolBox'
import '../../../styles/auth.css'

interface IFormProps {
  name: string
  email: string
  password: string
  confirmPassword: string
  agreement: boolean
}

const Form: React.FC = () => {
  const router = useRouter()
  const { showAlert, hideAlert } = useAlert()
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<IFormProps>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const validateForm = (): boolean => {
    if (!formValues.name.trim()) {
      showAlert({ type: 'error', text: 'Please enter your name' })
      return false
    }

    if (!toolBox.isEmail(formValues.email)) {
      showAlert({ type: 'error', text: 'Invalid email format' })
      return false
    }

    if (formValues.password.length < 8) {
      showAlert({
        type: 'error',
        text: 'Password must be at least 8 characters',
      })
      return false
    }

    if (formValues.password !== formValues.confirmPassword) {
      showAlert({ type: 'error', text: 'Passwords do not match' })
      return false
    }

    if (!formValues.agreement) {
      showAlert({
        type: 'error',
        text: 'Please agree to the terms and conditions',
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    hideAlert()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
          agreement: formValues.agreement,
        }),
      })

      const data = await response.json()

      if (response.status === 201 || response.ok) {
        showAlert({
          type: 'success',
          text: 'Account created successfully! Redirecting...',
        })
        setTimeout(() => {
          router.push('/members/signin')
        }, 2000)
      } else {
        showAlert({
          type: 'error',
          text: data.message || 'Failed to create account. Please try again.',
        })
        setLoading(false)
      }
    } catch (error) {
      showAlert({
        type: 'error',
        text: 'An error occurred. Please try again later.',
      })
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="auth-loader">
        <div className="spinner" />
        <p>Creating your account...</p>
      </div>
    )
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="auth-form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          autoComplete="name"
        />
      </div>

      <div className="auth-form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          autoComplete="email"
        />
      </div>

      <div className="auth-form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Create a password (min. 8 characters)"
          required
          autoComplete="new-password"
        />
      </div>

      <div className="auth-form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
          autoComplete="new-password"
        />
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="agreement"
          name="agreement"
          checked={formValues.agreement}
          onChange={handleChange}
          required
        />
        <label htmlFor="agreement">
          I agree to the{' '}
          <Link href="/legal/terms-of-service" target="_blank">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy-policy" target="_blank">
            Privacy Policy
          </Link>
        </label>
      </div>

      <button type="submit" className="auth-submit-btn" disabled={loading}>
        Create Account
      </button>
    </form>
  )
}

export default Form
