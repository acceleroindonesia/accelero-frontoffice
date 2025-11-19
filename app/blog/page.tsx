'use client'

import { useState, useEffect } from 'react'
import '../styles/blog.css'
import Master from '@components/Layout/Master'
import { useLanguage } from '@contexts/LanguageContext'

interface BlogPost {
  id: string
  slug: string
  title_en: string
  title_id: string
  excerpt_en: string
  excerpt_id: string
  author_name: string
  author_role: string
  published_at: string
  category: string
  image: string
  read_time: number
}

export default function BlogPage() {
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { value: 'all', label: t('allPosts'), icon: '📰' },
    { value: 'impact', label: t('impactStoriesCategory'), icon: '🌟' },
    { value: 'updates', label: t('updatesCategory'), icon: '📢' },
    { value: 'events', label: t('eventsCategory'), icon: '🎉' },
    { value: 'team', label: t('teamNewsCategory'), icon: '👥' },
  ]

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/blog?status=published')
      // const data = await response.json()
      // setPosts(data.blogs || [])

      // Temporary mock data
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          slug: 'celebrating-5000-students-milestone',
          title_en: 'Celebrating 5,000 Students Milestone',
          title_id: 'Merayakan Pencapaian 5.000 Siswa',
          excerpt_en:
            "We're thrilled to announce that we've reached a major milestone - 5,000 students have benefited from our education programs across 15 communities.",
          excerpt_id:
            'Kami dengan bangga mengumumkan bahwa kami telah mencapai pencapaian besar - 5.000 siswa telah mendapat manfaat dari program pendidikan kami di 15 komunitas.',
          author_name: 'Sarah Johnson',
          author_role: 'Program Director',
          published_at: '2025-01-15',
          category: 'impact',
          image: '/images/blog/milestone.jpg',
          read_time: 5,
        },
        {
          id: '2',
          slug: 'new-digital-literacy-program-launch',
          title_en: 'Launching Digital Literacy Program',
          title_id: 'Meluncurkan Program Literasi Digital',
          excerpt_en:
            'Introducing our new digital literacy initiative to prepare students for the technology-driven future. Partnership with TechCorp makes this possible.',
          excerpt_id:
            'Memperkenalkan inisiatif literasi digital baru kami untuk mempersiapkan siswa menghadapi masa depan yang didorong teknologi. Kemitraan dengan TechCorp membuat ini mungkin.',
          author_name: 'Michael Chen',
          author_role: 'Technology Lead',
          published_at: '2025-01-10',
          category: 'updates',
          image: '/images/blog/digital.jpg',
          read_time: 4,
        },
        {
          id: '3',
          slug: 'annual-gala-2025-recap',
          title_en: 'Annual Gala 2025: A Night of Impact',
          title_id: 'Gala Tahunan 2025: Malam Berdampak',
          excerpt_en:
            'Thank you to everyone who joined us for our Annual Gala. Together we raised $500,000 to support education programs in underserved communities.',
          excerpt_id:
            'Terima kasih kepada semua orang yang bergabung dengan kami untuk Gala Tahunan kami. Bersama-sama kami mengumpulkan $500.000 untuk mendukung program pendidikan di komunitas yang kurang terlayani.',
          author_name: 'Emma Williams',
          author_role: 'Communications Manager',
          published_at: '2025-01-05',
          category: 'events',
          image: '/images/blog/gala.jpg',
          read_time: 6,
        },
        {
          id: '4',
          slug: 'welcome-new-team-members',
          title_en: 'Welcome to Our Growing Team',
          title_id: 'Selamat Datang di Tim Kami yang Berkembang',
          excerpt_en:
            "We're excited to introduce five new team members who will help us expand our reach and deepen our impact in communities across the region.",
          excerpt_id:
            'Kami sangat senang memperkenalkan lima anggota tim baru yang akan membantu kami memperluas jangkauan dan memperdalam dampak kami di komunitas di seluruh wilayah.',
          author_name: 'David Martinez',
          author_role: 'HR Director',
          published_at: '2024-12-28',
          category: 'team',
          image: '/images/blog/team.jpg',
          read_time: 3,
        },
      ]

      setTimeout(() => {
        setPosts(mockPosts)
        setFilteredPosts(mockPosts)
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let filtered = [...posts]

    if (searchQuery) {
      filtered = filtered.filter((post) => {
        const title = language === 'en' ? post.title_en : post.title_id
        const excerpt = language === 'en' ? post.excerpt_en : post.excerpt_id
        const searchLower = searchQuery.toLowerCase()

        return (
          title.toLowerCase().includes(searchLower) ||
          excerpt.toLowerCase().includes(searchLower) ||
          post.author_name.toLowerCase().includes(searchLower)
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
              <span className="search-icon">🔍</span>
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
                const title = language === 'en' ? post.title_en : post.title_id
                const excerpt = language === 'en' ? post.excerpt_en : post.excerpt_id

                return (
                  <article key={post.id} className="blog-card">
                    <a href={`/blog/${post.slug}`} className="blog-card-link">
                      <div className="blog-card-image">
                        <div className="image-placeholder">
                          <span className="placeholder-icon">
                            {categories.find((c) => c.value === post.category)?.icon || '📰'}
                          </span>
                        </div>
                        <span className="blog-category">{post.category}</span>
                      </div>
                      <div className="blog-card-content">
                        <div className="blog-meta">
                          <span className="blog-date">
                            {new Date(post.published_at).toLocaleDateString(
                              language === 'en' ? 'en-US' : 'id-ID',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              },
                            )}
                          </span>
                          <span className="blog-read-time">
                            {post.read_time} {t('minRead')}
                          </span>
                        </div>
                        <h3 className="blog-title">{title}</h3>
                        <p className="blog-excerpt">{excerpt}</p>
                        <div className="blog-author">
                          <div className="author-avatar">{post.author_name.charAt(0)}</div>
                          <div className="author-info">
                            <div className="author-name">{post.author_name}</div>
                            <div className="author-role">{post.author_role}</div>
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
              <div className="no-results-icon">🔍</div>
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
