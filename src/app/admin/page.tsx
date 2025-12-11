"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogOut, Code, Terminal, CheckCircle, XCircle, Loader2, Copy, Eye, EyeOff, ChevronRight, Activity, TrendingUp, AlertCircle, RefreshCw, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HeroResultCard } from '@/components/client/HeroResultCard';
import { DownloadResult } from '@/lib/types';
import { useSciFiSound } from '@/hooks/useSciFiSound';

interface ApiTestResult {
  success: boolean;
  apiName?: string;
  request?: any;
  response?: any;
  error?: string;
  timestamp?: string;
}

interface ApiUsage {
  totalCalls: number;
  successCalls: number;
  failedCalls: number;
  lastCallAt: string | null;
  dailyStats: Record<string, number>;
}

interface UsageData {
  'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com': ApiUsage;
  'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com': ApiUsage;
  totalApiCalls: number;
  createdAt: string;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [testUrl, setTestUrl] = useState('');
  const [selectedApi, setSelectedApi] = useState<'user' | 'api1' | 'api2'>('user');
  const [testResults, setTestResults] = useState<ApiTestResult | null>(null);
  const [testing, setTesting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [parsedData, setParsedData] = useState<DownloadResult | null>(null);
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [loadingUsage, setLoadingUsage] = useState(false);
  const router = useRouter();

  const { playSound } = useSciFiSound();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch usage data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsageData();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth');
      if (response.ok) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    }
  };

  const fetchUsageData = async () => {
    setLoadingUsage(true);
    try {
      console.log('📡 Fetching usage data...');
      const response = await fetch('/api/admin/usage');
      if (response.ok) {
        const result = await response.json();
        console.log('📊 Received usage data:', result);
        setUsageData(result.data);
      } else {
        console.error('❌ Failed to fetch usage:', response.status, response.statusText);
      }
    } catch (err) {
      console.error('❌ Failed to fetch usage data:', err);
    } finally {
      setLoadingUsage(false);
    }
  };

  const handleResetUsage = async () => {
    if (!confirm('Are you sure you want to reset all usage statistics? This cannot be undone.')) {
      return;
    }
    try {
      const response = await fetch('/api/admin/usage', { method: 'DELETE' });
      if (response.ok) {
        fetchUsageData();
        alert('Usage statistics reset successfully!');
      }
    } catch (err) {
      console.error('Failed to reset usage:', err);
      alert('Failed to reset usage statistics');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    router.push('/');
  };

  const parseApiResponse = (apiResponse: any, apiType: string): DownloadResult | null => {
    try {
      const data = apiResponse?.data;
      if (!data) return null;

      if (apiType === 'api1') {
        // Parse API 1 (Instagram Downloader V2) response structure
        if (data.media && Array.isArray(data.media) && data.media.length > 0) {
          const firstMedia = data.media[0];
          
          return {
            thumbnail: firstMedia.thumb || 'https://picsum.photos/600/800',
            title: firstMedia.caption || 'Instagram Media',
            author: data.owner?.username ? '@' + data.owner.username : '@instagram',
            downloadUrl: firstMedia.url || '#',
            type: firstMedia.is_video ? 'video' : 'image',
            quality: 'HD',
            caption: firstMedia.caption || '',
            username: data.owner?.username ? '@' + data.owner.username : '@instagram',
            mediaUrls: data.media.map((item: any) => ({
              type: item.is_video ? 'video' : 'image',
              quality: 'HD',
              url: item.url,
              thumbnail: item.thumb
            })),
            isCarousel: data.media.length > 1,
            mediaCount: data.media.length,
            likes: firstMedia.like_count,
            comments: firstMedia.comment_count
          };
        }
      } else if (apiType === 'api2') {
        // Parse API 2 (Instagram Stories/Videos Downloader) response structure
        if (data.url) {
          return {
            thumbnail: data.thumbnail || data.url || 'https://picsum.photos/600/800',
            title: data.title || 'Instagram Media',
            author: data.author || '@instagram',
            downloadUrl: data.url || '#',
            type: data.type || 'video',
            quality: data.quality || 'HD',
            caption: data.caption || '',
            username: data.author || '@instagram',
            mediaUrls: [{
              type: data.type || 'video',
              quality: data.quality || 'HD',
              url: data.url,
              thumbnail: data.thumbnail || data.url
            }],
            isCarousel: false,
            mediaCount: 1
          };
        }
      }
      return null;
    } catch (err) {
      console.error('Error parsing API response:', err);
      return null;
    }
  };

  const handleTestApi = async () => {
    if (!testUrl) {
      alert('Please enter an Instagram URL');
      return;
    }

    setTesting(true);
    setTestResults(null);
    setParsedData(null);

    try {
      // Test user flow or individual APIs
      if (selectedApi === 'user') {
        // Test the real user endpoint that users actually use
        const response = await fetch('/api/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: testUrl })
        });

        const data = await response.json();
        
        if (data.success && data.data) {
          setParsedData(data.data);
          
          setTestResults({
            success: true,
            apiName: data.api || 'User-Facing /api/download Endpoint',
            request: {
              method: 'POST',
              url: '/api/download',
              body: { url: testUrl }
            },
            response: {
              status: response.status,
              statusText: response.statusText,
              data: data
            },
            timestamp: new Date().toISOString()
          });
        } else {
          setTestResults({
            success: false,
            apiName: 'Failed',
            error: data.error || 'API test failed',
            timestamp: new Date().toISOString()
          });
        }
      } else {
        // Test individual API directly
        const response = await fetch('/api/admin/test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiEndpoint: selectedApi,
            url: testUrl
          })
        });

        const data = await response.json();
        setTestResults(data);

        // Parse the response for preview
        if (data.success && data.response) {
          const parsed = parseApiResponse(data.response, selectedApi);
          setParsedData(parsed);
        }
      }
    } catch (err: any) {
      setTestResults({
        success: false,
        apiName: 'Error',
        error: err.message || 'Test failed',
        timestamp: new Date().toISOString()
      });
    } finally {
      setTesting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-base-400 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-base-300 border-2 border-base-500/30 rounded-lg p-8 clip-corner">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-base-500/10 rounded-full mb-4">
                <Lock className="w-12 h-12 text-base-500" />
              </div>
              <h1 className="text-3xl font-display text-base-100 mb-2">
                ADMIN ACCESS
              </h1>
              <p className="text-base-200 font-mono text-sm">
                Enter credentials to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-base-100 font-mono text-sm mb-2">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-base-400 border-2 border-base-500/30 rounded px-4 py-3 text-base-100 font-mono focus:border-base-500 outline-none transition-colors"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-200 hover:text-base-100"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-red-500 text-sm font-mono"
                >
                  <XCircle size={16} />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-base-500 text-white font-mono py-3 rounded hover:bg-base-500/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    AUTHENTICATING...
                  </>
                ) : (
                  'ACCESS ADMIN PANEL'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-base-400 text-base-100">
      {/* Header */}
      <header className="bg-base-300 border-b-2 border-base-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-base-500/10 rounded">
                <Terminal className="w-6 h-6 text-base-500" />
              </div>
              <div>
                <h1 className="text-2xl font-display text-base-100">
                  ADMIN PANEL
                </h1>
                <p className="text-base-200 font-mono text-xs">
                  API Testing & Monitoring
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-base-400 border-2 border-base-500/30 rounded hover:border-base-500 transition-colors font-mono text-sm"
            >
              <LogOut size={16} />
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* API Usage Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-300 border-2 border-base-500/30 rounded-lg p-6 mb-6 clip-corner"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display text-base-100 flex items-center gap-2">
              <BarChart3 className="text-base-500" />
              API USAGE DASHBOARD
            </h2>
            <div className="flex gap-2">
              <button
                onClick={fetchUsageData}
                disabled={loadingUsage}
                className="flex items-center gap-2 px-4 py-2 bg-base-400 border border-base-500/30 rounded hover:border-base-500 transition-colors font-mono text-xs text-base-100 disabled:opacity-50"
              >
                <RefreshCw size={14} className={loadingUsage ? 'animate-spin' : ''} />
                REFRESH
              </button>
              <button
                onClick={handleResetUsage}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded hover:border-red-500 transition-colors font-mono text-xs text-red-400 hover:text-red-300"
              >
                <AlertCircle size={14} />
                RESET
              </button>
            </div>
          </div>

          {loadingUsage ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-base-500" size={32} />
            </div>
          ) : usageData ? (
            <div className="space-y-6">
              {/* Total Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-base-400 border border-base-300 rounded p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="text-base-500" size={20} />
                    <span className="font-mono text-xs text-base-200 uppercase tracking-wider">Total API Calls</span>
                  </div>
                  <div className="font-display text-4xl text-base-100">{usageData.totalApiCalls}</div>
                </div>
                <div className="bg-base-400 border border-base-300 rounded p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="font-mono text-xs text-base-200 uppercase tracking-wider">Successful Calls</span>
                  </div>
                  <div className="font-display text-4xl text-base-100">
                    {(usageData['instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com']?.successCalls || 0) + 
                     (usageData['instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com']?.successCalls || 0)}
                  </div>
                </div>
                <div className="bg-base-400 border border-base-300 rounded p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <XCircle className="text-red-500" size={20} />
                    <span className="font-mono text-xs text-base-200 uppercase tracking-wider">Failed Calls</span>
                  </div>
                  <div className="font-display text-4xl text-base-100">
                    {(usageData['instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com']?.failedCalls || 0) + 
                     (usageData['instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com']?.failedCalls || 0)}
                  </div>
                </div>
              </div>

              {/* API 1 Stats */}
              <div className="bg-base-400 border border-base-300 rounded p-6">
                <h3 className="font-display text-lg text-base-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-base-500" size={18} />
                  API 1: Instagram Downloader V2
                </h3>
                <div className="text-xs font-mono text-base-200 mb-4 break-all bg-base-300/50 p-2 rounded">
                  instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-base-200 font-mono mb-1">TOTAL CALLS</div>
                    <div className="text-2xl font-display text-base-100">
                      {usageData['instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com']?.totalCalls || 0}
                    </div>
                    <div className="text-xs text-base-500 font-mono mt-1">/ 100 LIMIT</div>
                  </div>
                  <div>
                    <div className="text-xs text-base-200 font-mono mb-1">SUCCESS</div>
                    <div className="text-2xl font-display text-green-500">
                      {usageData['instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com']?.successCalls || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-base-200 font-mono mb-1">FAILED</div>
                    <div className="text-2xl font-display text-red-500">
                      {usageData['instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com']?.failedCalls || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-base-200 font-mono mb-1">LAST CALL</div>
                    <div className="text-sm font-mono text-base-100">
                      {usageData['instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com']?.lastCallAt 
                        ? new Date(usageData['instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com'].lastCallAt).toLocaleString()
                        : 'Never'}
                    </div>
                  </div>
                </div>
                {/* Usage Bar */}
                <div className="mt-4">
                  <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-base-500 transition-all"
                      style={{ 
                        width: `${Math.min(((usageData['instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com']?.totalCalls || 0) / 100) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  <div className="text-xs text-base-200 font-mono mt-1">
                    {(((usageData['instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com']?.totalCalls || 0) / 100) * 100).toFixed(1)}% used
                  </div>
                </div>
              </div>

              {/* API 2 Stats */}
              <div className="bg-base-400 border border-base-300 rounded p-6">
                <h3 className="font-display text-lg text-base-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-base-500" size={18} />
                  API 2: Instagram Stories/Videos Downloader
                </h3>
                <div className="text-xs font-mono text-base-200 mb-4 break-all bg-base-300/50 p-2 rounded">
                  instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-base-200 font-mono mb-1">TOTAL CALLS</div>
                    <div className="text-2xl font-display text-base-100">
                      {usageData['instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com']?.totalCalls || 0}
                    </div>
                    <div className="text-xs text-base-500 font-mono mt-1">/ UNLIMITED</div>
                  </div>
                  <div>
                    <div className="text-xs text-base-200 font-mono mb-1">SUCCESS</div>
                    <div className="text-2xl font-display text-green-500">
                      {usageData['instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com']?.successCalls || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-base-200 font-mono mb-1">FAILED</div>
                    <div className="text-2xl font-display text-red-500">
                      {usageData['instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com']?.failedCalls || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-base-200 font-mono mb-1">LAST CALL</div>
                    <div className="text-sm font-mono text-base-100">
                      {usageData['instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com']?.lastCallAt 
                        ? new Date(usageData['instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com'].lastCallAt).toLocaleString()
                        : 'Never'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-base-200 font-mono">
              No usage data available
            </div>
          )}
        </motion.div>

        {/* User Preview */}
        <AnimatePresence>
          {parsedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <div className="bg-base-300 border-2 border-base-500/30 rounded-lg p-4 mb-4">
                <h2 className="text-xl font-display text-base-100 flex items-center gap-2">
                  <Eye className="text-base-500" />
                  USER PREVIEW (EXACT UI AS YOUR USERS SEE)
                </h2>
                <p className="text-sm font-mono text-base-200 mt-1">
                  This is exactly how the media will appear to users on the main site
                </p>
                {testResults?.apiName && (
                  <div className="mt-3 flex items-center gap-2 bg-base-400/50 border border-base-500/20 rounded p-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-xs font-mono text-base-100">
                      Fetched using: <span className="text-base-500">{testResults.apiName}</span>
                    </span>
                  </div>
                )}
              </div>
              <HeroResultCard result={parsedData} playSound={playSound} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technical Details Toggle */}
        {testResults && (
          <div className="mb-6">
            <button
              onClick={() => setTestResults(testResults ? null : testResults)}
              className="w-full bg-base-300 border-2 border-base-500/30 rounded-lg p-4 font-mono text-base-100 hover:bg-base-300/80 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Code className="text-base-500" />
                {testResults ? 'HIDE' : 'SHOW'} TECHNICAL API RESPONSE
              </span>
              <ChevronRight className={`transition-transform ${testResults ? 'rotate-90' : ''}`} />
            </button>
          </div>
        )}

        {/* Test Results */}
        <AnimatePresence>
          {testResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-base-300 border-2 border-base-500/30 rounded-lg p-6 clip-corner"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display text-base-100 flex items-center gap-2">
                  {testResults.success ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )}
                  TEST RESULTS
                </h2>
                <div className="text-xs font-mono text-base-200">
                  {testResults.timestamp}
                </div>
              </div>

              {testResults.success ? (
                <div className="space-y-4">
                  {/* API Name */}
                  <div>
                    <div className="text-sm font-mono text-base-200 mb-1">
                      API NAME
                    </div>
                    <div className="bg-base-400 rounded p-3 text-base-100 font-mono text-sm">
                      {testResults.apiName}
                    </div>
                  </div>

                  {/* Request Details */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-mono text-base-200">
                        REQUEST
                      </div>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(testResults.request, null, 2))}
                        className="text-base-500 hover:text-base-100 transition-colors"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    <div className="bg-base-400 rounded p-3 overflow-auto max-h-64">
                      <pre className="text-xs font-mono text-base-100">
                        {JSON.stringify(testResults.request, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Response Details */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-mono text-base-200">
                        RESPONSE
                      </div>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(testResults.response, null, 2))}
                        className="text-base-500 hover:text-base-100 transition-colors"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    <div className="bg-base-400 rounded p-3 overflow-auto max-h-96">
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`text-sm font-bold ${
                          testResults.response?.status === 200 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          Status: {testResults.response?.status}
                        </span>
                        <span className="text-base-200 text-sm">
                          {testResults.response?.statusText}
                        </span>
                      </div>
                      <pre className="text-xs font-mono text-base-100">
                        {JSON.stringify(testResults.response?.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-500/10 border-2 border-red-500/30 rounded p-4">
                  <div className="text-red-500 font-mono text-sm">
                    ERROR: {testResults.error}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
