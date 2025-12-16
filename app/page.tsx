'use client'

import { useEffect, useState } from 'react'
import Master from '@components/Layout/Master'
import Section from '@components/Section/Section'
import HeroSection from './home/components/HeroSection'
import ImpactStats from './home/components/ImpactStats'
import ProjectCard from '@components/Card/ProjectCard'
import HowItWorks from './home/components/HowItWorks'
import VolunteerCTA from './home/components/VolunteerCTA'
import { ScrollAnimations } from './home/components/ScrollAnimations'
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
}

const Page: React.FC = () => {
  const { t, language } = useLanguage() // Get both translation function and current language
  const [projects, setProjects] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const res: IResponse = await Request.getResponse({
          url: `/api/projects?featured=true&limit=6&lang=${language}`, // Pass language parameter
          method: 'GET',
        })

        // Type guard to check if response has projects property
        if (res?.data && 'projects' in res.data && Array.isArray(res.data.projects)) {
          setProjects(res.data.projects)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [language]) // Refetch when language changes

  if (isLoading) {
    return (
      <Master>
        <div className="loading-container">
          <div className="loading-hero">
            <div className="skeleton skeleton-hero"></div>
          </div>
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[...Array(3)].map((_, idx) => (
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
      <HeroSection />
      <ImpactStats />

      <Section className="projects-section-modern">
        <div className="container">
          <div className="projects-header" data-aos="fade-up">
            <span className="section-label">{t('ourPrograms')}</span>
            <h2 className="section-title-modern">{t('featuredPrograms')}</h2>
            <p className="section-desc-modern">{t('supportSchool')}</p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project.id} data-aos="fade-up" data-aos-delay={index * 100}>
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

          <div className="center" data-aos="fade-up">
            <a href="/projects" className="btn-cta-primary">
              {t('viewAllPrograms')}
            </a>
          </div>
        </div>
      </Section>

      <HowItWorks />
      <VolunteerCTA />
    </Master>
  )
}

export default Page
