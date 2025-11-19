'use client'

import React from 'react'
import { useLanguage } from '@contexts/LanguageContext'

const HowItWorks: React.FC = () => {
  const { t } = useLanguage()

  const steps = [
    {
      number: '01',
      icon: '🎯',
      title: t('chooseYourImpact'),
      description: t('chooseYourImpactDesc'),
      details: [t('chooseDetail1'), t('chooseDetail2'), t('chooseDetail3')],
    },
    {
      number: '02',
      icon: '💝',
      title: t('donateSecurely'),
      description: t('donateSecurelyDesc'),
      details: [t('donateDetail1'), t('donateDetail2'), t('donateDetail3')],
    },
    {
      number: '03',
      icon: '📊',
      title: t('trackProgress'),
      description: t('trackProgressDesc'),
      details: [t('trackDetail1'), t('trackDetail2'), t('trackDetail3')],
    },
    {
      number: '04',
      icon: '🌟',
      title: t('seeResults'),
      description: t('seeResultsDesc'),
      details: [t('seeDetail1'), t('seeDetail2'), t('seeDetail3')],
    },
  ]

  return (
    <section className="how-it-works-modern">
      <div className="container">
        <div className="section-header-modern center">
          <span className="section-label">{t('simpleTransparent')}</span>
          <h2 className="section-title-modern">{t('howDonationCreatesChange')}</h2>
          <p className="section-desc-modern">{t('howDonationDesc')}</p>
        </div>

        <div className="steps-timeline">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-item"
              data-aos="fade-right"
              data-aos-delay={index * 150}
            >
              <div className="step-connector">
                {index < steps.length - 1 && <div className="connector-line"></div>}
              </div>
              <div className="step-card-modern">
                <div className="step-number-badge">{step.number}</div>
                <div className="step-icon-modern">{step.icon}</div>
                <h3 className="step-title-modern">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <ul className="step-details">
                  {step.details.map((detail, idx) => (
                    <li key={idx}>
                      <span className="detail-check">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="section-cta">
          <h3>{t('readyToMakeDifference2')}</h3>
          <p>{t('readyToMakeDifferenceDesc2')}</p>
          <div className="cta-buttons">
            <a href="/donate" className="btn-cta-primary">
              {t('startDonating')}
            </a>
            <a href="/volunteer" className="btn-cta-secondary">
              {t('becomeVolunteer')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
