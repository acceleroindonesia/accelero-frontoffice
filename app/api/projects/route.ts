import { NextRequest, NextResponse } from "next/server";

// Dummy project data for Accelero Foundation
const DUMMY_PROJECTS = [
  {
    id: "proj-001",
    url: "sd-inpres-01-sorong",
    title: "Reading Excellence Program - SD Inpres 01 Sorong",
    location: "Sorong, Papua Barat",
    description:
      "Help 150 students gain foundational reading skills through our proven TaRL methodology. Includes training materials, books, and teacher support.",
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
    },
    donorCount: 87,
    volunteerCount: 12,
  },
  {
    id: "proj-002",
    url: "sdn-05-jakarta-selatan",
    title: "Math Foundation Builder - SDN 05 Jakarta Selatan",
    location: "Jakarta Selatan, DKI Jakarta",
    description:
      "Empower 200 students with strong numeracy skills. Program includes interactive learning tools, trained tutors, and ongoing assessments.",
    goalAmount: 35000000,
    raisedAmount: 28750000,
    studentsImpacted: 200,
    image: "https://picsum.photos/seed/project2/800/600",
    status: "active",
    featured: true,
    category: "numeracy",
    startDate: "2025-02-01",
    endDate: "2025-11-30",
    school: {
      name: "SDN 05 Jakarta Selatan",
      address: "Jl. Pahlawan No. 45, Jakarta Selatan",
      principalName: "Bapak Ahmad Yani",
      studentCount: 600,
    },
    donorCount: 124,
    volunteerCount: 18,
  },
  {
    id: "proj-003",
    url: "sd-negeri-08-kupang",
    title: "Literacy Catch-Up Program - SD Negeri 08 Kupang",
    location: "Kupang, Nusa Tenggara Timur",
    description:
      "Bridge the learning gap for 120 students who fell behind. Intensive small-group sessions with dedicated volunteer teachers.",
    goalAmount: 25000000,
    raisedAmount: 18500000,
    studentsImpacted: 120,
    image: "https://picsum.photos/seed/project3/800/600",
    status: "active",
    featured: true,
    category: "literacy",
    startDate: "2025-03-01",
    endDate: "2025-10-31",
    school: {
      name: "SD Negeri 08 Kupang",
      address: "Jl. Pendidikan Raya No. 89, Kupang",
      principalName: "Ibu Maria Goretti",
      studentCount: 380,
    },
    donorCount: 65,
    volunteerCount: 10,
  },
  {
    id: "proj-004",
    url: "sd-inpres-maluku-utara",
    title: "Teacher Training Excellence - Maluku Utara",
    location: "Ternate, Maluku Utara",
    description:
      "Train 30 teachers in TaRL methodology to reach 900+ students across 5 schools. Sustainable impact through educator empowerment.",
    goalAmount: 45000000,
    raisedAmount: 15300000,
    studentsImpacted: 900,
    image: "https://picsum.photos/seed/project4/800/600",
    status: "active",
    featured: true,
    category: "teacher-training",
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    school: {
      name: "Multi-School Partnership",
      address: "5 Schools in Ternate Region",
      principalName: "Koordinator: Bapak Hasan Basri",
      studentCount: 2100,
    },
    donorCount: 42,
    volunteerCount: 8,
  },
  {
    id: "proj-005",
    url: "sdn-03-jayapura",
    title: "Bilingual Learning Support - SDN 03 Jayapura",
    location: "Jayapura, Papua",
    description:
      "Special program for 180 students navigating local language and Bahasa Indonesia. Culturally responsive teaching methods included.",
    goalAmount: 40000000,
    raisedAmount: 22800000,
    studentsImpacted: 180,
    image: "https://picsum.photos/seed/project5/800/600",
    status: "active",
    featured: true,
    category: "literacy",
    startDate: "2025-02-15",
    endDate: "2025-12-15",
    school: {
      name: "SDN 03 Jayapura",
      address: "Jl. Kemerdekaan No. 234, Jayapura",
      principalName: "Ibu Ruth Kogoya",
      studentCount: 520,
    },
    donorCount: 78,
    volunteerCount: 15,
  },
  {
    id: "proj-006",
    url: "sd-muhammadiyah-ambon",
    title: "Digital Literacy Initiative - SD Muhammadiyah Ambon",
    location: "Ambon, Maluku",
    description:
      "Combine traditional literacy with basic digital skills for 100 students. Includes tablets, educational software, and trained facilitators.",
    goalAmount: 55000000,
    raisedAmount: 41250000,
    studentsImpacted: 100,
    image: "https://picsum.photos/seed/project6/800/600",
    status: "active",
    featured: true,
    category: "literacy",
    startDate: "2025-01-20",
    endDate: "2025-11-20",
    school: {
      name: "SD Muhammadiyah Ambon",
      address: "Jl. Ahmad Yani No. 156, Ambon",
      principalName: "Bapak Usman Pattiasina",
      studentCount: 350,
    },
    donorCount: 95,
    volunteerCount: 14,
  },
  {
    id: "proj-007",
    url: "sdn-12-manokwari",
    title: "Math Games & Learning - SDN 12 Manokwari",
    location: "Manokwari, Papua Barat",
    description:
      "Make math fun and accessible for 160 students through game-based learning. Proven to increase engagement and comprehension.",
    goalAmount: 30000000,
    raisedAmount: 12000000,
    studentsImpacted: 160,
    image: "https://picsum.photos/seed/project7/800/600",
    status: "active",
    featured: false,
    category: "numeracy",
    startDate: "2025-05-01",
    endDate: "2025-12-31",
    school: {
      name: "SDN 12 Manokwari",
      address: "Jl. Pahlawan No. 67, Manokwari",
      principalName: "Ibu Yustina Mandacan",
      studentCount: 420,
    },
    donorCount: 35,
    volunteerCount: 7,
  },
  {
    id: "proj-008",
    url: "sd-katolik-ende",
    title: "Reading Room Renovation - SD Katolik Ende",
    location: "Ende, Nusa Tenggara Timur",
    description:
      "Create an inspiring learning space with 500+ books, comfortable seating, and proper lighting for 300 students to flourish.",
    goalAmount: 38000000,
    raisedAmount: 38000000,
    studentsImpacted: 300,
    image: "https://picsum.photos/seed/project8/800/600",
    status: "completed",
    featured: false,
    category: "infrastructure",
    startDate: "2024-09-01",
    endDate: "2024-12-31",
    school: {
      name: "SD Katolik Ende",
      address: "Jl. Katedral No. 23, Ende",
      principalName: "Suster Maria Assumpta",
      studentCount: 480,
    },
    donorCount: 156,
    volunteerCount: 22,
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "active";

    // Filter projects based on query parameters
    let filteredProjects = [...DUMMY_PROJECTS];

    if (featured) {
      filteredProjects = filteredProjects.filter((project) => project.featured === true);
    }

    if (category) {
      filteredProjects = filteredProjects.filter((project) => project.category === category);
    }

    if (status) {
      filteredProjects = filteredProjects.filter((project) => project.status === status);
    }

    // Apply limit
    filteredProjects = filteredProjects.slice(0, limit);

    // Calculate additional statistics
    const totalFunded = filteredProjects.reduce((sum, p) => sum + p.raisedAmount, 0);
    const totalGoal = filteredProjects.reduce((sum, p) => sum + p.goalAmount, 0);
    const totalStudents = filteredProjects.reduce((sum, p) => sum + p.studentsImpacted, 0);
    const totalDonors = filteredProjects.reduce((sum, p) => sum + p.donorCount, 0);

    return NextResponse.json(
      {
        success: true,
        projects: filteredProjects,
        meta: {
          total: filteredProjects.length,
          totalFunded,
          totalGoal,
          totalStudents,
          totalDonors,
          fundingPercentage: Math.round((totalFunded / totalGoal) * 100),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch projects",
        projects: [],
      },
      { status: 500 }
    );
  }
}