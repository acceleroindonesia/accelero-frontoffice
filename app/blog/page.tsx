'use client'

import { useState, useEffect } from 'react'
import '../styles/blog.css'
import Master from '@components/Layout/Master'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  date: string
  category: string
  image: string
  readTime: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { value: 'all', label: 'All Posts', icon: '📰' },
    { value: 'impact', label: 'Impact Stories', icon: '🌟' },
    { value: 'updates', label: 'Updates', icon: '📢' },
    { value: 'events', label: 'Events', icon: '🎉' },
    { value: 'team', label: 'Team News', icon: '👥' },
  ]

  useEffect(() => {
    // Simulate fetching blog posts
    // TODO: Replace with actual API call
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        slug: 'celebrating-5000-students-milestone',
        title: 'Celebrating 5,000 Students Milestone',
        excerpt:
          "We're thrilled to announce that we've reached a major milestone - 5,000 students have benefited from our education programs across 15 communities.",
        content: '',
        author: 'Sarah Johnson',
        authorRole: 'Program Director',
        date: '2025-01-15',
        category: 'impact',
        image: '/images/blog/milestone.jpg',
        readTime: '5 min read',
      },
      {
        id: '2',
        slug: 'new-digital-literacy-program-launch',
        title: 'Launching Digital Literacy Program',
        excerpt:
          'Introducing our new digital literacy initiative to prepare students for the technology-driven future. Partnership with TechCorp makes this possible.',
        content: '',
        author: 'Michael Chen',
        authorRole: 'Technology Lead',
        date: '2025-01-10',
        category: 'updates',
        image: '/images/blog/digital.jpg',
        readTime: '4 min read',
      },
      {
        id: '3',
        slug: 'annual-gala-2025-recap',
        title: 'Annual Gala 2025: A Night of Impact',
        excerpt:
          'Thank you to everyone who joined us for our Annual Gala. Together we raised $500,000 to support education programs in underserved communities.',
        content: '',
        author: 'Emma Williams',
        authorRole: 'Communications Manager',
        date: '2025-01-05',
        category: 'events',
        image: '/images/blog/gala.jpg',
        readTime: '6 min read',
      },
      {
        id: '4',
        slug: 'welcome-new-team-members',
        title: 'Welcome to Our Growing Team',
        excerpt:
          "We're excited to introduce five new team members who will help us expand our reach and deepen our impact in communities across the region.",
        content: '',
        author: 'David Martinez',
        authorRole: 'HR Director',
        date: '2024-12-28',
        category: 'team',
        image: '/images/blog/team.jpg',
        readTime: '3 min read',
      },
      {
        id: '5',
        slug: 'teacher-training-workshop-success',
        title: 'Teacher Training Workshop Success',
        excerpt:
          'Our recent teacher training workshop equipped 50 educators with modern teaching methodologies and classroom management techniques.',
        content: '',
        author: 'Lisa Anderson',
        authorRole: 'Training Coordinator',
        date: '2024-12-20',
        category: 'impact',
        image: '/images/blog/training.jpg',
        readTime: '5 min read',
      },
      {
        id: '6',
        slug: 'year-in-review-2024',
        title: '2024 Year in Review',
        excerpt:
          'As we close another year, we reflect on the incredible achievements made possible by our community of supporters, volunteers, and partners.',
        content: '',
        author: 'Robert Taylor',
        authorRole: 'Executive Director',
        date: '2024-12-15',
        category: 'updates',
        image: '/images/blog/year-review.jpg',
        readTime: '8 min read',
      },
    ]

    setTimeout(() => {
      setPosts(mockPosts)
      setFilteredPosts(mockPosts)
      setIsLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = [...posts]

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
  }, [posts, searchQuery, selectedCategory])

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
            <span className="page-label">Our Blog</span>
            <h1 className="page-title">Stories of Impact</h1>
            <p className="page-subtitle">
              Discover the latest news, impact stories, and updates from our work in education and
              community development.
            </p>
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
                placeholder="Search articles..."
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
                Clear Filters ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="results-info">
            <p>
              Showing {filteredPosts.length} of {posts.length} articles
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-content">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
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
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="blog-read-time">{post.readTime}</span>
                      </div>
                      <h3 className="blog-title">{post.title}</h3>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <div className="blog-author">
                        <div className="author-avatar">{post.author.charAt(0)}</div>
                        <div className="author-info">
                          <div className="author-name">{post.author}</div>
                          <div className="author-role">{post.authorRole}</div>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No Articles Found</h3>
              <p>
                We couldn't find any articles matching your criteria. Try adjusting your filters or
                search query.
              </p>
              {activeFiltersCount > 0 && (
                <button className="btn-reset" onClick={handleClearFilters}>
                  Reset Filters
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
              <h2>Stay Updated</h2>
              <p>
                Subscribe to our newsletter to receive the latest impact stories, program updates,
                and volunteer opportunities directly in your inbox.
              </p>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </Master>
  )
}
