import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales
const locales = ['en', 'zh-CN', 'es', 'ar', 'pt', 'ja', 'ru', 'de', 'fr', 'hi'];
const defaultLocale = 'en';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true
});

// Rate limiting configuration
const rateLimit = new Map<string, number[]>();
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000');
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX || '20');

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle API routes with rate limiting
  if (pathname.startsWith('/api/')) {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous';
    const now = Date.now();
    const timestamps = rateLimit.get(ip) ?? [];
    const recentRequests = timestamps.filter(time => now - time < WINDOW_MS);

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

    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);

    // Clean up old entries
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

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS));
    response.headers.set('X-RateLimit-Remaining', String(MAX_REQUESTS - recentRequests.length));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil((now + WINDOW_MS) / 1000)));
    return response;
  }

  // Skip admin routes from i18n
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Skip static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/robots')
  ) {
    return NextResponse.next();
  }

  // Apply i18n middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for those starting with specific prefixes
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/',
    '/api/:path*',
    '/admin/:path*'
  ]
};
