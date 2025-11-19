'use client'

import React from 'react'

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: '🎯',
      title: 'Choose Your Impact',
      description: 'Browse featured schools and programs that need support right now',
      details: ['View school details', 'See specific needs', 'Track progress live'],
    },
    {
      number: '02',
      icon: '💝',
      title: 'Donate Securely',
      description: 'Make a one-time or monthly donation via QRIS or credit card',
      details: ['100% secure', 'Tax-deductible', 'Add personal message'],
    },
    {
      number: '03',
      icon: '📊',
      title: 'Track Progress',
      description: 'Receive regular updates with photos, stories, and measurable results',
      details: ['Monthly reports', 'Student testimonials', 'Photo updates'],
    },
    {
      number: '04',
      icon: '🌟',
      title: 'See Results',
      description: 'Watch students achieve milestones and transform their futures',
      details: ['Success metrics', 'Before & after', 'Community impact'],
    },
  ]

  return (
    <section className="how-it-works-modern">
      <div className="container">
        <div className="section-header-modern center">
          <span className="section-label">Simple & Transparent</span>
          <h2 className="section-title-modern">How Your Donation Creates Change</h2>
          <p className="section-desc-modern">
            From your generosity to student success - every step is tracked and transparent
          </p>
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
          <h3>Ready to make a difference?</h3>
          <p>Join hundreds of donors transforming education in Indonesia</p>
          <div className="cta-buttons">
            <a href="/donate" className="btn-cta-primary">
              Start Donating
            </a>
            <a href="/volunteer" className="btn-cta-secondary">
              Become a Volunteer
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
