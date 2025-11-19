'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@contexts/LanguageContext'

const VolunteerCTA: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section className="volunteer-cta-modern">
      <div className="volunteer-bg-pattern"></div>
      <div className="container">
        <div className="volunteer-grid">
          {/* Left Content */}
          <div className="volunteer-content-modern">
            <span className="volunteer-label">{t('getInvolved')}</span>
            <h2 className="volunteer-title-modern">
              {t('giveYourTime')},
              <br />
              <span className="gradient-text">{t('transformLives')}</span>
            </h2>
            <p className="volunteer-desc-modern">{t('volunteerCtaDesc')}</p>

            <div className="volunteer-features">
              <div className="feature-item">
                <div className="feature-icon">📅</div>
                <div>
                  <strong>{t('flexibleSchedule')}</strong>
                  <p>{t('flexibleScheduleDesc')}</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎓</div>
                <div>
                  <strong>{t('fullTraining')}</strong>
                  <p>{t('fullTrainingDesc')}</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <div>
                  <strong>{t('meaningfulImpact')}</strong>
                  <p>{t('meaningfulImpactDesc2')}</p>
                </div>
              </div>
            </div>

            <div className="volunteer-actions-modern">
              <Link href="/volunteer" className="btn-volunteer-primary">
                <span>{t('applyToVolunteer')}</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link href="/partnerships" className="btn-volunteer-secondary">
                {t('corporatePartnerships')}
              </Link>
            </div>

            {/* Testimonial */}
            <div className="volunteer-testimonial">
              <div className="testimonial-avatar">
                <img src="https://i.pravatar.cc/150?img=32" alt="Volunteer" />
              </div>
              <div className="testimonial-content">
                <p>
                  "Volunteering with Accelero has been the most rewarding experience. Seeing
                  students light up when they finally understand is priceless!"
                </p>
                <strong>Sarah K.</strong>
                <span>Volunteer Teacher, Jakarta</span>
              </div>
            </div>
          </div>

          {/* Right Stats */}
          <div className="volunteer-stats-panel">
            <div className="stats-panel-header">
              <h3>{t('volunteerImpact')}</h3>
              <p>{t('thisYearAchievements')}</p>
            </div>
            <div className="stats-panel-grid">
              <div className="panel-stat">
                <div className="panel-stat-number">120+</div>
                <div className="panel-stat-label">{t('activeVolunteers')}</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat-number">8,400</div>
                <div className="panel-stat-label">{t('teachingHours')}</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat-number">1,200+</div>
                <div className="panel-stat-label">{t('studentsTutored')}</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Opportunities */}
            <div className="opportunities-list">
              <h4>{t('currentOpportunities')}</h4>
              <div className="opportunity-item">
                <span className="opportunity-icon">📖</span>
                <div>
                  <strong>{t('readingTutor')}</strong>
                  <span>{t('readingTutorDetails')}</span>
                </div>
                <span className="opportunity-badge">5 {t('slots')}</span>
              </div>
              <div className="opportunity-item">
                <span className="opportunity-icon">🔢</span>
                <div>
                  <strong>{t('mathMentor')}</strong>
                  <span>{t('mathMentorDetails')}</span>
                </div>
                <span className="opportunity-badge">3 {t('slots')}</span>
              </div>
              <div className="opportunity-item">
                <span className="opportunity-icon">🎨</span>
                <div>
                  <strong>{t('creativeWorkshopLeader')}</strong>
                  <span>{t('creativeWorkshopDetails')}</span>
                </div>
                <span className="opportunity-badge">2 {t('slots')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VolunteerCTA
