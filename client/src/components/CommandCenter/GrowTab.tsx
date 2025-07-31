import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Target, Zap, Award, MapPin, Sparkles, AlertTriangle, CheckCircle, 
         Clock, DollarSign, Eye, MousePointer, Calendar, Rocket, Copy, Download, BarChart3 } from 'lucide-react';

// KPI Data Structure
interface KPIData {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
  current: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  ribbon?: string;
  description: string;
  lastUpdated: string;
}

interface StrategyLog {
  id: string;
  timestamp: string;
  summary: string;
  kpiSnapshot: Record<string, any>;
  success: boolean;
}

const GrowTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('kpi-grid');
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [hoveredKPI, setHoveredKPI] = useState<KPIData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showViViStrategy, setShowViViStrategy] = useState(false);
  const [strategyLogs, setStrategyLogs] = useState<StrategyLog[]>([]);
  const [deployingStrategy, setDeployingStrategy] = useState(false);
  const pollInterval = useRef<NodeJS.Timeout | null>(null);

  // Initialize KPI Data
  const initializeKPIData = (): KPIData[] => [
    {
      id: 'post-engagement',
      title: 'Post Engagement',
      value: '7.8%',
      change: 12.5,
      trend: 'up',
      target: 85,
      current: 78,
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      ribbon: '🔥 Top Growth',
      description: 'Average engagement rate across all social platforms',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'roi',
      title: 'ROI Performance',
      value: '$4.20',
      change: -8.2,
      trend: 'down',
      target: 100,
      current: 88,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      ribbon: '⚠️ ROI Dip',
      description: 'Return on ad spend across marketing campaigns',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'funnel-dropoff',
      title: 'Funnel Drop-off',
      value: '23%',
      change: 5.3,
      trend: 'up',
      target: 75,
      current: 77,
      icon: Users,
      color: 'from-orange-500 to-red-500',
      description: 'Conversion rate from impression to lead',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'audience-drilldown',
      title: 'Audience Quality',
      value: '8.4/10',
      change: 15.7,
      trend: 'up',
      target: 90,
      current: 84,
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      description: 'Quality score of engaged audience segments',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'cost-per-lead',
      title: 'Cost Per Lead',
      value: '$12.50',
      change: -18.3,
      trend: 'down',
      target: 95,
      current: 78,
      icon: MousePointer,
      color: 'from-indigo-500 to-purple-500',
      description: 'Average cost to acquire a qualified lead',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'time-optimization',
      title: 'Time Optimization',
      value: '92%',
      change: 22.1,
      trend: 'up',
      target: 95,
      current: 92,
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      ribbon: '🔥 Top Growth',
      description: 'Optimal posting time effectiveness score',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'trendtap-pulse',
      title: 'TrendTap™ Pulse',
      value: '78/100',
      change: 8.9,
      trend: 'up',
      target: 80,
      current: 78,
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      description: 'Real-time trend alignment score',
      lastUpdated: new Date().toISOString()
    }
  ];

  // Fetch KPI Data (simulated for demo)
  const fetchKPIData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with realistic data variations
      const updatedData = initializeKPIData().map(kpi => ({
        ...kpi,
        change: kpi.change + (Math.random() * 4 - 2), // Small random variation
        current: Math.min(100, Math.max(0, kpi.current + (Math.random() * 6 - 3))),
        lastUpdated: new Date().toISOString()
      }));
      setKpiData(updatedData);
    } catch (error) {
      console.error('Error fetching KPI data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Deploy ViVi Strategy
  const deployViViStrategy = async () => {
    setDeployingStrategy(true);
    try {
      const kpiSnapshot = kpiData.reduce((acc, kpi) => ({
        ...acc,
        [kpi.id]: { value: kpi.value, change: kpi.change, current: kpi.current }
      }), {});

      const newLog: StrategyLog = {
        id: `strategy_${Date.now()}`,
        timestamp: new Date().toISOString(),
        summary: `ViVi deployed 3-point optimization: ROI recovery focus (${kpiData.find(k => k.id === 'roi')?.value}), engagement boost targeting (+${kpiData.find(k => k.id === 'post-engagement')?.change.toFixed(1)}%), and cost reduction strategy (-${Math.abs(kpiData.find(k => k.id === 'cost-per-lead')?.change || 0).toFixed(1)}%)`,
        kpiSnapshot,
        success: true
      };

      setStrategyLogs(prev => [newLog, ...prev]);
      setShowViViStrategy(false);

      // Simulate positive impact after strategy deployment
      setTimeout(() => {
        fetchKPIData();
      }, 2000);

    } catch (error) {
      console.error('Error deploying strategy:', error);
    } finally {
      setDeployingStrategy(false);
    }
  };

  // Copy strategy log to clipboard
  const copyLogToClipboard = async (log: StrategyLog) => {
    const text = `${new Date(log.timestamp).toLocaleString()}: ${log.summary}`;
    try {
      await navigator.clipboard.writeText(text);
      console.log('Strategy log copied to clipboard');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  // Initialize and start polling
  useEffect(() => {
    fetchKPIData();
    
    // Poll every 10 seconds
    pollInterval.current = setInterval(() => {
      fetchKPIData();
    }, 10000);

    return () => {
      if (pollInterval.current) {
        clearInterval(pollInterval.current);
      }
    };
  }, []);

  const opportunityZones = [
    {
      title: 'Geographic Expansion',
      description: 'High engagement detected in Texas and Florida',
      potential: 'High',
      effort: 'Medium',
      roi: '+25%',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Demographic Targeting', 
      description: 'Untapped audience: 25-34 professionals',
      potential: 'Very High',
      effort: 'Low',
      roi: '+40%',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Platform Diversification',
      description: 'Strong performance opportunity on LinkedIn',
      potential: 'High',
      effort: 'Medium',
      roi: '+30%',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Content Format Innovation',
      description: 'Video content showing 3x engagement rates',
      potential: 'Medium',
      effort: 'High',
      roi: '+20%',
      icon: Sparkles,
      color: 'from-orange-500 to-red-500'
    }
  ];

  // KPI Card Component
  const KPICard: React.FC<{ kpi: KPIData }> = ({ kpi }) => (
    <div
      className="relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100/50 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
      onMouseEnter={() => setHoveredKPI(kpi)}
      onMouseLeave={() => setHoveredKPI(null)}
    >
      {/* Performance Ribbon */}
      {kpi.ribbon && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-2xl shadow-lg">
          {kpi.ribbon}
        </div>
      )}

      {/* Icon and Title */}
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-3 bg-gradient-to-br ${kpi.color} rounded-2xl shadow-lg`}>
          <kpi.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-black tracking-tight text-gray-900">{kpi.title}</h3>
          <p className="text-sm text-gray-600">{kpi.description}</p>
        </div>
      </div>

      {/* Value and Change */}
      <div className="mb-4">
        <div className="text-3xl font-black text-gray-900 mb-2">{kpi.value}</div>
        <div className={`flex items-center space-x-2 text-sm font-bold ${
          kpi.change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          <TrendingUp className={`w-4 h-4 ${kpi.change < 0 ? 'rotate-180' : ''}`} />
          <span>{kpi.change >= 0 ? '+' : ''}{kpi.change.toFixed(1)}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>Progress</span>
          <span>{kpi.current}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${kpi.color} transition-all duration-500`}
            style={{ width: `${kpi.current}%` }}
          />
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300">
        Updated: {new Date(kpi.lastUpdated).toLocaleTimeString()}
      </div>
    </div>
  );

  // ViVi Strategy Panel
  const ViViStrategyPanel: React.FC = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-4 shadow-3xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900">ViVi Strategy Optimization</h2>
            <p className="text-gray-600">AI-powered performance enhancement recommendations</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-bold text-red-800">ROI Recovery Focus</span>
            </div>
            <p className="text-sm text-red-700">
              Current ROI dipped 8.2%. ViVi recommends shifting 30% budget to high-performing audience segments and optimizing underperforming ad creatives.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">Engagement Amplification</span>
            </div>
            <p className="text-sm text-blue-700">
              Post engagement up 12.5%. ViVi will boost similar content formats and expand optimal posting windows for maximum viral potential.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">Cost Optimization</span>
            </div>
            <p className="text-sm text-green-700">
              Lead costs improved 18.3%. ViVi will scale winning campaigns and pause underperforming segments to maximize cost efficiency.
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={deployViViStrategy}
            disabled={deployingStrategy}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 px-6 rounded-2xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {deployingStrategy ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Deploying Strategy...</span>
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5" />
                <span>Launch These Actions</span>
              </>
            )}
          </button>
          <button
            onClick={() => setShowViViStrategy(false)}
            className="px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Strategy Deployment History
  const StrategyHistory: React.FC = () => (
    <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black tracking-tight text-gray-900">Strategy Deployment History</h3>
        <div className="flex space-x-2">
          <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all duration-300">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all duration-300">
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {strategyLogs.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No strategy deployments yet. Launch your first ViVi optimization above.</p>
      ) : (
        <div className="space-y-3">
          {strategyLogs.map((log) => (
            <div key={log.id} className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold text-gray-600">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-800 font-medium">{log.summary}</p>
                </div>
                <button
                  onClick={() => copyLogToClipboard(log)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-all duration-300"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Section Navigation */}
      <div className="flex space-x-1 p-1 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl shadow-sm">
        {[
          { id: 'kpi-grid', label: 'Marketing Insights', icon: BarChart3 },
          { id: 'opportunities', label: 'Growth Opportunities', icon: TrendingUp }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <section.icon className="w-4 h-4" />
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* KPI Grid Section */}
      {activeSection === 'kpi-grid' && (
        <div className="space-y-8">
          {/* KPI Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {kpiData.map((kpi) => (
              <KPICard key={kpi.id} kpi={kpi} />
            ))}
          </div>

          {/* ViVi Strategy Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowViViStrategy(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 px-8 rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 hover:scale-105"
            >
              <Sparkles className="w-6 h-6" />
              <span>Open ViVi Strategy Center</span>
            </button>
          </div>

          {/* Strategy History */}
          <StrategyHistory />

          {/* Hover Tooltip */}
          {hoveredKPI && (
            <div className="fixed top-20 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-3xl border border-gray-200 z-40 max-w-sm">
              <h4 className="font-black text-gray-900 mb-2">{hoveredKPI.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{hoveredKPI.description}</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Value:</span>
                  <span className="font-bold text-gray-900">{hoveredKPI.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Change:</span>
                  <span className={`font-bold ${hoveredKPI.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {hoveredKPI.change >= 0 ? '+' : ''}{hoveredKPI.change.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-bold text-gray-900">{hoveredKPI.current}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Growth Opportunities Section */}
      {activeSection === 'opportunities' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-3">Growth Opportunities</h2>
            <p className="text-gray-600 text-lg">Untapped potential for business expansion</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {opportunityZones.map((zone, index) => (
              <div key={index} className={`p-6 bg-gradient-to-br ${zone.color} rounded-2xl shadow-2xl text-white`}>
                <div className="flex items-center space-x-3 mb-4">
                  <zone.icon className="w-8 h-8" />
                  <h3 className="text-xl font-black">{zone.title}</h3>
                </div>
                <p className="mb-4">{zone.description}</p>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="opacity-80">Potential: </span>
                    <span className="font-bold">{zone.potential}</span>
                  </div>
                  <div>
                    <span className="opacity-80">Effort: </span>
                    <span className="font-bold">{zone.effort}</span>
                  </div>
                  <div>
                    <span className="opacity-80">ROI: </span>
                    <span className="font-bold">{zone.roi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ViVi Strategy Modal */}
      {showViViStrategy && <ViViStrategyPanel />}
    </div>
  );
};

export default GrowTab;