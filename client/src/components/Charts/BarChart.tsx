import React from 'react';

const BarChart: React.FC = () => {
  const platformData = [
    { platform: 'Instagram', engagements: 2400, color: 'from-pink-500 to-rose-500' },
    { platform: 'TikTok', engagements: 1800, color: 'from-gray-800 to-black' },
    { platform: 'Facebook', engagements: 1200, color: 'from-blue-600 to-blue-700' },
    { platform: 'LinkedIn', engagements: 900, color: 'from-blue-700 to-blue-800' },
    { platform: 'YouTube', engagements: 750, color: 'from-red-600 to-red-700' },
    { platform: 'X (Twitter)', engagements: 600, color: 'from-gray-900 to-black' }
  ];

  const maxEngagements = Math.max(...platformData.map(p => p.engagements));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Platform Engagement Comparison</h3>
        <p className="text-gray-600">Total engagements by platform (last 30 days)</p>
      </div>
      
      <div className="space-y-4">
        {platformData.map((platform, index) => (
          <div key={platform.platform} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{platform.platform}</span>
              <span className="font-bold text-gray-900">{platform.engagements.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${platform.color} transition-all duration-1000 ease-out`}
                style={{ 
                  width: `${(platform.engagements / maxEngagements) * 100}%`,
                  animationDelay: `${index * 200}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-black text-green-600">+18.5%</div>
          <div className="text-xs text-gray-600 font-medium">Total Growth</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-blue-600">8,250</div>
          <div className="text-xs text-gray-600 font-medium">Total Engagements</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-purple-600">6</div>
          <div className="text-xs text-gray-600 font-medium">Active Platforms</div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;