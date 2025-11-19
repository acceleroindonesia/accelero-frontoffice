'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@contexts/LanguageContext'

const PartnershipCTA: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section className="partnership-cta-modern">
      <div className="partnership-bg-pattern"></div>
      <div className="container">
        <div className="partnership-grid">
          {/* Left Content */}
          <div className="partnership-content-modern">
            <span className="partnership-label">{t('getInvolved')}</span>
            <h2 className="partnership-title-modern">
              {t('partnerWithUs')},
              <br />
              <span className="gradient-text">{t('createLastingImpact')}</span>
            </h2>
            <p className="partnership-desc-modern">{t('partnershipDesc')}</p>

            <div className="partnership-features">
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <div>
                  <strong>{t('strategicAlignment')}</strong>
                  <p>{t('strategicAlignmentDesc')}</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div>
                  <strong>{t('transparentReporting')}</strong>
                  <p>{t('transparentReportingDesc')}</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🌍</div>
                <div>
                  <strong>{t('globalReach')}</strong>
                  <p>{t('globalReachDesc')}</p>
                </div>
              </div>
            </div>

            <div className="partnership-actions-modern">
              <Link href="/contact" className="btn-partnership-primary">
                <span>{t('becomeAPartner')}</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link href="/about" className="btn-partnership-secondary">
                {t('learnAboutUs')}
              </Link>
            </div>

            {/* Testimonial */}
            <div className="partnership-testimonial">
              <div className="testimonial-avatar">
                <img src="https://i.pravatar.cc/150?img=12" alt="Partner Representative" />
              </div>
              <div className="testimonial-content">
                <p>
                  "Partnering with Accelero has been transformative for our CSR initiatives. Their
                  transparency and measurable impact align perfectly with our values."
                </p>
                <strong>Michael Chen</strong>
                <span>CSR Director, TechCorp Global</span>
              </div>
            </div>
          </div>

          {/* Right Stats */}
          <div className="partnership-stats-panel">
            <div className="stats-panel-header">
              <h3>{t('partnershipImpact')}</h3>
              <p>{t('buildingStrongerCommunities')}</p>
            </div>
            <div className="stats-panel-grid">
              <div className="panel-stat">
                <div className="panel-stat-number">25+</div>
                <div className="panel-stat-label">{t('activePartners')}</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat-number">$2.5M</div>
                <div className="panel-stat-label">{t('jointFunding')}</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat-number">8,000+</div>
                <div className="panel-stat-label">{t('livesImpacted')}</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            {/* Partnership Types */}
            <div className="opportunities-list">
              <h4>{t('partnershipOpportunities')}</h4>
              <div className="opportunity-item">
                <span className="opportunity-icon">🏢</span>
                <div>
                  <strong>{t('corporatePartnership')}</strong>
                  <span>{t('corporatePartnershipDesc')}</span>
                </div>
                <span className="opportunity-badge">{t('available')}</span>
              </div>
              <div className="opportunity-item">
                <span className="opportunity-icon">🌱</span>
                <div>
                  <strong>{t('foundationPartnership')}</strong>
                  <span>{t('foundationPartnershipDesc')}</span>
                </div>
                <span className="opportunity-badge">{t('available')}</span>
              </div>
              <div className="opportunity-item">
                <span className="opportunity-icon">👥</span>
                <div>
                  <strong>{t('ngoPartnership')}</strong>
                  <span>{t('ngoPartnershipDesc')}</span>
                </div>
                <span className="opportunity-badge">{t('available')}</span>
              </div>
            </div>

            {/* Current Partners */}
            <div className="current-partners">
              <h4>{t('trustedBy')}</h4>
              <div className="partner-logos">
                <div className="partner-logo">TC</div>
                <div className="partner-logo">GF</div>
                <div className="partner-logo">EI</div>
                <div className="partner-logo">WH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnershipCTA
