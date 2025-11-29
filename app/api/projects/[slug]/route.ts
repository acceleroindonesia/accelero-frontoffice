import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@utils/Prisma'

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs'

interface School {
  name: string
  address: string
  principal_name: string
  student_count: number
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const searchParams = request.nextUrl.searchParams
    const lang = searchParams.get('lang') || 'en'

    // Find project by slug (url field)
    const project = await prisma.project.findFirst({
      where: {
        url: slug,
        deletedAt: null,
      },
    })

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found',
        },
        { status: 404 },
      )
    }

    const school = project.school as School

    // Transform project for the response
    const transformedProject = {
      id: project.projectId,
      url: project.url,
      title: lang === 'id' ? project.titleId : project.titleEn,
      titleId: project.titleId,
      titleEn: project.titleEn,
      location: project.location,
      description: lang === 'id' ? project.descriptionId : project.descriptionEn,
      descriptionId: project.descriptionId,
      descriptionEn: project.descriptionEn,
      goalAmount: Number(project.goalAmount),
      raisedAmount: Number(project.raisedAmount),
      studentsImpacted: project.studentsImpacted,
      image: project.image,
      status: project.status,
      featured: project.featured,
      category: project.category,
      startDate: project.startDate?.toISOString().split('T')[0],
      endDate: project.endDate?.toISOString().split('T')[0],
      school: {
        name: school?.name || '',
        address: school?.address || '',
        principalName: school?.principal_name || '',
        studentCount: school?.student_count || 0,
      },
      donorCount: project.donorCount,
      volunteerCount: project.volunteerCount,
    }

    return NextResponse.json(
      {
        success: true,
        project: transformedProject,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching project details:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch project details',
      },
      { status: 500 },
    )
  }
}
