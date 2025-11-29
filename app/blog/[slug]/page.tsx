'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import '../../styles/blog.css'
import Master from '@components/Layout/Master'
import { useLanguage } from '@contexts/LanguageContext'
import Request, { type IResponse } from '@utils/Request'

interface BlogDetail {
  id: string
  slug: string
  title: string
  titleId: string
  titleEn: string
  excerpt: string
  content: string
  contentId: string
  contentEn: string
  authorName: string
  authorRole: string
  authorAvatar: string | null
  category: string
  tags: string[]
  image: string | null
  imageAlt: string | null
  readTime: number
  viewsCount: number
  publishedAt: string
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  const { slug } = use(params)
  const { t, language } = useLanguage()
  const [blog, setBlog] = useState<BlogDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const categoryColors: Record<string, string> = {
    impact: '#10b981',
    updates: '#f59e0b',
    events: '#ec4899',
    team: '#8b5cf6',
  }

  useEffect(() => {
    fetchBlogDetail()
  }, [slug, language])

  const fetchBlogDetail = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const res: IResponse = await Request.getResponse({
        url: `/api/blog/${slug}?lang=${language}`,
        method: 'GET',
      })

      if (res?.data && 'blog' in res.data) {
        setBlog(res.data.blog as BlogDetail)
      } else {
        setError('Blog not found')
      }
    } catch (err) {
      console.error('Failed to fetch blog:', err)
      setError('Failed to load blog')
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = blog?.title || ''

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  if (isLoading) {
    return (
      <Master>
        <div className="blog-detail-loading">
          <div className="container">
            <div className="detail-skeleton-back" />
            <div className="detail-skeleton-badges" />
            <div className="detail-skeleton-title" />
            <div className="detail-skeleton-excerpt" />
            <div className="detail-skeleton-author" />
          </div>
          <div className="detail-skeleton-image" />
          <div className="container">
            <div className="detail-skeleton-content">
              <div className="detail-skeleton-line" />
              <div className="detail-skeleton-line" />
              <div className="detail-skeleton-line short" />
              <div className="detail-skeleton-line" />
              <div className="detail-skeleton-line" />
            </div>
          </div>
        </div>
      </Master>
    )
  }

  if (error || !blog) {
    return (
      <Master>
        <div className="blog-error-page">
          <div className="error-content">
            <span className="error-emoji">😔</span>
            <h1>Blog Not Found</h1>
            <p>The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog" className="error-back-btn">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </Master>
    )
  }

  const title = language === 'en' ? blog.titleEn : blog.titleId
  const content = language === 'en' ? blog.contentEn : blog.contentId
  const categoryColor = categoryColors[blog.category] || '#667eea'

  return (
    <Master>
      <article className="blog-detail-page">
        {/* Header */}
        <header className="detail-header">
          <div className="container">
            <Link href="/blog" className="detail-back-link">
              <span className="back-icon">←</span>
              <span>{t('ourBlog')}</span>
            </Link>

            <div className="detail-header-content">
              <div className="detail-badges">
                <span className="detail-category" style={{ background: categoryColor }}>
                  {blog.category}
                </span>
                <span className="detail-views">👁️ {blog.viewsCount}</span>
              </div>

              <h1 className="detail-title">{title}</h1>
              <p className="detail-excerpt">{blog.excerpt}</p>

              <div className="detail-author-row">
                <div className="detail-author">
                  <div className="detail-author-avatar">
                    {blog.authorAvatar ? (
                      <img src={blog.authorAvatar} alt={blog.authorName} />
                    ) : (
                      <span>{blog.authorName.charAt(0)}</span>
                    )}
                  </div>
                  <div className="detail-author-info">
                    <span className="detail-author-name">{blog.authorName}</span>
                    <span className="detail-author-role">{blog.authorRole}</span>
                  </div>
                </div>

                <div className="detail-meta-items">
                  <span className="detail-meta-item">
                    📅{' '}
                    {new Date(blog.publishedAt).toLocaleDateString(
                      language === 'en' ? 'en-US' : 'id-ID',
                      { month: 'short', day: 'numeric', year: 'numeric' },
                    )}
                  </span>
                  <span className="detail-meta-item">
                    ⏱️ {blog.readTime} {t('minRead')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.image && (
          <div className="detail-featured-image">
            <img src={blog.image} alt={blog.imageAlt || title} />
          </div>
        )}

        {/* Content */}
        <div className="detail-body">
          <div className="container">
            <div className="detail-layout">
              {/* Desktop Share Sidebar */}
              <aside className="detail-sidebar">
                <div className="share-sticky-box">
                  <span className="share-label">Share</span>
                  <div className="share-vertical">
                    <button
                      className="share-btn-v twitter"
                      onClick={() => handleShare('twitter')}
                      aria-label="Share on Twitter"
                    >
                      𝕏
                    </button>
                    <button
                      className="share-btn-v facebook"
                      onClick={() => handleShare('facebook')}
                      aria-label="Share on Facebook"
                    >
                      f
                    </button>
                    <button
                      className="share-btn-v linkedin"
                      onClick={() => handleShare('linkedin')}
                      aria-label="Share on LinkedIn"
                    >
                      in
                    </button>
                    <button
                      className="share-btn-v whatsapp"
                      onClick={() => handleShare('whatsapp')}
                      aria-label="Share on WhatsApp"
                    >
                      💬
                    </button>
                    <button
                      className={`share-btn-v copy ${copied ? 'copied' : ''}`}
                      onClick={() => handleShare('copy')}
                      aria-label="Copy link"
                    >
                      {copied ? '✓' : '🔗'}
                    </button>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="detail-main">
                <div className="detail-prose" dangerouslySetInnerHTML={{ __html: content }} />

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="detail-tags">
                    <span className="detail-tags-label">🏷️ Tags</span>
                    <div className="detail-tags-list">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="detail-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio */}
                <div className="detail-author-bio">
                  <div className="bio-avatar">
                    {blog.authorAvatar ? (
                      <img src={blog.authorAvatar} alt={blog.authorName} />
                    ) : (
                      <span>{blog.authorName.charAt(0)}</span>
                    )}
                  </div>
                  <div className="bio-info">
                    <span className="bio-label">Written by</span>
                    <h4 className="bio-name">{blog.authorName}</h4>
                    <span className="bio-role">{blog.authorRole}</span>
                    <p className="bio-text">
                      Contributing to Accelero's mission of transforming education across Indonesia.
                    </p>
                  </div>
                </div>

                {/* Mobile Share */}
                <div className="detail-mobile-share">
                  <span className="mobile-share-label">Share this article</span>
                  <div className="mobile-share-grid">
                    <button onClick={() => handleShare('twitter')}>𝕏 Twitter</button>
                    <button onClick={() => handleShare('facebook')}>f Facebook</button>
                    <button onClick={() => handleShare('whatsapp')}>💬 WhatsApp</button>
                    <button onClick={() => handleShare('copy')}>
                      {copied ? '✓ Copied!' : '🔗 Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="detail-footer">
          <div className="container">
            <Link href="/blog" className="detail-footer-link">
              <span>←</span>
              <span>Back to All Articles</span>
            </Link>
          </div>
        </footer>
      </article>
    </Master>
  )
}

export default BlogDetailPage
