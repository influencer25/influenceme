import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { platform, categories } = await request.json();
    // Build the query
    const where: any = {};
    if (platform) {
      where.platform = platform;
    }
    if (categories && categories.length > 0) {
      where.categories = {
        hasEvery: categories,
      };
    }
    const influencers = await prisma.influencerProfile.findMany({
      where,
      take: 50,
      include: {
        user: { select: { name: true } },
      },
    });
    // Map to frontend format
    const result = influencers.map((inf: any) => ({
      id: inf.id,
      name: inf.user?.name || '',
      location: inf.location,
      platform: inf.platform,
      categories: inf.categories,
      image: '/images/creator1.jpg', // Placeholder, update as needed
      rating: 5.0, // Placeholder
      price: inf.rate,
      tags: [], // Placeholder
      description: inf.bio,
    }));
    return NextResponse.json({ influencers: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch influencers' }, { status: 500 });
  }
} 