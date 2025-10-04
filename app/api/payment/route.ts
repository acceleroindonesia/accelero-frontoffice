import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@utils/Prisma';
import { z } from 'zod';

const DummyPaymentSchema = z.object({
  orderId: z.number(),
  paymentSegment: z.enum(['bank', 'ewallet', 'qris', 'card']),
  paymentMethod: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parse = DummyPaymentSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { orderId, paymentMethod } = parse.data;

  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: orderId },
    });

    // Simulate saving payment
    await prisma.payment.update({
      where: { orderId },
      data: {
        method: paymentMethod,
        paymentUrl: `https://dummy-gateway.com/pay/${order.uuid}`, // fake URL
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      message: 'Payment created',
      url: `/payment/dummy?orderId=${order.id}`,
    });
  } catch (error) {
    console.error('Payment creation failed:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}