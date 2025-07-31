import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Eye, MousePointer, DollarSign, Users, Brain, Lightbulb, AlertTriangle } from 'lucide-react';

interface CampaignMetrics {
  totalReach: number;
  engagement: number;
  clickThroughRate: number;
  conversionRate: number;
  costPerClick: number;
  roi: number;
  audienceGrowth: number;
  brandMentions: number;
}

interface PlatformData {
  platform: string;
  reach: number;
  engagement: number;
  ctr: number;
  bestPerformingFormat: string;
  topHashtag: string;
  optimalPostTime: string;
}

interface ViViCampaignInsightsProps {
  campaignId: string;
  metrics: CampaignMetrics;
  platformData: PlatformData[];
}

const ViViCampaignInsights: React.FC<ViViCampaignInsightsProps> = ({
  campaignId,
  metrics,
  platformData
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatPercentage = (num: number) => `${num.toFixed(1)}%`;

  const formatCurrency = (num: number) => `$${num.toFixed(2)}`;

  const getPlatformIcon = (platform: string) => {
    const platformIcons: Record<string, string> = {
      instagram: '📸',
      facebook: '👥',
      linkedin: '💼',
      tiktok: '🎵',
      x: '🐦',
      youtube: '📺'
    };
    return platformIcons[platform] || '🌐';
  };

  const getInsightType = (value: number, benchmark: number) => {
    if (value > benchmark * 1.2) return 'success';
    if (value < benchmark * 0.8) return 'warning';
    return 'neutral';
  };

  const aiInsights = [
    {
      type: 'success',
      title: 'High ROI Performance',
      description: `Campaign achieving ${metrics.roi}% ROI, exceeding industry average by 85%`,
      action: 'Consider increasing budget allocation to this campaign',
      confidence: 92
    },
    {
      type: 'opportunity',
      title: 'Instagram Outperforming',
      description: 'Instagram showing 40% higher engagement than other platforms',
      action: 'Shift 20% of budget from Facebook to Instagram for better results',
      confidence: 88
    },
    {
      type: 'warning',
      title: 'Conversion Rate Decline',
      description: 'Conversion rate decreased by 12% over past 7 days',
      action: 'Review landing page experience and A/B test new CTAs',
      confidence: 85
    },
    {
      type: 'trend',
      title: 'Optimal Posting Schedule Identified',
      description: 'Posts between 7-9 PM show 65% higher engagement',
      action: 'Reschedule upcoming posts to peak engagement hours',
      confidence: 94
    }
  ];

  const recommendations = [
    {
      title: 'Increase Instagram Budget',
      impact: '+25% Expected ROI',
      difficulty: 'Easy',
      timeframe: 'Immediate'
    },
    {
      title: 'A/B Test Video Content',
      impact: '+15% Engagement',
      difficulty: 'Medium',
      timeframe: '1-2 weeks'
    },
    {
      title: 'Optimize Landing Pages',
      impact: '+20% Conversions',
      difficulty: 'Hard',
      timeframe: '2-3 weeks'
    },
    {
      title: 'Implement Retargeting',
      impact: '+30% Conversion Rate',
      difficulty: 'Medium',
      timeframe: '3-5 days'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Executive Command Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">ViVi Campaign Intelligence</h1>
          <p className="text-lg text-gray-600 font-medium">AI-powered insights and optimization recommendations</p>
        </div>
      </div>

      {/* ViVi AI Analysis Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
        <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-purple-900 tracking-tight mb-2">🧠 ViVi's Intelligence Report</p>
              <p className="text-purple-800 font-medium leading-relaxed">
                "Your campaign is performing 35% above industry benchmarks. I've identified 4 optimization opportunities 
                that could increase your ROI by an additional 25-40%."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              <TrendingUp className="w-3 h-3 mr-1" />
              +18%
            </Badge>
          </div>
          <p className="text-2xl font-black text-gray-900 tracking-tight">{formatNumber(metrics.totalReach)}</p>
          <p className="text-sm text-gray-600 font-medium">Total Reach</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <MousePointer className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{formatPercentage(metrics.clickThroughRate)}
            </Badge>
          </div>
          <p className="text-2xl font-black text-gray-900 tracking-tight">{formatPercentage(metrics.clickThroughRate)}</p>
          <p className="text-sm text-gray-600 font-medium">Click-Through Rate</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{formatPercentage(12)}
            </Badge>
          </div>
          <p className="text-2xl font-black text-gray-900 tracking-tight">{formatPercentage(metrics.roi)}</p>
          <p className="text-sm text-gray-600 font-medium">ROI</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              <TrendingDown className="w-3 h-3 mr-1" />
              -{formatPercentage(5)}
            </Badge>
          </div>
          <p className="text-2xl font-black text-gray-900 tracking-tight">{formatPercentage(metrics.conversionRate)}</p>
          <p className="text-sm text-gray-600 font-medium">Conversion Rate</p>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">ViVi's Smart Insights</h3>
          </div>
        </div>
        <div className="p-8 space-y-6">
          {aiInsights.map((insight, index) => (
            <div 
              key={index}
              className={`bg-white border-2 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.01] ${
                insight.type === 'success' ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50' :
                insight.type === 'warning' ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' :
                insight.type === 'opportunity' ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50' :
                'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-gray-700 text-sm mb-2">{insight.description}</p>
                  <p className="text-gray-600 text-sm italic">💡 {insight.action}</p>
                </div>
                <Badge variant="outline" className="ml-3">
                  {insight.confidence}% confidence
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Platform Performance Breakdown</h3>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {platformData.map((platform, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getPlatformIcon(platform.platform)}</span>
                  <div>
                    <h4 className="font-semibold capitalize text-gray-900">{platform.platform}</h4>
                    <p className="text-sm text-gray-600">Best: {platform.bestPerformingFormat}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-bold text-gray-900">{formatNumber(platform.reach)}</p>
                    <p className="text-xs text-gray-500">Reach</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{formatNumber(platform.engagement)}</p>
                    <p className="text-xs text-gray-500">Engagement</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{formatPercentage(platform.ctr)}</p>
                    <p className="text-xs text-gray-500">CTR</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{platform.optimalPostTime}</p>
                  <p className="text-xs text-gray-500">Peak Time</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ViVi Recommendations */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">ViVi's Optimization Recommendations</h3>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-gray-900 tracking-tight mb-2">{rec.title}</h4>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full font-bold text-xs">{rec.impact}</span>
                      <span className="text-gray-600 font-medium">Difficulty: <span className="font-bold text-gray-900">{rec.difficulty}</span></span>
                      <span className="text-gray-600 font-medium">Timeline: <span className="font-bold text-gray-900">{rec.timeframe}</span></span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                  >
                    Implement
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Trends Chart Placeholder */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Performance Trends</h3>
          </div>
        </div>
        <div className="p-8">
          <div className="h-64 bg-gradient-to-br from-purple-50 via-purple-100 to-pink-100 rounded-2xl flex items-center justify-center border border-purple-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <p className="text-xl font-black text-gray-900 tracking-tight mb-2">Interactive Performance Charts</p>
              <p className="text-sm text-gray-600 font-medium">Detailed analytics visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViViCampaignInsights;