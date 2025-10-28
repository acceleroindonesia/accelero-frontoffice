"use client";

import React from "react";
import "../styles/partnership.css";
import Master from "@components/Layout/Master";


export default function PartnershipPage() {
  return (
    <Master>
      {/* Hero Section */}
      <section className="partnership-hero">
        <div className="partnership-hero-content">
          <h1 className="partnership-hero-title">Partner With Us</h1>
          <p className="partnership-hero-subtitle">
            Join forces to create lasting impact and transform communities
            together
          </p>
          <a href="/contact" className="btn-hero">
            Become a Partner
          </a>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="partnership-why">
        <div className="container">
          <h2 className="section-title">Why Partner With Accelero?</h2>
          <div className="partnership-benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Meaningful Impact</h3>
              <p>
                Create real change by supporting programs that directly improve
                lives in underserved communities
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h3>Global Reach</h3>
              <p>
                Expand your social impact footprint across multiple regions and
                communities worldwide
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Transparent Reporting</h3>
              <p>
                Receive detailed reports on your partnership impact with
                measurable outcomes and metrics
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💼</div>
              <h3>Brand Visibility</h3>
              <p>
                Enhance your corporate social responsibility profile through
                strategic collaboration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="partnership-types">
        <div className="container">
          <h2 className="section-title">Partnership Opportunities</h2>
          <div className="partnership-types-grid">
            <div className="type-card">
              <h3>Corporate Partnership</h3>
              <p>
                Strategic alliances with businesses committed to social
                responsibility and community development
              </p>
              <ul className="type-features">
                <li>Co-branded initiatives</li>
                <li>Employee engagement programs</li>
                <li>Matching gift campaigns</li>
                <li>Cause marketing opportunities</li>
              </ul>
              <a href="/contact" className="btn-outline">
                Learn More
              </a>
            </div>
            <div className="type-card">
              <h3>Foundation Partnership</h3>
              <p>
                Collaborate with foundations to amplify grant-making impact and
                reach more communities
              </p>
              <ul className="type-features">
                <li>Joint funding initiatives</li>
                <li>Program development</li>
                <li>Research collaboration</li>
                <li>Impact measurement</li>
              </ul>
              <a href="/contact" className="btn-outline">
                Learn More
              </a>
            </div>
            <div className="type-card">
              <h3>NGO Partnership</h3>
              <p>
                Partner with other nonprofits to combine resources and expertise
                for greater impact
              </p>
              <ul className="type-features">
                <li>Resource sharing</li>
                <li>Joint programs</li>
                <li>Knowledge exchange</li>
                <li>Network expansion</li>
              </ul>
              <a href="/contact" className="btn-outline">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="partnership-stories">
        <div className="container">
          <h2 className="section-title">Partnership Success Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-image-placeholder">
                <div className="story-icon">🏢</div>
              </div>
              <div className="story-content">
                <h4>TechCorp Global</h4>
                <p className="story-description">
                  Through our partnership, TechCorp provided digital literacy
                  training to 5,000+ students in rural areas, transforming
                  education access.
                </p>
                <div className="story-impact">
                  <div className="impact-stat">
                    <strong>5,000+</strong>
                    <span>Students Trained</span>
                  </div>
                  <div className="impact-stat">
                    <strong>15</strong>
                    <span>Communities</span>
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
                  Our collaboration launched sustainable agriculture programs
                  that increased food security for 3,000 families.
                </p>
                <div className="story-impact">
                  <div className="impact-stat">
                    <strong>3,000</strong>
                    <span>Families Helped</span>
                  </div>
                  <div className="impact-stat">
                    <strong>50%</strong>
                    <span>Yield Increase</span>
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
          <h2 className="section-title">How Partnership Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h4>Initial Consultation</h4>
              <p>
                We discuss your goals, values, and desired impact areas to find
                the perfect alignment
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h4>Customized Proposal</h4>
              <p>
                Receive a tailored partnership proposal outlining objectives,
                activities, and expected outcomes
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h4>Implementation</h4>
              <p>
                Launch collaborative programs with dedicated support and regular
                communication
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h4>Impact Reporting</h4>
              <p>
                Receive comprehensive reports showcasing the measurable impact
                of your partnership
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="partnership-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference Together?</h2>
            <p>
              Let's explore how we can partner to create meaningful and lasting
              impact in communities around the world.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-primary-large">
                Start a Conversation
              </a>
              <a href="/about" className="btn-outline-light">
                Learn About Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Master>
  );
}