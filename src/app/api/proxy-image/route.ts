import { NextRequest, NextResponse } from 'next/server';

// Image proxy to bypass Instagram CORS restrictions
export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Fetch image from Instagram CDN server-side (bypasses CORS)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.instagram.com/',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    // Get image as buffer
    const arrayBuffer = await response.arrayBuffer();
    
    // Get content type from response
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // Return image with proper headers
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Image proxy error:', error);
    // Return a placeholder or error
    return NextResponse.json(
      { error: 'Failed to load image' },
      { status: 500 }
    );
  }
}
