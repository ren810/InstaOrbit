import connectDB from './mongodb';
import ApiUsage from '@/models/ApiUsage';

interface ApiUsageData {
  totalCalls: number;
  successCalls: number;
  failedCalls: number;
  lastCallAt: string | null;
  dailyStats: Record<string, number>;
}

interface UsageData {
  'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com': ApiUsageData;
  'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com': ApiUsageData;
  totalApiCalls: number;
  createdAt: string;
}

// Get usage data from MongoDB
export async function getUsageData(): Promise<UsageData> {
  try {
    await connectDB();

    const api1Data = await ApiUsage.findOne({ 
      apiHost: 'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com' 
    });
    const api2Data = await ApiUsage.findOne({ 
      apiHost: 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com' 
    });

    const defaultApiUsage: ApiUsageData = {
      totalCalls: 0,
      successCalls: 0,
      failedCalls: 0,
      lastCallAt: null,
      dailyStats: {}
    };

    const api1 = api1Data ? {
      totalCalls: api1Data.totalCalls,
      successCalls: api1Data.successCalls,
      failedCalls: api1Data.failedCalls,
      lastCallAt: api1Data.lastCallAt ? api1Data.lastCallAt.toISOString() : null,
      dailyStats: Object.fromEntries(api1Data.dailyStats || new Map())
    } : defaultApiUsage;

    const api2 = api2Data ? {
      totalCalls: api2Data.totalCalls,
      successCalls: api2Data.successCalls,
      failedCalls: api2Data.failedCalls,
      lastCallAt: api2Data.lastCallAt ? api2Data.lastCallAt.toISOString() : null,
      dailyStats: Object.fromEntries(api2Data.dailyStats || new Map())
    } : defaultApiUsage;

    return {
      'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com': api1,
      'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com': api2,
      totalApiCalls: api1.totalCalls + api2.totalCalls,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error reading usage from MongoDB:', error);
    return {
      'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com': {
        totalCalls: 0,
        successCalls: 0,
        failedCalls: 0,
        lastCallAt: null,
        dailyStats: {}
      },
      'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com': {
        totalCalls: 0,
        successCalls: 0,
        failedCalls: 0,
        lastCallAt: null,
        dailyStats: {}
      },
      totalApiCalls: 0,
      createdAt: new Date().toISOString()
    };
  }
}

// Track API call in MongoDB (fire-and-forget for better performance)
export async function trackApiCall(
  apiHost: 'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com' | 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com',
  success: boolean
): Promise<void> {
  // Fire and forget - don't block the API response
  (async () => {
    try {
      console.log(`🔵 Tracking API call: ${apiHost}, success: ${success}`);
      await connectDB();
      console.log('🟢 MongoDB connected');

      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

      // Use findOneAndUpdate for atomic operation (better for concurrent requests)
      const result = await ApiUsage.findOneAndUpdate(
        { apiHost },
        {
          $inc: {
            totalCalls: 1,
            successCalls: success ? 1 : 0,
            failedCalls: success ? 0 : 1,
            [`dailyStats.${today}`]: 1
          },
          $set: {
            lastCallAt: new Date()
          }
        },
        {
          upsert: true, // Create if doesn't exist
          new: true,
          setDefaultsOnInsert: true
        }
      );
      console.log('✅ API call tracked successfully:', result?.apiHost, 'Total:', result?.totalCalls);
    } catch (error) {
      console.error('❌ Error tracking API call in MongoDB:', error);
    }
  })();
}

// Reset usage data in MongoDB
export async function resetUsageData(): Promise<void> {
  try {
    await connectDB();
    await ApiUsage.deleteMany({});
    console.log('✅ Usage data reset successfully');
  } catch (error) {
    console.error('❌ Error resetting usage in MongoDB:', error);
    throw error;
  }
}

// Get usage stats for a specific API
export async function getApiStats(apiHost: string) {
  try {
    await connectDB();
    const usage = await ApiUsage.findOne({ apiHost });
    
    if (!usage) {
      return {
        totalCalls: 0,
        successCalls: 0,
        failedCalls: 0,
        lastCallAt: null,
        dailyStats: {}
      };
    }

    return {
      totalCalls: usage.totalCalls,
      successCalls: usage.successCalls,
      failedCalls: usage.failedCalls,
      lastCallAt: usage.lastCallAt ? usage.lastCallAt.toISOString() : null,
      dailyStats: Object.fromEntries(usage.dailyStats || new Map())
    };
  } catch (error) {
    console.error('❌ Error getting API stats from MongoDB:', error);
    return null;
  }
}
