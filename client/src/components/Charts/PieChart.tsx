import React from 'react';

const PieChart: React.FC = () => {
  const contentTypes = [
    { type: 'Reels/Videos', percentage: 45, color: 'from-purple-500 to-pink-500', count: 28 },
    { type: 'Single Images', percentage: 25, color: 'from-blue-500 to-cyan-500', count: 16 },
    { type: 'Carousels', percentage: 20, color: 'from-green-500 to-emerald-500', count: 12 },
    { type: 'Stories', percentage: 10, color: 'from-orange-500 to-amber-500', count: 6 }
  ];

  // Simple visual pie chart representation
  const createPieSlice = (percentage: number, color: string, offset: number) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -offset * circumference / 100;
    
    return {
      strokeDasharray,
      strokeDashoffset,
      color
    };
  };

  let cumulativeOffset = 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Content Format Performance</h3>
        <p className="text-gray-600">Engagement breakdown by content type</p>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            {contentTypes.map((item, index) => {
              const slice = createPieSlice(item.percentage, item.color, cumulativeOffset);
              cumulativeOffset += item.percentage;
              
              return (
                <circle
                  key={item.type}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={`url(#gradient-${index})`}
                  strokeWidth="10"
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                  style={{ animationDelay: `${index * 300}ms` }}
                />
              );
            })}
            
            {/* Gradients */}
            <defs>
              {contentTypes.map((item, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={item.color.includes('purple') ? '#8b5cf6' : 
                                                  item.color.includes('blue') ? '#3b82f6' :
                                                  item.color.includes('green') ? '#10b981' : '#f59e0b'} />
                  <stop offset="100%" stopColor={item.color.includes('purple') ? '#ec4899' : 
                                                   item.color.includes('blue') ? '#06b6d4' :
                                                   item.color.includes('green') ? '#059669' : '#d97706'} />
                </linearGradient>
              ))}
            </defs>
          </svg>
          
          {/* Center statistics */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900">62</div>
              <div className="text-xs text-gray-600 font-medium">Total Posts</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
        {contentTypes.map((item, index) => (
          <div key={item.type} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`} />
              <span className="font-medium text-gray-800">{item.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{item.count} posts</span>
              <span className="font-bold text-gray-900">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-xl font-black text-purple-600">Reels/Videos</div>
          <div className="text-xs text-gray-600 font-medium">Best Performing</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-black text-green-600">+12.8%</div>
          <div className="text-xs text-gray-600 font-medium">Format Growth</div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;