import React from 'react';
import { Megaphone, TrendingUp, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CampaignOutcomeCardProps {
  data: Array<{
    name: string;
    status: string;
    viviGrade: string;
    conversion: number;
    spend: number;
  }>;
}

export const CampaignOutcomeCard: React.FC<CampaignOutcomeCardProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800 border-green-300';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const totalSpend = data.reduce((sum, campaign) => sum + campaign.spend, 0);
  const avgConversion = data.reduce((sum, campaign) => sum + campaign.conversion, 0) / data.length;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Megaphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Campaign Outcomes</h2>
            <p className="text-gray-600">Performance and ViVi grades</p>
          </div>
        </div>
        <Badge className="bg-orange-100 text-orange-800 border-orange-300 font-bold">
          Avg: {avgConversion.toFixed(1)}%
        </Badge>
      </div>

      <div className="space-y-4 mb-6">
        {data.map((campaign, index) => (
          <div key={index} className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-sm text-gray-900 truncate">{campaign.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge className={`${getStatusColor(campaign.status)} font-bold text-xs`}>
                  {campaign.status}
                </Badge>
                <Badge className={`${getGradeColor(campaign.viviGrade)} font-bold text-xs`}>
                  ViVi: {campaign.viviGrade}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{campaign.conversion}% conv</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">${campaign.spend.toLocaleString()}</span>
                </div>
              </div>
              <Badge className="bg-gray-100 text-gray-800 font-bold text-xs">
                ROI: ${(campaign.conversion * campaign.spend / 100).toFixed(0)}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="font-black text-gray-900">Campaign Summary</span>
          <Badge className="bg-orange-100 text-orange-800 border-orange-300 font-bold">
            Total: ${totalSpend.toLocaleString()}
          </Badge>
        </div>
        <p className="text-sm text-gray-700">
          {data.filter(c => c.viviGrade.startsWith('A')).length} campaigns with A-grade ViVi performance. 
          Top performer: {data.sort((a, b) => b.conversion - a.conversion)[0]?.name || 'N/A'}
        </p>
      </div>
    </div>
  );
};