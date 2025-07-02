import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Store failed login attempts in memory (in production, use Redis or database)
const failedAttempts = new Map<string, { count: number; lastAttempt: number }>();

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// In production, this should be stored in environment variables
// For now, we'll use a default hashed password
const DEFAULT_PASSWORD_HASH = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8O'; // "admin123"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limiting
    const now = Date.now();
    const attempts = failedAttempts.get(clientIP);
    
    if (attempts && attempts.count >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = now - attempts.lastAttempt;
      
      if (timeSinceLastAttempt < WINDOW_MS) {
        const remainingTime = Math.ceil((WINDOW_MS - timeSinceLastAttempt) / 1000 / 60);
        return NextResponse.json(
          { 
            error: `Too many failed attempts. Try again in ${remainingTime} minutes.`,
            remainingTime 
          },
          { status: 429 }
        );
      } else {
        // Reset attempts after window expires
        failedAttempts.delete(clientIP);
      }
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Get the correct password hash from environment or use default
    const correctPasswordHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;
    
    // Compare password with bcrypt hash
    const isValidPassword = await bcrypt.compare(password, correctPasswordHash);
    
    if (!isValidPassword) {
      // Increment failed attempts
      const currentAttempts = failedAttempts.get(clientIP) || { count: 0, lastAttempt: 0 };
      failedAttempts.set(clientIP, {
        count: currentAttempts.count + 1,
        lastAttempt: now
      });

      const remainingAttempts = MAX_ATTEMPTS - (currentAttempts.count + 1);
      
      return NextResponse.json(
        { 
          error: `Invalid password. ${remainingAttempts} attempts remaining.`,
          remainingAttempts 
        },
        { status: 401 }
      );
    }

    // Clear failed attempts on successful login
    failedAttempts.delete(clientIP);

    // Generate a secure session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const sessionExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store session in a secure HTTP-only cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Login successful'
    });
    
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict',
      expires: sessionExpiry,
      path: '/'
    });

    // Log successful login (in production, log to database/file)
    console.log(`[SECURITY] Successful admin login from IP: ${clientIP} at ${new Date().toISOString()}`);

    return response;

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 