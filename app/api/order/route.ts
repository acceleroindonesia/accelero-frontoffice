// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@utils/Prisma'; // make sure to export prisma properly
import { z } from 'zod';
import { authOptions } from '@utils/AuthOptions';
import { Prisma } from '@orm*';
import Decimal = Prisma.Decimal;

const OrderSchema = z.object({
  items: z.array(
    z.object({
      ticketTypeId: z.number(),
      quantity: z.number().min(1).max(9),
    })
  ),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const parse = OrderSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const { items } = parse.data;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: session.user.email! },
    });

    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      let totalPrice = new Decimal(0);
      const orderItems = [];

      for (const item of items) {
        const ticketType = await tx.ticketType.findUniqueOrThrow({
          where: { id: item.ticketTypeId },
        });

        if (ticketType.stock < item.quantity) {
          return NextResponse.json(
            { error: `Insufficient stock for ticket: ${ticketType.name}` },
            { status: 400 }
          );
        }

        const unitPrice = ticketType.price;
        const subtotalPrice = unitPrice.mul(item.quantity);

        totalPrice = totalPrice.add(subtotalPrice);

        // Decrease stock
        await tx.ticketType.update({
          where: { id: item.ticketTypeId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        orderItems.push({
          ticketTypeId: item.ticketTypeId,
          quantity: item.quantity,
          unitPrice: unitPrice,
          subtotalPrice,
        });
      }

      // Create Order
      return tx.order.create({
        data: {
          userId: user.id,
          totalPrice,
          status: 'PENDING',
          orderItems: {
            create: orderItems,
          },
          payment: {
            create: {
              method: 'UNPAID',
              status: 'PENDING',
              paymentUrl: '', // Will be filled after redirect to gateway
            },
          },
        },
        include: {
          orderItems: true,
          payment: true,
        },
      });
    });

    return NextResponse.json({ success: true, order: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
