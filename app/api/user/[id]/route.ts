import { prisma } from '@utils/Prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/user/:id
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params
  const parsedId = parseInt(id)

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: parsedId } })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

// PUT /api/user/:id
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params
  const parsedId = parseInt(id)

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { email, name, phoneNumber, password, role, agreement } = body

    const updatedUser = await prisma.user.update({
      where: { id: parsedId },
      data: {
        email,
        name,
        phoneNumber,
        password,
        role,
        agreement,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

// DELETE /api/user/:id
export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params
  const parsedId = parseInt(id)

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  try {
    await prisma.user.delete({ where: { id: parsedId } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
