import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Download, Calendar, Mail, Eye, MessageCircle, 
         Share2, Heart, Clock, Target, Filter, RefreshCw, Globe, Video, Hash, Users } from 'lucide-react';
import BarChart from '../Charts/BarChart';
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';
import HeatmapChart from '../Charts/HeatmapChart';
import FunnelChart from '../Charts/FunnelChart';
import ExportPanel from '../Export/ExportPanel';

interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  platform: string;
  icon: React.ComponentType;
  color: string;
}

interface PostPerformance {
  id: string;
  platform: string;
  content: string;
  engagements: number;
  reach: number;
  impressions: number;
  ctr: number;
  format: string;
  timestamp: string;
}

interface CommentMetric {
  platform: string;
  volume: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  responseTime: number;
}

const FourSightPanel: React.FC = () => {
  const [timeframe, setTimeframe] = useState('30');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [kpiMetrics, setKpiMetrics] = useState<KPIMetric[]>([]);
  const [postPerformance, setPostPerformance] = useState<PostPerformance[]>([]);
  const [commentMetrics, setCommentMetrics] = useState<CommentMetric[]>([]);
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [activeChart, setActiveChart] = useState('line');
  const [isLoading, setIsLoading] = useState(false);

  const platforms = [
    { id: 'all', name: 'All Platforms', color: 'from-purple-500 to-pink-500' },
    { id: 'instagram', name: 'Instagram', color: 'from-pink-500 to-rose-500' },
    { id: 'tiktok', name: 'TikTok', color: 'from-gray-900 to-black' },
    { id: 'facebook', name: 'Facebook', color: 'from-blue-600 to-blue-700' },
    { id: 'twitter', name: 'X (Twitter)', color: 'from-gray-900 to-black' },
    { id: 'linkedin', name: 'LinkedIn', color: 'from-blue-700 to-blue-800' },
    { id: 'youtube', name: 'YouTube', color: 'from-red-600 to-red-700' },
    { id: 'gmb', name: 'Google Business', color: 'from-green-600 to-green-700' }
  ];

  const timeframes = [
    { value: '7', label: '7 Days' },
    { value: '14', label: '14 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' },
    { value: '180', label: '6 Months' },
    { value: '365', label: '1 Year' }
  ];

  // Initialize sample KPI data
  const initializeKPIData = (): KPIMetric[] => [
    {
      id: 'total-engagements',
      title: 'Total Engagements',
      value: '2.4K',
      change: 18.5,
      trend: 'up',
      platform: 'all',
      icon: Heart,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'post-reach',
      title: 'Post Reach',
      value: '15.2K',
      change: 12.3,
      trend: 'up',
      platform: 'all',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'avg-ctr',
      title: 'Average CTR',
      value: '3.8%',
      change: -2.1,
      trend: 'down',
      platform: 'all',
      icon: Target,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'video-completion',
      title: 'Video Completion',
      value: '68%',
      change: 8.7,
      trend: 'up',
      platform: 'all',
      icon: Video,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'comment-volume',
      title: 'Comment Volume',
      value: '892',
      change: 24.1,
      trend: 'up',
      platform: 'all',
      icon: MessageCircle,
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'share-count',
      title: 'Share Count',
      value: '156',
      change: 15.4,
      trend: 'up',
      platform: 'all',
      icon: Share2,
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  // Log ViVi insights
  const logViViInsight = async (event: string, data?: any) => {
    try {
      const insight = {
        event,
        timestamp: Date.now(),
        data,
        platform: selectedPlatform,
        timeframe
      };
      
      // Store in localStorage for ViVi learning
      const existingLogs = JSON.parse(localStorage.getItem('vivi-insights') || '[]');
      existingLogs.push(insight);
      localStorage.setItem('vivi-insights', JSON.stringify(existingLogs));
      
      console.log('ViVi Insight Logged:', insight);
    } catch (error) {
      console.error('Failed to log ViVi insight:', error);
    }
  };

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      await logViViInsight('analytics_refresh', { timeframe, platform: selectedPlatform });
      
      // Simulate API calls with realistic variations
      const updatedKPIs = initializeKPIData().map(kpi => ({
        ...kpi,
        change: kpi.change + (Math.random() * 4 - 2),
        value: typeof kpi.value === 'string' ? kpi.value : kpi.value + Math.floor(Math.random() * 100)
      }));
      
      setKpiMetrics(updatedKPIs);
      
      // Sample post performance data
      const samplePosts: PostPerformance[] = [
        {
          id: 'post1',
          platform: 'instagram',
          content: 'Behind the scenes content creation',
          engagements: 234,
          reach: 1200,
          impressions: 1850,
          ctr: 4.2,
          format: 'reel',
          timestamp: new Date().toISOString()
        },
        {
          id: 'post2',
          platform: 'tiktok',
          content: 'Quick tip Tuesday',
          engagements: 456,
          reach: 2100,
          impressions: 3200,
          ctr: 3.8,
          format: 'video',
          timestamp: new Date().toISOString()
        }
      ];
      
      setPostPerformance(samplePosts);
      
      // Sample comment metrics
      const sampleComments: CommentMetric[] = [
        {
          platform: 'instagram',
          volume: 89,
          sentiment: { positive: 65, neutral: 20, negative: 15 },
          responseTime: 2.4
        },
        {
          platform: 'tiktok',
          volume: 156,
          sentiment: { positive: 78, neutral: 15, negative: 7 },
          responseTime: 1.8
        }
      ];
      
      setCommentMetrics(sampleComments);
      
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle chart type change
  const handleChartChange = (chartType: string) => {
    setActiveChart(chartType);
    logViViInsight('chart_view_changed', { from: activeChart, to: chartType });
  };

  // Handle export action
  const handleExport = (format: string) => {
    logViViInsight('report_exported', { format, timeframe, platform: selectedPlatform });
    setShowExportPanel(true);
  };

  // Handle email summary
  const handleEmailSummary = () => {
    const subject = `FourSIGHT™ Analytics Summary - ${timeframe} Days`;
    const body = `Analytics summary for ${selectedPlatform} platform(s) over the last ${timeframe} days.`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    logViViInsight('email_summary_triggered', { timeframe, platform: selectedPlatform });
    window.open(mailtoLink, '_blank');
  };

  // Handle calendar reminder
  const handleCalendarReminder = () => {
    const title = 'Review FourSIGHT™ Analytics';
    const details = `Review performance metrics and insights from FourSIGHT™ dashboard`;
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}`;
    
    logViViInsight('calendar_reminder_created');
    window.open(calendarUrl, '_blank');
  };

  // Initialize data on component mount
  useEffect(() => {
    fetchAnalyticsData();
  }, [timeframe, selectedPlatform]);

  // KPI Card Component
  const KPICard: React.FC<{ metric: KPIMetric }> = ({ metric }) => (
    <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100/50 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-3 bg-gradient-to-br ${metric.color} rounded-2xl shadow-lg`}>
          <metric.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-black tracking-tight text-gray-900">{metric.title}</h3>
          <p className="text-sm text-gray-600">{metric.platform}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="text-3xl font-black text-gray-900 mb-1">{metric.value}</div>
        <div className={`flex items-center space-x-2 text-sm font-bold ${
          metric.change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          <TrendingUp className={`w-4 h-4 ${metric.change < 0 ? 'rotate-180' : ''}`} />
          <span>{metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2">
            FourSIGHT™ Intelligence Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Cross-platform analytics and business intelligence center</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={handleEmailSummary}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>
          
          <button
            onClick={handleCalendarReminder}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <Calendar className="w-4 h-4" />
            <span>Remind</span>
          </button>
          
          <button
            onClick={fetchAnalyticsData}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-bold text-gray-700">Filters:</span>
        </div>
        
        {/* Timeframe Filter */}
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {timeframes.map(tf => (
            <option key={tf.value} value={tf.value}>{tf.label}</option>
          ))}
        </select>
        
        {/* Platform Filter */}
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {platforms.map(platform => (
            <option key={platform.id} value={platform.id}>{platform.name}</option>
          ))}
        </select>
        
        {/* Chart Type Selector */}
        <div className="flex items-center space-x-2 ml-auto">
          <span className="font-medium text-gray-700">View:</span>
          {[
            { id: 'line', icon: TrendingUp, label: 'Trends' },
            { id: 'bar', icon: BarChart3, label: 'Compare' },
            { id: 'pie', icon: PieChartIcon, label: 'Breakdown' }
          ].map(chart => (
            <button
              key={chart.id}
              onClick={() => handleChartChange(chart.id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeChart === chart.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <chart.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{chart.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiMetrics.map(metric => (
          <KPICard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100/50">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 mb-6">
          Performance Analytics
        </h2>
        
        {activeChart === 'line' && <LineChart />}
        {activeChart === 'bar' && <BarChart />}
        {activeChart === 'pie' && <PieChart />}
      </div>

      {/* Platform Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Heatmap */}
        <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100/50">
          <h3 className="text-xl font-black tracking-tight text-gray-900 mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span>Engagement Heatmap</span>
          </h3>
          <HeatmapChart />
        </div>

        {/* Conversion Funnel */}
        <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100/50">
          <h3 className="text-xl font-black tracking-tight text-gray-900 mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-600" />
            <span>Conversion Funnel</span>
          </h3>
          <FunnelChart />
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100/50">
        <h3 className="text-xl font-black tracking-tight text-gray-900 mb-6">Top Performing Content</h3>
        
        <div className="space-y-4">
          {postPerformance.map(post => (
            <div key={post.id} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <span className="font-bold text-gray-900 capitalize">{post.platform}</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-lg">
                      {post.format}
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium mb-2">{post.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.engagements}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.reach.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span>{post.ctr}% CTR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Panel Modal */}
      {showExportPanel && (
        <ExportPanel onClose={() => setShowExportPanel(false)} />
      )}
    </div>
  );
};

export default FourSightPanel;