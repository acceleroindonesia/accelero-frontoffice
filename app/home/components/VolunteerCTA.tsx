"use client";

import React from "react";
import Link from "next/link";

const VolunteerCTA: React.FC = () => {
  return (
    <section className="volunteer-cta-modern">
      <div className="volunteer-bg-pattern"></div>
      <div className="container">
        <div className="volunteer-grid">
          {/* Left Content */}
          <div className="volunteer-content-modern">
            <span className="volunteer-label">Get Involved</span>
            <h2 className="volunteer-title-modern">
              Give Your Time,
              <br />
              <span className="gradient-text">Transform Lives</span>
            </h2>
            <p className="volunteer-desc-modern">
              Join our community of passionate volunteers making a direct impact on students'
              learning journeys. Whether you can teach, mentor, or support our programs - every
              contribution matters.
            </p>

            <div className="volunteer-features">
              <div className="feature-item">
                <div className="feature-icon">📅</div>
                <div>
                  <strong>Flexible Schedule</strong>
                  <p>Online or on-site, full-time or part-time</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎓</div>
                <div>
                  <strong>Full Training</strong>
                  <p>Complete onboarding and ongoing support</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <div>
                  <strong>Meaningful Impact</strong>
                  <p>See the direct results of your work</p>
                </div>
              </div>
            </div>

            <div className="volunteer-actions-modern">
              <Link href="/volunteer" className="btn-volunteer-primary">
                <span>Apply to Volunteer</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link href="/partnerships" className="btn-volunteer-secondary">
                Corporate Partnerships
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
              <h3>Volunteer Impact</h3>
              <p>This year's achievements</p>
            </div>
            <div className="stats-panel-grid">
              <div className="panel-stat">
                <div className="panel-stat-number">120+</div>
                <div className="panel-stat-label">Active Volunteers</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat-number">8,400</div>
                <div className="panel-stat-label">Teaching Hours</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat-number">1,200+</div>
                <div className="panel-stat-label">Students Tutored</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>

            {/* Opportunities */}
            <div className="opportunities-list">
              <h4>Current Opportunities</h4>
              <div className="opportunity-item">
                <span className="opportunity-icon">📖</span>
                <div>
                  <strong>Reading Tutor</strong>
                  <span>Remote • 3hrs/week</span>
                </div>
                <span className="opportunity-badge">5 slots</span>
              </div>
              <div className="opportunity-item">
                <span className="opportunity-icon">🔢</span>
                <div>
                  <strong>Math Mentor</strong>
                  <span>Jakarta • Weekends</span>
                </div>
                <span className="opportunity-badge">3 slots</span>
              </div>
              <div className="opportunity-item">
                <span className="opportunity-icon">🎨</span>
                <div>
                  <strong>Creative Workshop Leader</strong>
                  <span>Sorong • Monthly</span>
                </div>
                <span className="opportunity-badge">2 slots</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerCTA;