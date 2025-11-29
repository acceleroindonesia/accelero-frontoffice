'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  viewsCount: number
  featured: boolean
}

const BlogPage: React.FC = () => {
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { value: 'all', label: t('allPosts'), icon: '📰', color: '#667eea' },
    { value: 'impact', label: t('impactStoriesCategory'), icon: '✨', color: '#10b981' },
    { value: 'updates', label: t('updatesCategory'), icon: '📢', color: '#f59e0b' },
    { value: 'events', label: t('eventsCategory'), icon: '🎉', color: '#ec4899' },
    { value: 'team', label: t('teamNewsCategory'), icon: '👥', color: '#8b5cf6' },
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
        const allBlogs = res.data.blogs
        setPosts(allBlogs)

        // Set featured post (first featured or first post)
        const featured = allBlogs.find((p: BlogPost) => p.featured) || allBlogs[0]
        setFeaturedPost(featured)

        // Filter out featured from regular list
        setFilteredPosts(allBlogs.filter((p: BlogPost) => p.id !== featured?.id))
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let filtered = posts.filter((p) => p.id !== featuredPost?.id)

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      filtered = filtered.filter((post) => {
        const title = language === 'en' ? post.titleEn : post.titleId
        const excerpt = language === 'en' ? post.excerptEn : post.excerptId
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
  }, [posts, searchQuery, selectedCategory, language, featuredPost])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
  }

  const getCategoryColor = (category: string) => {
    return categories.find((c) => c.value === category)?.color || '#667eea'
  }

  const getCategoryIcon = (category: string) => {
    return categories.find((c) => c.value === category)?.icon || '📰'
  }

  const activeFiltersCount = (searchQuery ? 1 : 0) + (selectedCategory !== 'all' ? 1 : 0)

  if (isLoading) {
    return (
      <Master>
        <div className="blog-loading">
          <div className="blog-loading-hero">
            <div className="skeleton-pulse" />
          </div>
          <div className="container">
            <div className="blog-loading-grid">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="blog-loading-card">
                  <div className="skeleton-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Master>
    )
  }

  return (
    <Master>
      {/* Hero Section with Featured Post */}
      <section className="blog-hero-section">
        <div className="blog-hero-overlay" />
        <div className="container">
          <div className="blog-hero-header">
            <span className="blog-hero-badge">
              <span className="badge-icon">✍️</span>
              {t('ourBlog')}
            </span>
            <h1 className="blog-hero-title">{t('storiesOfImpact')}</h1>
            <p className="blog-hero-desc">{t('blogHeroSubtitle')}</p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="featured-post-card">
              <div className="featured-post-image">
                {featuredPost.image ? (
                  <img src={featuredPost.image} alt={featuredPost.title} />
                ) : (
                  <div className="featured-post-placeholder">
                    <span>{getCategoryIcon(featuredPost.category)}</span>
                  </div>
                )}
                <div className="featured-post-overlay" />
              </div>
              <div className="featured-post-content">
                <div className="featured-post-badges">
                  <span className="featured-badge">⭐ Featured</span>
                  <span
                    className="category-badge"
                    style={{ background: getCategoryColor(featuredPost.category) }}
                  >
                    {getCategoryIcon(featuredPost.category)} {featuredPost.category}
                  </span>
                </div>
                <h2 className="featured-post-title">
                  {language === 'en' ? featuredPost.titleEn : featuredPost.titleId}
                </h2>
                <p className="featured-post-excerpt">
                  {language === 'en' ? featuredPost.excerptEn : featuredPost.excerptId}
                </p>
                <div className="featured-post-meta">
                  <div className="featured-author">
                    <div className="featured-author-avatar">
                      {featuredPost.authorAvatar ? (
                        <img src={featuredPost.authorAvatar} alt={featuredPost.authorName} />
                      ) : (
                        featuredPost.authorName.charAt(0)
                      )}
                    </div>
                    <div className="featured-author-info">
                      <span className="featured-author-name">{featuredPost.authorName}</span>
                      <span className="featured-author-role">{featuredPost.authorRole}</span>
                    </div>
                  </div>
                  <div className="featured-post-stats">
                    <span>
                      📅{' '}
                      {new Date(featuredPost.publishedAt).toLocaleDateString(
                        language === 'en' ? 'en-US' : 'id-ID',
                        { month: 'short', day: 'numeric', year: 'numeric' },
                      )}
                    </span>
                    <span>
                      ⏱️ {featuredPost.readTime} {t('minRead')}
                    </span>
                  </div>
                </div>
                <span className="featured-read-more">
                  Read Article <span className="arrow">→</span>
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Search & Filters */}
      <section className="blog-filters">
        <div className="container">
          <div className="filters-container">
            {/* Search */}
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-field"
                placeholder={t('searchArticles')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')}>
                  ✕
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  className={`category-pill ${selectedCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.value)}
                  style={
                    selectedCategory === cat.value
                      ? { background: cat.color, borderColor: cat.color }
                      : {}
                  }
                >
                  <span className="pill-icon">{cat.icon}</span>
                  <span className="pill-label">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Results & Clear */}
            <div className="filters-info">
              <span className="results-count">
                {filteredPosts.length} {filteredPosts.length === 1 ? t('result') : t('results')}
              </span>
              {activeFiltersCount > 0 && (
                <button className="clear-all-btn" onClick={handleClearFilters}>
                  {t('clearFilters')} ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="blog-masonry-grid">
              {filteredPosts.map((post, index) => {
                const title = language === 'en' ? post.titleEn : post.titleId
                const excerpt = language === 'en' ? post.excerptEn : post.excerptId
                const isLarge = index === 0 || index === 3

                return (
                  <article key={post.id} className={`blog-article-card ${isLarge ? 'large' : ''}`}>
                    <Link href={`/blog/${post.slug}`} className="article-link">
                      <div className="article-image">
                        {post.image ? (
                          <img src={post.image} alt={title} />
                        ) : (
                          <div
                            className="article-image-placeholder"
                            style={{
                              background: `linear-gradient(135deg, ${getCategoryColor(post.category)}, ${getCategoryColor(post.category)}dd)`,
                            }}
                          >
                            <span>{getCategoryIcon(post.category)}</span>
                          </div>
                        )}
                        <span
                          className="article-category"
                          style={{ background: getCategoryColor(post.category) }}
                        >
                          {post.category}
                        </span>
                      </div>

                      <div className="article-body">
                        <div className="article-meta">
                          <span className="article-date">
                            {new Date(post.publishedAt).toLocaleDateString(
                              language === 'en' ? 'en-US' : 'id-ID',
                              { month: 'short', day: 'numeric' },
                            )}
                          </span>
                          <span className="article-dot">•</span>
                          <span className="article-read-time">
                            {post.readTime} {t('minRead')}
                          </span>
                        </div>

                        <h3 className="article-title">{title}</h3>
                        <p className="article-excerpt">{excerpt}</p>

                        <div className="article-footer">
                          <div className="article-author">
                            <div className="author-avatar-small">
                              {post.authorAvatar ? (
                                <img src={post.authorAvatar} alt={post.authorName} />
                              ) : (
                                post.authorName.charAt(0)
                              )}
                            </div>
                            <span className="author-name-small">{post.authorName}</span>
                          </div>
                          <span className="read-more-link">Read →</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="no-posts-found">
              <div className="no-posts-icon">📭</div>
              <h3>{t('noArticlesFound')}</h3>
              <p>{t('noArticlesMessage')}</p>
              {activeFiltersCount > 0 && (
                <button className="reset-filters-btn" onClick={handleClearFilters}>
                  {t('resetFilters')}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="newsletter-cta">
            <div className="newsletter-cta-content">
              <span className="newsletter-icon">📬</span>
              <h2>{t('stayUpdated')}</h2>
              <p>{t('subscribeNewsletter')}</p>
            </div>
            <div className="newsletter-cta-form">
              <input type="email" placeholder={t('enterYourEmail')} className="newsletter-email" />
              <button className="newsletter-submit">{t('subscribeBtn')}</button>
            </div>
          </div>
        </div>
      </section>
    </Master>
  )
}

export default BlogPage
