'use client'

import React from 'react'
import Link from 'next/link'

const BlogCTA: React.FC = () => {
  return (
    <section className="blog-cta-modern">
      <div className="blog-bg-pattern"></div>
      <div className="container">
        <div className="blog-grid">
          {/* Left Content */}
          <div className="blog-content-modern">
            <span className="blog-label">Stay Connected</span>
            <h2 className="blog-title-modern">
              Never Miss a Story,
              <br />
              <span className="gradient-text">Stay Inspired</span>
            </h2>
            <p className="blog-desc-modern">
              Subscribe to our newsletter and get the latest impact stories, program updates, and
              inspiring content delivered directly to your inbox every month.
            </p>

            <div className="blog-features">
              <div className="feature-item">
                <div className="feature-icon">📬</div>
                <div>
                  <strong>Monthly Newsletter</strong>
                  <p>Curated stories and updates</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🌟</div>
                <div>
                  <strong>Impact Stories</strong>
                  <p>Real stories from the field</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <div>
                  <strong>Exclusive Content</strong>
                  <p>Behind-the-scenes insights</p>
                </div>
              </div>
            </div>

            <div className="newsletter-form-modern">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input-modern"
              />
              <button className="btn-blog-primary">
                <span>Subscribe Now</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>

            <p className="newsletter-note">Join 5,000+ subscribers. Unsubscribe anytime.</p>

            {/* Social Links */}
            <div className="blog-social">
              <h4>Follow Our Journey</h4>
              <div className="social-links">
                <a href="#" className="social-link">
                  📘 Facebook
                </a>
                <a href="#" className="social-link">
                  🐦 Twitter
                </a>
                <a href="#" className="social-link">
                  📸 Instagram
                </a>
                <a href="#" className="social-link">
                  💼 LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Stats */}
          <div className="blog-stats-panel">
            <div className="stats-panel-header">
              <h3>Our Reach</h3>
              <p>Sharing stories that matter</p>
            </div>
            <div className="stats-panel-grid">
              <div className="panel-stat">
                <div className="panel-stat-number">50+</div>
                <div className="panel-stat-label">Articles Published</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat-number">10K+</div>
                <div className="panel-stat-label">Monthly Readers</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat-number">5K+</div>
                <div className="panel-stat-label">Newsletter Subscribers</div>
                <div className="panel-stat-bar">
                  <div className="panel-stat-fill" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="opportunities-list">
              <h4>Popular Topics</h4>
              <div className="opportunity-item">
                <span className="opportunity-icon">🌟</span>
                <div>
                  <strong>Impact Stories</strong>
                  <span>Real change, real people</span>
                </div>
                <span className="opportunity-badge">15 posts</span>
              </div>
              <div className="opportunity-item">
                <span className="opportunity-icon">📢</span>
                <div>
                  <strong>Program Updates</strong>
                  <span>Latest from our programs</span>
                </div>
                <span className="opportunity-badge">12 posts</span>
              </div>
              <div className="opportunity-item">
                <span className="opportunity-icon">🎉</span>
                <div>
                  <strong>Events & Milestones</strong>
                  <span>Celebrating achievements</span>
                </div>
                <span className="opportunity-badge">8 posts</span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <h4>Recent Activity</h4>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <strong>New article published</strong>
                  <span>2 days ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <strong>5,000 students milestone</strong>
                  <span>1 week ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <strong>New partnership announced</strong>
                  <span>2 weeks ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogCTA
