import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Music, Hash, MapPin } from 'lucide-react';

interface TrendItem {
  type: 'hashtag' | 'audio';
  content: string;
  zipCode: string;
  city: string;
  state: string;
  growth: number;
  isHot: boolean;
}

interface GeoTrendTickerProps {
  selectedRegion?: string | null;
  speed?: 'slow' | 'medium' | 'fast';
}

const GeoTrendTicker: React.FC<GeoTrendTickerProps> = ({
  selectedRegion,
  speed = 'medium'
}) => {
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    loadTrendData();
  }, [selectedRegion]);

  useEffect(() => {
    // Start animation within 8 seconds of component mounting
    const animationTimer = setTimeout(() => {
      setStartAnimation(true);
    }, Math.random() * 5000 + 3000); // Random delay between 3-8 seconds

    return () => clearTimeout(animationTimer);
  }, []);

  const loadTrendData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedRegion) params.append('region', selectedRegion);
      
      const response = await fetch(`/api/vivi-extensions/geo-trends?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTrends(data.trends || []);
        }
      } else {
        loadDemoTrendData();
      }
    } catch (error) {
      console.error('Failed to load trend data:', error);
      loadDemoTrendData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoTrendData = () => {
    const demoTrends: TrendItem[] = [
      {
        type: 'hashtag',
        content: '#luxuryfacial',
        zipCode: '90210',
        city: 'Beverly Hills',
        state: 'CA',
        growth: 340,
        isHot: true
      },
      {
        type: 'audio',
        content: 'SZA - Saturn',
        zipCode: '90210',
        city: 'Beverly Hills',
        state: 'CA',
        growth: 180,
        isHot: false
      },
      {
        type: 'hashtag',
        content: '#nycwellness',
        zipCode: '10001',
        city: 'New York',
        state: 'NY',
        growth: 290,
        isHot: true
      },
      {
        type: 'audio',
        content: 'Taylor Swift - Lavender Haze',
        zipCode: '10001',
        city: 'New York',
        state: 'NY',
        growth: 220,
        isHot: true
      },
      {
        type: 'hashtag',
        content: '#miamibeauty',
        zipCode: '33139',
        city: 'Miami Beach',
        state: 'FL',
        growth: 156,
        isHot: false
      },
      {
        type: 'audio',
        content: 'Bad Bunny - Tití Me Preguntó',
        zipCode: '33139',
        city: 'Miami Beach',
        state: 'FL',
        growth: 198,
        isHot: false
      },
      {
        type: 'hashtag',
        content: '#atxmedspa',
        zipCode: '78704',
        city: 'Austin',
        state: 'TX',
        growth: 125,
        isHot: false
      },
      {
        type: 'audio',
        content: 'Khalid - Skyline',
        zipCode: '78704',
        city: 'Austin',
        state: 'TX',
        growth: 142,
        isHot: false
      },
      {
        type: 'hashtag',
        content: '#chicagoskincare',
        zipCode: '60610',
        city: 'Chicago',
        state: 'IL',
        growth: 167,
        isHot: false
      },
      {
        type: 'audio',
        content: 'Drake - Rich Flex',
        zipCode: '60610',
        city: 'Chicago',
        state: 'IL',
        growth: 134,
        isHot: false
      },
      {
        type: 'hashtag',
        content: '#seattlewellness',
        zipCode: '98101',
        city: 'Seattle',
        state: 'WA',
        growth: 189,
        isHot: false
      },
      {
        type: 'audio',
        content: 'Harry Styles - Music For a Sushi Restaurant',
        zipCode: '98101',
        city: 'Seattle',
        state: 'WA',
        growth: 176,
        isHot: false
      }
    ];
    setTrends(demoTrends);
  };

  const getSpeedDuration = () => {
    switch (speed) {
      case 'slow': return '120s';
      case 'fast': return '60s';
      case 'medium':
      default: return '90s';
    }
  };

  const getIcon = (type: string) => {
    return type === 'hashtag' ? (
      <Hash className="w-3 h-3" />
    ) : (
      <Music className="w-3 h-3" />
    );
  };

  const getTypeColor = (type: string) => {
    return type === 'hashtag' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50';
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-3xl shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">TrendTap™ Live Feed</h3>
              <p className="text-sm text-gray-600 mt-1">Loading real-time trends...</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-bold text-gray-500">Loading...</span>
            </div>
          </div>
          <div className="h-20 bg-white rounded-2xl border-2 border-gray-200 shadow-inner">
            <div className="h-full bg-gray-100 rounded-xl animate-pulse m-4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl shadow-lg overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">TrendTap™ Live Feed</h3>
            <p className="text-xs text-gray-600">Real-time trending hashtags and audio across all regions</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full animate-pulse ${startAnimation ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className={`text-sm font-bold ${startAnimation ? 'text-green-700' : 'text-yellow-700'}`}>
              {startAnimation ? 'LIVE' : 'STARTING...'}
            </span>
            {selectedRegion && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                📍 {selectedRegion}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="relative overflow-hidden h-14 bg-white rounded-xl border border-gray-200 shadow-inner">
          <div 
            className="flex items-center gap-8 absolute whitespace-nowrap px-6"
            style={{
              animation: startAnimation ? `scroll ${getSpeedDuration()} linear infinite` : 'none',
              transform: startAnimation ? 'translateX(100%)' : 'translateX(100%)'
            }}
          >
            {/* Duplicate trends for seamless scrolling */}
            {[...trends, ...trends].map((trend, index) => (
              <div 
                key={`${trend.zipCode}-${trend.content}-${index}`}
                className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`p-1.5 rounded-md ${getTypeColor(trend.type)} shadow-sm`}>
                  {getIcon(trend.type)}
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-bold text-gray-900 text-base">
                    {trend.content}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-800 bg-gray-100 rounded-md px-2 py-1 border border-gray-300">
                    <MapPin className="w-3 h-3 text-gray-600" />
                    <span className="font-semibold">{trend.city}, {trend.state}</span>
                  </div>
                  
                  <div className={`flex items-center gap-1 text-sm font-black ${
                    trend.isHot ? 'text-red-600' : 'text-green-600'
                  }`}>
                    <TrendingUp className="w-4 h-4" />
                    <span>+{trend.growth}%</span>
                  </div>
                  
                  {trend.isHot && (
                    <Badge className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 animate-pulse border-red-300">
                      🔥 HOT
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll ${getSpeedDuration()} linear infinite;
        }
      `}</style>
    </Card>
  );
};

export default GeoTrendTicker;