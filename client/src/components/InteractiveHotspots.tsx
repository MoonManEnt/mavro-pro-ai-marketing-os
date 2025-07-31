import React, { useState, useEffect } from 'react';
import { Info, Zap, Target, TrendingUp, Users, BarChart3, Sparkles, X } from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  position: { top: string; left: string };
  color: string;
  page: string;
  feature: string;
}

interface InteractiveHotspotsProps {
  currentView: string;
  currentPersona: string;
  isVisible: boolean;
}

export default function InteractiveHotspots({ currentView, currentPersona, isVisible }: InteractiveHotspotsProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [dismissedHotspots, setDismissedHotspots] = useState<string[]>([]);

  const hotspots: Hotspot[] = [
    // Dashboard hotspots
    {
      id: 'ai-suggestions',
      title: 'AI Content Suggestions',
      description: 'ViVi analyzes your audience and generates personalized content ideas that drive engagement.',
      icon: Sparkles,
      position: { top: '20%', left: '75%' },
      color: 'purple',
      page: 'dashboard',
      feature: 'ai-assistant'
    },
    {
      id: 'performance-metrics',
      title: 'Real-time Performance',
      description: 'Track your marketing performance with live metrics that update automatically.',
      icon: TrendingUp,
      position: { top: '15%', left: '25%' },
      color: 'green',
      page: 'dashboard',
      feature: 'metrics'
    },
    {
      id: 'content-wizard',
      title: 'Content Creation Wizard',
      description: 'Create professional content for all platforms with our intelligent wizard.',
      icon: Zap,
      position: { top: '50%', left: '50%' },
      color: 'blue',
      page: 'dashboard',
      feature: 'content-creation'
    },
    // Campaigns hotspots
    {
      id: 'campaign-optimization',
      title: 'AI Campaign Optimization',
      description: 'Automatically optimize your campaigns for better ROI using machine learning.',
      icon: Target,
      position: { top: '30%', left: '70%' },
      color: 'orange',
      page: 'campaigns',
      feature: 'optimization'
    },
    {
      id: 'multi-platform',
      title: 'Multi-Platform Publishing',
      description: 'Publish to all your social platforms simultaneously with platform-specific optimization.',
      icon: Users,
      position: { top: '40%', left: '20%' },
      color: 'indigo',
      page: 'campaigns',
      feature: 'publishing'
    },
    // Analytics hotspots
    {
      id: 'predictive-analytics',
      title: 'Predictive Analytics',
      description: 'Forecast your marketing performance and identify growth opportunities.',
      icon: BarChart3,
      position: { top: '25%', left: '60%' },
      color: 'pink',
      page: 'foursight',
      feature: 'analytics'
    },
    // GeoSmart hotspots
    {
      id: 'location-intelligence',
      title: 'Location Intelligence',
      description: 'Understand which geographic markets perform best for your business.',
      icon: Target,
      position: { top: '35%', left: '40%' },
      color: 'teal',
      page: 'geosmart',
      feature: 'geo-analytics'
    }
  ];

  const getCurrentHotspots = () => {
    return hotspots.filter(hotspot => 
      hotspot.page === currentView && 
      !dismissedHotspots.includes(hotspot.id)
    );
  };

  const handleHotspotClick = (hotspotId: string) => {
    setActiveHotspot(activeHotspot === hotspotId ? null : hotspotId);
  };

  const handleDismissHotspot = (hotspotId: string) => {
    setDismissedHotspots([...dismissedHotspots, hotspotId]);
    setActiveHotspot(null);
  };

  const handleDismissAll = () => {
    const currentHotspots = getCurrentHotspots();
    setDismissedHotspots([...dismissedHotspots, ...currentHotspots.map(h => h.id)]);
    setActiveHotspot(null);
  };

  // Auto-dismiss hotspots after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismissAll();
    }, 30000);

    return () => clearTimeout(timer);
  }, [currentView]);

  if (!isVisible) return null;

  const currentHotspots = getCurrentHotspots();

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Dismiss All Button */}
      {currentHotspots.length > 0 && (
        <button
          onClick={handleDismissAll}
          className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors pointer-events-auto shadow-lg"
        >
          Hide Tips
        </button>
      )}

      {/* Hotspot Markers */}
      {currentHotspots.map((hotspot) => (
        <div
          key={hotspot.id}
          className="absolute pointer-events-auto"
          style={{ top: hotspot.position.top, left: hotspot.position.left }}
        >
          {/* Pulsing Ring */}
          <div className="absolute inset-0 animate-ping">
            <div className={`w-4 h-4 rounded-full bg-${hotspot.color}-500 opacity-75`}></div>
          </div>
          
          {/* Hotspot Button */}
          <button
            onClick={() => handleHotspotClick(hotspot.id)}
            className={`relative w-4 h-4 rounded-full bg-${hotspot.color}-500 border-2 border-white shadow-lg hover:scale-125 transition-transform duration-200`}
          >
            <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse"></div>
          </button>

          {/* Tooltip */}
          {activeHotspot === hotspot.id && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 w-80 z-50 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full bg-${hotspot.color}-500 flex items-center justify-center`}>
                    <hotspot.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{hotspot.title}</h3>
                </div>
                <button
                  onClick={() => handleDismissHotspot(hotspot.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{hotspot.description}</p>
              
              {/* Arrow pointing to hotspot */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}