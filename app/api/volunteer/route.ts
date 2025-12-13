import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { prisma } from '@utils/Prisma'

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs'

function jsonSafe<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_key, v) => (typeof v === 'bigint' ? v.toString() : v)),
  ) as T
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      interests,
      availability,
      experience,
      motivation,
      location,
      occupation,
      userId,
      projectId,
      skills,
    } = data ?? {}

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !motivation ||
      !Array.isArray(interests) ||
      interests.length === 0 ||
      !availability
    ) {
      return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 })
    }

    const created = await prisma.volunteers.create({
      data: {
        volunteer_id: `vol_${randomUUID()}`,
        first_name: String(firstName).trim(),
        last_name: String(lastName).trim(),
        email: String(email).trim().toLowerCase(),
        phone: String(phone).trim(),
        motivation: String(motivation).trim(),

        interests,
        availability,

        experience: experience ? String(experience) : null,
        location: location ? String(location) : null,
        occupation: occupation ? String(occupation) : null,
        skills: skills ?? null,

        user_id: userId ? BigInt(userId) : null,
        project_id: projectId ? BigInt(projectId) : null,

        status: 'pending',
      },
      select: {
        id: true, // bigint -> must be serialized
        volunteer_id: true,
        status: true,
        created_at: true,
      },
    })

    return NextResponse.json(
      { message: 'Application submitted successfully', data: jsonSafe(created) },
      { status: 200 },
    )
  } catch (err) {
    console.error('Error processing volunteer application:', err)
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 })
  }
}
