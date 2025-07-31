import React, { useState, useEffect } from 'react';
import { Play, Pause, BarChart3, TrendingUp, Target, Calendar, Users, DollarSign, Eye, Heart, MessageCircle, Share2, Plus, Filter, Search, MoreHorizontal, Edit3, Trash2, Copy } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  platform: string[];
  budget: number;
  spent: number;
  reach: number;
  engagement: number;
  conversions: number;
  roi: number;
  startDate: string;
  endDate: string;
  type: 'lead-gen' | 'brand-awareness' | 'sales' | 'engagement';
  persona: string;
}

interface CampaignsPageProps {
  currentPersona: string;
}

const CampaignsPage: React.FC<CampaignsPageProps> = ({ currentPersona }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'paused' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    // Generate persona-specific campaigns
    const generateCampaigns = () => {
      const baseCampaigns: Record<string, Campaign[]> = {
        kemar: [
          {
            id: 'camp-001',
            name: 'Leadership Summit 2025 Promotion',
            status: 'active',
            platform: ['linkedin', 'x', 'instagram'],
            budget: 5000,
            spent: 2350,
            reach: 45000,
            engagement: 3200,
            conversions: 156,
            roi: 340,
            startDate: '2025-01-01',
            endDate: '2025-02-15',
            type: 'lead-gen',
            persona: 'kemar'
          },
          {
            id: 'camp-002',
            name: 'Executive Coaching Program',
            status: 'active',
            platform: ['linkedin', 'youtube'],
            budget: 3000,
            spent: 1800,
            reach: 28000,
            engagement: 2100,
            conversions: 89,
            roi: 280,
            startDate: '2025-01-10',
            endDate: '2025-03-01',
            type: 'sales',
            persona: 'kemar'
          },
          {
            id: 'camp-003',
            name: 'Personal Brand Building',
            status: 'paused',
            platform: ['instagram', 'tiktok'],
            budget: 2000,
            spent: 1200,
            reach: 22000,
            engagement: 1800,
            conversions: 45,
            roi: 150,
            startDate: '2024-12-15',
            endDate: '2025-01-30',
            type: 'brand-awareness',
            persona: 'kemar'
          }
        ],
        karen: [
          {
            id: 'camp-004',
            name: 'Miami Beach Luxury Listings',
            status: 'active',
            platform: ['instagram', 'facebook'],
            budget: 4000,
            spent: 2800,
            reach: 38000,
            engagement: 2900,
            conversions: 23,
            roi: 420,
            startDate: '2025-01-05',
            endDate: '2025-02-28',
            type: 'lead-gen',
            persona: 'karen'
          },
          {
            id: 'camp-005',
            name: 'First-Time Home Buyer Workshop',
            status: 'active',
            platform: ['facebook', 'youtube'],
            budget: 2500,
            spent: 1900,
            reach: 32000,
            engagement: 2400,
            conversions: 67,
            roi: 290,
            startDate: '2025-01-12',
            endDate: '2025-02-15',
            type: 'lead-gen',
            persona: 'karen'
          },
          {
            id: 'camp-006',
            name: 'Market Report Series',
            status: 'completed',
            platform: ['linkedin', 'x'],
            budget: 1500,
            spent: 1500,
            reach: 25000,
            engagement: 1900,
            conversions: 89,
            roi: 180,
            startDate: '2024-12-01',
            endDate: '2024-12-31',
            type: 'brand-awareness',
            persona: 'karen'
          }
        ],
        sarah: [
          {
            id: 'camp-007',
            name: 'Holiday Glow Special',
            status: 'active',
            platform: ['instagram', 'facebook'],
            budget: 3500,
            spent: 2100,
            reach: 42000,
            engagement: 3800,
            conversions: 145,
            roi: 380,
            startDate: '2024-12-20',
            endDate: '2025-01-31',
            type: 'sales',
            persona: 'sarah'
          },
          {
            id: 'camp-008',
            name: 'Botox & Filler Education',
            status: 'active',
            platform: ['youtube', 'tiktok'],
            budget: 2800,
            spent: 1600,
            reach: 35000,
            engagement: 3200,
            conversions: 78,
            roi: 240,
            startDate: '2025-01-08',
            endDate: '2025-02-22',
            type: 'brand-awareness',
            persona: 'sarah'
          },
          {
            id: 'camp-009',
            name: 'Client Referral Program',
            status: 'paused',
            platform: ['instagram', 'facebook'],
            budget: 2000,
            spent: 800,
            reach: 18000,
            engagement: 1400,
            conversions: 34,
            roi: 165,
            startDate: '2024-12-01',
            endDate: '2025-01-15',
            type: 'engagement',
            persona: 'sarah'
          }
        ],
        marco: [
          {
            id: 'camp-010',
            name: 'Weekend Brunch Promotion',
            status: 'active',
            platform: ['instagram', 'facebook'],
            budget: 2500,
            spent: 1800,
            reach: 28000,
            engagement: 2600,
            conversions: 234,
            roi: 320,
            startDate: '2025-01-06',
            endDate: '2025-02-28',
            type: 'sales',
            persona: 'marco'
          },
          {
            id: 'camp-011',
            name: 'Authentic Italian Experience',
            status: 'active',
            platform: ['tiktok', 'youtube'],
            budget: 3000,
            spent: 2200,
            reach: 45000,
            engagement: 4200,
            conversions: 189,
            roi: 280,
            startDate: '2025-01-01',
            endDate: '2025-02-15',
            type: 'brand-awareness',
            persona: 'marco'
          },
          {
            id: 'camp-012',
            name: 'Valentine\'s Day Special Menu',
            status: 'draft',
            platform: ['instagram', 'facebook'],
            budget: 1800,
            spent: 0,
            reach: 0,
            engagement: 0,
            conversions: 0,
            roi: 0,
            startDate: '2025-02-01',
            endDate: '2025-02-14',
            type: 'sales',
            persona: 'marco'
          }
        ],
        alex: [
          {
            id: 'camp-013',
            name: 'New Year Fitness Challenge',
            status: 'active',
            platform: ['instagram', 'tiktok'],
            budget: 3200,
            spent: 2400,
            reach: 52000,
            engagement: 4800,
            conversions: 167,
            roi: 310,
            startDate: '2025-01-01',
            endDate: '2025-01-31',
            type: 'lead-gen',
            persona: 'alex'
          },
          {
            id: 'camp-014',
            name: 'Personal Training Packages',
            status: 'active',
            platform: ['facebook', 'youtube'],
            budget: 2800,
            spent: 1900,
            reach: 38000,
            engagement: 2900,
            conversions: 89,
            roi: 280,
            startDate: '2025-01-10',
            endDate: '2025-03-01',
            type: 'sales',
            persona: 'alex'
          },
          {
            id: 'camp-015',
            name: 'Nutrition Coaching Launch',
            status: 'completed',
            platform: ['instagram', 'linkedin'],
            budget: 2200,
            spent: 2200,
            reach: 29000,
            engagement: 2400,
            conversions: 78,
            roi: 190,
            startDate: '2024-12-01',
            endDate: '2024-12-31',
            type: 'brand-awareness',
            persona: 'alex'
          }
        ],
        david: [
          {
            id: 'camp-016',
            name: '2025 Model Year Clearance',
            status: 'active',
            platform: ['facebook', 'youtube'],
            budget: 6000,
            spent: 4200,
            reach: 65000,
            engagement: 4800,
            conversions: 28,
            roi: 450,
            startDate: '2025-01-01',
            endDate: '2025-01-31',
            type: 'sales',
            persona: 'david'
          },
          {
            id: 'camp-017',
            name: 'Electric Vehicle Promotion',
            status: 'active',
            platform: ['instagram', 'x'],
            budget: 4500,
            spent: 3100,
            reach: 48000,
            engagement: 3600,
            conversions: 19,
            roi: 380,
            startDate: '2025-01-08',
            endDate: '2025-02-22',
            type: 'lead-gen',
            persona: 'david'
          },
          {
            id: 'camp-018',
            name: 'Service Department Awareness',
            status: 'paused',
            platform: ['facebook', 'instagram'],
            budget: 2000,
            spent: 1200,
            reach: 22000,
            engagement: 1800,
            conversions: 45,
            roi: 150,
            startDate: '2024-12-15',
            endDate: '2025-01-30',
            type: 'brand-awareness',
            persona: 'david'
          }
        ]
      };

      return baseCampaigns[currentPersona] || [];
    };

    setCampaigns(generateCampaigns());
  }, [currentPersona]);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesTab = activeTab === 'all' || campaign.status === activeTab;
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lead-gen': return 'bg-purple-100 text-purple-800';
      case 'brand-awareness': return 'bg-blue-100 text-blue-800';
      case 'sales': return 'bg-green-100 text-green-800';
      case 'engagement': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600">Manage and track your marketing campaigns</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(campaigns.reduce((sum, c) => sum + c.reach, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Conversions</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(campaigns.reduce((sum, c) => sum + c.conversions, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average ROI</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {['all', 'active', 'paused', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROI
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {campaign.platform.join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(campaign.type)}`}>
                        {campaign.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>{formatNumber(campaign.reach)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Heart className="w-4 h-4 text-gray-400" />
                        <span>{formatNumber(campaign.engagement)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {campaign.roi}%
                      </span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-purple-600">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;