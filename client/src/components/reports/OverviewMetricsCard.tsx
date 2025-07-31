import React from 'react';
import { TrendingUp, Users, Target, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface OverviewMetricsCardProps {
  data: {
    reach: number;
    leads: number;
    campaigns: number;
    conversionRate: number;
    topPlatform: string;
    growthRate: number;
  };
}

export const OverviewMetricsCard: React.FC<OverviewMetricsCardProps> = ({ data }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const metrics = [
    {
      title: 'Total Reach',
      value: formatNumber(data.reach),
      change: `+${data.growthRate}%`,
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-100',
      positive: data.growthRate > 0
    },
    {
      title: 'Leads Generated', 
      value: data.leads.toString(),
      change: '+23%',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-100',
      positive: true
    },
    {
      title: 'Active Campaigns',
      value: data.campaigns.toString(),
      change: '+2',
      icon: Zap,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-100',
      positive: true
    },
    {
      title: 'Conversion Rate',
      value: `${data.conversionRate}%`,
      change: '+1.2%',
      icon: TrendingUp,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'from-orange-50 to-amber-100',
      positive: true
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Performance Overview</h2>
            <p className="text-gray-600">Key metrics and growth indicators</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800 border-green-300 font-bold">
          Top Platform: {data.topPlatform}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-gradient-to-br ${metric.bgColor} border-2 border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <Badge 
                  className={`${
                    metric.positive 
                      ? 'bg-green-100 text-green-800 border-green-300' 
                      : 'bg-red-100 text-red-800 border-red-300'
                  } font-bold text-xs`}
                >
                  {metric.change}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-1">{metric.title}</h3>
                <p className="text-2xl font-black text-gray-900">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};