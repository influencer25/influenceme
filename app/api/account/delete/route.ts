import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'not_authenticated', message: 'You must be logged in to delete your account.' }, { status: 401 });
    }
    let userId: string;
    try {
      userId = verifyToken(token).userId;
    } catch (err) {
      return NextResponse.json({ error: 'invalid_token', message: 'Invalid or expired session. Please log in again.' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'not_found', message: 'Account not found or already deleted.' }, { status: 404 });
    }
    await prisma.user.delete({ where: { id: userId } });
    // Clear the token cookie
    const response = NextResponse.json({
      success: true,
      message: "Your account has been deleted. We'd love to see you come back and connect with our vast network!"
    });
    response.cookies.set('token', '', { path: '/', maxAge: 0 });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'server_error', message: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
} 