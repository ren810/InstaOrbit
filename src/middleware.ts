import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting
// For production, use Redis or a dedicated rate limiting service
const rateLimit = new Map<string, number[]>();

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'); // 1 minute
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX || '20'); // 20 requests per minute

export function middleware(request: NextRequest) {
  // Only rate limit API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Get client IP
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous';
  const now = Date.now();

  // Get existing timestamps for this IP
  const timestamps = rateLimit.get(ip) ?? [];

  // Filter out timestamps outside the current window
  const recentRequests = timestamps.filter(time => now - time < WINDOW_MS);

  // Check if rate limit exceeded
  if (recentRequests.length >= MAX_REQUESTS) {
    return NextResponse.json(
      { 
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(WINDOW_MS / 1000)
      },
      { 
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(WINDOW_MS / 1000)),
          'X-RateLimit-Limit': String(MAX_REQUESTS),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil((now + WINDOW_MS) / 1000))
        }
      }
    );
  }

  // Add current timestamp
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);

  // Clean up old entries periodically (every 100 requests)
  if (Math.random() < 0.01) {
    const cutoff = now - WINDOW_MS;
    Array.from(rateLimit.entries()).forEach(([key, times]) => {
      const filtered = times.filter((t: number) => t > cutoff);
      if (filtered.length === 0) {
        rateLimit.delete(key);
      } else {
        rateLimit.set(key, filtered);
      }
    });
  }

  // Add rate limit headers to response
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS));
  response.headers.set('X-RateLimit-Remaining', String(MAX_REQUESTS - recentRequests.length));
  response.headers.set('X-RateLimit-Reset', String(Math.ceil((now + WINDOW_MS) / 1000)));

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],
};
