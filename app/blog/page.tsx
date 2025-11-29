'use client'

import { useState, useEffect } from 'react'
import '../styles/blog.css'
import Master from '@components/Layout/Master'
import { useLanguage } from '@contexts/LanguageContext'
import Request, { type IResponse } from '@utils/Request'

interface BlogPost {
  id: string
  slug: string
  title: string
  titleId: string
  titleEn: string
  excerpt: string
  excerptId: string
  excerptEn: string
  authorName: string
  authorRole: string
  authorAvatar: string | null
  publishedAt: string
  category: string
  image: string | null
  readTime: number
}

const BlogPage: React.FC = () => {
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { value: 'all', label: t('allPosts'), icon: '' },
    { value: 'impact', label: t('impactStoriesCategory'), icon: '' },
    { value: 'updates', label: t('updatesCategory'), icon: '' },
    { value: 'events', label: t('eventsCategory'), icon: '' },
    { value: 'team', label: t('teamNewsCategory'), icon: '' },
  ]

  useEffect(() => {
    fetchBlogs()
  }, [language])

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      const res: IResponse = await Request.getResponse({
        url: `/api/blog?status=published&lang=${language}`,
        method: 'GET',
      })

      if (res?.data?.blogs) {
        setPosts(res.data.blogs)
        setFilteredPosts(res.data.blogs)
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let filtered = [...posts]

    if (searchQuery) {
      filtered = filtered.filter((post) => {
        const title = language === 'en' ? post.titleEn : post.titleId
        const excerpt = language === 'en' ? post.excerptEn : post.excerptId
        const searchLower = searchQuery.toLowerCase()

        return (
          title.toLowerCase().includes(searchLower) ||
          excerpt.toLowerCase().includes(searchLower) ||
          post.authorName.toLowerCase().includes(searchLower)
        )
      })
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
  }, [posts, searchQuery, selectedCategory, language])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
  }

  const activeFiltersCount = (searchQuery ? 1 : 0) + (selectedCategory !== 'all' ? 1 : 0)

  if (isLoading) {
    return (
      <Master>
        <div className="blog-page-loading">
          <div className="skeleton skeleton-header"></div>
          <div className="container">
            <div className="blog-grid">
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
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-content">
            <span className="page-label">{t('ourBlog')}</span>
            <h1 className="page-title">{t('storiesOfImpact')}</h1>
            <p className="page-subtitle">{t('blogHeroSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="blog-filters-section">
        <div className="container">
          <div className="filters-wrapper">
            <div className="search-bar">
              <span className="search-icon"></span>
              <input
                type="text"
                placeholder={t('searchArticles')}
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

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>

            {activeFiltersCount > 0 && (
              <button className="clear-filters-btn" onClick={handleClearFilters}>
                {t('clearFilters')} ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="results-info">
            <p>
              {t('showing')} {filteredPosts.length} {t('of')} {posts.length} {t('articles')}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-content">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post) => {
                const title = language === 'en' ? post.titleEn : post.titleId
                const excerpt = language === 'en' ? post.excerptEn : post.excerptId

                return (
                  <article key={post.id} className="blog-card">
                    <a href={`/blog/${post.slug}`} className="blog-card-link">
                      <div className="blog-card-image">
                        {post.image ? (
                          <img src={post.image} alt={title} />
                        ) : (
                          <div className="image-placeholder">
                            <span className="placeholder-icon">
                              {categories.find((c) => c.value === post.category)?.icon || ''}
                            </span>
                          </div>
                        )}
                        <span className="blog-category">{post.category}</span>
                      </div>
                      <div className="blog-card-content">
                        <div className="blog-meta">
                          <span className="blog-date">
                            {new Date(post.publishedAt).toLocaleDateString(
                              language === 'en' ? 'en-US' : 'id-ID',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              },
                            )}
                          </span>
                          <span className="blog-read-time">
                            {post.readTime} {t('minRead')}
                          </span>
                        </div>
                        <h3 className="blog-title">{title}</h3>
                        <p className="blog-excerpt">{excerpt}</p>
                        <div className="blog-author">
                          <div className="author-avatar">
                            {post.authorAvatar ? (
                              <img src={post.authorAvatar} alt={post.authorName} />
                            ) : (
                              post.authorName.charAt(0)
                            )}
                          </div>
                          <div className="author-info">
                            <div className="author-name">{post.authorName}</div>
                            <div className="author-role">{post.authorRole}</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon"></div>
              <h3>{t('noArticlesFound')}</h3>
              <p>{t('noArticlesMessage')}</p>
              {activeFiltersCount > 0 && (
                <button className="btn-reset" onClick={handleClearFilters}>
                  {t('resetFilters')}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-newsletter">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h2>{t('stayUpdated')}</h2>
              <p>{t('subscribeNewsletter')}</p>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder={t('enterYourEmail')} className="newsletter-input" />
              <button className="newsletter-btn">{t('subscribeBtn')}</button>
            </div>
          </div>
        </div>
      </section>
    </Master>
  )
}

export default BlogPage
