"use client";

import Master from "@components/Layout/Master";
import Section from "@components/Section/Section";
import { ScrollAnimations } from "../home/components/ScrollAnimations";
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <Master>
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span className="about-label">About Accelero</span>
            <h1 className="about-title">
              Empowering Indonesia's Future, One Child at a Time
            </h1>
            <p className="about-subtitle">
              We believe that every child deserves quality education, regardless
              of where they were born. Together, we're bridging the learning gap
              in Indonesia's most underserved communities.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <Section className="our-story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="section-label">Our Story</span>
              <h2 className="section-title-large">
                Born from Personal Experience
              </h2>
              <p className="story-text">
                Founded in 2025 by <strong>Catherine Octaviane Tikara</strong>{" "}
                and <strong>Kevin Evannanda Septian</strong>, Accelero was born
                from personal experience. Both founders grew up in rural regions
                of Indonesia and witnessed firsthand the educational disparities
                that exist between urban and rural communities.
              </p>
              <p className="story-text">
                Their journey through education in urban centers gave them a deep
                understanding of the challenges faced by students who are often
                left behind in the classroom. Driven by this awareness and a
                commitment to change, they founded Accelero to address the urgent
                need for equitable educational opportunities for children in rural
                Indonesia.
              </p>
              <div className="story-highlight">
                <span className="highlight-icon">🏆</span>
                <div>
                  <h4>D-Prize Grant Recipient 2025</h4>
                  <p>
                    Recognized for our innovative approach to distributing
                    evidence-based education solutions in underserved regions.
                  </p>
                </div>
              </div>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span className="placeholder-icon">📚</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card mission-card">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To accelerate foundational literacy and numeracy for children in
                Indonesia's most underserved communities through evidence-based
                teaching methods and community empowerment.
              </p>
            </div>
            <div className="mv-card vision-card">
              <div className="mv-icon">🌟</div>
              <h3>Our Vision</h3>
              <p>
                An Indonesia where no child is left behind because of where they
                were born—where every child has access to quality education and
                the opportunity to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <Section className="what-we-do-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">What We Do</span>
            <h2 className="section-title-large">
              Evidence-Based Education, Community-Powered Impact
            </h2>
            <p className="section-description">
              We bring the proven Teaching at the Right Level (TaRL) methodology
              to rural primary schools across Indonesia
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>After-School Programs</h3>
              <p>
                Supporting students in grades 3-6 who are falling behind in
                reading and math by teaching them based on their actual learning
                level, not their grade level.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>University Volunteer Training</h3>
              <p>
                Partnering with local universities to recruit and train student
                volunteers, providing hands-on teaching experience while
                empowering them to serve their communities.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Literacy-Rich Environments</h3>
              <p>
                Equipping schools with reading books through donations and local
                partnerships, helping create joyful, engaging learning spaces.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Community Partnerships</h3>
              <p>
                Working closely with schools, district education offices, and
                local universities to create inclusive and scalable learning
                ecosystems.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Impact Goals */}
      <section className="impact-goals-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Our Impact</span>
            <h2 className="section-title-large">Making Education Accessible</h2>
            <p className="section-description">
              Our ambitious goals for creating lasting change in Indonesia's
              education landscape
            </p>
          </div>

          <div className="goals-grid">
            <div className="goal-card">
              <div className="goal-number">5,000+</div>
              <div className="goal-label">Students Reached</div>
              <p className="goal-desc">Across 5 provinces by 2026</p>
            </div>

            <div className="goal-card">
              <div className="goal-number">500+</div>
              <div className="goal-label">Volunteer Teachers</div>
              <p className="goal-desc">Trained and empowered</p>
            </div>

            <div className="goal-card">
              <div className="goal-number">200</div>
              <div className="goal-label">Pilot Learners</div>
              <p className="goal-desc">Current milestone in Sorong</p>
            </div>

            <div className="goal-card">
              <div className="goal-number">864</div>
              <div className="goal-label">Proven Interventions</div>
              <p className="goal-desc">Evidence-based programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <Section className="why-different-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Why We're Different</span>
            <h2 className="section-title-large">
              A Sustainable, Community-Driven Model
            </h2>
          </div>

          <div className="differences-list">
            <div className="difference-item">
              <div className="diff-number">01</div>
              <div className="diff-content">
                <h3>Evidence-Based</h3>
                <p>
                  We use the globally-proven Teaching at the Right Level (TaRL)
                  methodology, backed by rigorous research and successful
                  implementation worldwide.
                </p>
              </div>
            </div>

            <div className="difference-item">
              <div className="diff-number">02</div>
              <div className="diff-content">
                <h3>Local Talent</h3>
                <p>
                  We recruit and develop educators from within the communities we
                  serve, ensuring cultural relevance and long-term sustainability.
                </p>
              </div>
            </div>

            <div className="difference-item">
              <div className="diff-number">03</div>
              <div className="diff-content">
                <h3>Scalable Model</h3>
                <p>
                  Our university partnership model can be replicated across
                  Indonesia, creating a multiplier effect for educational impact.
                </p>
              </div>
            </div>

            <div className="difference-item">
              <div className="diff-number">04</div>
              <div className="diff-content">
                <h3>Sustainable Approach</h3>
                <p>
                  We build capacity within communities rather than creating
                  dependency, ensuring lasting change beyond our direct
                  involvement.
                </p>
              </div>
            </div>

            <div className="difference-item">
              <div className="diff-number">05</div>
              <div className="diff-content">
                <h3>Holistic Support</h3>
                <p>
                  We combine curriculum innovation with literacy culture and
                  infrastructure support for comprehensive educational
                  transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Leadership Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Our Team</span>
            <h2 className="section-title-large">Meet the Founders</h2>
            <p className="section-description">
              Passionate educators committed to transforming Indonesia's education
              landscape
            </p>
          </div>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-image-placeholder">
                <span className="team-initials">CT</span>
              </div>
              <h3>Catherine Octaviane Tikara</h3>
              <p className="team-role">
                Co-Founder & Strategic Program Lead
              </p>
              <p className="team-bio">
                Responsible for program innovation, stakeholder engagement, and
                scaling strategies from ideation to implementation. Catherine's
                rural roots fuel her passion for educational equity.
              </p>
            </div>

            <div className="team-card">
              <div className="team-image-placeholder">
                <span className="team-initials">KE</span>
              </div>
              <h3>Kevin Evannanda Septian</h3>
              <p className="team-role">Co-Founder</p>
              <p className="team-bio">
                Bringing expertise in operational excellence and community
                partnerships. Kevin's firsthand experience with educational
                disparities drives Accelero's mission forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="cta-card-large">
            <h2>Join the Movement</h2>
            <p>
              Whether you're a university student, educator, donor, or partner
              organization—there's a place for you in creating educational equity
              across Indonesia.
            </p>
            <div className="cta-buttons-group">
              <a href="/donate" className="btn-cta-primary-large">
                Support Our Mission
              </a>
              <a href="/volunteer" className="btn-cta-secondary-large">
                Become a Volunteer
              </a>
              <a href="/contact" className="btn-cta-outline-large">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </Master>
  );
};

export default AboutPage;