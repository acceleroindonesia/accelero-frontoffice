'use client'

import React from 'react'
import '../styles/partnership.css'
import Master from '@components/Layout/Master'
import { useLanguage } from '@contexts/LanguageContext'

export default function PartnershipPage() {
  const { t } = useLanguage()

  return (
    <Master>
      {/* Hero Section */}
      <section className="partnership-hero">
        <div className="partnership-hero-content">
          <h1 className="partnership-hero-title">{t('partnershipHeroTitle')}</h1>
          <p className="partnership-hero-subtitle">{t('partnershipHeroSubtitle')}</p>
          <a href="/contact" className="btn-hero">
            {t('becomeAPartner')}
          </a>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="partnership-why">
        <div className="container">
          <h2 className="section-title">{t('whyPartner')}</h2>
          <div className="partnership-benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>{t('meaningfulImpact')}</h3>
              <p>{t('meaningfulImpactDesc')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h3>{t('globalReach')}</h3>
              <p>{t('globalReachDesc2')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>{t('transparentReporting')}</h3>
              <p>{t('transparentReportingDesc2')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💼</div>
              <h3>{t('brandVisibility')}</h3>
              <p>{t('brandVisibilityDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="partnership-types">
        <div className="container">
          <h2 className="section-title">{t('partnershipOpportunities')}</h2>
          <div className="partnership-types-grid">
            <div className="type-card">
              <h3>{t('corporatePartnership')}</h3>
              <p>{t('corporatePartnershipFull')}</p>
              <ul className="type-features">
                <li>{t('corporateFeature1')}</li>
                <li>{t('corporateFeature2')}</li>
                <li>{t('corporateFeature3')}</li>
                <li>{t('corporateFeature4')}</li>
              </ul>
              <a href="/contact" className="btn-outline">
                {t('learnMore')}
              </a>
            </div>
            <div className="type-card">
              <h3>{t('foundationPartnership')}</h3>
              <p>{t('foundationPartnershipFull')}</p>
              <ul className="type-features">
                <li>{t('foundationFeature1')}</li>
                <li>{t('foundationFeature2')}</li>
                <li>{t('foundationFeature3')}</li>
                <li>{t('foundationFeature4')}</li>
              </ul>
              <a href="/contact" className="btn-outline">
                {t('learnMore')}
              </a>
            </div>
            <div className="type-card">
              <h3>{t('ngoPartnership')}</h3>
              <p>{t('ngoPartnershipFull')}</p>
              <ul className="type-features">
                <li>{t('ngoFeature1')}</li>
                <li>{t('ngoFeature2')}</li>
                <li>{t('ngoFeature3')}</li>
                <li>{t('ngoFeature4')}</li>
              </ul>
              <a href="/contact" className="btn-outline">
                {t('learnMore')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="partnership-stories">
        <div className="container">
          <h2 className="section-title">{t('partnershipSuccessStories')}</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-image-placeholder">
                <div className="story-icon">🏢</div>
              </div>
              <div className="story-content">
                <h4>TechCorp Global</h4>
                <p className="story-description">
                  Through our partnership, TechCorp provided digital literacy training to 5,000+
                  students in rural areas, transforming education access.
                </p>
                <div className="story-impact">
                  <div className="impact-stat">
                    <strong>5,000+</strong>
                    <span>{t('studentsTrained')}</span>
                  </div>
                  <div className="impact-stat">
                    <strong>15</strong>
                    <span>{t('communities')}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-image-placeholder">
                <div className="story-icon">🌱</div>
              </div>
              <div className="story-content">
                <h4>Green Future Foundation</h4>
                <p className="story-description">
                  Our collaboration launched sustainable agriculture programs that increased food
                  security for 3,000 families.
                </p>
                <div className="story-impact">
                  <div className="impact-stat">
                    <strong>3,000</strong>
                    <span>{t('familiesHelped')}</span>
                  </div>
                  <div className="impact-stat">
                    <strong>50%</strong>
                    <span>{t('yieldIncrease')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="partnership-process">
        <div className="container">
          <h2 className="section-title">{t('howPartnershipWorks')}</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h4>{t('initialConsultation')}</h4>
              <p>{t('initialConsultationDesc')}</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h4>{t('customizedProposal')}</h4>
              <p>{t('customizedProposalDesc')}</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h4>{t('implementation')}</h4>
              <p>{t('implementationDesc')}</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h4>{t('impactReporting')}</h4>
              <p>{t('impactReportingDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="partnership-cta">
        <div className="container">
          <div className="cta-content">
            <h2>{t('readyToMakeDifference')}</h2>
            <p>{t('readyToMakeDifferenceDesc')}</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-primary-large">
                {t('startConversation')}
              </a>
              <a href="/about" className="btn-outline-light">
                {t('learnAboutUs')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Master>
  )
}
