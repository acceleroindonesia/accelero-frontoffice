'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Master from '@components/Layout/Master'
import { ScrollAnimations } from '../home/components/ScrollAnimations'
import Request from '@utils/Request'

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

// Main donate content component that uses useSearchParams
const DonateContent: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectParam = searchParams.get('project')

  const [selectedProject, setSelectedProject] = useState<IDonationProject | null>(null)
  const [projects, setProjects] = useState<IDonationProject[]>([])

  // Form state
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
    { value: '', label: 'Select your motivation...' },
    { value: 'education', label: 'I believe in education equity' },
    { value: 'community', label: 'Supporting my community' },
    { value: 'impact', label: 'Want to see measurable impact' },
    { value: 'future', label: "Investing in children's future" },
    { value: 'tax', label: 'Tax-deductible donation' },
    { value: 'other', label: 'Other' },
  ]

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projectParam && projects.length > 0) {
      const project = projects.find((p) => p.id === projectParam)
      if (project) {
        setSelectedProject(project)
      }
    }
  }, [projectParam, projects])

  const fetchProjects = async () => {
    try {
      const res = await Request.getResponse({
        url: '/api/projects?status=active&limit=20',
        method: 'GET',
      })

      const data = res?.data as { projects?: IDonationProject[] }
      if (data?.projects) {
        setProjects(data.projects)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  // Update URL when project changes
  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    setSelectedProject(project || null)

    // Update URL query parameter
    const newUrl = projectId === 'general' ? '/donate' : `/donate?project=${projectId}`
    router.push(newUrl, { scroll: false })
  }

  const getDonationAmount = (): number => {
    if (customAmount) {
      return parseInt(customAmount) || 0
    }
    return selectedAmount || 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const amount = getDonationAmount()

    if (amount < 10000) {
      alert('Minimum donation is Rp 10,000')
      setIsSubmitting(false)
      return
    }

    if (!donorName || !donorEmail) {
      alert('Please fill in your name and email')
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
        },
      })

      const data = res?.data as { success?: boolean; donationId?: string; error?: string }
      if (data?.success) {
        // Redirect to payment page
        window.location.href = `/payment/${data.donationId}`
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

  const getImpactMessage = () => {
    const amount = getDonationAmount()
    if (amount >= 1000000) {
      return `can train ${Math.floor(amount / 1000000)} teacher(s) in TaRL methodology`
    } else if (amount >= 500000) {
      return `can support ${Math.floor(amount / 100000)} students for one month`
    } else if (amount >= 100000) {
      return `can provide ${Math.floor(amount / 10000)} reading books`
    }
    return "will make a real difference in a student's life"
  }

  return (
    <>
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="donate-hero">
        <div className="container">
          <div className="donate-hero-content">
            <span className="donate-label">Make an Impact</span>
            <h1 className="donate-title">Every Donation Changes Lives</h1>
            <p className="donate-subtitle">
              Your contribution provides books, training, and hope to students who need it most.
              100% transparent, 100% impactful.
            </p>
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
                            % funded
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
                    Choose Your Amount
                  </h2>

                  {/* Donation Type Toggle */}
                  <div className="donation-type-toggle">
                    <button
                      type="button"
                      className={`toggle-btn ${donationType === 'one-time' ? 'active' : ''}`}
                      onClick={() => setDonationType('one-time')}
                    >
                      <span className="toggle-icon">💝</span>
                      <span>One-Time</span>
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${donationType === 'monthly' ? 'active' : ''}`}
                      onClick={() => setDonationType('monthly')}
                    >
                      <span className="toggle-icon">🔄</span>
                      <span>Monthly</span>
                    </button>
                  </div>

                  {donationType === 'monthly' && (
                    <div className="monthly-info">
                      ℹ️ Monthly donations help us plan better and create lasting impact
                    </div>
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
                    <label className="form-label">Or enter custom amount</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">Rp</span>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(null)
                        }}
                        min="10000"
                      />
                    </div>
                    <small className="form-hint">Minimum donation: Rp 10,000</small>
                  </div>
                </div>

                {/* Motivation */}
                <div className="form-section">
                  <h2 className="section-title">
                    <span className="section-number">3</span>
                    Share Your Motivation
                  </h2>
                  <div className="form-group">
                    <label className="form-label">What inspired you to give today?</label>
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
                      Message of Encouragement <span className="optional">(Optional)</span>
                    </label>
                    <textarea
                      className="form-textarea"
                      placeholder="Send a message to the students and teachers..."
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
                    Your Information
                  </h2>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your full name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      disabled={anonymous}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="your@email.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Phone Number <span className="optional">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+62 xxx xxxx xxxx"
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
                      <span>Make my donation anonymous</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                      />
                      <span>Send me monthly impact updates</span>
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>Proceed to Payment</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>

                <p className="form-security">
                  🔒 Your donation is secure and encrypted. We never store your payment details.
                </p>
              </form>
            </div>

            {/* Right Side - Summary */}
            <div className="donate-sidebar">
              <div className="donation-summary">
                <h3>Donation Summary</h3>

                <div className="summary-item">
                  <span className="summary-label">Donation Type</span>
                  <span className="summary-value">
                    {donationType === 'one-time' ? 'One-Time' : 'Monthly Recurring'}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Amount</span>
                  <span className="summary-value summary-amount">
                    Rp {getDonationAmount().toLocaleString()}
                  </span>
                </div>

                {selectedProject && (
                  <div className="summary-item">
                    <span className="summary-label">Supporting</span>
                    <span className="summary-value">{selectedProject.title}</span>
                  </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-impact">
                  <h4>Your Impact</h4>
                  <p>
                    Your donation of Rp {getDonationAmount().toLocaleString()} {getImpactMessage()}
                  </p>
                </div>

                {donationType === 'monthly' && getDonationAmount() > 0 && (
                  <div className="summary-yearly">
                    <span>Annual total</span>
                    <span>Rp {(getDonationAmount() * 12).toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="trust-badges">
                <h4>Why Donate with Us?</h4>
                <div className="badge-item">
                  <span className="badge-icon">✓</span>
                  <div>
                    <strong>100% Transparent</strong>
                    <p>Track exactly where your donation goes</p>
                  </div>
                </div>
                <div className="badge-item">
                  <span className="badge-icon">✓</span>
                  <div>
                    <strong>Tax Deductible</strong>
                    <p>Receive official donation receipt</p>
                  </div>
                </div>
                <div className="badge-item">
                  <span className="badge-icon">✓</span>
                  <div>
                    <strong>Secure Payment</strong>
                    <p>Bank-level encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="donate-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How is my donation used?</h4>
              <p>
                100% of your donation goes directly to program costs - books, teacher training, and
                student materials. Administrative costs are covered separately.
              </p>
            </div>
            <div className="faq-item">
              <h4>Will I receive a receipt?</h4>
              <p>
                Yes! You'll receive an email receipt immediately after donation, which is valid for
                tax deduction purposes.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can I cancel monthly donations?</h4>
              <p>
                Absolutely. You can cancel or modify your monthly donation at any time from your
                donor dashboard.
              </p>
            </div>
            <div className="faq-item">
              <h4>How do I track impact?</h4>
              <p>
                We send monthly updates with photos, stories, and measurable results from the
                programs you support.
              </p>
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
