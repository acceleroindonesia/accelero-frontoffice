'use client'

import { useState } from 'react'
import Master from '@components/Layout/Master'
import Section from '@components/Section/Section'
import { ScrollAnimations } from '../home/components/ScrollAnimations'
import { useLanguage } from '@contexts/LanguageContext'

const ContactPage: React.FC = () => {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitStatus({
        type: 'success',
        message: t('thankYouContact'),
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      })
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: t('contactError'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Master>
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-label">{t('getInTouch')}</span>
            <h1 className="contact-title">{t('contactHeroTitle')}</h1>
            <p className="contact-subtitle">{t('contactHeroSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <Section className="contact-methods-section">
        <div className="container">
          <div className="contact-methods-grid">
            {/* Email Card */}
            <div className="contact-method-card">
              <div className="method-icon email-icon">📧</div>
              <h3>{t('emailUs')}</h3>
              <p>{t('emailUsDesc')}</p>
              <a href="mailto:info@accelero-indonesia.org" className="method-link">
                info@accelero-indonesia.org
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="contact-method-card">
              <div className="method-icon whatsapp-icon">💬</div>
              <h3>{t('whatsApp')}</h3>
              <p>{t('whatsAppDesc')}</p>
              <a
                href="https://wa.me/6281292207121?text=Hi%20Accelero!%20I'd%20like%20to%20learn%20more%20about%20your%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="method-link"
              >
                +62 812-9220-7121
              </a>
            </div>

            {/* Office Card */}
            <div className="contact-method-card">
              <div className="method-icon location-icon">📍</div>
              <h3>{t('officeLocation')}</h3>
              <p>{t('officeLocationDesc')}</p>
              <span className="method-link">{t('workingRemotely')}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-grid">
            {/* Left Side - Form */}
            <div className="form-container">
              <div className="form-header">
                <h2>{t('sendUsMessage')}</h2>
                <p>{t('sendUsMessageDesc')}</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      {t('fullName')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder={t('fullNamePlaceholder')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      {t('emailAddress')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder={t('emailPlaceholder')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      {t('phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder={t('phonePlaceholder')}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      {t('subject')} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="general">{t('generalInquiry')}</option>
                      <option value="volunteer">{t('volunteerOpportunity')}</option>
                      <option value="partnership">{t('partnership')}</option>
                      <option value="donation">{t('donationQuestion')}</option>
                      <option value="media">{t('mediaPress')}</option>
                      <option value="other">{t('other')}</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    {t('yourMessage')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder={t('messagePlaceholder')}
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {submitStatus.type && (
                  <div
                    className={`form-status ${submitStatus.type === 'success' ? 'success' : 'error'}`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      {t('sending')}
                    </>
                  ) : (
                    <>
                      <span>{t('sendMessage')}</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Info */}
            <div className="contact-info-sidebar">
              <div className="info-card">
                <h3>{t('quickConnect')}</h3>
                <p>{t('quickConnectDesc')}</p>
                <div className="quick-links">
                  <a
                    href="https://wa.me/6281292207121?text=Hi%20Accelero!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-link-btn whatsapp-btn"
                  >
                    <span className="btn-icon">💬</span>
                    <span>{t('messageOnWhatsApp')}</span>
                  </a>
                  <a href="mailto:info@accelero-indonesia.org" className="quick-link-btn email-btn">
                    <span className="btn-icon">📧</span>
                    <span>{t('sendEmail')}</span>
                  </a>
                </div>
              </div>

              <div className="info-card">
                <h3>{t('officeHours')}</h3>
                <div className="office-hours">
                  <div className="hours-row">
                    <span className="day">{t('mondayFriday')}</span>
                    <span className="time">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-row">
                    <span className="day">{t('saturday')}</span>
                    <span className="time">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-row">
                    <span className="day">{t('sunday')}</span>
                    <span className="time">{t('closed')}</span>
                  </div>
                </div>
                <p className="timezone-note">
                  <em>{t('timezoneNote')}</em>
                </p>
              </div>

              <div className="info-card">
                <h3>{t('needHelp')}</h3>
                <p>{t('needHelpDesc')}</p>
                <a href="/help" className="help-link">
                  {t('visitHelpCenter')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Section className="contact-faq-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{t('faq')}</span>
            <h2 className="section-title-large">{t('frequentlyAskedQuestions')}</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <h4>{t('howCanIVolunteer')}</h4>
              <p>{t('howCanIVolunteerAnswer')}</p>
            </div>

            <div className="faq-card">
              <h4>{t('howDoIMakeDonation')}</h4>
              <p>{t('howDoIMakeDonationAnswer')}</p>
            </div>

            <div className="faq-card">
              <h4>{t('canMyOrganizationPartner')}</h4>
              <p>{t('canMyOrganizationPartnerAnswer')}</p>
            </div>

            <div className="faq-card">
              <h4>{t('howDoIGetUpdates')}</h4>
              <p>{t('howDoIGetUpdatesAnswer')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="contact-cta-section">
        <div className="container">
          <div className="cta-card-contact">
            <h2>{t('joinOurMission')}</h2>
            <p>{t('joinOurMissionDesc')}</p>
            <div className="cta-buttons-row">
              <a href="/donate" className="btn-cta-white">
                {t('makeADonation')}
              </a>
              <a href="/projects" className="btn-cta-outline-white">
                {t('viewOurPrograms')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Master>
  )
}

export default ContactPage
