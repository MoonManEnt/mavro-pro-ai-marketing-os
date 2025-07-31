import React from 'react';
import { Users, Eye, MousePointer, ShoppingCart, CreditCard } from 'lucide-react';

const FunnelChart: React.FC = () => {
  const funnelStages = [
    { 
      stage: 'Impressions', 
      count: 10000, 
      percentage: 100, 
      color: 'from-blue-500 to-cyan-500',
      icon: Eye,
      description: 'Total content views'
    },
    { 
      stage: 'Engagements', 
      count: 2400, 
      percentage: 24, 
      color: 'from-purple-500 to-pink-500',
      icon: Users,
      description: 'Likes, comments, shares'
    },
    { 
      stage: 'Profile Visits', 
      count: 720, 
      percentage: 7.2, 
      color: 'from-green-500 to-emerald-500',
      icon: MousePointer,
      description: 'Profile page visits'
    },
    { 
      stage: 'Link Clicks', 
      count: 180, 
      percentage: 1.8, 
      color: 'from-orange-500 to-amber-500',
      icon: ShoppingCart,
      description: 'External link clicks'
    },
    { 
      stage: 'Conversions', 
      count: 36, 
      percentage: 0.36, 
      color: 'from-red-500 to-rose-500',
      icon: CreditCard,
      description: 'Leads or sales'
    }
  ];

  const calculateDropOff = (current: number, previous: number) => {
    return ((previous - current) / previous * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">Conversion funnel from impression to action</p>
      </div>
      
      {/* Funnel Stages */}
      <div className="space-y-3">
        {funnelStages.map((stage, index) => (
          <div key={stage.stage} className="relative">
            {/* Stage Container */}
            <div 
              className={`relative p-4 bg-gradient-to-r ${stage.color} rounded-xl text-white transition-all duration-300 hover:shadow-lg`}
              style={{ 
                width: `${Math.max(20, stage.percentage)}%`,
                marginLeft: `${(100 - Math.max(20, stage.percentage)) / 2}%`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <stage.icon className="w-5 h-5" />
                  <div>
                    <div className="font-bold text-lg">{stage.stage}</div>
                    <div className="text-xs opacity-90">{stage.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-xl">{stage.count.toLocaleString()}</div>
                  <div className="text-xs opacity-90">{stage.percentage}%</div>
                </div>
              </div>
            </div>
            
            {/* Drop-off indicator */}
            {index > 0 && (
              <div className="absolute -top-2 right-4 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full border border-red-200">
                -{calculateDropOff(stage.count, funnelStages[index - 1].count)}% drop-off
              </div>
            )}
            
            {/* Connecting line */}
            {index < funnelStages.length - 1 && (
              <div className="flex justify-center mt-2 mb-1">
                <div className="w-px h-4 bg-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Summary Statistics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-lg font-black text-green-600">0.36%</div>
          <div className="text-xs text-gray-600 font-medium">Conversion Rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black text-red-600">76%</div>
          <div className="text-xs text-gray-600 font-medium">Largest Drop-off</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black text-blue-600">$2,160</div>
          <div className="text-xs text-gray-600 font-medium">Est. Revenue</div>
        </div>
      </div>
      
      {/* Optimization Insights */}
      <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
          <div>
            <div className="font-bold text-yellow-800 mb-1">Optimization Opportunity</div>
            <div className="text-sm text-yellow-700">
              Largest drop-off occurs between Engagements → Profile Visits (76%). 
              Consider stronger CTAs to drive profile traffic.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelChart;