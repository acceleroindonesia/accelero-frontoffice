// app/api/banner/route.ts.ts
import { NextResponse } from 'next/server';
import { prisma } from '@utils/Prisma';
import ToolBox from '@utils/ToolBox';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
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
          event: e,
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
        // Put events with available stock first
        if (a.stock !== 0 && b.stock === 0) return -1;
        if (a.stock === 0 && b.stock !== 0) return 1;
        return 0;
      })
      .map(({ event, ...rest }) => rest); // remove `event` from final result if not needed

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ title: 'Error fetching events' }, { status: 500 });
  }
}
