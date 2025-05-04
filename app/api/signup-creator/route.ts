import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const {
      location,
      title,
      bio,
      gender,
      instagram,
      instagramFollowers,
      tiktok,
      tiktokFollowers,
      youtube,
      youtubeFollowers,
    } = formData;

    // Parse city and country from location string
    let city = '';
    let country = '';
    if (location) {
      const parts = location.split(',').map((s: string) => s.trim());
      if (parts.length >= 2) {
        city = parts[0];
        country = parts.slice(1).join(', ');
      } else {
        city = location;
        country = location;
      }
    }

    // For demo, create a user with a random email and password (since those are not in the new form)
    // In production, you would get these from a previous step or session
    const email = `user${Date.now()}@demo.com`;
    const name = title;
    const password = await hash('password', 12);

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        role: 'INFLUENCER',
        isVerified: true,
        influencerProfile: {
          create: {
            city,
            country,
            title,
            gender,
            bio,
            instagram,
            instagramFollowers,
            tiktok,
            tiktokFollowers,
            youtube,
            youtubeFollowers,
            followers: 0,
            rate: 0,
            topCreator: false,
            respondsFast: false,
          },
        },
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
} 