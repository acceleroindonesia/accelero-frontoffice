'use client'

import { useEffect, useState } from 'react'
import Master from '@components/Layout/Master'
import Section from '@components/Section/Section'
import { ScrollAnimations } from '../home/components/ScrollAnimations'
import Request, { type IResponse } from '@utils/Request'

interface IImpactStats {
  totalStudents: number
  totalSchools: number
  totalDonors: number
  totalFunded: number
  activePrograms: number
  completedPrograms: number
}

const ImpactPage: React.FC = () => {
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

        // Estimate schools (some projects have multiple schools)
        const totalSchools = projects.length + 4 // +4 for multi-school partnerships

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
            <span className="impact-label">Our Impact</span>
            <h1 className="impact-title">Transforming Lives Through Education</h1>
            <p className="impact-subtitle">
              See the real, measurable difference we're making in communities across Indonesia.
              Every number represents a child's brighter future.
            </p>
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
              <div className="stat-label">Students Reached</div>
              <div className="stat-description">Children receiving quality education support</div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon">🏫</div>
              <div className="stat-number">{stats.totalSchools}</div>
              <div className="stat-label">Schools Partnered</div>
              <div className="stat-description">Educational institutions we work with</div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon">❤️</div>
              <div className="stat-number">{stats.totalDonors.toLocaleString()}</div>
              <div className="stat-label">Generous Donors</div>
              <div className="stat-description">People making education possible</div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon">💰</div>
              <div className="stat-number">{formatCurrency(stats.totalFunded)}</div>
              <div className="stat-label">Total Raised</div>
              <div className="stat-description">Invested in children's futures</div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon">🚀</div>
              <div className="stat-number">{stats.activePrograms}</div>
              <div className="stat-label">Active Programs</div>
              <div className="stat-description">Ongoing educational initiatives</div>
            </div>

            <div className="stat-card-large">
              <div className="stat-icon">✅</div>
              <div className="stat-number">{stats.completedPrograms}</div>
              <div className="stat-label">Completed Programs</div>
              <div className="stat-description">Successfully finished projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Categories Section */}
      <Section className="impact-categories-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title-large">Where We Make an Impact</h2>
            <p className="section-description">
              Our programs focus on the most critical areas of educational development
            </p>
          </div>

          <div className="impact-categories-grid">
            <div className="category-card">
              <div className="category-icon">📚</div>
              <h3>Literacy Development</h3>
              <p>
                Helping students build strong reading and writing foundations through proven TaRL
                methodology
              </p>
              <div className="category-stat">
                <strong>850+</strong> students improving reading skills
              </div>
            </div>

            <div className="category-card">
              <div className="category-icon">🔢</div>
              <h3>Numeracy Skills</h3>
              <p>
                Making math accessible and fun through game-based learning and interactive tools
              </p>
              <div className="category-stat">
                <strong>360+</strong> students building math confidence
              </div>
            </div>

            <div className="category-card">
              <div className="category-icon">👨‍🏫</div>
              <h3>Teacher Training</h3>
              <p>Empowering educators with modern teaching methods for sustainable impact</p>
              <div className="category-stat">
                <strong>30+</strong> teachers trained in TaRL
              </div>
            </div>

            <div className="category-card">
              <div className="category-icon">🏗️</div>
              <h3>Infrastructure</h3>
              <p>Creating inspiring learning spaces with proper facilities and resources</p>
              <div className="category-stat">
                <strong>300+</strong> students benefiting from new spaces
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Regional Impact Section */}
      <section className="regional-impact-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title-large">Reaching Remote Communities</h2>
            <p className="section-description">
              We focus on underserved regions where educational support is needed most
            </p>
          </div>

          <div className="regions-grid">
            <div className="region-card">
              <div className="region-name">Papua & Papua Barat</div>
              <div className="region-stats">
                <div className="region-stat-item">
                  <span className="stat-value">430</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="region-stat-item">
                  <span className="stat-value">3</span>
                  <span className="stat-label">Schools</span>
                </div>
              </div>
            </div>

            <div className="region-card">
              <div className="region-name">Maluku & Maluku Utara</div>
              <div className="region-stats">
                <div className="region-stat-item">
                  <span className="stat-value">1,000+</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="region-stat-item">
                  <span className="stat-value">6</span>
                  <span className="stat-label">Schools</span>
                </div>
              </div>
            </div>

            <div className="region-card">
              <div className="region-name">Nusa Tenggara</div>
              <div className="region-stats">
                <div className="region-stat-item">
                  <span className="stat-value">420</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="region-stat-item">
                  <span className="stat-value">2</span>
                  <span className="stat-label">Schools</span>
                </div>
              </div>
            </div>

            <div className="region-card">
              <div className="region-name">Jakarta</div>
              <div className="region-stats">
                <div className="region-stat-item">
                  <span className="stat-value">200</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="region-stat-item">
                  <span className="stat-value">1</span>
                  <span className="stat-label">School</span>
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
            <h2 className="section-title-large">Success Stories</h2>
            <p className="section-description">Real stories of transformation from our programs</p>
          </div>

          <div className="stories-grid">
            <div className="story-card">
              <div className="story-quote">"</div>
              <p className="story-text">
                After just 3 months in the Reading Excellence Program, my daughter went from
                struggling with basic words to reading full sentences. She now reads bedtime stories
                to her younger brother!
              </p>
              <div className="story-author">
                <strong>Ibu Sari</strong>
                <span>Parent, SD Inpres 01 Sorong</span>
              </div>
            </div>

            <div className="story-card">
              <div className="story-quote">"</div>
              <p className="story-text">
                The TaRL training completely changed how I teach. I now understand that meeting
                students where they are is more important than covering the entire curriculum.
              </p>
              <div className="story-author">
                <strong>Pak Ahmad</strong>
                <span>Teacher, SDN 05 Jakarta Selatan</span>
              </div>
            </div>

            <div className="story-card">
              <div className="story-quote">"</div>
              <p className="story-text">
                Our new reading room has become the favorite place in school. Students come early
                and stay late just to spend time with books. It's magical!
              </p>
              <div className="story-author">
                <strong>Suster Maria</strong>
                <span>Principal, SD Katolik Ende</span>
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
              <h2 className="section-title-large">How We Measure Impact</h2>
              <p className="methodology-description">
                We believe in transparency and accountability. Every program includes:
              </p>

              <div className="methodology-list">
                <div className="methodology-item">
                  <div className="method-icon">📊</div>
                  <div className="method-content">
                    <h4>Baseline Assessments</h4>
                    <p>We measure each student's starting point before program begins</p>
                  </div>
                </div>

                <div className="methodology-item">
                  <div className="method-icon">📈</div>
                  <div className="method-content">
                    <h4>Regular Progress Tracking</h4>
                    <p>Weekly and monthly evaluations ensure continuous improvement</p>
                  </div>
                </div>

                <div className="methodology-item">
                  <div className="method-icon">🎯</div>
                  <div className="method-content">
                    <h4>Final Assessment</h4>
                    <p>Comprehensive evaluation at program completion</p>
                  </div>
                </div>

                <div className="methodology-item">
                  <div className="method-icon">📝</div>
                  <div className="method-content">
                    <h4>Transparent Reporting</h4>
                    <p>All donors receive detailed updates on program outcomes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="methodology-visual">
              <div className="visual-card">
                <h3>Average Learning Gains</h3>
                <div className="gain-item">
                  <span>Literacy</span>
                  <div className="gain-bar">
                    <div className="gain-fill" style={{ width: '85%' }}></div>
                  </div>
                  <strong>85%</strong>
                </div>
                <div className="gain-item">
                  <span>Numeracy</span>
                  <div className="gain-bar">
                    <div className="gain-fill" style={{ width: '78%' }}></div>
                  </div>
                  <strong>78%</strong>
                </div>
                <div className="gain-item">
                  <span>Confidence</span>
                  <div className="gain-bar">
                    <div className="gain-fill" style={{ width: '92%' }}></div>
                  </div>
                  <strong>92%</strong>
                </div>
                <p className="gain-note">
                  Percentage of students reaching age-appropriate learning levels
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="impact-cta-section">
        <div className="container">
          <div className="cta-card-impact">
            <h2>Be Part of Our Impact Story</h2>
            <p>
              Every donation creates ripples of change. Join us in transforming education for
              thousands of children across Indonesia.
            </p>
            <div className="cta-buttons-group">
              <a href="/donate" className="btn-cta-primary-large">
                Make a Donation
              </a>
              <a href="/projects" className="btn-cta-secondary-large">
                Browse Programs
              </a>
            </div>
          </div>
        </div>
      </section>
    </Master>
  )
}

export default ImpactPage
