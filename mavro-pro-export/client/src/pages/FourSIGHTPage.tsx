import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Eye, Heart, MessageSquare, Share2, Users, Target, DollarSign, Calendar, Filter, Download, RefreshCw, ArrowUp, ArrowDown, Activity, Zap, Clock, Globe } from 'lucide-react';

interface AnalyticsData {
  reach: number;
  engagement: number;
  conversions: number;
  roi: number;
  impressions: number;
  clicks: number;
  shares: number;
  saves: number;
  comments: number;
  profileVisits: number;
  websiteClicks: number;
  emailSignups: number;
  revenue: number;
  costPerLead: number;
  conversionRate: number;
  engagementRate: number;
}

interface PlatformMetrics {
  platform: string;
  followers: number;
  engagement: number;
  reach: number;
  posts: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

interface FourSIGHTPageProps {
  currentPersona: string;
}

const FourSIGHTPage: React.FC<FourSIGHTPageProps> = ({ currentPersona }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetrics[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'platforms' | 'content' | 'audience'>('overview');

  useEffect(() => {
    const generateAnalyticsData = () => {
      const baseData: Record<string, AnalyticsData> = {
        kemar: {
          reach: 85000,
          engagement: 6800,
          conversions: 234,
          roi: 340,
          impressions: 125000,
          clicks: 8500,
          shares: 450,
          saves: 320,
          comments: 1200,
          profileVisits: 2400,
          websiteClicks: 890,
          emailSignups: 156,
          revenue: 45000,
          costPerLead: 45,
          conversionRate: 8.2,
          engagementRate: 8.0
        },
        karen: {
          reach: 65000,
          engagement: 4200,
          conversions: 89,
          roi: 420,
          impressions: 95000,
          clicks: 5800,
          shares: 280,
          saves: 890,
          comments: 650,
          profileVisits: 1800,
          websiteClicks: 1200,
          emailSignups: 234,
          revenue: 850000,
          costPerLead: 120,
          conversionRate: 12.5,
          engagementRate: 6.5
        },
        sarah: {
          reach: 78000,
          engagement: 7200,
          conversions: 345,
          roi: 380,
          impressions: 110000,
          clicks: 7800,
          shares: 420,
          saves: 1200,
          comments: 1800,
          profileVisits: 3200,
          websiteClicks: 1600,
          emailSignups: 289,
          revenue: 125000,
          costPerLead: 35,
          conversionRate: 15.8,
          engagementRate: 9.2
        },
        marco: {
          reach: 52000,
          engagement: 5400,
          conversions: 567,
          roi: 320,
          impressions: 78000,
          clicks: 6200,
          shares: 680,
          saves: 450,
          comments: 2100,
          profileVisits: 1900,
          websiteClicks: 2800,
          emailSignups: 145,
          revenue: 85000,
          costPerLead: 25,
          conversionRate: 22.3,
          engagementRate: 10.4
        },
        alex: {
          reach: 92000,
          engagement: 8900,
          conversions: 445,
          roi: 310,
          impressions: 135000,
          clicks: 9500,
          shares: 750,
          saves: 680,
          comments: 3200,
          profileVisits: 4100,
          websiteClicks: 2200,
          emailSignups: 378,
          revenue: 95000,
          costPerLead: 42,
          conversionRate: 18.2,
          engagementRate: 9.7
        },
        david: {
          reach: 48000,
          engagement: 2800,
          conversions: 67,
          roi: 450,
          impressions: 72000,
          clicks: 3400,
          shares: 120,
          saves: 89,
          comments: 450,
          profileVisits: 890,
          websiteClicks: 1200,
          emailSignups: 89,
          revenue: 1200000,
          costPerLead: 180,
          conversionRate: 9.8,
          engagementRate: 5.8
        }
      };

      const basePlatforms: Record<string, PlatformMetrics[]> = {
        kemar: [
          { platform: 'LinkedIn', followers: 15000, engagement: 8.2, reach: 35000, posts: 24, trend: 'up', trendPercentage: 12 },
          { platform: 'Instagram', followers: 8500, engagement: 6.8, reach: 28000, posts: 18, trend: 'up', trendPercentage: 8 },
          { platform: 'X', followers: 12000, engagement: 4.2, reach: 22000, posts: 32, trend: 'stable', trendPercentage: 2 },
          { platform: 'YouTube', followers: 3200, engagement: 12.5, reach: 8500, posts: 4, trend: 'up', trendPercentage: 18 }
        ],
        karen: [
          { platform: 'Instagram', followers: 12000, engagement: 7.8, reach: 32000, posts: 28, trend: 'up', trendPercentage: 15 },
          { platform: 'Facebook', followers: 8900, engagement: 6.2, reach: 25000, posts: 22, trend: 'up', trendPercentage: 10 },
          { platform: 'LinkedIn', followers: 5600, engagement: 5.4, reach: 15000, posts: 16, trend: 'stable', trendPercentage: 3 },
          { platform: 'YouTube', followers: 2100, engagement: 9.8, reach: 6500, posts: 6, trend: 'up', trendPercentage: 22 }
        ],
        sarah: [
          { platform: 'Instagram', followers: 18000, engagement: 9.8, reach: 45000, posts: 32, trend: 'up', trendPercentage: 18 },
          { platform: 'TikTok', followers: 14000, engagement: 12.4, reach: 38000, posts: 28, trend: 'up', trendPercentage: 25 },
          { platform: 'Facebook', followers: 7800, engagement: 6.8, reach: 22000, posts: 20, trend: 'up', trendPercentage: 8 },
          { platform: 'YouTube', followers: 4200, engagement: 8.9, reach: 12000, posts: 8, trend: 'up', trendPercentage: 14 }
        ],
        marco: [
          { platform: 'Instagram', followers: 9500, engagement: 11.2, reach: 28000, posts: 35, trend: 'up', trendPercentage: 16 },
          { platform: 'TikTok', followers: 7800, engagement: 14.6, reach: 25000, posts: 42, trend: 'up', trendPercentage: 28 },
          { platform: 'Facebook', followers: 6200, engagement: 8.4, reach: 18000, posts: 24, trend: 'up', trendPercentage: 12 },
          { platform: 'Yelp', followers: 2800, engagement: 15.2, reach: 8500, posts: 18, trend: 'up', trendPercentage: 20 }
        ],
        alex: [
          { platform: 'Instagram', followers: 22000, engagement: 10.8, reach: 52000, posts: 38, trend: 'up', trendPercentage: 20 },
          { platform: 'TikTok', followers: 18500, engagement: 13.2, reach: 48000, posts: 45, trend: 'up', trendPercentage: 30 },
          { platform: 'YouTube', followers: 8900, engagement: 9.4, reach: 28000, posts: 12, trend: 'up', trendPercentage: 16 },
          { platform: 'Facebook', followers: 6800, engagement: 7.2, reach: 20000, posts: 22, trend: 'up', trendPercentage: 9 }
        ],
        david: [
          { platform: 'Facebook', followers: 8900, engagement: 6.2, reach: 25000, posts: 18, trend: 'up', trendPercentage: 8 },
          { platform: 'YouTube', followers: 3200, engagement: 8.8, reach: 12000, posts: 8, trend: 'up', trendPercentage: 14 },
          { platform: 'Instagram', followers: 5600, engagement: 5.8, reach: 18000, posts: 14, trend: 'stable', trendPercentage: 4 },
          { platform: 'LinkedIn', followers: 2800, engagement: 4.2, reach: 8500, posts: 10, trend: 'up', trendPercentage: 6 }
        ]
      };

      setAnalyticsData(baseData[currentPersona]);
      setPlatformMetrics(basePlatforms[currentPersona] || []);
    };

    generateAnalyticsData();
  }, [currentPersona, timeRange]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (!analyticsData) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FourSIGHT™ Analytics</h1>
          <p className="text-gray-600">Advanced insights and performance analytics</p>
        </div>
        <div className="flex space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'platforms', 'content', 'audience'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reach</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.reach)}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">12%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Engagement</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.engagement)}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">8%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversions</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.conversions)}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">15%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">ROI</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.roi}%</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">5%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Impressions</span>
                  <span className="font-medium">{formatNumber(analyticsData.impressions)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Clicks</span>
                  <span className="font-medium">{formatNumber(analyticsData.clicks)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Shares</span>
                  <span className="font-medium">{formatNumber(analyticsData.shares)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Saves</span>
                  <span className="font-medium">{formatNumber(analyticsData.saves)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Comments</span>
                  <span className="font-medium">{formatNumber(analyticsData.comments)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Profile Visits</span>
                  <span className="font-medium">{formatNumber(analyticsData.profileVisits)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Website Clicks</span>
                  <span className="font-medium">{formatNumber(analyticsData.websiteClicks)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email Signups</span>
                  <span className="font-medium">{formatNumber(analyticsData.emailSignups)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="font-medium">{formatCurrency(analyticsData.revenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cost Per Lead</span>
                  <span className="font-medium">{formatCurrency(analyticsData.costPerLead)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="font-medium">{analyticsData.conversionRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Engagement Rate</span>
                  <span className="font-medium">{analyticsData.engagementRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platforms Tab */}
      {activeTab === 'platforms' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformMetrics.map((platform) => (
              <div key={platform.platform} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{platform.platform}</h3>
                  {getTrendIcon(platform.trend)}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Followers</p>
                    <p className="text-xl font-bold text-gray-900">{formatNumber(platform.followers)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Engagement Rate</p>
                    <p className="text-xl font-bold text-gray-900">{platform.engagement}%</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Reach</p>
                    <p className="text-xl font-bold text-gray-900">{formatNumber(platform.reach)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Posts</p>
                    <p className="text-xl font-bold text-gray-900">{platform.posts}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getTrendColor(platform.trend)}`}>
                      {platform.trend === 'up' ? '+' : platform.trend === 'down' ? '-' : ''}{platform.trendPercentage}%
                    </span>
                    <span className="text-sm text-gray-500">vs last period</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h3>
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Content analytics visualization would go here</p>
              <p className="text-sm text-gray-500 mt-2">Track your best performing content across all platforms</p>
            </div>
          </div>
        </div>
      )}

      {/* Audience Tab */}
      {activeTab === 'audience' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Insights</h3>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Audience demographics and insights would go here</p>
              <p className="text-sm text-gray-500 mt-2">Understand your audience better with detailed analytics</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FourSIGHTPage;