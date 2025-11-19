'use client'

import { useEffect, useState } from 'react'
import Master from '@components/Layout/Master'
import Section from '@components/Section/Section'
import ProjectCard from '@components/Card/ProjectCard'
import { ScrollAnimations } from '../home/components/ScrollAnimations'
import Request, { type IResponse } from '@utils/Request'
import { useLanguage } from '@contexts/LanguageContext'

interface IProject {
  id: string
  url: string
  title: string
  location: string
  description: string
  goalAmount: number
  raisedAmount: number
  studentsImpacted: number
  image: string
  status: string
  category: string
}

const ProjectsPage: React.FC = () => {
  const { t } = useLanguage()
  const [projects, setProjects] = useState<IProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')

  const categories = [
    { value: 'all', label: t('allPrograms'), icon: '🎯' },
    { value: 'literacy', label: t('literacy'), icon: '📚' },
    { value: 'numeracy', label: t('numeracy'), icon: '🔢' },
    { value: 'teacher-training', label: t('teacherTraining'), icon: '👨‍🏫' },
    { value: 'infrastructure', label: t('infrastructure'), icon: '🏗️' },
  ]

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterAndSortProjects()
  }, [projects, searchQuery, selectedCategory, selectedStatus, sortBy])

  const fetchProjects = async () => {
    try {
      const res: IResponse = await Request.getResponse({
        url: '/api/projects?limit=50',
        method: 'GET',
      })

      if (res?.data?.projects) {
        setProjects(res.data.projects)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortProjects = () => {
    let filtered = [...projects]

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (project) => project.category?.toLowerCase() === selectedCategory.toLowerCase(),
      )
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(
        (project) => project.status?.toLowerCase() === selectedStatus.toLowerCase(),
      )
    }

    switch (sortBy) {
      case 'newest':
        break
      case 'funding-low':
        filtered.sort((a, b) => {
          const aPercent = (a.raisedAmount / a.goalAmount) * 100
          const bPercent = (b.raisedAmount / b.goalAmount) * 100
          return aPercent - bPercent
        })
        break
      case 'funding-high':
        filtered.sort((a, b) => {
          const aPercent = (a.raisedAmount / a.goalAmount) * 100
          const bPercent = (b.raisedAmount / b.goalAmount) * 100
          return bPercent - aPercent
        })
        break
      case 'impact-high':
        filtered.sort((a, b) => b.studentsImpacted - a.studentsImpacted)
        break
    }

    setFilteredProjects(filtered)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedStatus('all')
    setSortBy('newest')
  }

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedStatus !== 'all' ? 1 : 0) +
    (sortBy !== 'newest' ? 1 : 0)

  const hasAnyProjects = projects.length > 0
  const hasFilteredResults = filteredProjects.length > 0

  if (isLoading) {
    return (
      <Master>
        <div className="projects-page-loading">
          <div className="skeleton skeleton-header"></div>
          <div className="container">
            <div className="skeleton-filters-grid">
              <div className="skeleton skeleton-filter"></div>
              <div className="skeleton skeleton-filter"></div>
              <div className="skeleton skeleton-filter"></div>
            </div>
            <div className="projects-grid">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="skeleton skeleton-card"></div>
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

      <section className="projects-page-header">
        <div className="container">
          <div className="header-content">
            <span className="page-label">{t('ourPrograms')}</span>
            <h1 className="page-title">{t('makeADifferenceToday')}</h1>
            <p className="page-subtitle">{t('browseOurPrograms')}</p>
          </div>

          {hasAnyProjects && (
            <div className="header-stats">
              <div className="stat-item">
                <div className="stat-value">{projects.length}</div>
                <div className="stat-label">{t('activePrograms')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {projects.reduce((sum, p) => sum + p.studentsImpacted, 0).toLocaleString()}
                </div>
                <div className="stat-label">{t('studentsReached')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  Rp{' '}
                  {Math.round(
                    projects.reduce((sum, p) => sum + p.raisedAmount, 0) / 1000000,
                  ).toLocaleString()}
                  M
                </div>
                <div className="stat-label">{t('totalRaised')}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {hasAnyProjects && (
        <section className="projects-filters-section">
          <div className="container">
            <div className="filters-compact">
              <div className="search-and-filters">
                <div className="search-bar">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder={t('searchPrograms')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button className="clear-search" onClick={() => setSearchQuery('')}>
                      ✕
                    </button>
                  )}
                </div>

                <div className="filter-dropdowns">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">{t('allStatus')}</option>
                    <option value="active">{t('active')}</option>
                    <option value="completed">{t('completed')}</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="newest">{t('newestFirst')}</option>
                    <option value="funding-low">{t('lowestFunded')}</option>
                    <option value="funding-high">{t('highestFunded')}</option>
                    <option value="impact-high">{t('mostImpact')}</option>
                  </select>
                </div>
              </div>

              <div className="filter-actions">
                {activeFiltersCount > 0 && (
                  <button className="clear-filters-btn" onClick={handleClearFilters}>
                    {t('clear')} ({activeFiltersCount})
                  </button>
                )}
                <div className="results-count">
                  {filteredProjects.length}{' '}
                  {filteredProjects.length !== 1 ? t('results') : t('result')}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Section className="projects-section-modern">
        <div className="container">
          {hasFilteredResults ? (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard
                    id={project.id}
                    url={project.url}
                    title={project.title}
                    location={project.location}
                    description={project.description}
                    goalAmount={project.goalAmount}
                    raisedAmount={project.raisedAmount}
                    studentsImpacted={project.studentsImpacted}
                    image={project.image}
                    status={project.status}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>{t('noProgramsFound')}</h3>
              <p>{hasAnyProjects ? t('noProgramsFoundDesc') : t('noActiveProgramsDesc')}</p>
              {hasAnyProjects && activeFiltersCount > 0 && (
                <button className="btn-reset" onClick={handleClearFilters}>
                  {t('resetFilters')}
                </button>
              )}
            </div>
          )}
        </div>
      </Section>

      {hasAnyProjects && !hasFilteredResults && activeFiltersCount > 0 && (
        <section className="projects-cta-section">
          <div className="container">
            <div className="cta-card">
              <div className="cta-content">
                <h2>{t('cantFindWhatYoureLookingFor')}</h2>
                <p>{t('donateToGeneralFundDesc')}</p>
              </div>
              <div className="cta-actions">
                <a href="/donate?type=general" className="btn-cta-large">
                  {t('donateToGeneralFund')}
                </a>
                <a href="/contact" className="btn-cta-outline">
                  {t('contactUs')}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {hasFilteredResults && (
        <section className="projects-cta-section">
          <div className="container">
            <div className="cta-card">
              <div className="cta-content">
                <h2>{t('wantToMakeEvenBiggerImpact')}</h2>
                <p>{t('supportGeneralFundDesc')}</p>
              </div>
              <div className="cta-actions">
                <a href="/donate?type=general" className="btn-cta-large">
                  {t('donateToGeneralFund')}
                </a>
                <a href="/contact" className="btn-cta-outline">
                  {t('learnMore')}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </Master>
  )
}

export default ProjectsPage
