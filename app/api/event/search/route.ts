import { NextResponse } from 'next/server';
import { prisma } from '@utils/Prisma';
import ToolBox from '@utils/ToolBox';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { keyword } = body;

    if (!keyword || keyword.length < 3) {
      return NextResponse.json({ message: 'Invalid keyword.' }, { status: 400 });
    }

    const events = await prisma.event.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
          { venue: { name: { contains: keyword, mode: 'insensitive' } } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        ticketTypes: {
          orderBy: {
            price: 'asc',
          },
          take: 1,
        },
        venue: true,
      },
    });

    const results = events
      .map((e) => {
        const ticket = e.ticketTypes?.[0] ?? { price: 0, stock: 0 };
        return {
          url: e.slug ?? e.id.toString(),
          name: e.title,
          when: new Date(e.date).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          stock: ticket.stock ?? 0,
          from: ToolBox.formatCurrency(parseInt(ticket.price?.toString() ?? '0')),
          venue: e.venue?.name ?? '',
          image: e.thumbnailUrl ?? '',
        };
      })
      .sort((a, b) => {
        // Events with stock come first
        if (a.stock !== 0 && b.stock === 0) return -1;
        if (a.stock === 0 && b.stock !== 0) return 1;
        return 0;
      });

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('Search Error:', error);
    return NextResponse.json({ message: 'Failed to search events' }, { status: 500 });
  }
}
