import { prisma } from '@utils/Prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const event = await prisma.event.findUnique({
      where: { slug: slug },
      include: {
        venue: true,
        ticketTypes: {
          orderBy: { price: 'asc' },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ title: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ result: event }, { status: 200 });
  } catch (err) {
    console.error('Event fetch failed:', err);
    return NextResponse.json({ title: 'Error fetching event' }, { status: 500 });
  }
}
