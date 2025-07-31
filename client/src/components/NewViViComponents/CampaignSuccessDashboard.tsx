import React from "react";
import { TrendingUp, Target, DollarSign, Eye, Hash } from "lucide-react";
import { forecastROI } from "../../modules/ROIForecastEngine";
import { trackHashtagPerformance } from "../../modules/HashtagPerformanceTracker";

interface CampaignSuccessDashboardProps {
  content?: any;
  posts?: any[];
}

const CampaignSuccessDashboard: React.FC<CampaignSuccessDashboardProps> = ({ content, posts = [] }) => {
  const roi = forecastROI(content);
  const tags = trackHashtagPerformance(posts);

  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Campaign Success Forecast
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Projected Views</span>
          </div>
          <p className="text-2xl font-bold text-white">{roi.views.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl border border-green-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Estimated Clicks</span>
          </div>
          <p className="text-2xl font-bold text-white">{roi.clicks.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Projected Leads</span>
          </div>
          <p className="text-2xl font-bold text-white">{roi.leads.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Estimated Revenue</span>
          </div>
          <p className="text-2xl font-bold text-white">${roi.projectedRevenue.toLocaleString()}</p>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Hash className="w-5 h-5 text-pink-400" />
            <h4 className="text-lg font-semibold text-white">Top Performing Hashtags</h4>
          </div>
          <div className="space-y-2">
            {tags.map((tag, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-pink-400 font-medium">#{tag.tag}</span>
                <div className="text-right">
                  <span className="text-white text-sm">
                    Avg Engagement: {Math.round(tag.averageEngagement)}
                  </span>
                  <span className="text-gray-400 text-xs ml-2">
                    (Used {tag.usageCount}x)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignSuccessDashboard;