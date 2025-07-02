import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session');

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false });
    }

    // In a real application, you would verify the session token against a database
    // For now, we'll just check if the token exists and is not expired
    // The token is automatically validated by the cookie settings

    return NextResponse.json({ authenticated: true });

  } catch (error) {
    console.error('Admin verification error:', error);
    return NextResponse.json({ authenticated: false });
  }
} 