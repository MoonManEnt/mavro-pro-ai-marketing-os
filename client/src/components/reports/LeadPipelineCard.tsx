import React from 'react';
import { Users, TrendingUp, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LeadPipelineCardProps {
  data: {
    total: number;
    qualified: number;
    converted: number;
    pipeline: Array<{
      stage: string;
      count: number;
      percentage: number;
    }>;
  };
}

export const LeadPipelineCard: React.FC<LeadPipelineCardProps> = ({ data }) => {
  const conversionRate = ((data.converted / data.total) * 100).toFixed(1);
  const qualificationRate = ((data.qualified / data.total) * 100).toFixed(1);

  const getStageColor = (index: number) => {
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-violet-600', 
      'from-orange-500 to-amber-600',
      'from-red-500 to-pink-600',
      'from-green-500 to-emerald-600'
    ];
    return colors[index] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Lead Pipeline</h2>
            <p className="text-gray-600">Conversion funnel analysis</p>
          </div>
        </div>
        <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300 font-bold">
          {conversionRate}% Conv Rate
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-900">Total Leads</span>
          </div>
          <p className="text-2xl font-black text-gray-900">{data.total}</p>
        </div>
        
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-purple-900">Qualified</span>
          </div>
          <p className="text-2xl font-black text-gray-900">{data.qualified}</p>
          <p className="text-xs text-purple-700">{qualificationRate}%</p>
        </div>
        
        <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-900">Converted</span>
          </div>
          <p className="text-2xl font-black text-gray-900">{data.converted}</p>
          <p className="text-xs text-green-700">{conversionRate}%</p>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="space-y-4">
        <h3 className="font-black text-gray-900 mb-4">Pipeline Breakdown</h3>
        {data.pipeline.map((stage, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-sm">{stage.stage}</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-sm">{stage.count}</span>
                <Badge className="bg-gray-100 text-gray-800 font-bold text-xs">
                  {stage.percentage}%
                </Badge>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${getStageColor(index)} shadow-sm transition-all duration-1000 ease-out`}
                style={{ width: `${stage.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl border border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <span className="font-black text-gray-900">Pipeline Insights</span>
        </div>
        <p className="text-sm text-gray-700">
          Strong qualification rate at {qualificationRate}%. Focus on nurturing leads in proposal stage to improve conversion.
        </p>
      </div>
    </div>
  );
};