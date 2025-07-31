import { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Play, 
  Pause, 
  BarChart3, 
  Calendar, 
  DollarSign, 
  Users, 
  Eye, 
  MousePointer, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Share2,
  Download,
  Filter,
  Search,
  ChevronDown,
  Zap,
  Star,
  Settings
} from 'lucide-react';
import { FaInstagram, FaLinkedin, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const CampaignsPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('leadership-summit');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const campaigns = [
    {
      id: 'leadership-summit',
      name: 'Leadership Summit 2025 Promotion',
      status: 'active',
      platform: 'Multi-Platform',
      budget: '$15,000',
      spent: '$8,450',
      duration: '14 days left',
      impressions: '2.4M',
      clicks: '89.4K',
      conversions: '1,247',
      roi: '+340%',
      ctr: '3.72%',
      conversionRate: '1.39%',
      platforms: ['LinkedIn', 'Instagram', 'Facebook', 'YouTube'],
      createdDate: '2025-01-10',
      performance: 'excellent',
      targetAudience: 'Business Leaders & Executives',
      objective: 'Event Registration & Brand Awareness',
      content: [
        {
          type: 'video',
          title: 'Leadership Excellence Teaser',
          performance: '+45% engagement',
          platform: 'LinkedIn'
        },
        {
          type: 'carousel',
          title: 'Speaker Lineup Announcement',
          performance: '+67% reach',
          platform: 'Instagram'
        },
        {
          type: 'article',
          title: 'The Future of Leadership',
          performance: '+23% shares',
          platform: 'LinkedIn'
        }
      ]
    },
    {
      id: 'keynote-bookings',
      name: 'Q1 Keynote Booking Drive',
      status: 'active',
      platform: 'LinkedIn',
      budget: '$8,500',
      spent: '$3,200',
      duration: '21 days left',
      impressions: '1.8M',
      clicks: '45.2K',
      conversions: '892',
      roi: '+280%',
      ctr: '2.51%',
      conversionRate: '1.97%',
      platforms: ['LinkedIn', 'YouTube'],
      createdDate: '2025-01-15',
      performance: 'good',
      targetAudience: 'Event Planners & Conference Organizers',
      objective: 'Lead Generation & Booking Inquiries',
      content: [
        {
          type: 'video',
          title: 'Speaking Reel Showcase',
          performance: '+89% views',
          platform: 'LinkedIn'
        },
        {
          type: 'case-study',
          title: 'Client Success Stories',
          performance: '+34% engagement',
          platform: 'LinkedIn'
        }
      ]
    },
    {
      id: 'personal-brand',
      name: 'Personal Brand Authority Building',
      status: 'paused',
      platform: 'Instagram',
      budget: '$5,000',
      spent: '$2,100',
      duration: 'Paused',
      impressions: '890K',
      clicks: '23.1K',
      conversions: '456',
      roi: '+150%',
      ctr: '2.59%',
      conversionRate: '1.97%',
      platforms: ['Instagram', 'TikTok'],
      createdDate: '2025-01-05',
      performance: 'average',
      targetAudience: 'Aspiring Leaders & Entrepreneurs',
      objective: 'Follower Growth & Engagement',
      content: [
        {
          type: 'reel',
          title: 'Leadership Tips Series',
          performance: '+67% saves',
          platform: 'Instagram'
        },
        {
          type: 'story',
          title: 'Behind the Scenes',
          performance: '+45% completion',
          platform: 'Instagram'
        }
      ]
    },
    {
      id: 'corporate-training',
      name: 'Corporate Training Program Launch',
      status: 'draft',
      platform: 'Multi-Platform',
      budget: '$12,000',
      spent: '$0',
      duration: 'Not started',
      impressions: '0',
      clicks: '0',
      conversions: '0',
      roi: 'TBD',
      ctr: '0%',
      conversionRate: '0%',
      platforms: ['LinkedIn', 'Facebook', 'YouTube'],
      createdDate: '2025-01-20',
      performance: 'pending',
      targetAudience: 'HR Directors & Learning Managers',
      objective: 'Program Enrollment & Corporate Partnerships',
      content: [
        {
          type: 'video',
          title: 'Training Preview',
          performance: 'Pending',
          platform: 'LinkedIn'
        }
      ]
    }
  ];

  const statusColors = {
    active: 'bg-green-500/20 text-green-300 border-green-500/30',
    paused: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    draft: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    completed: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  };

  const performanceColors = {
    excellent: 'text-green-400',
    good: 'text-blue-400',
    average: 'text-yellow-400',
    poor: 'text-red-400',
    pending: 'text-gray-400'
  };

  const currentCampaign = campaigns.find(c => c.id === selectedCampaign);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Target className="w-8 h-8 mr-3 text-purple-400" />
            Campaign Management
          </h1>
          <p className="text-purple-300 mt-1">Monitor and optimize your marketing campaigns</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
          <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-800/30">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-purple-300 text-sm">Active Campaigns</div>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">4</div>
          <div className="text-green-400 text-sm">+2 this month</div>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-green-300 text-sm">Total Impressions</div>
            <Eye className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">5.1M</div>
          <div className="text-green-400 text-sm">+23% vs last month</div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-blue-300 text-sm">Total Clicks</div>
            <MousePointer className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">157.7K</div>
          <div className="text-blue-400 text-sm">+18% engagement</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-yellow-300 text-sm">Conversions</div>
            <CheckCircle className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">2,595</div>
          <div className="text-yellow-400 text-sm">+34% conversion rate</div>
        </div>

        <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-red-300 text-sm">Total ROI</div>
            <TrendingUp className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">+267%</div>
          <div className="text-red-400 text-sm">Above industry avg</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign List */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">All Campaigns</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => setSelectedCampaign(campaign.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedCampaign === campaign.id
                      ? 'bg-purple-800/50 border-purple-500/50 shadow-lg'
                      : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{campaign.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[campaign.status]}`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>{campaign.platform}</span>
                    <span>{campaign.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-400">{campaign.spent} / {campaign.budget}</span>
                    <span className={`font-medium ${performanceColors[campaign.performance]}`}>
                      {campaign.roi}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="lg:col-span-2">
          {currentCampaign && (
            <div className="space-y-6">
              {/* Campaign Header */}
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{currentCampaign.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-300">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Created: {new Date(currentCampaign.createdDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {currentCampaign.targetAudience}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    {currentCampaign.status === 'active' ? (
                      <Button variant="outline" size="sm" className="border-yellow-600 text-yellow-300">
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="border-green-600 text-green-300">
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{currentCampaign.impressions}</div>
                    <div className="text-sm text-slate-400">Impressions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{currentCampaign.clicks}</div>
                    <div className="text-sm text-slate-400">Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{currentCampaign.conversions}</div>
                    <div className="text-sm text-slate-400">Conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{currentCampaign.roi}</div>
                    <div className="text-sm text-slate-400">ROI</div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Performance Metrics
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Click-through Rate</span>
                      <span className="text-white font-medium">{currentCampaign.ctr}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Conversion Rate</span>
                      <span className="text-white font-medium">{currentCampaign.conversionRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Budget Utilization</span>
                      <span className="text-white font-medium">
                        {Math.round((parseFloat(currentCampaign.spent.replace('$', '').replace(',', '')) / 
                                   parseFloat(currentCampaign.budget.replace('$', '').replace(',', ''))) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Performance Rating</span>
                      <span className={`font-medium capitalize ${performanceColors[currentCampaign.performance]}`}>
                        {currentCampaign.performance}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Budget & Spend
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Total Budget</span>
                      <span className="text-white font-medium">{currentCampaign.budget}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Amount Spent</span>
                      <span className="text-white font-medium">{currentCampaign.spent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Remaining Budget</span>
                      <span className="text-green-400 font-medium">
                        ${(parseFloat(currentCampaign.budget.replace('$', '').replace(',', '')) - 
                            parseFloat(currentCampaign.spent.replace('$', '').replace(',', ''))).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Daily Average</span>
                      <span className="text-white font-medium">
                        ${Math.round(parseFloat(currentCampaign.spent.replace('$', '').replace(',', '')) / 7).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Distribution & Content Performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Share2 className="w-5 h-5 mr-2" />
                    Platform Distribution
                  </h4>
                  <div className="space-y-3">
                    {currentCampaign.platforms.map((platform, index) => (
                      <div key={platform} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                            {platform === 'LinkedIn' && <FaLinkedin className="w-4 h-4 text-blue-400" />}
                            {platform === 'Instagram' && <FaInstagram className="w-4 h-4 text-pink-400" />}
                            {platform === 'Facebook' && <FaFacebook className="w-4 h-4 text-blue-400" />}
                            {platform === 'YouTube' && <FaYoutube className="w-4 h-4 text-red-400" />}
                            {platform === 'TikTok' && <FaTiktok className="w-4 h-4 text-purple-400" />}
                          </div>
                          <span className="text-white font-medium">{platform}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-green-400 font-medium">
                            {Math.round(Math.random() * 40 + 20)}% spend
                          </div>
                          <div className="text-xs text-slate-400">
                            {(Math.random() * 2 + 1).toFixed(1)}% CTR
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Top Performing Content
                  </h4>
                  <div className="space-y-3">
                    {currentCampaign.content.map((content, index) => (
                      <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-white text-sm">{content.title}</h5>
                          <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                            {content.type}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">{content.platform}</span>
                          <span className="text-green-400 font-medium">{content.performance}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;