import React from 'react';
import { Play, Camera, FileText, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PostFormatEfficacyCardProps {
  data: Array<{
    format: string;
    conversion: number;
    volume: number;
    efficiency: number;
  }>;
}

const formatIcons = {
  'Reels': Play,
  'Stories': Camera,
  'Posts': FileText,
  'Videos': Video
};

const formatColors = {
  'Reels': 'from-pink-500 to-purple-600',
  'Stories': 'from-orange-500 to-red-600',
  'Posts': 'from-blue-500 to-indigo-600',
  'Videos': 'from-green-500 to-emerald-600'
};

export const PostFormatEfficacyCard: React.FC<PostFormatEfficacyCardProps> = ({ data }) => {
  const maxConversion = Math.max(...data.map(f => f.conversion));

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Format Efficacy</h2>
            <p className="text-gray-600">Conversion rates by content type</p>
          </div>
        </div>
        <Badge className="bg-purple-100 text-purple-800 border-purple-300 font-bold">
          Best: Reels
        </Badge>
      </div>

      <div className="space-y-6">
        {data.map((format, index) => {
          const IconComponent = formatIcons[format.format as keyof typeof formatIcons] || FileText;
          const colorClass = formatColors[format.format as keyof typeof formatColors] || 'from-gray-500 to-gray-600';
          
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-gray-900">{format.format}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600">{format.volume} posts</span>
                  <Badge className="bg-gray-100 text-gray-800 font-bold text-xs">
                    {format.efficiency}% efficient
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 border-green-300 font-bold text-xs">
                    {format.conversion}% conv
                  </Badge>
                </div>
              </div>
              
              {/* Conversion Rate Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${colorClass} shadow-sm transition-all duration-1000 ease-out`}
                  style={{ width: `${(format.conversion / maxConversion) * 100}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <Play className="w-5 h-5 text-purple-600" />
          <span className="font-black text-gray-900">Format Insights</span>
        </div>
        <p className="text-sm text-gray-700">
          Video content (Reels & Videos) consistently outperforms static posts by 40% in conversion rates.
        </p>
      </div>
    </div>
  );
};