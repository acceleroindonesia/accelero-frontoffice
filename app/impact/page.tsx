'use client'

import { useEffect, useState } from 'react'
import Master from '@components/Layout/Master'
import Section from '@components/Section/Section'
import { ScrollAnimations } from '../home/components/ScrollAnimations'
import Request, { type IResponse } from '@utils/Request'
import { useLanguage } from '@contexts/LanguageContext'

interface IImpactStats {
  totalStudents: number
  totalSchools: number
  totalDonors: number
  totalFunded: number
  activePrograms: number
  completedPrograms: number
}

const ImpactPage: React.FC = () => {
  const { t } = useLanguage()
  const [stats, setStats] = useState<IImpactStats>({
    totalStudents: 0,
    totalSchools: 0,
    totalDonors: 0,
    totalFunded: 0,
    activePrograms: 0,
    completedPrograms: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchImpactData()
  }, [])

  const fetchImpactData = async () => {
    try {
      const res: IResponse = await Request.getResponse({
        url: '/api/projects?limit=100',
        method: 'GET',
      })

      if (res?.data?.projects) {
        const projects = res.data.projects

        const totalStudents = projects.reduce((sum: number, p: any) => sum + p.studentsImpacted, 0)
        const totalDonors = projects.reduce((sum: number, p: any) => sum + p.donorCount, 0)
        const totalFunded = projects.reduce((sum: number, p: any) => sum + p.raisedAmount, 0)
        const activePrograms = projects.filter((p: any) => p.status === 'active').length
        const completedPrograms = projects.filter((p: any) => p.status === 'completed').length

        const totalSchools = projects.length + 4

        setStats({
          totalStudents,
          totalSchools,
          totalDonors,
          totalFunded,
          activePrograms,
          completedPrograms,
        })
      }
    } catch (error) {
      console.error('Failed to fetch impact data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return `Rp ${(amount / 1000000).toFixed(1)}M`
  }

  if (isLoading) {
    return (
      <Master>
        <div className="impact-page-loading">
          <div className="skeleton skeleton-hero"></div>
          <div className="container">
            <div className="skeleton-grid">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="skeleton skeleton-stat"></div>
              ))}
            </div>
          </div>
        </div>
      </Master>
    )
  }

  return (
    <Master>
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="impact-hero">
        <div className="container">
          <div className="impact-hero-content">
            <span className="impact-label">{t('ourImpact')}</span>
            <h1 className="impact-title">{t('measuringOurImpact')}</h1>
            <p className="impact-subtitle">{t('impactPageDesc')}</p>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="impact-stats-section">
        <div className="container">
          <div className="stats-grid-large">
            <div className="stat-card-large">
              <div className="stat-icon">🎓</div>
              <div className="stat-number">{stats.totalStudents.toLocaleString()}</div>
              <div className="stat-label">{t('totalStudentsReached')}</div>
              <div className="stat-description">{t('childrenReceivingQualityEducation')}</div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon">🏫</div>
              <div className="stat-number">{stats.totalSchools}</div>
              <div className="stat-label">{t('schoolsTransformed')}</div>
              <div className="stat-description">{t('educationalInstitutionsWeWorkWith')}</div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon">❤️</div>
              <div className="stat-number">{stats.totalDonors.toLocaleString()}</div>
              <div className="stat-label">{t('generousDonors')}</div>
              <div className="stat-description">{t('peopleMakingEducationPossible')}</div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon">💰</div>
              <div className="stat-number">{formatCurrency(stats.totalFunded)}</div>
              <div className="stat-label">{t('totalRaised')}</div>
              <div className="stat-description">{t('investedInChildrenFutures')}</div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon">🚀</div>
              <div className="stat-number">{stats.activePrograms}</div>
              <div className="stat-label">{t('activePrograms')}</div>
              <div className="stat-description">{t('ongoingEducationalInitiatives')}</div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon">✅</div>
              <div className="stat-number">{stats.completedPrograms}</div>
              <div className="stat-label">{t('completedPrograms')}</div>
              <div className="stat-description">{t('successfullyFinishedProjects')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Categories Section */}
      <Section className="impact-categories-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title-large">{t('whereWeMakeAnImpact')}</h2>
            <p className="section-description">{t('ourProgramsFocus')}</p>
          </div>

          <div className="impact-categories-grid">
            <div className="category-card">
              <div className="category-icon">📚</div>
              <h3>{t('literacyDevelopment')}</h3>
              <p>{t('helpingStudentsBuild')}</p>
              <div className="category-stat">
                <strong>850+</strong> {t('studentsImprovingReading')}
              </div>
            </div>

            <div className="category-card">
              <div className="category-icon">🔢</div>
              <h3>{t('numeracySkills')}</h3>
              <p>{t('makingMathAccessible')}</p>
              <div className="category-stat">
                <strong>360+</strong> {t('studentsBuildingMathConfidence')}
              </div>
            </div>

            <div className="category-card">
              <div className="category-icon">👨‍🏫</div>
              <h3>{t('teacherTraining')}</h3>
              <p>{t('empoweringEducators')}</p>
              <div className="category-stat">
                <strong>30+</strong> {t('teachersTrainedInTaRL')}
              </div>
            </div>

            <div className="category-card">
              <div className="category-icon">🏗️</div>
              <h3>{t('infrastructure')}</h3>
              <p>{t('creatingInspiringLearningSpaces')}</p>
              <div className="category-stat">
                <strong>300+</strong> {t('studentsBenefitingNewSpaces')}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Regional Impact Section */}
      <section className="regional-impact-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title-large">{t('reachingRemoteCommunities')}</h2>
            <p className="section-description">{t('weFocusOnUnderserved')}</p>
          </div>

          <div className="regions-grid">
            <div className="region-card">
              <div className="region-name">{t('papuaAndPapuaBarat')}</div>
              <div className="region-stats">
                <div className="region-stat-item">
                  <span className="stat-value">430</span>
                  <span className="stat-label">{t('students')}</span>
                </div>
                <div className="region-stat-item">
                  <span className="stat-value">3</span>
                  <span className="stat-label">{t('schools')}</span>
                </div>
              </div>
            </div>

            <div className="region-card">
              <div className="region-name">{t('malukuAndMalukuUtara')}</div>
              <div className="region-stats">
                <div className="region-stat-item">
                  <span className="stat-value">1,000+</span>
                  <span className="stat-label">{t('students')}</span>
                </div>
                <div className="region-stat-item">
                  <span className="stat-value">6</span>
                  <span className="stat-label">{t('schools')}</span>
                </div>
              </div>
            </div>

            <div className="region-card">
              <div className="region-name">{t('nusaTenggara')}</div>
              <div className="region-stats">
                <div className="region-stat-item">
                  <span className="stat-value">420</span>
                  <span className="stat-label">{t('students')}</span>
                </div>
                <div className="region-stat-item">
                  <span className="stat-value">2</span>
                  <span className="stat-label">{t('schools')}</span>
                </div>
              </div>
            </div>

            <div className="region-card">
              <div className="region-name">{t('jakarta')}</div>
              <div className="region-stats">
                <div className="region-stat-item">
                  <span className="stat-value">200</span>
                  <span className="stat-label">{t('students')}</span>
                </div>
                <div className="region-stat-item">
                  <span className="stat-value">1</span>
                  <span className="stat-label">{t('school')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <Section className="success-stories-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title-large">{t('successStories')}</h2>
            <p className="section-description">{t('realStoriesOfTransformation')}</p>
          </div>

          <div className="stories-grid">
            <div className="story-card">
              <div className="story-quote">"</div>
              <p className="story-text">{t('parentTestimonialText')}</p>
              <div className="story-author">
                <strong>{t('ibuSari')}</strong>
                <span>{t('parentSDInpres')}</span>
              </div>
            </div>

            <div className="story-card">
              <div className="story-quote">"</div>
              <p className="story-text">{t('teacherTestimonialText')}</p>
              <div className="story-author">
                <strong>{t('pakAhmad')}</strong>
                <span>{t('teacherSDN')}</span>
              </div>
            </div>

            <div className="story-card">
              <div className="story-quote">"</div>
              <p className="story-text">{t('principalTestimonialText')}</p>
              <div className="story-author">
                <strong>{t('susterMaria')}</strong>
                <span>{t('principalSDKatolik')}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Impact Methodology Section */}
      <section className="methodology-section">
        <div className="container">
          <div className="methodology-content">
            <div className="methodology-text">
              <h2 className="section-title-large">{t('howWeMeasureImpact')}</h2>
              <p className="methodology-description">{t('weBelieveInTransparency')}</p>

              <div className="methodology-list">
                <div className="methodology-item">
                  <div className="method-icon">📊</div>
                  <div className="method-content">
                    <h4>{t('baselineAssessments')}</h4>
                    <p>{t('baselineAssessmentsDesc')}</p>
                  </div>
                </div>

                <div className="methodology-item">
                  <div className="method-icon">📈</div>
                  <div className="method-content">
                    <h4>{t('regularProgressTracking')}</h4>
                    <p>{t('regularProgressTrackingDesc')}</p>
                  </div>
                </div>

                <div className="methodology-item">
                  <div className="method-icon">🎯</div>
                  <div className="method-content">
                    <h4>{t('finalAssessment')}</h4>
                    <p>{t('finalAssessmentDesc')}</p>
                  </div>
                </div>

                <div className="methodology-item">
                  <div className="method-icon">📝</div>
                  <div className="method-content">
                    <h4>{t('transparentReportingImpact')}</h4>
                    <p>{t('transparentReportingImpactDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="methodology-visual">
              <div className="visual-card">
                <h3>{t('averageLearningGains')}</h3>
                <div className="gain-item">
                  <span>{t('literacy')}</span>
                  <div className="gain-bar">
                    <div className="gain-fill" style={{ width: '85%' }}></div>
                  </div>
                  <strong>85%</strong>
                </div>
                <div className="gain-item">
                  <span>{t('numeracy')}</span>
                  <div className="gain-bar">
                    <div className="gain-fill" style={{ width: '78%' }}></div>
                  </div>
                  <strong>78%</strong>
                </div>
                <div className="gain-item">
                  <span>{t('confidence')}</span>
                  <div className="gain-bar">
                    <div className="gain-fill" style={{ width: '92%' }}></div>
                  </div>
                  <strong>92%</strong>
                </div>
                <p className="gain-note">{t('percentageReachingLevels')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="impact-cta-section">
        <div className="container">
          <div className="cta-card-impact">
            <h2>{t('bePartOfImpactStory')}</h2>
            <p>{t('everyDonationCreatesRipples')}</p>
            <div className="cta-buttons-group">
              <a href="/donate" className="btn-cta-primary-large">
                {t('donate')}
              </a>
              <a href="/projects" className="btn-cta-secondary-large">
                {t('browsePrograms')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Master>
  )
}

export default ImpactPage
