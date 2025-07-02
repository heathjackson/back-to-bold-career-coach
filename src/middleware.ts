import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 100; // requests per window

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';

  // Security checks for admin routes
  if (pathname.startsWith('/admin')) {
    // Check if request is coming from HTTPS in production
    if (process.env.NODE_ENV === 'production') {
      const protocol = request.headers.get('x-forwarded-proto') || 'http';
      if (protocol !== 'https') {
        const httpsUrl = new URL(request.url);
        httpsUrl.protocol = 'https:';
        return NextResponse.redirect(httpsUrl);
      }
    }

    // Rate limiting for admin routes
    const rateLimitKey = `admin:${clientIP}`;
    const now = Date.now();
    const rateLimit = rateLimitStore.get(rateLimitKey);

    if (rateLimit && now < rateLimit.resetTime) {
      if (rateLimit.count >= RATE_LIMIT_MAX) {
        return new NextResponse(
          JSON.stringify({ 
            error: 'Too many requests. Please try again later.',
            retryAfter: Math.ceil((rateLimit.resetTime - now) / 1000)
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((rateLimit.resetTime - now) / 1000).toString()
            }
          }
        );
      }
      rateLimit.count++;
    } else {
      rateLimitStore.set(rateLimitKey, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW
      });
    }

    // Additional security headers for admin routes
    const response = NextResponse.next();
    response.headers.set('X-Admin-Access', 'restricted');
    return response;
  }

  // Rate limiting for API routes
  if (pathname.startsWith('/api/admin')) {
    const rateLimitKey = `api_admin:${clientIP}`;
    const now = Date.now();
    const rateLimit = rateLimitStore.get(rateLimitKey);

    if (rateLimit && now < rateLimit.resetTime) {
      if (rateLimit.count >= 50) { // Lower limit for API routes
        return new NextResponse(
          JSON.stringify({ 
            error: 'API rate limit exceeded. Please try again later.',
            retryAfter: Math.ceil((rateLimit.resetTime - now) / 1000)
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((rateLimit.resetTime - now) / 1000).toString()
            }
          }
        );
      }
      rateLimit.count++;
    } else {
      rateLimitStore.set(rateLimitKey, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW
      });
    }
  }

  // Security headers for all routes
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 