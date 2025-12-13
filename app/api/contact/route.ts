import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'
import { prisma } from '@utils/Prisma'

const SubjectEnum = z.enum([
  'general',
  'donation',
  'volunteer',
  'partnership',
  'project_inquiry',
  'technical_support',
  'feedback',
  'complaint',
  'other',
])

const CreateContactSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .max(255)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null)),
  subject: SubjectEnum.default('general'),
  message: z.string().trim().min(1).max(5000),
})

function getClientIp(req: NextRequest): string | null {
  // Try common proxy headers first
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]?.trim() || null

  const xRealIp = req.headers.get('x-real-ip')
  if (xRealIp) return xRealIp.trim()

  return null
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CreateContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: 'Validation error', issues: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const now = new Date()
    const ip_address = getClientIp(req)
    const user_agent = req.headers.get('user-agent')

    const created = await prisma.contacts.create({
      data: {
        contact_id: crypto.randomUUID(),
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        message: parsed.data.message,
        ip_address,
        user_agent,
        status: 'new',
        priority: 'medium',
        created_at: now,
        updated_at: now,
      },
      select: {
        contact_id: true,
      },
    })

    return NextResponse.json({ ok: true, contactId: created.contact_id }, { status: 201 })
  } catch (error) {
    // Keep response generic (don’t leak internals)
    console.error('Failed to submit contact form:', error)
    return NextResponse.json(
      { ok: false, message: 'Failed to submit contact form' },
      { status: 500 },
    )
  }
}
