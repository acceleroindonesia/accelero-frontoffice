// app/api/payment/[id]/route.ts
import { prisma } from '@utils/Prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@utils/AuthOptions';
import { z } from 'zod';

const PaymentUpdateSchema = z.object({
  paymentSegment: z.enum(['bank', 'ewallet', 'qris', 'card']),
  paymentMethod: z.string(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ results: 'Unauthorized' }, { status: 401 });
  }
  const orderId = parseInt(params.id);
  if (isNaN(orderId)) {
    return NextResponse.json({ results: 'Invalid order ID' }, { status: 400 });
  }

  const body = await req.json();
  const parse = PaymentUpdateSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ results: 'Invalid data' }, { status: 400 });
  }

  try {
    const updated = await prisma.payment.update({
      where: { orderId },
      data: {
        segment: parse.data.paymentSegment,
        method: parse.data.paymentMethod,
        status: 'PENDING',
        paidAt: new Date(),
        paymentUrl: `/payment/dummy?orderId=${orderId}`,
      },
    });

    return NextResponse.json({ message: 'Payment updated', payment: updated });
  } catch (err) {
    console.error('Update failed:', err);
    return NextResponse.json({ results: 'Update failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ results: 'Unauthorized' }, { status: 401 });
  }

  const orderId = parseInt(await context.params.id);
  if (isNaN(orderId)) {
    return NextResponse.json({ results: 'Invalid order ID' }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: {
        user: true,
        orderItems: {
          include: {
            ticketType: {
              include: {
                event: {
                  include: {
                    venue: true,
                  },
                },
              },
            },
          },
        },
        payment: true,
      },
    });

    const firstEvent = order.orderItems[0]?.ticketType.event;

    const tickets = order.orderItems.map((item) => ({
      type: item.ticketType.name,
      quantity: item.quantity,
      price: parseFloat(item.unitPrice.toString()),
    }));

    const total = parseFloat(order.totalPrice.toString());

    return NextResponse.json({
      event: firstEvent?.title,
      venue: firstEvent?.venue?.name,
      date: firstEvent?.date,
      status: order.payment?.status,
      user: {
        name: order.user.name,
        email: order.user.email,
      },
      tickets,
      total,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ results: 'Order not found' }, { status: 404 });
  }
}
