'use client'

import Master from '@components/Layout/Master'
import Section from '@components/Section/Section'
import { ScrollAnimations } from '../home/components/ScrollAnimations'
import { useLanguage } from '@contexts/LanguageContext'

const AboutPage: React.FC = () => {
  const { t } = useLanguage()

  return (
    <Master>
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span className="about-label">{t('aboutAccelero')}</span>
            <h1 className="about-title">{t('aboutHeroTitle')}</h1>
            <p className="about-subtitle">{t('aboutHeroSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <Section className="our-story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="section-label">{t('ourStory')}</span>
              <h2 className="section-title-large">{t('bornFromExperience')}</h2>
              <p className="story-text">{t('ourStoryText1')}</p>
              <p className="story-text">{t('ourStoryText2')}</p>
              <div className="story-highlight">
                <span className="highlight-icon">🏆</span>
                <div>
                  <h4>{t('dPrizeRecipient')}</h4>
                  <p>{t('dPrizeDesc')}</p>
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
              <h3>{t('ourMission')}</h3>
              <p>{t('missionText')}</p>
            </div>
            <div className="mv-card vision-card">
              <div className="mv-icon">🌟</div>
              <h3>{t('ourVision')}</h3>
              <p>{t('visionText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <Section className="what-we-do-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{t('whatWeDo')}</span>
            <h2 className="section-title-large">{t('evidenceBasedEducation')}</h2>
            <p className="section-description">{t('whatWeDoDesc')}</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>{t('afterSchoolPrograms')}</h3>
              <p>{t('afterSchoolDesc')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>{t('universityVolunteer')}</h3>
              <p>{t('universityVolunteerDesc')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>{t('literacyRichEnvironments')}</h3>
              <p>{t('literacyRichDesc')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>{t('communityPartnerships')}</h3>
              <p>{t('communityPartnershipsDesc')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Impact Goals */}
      <section className="impact-goals-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{t('ourImpact')}</span>
            <h2 className="section-title-large">{t('makingEducationAccessible')}</h2>
            <p className="section-description">{t('impactGoalsDesc')}</p>
          </div>

          <div className="goals-grid">
            <div className="goal-card">
              <div className="goal-number">5,000+</div>
              <div className="goal-label">{t('studentsReachedGoal')}</div>
              <p className="goal-desc">{t('acrossProvinces')}</p>
            </div>

            <div className="goal-card">
              <div className="goal-number">500+</div>
              <div className="goal-label">{t('volunteerTeachers')}</div>
              <p className="goal-desc">{t('trainedEmpowered')}</p>
            </div>

            <div className="goal-card">
              <div className="goal-number">200</div>
              <div className="goal-label">{t('pilotLearners')}</div>
              <p className="goal-desc">{t('currentMilestone')}</p>
            </div>

            <div className="goal-card">
              <div className="goal-number">864</div>
              <div className="goal-label">{t('provenInterventions')}</div>
              <p className="goal-desc">{t('evidenceBasedPrograms')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <Section className="why-different-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{t('whyDifferent')}</span>
            <h2 className="section-title-large">{t('sustainableCommunityModel')}</h2>
          </div>

          <div className="differences-list">
            <div className="difference-item">
              <div className="diff-number">01</div>
              <div className="diff-content">
                <h3>{t('evidenceBased')}</h3>
                <p>{t('evidenceBasedDesc')}</p>
              </div>
            </div>

            <div className="difference-item">
              <div className="diff-number">02</div>
              <div className="diff-content">
                <h3>{t('localTalent')}</h3>
                <p>{t('localTalentDesc')}</p>
              </div>
            </div>

            <div className="difference-item">
              <div className="diff-number">03</div>
              <div className="diff-content">
                <h3>{t('scalableModelTitle')}</h3>
                <p>{t('scalableModelDesc')}</p>
              </div>
            </div>

            <div className="difference-item">
              <div className="diff-number">04</div>
              <div className="diff-content">
                <h3>{t('sustainableApproach')}</h3>
                <p>{t('sustainableApproachDesc')}</p>
              </div>
            </div>

            <div className="difference-item">
              <div className="diff-number">05</div>
              <div className="diff-content">
                <h3>{t('holisticSupport')}</h3>
                <p>{t('holisticSupportDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Leadership Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">{t('ourTeam')}</span>
            <h2 className="section-title-large">{t('meetTheFounders')}</h2>
            <p className="section-description">{t('passionateEducators')}</p>
          </div>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-image-placeholder">
                <span className="team-initials">CT</span>
              </div>
              <h3>Catherine Octaviane Tikara</h3>
              <p className="team-role">{t('coFounderStrategic')}</p>
              <p className="team-bio">{t('catherineBio')}</p>
            </div>

            <div className="team-card">
              <div className="team-image-placeholder">
                <span className="team-initials">KE</span>
              </div>
              <h3>Kevin Evannanda Septian</h3>
              <p className="team-role">{t('coFounder')}</p>
              <p className="team-bio">{t('kevinBio')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="cta-card-large">
            <h2>{t('joinTheMovement')}</h2>
            <p>{t('joinMovementDesc')}</p>
            <div className="cta-buttons-group">
              <a href="/donate" className="btn-cta-primary-large">
                {t('supportOurMission')}
              </a>
              <a href="/volunteer" className="btn-cta-secondary-large">
                {t('becomeVolunteer')}
              </a>
              <a href="/contact" className="btn-cta-outline-large">
                {t('getInTouch')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Master>
  )
}

export default AboutPage
