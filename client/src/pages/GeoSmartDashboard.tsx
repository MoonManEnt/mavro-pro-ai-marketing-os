import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Filter, 
  Calendar, 
  BarChart3, 
  TrendingUp,
  Target,
  Users,
  Zap,
  Globe,
  Settings
} from 'lucide-react';

// Import GeoSmart components
import GeoSmartHeatmap from '@/components/GeoSmart/GeoSmartHeatmap';
import GeoSmartViViNudge from '@/components/GeoSmart/GeoSmartViViNudge';
import GeoSmartPostStatsPanel from '@/components/GeoSmart/GeoSmartPostStatsPanel';
import GeoSmartDrillModal from '@/components/GeoSmart/GeoSmartDrillModal';
import GeoTrendTicker from '@/components/GeoSmart/GeoTrendTicker';

interface RegionSummary {
  topRegions: Array<{
    zipCode: string;
    city: string;
    state: string;
    engagementDelta: number;
    reach: number;
    performance: 'high' | 'moderate' | 'low';
  }>;
  totalReach: number;
  averageEngagement: number;
  activeCampaigns: number;
}

interface Filters {
  platforms: string[];
  campaigns: string[];
  dateRange: string;
  formats: string[];
  boostLevels: number[];
  status: string[];
}

const GeoSmartDashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedZipCode, setSelectedZipCode] = useState<string | null>(null);
  const [drillModalOpen, setDrillModalOpen] = useState(false);
  const [drillRegionData, setDrillRegionData] = useState<any>(null);
  const [regionSummary, setRegionSummary] = useState<RegionSummary | null>(null);
  const [filters, setFilters] = useState<Filters>({
    platforms: ['instagram', 'facebook', 'tiktok'],
    campaigns: [],
    dateRange: '30d',
    formats: [],
    boostLevels: [],
    status: ['live', 'scheduled']
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegionSummary();
  }, [filters]);

  const loadRegionSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/vivi-extensions/geo-summary');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRegionSummary(data.summary);
        }
      } else {
        loadDemoRegionSummary();
      }
    } catch (error) {
      console.error('Failed to load region summary:', error);
      loadDemoRegionSummary();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoRegionSummary = () => {
    const demoSummary: RegionSummary = {
      topRegions: [
        {
          zipCode: '10001',
          city: 'New York',
          state: 'NY',
          engagementDelta: 45.2,
          reach: 5420,
          performance: 'high'
        },
        {
          zipCode: '90210',
          city: 'Beverly Hills',
          state: 'CA',
          engagementDelta: 36.8,
          reach: 3250,
          performance: 'high'
        },
        {
          zipCode: '33139',
          city: 'Miami Beach',
          state: 'FL',
          engagementDelta: 28.3,
          reach: 2840,
          performance: 'moderate'
        }
      ],
      totalReach: 23850,
      averageEngagement: 4.67,
      activeCampaigns: 8
    };
    setRegionSummary(demoSummary);
  };

  const handleRegionClick = (zipCode: string, regionData: any) => {
    setSelectedZipCode(zipCode);
    setDrillRegionData(regionData);
    setDrillModalOpen(true);
  };

  const handleRegionHover = (zipCode: string | null, regionData: any) => {
    setSelectedRegion(zipCode);
  };

  const handleViViActionAccept = async (nudgeId: string, action: string) => {
    console.log('Accepting ViVi action:', nudgeId, action);
    // Implementation for accepting ViVi recommendations
  };

  const handleViViActionDismiss = async (nudgeId: string) => {
    console.log('Dismissing ViVi action:', nudgeId);
    // Implementation for dismissing ViVi recommendations
  };

  const handleViViActionSchedule = async (nudgeId: string, action: string) => {
    console.log('Scheduling ViVi action:', nudgeId, action);
    // Implementation for scheduling ViVi recommendations
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case 'high': return <TrendingUp className="w-4 h-4" />;
      case 'moderate': return <BarChart3 className="w-4 h-4" />;
      case 'low': return <Target className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Executive Command Header */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    GeoSmart Intelligence
                  </h1>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed max-w-2xl">
                    AI-powered growth radar for location-based marketing optimization
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="text-xs">
                  <Filter className="w-4 h-4 mr-1" />
                  Filters
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Calendar className="w-4 h-4 mr-1" />
                  Last 30 Days
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        {regionSummary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-blue-900">
                  {regionSummary.totalReach.toLocaleString()}
                </div>
                <div className="text-xs text-blue-700 font-medium">Total Reach</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-green-900">
                  {regionSummary.averageEngagement.toFixed(1)}%
                </div>
                <div className="text-xs text-green-700 font-medium">Avg Engagement</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-purple-900">
                  {regionSummary.activeCampaigns}
                </div>
                <div className="text-xs text-purple-700 font-medium">Active Campaigns</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-orange-900">
                  {regionSummary.topRegions.length}
                </div>
                <div className="text-xs text-orange-700 font-medium">Top Regions</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TrendTap Live Feed */}
        <GeoTrendTicker selectedRegion={selectedRegion} speed="medium" />

        {/* Enhanced Main Dashboard Layout */}
        <div className="space-y-8">
          {/* Primary Focus: Enhanced Heatmap - Full Width */}
          <div className="w-full">
            <GeoSmartHeatmap
              selectedFilters={filters}
              onRegionClick={handleRegionClick}
              onRegionHover={handleRegionHover}
            />
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Left Panel - Top Performing Regions */}
            <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-3xl shadow-2xl">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Top Performing Regions</h3>
                    <p className="text-sm text-gray-600">Geographic performance leaders</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse bg-slate-100 rounded-2xl p-4">
                        <div className="h-6 bg-slate-200 rounded-xl w-3/4 mb-3"></div>
                        <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : regionSummary ? (
                  <div className="space-y-4">
                    {regionSummary.topRegions.map((region, index) => (
                      <div
                        key={region.zipCode}
                        className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200 rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-purple-300"
                        onClick={() => handleRegionClick(region.zipCode, region)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-lg ${
                              index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                              index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' : 
                              'bg-gradient-to-r from-orange-500 to-orange-700'
                            }`}>
                              #{index + 1}
                            </div>
                            <span className="font-black text-gray-900 text-lg">
                              {region.city}, {region.state}
                            </span>
                          </div>
                          <div className={`p-2 rounded-xl ${getPerformanceColor(region.performance)} shadow-sm`}>
                            {getPerformanceIcon(region.performance)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-slate-200">
                            <div className="text-sm text-gray-600 font-medium">Engagement Δ</div>
                            <div className="text-xl font-black text-green-600">
                              +{region.engagementDelta.toFixed(1)}%
                            </div>
                          </div>
                          <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-slate-200">
                            <div className="text-sm text-gray-600 font-medium">Reach</div>
                            <div className="text-xl font-black text-gray-900">{region.reach.toLocaleString()}</div>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-sm text-gray-600 bg-white/50 rounded-lg px-3 py-2">
                          <span className="font-medium">ZIP Code:</span> {region.zipCode}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">No regional data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Right Panel - ViVi Intelligence */}
            <div className="space-y-6">
              <GeoSmartViViNudge
                selectedRegion={selectedRegion}
                onActionAccept={handleViViActionAccept}
                onActionDismiss={handleViViActionDismiss}
                onActionSchedule={handleViViActionSchedule}
              />
            </div>
          </div>
        </div>

        {/* Bottom Panel - Post Performance Stats */}
        <GeoSmartPostStatsPanel
          selectedRegion={selectedRegion}
          selectedFilters={filters}
          onFilterChange={setFilters}
        />

        {/* Drill Down Modal */}
        <GeoSmartDrillModal
          isOpen={drillModalOpen}
          onClose={() => setDrillModalOpen(false)}
          zipCode={selectedZipCode}
          regionData={drillRegionData}
        />
      </div>
    </div>
  );
};

export default GeoSmartDashboard;