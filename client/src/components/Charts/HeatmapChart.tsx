import React from 'react';

const HeatmapChart: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
  
  // Sample engagement data (0-100 scale)
  const heatmapData = [
    [20, 35, 45, 60, 85, 70], // Monday
    [25, 40, 50, 65, 80, 75], // Tuesday  
    [30, 45, 55, 70, 90, 80], // Wednesday
    [35, 50, 60, 75, 95, 85], // Thursday
    [40, 55, 65, 80, 85, 75], // Friday
    [60, 70, 75, 85, 90, 80], // Saturday
    [55, 65, 70, 80, 85, 75]  // Sunday
  ];

  const getIntensityColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500'; 
    if (value >= 40) return 'bg-orange-500';
    if (value >= 20) return 'bg-red-400';
    return 'bg-gray-300';
  };

  const getIntensityOpacity = (value: number) => {
    return Math.max(0.2, value / 100);
  };

  const maxEngagement = Math.max(...heatmapData.flat());
  const bestTime = (() => {
    let maxVal = 0;
    let bestDay = '';
    let bestHour = '';
    
    heatmapData.forEach((dayData, dayIndex) => {
      dayData.forEach((value, hourIndex) => {
        if (value > maxVal) {
          maxVal = value;
          bestDay = days[dayIndex];
          bestHour = hours[hourIndex];
        }
      });
    });
    
    return { day: bestDay, hour: bestHour, value: maxVal };
  })();

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">Engagement intensity by day and time</p>
      </div>
      
      {/* Heatmap Grid */}
      <div className="space-y-1">
        {/* Header row with hours */}
        <div className="grid grid-cols-7 gap-1">
          <div className="text-xs text-gray-600 font-medium p-2"></div>
          {hours.map(hour => (
            <div key={hour} className="text-xs text-gray-600 font-medium text-center p-1">
              {hour}
            </div>
          ))}
        </div>
        
        {/* Data rows */}
        {days.map((day, dayIndex) => (
          <div key={day} className="grid grid-cols-7 gap-1">
            <div className="text-xs text-gray-600 font-medium p-2 text-right">
              {day}
            </div>
            {heatmapData[dayIndex].map((value, hourIndex) => (
              <div
                key={`${day}-${hourIndex}`}
                className={`relative h-8 rounded-lg ${getIntensityColor(value)} transition-all duration-300 hover:scale-110 cursor-pointer`}
                style={{ opacity: getIntensityOpacity(value) }}
                title={`${day} ${hours[hourIndex]}: ${value}% engagement`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white drop-shadow">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600 font-medium">Low</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded bg-gray-300" />
            <div className="w-3 h-3 rounded bg-red-400" />
            <div className="w-3 h-3 rounded bg-orange-500" />
            <div className="w-3 h-3 rounded bg-yellow-500" />
            <div className="w-3 h-3 rounded bg-green-500" />
          </div>
          <span className="text-xs text-gray-600 font-medium">High</span>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">
            Peak: {bestTime.day} {bestTime.hour}
          </div>
          <div className="text-xs text-gray-600">{bestTime.value}% engagement</div>
        </div>
      </div>
      
      {/* Summary insights */}
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
        <div className="text-center">
          <div className="text-lg font-black text-purple-600">Thu-Fri</div>
          <div className="text-xs text-gray-600 font-medium">Best Days</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black text-blue-600">6-9PM</div>
          <div className="text-xs text-gray-600 font-medium">Peak Hours</div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;