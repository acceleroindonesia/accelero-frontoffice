'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Master from '@components/Layout/Master'
import { ScrollAnimations } from '../home/components/ScrollAnimations'
import Request from '@utils/Request'
import QRISModal from '@components/QRISPaymentModal'
import { useLanguage } from '@contexts/LanguageContext'

interface IDonationProject {
  id: string
  title: string
  location: string
  goalAmount: number
  raisedAmount: number
  studentsImpacted: number
  image: string
}

// Loading component for Suspense fallback
const DonateLoading: React.FC = () => (
  <div className="donate-loading">
    <div className="container">
      <div
        className="loading-skeleton"
        style={{
          height: '200px',
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          borderRadius: '16px',
        }}
      />
      <div
        className="loading-skeleton"
        style={{
          height: '400px',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          borderRadius: '16px',
        }}
      />
    </div>
  </div>
)

const DonateContent: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectParam = searchParams.get('project')
  const { t, language } = useLanguage()

  const [selectedProject, setSelectedProject] = useState<IDonationProject | null>(null)
  const [projects, setProjects] = useState<IDonationProject[]>([])
  const [showQRISModal, setShowQRISModal] = useState(false)
  const [donationId, setDonationId] = useState<string | null>(null)

  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [motivation, setMotivation] = useState('')
  const [message, setMessage] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donorPhone, setDonorPhone] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const predefinedAmounts = [50000, 100000, 250000, 500000, 1000000, 2500000]

  const motivationOptions = [
    { value: '', label: t('selectMotivation') },
    { value: 'education', label: t('believeInEducationEquity') },
    { value: 'community', label: t('supportingCommunity') },
    { value: 'impact', label: t('wantMeasurableImpact') },
    { value: 'future', label: t('investingInFuture') },
    { value: 'tax', label: t('taxDeductible') },
    { value: 'other', label: t('other') },
  ]

  useEffect(() => {
    fetchProjects()
  }, [language])

  useEffect(() => {
    if (projectParam && projects.length > 0) {
      const project = projects.find((p) => p.id === projectParam)
      if (project) setSelectedProject(project)
    }
  }, [projectParam, projects])

  const fetchProjects = async () => {
    try {
      const res = await Request.getResponse({
        url: `/api/projects?status=active&limit=20&lang=${language}`,
        method: 'GET',
      })

      const data = res?.data as { projects?: IDonationProject[] }
      if (data?.projects) setProjects(data.projects)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    setSelectedProject(project || null)

    const newUrl = projectId === 'general' ? '/donate' : `/donate?project=${projectId}`
    router.push(newUrl, { scroll: false })
  }

  const getDonationAmount = (): number => {
    if (customAmount) return parseInt(customAmount) || 0
    return selectedAmount || 0
  }

  const donationAmount = getDonationAmount()
  const shouldShowMinDonationHint = donationAmount === 0 || donationAmount < 10000

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const amount = getDonationAmount()

    if (amount < 10000) {
      alert(t('minimumDonationAlert'))
      setIsSubmitting(false)
      return
    }

    if (!donorName || !donorEmail) {
      alert(t('fillNameEmail'))
      setIsSubmitting(false)
      return
    }

    try {
      const res = await Request.getResponse({
        url: '/api/donations',
        method: 'POST',
        postData: {
          projectId: selectedProject?.id || 'general',
          amount,
          frequency: donationType,
          motivation,
          message: message || null,
          donorName: anonymous ? 'Anonymous' : donorName,
          donorEmail,
          donorPhone: donorPhone || null,
          anonymous,
          newsletter,
          paymentMethod: 'qris',
          status: 'pending', // Status pending until payment proof uploaded
        },
      })

      const data = res?.data as {
        success?: boolean
        error?: string
        donationId?: string
      }

      if (data?.success && data?.donationId) {
        setDonationId(data.donationId)
        setShowQRISModal(true)
      } else {
        alert(data?.error || 'Failed to process donation')
      }
    } catch (error) {
      console.error('Donation error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmPayment = async (senderAccountNumber: string) => {
    if (!donationId) {
      throw new Error('No donation ID found')
    }

    try {
      const res = await Request.getResponse({
        url: '/api/donations/confirm-payment',
        method: 'POST',
        postData: {
          donationId,
          senderAccountNumber,
          amount: getDonationAmount(),
        },
      })

      const data = res?.data as { success?: boolean; error?: string }

      if (data?.success) {
        setShowQRISModal(false)
        alert(t('thankYouForDonation'))
        router.push('/donate/thank-you')
      } else {
        throw new Error(data?.error || 'Failed to confirm payment')
      }
    } catch (error) {
      console.error('Confirm error:', error)
      throw error
    }
  }

  return (
    <>
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="donate-hero">
        <div className="container">
          <div className="donate-hero-content">
            <span className="donate-label">{t('makeAnImpactDonate')}</span>
            <h1 className="donate-title">{t('everyDonationChangesLives')}</h1>
            <p className="donate-subtitle">{t('donatePageDesc')}</p>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="donate-form-section">
        <div className="container">
          <div className="donate-grid">
            {/* Left Side - Form */}
            <div className="donate-form-container">
              <form onSubmit={handleSubmit} className="donate-form">
                {/* Project Selection */}
                <div className="form-section">
                  <h2 className="section-title">
                    <span className="section-number">1</span>
                    Choose Your Project
                  </h2>
                  <div className="form-group">
                    <label className="form-label">Support</label>
                    <select
                      className="form-select"
                      value={selectedProject?.id || 'general'}
                      onChange={(e) => handleProjectChange(e.target.value)}
                    >
                      <option value="general">General Fund - Where Most Needed</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.title} - {project.location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedProject && (
                    <div className="selected-project-card">
                      <div className="project-mini-image">
                        <img src={selectedProject.image} alt={selectedProject.title} />
                      </div>
                      <div className="project-mini-info">
                        <h4>{selectedProject.title}</h4>
                        <p>{selectedProject.location}</p>
                        <div className="project-mini-stats">
                          <span>👥 {selectedProject.studentsImpacted} students</span>
                          <span>
                            {Math.round(
                              (selectedProject.raisedAmount / selectedProject.goalAmount) * 100,
                            )}
                            % {t('funded')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Donation Amount */}
                <div className="form-section">
                  <h2 className="section-title">
                    <span className="section-number">2</span>
                    {t('chooseYourAmount')}
                  </h2>

                  {/* Donation Type Toggle */}
                  <div className="donation-type-toggle">
                    <button
                      type="button"
                      className={`toggle-btn ${donationType === 'one-time' ? 'active' : ''}`}
                      onClick={() => setDonationType('one-time')}
                    >
                      <span className="toggle-icon">💝</span>
                      <span>{t('oneTime')}</span>
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${donationType === 'monthly' ? 'active' : ''}`}
                      onClick={() => setDonationType('monthly')}
                    >
                      <span className="toggle-icon">🔄</span>
                      <span>{t('monthly')}</span>
                    </button>
                  </div>

                  {donationType === 'monthly' && (
                    <div className="monthly-info">ℹ️ {t('monthlyInfo')}</div>
                  )}

                  {/* Amount Buttons */}
                  <div className="amount-grid">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`amount-btn ${selectedAmount === amount ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount('')
                        }}
                      >
                        <span className="amount-value">Rp {amount.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="form-group">
                    <label className="form-label">{t('orEnterCustomAmount')}</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">Rp</span>
                      <input
                        type="number"
                        className="form-input"
                        placeholder={t('enterAmount')}
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(null)
                        }}
                        min="10000"
                      />
                    </div>

                    {shouldShowMinDonationHint ? (
                      <small className="form-hint">{t('minimumDonation')}</small>
                    ) : null}
                  </div>
                </div>

                {/* Motivation */}
                <div className="form-section">
                  <h2 className="section-title">
                    <span className="section-number">3</span>
                    {t('shareYourMotivation')}
                  </h2>
                  <div className="form-group">
                    <label className="form-label">{t('whatInspiredYou')}</label>
                    <select
                      className="form-select"
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      required
                    >
                      {motivationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {t('messageOfEncouragement')}{' '}
                      <span className="optional">{t('optional')}</span>
                    </label>
                    <textarea
                      className="form-textarea"
                      placeholder={t('sendMessageToStudents')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div className="form-section">
                  <h2 className="section-title">
                    <span className="section-number">4</span>
                    {t('yourInformation')}
                  </h2>
                  <div className="form-group">
                    <label className="form-label">{t('fullName')}</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder={t('enterFullName')}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      disabled={anonymous}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">{t('emailAddress')}</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder={t('yourEmail')}
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        {t('phoneNumberOptional')} <span className="optional">{t('optional')}</span>
                      </label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder={t('phoneNumberPlaceholder')}
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-checkboxes">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                      />
                      <span>{t('makeDonationAnonymous')}</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                      />
                      <span>{t('sendMonthlyUpdates')}</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting || getDonationAmount() < 10000}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      {t('processing')}
                    </>
                  ) : (
                    <>
                      <span>{t('proceedToPayment')}</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>

                <p className="form-security">🔒 {t('donationSecure')}</p>
              </form>
            </div>

            {/* Right Side - Summary */}
            <div className="donate-sidebar">
              <div className="donation-summary">
                <h3>{t('donationSummary')}</h3>

                <div className="summary-item">
                  <span className="summary-label">{t('donationType')}</span>
                  <span className="summary-value">
                    {donationType === 'one-time' ? t('oneTimeDonation') : t('monthlyRecurring')}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">{t('amount')}</span>
                  <span className="summary-value summary-amount">
                    Rp {getDonationAmount().toLocaleString()}
                  </span>
                </div>

                {selectedProject && (
                  <div className="summary-item">
                    <span className="summary-label">{t('supporting')}</span>
                    <span className="summary-value">{selectedProject.title}</span>
                  </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-impact">
                  <h4>{t('yourImpactSummary')}</h4>
                  <p>
                    {language === 'id' ? 'Donasi Anda sebesar' : 'Your donation of'} Rp{' '}
                    {getDonationAmount().toLocaleString()} {}
                  </p>
                </div>

                {donationType === 'monthly' && getDonationAmount() > 0 && (
                  <div className="summary-yearly">
                    <span>{t('annualTotal')}</span>
                    <span>Rp {(getDonationAmount() * 12).toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="trust-badges">
                <h4>{t('whyDonateWithUs')}</h4>
                <div className="badge-item">
                  <span className="badge-icon">✓</span>
                  <div>
                    <strong>{t('hundredPercentTransparent')}</strong>
                    <p>{t('trackDonation')}</p>
                  </div>
                </div>
                <div className="badge-item">
                  <span className="badge-icon">✓</span>
                  <div>
                    <strong>{t('taxDeductibleReceipt')}</strong>
                    <p>{t('receiveOfficialReceipt')}</p>
                  </div>
                </div>
                <div className="badge-item">
                  <span className="badge-icon">✓</span>
                  <div>
                    <strong>{t('securePayment')}</strong>
                    <p>{t('bankLevelEncryption')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QRIS Modal */}
      <QRISModal
        isOpen={showQRISModal}
        onClose={() => setShowQRISModal(false)}
        donationAmount={getDonationAmount()}
        onConfirmPayment={handleConfirmPayment}
      />

      {/* FAQ Section */}
      <section className="donate-faq">
        <div className="container">
          <h2>{t('frequentlyAskedQuestionsDonate')}</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>{t('howIsMyDonationUsed')}</h4>
              <p>{t('howIsMyDonationUsedAnswer')}</p>
            </div>
            <div className="faq-item">
              <h4>{t('willIReceiveReceipt')}</h4>
              <p>{t('willIReceiveReceiptAnswer')}</p>
            </div>
            <div className="faq-item">
              <h4>{t('canICancelMonthly')}</h4>
              <p>{t('canICancelMonthlyAnswer')}</p>
            </div>
            <div className="faq-item">
              <h4>{t('howTrackImpact')}</h4>
              <p>{t('howTrackImpactAnswer')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Main page component with Suspense wrapper
const DonatePage: React.FC = () => {
  return (
    <Master>
      <Suspense fallback={<DonateLoading />}>
        <DonateContent />
      </Suspense>
    </Master>
  )
}

export default DonatePage
