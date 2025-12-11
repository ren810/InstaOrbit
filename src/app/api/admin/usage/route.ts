import { NextRequest, NextResponse } from 'next/server';
import { getUsageData, resetUsageData } from '@/lib/usage-tracker';

// Get API usage statistics
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const usage = await getUsageData();
    console.log('📊 Fetched usage data:', usage);
    return NextResponse.json({ success: true, data: usage });
  } catch (error: any) {
    console.error('❌ Usage stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage stats', details: error.message },
      { status: 500 }
    );
  }
}

// Reset usage statistics
export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await resetUsageData();
    console.log('🗑️ Usage stats reset');
    return NextResponse.json({ success: true, message: 'Usage stats reset successfully' });
  } catch (error: any) {
    console.error('❌ Usage reset error:', error);
    return NextResponse.json(
      { error: 'Failed to reset usage stats', details: error.message },
      { status: 500 }
    );
  }
}
