'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useLanguage } from '@contexts/LanguageContext'

interface QRISModalProps {
  isOpen: boolean
  onClose: () => void
  donationAmount: number
  onConfirmPayment: (proofFile: File) => Promise<void>
}

const QRISModal: React.FC<QRISModalProps> = ({
  isOpen,
  onClose,
  donationAmount,
  onConfirmPayment,
}) => {
  const { t } = useLanguage()
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      setError('Please upload a valid image file (PNG, JPG, JPEG)')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setError(null)
    setProofFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const fakeEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>
      handleFileChange(fakeEvent)
    }
  }

  const handleSubmit = async () => {
    if (!proofFile) {
      setError(t('paymentProofRequired'))
      return
    }

    setIsSubmitting(true)
    try {
      await onConfirmPayment(proofFile)
      // Reset state
      setProofFile(null)
      setPreviewUrl(null)
      setError(null)
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to upload payment proof. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setProofFile(null)
    setPreviewUrl(null)
    setError(null)
    onClose()
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="qris-modal-overlay" onClick={handleClose}>
      <div className="qris-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="qris-modal-close" onClick={handleClose}>
          ✕
        </button>

        <div className="qris-modal-header">
          <h2>{t('scanQRToDonate')}</h2>
          <p className="qris-instructions">{t('qrisInstructions')}</p>
        </div>

        <div className="qris-modal-body">
          {/* Donation Amount Display */}
          <div className="qris-amount-display">
            <span className="qris-amount-label">{t('donationAmount')}:</span>
            <span className="qris-amount-value">Rp {donationAmount.toLocaleString()}</span>
          </div>

          {/* QRIS Code */}
          <div className="qris-code-container">
            <Image
              src="/qris.jpeg"
              alt="QRIS Code"
              width={300}
              height={300}
              className="qris-code-image"
              priority
            />
          </div>

          <p className="qris-scan-hint">
            <span className="qris-scan-icon">📱</span>
            {t('scanWithAnyApp')}
          </p>

          {/* Upload Payment Proof Section */}
          <div className="qris-upload-section">
            <h3>{t('afterPayment')}</h3>

            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              className="qris-upload-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <div className="qris-preview">
                  <img src={previewUrl} alt="Payment proof preview" />
                  <button
                    className="qris-remove-preview"
                    onClick={(e) => {
                      e.stopPropagation()
                      setProofFile(null)
                      setPreviewUrl(null)
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="qris-upload-placeholder">
                  <span className="qris-upload-icon">📤</span>
                  <p className="qris-upload-text">{t('uploadProofPlaceholder')}</p>
                  <p className="qris-upload-hint">{t('supportedFormats')}</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="qris-file-input"
                hidden
              />
            </div>

            {error && <p className="qris-error">{error}</p>}
          </div>
        </div>

        <div className="qris-modal-footer">
          <button className="qris-btn-cancel" onClick={handleClose}>
            {t('closeModal')}
          </button>
          <button
            className="qris-btn-confirm"
            onClick={handleSubmit}
            disabled={!proofFile || isSubmitting}
          >
            {isSubmitting ? t('processing') : t('confirmDonation')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QRISModal
