'use client'

import { useState, useEffect, use } from 'react'
import '../../styles/blog.css'
import Master from '@components/Layout/Master'
import { useLanguage } from '@contexts/LanguageContext'
import Request, { type IResponse } from '@utils/Request'
import Link from 'next/link'

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
  metaTitle: string | null
  metaDescription: string | null
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

      if (res?.data?.blog) {
        setBlog(res.data.blog)
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

  if (isLoading) {
    return (
      <Master>
        <div className="blog-detail-loading">
          <div className="container">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-meta"></div>
            <div className="skeleton skeleton-image"></div>
            <div className="skeleton skeleton-content"></div>
          </div>
        </div>
      </Master>
    )
  }

  if (error || !blog) {
    return (
      <Master>
        <div className="blog-not-found">
          <div className="container">
            <div className="not-found-content">
              <span className="not-found-icon"></span>
              <h1>Blog Not Found</h1>
              <p>The blog post you're looking for doesn't exist or has been removed.</p>
              <Link href="/blog" className="btn-back">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </Master>
    )
  }

  const title = language === 'en' ? blog.titleEn : blog.titleId
  const content = language === 'en' ? blog.contentEn : blog.contentId

  return (
    <Master>
      {/* Blog Header */}
      <section className="blog-detail-header">
        <div className="container">
          <Link href="/blog" className="back-link">
            ← {t('ourBlog')}
          </Link>

          <div className="blog-detail-meta">
            <span className="blog-category-tag">{blog.category}</span>
            <span className="blog-date">
              {new Date(blog.publishedAt).toLocaleDateString(
                language === 'en' ? 'en-US' : 'id-ID',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              )}
            </span>
            <span className="blog-read-time">
              {blog.readTime} {t('minRead')}
            </span>
            <span className="blog-views"> {blog.viewsCount} views</span>
          </div>

          <h1 className="blog-detail-title">{title}</h1>

          <div className="blog-detail-author">
            <div className="author-avatar-large">
              {blog.authorAvatar ? (
                <img src={blog.authorAvatar} alt={blog.authorName} />
              ) : (
                blog.authorName.charAt(0)
              )}
            </div>
            <div className="author-info">
              <div className="author-name">{blog.authorName}</div>
              <div className="author-role">{blog.authorRole}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.image && (
        <section className="blog-detail-image">
          <div className="container">
            <img src={blog.image} alt={blog.imageAlt || title} className="featured-image" />
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="blog-detail-content">
        <div className="container">
          <article className="blog-article" dangerouslySetInnerHTML={{ __html: content }} />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-tags">
              <span className="tags-label">Tags:</span>
              {blog.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Share & Navigation */}
      <section className="blog-detail-footer">
        <div className="container">
          <div className="share-section">
            <span className="share-label">Share this article:</span>
            <div className="share-buttons">
              <button
                className="share-btn"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
                    '_blank',
                  )
                }
              ></button>
              <button
                className="share-btn"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                    '_blank',
                  )
                }
              >
                f
              </button>
              <button
                className="share-btn"
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`,
                    '_blank',
                  )
                }
              >
                in
              </button>
              <button
                className="share-btn"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Link copied!')
                }}
              ></button>
            </div>
          </div>

          <Link href="/blog" className="btn-back-to-blog">
            ← Back to All Articles
          </Link>
        </div>
      </section>
    </Master>
  )
}

export default BlogDetailPage
