import React from 'react';
import { MapPin, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GeoRegionBreakoutCardProps {
  data: Array<{
    region: string;
    zip: string;
    performance: number;
    leads: number;
  }>;
}

export const GeoRegionBreakoutCard: React.FC<GeoRegionBreakoutCardProps> = ({ data }) => {
  const maxPerformance = Math.max(...data.map(r => r.performance));
  const totalLeads = data.reduce((sum, region) => sum + region.leads, 0);

  const getPerformanceColor = (performance: number) => {
    if (performance >= 8) return 'from-green-500 to-emerald-600';
    if (performance >= 6) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 8) return 'bg-green-100 text-green-800 border-green-300';
    if (performance >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Geographic Performance</h2>
            <p className="text-gray-600">Regional lead generation insights</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800 border-green-300 font-bold">
          {totalLeads} Total Leads
        </Badge>
      </div>

      <div className="space-y-6">
        {data.map((region, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-black text-gray-900">{region.region}</span>
                  <p className="text-xs text-gray-600">{region.zip}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">{region.leads} leads</span>
                <Badge className={`${getPerformanceBadge(region.performance)} font-bold text-xs`}>
                  {region.performance}/10
                </Badge>
              </div>
            </div>
            
            {/* Performance Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${getPerformanceColor(region.performance)} shadow-sm transition-all duration-1000 ease-out`}
                style={{ width: `${(region.performance / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl border border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span className="font-black text-gray-900">Geographic Insights</span>
        </div>
        <p className="text-sm text-gray-700">
          {data[0]?.region || 'Bay Area'} leads in performance with highest lead quality. 
          Consider expanding campaigns in top-performing regions.
        </p>
      </div>
    </div>
  );
};