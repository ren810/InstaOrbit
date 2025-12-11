import { NextRequest, NextResponse } from 'next/server';

// Server-side download proxy to bypass CORS
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Fetch the media from Instagram CDN server-side (no CORS!)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch media');
    }

    // Get the media as array buffer
    const arrayBuffer = await response.arrayBuffer();
    
    // Determine content type from response headers
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    
    // Return the media with proper headers for download
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment',
        'Cache-Control': 'public, max-age=31536000',
      },
    });

  } catch (error) {
    console.error('Download proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to download media' },
      { status: 500 }
    );
  }
}
