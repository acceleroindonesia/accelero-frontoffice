'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Master from '@components/Layout/Master'
import { useLanguage } from '@contexts/LanguageContext'

const VolunteerPage = () => {
  const router = useRouter()
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interests: [] as string[],
    availability: '',
    experience: '',
    motivation: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // Volunteer areas with translation keys
  const volunteerAreaKeys = [
    'educationTutoring',
    'healthcareMedical',
    'environmentalConservation',
    'communityDevelopment',
    'technologyDigitalSkills',
    'artsCulture',
    'animalWelfare',
    'disasterRelief',
  ]

  // Availability options with translation keys
  const availabilityKeys = ['weekdays', 'weekends', 'evenings', 'flexible']

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleInterest = (areaKey: string) => {
    setFormData((prev) => {
      const isSelected = prev.interests.includes(areaKey)
      return {
        ...prev,
        interests: isSelected
          ? prev.interests.filter((item) => item !== areaKey)
          : [...prev.interests, areaKey],
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage(t('thankYouVolunteer'))
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          interests: [],
          availability: '',
          experience: '',
          motivation: '',
        })
        setTimeout(() => router.push('/home'), 3000)
      } else {
        setMessage(t('somethingWentWrong'))
      }
    } catch (error) {
      setMessage(t('failedToSubmit'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Master>
      <div className="volunteer-page">
        <section className="volunteer-hero">
          <div className="container">
            <h1>{t('volunteerHeroTitle')}</h1>
            <p>{t('volunteerHeroSubtitle')}</p>
          </div>
        </section>

        <section className="volunteer-content">
          <div className="container">
            <div className="volunteer-grid">
              <div className="volunteer-info">
                <h2>{t('whyVolunteer')}</h2>
                <div className="benefits">
                  <div className="benefit-item">
                    <div className="benefit-icon">🤝</div>
                    <h3>{t('makeAnImpact')}</h3>
                    <p>{t('makeAnImpactDesc')}</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">🌱</div>
                    <h3>{t('learnAndGrow')}</h3>
                    <p>{t('learnAndGrowDesc')}</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">👥</div>
                    <h3>{t('connect')}</h3>
                    <p>{t('connectDesc')}</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">💪</div>
                    <h3>{t('empower')}</h3>
                    <p>{t('empowerDesc')}</p>
                  </div>
                </div>
              </div>

              <div className="volunteer-form-wrapper">
                <h2>{t('volunteerApplication')}</h2>
                {message && (
                  <div
                    className={`message ${message.includes(t('thankYouVolunteer').split('!')[0]) ? 'success' : 'error'}`}
                  >
                    {message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="volunteer-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        {t('firstName')} <span className="required">{t('required')}</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        {t('lastName')} <span className="required">{t('required')}</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">
                        {t('email')} <span className="required">{t('required')}</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">{t('phone')}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      {t('areasOfInterest')} <span className="required">{t('required')}</span>
                    </label>
                    <div className="checkbox-group">
                      {volunteerAreaKeys.map((areaKey) => {
                        const isChecked = formData.interests.includes(areaKey)
                        return (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                          <div
                            key={areaKey}
                            className={`checkbox-label ${isChecked ? 'checked' : ''}`}
                            onClick={() => toggleInterest(areaKey)}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <span>{t(areaKey)}</span>
                          </div>
                        )
                      })}
                    </div>
                    {formData.interests.length === 0 && (
                      <small className="form-hint">{t('selectOneInterest')}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="availability">
                      {t('availability')} <span className="required">{t('required')}</span>
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">{t('selectAvailability')}</option>
                      {availabilityKeys.map((key) => (
                        <option key={key} value={key}>
                          {t(key)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience">{t('relevantExperience')}</label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder={t('experiencePlaceholder')}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="motivation">
                      {t('whyVolunteerQuestion')} <span className="required">{t('required')}</span>
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      placeholder={t('motivationPlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting || formData.interests.length === 0}
                  >
                    {isSubmitting ? t('submitting') : t('submitApplication')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Master>
  )
}

export default VolunteerPage
