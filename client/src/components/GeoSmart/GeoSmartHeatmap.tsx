import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Users, Target, Plus, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HeatmapData {
  zipCode: string;
  city: string;
  state: string;
  reach: number;
  engagement: number;
  engagementRate: number;
  trendingTag: string;
  trendingAudio: string;
  lat: number;
  lng: number;
  intensity: 'high' | 'moderate' | 'low';
}

interface GeoSmartHeatmapProps {
  selectedFilters: {
    platforms: string[];
    campaigns: string[];
    dateRange: string;
  };
  onRegionClick: (zipCode: string, data: HeatmapData) => void;
  onRegionHover: (zipCode: string | null, data: HeatmapData | null) => void;
}

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const GeoSmartHeatmap: React.FC<GeoSmartHeatmapProps> = ({
  selectedFilters,
  onRegionClick,
  onRegionHover
}) => {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [hoveredRegion, setHoveredRegion] = useState<HeatmapData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [viewBox, setViewBox] = useState<ViewBox>({ x: 0, y: 0, width: 1000, height: 600 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadHeatmapData();
  }, [selectedFilters]);

  const loadHeatmapData = async () => {
    try {
      const response = await fetch('/api/vivi-extensions/geo-insights');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const formattedData = Object.entries(data.geoData || {}).map(([zip, info]: [string, any]) => ({
            zipCode: zip,
            city: info.city,
            state: info.state,
            reach: info.reach,
            engagement: info.engagement,
            engagementRate: info.engagement / info.reach * 100,
            trendingTag: info.topTrendingTag,
            trendingAudio: info.topTrendingAudio,
            lat: getLatFromZip(zip),
            lng: getLngFromZip(zip),
            intensity: getIntensityLevel(info.engagement / info.reach)
          }));
          setHeatmapData(formattedData);
        }
      }
    } catch (error) {
      console.error('Failed to load heatmap data:', error);
      // Load demo data
      loadDemoHeatmapData();
    }
  };

  const loadDemoHeatmapData = () => {
    const demoData: HeatmapData[] = [
      {
        zipCode: '90210',
        city: 'Beverly Hills',
        state: 'CA',
        reach: 3250,
        engagement: 140,
        engagementRate: 4.31,
        trendingTag: '#luxuryfacial',
        trendingAudio: 'SZA - Saturn',
        lat: 34.0901,
        lng: -118.4065,
        intensity: 'high'
      },
      {
        zipCode: '10001',
        city: 'New York',
        state: 'NY',
        reach: 5420,
        engagement: 285,
        engagementRate: 5.26,
        trendingTag: '#nycwellness',
        trendingAudio: 'Taylor Swift - Lavender Haze',
        lat: 40.7505,
        lng: -73.9934,
        intensity: 'high'
      },
      {
        zipCode: '33139',
        city: 'Miami Beach',
        state: 'FL',
        reach: 2840,
        engagement: 165,
        engagementRate: 5.81,
        trendingTag: '#miamibeauty',
        trendingAudio: 'Bad Bunny - Tití Me Preguntó',
        lat: 25.7907,
        lng: -80.1300,
        intensity: 'high'
      },
      {
        zipCode: '78704',
        city: 'Austin',
        state: 'TX',
        reach: 1980,
        engagement: 75,
        engagementRate: 3.79,
        trendingTag: '#atxmedspa',
        trendingAudio: 'Khalid - Skyline',
        lat: 30.2308,
        lng: -97.7596,
        intensity: 'moderate'
      },
      {
        zipCode: '60610',
        city: 'Chicago',
        state: 'IL',
        reach: 2150,
        engagement: 98,
        engagementRate: 4.56,
        trendingTag: '#chicagoskincare',
        trendingAudio: 'Drake - Rich Flex',
        lat: 41.8986,
        lng: -87.6252,
        intensity: 'moderate'
      },
      {
        zipCode: '98101',
        city: 'Seattle',
        state: 'WA',
        reach: 1920,
        engagement: 92,
        engagementRate: 4.79,
        trendingTag: '#seattlewellness',
        trendingAudio: 'Harry Styles - Music For a Sushi Restaurant',
        lat: 47.6061,
        lng: -122.3328,
        intensity: 'moderate'
      }
    ];
    setHeatmapData(demoData);
  };

  const getLatFromZip = (zip: string): number => {
    const zipCoords: Record<string, number> = {
      '90210': 34.0901, '10001': 40.7505, '33139': 25.7907,
      '78704': 30.2308, '60610': 41.8986, '98101': 47.6061,
      '30309': 33.7756, '85001': 33.4484
    };
    return zipCoords[zip] || 39.8283;
  };

  const getLngFromZip = (zip: string): number => {
    const zipCoords: Record<string, number> = {
      '90210': -118.4065, '10001': -73.9934, '33139': -80.1300,
      '78704': -97.7596, '60610': -87.6252, '98101': -122.3328,
      '30309': -84.3963, '85001': -112.0740
    };
    return zipCoords[zip] || -98.5795;
  };

  const getIntensityLevel = (engagementRate: number): 'high' | 'moderate' | 'low' => {
    if (engagementRate > 0.05) return 'high';
    if (engagementRate > 0.03) return 'moderate';
    return 'low';
  };

  const getIntensityColor = (intensity: string): string => {
    switch (intensity) {
      case 'high': return 'bg-red-500';
      case 'moderate': return 'bg-orange-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleRegionHover = (region: HeatmapData, event: React.MouseEvent) => {
    setHoveredRegion(region);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    onRegionHover(region.zipCode, region);
  };

  const handleRegionLeave = () => {
    setHoveredRegion(null);
    onRegionHover(null, null);
  };

  const handleRegionClick = (region: HeatmapData) => {
    onRegionClick(region.zipCode, region);
  };

  // Zoom and Pan Controls
  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel * 1.5, 5);
    setZoomLevel(newZoom);
    setViewBox(prev => ({
      ...prev,
      width: 1000 / newZoom,
      height: 600 / newZoom
    }));
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel / 1.5, 0.5);
    setZoomLevel(newZoom);
    setViewBox(prev => ({
      ...prev,
      width: 1000 / newZoom,
      height: 600 / newZoom
    }));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
    setViewBox({ x: 0, y: 0, width: 1000, height: 600 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = (e.clientX - dragStart.x) / zoomLevel;
    const deltaY = (e.clientY - dragStart.y) / zoomLevel;
    
    setViewBox(prev => ({
      ...prev,
      x: Math.max(0, Math.min(1000 - prev.width, prev.x - deltaX)),
      y: Math.max(0, Math.min(600 - prev.height, prev.y - deltaY))
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // State Heat Mapping Functions
  const getStateHeatColor = (state: string): string => {
    const statePerformance: Record<string, 'high' | 'moderate' | 'low'> = {
      'CA': 'high',     // High performance in California
      'TX': 'moderate', // Moderate in Texas  
      'FL': 'high',     // High in Florida
      'NY': 'moderate', // Moderate in New York
      'IL': 'low',      // Low in Illinois
      'NV': 'moderate', // Moderate in Nevada
      'AZ': 'moderate', // Moderate in Arizona
      'CO': 'moderate', // Moderate in Colorado
      'WA': 'high',     // High in Washington
      'OR': 'moderate', // Moderate in Oregon
      'GA': 'moderate', // Moderate in Georgia
      'NC': 'moderate', // Moderate in North Carolina
    };
    
    const performance = statePerformance[state] || 'low';
    switch (performance) {
      case 'high': return '#ef4444';     // Red for high performance
      case 'moderate': return '#f97316'; // Orange for moderate
      case 'low': return '#3b82f6';      // Blue for low/emerging
      default: return '#94a3b8';         // Gray for no data
    }
  };

  const handleStateHover = (state: string, event: React.MouseEvent) => {
    // Create mock state data for hover
    const stateData = {
      zipCode: state,
      city: getStateName(state),
      state: state,
      reach: getStateReach(state),
      engagement: getStateEngagement(state),
      engagementRate: getStateEngagementRate(state),
      trendingTag: getStateTrending(state),
      trendingAudio: 'Regional trending audio',
      lat: 0,
      lng: 0,
      intensity: getStateIntensity(state)
    };
    setHoveredRegion(stateData);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    onRegionHover(state, stateData);
  };

  const handleStateLeave = () => {
    setHoveredRegion(null);
    onRegionHover(null, null);
  };

  const handleStateClick = (state: string) => {
    const stateData = {
      zipCode: state,
      city: getStateName(state),
      state: state,
      reach: getStateReach(state),
      engagement: getStateEngagement(state),
      engagementRate: getStateEngagementRate(state),
      trendingTag: getStateTrending(state),
      trendingAudio: 'Regional trending audio',
      lat: 0,
      lng: 0,
      intensity: getStateIntensity(state)
    };
    onRegionClick(state, stateData);
  };

  // Helper functions for state data
  const getStateName = (state: string): string => {
    const names: Record<string, string> = {
      'CA': 'California', 'TX': 'Texas', 'FL': 'Florida', 
      'NY': 'New York', 'IL': 'Illinois', 'NV': 'Nevada',
      'AZ': 'Arizona', 'CO': 'Colorado', 'WA': 'Washington',
      'OR': 'Oregon', 'GA': 'Georgia', 'NC': 'North Carolina'
    };
    return names[state] || state;
  };

  const getStateReach = (state: string): number => {
    const reach: Record<string, number> = {
      'CA': 485000, 'TX': 325000, 'FL': 275000, 
      'NY': 420000, 'IL': 180000, 'NV': 95000,
      'AZ': 145000, 'CO': 165000, 'WA': 205000,
      'OR': 125000, 'GA': 185000, 'NC': 155000
    };
    return reach[state] || 50000;
  };

  const getStateEngagement = (state: string): number => {
    const engagement: Record<string, number> = {
      'CA': 24500, 'TX': 16250, 'FL': 19250, 
      'NY': 17640, 'IL': 8100, 'NV': 4750,
      'AZ': 7250, 'CO': 8250, 'WA': 10250,
      'OR': 6250, 'GA': 9250, 'NC': 7750
    };
    return engagement[state] || 2500;
  };

  const getStateEngagementRate = (state: string): number => {
    const rates: Record<string, number> = {
      'CA': 5.05, 'TX': 5.0, 'FL': 7.0, 
      'NY': 4.2, 'IL': 4.5, 'NV': 5.0,
      'AZ': 5.0, 'CO': 5.0, 'WA': 5.0,
      'OR': 5.0, 'GA': 5.0, 'NC': 5.0
    };
    return rates[state] || 2.5;
  };

  const getStateTrending = (state: string): string => {
    const trending: Record<string, string> = {
      'CA': '#californiagrowth', 'TX': '#texasbusiness', 'FL': '#floridaviral', 
      'NY': '#nycmarketing', 'IL': '#chicagobrands', 'NV': '#vegaslife',
      'AZ': '#desertsun', 'CO': '#mountainhigh', 'WA': '#pacificnw',
      'OR': '#keepitweird', 'GA': '#southerncharm', 'NC': '#carolinas'
    };
    return trending[state] || '#regional';
  };

  const getStateIntensity = (state: string): 'high' | 'moderate' | 'low' => {
    const intensity: Record<string, 'high' | 'moderate' | 'low'> = {
      'CA': 'high', 'TX': 'moderate', 'FL': 'high', 
      'NY': 'moderate', 'IL': 'low', 'NV': 'moderate',
      'AZ': 'moderate', 'CO': 'moderate', 'WA': 'high',
      'OR': 'moderate', 'GA': 'moderate', 'NC': 'moderate'
    };
    return intensity[state] || 'low';
  };

  return (
    <div className="relative">
      {/* Enhanced Interactive US Map Visualization */}
      <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        <CardContent className="p-8">
          {/* Enhanced header section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">GeoSmart Intelligence Map</h3>
                <p className="text-sm text-gray-600">{heatmapData.length} active regions • Live performance data</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-200">
                <span className="text-gray-600">Total Reach: </span>
                <span className="font-bold text-gray-900">
                  {heatmapData.reduce((sum, r) => sum + r.reach, 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-200">
                <span className="text-gray-600">Avg. Rate: </span>
                <span className="font-bold text-green-600">
                  {(heatmapData.reduce((sum, r) => sum + r.engagementRate, 0) / heatmapData.length).toFixed(1)}%
                </span>
              </div>
              
              {/* Interactive Map Controls */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleZoomIn}
                  className="bg-white/90 hover:bg-white border-slate-300"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleZoomOut}
                  className="bg-white/90 hover:bg-white border-slate-300"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleZoomReset}
                  className="bg-white/90 hover:bg-white border-slate-300 text-xs"
                >
                  Reset
                </Button>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-slate-200">
                <span className="text-gray-600 text-xs">Zoom: </span>
                <span className="font-bold text-gray-900 text-xs">
                  {(zoomLevel * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-100 via-slate-100 to-purple-100 rounded-2xl border-2 border-slate-200 overflow-hidden shadow-inner">
            {/* Interactive SVG Map Container */}
            <div 
              className="absolute inset-0 cursor-grab"
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <svg
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                className="w-full h-full"
                style={{ 
                  filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.1))',
                  transition: isDragging ? 'none' : 'viewBox 0.3s ease'
                }}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Realistic US Map Background */}
                <defs>
                  <pattern id="mapGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                  <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>

                {/* Map Grid Background */}
                <rect x="0" y="0" width="1000" height="600" fill="url(#mapGrid)" opacity="0.2"/>

                {/* Realistic US State Map with Heat Mapping */}
                
                {/* California */}
                <path d="M 50 200 L 120 190 L 130 250 L 140 300 L 150 350 L 160 400 L 170 450 L 180 500 L 160 520 L 140 540 L 120 550 L 100 560 L 80 550 L 60 540 L 40 520 L 30 500 L 20 480 L 10 460 L 15 440 L 20 420 L 25 400 L 30 380 L 35 360 L 40 340 L 45 320 L 50 300 L 55 280 L 50 260 L 45 240 L 50 220 Z" 
                      fill={getStateHeatColor('CA')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('CA', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('CA')}
                />

                {/* Texas */}
                <path d="M 320 350 L 480 340 L 520 360 L 540 380 L 560 400 L 580 420 L 600 440 L 620 460 L 640 480 L 660 500 L 680 520 L 640 540 L 600 550 L 560 560 L 520 550 L 480 540 L 440 530 L 400 520 L 360 510 L 330 500 L 310 480 L 300 460 L 290 440 L 280 420 L 270 400 L 280 380 L 300 360 L 320 350 Z" 
                      fill={getStateHeatColor('TX')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('TX', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('TX')}
                />

                {/* Florida */}
                <path d="M 700 450 L 800 440 L 850 450 L 900 460 L 930 470 L 950 480 L 960 500 L 950 520 L 940 540 L 920 550 L 900 560 L 880 570 L 860 580 L 840 570 L 820 560 L 800 550 L 780 540 L 760 530 L 740 520 L 720 510 L 710 490 L 705 470 L 700 450 Z" 
                      fill={getStateHeatColor('FL')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('FL', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('FL')}
                />

                {/* New York */}
                <path d="M 750 180 L 850 170 L 870 180 L 880 190 L 890 200 L 900 210 L 910 220 L 920 230 L 900 240 L 880 250 L 860 260 L 840 270 L 820 280 L 800 290 L 780 300 L 760 310 L 750 320 L 740 310 L 730 300 L 720 290 L 710 280 L 700 270 L 690 260 L 680 250 L 670 240 L 660 230 L 650 220 L 640 210 L 630 200 L 640 190 L 650 180 L 660 170 L 680 165 L 700 170 L 720 175 L 750 180 Z" 
                      fill={getStateHeatColor('NY')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('NY', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('NY')}
                />

                {/* Illinois */}
                <path d="M 580 220 L 640 210 L 650 250 L 660 290 L 670 330 L 680 370 L 690 410 L 680 420 L 670 430 L 660 440 L 650 450 L 640 460 L 630 470 L 620 480 L 610 490 L 600 500 L 590 490 L 580 480 L 570 470 L 560 460 L 550 450 L 540 440 L 530 430 L 520 420 L 510 410 L 500 400 L 490 390 L 480 380 L 470 370 L 460 360 L 450 350 L 440 340 L 430 330 L 420 320 L 410 310 L 400 300 L 390 290 L 380 280 L 370 270 L 360 260 L 350 250 L 340 240 L 330 230 L 540 220 L 560 220 L 580 220 Z" 
                      fill={getStateHeatColor('IL')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('IL', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('IL')}
                />

                {/* Nevada */}
                <path d="M 140 220 L 200 210 L 210 270 L 220 330 L 230 390 L 240 450 L 180 460 L 170 400 L 160 340 L 150 280 L 140 220 Z"
                      fill={getStateHeatColor('NV')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('NV', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('NV')}
                />

                {/* Arizona */}
                <path d="M 240 350 L 320 340 L 330 400 L 340 460 L 280 470 L 240 460 L 230 410 L 240 350 Z"
                      fill={getStateHeatColor('AZ')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('AZ', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('AZ')}
                />

                {/* Colorado */}
                <path d="M 320 280 L 480 270 L 490 330 L 500 390 L 330 400 L 320 340 L 320 280 Z"
                      fill={getStateHeatColor('CO')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('CO', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('CO')}
                />

                {/* Washington */}
                <path d="M 50 120 L 200 110 L 210 170 L 60 180 L 50 120 Z"
                      fill={getStateHeatColor('WA')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('WA', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('WA')}
                />

                {/* Oregon */}
                <path d="M 50 180 L 200 170 L 210 230 L 60 240 L 50 180 Z"
                      fill={getStateHeatColor('OR')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('OR', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('OR')}
                />

                {/* Georgia */}
                <path d="M 680 380 L 760 370 L 770 430 L 780 490 L 720 500 L 680 490 L 670 440 L 680 380 Z"
                      fill={getStateHeatColor('GA')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('GA', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('GA')}
                />

                {/* North Carolina */}
                <path d="M 700 330 L 850 320 L 860 380 L 870 440 L 760 450 L 700 440 L 690 380 L 700 330 Z"
                      fill={getStateHeatColor('NC')} 
                      stroke="#fff" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => handleStateHover('NC', e)}
                      onMouseLeave={handleStateLeave}
                      onClick={() => handleStateClick('NC')}
                />

                {/* Heat Map Legend */}
                <g transform="translate(850, 50)">
                  <rect x="0" y="0" width="140" height="120" fill="rgba(255, 255, 255, 0.95)" stroke="#e2e8f0" strokeWidth="1" rx="8"/>
                  <text x="70" y="20" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1e293b">Performance Heat Map</text>
                  
                  {/* High Performance */}
                  <rect x="10" y="30" width="16" height="16" fill="#ef4444" rx="2"/>
                  <text x="30" y="42" fontSize="12" fill="#475569">High Performance</text>
                  
                  {/* Moderate Performance */}
                  <rect x="10" y="50" width="16" height="16" fill="#f97316" rx="2"/>
                  <text x="30" y="62" fontSize="12" fill="#475569">Moderate Performance</text>
                  
                  {/* Low/Emerging */}
                  <rect x="10" y="70" width="16" height="16" fill="#3b82f6" rx="2"/>
                  <text x="30" y="82" fontSize="12" fill="#475569">Low/Emerging</text>
                  
                  {/* No Data */}
                  <rect x="10" y="90" width="16" height="16" fill="#94a3b8" rx="2"/>
                  <text x="30" y="102" fontSize="12" fill="#475569">No Data</text>
                </g>

                {/* Data point markers overlay for additional detail */}
                {heatmapData.slice(0, 15).map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="rgba(255, 255, 255, 0.9)"
                      stroke={getIntensityColor(point.intensity)}
                      strokeWidth="2"
                      className="cursor-pointer hover:scale-110 transition-transform"
                      onMouseEnter={(e) => {
                        setHoveredRegion(point);
                        setTooltipPosition({ x: e.clientX, y: e.clientY });
                        onRegionHover(point.zipCode, point);
                      }}
                      onMouseLeave={() => {
                        setHoveredRegion(null);
                        onRegionHover(null, null);
                      }}
                      onClick={() => onRegionClick(point.zipCode, point)}
                    />
                    
                    {/* Small label for major cities */}
                    {point.reach > 200000 && (
                      <text
                        x={point.x}
                        y={point.y - 8}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="500"
                        fill="#1e293b"
                        className="pointer-events-none"
                      >
                        {point.city}
                      </text>
                    )}
                  </g>
                ))}

                {/* Interactive heatmap markers with enhanced styling */}
              {heatmapData.map((region) => {
                // Enhanced coordinate mapping for better positioning
                const x = ((region.lng + 125) / 58) * 1000;
                const y = ((50 - region.lat) / 25) * 600;
                const safeX = Math.max(50, Math.min(950, x));
                const safeY = Math.max(50, Math.min(550, y));
                
                return (
                  <g key={region.zipCode}>
                    {/* Outer glow effect */}
                    <circle
                      cx={safeX}
                      cy={safeY}
                      r="40"
                      className={`${getIntensityColor(region.intensity)} opacity-10 animate-pulse`}
                      style={{
                        filter: 'blur(15px)',
                        transform: hoveredRegion?.zipCode === region.zipCode ? 'scale(1.5)' : 'scale(1)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    
                    {/* Medium glow */}
                    <circle
                      cx={safeX}
                      cy={safeY}
                      r="25"
                      className={`${getIntensityColor(region.intensity)} opacity-20`}
                      style={{
                        filter: 'blur(8px)',
                        transform: hoveredRegion?.zipCode === region.zipCode ? 'scale(1.3)' : 'scale(1)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    
                    {/* Main marker with enhanced styling */}
                    <circle
                      cx={safeX}
                      cy={safeY}
                      r="12"
                      className={`cursor-pointer transition-all duration-300 hover:drop-shadow-lg`}
                      fill={region.intensity === 'high' ? 'url(#redGradient)' : 
                            region.intensity === 'moderate' ? 'url(#orangeGradient)' : 'url(#blueGradient)'}
                      stroke="white"
                      strokeWidth="3"
                      onMouseEnter={(e) => handleRegionHover(region, e as any)}
                      onMouseLeave={handleRegionLeave}
                      onClick={() => handleRegionClick(region)}
                      style={{
                        transform: hoveredRegion?.zipCode === region.zipCode ? 'scale(1.4)' : 'scale(1)',
                        transformOrigin: 'center'
                      }}
                    />
                    
                    {/* Inner highlight */}
                    <circle
                      cx={safeX}
                      cy={safeY}
                      r="6"
                      fill="rgba(255, 255, 255, 0.6)"
                      className="pointer-events-none"
                      style={{
                        transform: hoveredRegion?.zipCode === region.zipCode ? 'scale(1.4)' : 'scale(1)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    
                    {/* City label with enhanced styling */}
                    <text
                      x={safeX}
                      y={safeY + 35}
                      textAnchor="middle"
                      className="text-sm font-bold fill-gray-800 pointer-events-none drop-shadow-sm"
                      style={{
                        opacity: hoveredRegion?.zipCode === region.zipCode ? 1 : 0.8,
                        fontSize: hoveredRegion?.zipCode === region.zipCode ? '14px' : '12px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {region.city}
                    </text>
                    
                    {/* Engagement rate badge */}
                    <g
                      style={{
                        opacity: hoveredRegion?.zipCode === region.zipCode ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      <rect
                        x={safeX - 20}
                        y={safeY - 40}
                        width="40"
                        height="20"
                        rx="10"
                        fill="rgba(255, 255, 255, 0.95)"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                      <text
                        x={safeX}
                        y={safeY - 27}
                        textAnchor="middle"
                        className="text-xs font-bold fill-gray-800"
                      >
                        {region.engagementRate.toFixed(1)}%
                      </text>
                    </g>
                  </g>
                );
              })}
              </svg>
            </div>

            {/* Enhanced legend with better styling */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-slate-200 shadow-xl p-6">
              <h5 className="text-sm font-black text-gray-900 mb-4 tracking-tight">Engagement Intensity</h5>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg border-2 border-white"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-800">High Performance</span>
                    <p className="text-xs text-gray-600">5%+ engagement rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-lg border-2 border-white"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-800">Moderate Growth</span>
                    <p className="text-xs text-gray-600">3-5% engagement rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg border-2 border-white"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-800">Emerging Market</span>
                    <p className="text-xs text-gray-600">Under 3% engagement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance summary overlay */}
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-slate-200 shadow-xl p-6">
              <h5 className="text-sm font-black text-gray-900 mb-4 tracking-tight">Regional Summary</h5>
              <div className="grid grid-cols-1 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-black text-red-600">
                    {heatmapData.filter(r => r.intensity === 'high').length}
                  </p>
                  <p className="text-xs text-gray-600">High Performance</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-orange-600">
                    {heatmapData.filter(r => r.intensity === 'moderate').length}
                  </p>
                  <p className="text-xs text-gray-600">Growing Markets</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-blue-600">
                    {heatmapData.filter(r => r.intensity === 'low').length}
                  </p>
                  <p className="text-xs text-gray-600">Emerging Areas</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced hover tooltip */}
      {hoveredRegion && (
        <div
          className="fixed z-50 bg-white/95 backdrop-blur-sm border-2 border-slate-200 rounded-2xl shadow-2xl p-6 pointer-events-none max-w-sm"
          style={{
            left: tooltipPosition.x + 15,
            top: tooltipPosition.y - 15,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-xl ${
              hoveredRegion.intensity === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600' :
              hoveredRegion.intensity === 'moderate' ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 
              'bg-gradient-to-r from-blue-400 to-blue-600'
            } flex items-center justify-center shadow-lg`}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-black text-gray-900">{hoveredRegion.city}, {hoveredRegion.state}</h4>
              <p className="text-sm text-gray-600">ZIP: {hoveredRegion.zipCode}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-700">Total Reach</span>
              </div>
              <p className="text-lg font-black text-purple-900">{hoveredRegion.reach.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">Engagement</span>
              </div>
              <p className="text-lg font-black text-green-900">{hoveredRegion.engagementRate.toFixed(1)}%</p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <h5 className="text-sm font-black text-gray-900 mb-2 tracking-tight">Trending Content</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-blue-600 font-medium">{hoveredRegion.trendingTag}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-xs text-gray-600">{hoveredRegion.trendingAudio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoSmartHeatmap;