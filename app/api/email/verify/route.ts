import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@utils/Prisma'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string }

    const updated = await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailVerified: new Date() },
    })

    return NextResponse.json({ success: true, message: 'Email verified', user: updated })
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  }
}
