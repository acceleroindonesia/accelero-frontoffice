import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@contexts/LanguageContext'

interface IProjectCard {
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

const ProjectCard: React.FC<IProjectCard> = ({
  url,
  title,
  location,
  description,
  goalAmount,
  raisedAmount,
  studentsImpacted,
  image,
  status,
}) => {
  const percentage = Math.min((raisedAmount / goalAmount) * 100, 100)
  const remaining = goalAmount - raisedAmount
  const isActive = status === 'active'
  const { t } = useLanguage()

  return (
    <div className={`project-card ${!isActive ? 'project-card-inactive' : ''}`}>
      <Link href={`/projects/${url}`}>
        <div className="project-card-image">
          {image ? (
            <Image src={image} alt={title} fill className="card-image" />
          ) : (
            <div className="card-placeholder">
              <span>📚</span>
            </div>
          )}
          {!isActive && <div className="project-badge project-badge-completed">Completed</div>}
        </div>
      </Link>

      <div className="project-card-content">
        <div className="project-location">
          <svg className="location-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <span>{location}</span>
        </div>

        <Link href={`/projects/${url}`}>
          <h3 className="project-title">{title}</h3>
        </Link>

        <p className="project-description">{description}</p>

        <div className="project-impact">
          <svg className="impact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>{studentsImpacted} students will benefit</span>
        </div>

        <div className="project-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
          </div>
          <div className="progress-stats">
            <div className="progress-raised">
              <strong>Rp {raisedAmount.toLocaleString()}</strong>
              <span> raised</span>
            </div>
            <div className="progress-goal">of Rp {goalAmount.toLocaleString()}</div>
          </div>
          {remaining > 0 && isActive && (
            <div className="progress-remaining">Rp {remaining.toLocaleString()} to go</div>
          )}
        </div>

        <Link href={`/projects/${url}`} className="project-donate-link">
          <button className="btn btn-primary btn-block">
            {isActive ? t('supportThisProject') : t('viewImpact')}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard
