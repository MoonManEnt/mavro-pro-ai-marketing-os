import React from 'react';
import { Brain, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ViViImpactCardProps {
  data: {
    decisionsCount: number;
    revenueImpact: number;
    timesSaved: number;
    optimizations: Array<{
      type: string;
      improvement: string;
      value: number;
    }>;
  };
}

export const ViViImpactCard: React.FC<ViViImpactCardProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getOptimizationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'budget allocation':
        return DollarSign;
      case 'content timing':
        return Clock;
      default:
        return TrendingUp;
    }
  };

  const getOptimizationColor = (index: number) => {
    const colors = [
      'from-purple-500 to-violet-600',
      'from-blue-500 to-indigo-600',
      'from-green-500 to-emerald-600'
    ];
    return colors[index] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">ViVi AI Impact</h2>
            <p className="text-gray-600">AI-driven optimization results</p>
          </div>
        </div>
        <Badge className="bg-purple-100 text-purple-800 border-purple-300 font-bold">
          {data.decisionsCount} Decisions
        </Badge>
      </div>

      {/* Key Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-purple-900">AI Decisions</span>
          </div>
          <p className="text-2xl font-black text-gray-900">{data.decisionsCount}</p>
          <p className="text-xs text-purple-700">This period</p>
        </div>
        
        <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-900">Revenue Impact</span>
          </div>
          <p className="text-2xl font-black text-gray-900">{formatCurrency(data.revenueImpact)}</p>
          <p className="text-xs text-green-700">Generated</p>
        </div>
        
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-900">Time Saved</span>
          </div>
          <p className="text-2xl font-black text-gray-900">{data.timesSaved}h</p>
          <p className="text-xs text-blue-700">This month</p>
        </div>
      </div>

      {/* Optimization Breakdown */}
      <div className="space-y-4">
        <h3 className="font-black text-gray-900 mb-4">Key Optimizations</h3>
        {data.optimizations.map((optimization, index) => {
          const IconComponent = getOptimizationIcon(optimization.type);
          const colorClass = getOptimizationColor(index);
          
          return (
            <div key={index} className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-purple-50 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-gray-900">{optimization.type}</h4>
                    <p className="text-xs text-gray-600">{optimization.improvement}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300 font-bold text-xs">
                  {formatCurrency(optimization.value)}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <span className="font-black text-gray-900">ViVi Performance</span>
        </div>
        <p className="text-sm text-gray-700">
          ViVi AI has made {data.decisionsCount} strategic decisions this period, generating {formatCurrency(data.revenueImpact)} in additional revenue 
          while saving {data.timesSaved} hours of manual optimization work.
        </p>
      </div>
    </div>
  );
};