import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      interests,
      availability,
      experience,
      motivation,
    } = data;

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !interests ||
      interests.length === 0 ||
      !availability ||
      !motivation
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 },
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify admin team

    // For now, we'll just log the data
    console.log("Volunteer application received:", {
      firstName,
      lastName,
      email,
      phone,
      interests,
      availability,
      experience,
      motivation,
      submittedAt: new Date().toISOString(),
    });

    // TODO: Add database integration
    // Example with Prisma:
    // await prisma.volunteer.create({
    //   data: {
    //     firstName,
    //     lastName,
    //     email,
    //     phone,
    //     interests,
    //     availability,
    //     experience,
    //     motivation,
    //   },
    // });

    // TODO: Send email notification
    // await sendVolunteerConfirmationEmail(email, firstName);

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing volunteer application:", error);
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 },
    );
  }
}
