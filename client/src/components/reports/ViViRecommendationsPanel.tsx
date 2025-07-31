import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ViViRecommendationsPanelProps {
  data: Array<{
    type: string;
    priority: string;
    title: string;
    description: string;
    action: string;
    potential: string;
  }>;
}

export const ViViRecommendationsPanel: React.FC<ViViRecommendationsPanelProps> = ({ data }) => {
  const getRecommendationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'opportunity':
        return TrendingUp;
      case 'optimization':
        return Zap;
      case 'alert':
        return AlertTriangle;
      default:
        return Target;
    }
  };

  const getRecommendationColor = (type: string, priority: string) => {
    if (type === 'alert') return 'from-red-50 to-orange-100 border-red-200';
    if (priority === 'high') return 'from-blue-50 to-indigo-100 border-blue-200';
    return 'from-green-50 to-emerald-100 border-green-200';
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getActionButtonColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'opportunity':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700';
      case 'optimization':
        return 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700';
      case 'alert':
        return 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700';
      default:
        return 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">ViVi AI Recommendations</h2>
            <p className="text-gray-600">Strategic insights and actionable optimizations</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
          <span className="text-sm text-gray-600 font-medium">Live Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((recommendation, index) => {
          const IconComponent = getRecommendationIcon(recommendation.type);
          const colorClass = getRecommendationColor(recommendation.type, recommendation.priority);
          const buttonColor = getActionButtonColor(recommendation.type);
          
          return (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-gradient-to-br ${colorClass} border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-br ${
                    recommendation.type === 'alert' ? 'from-red-500 to-orange-600' :
                    recommendation.priority === 'high' ? 'from-blue-500 to-indigo-600' :
                    'from-green-500 to-emerald-600'
                  } rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-gray-900">{recommendation.title}</h3>
                    <Badge className={`${getPriorityBadge(recommendation.priority)} font-bold text-xs mt-1`}>
                      {recommendation.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {recommendation.description}
              </p>

              <div className="bg-white/60 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-600 font-medium">
                  <span className="font-bold">Recommended Action:</span> {recommendation.action}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <Badge className="bg-white/70 text-gray-800 border border-gray-300 font-bold text-xs">
                  {recommendation.potential}
                </Badge>
                <Button 
                  size="sm"
                  className={`${buttonColor} text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
                >
                  Execute
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-purple-600" />
          <span className="font-black text-gray-900 text-lg">ViVi Intelligence Summary</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-black text-gray-900">{data.filter(r => r.priority === 'high').length}</p>
            <p className="text-sm text-gray-600">High Priority</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-gray-900">{data.filter(r => r.type === 'opportunity').length}</p>
            <p className="text-sm text-gray-600">Opportunities</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-gray-900">{data.filter(r => r.type === 'alert').length}</p>
            <p className="text-sm text-gray-600">Alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
};