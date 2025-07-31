import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const LineChart: React.FC = () => {
  const timelineData = [
    { day: 'Mon', engagements: 320, reach: 1200, impressions: 1800 },
    { day: 'Tue', engagements: 285, reach: 1100, impressions: 1650 },
    { day: 'Wed', engagements: 420, reach: 1450, impressions: 2100 },
    { day: 'Thu', engagements: 380, reach: 1350, impressions: 1950 },
    { day: 'Fri', engagements: 510, reach: 1650, impressions: 2400 },
    { day: 'Sat', engagements: 450, reach: 1500, impressions: 2200 },
    { day: 'Sun', engagements: 380, reach: 1300, impressions: 1900 }
  ];

  const maxValue = Math.max(...timelineData.map(d => d.impressions));
  const chartHeight = 200;

  const createPath = (data: number[], color: string) => {
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / maxValue) * 80; // 80% of chart height
      return `${x},${y}`;
    }).join(' ');
    
    return `M 0,100 L ${points} L 100,100 Z`;
  };

  const engagementPath = createPath(timelineData.map(d => d.engagements), 'purple');
  const reachPath = createPath(timelineData.map(d => d.reach), 'blue');
  const impressionPath = createPath(timelineData.map(d => d.impressions), 'green');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">7-Day Performance Trends</h3>
        <p className="text-gray-600">Daily engagement, reach, and impression metrics</p>
      </div>
      
      {/* Chart Area */}
      <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
        <svg className="w-full h-48" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="0.5"/>
            </pattern>
            
            {/* Gradients for areas */}
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Area fills */}
          <path d={impressionPath} fill="url(#greenGradient)" />
          <path d={reachPath} fill="url(#blueGradient)" />
          <path d={engagementPath} fill="url(#purpleGradient)" />
          
          {/* Lines */}
          {timelineData.map((_, index) => {
            if (index === timelineData.length - 1) return null;
            const x1 = (index / (timelineData.length - 1)) * 100;
            const x2 = ((index + 1) / (timelineData.length - 1)) * 100;
            
            // Impressions line
            const y1_imp = 100 - (timelineData[index].impressions / maxValue) * 80;
            const y2_imp = 100 - (timelineData[index + 1].impressions / maxValue) * 80;
            
            // Reach line  
            const y1_reach = 100 - (timelineData[index].reach / maxValue) * 80;
            const y2_reach = 100 - (timelineData[index + 1].reach / maxValue) * 80;
            
            // Engagements line
            const y1_eng = 100 - (timelineData[index].engagements / maxValue) * 80;
            const y2_eng = 100 - (timelineData[index + 1].engagements / maxValue) * 80;
            
            return (
              <g key={index}>
                <line x1={x1} y1={y1_imp} x2={x2} y2={y2_imp} stroke="#10b981" strokeWidth="0.8" />
                <line x1={x1} y1={y1_reach} x2={x2} y2={y2_reach} stroke="#3b82f6" strokeWidth="0.8" />
                <line x1={x1} y1={y1_eng} x2={x2} y2={y2_eng} stroke="#8b5cf6" strokeWidth="0.8" />
              </g>
            );
          })}
          
          {/* Data points */}
          {timelineData.map((point, index) => {
            const x = (index / (timelineData.length - 1)) * 100;
            const y_imp = 100 - (point.impressions / maxValue) * 80;
            const y_reach = 100 - (point.reach / maxValue) * 80;
            const y_eng = 100 - (point.engagements / maxValue) * 80;
            
            return (
              <g key={index}>
                <circle cx={x} cy={y_imp} r="1" fill="#10b981" />
                <circle cx={x} cy={y_reach} r="1" fill="#3b82f6" />
                <circle cx={x} cy={y_eng} r="1" fill="#8b5cf6" />
              </g>
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-600 font-medium">
          {timelineData.map(point => (
            <span key={point.day}>{point.day}</span>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-sm font-medium text-gray-700">Engagements</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm font-medium text-gray-700">Reach</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-gray-700">Impressions</span>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xl font-black text-green-600">+24%</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Weekly Growth</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-black text-blue-600">1,350</div>
          <div className="text-xs text-gray-600 font-medium">Avg Daily Reach</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <TrendingDown className="w-4 h-4 text-red-600" />
            <span className="text-xl font-black text-red-600">-5%</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">CTR Change</div>
        </div>
      </div>
    </div>
  );
};

export default LineChart;