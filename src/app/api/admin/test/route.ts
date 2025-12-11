import { NextRequest, NextResponse } from 'next/server';

// Admin API testing endpoint
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { apiEndpoint, url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const sanitizedUrl = encodeURIComponent(url);
    const rapidApiKey = process.env.RAPIDAPI_KEY || '377b748462msh8771d155e019b30p19bf99jsn1b1fe99821cf';

    let response;
    let apiName = '';
    let requestDetails: {
      method: string;
      url: string;
      headers: Record<string, string>;
    } = {
      method: '',
      url: '',
      headers: {}
    };

    // Test different APIs based on endpoint
    switch (apiEndpoint) {
      case 'api1': {
        apiName = 'Instagram Downloader V2 API';
        const apiUrl = `https://instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com/get-post?url=${sanitizedUrl}`;
        
        requestDetails = {
          method: 'GET',
          url: apiUrl,
          headers: {
            'x-rapidapi-key': rapidApiKey,
            'x-rapidapi-host': 'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com'
          }
        };

        response = await fetch(apiUrl, {
          method: 'GET',
          headers: requestDetails.headers
        });
        break;
      }

      case 'api2': {
        apiName = 'Instagram Stories/Videos Downloader API';
        const apiUrl = `https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/convert?url=${sanitizedUrl}`;
        
        requestDetails = {
          method: 'GET',
          url: apiUrl,
          headers: {
            'x-rapidapi-key': rapidApiKey,
            'x-rapidapi-host': 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com'
          }
        };

        response = await fetch(apiUrl, {
          method: 'GET',
          headers: requestDetails.headers
        });
        break;
      }

      default:
        return NextResponse.json(
          { error: 'Invalid API endpoint' },
          { status: 400 }
        );
    }

    const responseData = await response.json();
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      success: true,
      apiName,
      request: requestDetails,
      response: {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data: responseData
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('API Test Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'API test failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
