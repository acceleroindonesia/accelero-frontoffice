'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type Metadata } from 'next'

// components
import Master from '@components/Layout/Master'
import '../styles/help.css'

interface FAQCategory {
  id: string
  title: string
  icon: string
  description: string
  questions: { id: string; question: string; popular?: boolean }[]
}

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories: FAQCategory[] = [
    {
      id: 'about',
      title: 'About Us',
      icon: '🏢',
      description: 'Learn about our mission and vision',
      questions: [
        { id: '1', question: 'What is Accelero?', popular: true },
        { id: '2', question: 'How does Accelero work?' },
        { id: '3', question: 'Where does Accelero operate?' },
      ],
    },
    {
      id: 'account',
      title: 'Account',
      icon: '👤',
      description: 'Manage your account settings',
      questions: [
        { id: '4', question: 'How to sign in?', popular: true },
        { id: '5', question: 'How to reset my password?' },
        { id: '6', question: 'How to update my profile?' },
      ],
    },
    {
      id: 'donations',
      title: 'Donations',
      icon: '💝',
      description: 'Everything about giving',
      questions: [
        { id: '7', question: 'How can I donate?', popular: true },
        { id: '8', question: 'Are donations tax-deductible?' },
        { id: '9', question: 'Can I set up recurring donations?' },
      ],
    },
    {
      id: 'volunteer',
      title: 'Volunteering',
      icon: '🤝',
      description: 'Join our volunteer program',
      questions: [
        { id: '10', question: 'How to become a volunteer?' },
        { id: '11', question: 'What are the requirements?' },
        { id: '12', question: 'Where can I volunteer?' },
      ],
    },
  ]

  const popularQuestions = categories.flatMap((cat) =>
    cat.questions
      .filter((q) => q.popular)
      .map((q) => ({ ...q, category: cat.title, icon: cat.icon })),
  )

  const filteredCategories = searchQuery
    ? categories
        .map((cat) => ({
          ...cat,
          questions: cat.questions.filter((q) =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((cat) => cat.questions.length > 0)
    : categories

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <Master>
      {/* Hero Section */}
      <section className="help-hero">
        <div className="help-hero-overlay" />
        <div className="container">
          <div className="help-hero-content">
            <span className="help-badge">
              <span className="badge-icon">💡</span>
              Help Center
            </span>
            <h1 className="help-hero-title">How can we help you?</h1>
            <p className="help-hero-desc">
              Find answers to common questions or reach out to our support team
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="help-search-form">
              <div className="help-search-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="help-search-input"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button type="button" className="search-clear" onClick={() => setSearchQuery('')}>
                    ✕
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      {!searchQuery && (
        <section className="help-popular-section">
          <div className="container">
            <div className="section-header-center">
              <span className="section-label">Quick Answers</span>
              <h2 className="section-title">Popular Questions</h2>
            </div>

            <div className="popular-cards">
              {popularQuestions.map((q) => (
                <Link key={q.id} href={`/help/answer/${q.id}`} className="popular-card">
                  <span className="popular-icon">{q.icon}</span>
                  <div className="popular-content">
                    <span className="popular-category">{q.category}</span>
                    <h3 className="popular-question">{q.question}</h3>
                  </div>
                  <span className="popular-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="help-categories-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Browse Topics</span>
            <h2 className="section-title">
              {searchQuery ? `Results for "${searchQuery}"` : 'Help Categories'}
            </h2>
          </div>

          {filteredCategories.length > 0 ? (
            <div className="categories-grid">
              {filteredCategories.map((category) => (
                <div key={category.id} className="category-card">
                  <div className="category-header">
                    <span className="category-icon">{category.icon}</span>
                    <div>
                      <h3 className="category-title">{category.title}</h3>
                      <p className="category-desc">{category.description}</p>
                    </div>
                  </div>

                  <div className="category-questions">
                    {category.questions.slice(0, 3).map((q) => (
                      <Link key={q.id} href={`/help/answer/${q.id}`} className="question-link">
                        <span className="question-text">{q.question}</span>
                        <span className="question-arrow">→</span>
                      </Link>
                    ))}
                  </div>

                  <Link href={`/help/category/${category.id}`} className="category-see-all">
                    See all articles
                    <span className="see-all-arrow">→</span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>No results found</h3>
              <p>Try searching with different keywords</p>
              <button className="reset-search-btn" onClick={() => setSearchQuery('')}>
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* All Answers Link */}
      <section className="help-all-answers-section">
        <div className="container">
          <Link href="/help/answers" className="all-answers-card">
            <div className="all-answers-content">
              <span className="all-answers-icon">📚</span>
              <div>
                <h3>Browse All Answers</h3>
                <p>View our complete knowledge base</p>
              </div>
            </div>
            <span className="all-answers-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="help-cta-section">
        <div className="container">
          <div className="help-cta-card">
            <div className="cta-icon">💬</div>
            <h2>Still need help?</h2>
            <p>Can't find what you're looking for? Our support team is here to help you.</p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn-cta-primary">
                Contact Us
                <span className="btn-arrow">→</span>
              </Link>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-whatsapp"
              >
                <span className="whatsapp-icon">💬</span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </Master>
  )
}

export default HelpPage
