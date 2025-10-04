// app/api/banner/route.ts.ts
import { NextResponse } from 'next/server';
import { prisma } from '@utils/Prisma';



export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        bannerUrl: true,
      },
    });

    return NextResponse.json({ results: banners.map(b => b.bannerUrl) }, { status: 200 });
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json({ title: 'Error fetching banners' }, { status: 500 });
  }
}
