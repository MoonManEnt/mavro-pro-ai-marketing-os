import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PlatformPerformanceCardProps {
  data: Array<{
    platform: string;
    reach: number;
    engagement: number;
    ctr: number;
    color: string;
  }>;
}

export const PlatformPerformanceCard: React.FC<PlatformPerformanceCardProps> = ({ data }) => {
  const maxReach = Math.max(...data.map(p => p.reach));

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Platform Performance</h2>
            <p className="text-gray-600">Reach, engagement and CTR by platform</p>
          </div>
        </div>
        <Badge className="bg-blue-100 text-blue-800 border-blue-300 font-bold">
          Live Metrics
        </Badge>
      </div>

      <div className="space-y-6">
        {data.map((platform, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${platform.color}`}></div>
                <span className="font-black text-gray-900">{platform.platform}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">{formatNumber(platform.reach)} reach</span>
                <Badge className="bg-gray-100 text-gray-800 font-bold text-xs">
                  {platform.engagement}% eng
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-300 font-bold text-xs">
                  {platform.ctr}% CTR
                </Badge>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div
                className={`h-3 rounded-full ${platform.color} shadow-sm transition-all duration-1000 ease-out`}
                style={{ width: `${(platform.reach / maxReach) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span className="font-black text-gray-900">Platform Insights</span>
        </div>
        <p className="text-sm text-gray-700">
          Instagram leads with highest engagement rate, while TikTok shows strongest reach growth (+34% this month).
        </p>
      </div>
    </div>
  );
};