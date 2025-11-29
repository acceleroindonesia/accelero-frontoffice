import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@utils/Prisma'

// Define the school interface for type safety
interface School {
  name: string
  address: string
  principal_name: string
  student_count: number
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const lang = searchParams.get('lang') || 'en' // Support for language parameter

    // Build the where clause dynamically
    const whereClause: any = {
      deletedAt: null, // Only fetch non-deleted projects
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

    // Fetch projects from database
    const projects = await prisma.project.findMany({
      where: whereClause,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform projects for the response (map fields based on language)
    const transformedProjects = projects.map((project) => {
      const school = project.school as School

      return {
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
    })

    // Calculate additional statistics
    const totalFunded = transformedProjects.reduce((sum, p) => sum + p.raisedAmount, 0)
    const totalGoal = transformedProjects.reduce((sum, p) => sum + p.goalAmount, 0)
    const totalStudents = transformedProjects.reduce((sum, p) => sum + p.studentsImpacted, 0)
    const totalDonors = transformedProjects.reduce((sum, p) => sum + p.donorCount, 0)

    return NextResponse.json(
      {
        success: true,
        projects: transformedProjects,
        meta: {
          total: transformedProjects.length,
          totalFunded,
          totalGoal,
          totalStudents,
          totalDonors,
          fundingPercentage: totalGoal > 0 ? Math.round((totalFunded / totalGoal) * 100) : 0,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects',
        projects: [],
      },
      { status: 500 },
    )
  }
}
