import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2, 
  Users, 
  Target, 
  DollarSign, 
  Calendar, 
  Globe, 
  Zap,
  Award,
  Clock,
  Activity,
  PieChart,
  LineChart,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Star,
  Lightbulb,
  TrendingRight,
  ArrowUp,
  ArrowDown,
  Minus,
  Settings,
  Play,
  Pause,
  FileText
} from 'lucide-react';
import { FaInstagram, FaLinkedin, FaTiktok, FaYoutube, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const FourSIGHTPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('engagement');
  const [viewMode, setViewMode] = useState('overview');

  const timeframes = [
    { label: '7 Days', value: '7d' },
    { label: '30 Days', value: '30d' },
    { label: '90 Days', value: '90d' },
    { label: '1 Year', value: '1y' }
  ];

  const overviewMetrics = [
    {
      title: 'Total Reach',
      value: '2.4M',
      change: '+18%',
      trend: 'up',
      icon: Eye,
      color: 'purple'
    },
    {
      title: 'Engagement Rate',
      value: '8.7%',
      change: '+2.3%',
      trend: 'up',
      icon: Heart,
      color: 'pink'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      trend: 'up',
      icon: Target,
      color: 'green'
    },
    {
      title: 'Revenue Generated',
      value: '$47,890',
      change: '+34%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue'
    }
  ];

  const platformMetrics = [
    {
      platform: 'LinkedIn',
      icon: FaLinkedin,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      followers: '67.2K',
      engagement: '12.4%',
      reach: '890K',
      posts: 45,
      growth: '+8.3%',
      performance: 'excellent'
    },
    {
      platform: 'Instagram',
      icon: FaInstagram,
      color: 'text-pink-400',
      bgColor: 'bg-pink-900/20',
      followers: '34.8K',
      engagement: '6.7%',
      reach: '456K',
      posts: 78,
      growth: '+12.1%',
      performance: 'good'
    },
    {
      platform: 'YouTube',
      icon: FaYoutube,
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
      followers: '18.9K',
      engagement: '15.2%',
      reach: '234K',
      posts: 12,
      growth: '+23.4%',
      performance: 'excellent'
    },
    {
      platform: 'TikTok',
      icon: FaTiktok,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20',
      followers: '89.1K',
      engagement: '9.8%',
      reach: '1.2M',
      posts: 156,
      growth: '+34.7%',
      performance: 'excellent'
    },
    {
      platform: 'Facebook',
      icon: FaFacebook,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      followers: '45.6K',
      engagement: '4.3%',
      reach: '567K',
      posts: 34,
      growth: '+3.2%',
      performance: 'average'
    },
    {
      platform: 'Twitter',
      icon: FaTwitter,
      color: 'text-slate-400',
      bgColor: 'bg-slate-900/20',
      followers: '23.4K',
      engagement: '7.1%',
      reach: '189K',
      posts: 89,
      growth: '+5.6%',
      performance: 'good'
    }
  ];

  const contentPerformance = [
    {
      id: 1,
      title: 'Leadership Lessons from Silicon Valley',
      platform: 'LinkedIn',
      type: 'Article',
      published: '2025-01-15',
      reach: '45.2K',
      engagement: '8.7%',
      shares: 234,
      comments: 89,
      likes: 1567,
      performance: 'excellent'
    },
    {
      id: 2,
      title: 'The Future of Remote Leadership',
      platform: 'YouTube',
      type: 'Video',
      published: '2025-01-12',
      reach: '23.1K',
      engagement: '15.3%',
      shares: 156,
      comments: 234,
      likes: 2341,
      performance: 'excellent'
    },
    {
      id: 3,
      title: 'Quick Leadership Tip #47',
      platform: 'TikTok',
      type: 'Video',
      published: '2025-01-10',
      reach: '189K',
      engagement: '12.4%',
      shares: 567,
      comments: 123,
      likes: 14567,
      performance: 'good'
    },
    {
      id: 4,
      title: 'Building Authentic Connections',
      platform: 'Instagram',
      type: 'Reel',
      published: '2025-01-08',
      reach: '67.8K',
      engagement: '9.2%',
      shares: 345,
      comments: 198,
      likes: 4567,
      performance: 'good'
    },
    {
      id: 5,
      title: 'Leadership in Crisis Management',
      platform: 'LinkedIn',
      type: 'Post',
      published: '2025-01-05',
      reach: '34.5K',
      engagement: '6.8%',
      shares: 123,
      comments: 67,
      likes: 1234,
      performance: 'average'
    }
  ];

  const audienceInsights = [
    {
      category: 'Demographics',
      data: [
        { label: 'Age 25-34', value: '35%', color: 'bg-purple-500' },
        { label: 'Age 35-44', value: '28%', color: 'bg-blue-500' },
        { label: 'Age 45-54', value: '22%', color: 'bg-green-500' },
        { label: 'Age 55+', value: '15%', color: 'bg-yellow-500' }
      ]
    },
    {
      category: 'Industries',
      data: [
        { label: 'Technology', value: '42%', color: 'bg-purple-500' },
        { label: 'Finance', value: '23%', color: 'bg-blue-500' },
        { label: 'Healthcare', value: '18%', color: 'bg-green-500' },
        { label: 'Manufacturing', value: '17%', color: 'bg-yellow-500' }
      ]
    },
    {
      category: 'Job Titles',
      data: [
        { label: 'CEO/Founder', value: '28%', color: 'bg-purple-500' },
        { label: 'Director', value: '24%', color: 'bg-blue-500' },
        { label: 'Manager', value: '31%', color: 'bg-green-500' },
        { label: 'Executive', value: '17%', color: 'bg-yellow-500' }
      ]
    }
  ];

  const recommendations = [
    {
      id: 1,
      type: 'content',
      priority: 'high',
      title: 'Post on LinkedIn at 9 AM EST',
      description: 'Your LinkedIn audience is most active on Tuesday mornings. Schedule your leadership article for maximum engagement.',
      impact: '+23% potential reach',
      icon: Lightbulb,
      action: 'Schedule Post'
    },
    {
      id: 2,
      type: 'audience',
      priority: 'medium',
      title: 'Engage with TikTok comments',
      description: 'Your TikTok content has 45 unresponded comments. Engaging within 2 hours increases future reach by 15%.',
      impact: '+15% engagement',
      icon: MessageSquare,
      action: 'Reply to Comments'
    },
    {
      id: 3,
      type: 'optimization',
      priority: 'medium',
      title: 'Cross-promote YouTube video',
      description: 'Your latest YouTube video has high engagement. Share snippets on Instagram and TikTok for broader reach.',
      impact: '+40% video views',
      icon: Share2,
      action: 'Cross-promote'
    },
    {
      id: 4,
      type: 'trend',
      priority: 'low',
      title: 'Leverage trending hashtag',
      description: '#LeadershipTrends2025 is trending in your industry. Create content around this topic for increased visibility.',
      impact: '+12% discovery',
      icon: TrendingUp,
      action: 'Create Content'
    }
  ];

  const performanceColors = {
    excellent: 'text-green-400',
    good: 'text-blue-400',
    average: 'text-yellow-400',
    poor: 'text-red-400'
  };

  const priorityColors = {
    high: 'border-red-500/30 bg-red-900/20',
    medium: 'border-yellow-500/30 bg-yellow-900/20',
    low: 'border-blue-500/30 bg-blue-900/20'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-purple-400" />
            FourSIGHT™ Analytics
          </h1>
          <p className="text-purple-300 mt-1">Advanced performance analytics and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            {timeframes.map(tf => (
              <option key={tf.value} value={tf.value}>{tf.label}</option>
            ))}
          </select>
          <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-800/30">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex items-center space-x-2 bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
        <Button
          variant={viewMode === 'overview' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('overview')}
          className={viewMode === 'overview' ? 'bg-purple-600 hover:bg-purple-700' : 'text-slate-300 hover:text-white'}
        >
          <Eye className="w-4 h-4 mr-2" />
          Overview
        </Button>
        <Button
          variant={viewMode === 'platforms' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('platforms')}
          className={viewMode === 'platforms' ? 'bg-purple-600 hover:bg-purple-700' : 'text-slate-300 hover:text-white'}
        >
          <Globe className="w-4 h-4 mr-2" />
          Platforms
        </Button>
        <Button
          variant={viewMode === 'content' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('content')}
          className={viewMode === 'content' ? 'bg-purple-600 hover:bg-purple-700' : 'text-slate-300 hover:text-white'}
        >
          <FileText className="w-4 h-4 mr-2" />
          Content
        </Button>
        <Button
          variant={viewMode === 'audience' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('audience')}
          className={viewMode === 'audience' ? 'bg-purple-600 hover:bg-purple-700' : 'text-slate-300 hover:text-white'}
        >
          <Users className="w-4 h-4 mr-2" />
          Audience
        </Button>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {overviewMetrics.map((metric, index) => (
          <div key={index} className={`bg-gradient-to-br from-${metric.color}-900/50 to-${metric.color}-800/30 backdrop-blur-sm rounded-xl p-4 border border-${metric.color}-500/30`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-${metric.color}-300 text-sm`}>{metric.title}</div>
              <metric.icon className={`w-4 h-4 text-${metric.color}-400`} />
            </div>
            <div className="text-2xl font-bold text-white">{metric.value}</div>
            <div className={`flex items-center text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {metric.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Performance */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Platform Performance
            </h3>
            <div className="space-y-4">
              {platformMetrics.map((platform, index) => (
                <div key={index} className={`p-4 rounded-lg border border-slate-600/50 ${platform.bgColor}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <platform.icon className={`w-6 h-6 ${platform.color}`} />
                      <div>
                        <div className="font-medium text-white">{platform.platform}</div>
                        <div className="text-sm text-slate-400">{platform.followers} followers</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${performanceColors[platform.performance]}`}>
                        {platform.performance}
                      </div>
                      <div className="text-xs text-slate-400">{platform.posts} posts</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-white font-medium">{platform.engagement}</div>
                      <div className="text-slate-400">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-medium">{platform.reach}</div>
                      <div className="text-slate-400">Reach</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-medium">{platform.growth}</div>
                      <div className="text-slate-400">Growth</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              AI Recommendations
            </h3>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className={`p-4 rounded-lg border ${priorityColors[rec.priority]}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <rec.icon className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-medium text-purple-300 uppercase">{rec.priority}</span>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      rec.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                      rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {rec.priority}
                    </div>
                  </div>
                  <div className="mb-2">
                    <h4 className="font-medium text-white text-sm mb-1">{rec.title}</h4>
                    <p className="text-xs text-slate-400">{rec.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-400">{rec.impact}</span>
                    <Button size="sm" variant="outline" className="text-xs border-purple-400 text-purple-300 hover:bg-purple-800/30">
                      {rec.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Performance */}
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Top Performing Content
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-3 px-4 text-slate-300">Content</th>
                <th className="text-left py-3 px-4 text-slate-300">Platform</th>
                <th className="text-left py-3 px-4 text-slate-300">Reach</th>
                <th className="text-left py-3 px-4 text-slate-300">Engagement</th>
                <th className="text-left py-3 px-4 text-slate-300">Interactions</th>
                <th className="text-left py-3 px-4 text-slate-300">Performance</th>
              </tr>
            </thead>
            <tbody>
              {contentPerformance.map((content) => (
                <tr key={content.id} className="border-b border-slate-700/30 hover:bg-slate-700/20">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-white">{content.title}</div>
                      <div className="text-xs text-slate-400">{content.type} • {new Date(content.published).toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {content.platform === 'LinkedIn' && <FaLinkedin className="w-4 h-4 text-blue-400" />}
                      {content.platform === 'YouTube' && <FaYoutube className="w-4 h-4 text-red-400" />}
                      {content.platform === 'TikTok' && <FaTiktok className="w-4 h-4 text-purple-400" />}
                      {content.platform === 'Instagram' && <FaInstagram className="w-4 h-4 text-pink-400" />}
                      <span className="text-white">{content.platform}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white">{content.reach}</td>
                  <td className="py-3 px-4 text-white">{content.engagement}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="flex items-center text-pink-400">
                        <Heart className="w-3 h-3 mr-1" />
                        {content.likes}
                      </span>
                      <span className="flex items-center text-blue-400">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {content.comments}
                      </span>
                      <span className="flex items-center text-green-400">
                        <Share2 className="w-3 h-3 mr-1" />
                        {content.shares}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${performanceColors[content.performance]}`}>
                      {content.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {audienceInsights.map((insight, index) => (
          <div key={index} className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              {insight.category}
            </h3>
            <div className="space-y-3">
              {insight.data.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-white">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-purple-300">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FourSIGHTPage;