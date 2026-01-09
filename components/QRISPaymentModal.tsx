'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@contexts/LanguageContext'

interface QRISModalProps {
  isOpen: boolean
  onClose: () => void
  donationAmount: number
  onConfirmPayment: (senderAccountNumber: string) => Promise<void>
}

const QRISModal: React.FC<QRISModalProps> = ({
  isOpen,
  onClose,
  donationAmount,
  onConfirmPayment,
}) => {
  const { t, language } = useLanguage()
  const [senderAccountNumber, setSenderAccountNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Bank account details (you should store this in env variables)
  const BANK_ACCOUNT = {
    bank: 'BCA',
    accountNumber: '1234567890', // Replace with your actual account
    accountName: 'Yayasan Accelero Indonesia',
  }

  if (!isOpen) return null

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '')
    setSenderAccountNumber(value)
    setError(null)
  }

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(BANK_ACCOUNT.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleSubmit = async () => {
    if (!senderAccountNumber || senderAccountNumber.length < 8) {
      setError(t('accountNumberRequired'))
      return
    }

    setIsSubmitting(true)
    try {
      await onConfirmPayment(senderAccountNumber)
      // Reset state
      setSenderAccountNumber('')
      setError(null)
    } catch (err) {
      setError(
        language === 'id'
          ? 'Gagal mengkonfirmasi. Silakan coba lagi.'
          : 'Failed to confirm. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setSenderAccountNumber('')
      setError(null)
      onClose()
    }
  }

  return (
    <div className="qris-modal-overlay" onClick={handleClose}>
      <div className="qris-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="qris-modal-close" onClick={handleClose} disabled={isSubmitting}>
          ✕
        </button>

        <div className="qris-modal-header">
          <h2>{t('scanQRToDonate')}</h2>
          <p className="qris-instructions">{t('qrisInstructions')}</p>
        </div>

        <div className="qris-modal-body">
          {/* Donation Amount Display */}
          <div className="qris-amount-display">
            <span className="qris-amount-label">{t('donationAmount')}</span>
            <span className="qris-amount-value">Rp {donationAmount.toLocaleString()}</span>
          </div>

          {/* QRIS Code */}
          <div className="qris-code-container">
            <Image
              src="/qris.jpg"
              alt="QRIS Code"
              width={400}
              height={400}
              className="qris-code-image"
              priority
              unoptimized
            />
          </div>

          <p className="qris-scan-hint">
            <span className="qris-scan-icon">📱</span>
            <span>{t('scanWithAnyApp')}</span>
          </p>

          {/* Divider */}
          <div className="qris-divider">
            <span>{language === 'id' ? 'ATAU' : 'OR'}</span>
          </div>

          {/* Bank Transfer Option */}
          <div className="bank-transfer-section">
            <h3>{t('orTransferDirectly')}</h3>
            <div className="bank-details-card">
              <div className="bank-detail-row">
                <span className="detail-label">{t('bankName')}:</span>
                <span className="detail-value">{BANK_ACCOUNT.bank}</span>
              </div>
              <div className="bank-detail-row">
                <span className="detail-label">{t('accountName')}:</span>
                <span className="detail-value">{BANK_ACCOUNT.accountName}</span>
              </div>
              <div className="bank-detail-row highlight">
                <span className="detail-label">
                  {language === 'id' ? 'Nomor Rekening:' : 'Account Number:'}
                </span>
                <div className="account-number-row">
                  <span className="detail-value account-number">{BANK_ACCOUNT.accountNumber}</span>
                  <button type="button" className="copy-btn" onClick={handleCopyAccount}>
                    {copied ? '✓' : '📋'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enter Sender Account Section */}
          <div className="sender-account-section">
            <h3>{t('afterPayment')}</h3>
            <div className="form-group">
              <label className="form-label">{t('senderAccountNumber')}</label>
              <input
                type="text"
                className="form-input"
                placeholder={t('accountNumberPlaceholder')}
                value={senderAccountNumber}
                onChange={handleAccountNumberChange}
                maxLength={20}
                disabled={isSubmitting}
              />
              <small className="form-hint">
                {language === 'id'
                  ? 'Masukkan nomor rekening yang Anda gunakan untuk mengirim donasi'
                  : 'Enter the account number you used to send the donation'}
              </small>
            </div>

            {error && <p className="qris-error">{error}</p>}
          </div>
        </div>

        <div className="qris-modal-footer">
          <button
            className="qris-btn-cancel"
            onClick={handleClose}
            disabled={isSubmitting}
            type="button"
          >
            {t('closeModal')}
          </button>
          <button
            className="qris-btn-confirm"
            onClick={handleSubmit}
            disabled={!senderAccountNumber || isSubmitting}
            type="button"
          >
            {isSubmitting ? t('processing') : t('confirmDonation')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QRISModal
