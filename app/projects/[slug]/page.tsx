'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Master from '@components/Layout/Master'
import Image from 'next/image'
import Link from 'next/link'
import Request, { type IResponse } from '@utils/Request'
import { useLanguage } from '@contexts/LanguageContext'

interface IProjectDetail {
  id: string
  url: string
  title: string
  location: string
  description: string
  fullDescription?: string
  goalAmount: number
  raisedAmount: number
  studentsImpacted: number
  image: string
  status: string
  category: string
  startDate: string
  endDate: string
  school: {
    name: string
    address: string
    principalName: string
    studentCount: number
    establishedYear?: number
  }
  donorCount: number
  volunteerCount: number
  milestones?: Array<{
    date: string
    description: string
    completed: boolean
  }>
  updates?: Array<{
    date: string
    title: string
    content: string
  }>
  budget?: Array<{
    item: string
    amount: number
  }>
}

const ProjectDetailPage: React.FC = () => {
  const params = useParams()
  const slug = params.slug as string
  const { t, language } = useLanguage()

  const [project, setProject] = useState<IProjectDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'overview'>('overview')

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        const res: IResponse = await Request.getResponse({
          url: `/api/projects/${slug}?lang=${language}`,
          method: 'GET',
        })

        if (res?.data && 'project' in res.data) {
          setProject(res.data.project as IProjectDetail)
        }
      } catch (error) {
        console.error('Failed to fetch project:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [slug, language])

  if (isLoading) {
    return (
      <Master>
        <div className="project-detail-loading">
          <div className="skeleton skeleton-hero-detail"></div>
          <div className="container">
            <div className="skeleton-detail-grid">
              <div className="skeleton skeleton-content"></div>
              <div className="skeleton skeleton-sidebar"></div>
            </div>
          </div>
        </div>
      </Master>
    )
  }

  if (!project) {
    return (
      <Master>
        <div className="project-not-found">
          <div className="container">
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist or has been removed.</p>
            <Link href="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </Master>
    )
  }

  const percentage = Math.min((project.raisedAmount / project.goalAmount) * 100, 100)
  const remaining = project.goalAmount - project.raisedAmount

  return (
    <Master>
      {/* Hero Section */}
      <section className="project-detail-hero">
        <div className="project-hero-image">
          <Image src={project.image} alt={project.title} fill priority className="hero-img" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">{t('home')}</Link>
              <span>/</span>
              <Link href="/projects">{t('projects')}</Link>
              <span>/</span>
              <span>{project.title}</span>
            </div>
            <div className="hero-badge-group">
              <span className="badge-category">{project.category}</span>
              <span className={`badge-status status-${project.status}`}>{project.status}</span>
            </div>
            <h1 className="project-hero-title">{project.title}</h1>
            <div className="project-hero-meta">
              <div className="meta-item">
                <span className="meta-icon">📍</span>
                <span>{project.location}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🏫</span>
                <span>{project.school.name}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">👥</span>
                <span>
                  {project.studentsImpacted} {language === 'id' ? 'siswa' : 'students'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="project-detail-main">
        <div className="container">
          <div className="detail-grid">
            {/* Left Content */}
            <div className="detail-content">
              {/* Tabs */}
              <div className="detail-tabs">
                <button
                  className={`tab ${selectedTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setSelectedTab('overview')}
                >
                  {t('overview')}
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {selectedTab === 'overview' && (
                  <div className="overview-content">
                    <div className="content-section">
                      <h2>{t('aboutThisProgram')}</h2>
                      <p className="lead-text">{project.description}</p>
                      <p className="body-text">{project.fullDescription || project.description}</p>
                    </div>

                    <div className="content-section">
                      <h2>{t('theChallenge')}</h2>
                      <div className="challenge-box">
                        <div className="challenge-icon">🎯</div>
                        <div>
                          <h3>{t('whyThisMatters')}</h3>
                          <p>
                            {language === 'id'
                              ? `Banyak siswa di ${project.location} tertinggal dalam keterampilan literasi dan numerasi dasar. Tanpa intervensi, mereka berisiko tertinggal secara permanen.`
                              : `Many students in ${project.location} are falling behind in foundational literacy and numeracy skills. Without intervention, they risk being left behind permanently.`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="content-section">
                      <h2>{language === 'id' ? 'Pendekatan Kami' : 'Our Approach'}</h2>
                      <div className="approach-grid">
                        <div className="approach-card">
                          <span className="approach-icon">📚</span>
                          <h4>
                            {language === 'id'
                              ? 'Pembelajaran Sesuai Tingkat'
                              : 'Teaching at Right Level'}
                          </h4>
                          <p>
                            {language === 'id'
                              ? 'Siswa dikelompokkan berdasarkan tingkat pembelajaran, bukan kelas'
                              : 'Students grouped by learning level, not grade'}
                          </p>
                        </div>
                        <div className="approach-card">
                          <span className="approach-icon">👨‍🏫</span>
                          <h4>
                            {language === 'id' ? 'Fasilitator Terlatih' : 'Trained Facilitators'}
                          </h4>
                          <p>
                            {language === 'id'
                              ? 'Guru dilengkapi dengan metodologi yang terbukti'
                              : 'Teachers equipped with proven methodologies'}
                          </p>
                        </div>
                        <div className="approach-card">
                          <span className="approach-icon">📊</span>
                          <h4>{language === 'id' ? 'Penilaian Berkala' : 'Regular Assessment'}</h4>
                          <p>
                            {language === 'id'
                              ? 'Kemajuan dilacak dan diukur secara berkelanjutan'
                              : 'Progress tracked and measured continuously'}
                          </p>
                        </div>
                        <div className="approach-card">
                          <span className="approach-icon">🤝</span>
                          <h4>
                            {language === 'id' ? 'Keterlibatan Komunitas' : 'Community Involvement'}
                          </h4>
                          <p>
                            {language === 'id'
                              ? 'Orang tua dan relawan terlibat aktif'
                              : 'Parents and volunteers actively engaged'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="content-section">
                      <h2>{t('expectedImpact')}</h2>
                      <div className="impact-metrics">
                        <div className="impact-metric">
                          <div className="metric-number">85%</div>
                          <div className="metric-label">
                            {language === 'id'
                              ? 'Tingkat peningkatan yang diharapkan'
                              : 'Expected improvement rate'}
                          </div>
                        </div>
                        <div className="impact-metric">
                          <div className="metric-number">{project.studentsImpacted}</div>
                          <div className="metric-label">
                            {language === 'id' ? 'Siswa yang diuntungkan' : 'Students to benefit'}
                          </div>
                        </div>
                        <div className="impact-metric">
                          <div className="metric-number">12</div>
                          <div className="metric-label">
                            {language === 'id' ? 'Bulan durasi' : 'Months duration'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="content-section">
                      <h2>{t('aboutTheSchool')}</h2>
                      <div className="school-info-card">
                        <div className="school-header">
                          <div className="school-icon">🏫</div>
                          <div>
                            <h3>{project.school.name}</h3>
                            <p>{project.school.address}</p>
                          </div>
                        </div>
                        <div className="school-details">
                          <div className="detail-row">
                            <span className="detail-label">{t('principal')}:</span>
                            <span className="detail-value">{project.school.principalName}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">{t('totalStudents')}:</span>
                            <span className="detail-value">{project.school.studentCount}</span>
                          </div>
                          {project.school.establishedYear && (
                            <div className="detail-row">
                              <span className="detail-label">{t('established')}:</span>
                              <span className="detail-value">{project.school.establishedYear}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="detail-sidebar">
              {/* Donation Card */}
              <div className="donation-card sticky-card">
                <div className="donation-progress">
                  <div className="progress-stats-header">
                    <div className="raised-amount">
                      <span className="amount-label">{t('raised')}</span>
                      <span className="amount-value">
                        Rp {project.raisedAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="goal-amount">
                      <span className="goal-label">{t('goal')}</span>
                      <span className="goal-value">Rp {project.goalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="progress-bar-large">
                    <div className="progress-fill-large" style={{ width: `${percentage}%` }}>
                      <div className="progress-shimmer"></div>
                    </div>
                  </div>
                  <div className="progress-percentage-large">
                    {percentage.toFixed(0)}% {t('funded')}
                  </div>
                </div>

                {remaining > 0 && project.status === 'active' && (
                  <div className="donation-remaining">
                    <strong>Rp {remaining.toLocaleString()}</strong> {t('stillNeeded')}
                  </div>
                )}

                <div className="donation-stats-grid">
                  <div className="stat-box">
                    <div className="stat-box-number">{project.donorCount}</div>
                    <div className="stat-box-label">{t('donors')}</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-box-number">{project.volunteerCount}</div>
                    <div className="stat-box-label">{t('volunteers')}</div>
                  </div>
                </div>

                {project.status === 'active' ? (
                  <>
                    <Link href={`/donate?project=${project.id}`} className="btn-donate-large">
                      <span className="btn-icon">❤️</span>
                      <span>{t('donate')}</span>
                    </Link>
                    <button className="btn-share">
                      <span className="btn-icon">📤</span>
                      <span>{language === 'id' ? 'Bagikan Proyek Ini' : 'Share This Project'}</span>
                    </button>
                  </>
                ) : (
                  <div className="project-completed-banner">
                    <span className="completed-icon">✓</span>
                    <span>{language === 'id' ? 'Proyek Selesai' : 'Project Completed'}</span>
                  </div>
                )}

                <div className="donation-secure">
                  <span className="secure-icon">🔒</span>
                  <span>
                    {language === 'id'
                      ? 'Donasi aman & transparan'
                      : 'Secure & transparent donations'}
                  </span>
                </div>
              </div>

              {/* Quick Impact Card */}
              <div className="quick-impact-card">
                <h3>{t('yourImpact')}</h3>
                <p>
                  {language === 'id'
                    ? 'Lihat bagaimana donasi Anda membantu:'
                    : 'See how your donation helps:'}
                </p>
                <div className="impact-examples">
                  <div className="impact-example">
                    <div className="impact-amount">Rp 100,000</div>
                    <div className="impact-desc">
                      {language === 'id'
                        ? 'Menyediakan 10 buku bacaan'
                        : 'Provides 10 reading books'}
                    </div>
                  </div>
                  <div className="impact-example">
                    <div className="impact-amount">Rp 500,000</div>
                    <div className="impact-desc">
                      {language === 'id'
                        ? 'Mendukung 5 siswa selama 1 bulan'
                        : 'Supports 5 students for 1 month'}
                    </div>
                  </div>
                  <div className="impact-example">
                    <div className="impact-amount">Rp 1,000,000</div>
                    <div className="impact-desc">
                      {language === 'id'
                        ? 'Melatih 1 guru dengan metode TaRL'
                        : 'Trains 1 teacher in TaRL method'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar Projects */}
              <div className="similar-projects-card">
                <h3>
                  {language === 'id'
                    ? 'Program Lain yang Mungkin Anda Suka'
                    : 'Other Programs You Might Like'}
                </h3>
                <Link href="/projects" className="btn-view-all">
                  {t('viewAllPrograms')} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Master>
  )
}

export default ProjectDetailPage
