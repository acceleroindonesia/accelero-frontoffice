'use client'

import React from 'react'
import { useLanguage } from '@contexts/LanguageContext'

const ImpactStats: React.FC = () => {
  const { t } = useLanguage()

  const stats = [
    {
      icon: '📚',
      number: '12,500+',
      label: t('booksDistributed'),
      description: t('booksDistributedDesc'),
      color: '#667eea',
    },
    {
      icon: '👨‍🏫',
      number: '156',
      label: t('teachersTrained'),
      description: t('teachersTrainedDesc'),
      color: '#f56565',
    },
    {
      icon: '🌍',
      number: '8',
      label: t('regionsServed'),
      description: t('regionsServedDesc'),
      color: '#48bb78',
    },
    {
      icon: '💰',
      number: 'Rp 285M',
      label: t('totalFunding'),
      description: t('totalFundingDesc'),
      color: '#ed8936',
    },
  ]

  return (
    <section className="impact-stats-modern">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-modern">
          <span className="section-label">{t('ourImpact')}</span>
          <h2 className="section-title-modern">{t('makingRealDifference')}</h2>
          <p className="section-desc-modern">{t('impactStatsDesc')}</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid-modern">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card-modern"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}20` }}>
                <span className="stat-icon-large">{stat.icon}</span>
              </div>
              <div className="stat-number-modern" style={{ color: stat.color }}>
                {stat.number}
              </div>
              <h3 className="stat-label-modern">{stat.label}</h3>
              <p className="stat-desc-modern">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="overall-progress">
          <div className="progress-header">
            <div>
              <h4>{t('annualGoalProgress')}</h4>
              <p>{t('annualGoalProgressDesc')}</p>
            </div>
            <div className="progress-percentage">50%</div>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '50%' }}>
              <div className="progress-shimmer"></div>
            </div>
          </div>
          <div className="progress-footer">
            <span>2,500 {t('studentsReached')}</span>
            <span>2,500 {t('studentsToGo')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImpactStats
