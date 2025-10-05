import { NextRequest, NextResponse } from "next/server";

// Import the same dummy data (in production, this would be from database)
const DUMMY_PROJECTS = [
  {
    id: "proj-001",
    url: "sd-inpres-01-sorong",
    title: "Reading Excellence Program - SD Inpres 01 Sorong",
    location: "Sorong, Papua Barat",
    description:
      "Help 150 students gain foundational reading skills through our proven TaRL methodology. Includes training materials, books, and teacher support.",
    fullDescription:
      "This comprehensive reading program targets Grade 1-3 students who are struggling with basic literacy. Our Teaching at the Right Level (TaRL) approach groups students by learning level rather than grade, ensuring each child receives instruction matched to their needs. The program includes 200+ graded reading books, trained facilitators, weekly assessments, and parent engagement workshops. Over 6 months, we aim to move 80% of participating students to age-appropriate reading levels.",
    goalAmount: 50000000,
    raisedAmount: 32500000,
    studentsImpacted: 150,
    image: "https://picsum.photos/seed/project1/800/600",
    status: "active",
    featured: true,
    category: "literacy",
    startDate: "2025-01-15",
    endDate: "2025-12-31",
    school: {
      name: "SD Inpres 01 Sorong",
      address: "Jl. Pendidikan No. 123, Sorong",
      principalName: "Ibu Siti Nurhaliza",
      studentCount: 450,
      establishedYear: 1985,
    },
    donorCount: 87,
    volunteerCount: 12,
    milestones: [
      {
        date: "2025-01-15",
        description: "Program launch and baseline assessment",
        completed: true,
      },
      {
        date: "2025-03-15",
        description: "First progress review - 40 students show improvement",
        completed: true,
      },
      {
        date: "2025-06-15",
        description: "Mid-program evaluation",
        completed: false,
      },
      {
        date: "2025-09-15",
        description: "Second progress review",
        completed: false,
      },
      {
        date: "2025-12-31",
        description: "Final assessment and celebration",
        completed: false,
      },
    ],
    updates: [
      {
        date: "2025-03-20",
        title: "Amazing Progress in First 2 Months!",
        content:
          "We're thrilled to report that 42 students have already moved up one reading level. Parents are noticing the difference at home too!",
      },
      {
        date: "2025-02-10",
        title: "Books Have Arrived!",
        content:
          "All 200 reading books have been delivered and students are excited to start their learning journey.",
      },
    ],
    budget: [
      { item: "Reading books and materials", amount: 20000000 },
      { item: "Teacher training", amount: 12000000 },
      { item: "Volunteer coordinator salary", amount: 10000000 },
      { item: "Assessment tools", amount: 5000000 },
      { item: "Parent workshops", amount: 3000000 },
    ],
  },
  // Add more detailed projects as needed
];

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params;

    // Find project by slug
    const project = DUMMY_PROJECTS.find((p) => p.url === slug);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        project,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching project details:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch project details",
      },
      { status: 500 },
    );
  }
}
