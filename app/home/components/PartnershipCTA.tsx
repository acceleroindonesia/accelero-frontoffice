'use client'

import React from 'react'
import Link from 'next/link'

const PartnershipCTA: React.FC = () => {
  return (
    <section className="partnership-cta-modern">
      <div className="partnership-bg-pattern"></div>
      <div className="container">
        <div className="partnership-grid">
          {/* Left Content */}
          <div className="partnership-content-modern">
            <span className="partnership-label">Get Involved</span>
            <h2 className="partnership-title-modern">
              Partner With Us,
              <br />
              <span className="gradient-text">Create Lasting Impact</span>
            </h2>
            <p className="partnership-desc-modern">
              Join leading organizations committed to transforming education and empowering
              communities. Together, we can amplify your social impact and create sustainable
              change.
            </p>

            <div className="partnership-features">
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <div>
                  <strong>Strategic Alignment</strong>
                  <p>Partnerships tailored to your CSR goals</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div>
                  <strong>Transparent Reporting</strong>
                  <p>Detailed impact metrics and regular updates</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🌍</div>
                <div>
                  <strong>Global Reach</strong>
                  <p>Programs across multiple communities</p>
                </div>
              </div>
            </div>

            <div className="partnership-actions-modern">
              <Link href="/contact" className="btn-partnership-primary">
                <span>Become a Partner</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link href="/about" className="btn-partnership-secondary">
                Learn About Us
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
              <h3>Partnership Impact</h3>
              <p>Building stronger communities together</p>
            </div>
            <div className="stats-panel-grid">
              <div className="panel-stat">
                <div className="panel-stat-number">25+</div>
                <div className="panel-stat-label">Active Partners</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat-number">$2.5M</div>
                <div className="panel-stat-label">Joint Funding</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat-number">8,000+</div>
                <div className="panel-stat-label">Lives Impacted</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            {/* Partnership Types */}
            <div className="opportunities-list">
              <h4>Partnership Opportunities</h4>
              <div className="opportunity-item">
                <span className="opportunity-icon">🏢</span>
                <div>
                  <strong>Corporate Partnership</strong>
                  <span>Strategic CSR initiatives</span>
                </div>
                <span className="opportunity-badge">Available</span>
              </div>
              <div className="opportunity-item">
                <span className="opportunity-icon">🌱</span>
                <div>
                  <strong>Foundation Partnership</strong>
                  <span>Grant-making collaboration</span>
                </div>
                <span className="opportunity-badge">Available</span>
              </div>
              <div className="opportunity-item">
                <span className="opportunity-icon">👥</span>
                <div>
                  <strong>NGO Partnership</strong>
                  <span>Resource sharing programs</span>
                </div>
                <span className="opportunity-badge">Available</span>
              </div>
            </div>

            {/* Current Partners */}
            <div className="current-partners">
              <h4>Trusted By</h4>
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
