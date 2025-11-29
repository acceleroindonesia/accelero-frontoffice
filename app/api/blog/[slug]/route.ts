import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@utils/Prisma'

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const searchParams = request.nextUrl.searchParams
    const lang = searchParams.get('lang') || 'en'

    // Find blog by slug
    const blog = await prisma.blogs.findFirst({
      where: {
        slug: slug,
        deleted_at: null,
        status: 'published',
      },
    })

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog not found',
        },
        { status: 404 },
      )
    }

    // Increment view count
    await prisma.blogs.update({
      where: { id: blog.id },
      data: { views_count: { increment: 1 } },
    })

    const tags = blog.tags as string[] | null

    // Transform blog for the response
    const transformedBlog = {
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
      viewsCount: Number(blog.views_count) + 1,
      status: blog.status,
      featured: blog.featured,
      publishedAt: blog.published_at?.toISOString(),
      createdAt: blog.created_at?.toISOString(),
    }

    return NextResponse.json(
      {
        success: true,
        blog: transformedBlog,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching blog details:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog details',
      },
      { status: 500 },
    )
  }
}
