'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Master from '@components/Layout/Master'
import Image from 'next/image'
import Link from 'next/link'
import Request, { type IResponse } from '@utils/Request'

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

  const [project, setProject] = useState<IProjectDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'updates' | 'budget' | 'timeline'>(
    'overview',
  )

  useEffect(() => {
    const fetchProject = async () => {
      const res: IResponse = await Request.getResponse({
        url: `/api/projects/${slug}`,
        method: 'GET',
      })

      if (res?.data?.project) {
        setProject(res.data.project)
      }
      setIsLoading(false)
    }

    fetchProject()
  }, [slug])

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
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/projects">Projects</Link>
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
                <span>{project.studentsImpacted} students</span>
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
                  Overview
                </button>
                <button
                  className={`tab ${selectedTab === 'updates' ? 'active' : ''}`}
                  onClick={() => setSelectedTab('updates')}
                >
                  Updates ({project.updates?.length || 0})
                </button>
                <button
                  className={`tab ${selectedTab === 'budget' ? 'active' : ''}`}
                  onClick={() => setSelectedTab('budget')}
                >
                  Budget Breakdown
                </button>
                <button
                  className={`tab ${selectedTab === 'timeline' ? 'active' : ''}`}
                  onClick={() => setSelectedTab('timeline')}
                >
                  Timeline
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {selectedTab === 'overview' && (
                  <div className="overview-content">
                    <div className="content-section">
                      <h2>About This Program</h2>
                      <p className="lead-text">{project.description}</p>
                      <p className="body-text">{project.fullDescription || project.description}</p>
                    </div>

                    <div className="content-section">
                      <h2>The Challenge</h2>
                      <div className="challenge-box">
                        <div className="challenge-icon">🎯</div>
                        <div>
                          <h3>Why This Matters</h3>
                          <p>
                            Many students in {project.location} are falling behind in foundational
                            literacy and numeracy skills. Without intervention, they risk being left
                            behind permanently.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="content-section">
                      <h2>Our Approach</h2>
                      <div className="approach-grid">
                        <div className="approach-card">
                          <span className="approach-icon">📚</span>
                          <h4>Teaching at Right Level</h4>
                          <p>Students grouped by learning level, not grade</p>
                        </div>
                        <div className="approach-card">
                          <span className="approach-icon">👨‍🏫</span>
                          <h4>Trained Facilitators</h4>
                          <p>Teachers equipped with proven methodologies</p>
                        </div>
                        <div className="approach-card">
                          <span className="approach-icon">📊</span>
                          <h4>Regular Assessment</h4>
                          <p>Progress tracked and measured continuously</p>
                        </div>
                        <div className="approach-card">
                          <span className="approach-icon">🤝</span>
                          <h4>Community Involvement</h4>
                          <p>Parents and volunteers actively engaged</p>
                        </div>
                      </div>
                    </div>

                    <div className="content-section">
                      <h2>Expected Impact</h2>
                      <div className="impact-metrics">
                        <div className="impact-metric">
                          <div className="metric-number">85%</div>
                          <div className="metric-label">Expected improvement rate</div>
                        </div>
                        <div className="impact-metric">
                          <div className="metric-number">{project.studentsImpacted}</div>
                          <div className="metric-label">Students to benefit</div>
                        </div>
                        <div className="impact-metric">
                          <div className="metric-number">12</div>
                          <div className="metric-label">Months duration</div>
                        </div>
                      </div>
                    </div>

                    <div className="content-section">
                      <h2>About the School</h2>
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
                            <span className="detail-label">Principal:</span>
                            <span className="detail-value">{project.school.principalName}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Total Students:</span>
                            <span className="detail-value">{project.school.studentCount}</span>
                          </div>
                          {project.school.establishedYear && (
                            <div className="detail-row">
                              <span className="detail-label">Established:</span>
                              <span className="detail-value">{project.school.establishedYear}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'updates' && (
                  <div className="updates-content">
                    {project.updates && project.updates.length > 0 ? (
                      <div className="updates-list">
                        {project.updates.map((update, index) => (
                          <div key={index} className="update-card">
                            <div className="update-date">
                              {new Date(update.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>
                            <h3 className="update-title">{update.title}</h3>
                            <p className="update-content">{update.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <span className="empty-icon">📝</span>
                        <h3>No Updates Yet</h3>
                        <p>Check back soon for progress updates on this program</p>
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === 'budget' && (
                  <div className="budget-content">
                    {project.budget && project.budget.length > 0 ? (
                      <>
                        <div className="budget-overview">
                          <h3>Total Budget</h3>
                          <div className="budget-total">
                            Rp {project.goalAmount.toLocaleString()}
                          </div>
                        </div>
                        <div className="budget-list">
                          {project.budget.map((item, index) => {
                            const itemPercentage = (item.amount / project.goalAmount) * 100
                            return (
                              <div key={index} className="budget-item">
                                <div className="budget-item-header">
                                  <span className="budget-item-name">{item.item}</span>
                                  <span className="budget-item-amount">
                                    Rp {item.amount.toLocaleString()}
                                  </span>
                                </div>
                                <div className="budget-item-bar">
                                  <div
                                    className="budget-item-fill"
                                    style={{ width: `${itemPercentage}%` }}
                                  ></div>
                                </div>
                                <div className="budget-item-percentage">
                                  {itemPercentage.toFixed(1)}% of total budget
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </>
                    ) : (
                      <div className="empty-state">
                        <span className="empty-icon">💰</span>
                        <h3>Budget Details Coming Soon</h3>
                        <p>Detailed budget breakdown will be available shortly</p>
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === 'timeline' && (
                  <div className="timeline-content">
                    {project.milestones && project.milestones.length > 0 ? (
                      <div className="timeline-list">
                        {project.milestones.map((milestone, index) => (
                          <div
                            key={index}
                            className={`timeline-item ${milestone.completed ? 'completed' : ''}`}
                          >
                            <div className="timeline-marker">
                              <div className="timeline-dot"></div>
                              {index < project.milestones!.length - 1 && (
                                <div className="timeline-line"></div>
                              )}
                            </div>
                            <div className="timeline-content-box">
                              <div className="timeline-date">
                                {new Date(milestone.date).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </div>
                              <p className="timeline-description">{milestone.description}</p>
                              {milestone.completed && (
                                <span className="timeline-badge">✓ Completed</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <span className="empty-icon">📅</span>
                        <h3>Timeline Coming Soon</h3>
                        <p>Program milestones will be added as the project progresses</p>
                      </div>
                    )}
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
                      <span className="amount-label">Raised</span>
                      <span className="amount-value">
                        Rp {project.raisedAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="goal-amount">
                      <span className="goal-label">Goal</span>
                      <span className="goal-value">Rp {project.goalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="progress-bar-large">
                    <div className="progress-fill-large" style={{ width: `${percentage}%` }}>
                      <div className="progress-shimmer"></div>
                    </div>
                  </div>
                  <div className="progress-percentage-large">{percentage.toFixed(0)}% funded</div>
                </div>

                {remaining > 0 && project.status === 'active' && (
                  <div className="donation-remaining">
                    <strong>Rp {remaining.toLocaleString()}</strong> still needed
                  </div>
                )}

                <div className="donation-stats-grid">
                  <div className="stat-box">
                    <div className="stat-box-number">{project.donorCount}</div>
                    <div className="stat-box-label">Donors</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-box-number">{project.volunteerCount}</div>
                    <div className="stat-box-label">Volunteers</div>
                  </div>
                </div>

                {project.status === 'active' ? (
                  <>
                    <Link href={`/donate?project=${project.id}`} className="btn-donate-large">
                      <span className="btn-icon">❤️</span>
                      <span>Donate Now</span>
                    </Link>
                    <button className="btn-share">
                      <span className="btn-icon">📤</span>
                      <span>Share This Project</span>
                    </button>
                  </>
                ) : (
                  <div className="project-completed-banner">
                    <span className="completed-icon">✓</span>
                    <span>Project Completed</span>
                  </div>
                )}

                <div className="donation-secure">
                  <span className="secure-icon">🔒</span>
                  <span>Secure & transparent donations</span>
                </div>
              </div>

              {/* Quick Impact Card */}
              <div className="quick-impact-card">
                <h3>Your Impact</h3>
                <p>See how your donation helps:</p>
                <div className="impact-examples">
                  <div className="impact-example">
                    <div className="impact-amount">Rp 100,000</div>
                    <div className="impact-desc">Provides 10 reading books</div>
                  </div>
                  <div className="impact-example">
                    <div className="impact-amount">Rp 500,000</div>
                    <div className="impact-desc">Supports 5 students for 1 month</div>
                  </div>
                  <div className="impact-example">
                    <div className="impact-amount">Rp 1,000,000</div>
                    <div className="impact-desc">Trains 1 teacher in TaRL method</div>
                  </div>
                </div>
              </div>

              {/* Similar Projects */}
              <div className="similar-projects-card">
                <h3>Other Programs You Might Like</h3>
                <Link href="/projects" className="btn-view-all">
                  View All Programs →
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
