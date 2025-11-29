import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@utils/Prisma'

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')
    const category = searchParams.get('category')
    const status = searchParams.get('status') || 'published'
    const lang = searchParams.get('lang') || 'en'

    // Build the where clause dynamically
    const whereClause: any = {
      deleted_at: null,
    }

    if (featured) {
      whereClause.featured = true
    }

    if (category && category !== 'all') {
      whereClause.category = category
    }

    if (status && status !== 'all') {
      whereClause.status = status
    }

    // Fetch blogs from database
    const blogs = await prisma.blogs.findMany({
      where: whereClause,
      take: limit,
      orderBy: {
        published_at: 'desc',
      },
    })

    // Transform blogs for the response
    const transformedBlogs = blogs.map((blog) => {
      const tags = blog.tags as string[] | null

      return {
        id: blog.id.toString(),
        slug: blog.slug,
        title: lang === 'id' ? blog.title_id : blog.title_en,
        titleId: blog.title_id,
        titleEn: blog.title_en,
        excerpt: lang === 'id' ? blog.excerpt_id : blog.excerpt_en,
        excerptId: blog.excerpt_id,
        excerptEn: blog.excerpt_en,
        content: lang === 'id' ? blog.content_id : blog.content_en,
        contentId: blog.content_id,
        contentEn: blog.content_en,
        authorName: blog.author_name,
        authorRole: blog.author_role,
        authorAvatar: blog.author_avatar,
        category: blog.category,
        tags: tags || [],
        image: blog.image,
        imageAlt: blog.image_alt,
        metaTitle: lang === 'id' ? blog.meta_title_id : blog.meta_title_en,
        metaDescription: lang === 'id' ? blog.meta_description_id : blog.meta_description_en,
        readTime: blog.read_time,
        viewsCount: Number(blog.views_count),
        status: blog.status,
        featured: blog.featured,
        publishedAt: blog.published_at?.toISOString(),
        createdAt: blog.created_at?.toISOString(),
      }
    })

    return NextResponse.json(
      {
        success: true,
        blogs: transformedBlogs,
        meta: {
          total: transformedBlogs.length,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blogs',
        blogs: [],
      },
      { status: 500 },
    )
  }
}
