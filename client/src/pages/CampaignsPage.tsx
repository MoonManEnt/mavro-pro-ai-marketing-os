import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, TrendingUp, Users, Target, BarChart3, Play, Pause, Settings, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import CampaignFeedGrid from '@/components/Campaigns/CampaignFeedGrid';
import CampaignDetailDrawer from '@/components/Campaigns/CampaignDetailDrawer';
import ViViABTestingPanel from '@/components/Campaigns/ViViABTestingPanel';
import ViViCampaignInsights from '@/components/Campaigns/ViViCampaignInsights';
import CampaignExtensionNudge from '@/components/Campaigns/CampaignExtensionNudge';

interface Campaign {
  campaignId: string;
  title: string;
  status: 'Draft' | 'Live' | 'Completed' | 'Archived';
  persona: string;
  posts: string[];
  startDate: string;
  endDate: string;
  primaryCTA: string;
  totalReach: number;
  engagement: number;
  platforms: string[];
  abTestActive?: boolean;
  boostLevel?: number;
  description?: string;
}

interface ScheduledPost {
  postId: string;
  campaignId: string;
  status: 'scheduled' | 'posted' | 'draft';
  platform: string;
  content: string;
  media?: string;
  hashtags: string[];
  scheduledAt: string;
  boostLevel: number;
  autoApproved: boolean;
  metrics?: {
    reach: number;
    engagement: number;
    clicks: number;
    shares: number;
  };
}

interface CampaignsPageProps {
  currentPersona?: string;
}

const CampaignsPage: React.FC<CampaignsPageProps> = ({ currentPersona = 'demo' }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'insights' | 'testing'>('grid');
  const [loading, setLoading] = useState(true);
  const [extensionActions, setExtensionActions] = useState<any[]>([]);
  const [dismissedActions, setDismissedActions] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadCampaigns();
    loadExtensionActions();
  }, [currentPersona]);

  const loadExtensionActions = async () => {
    try {
      const response = await fetch('/api/vivi-extensions/extension-actions?limit=5');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setExtensionActions(data.actions || []);
        }
      }
    } catch (error) {
      console.error('Failed to load extension actions:', error);
    }
  };

  const loadCampaigns = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/campaigns');
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns || []);
      } else {
        // Fallback to demo data if API fails
        loadDemoCampaigns();
      }
    } catch (error) {
      console.error('Failed to load campaigns:', error);
      loadDemoCampaigns();
    }
    
    setLoading(false);
  };

  const loadDemoCampaigns = () => {
    const sampleCampaigns: Campaign[] = [
      {
        campaignId: 'cmp_sample_001',
        title: 'Summer Wellness Campaign',
        status: 'Live',
        persona: 'sarah',
        posts: ['post_001', 'post_002', 'post_003'],
        startDate: '2025-01-20',
        endDate: '2025-02-20',
        primaryCTA: 'Book Your Treatment',
        totalReach: 15000,
        engagement: 1200,
        platforms: ['instagram', 'facebook'],
        abTestActive: true,
        boostLevel: 2,
        description: 'Promote summer wellness treatments and anti-aging packages'
      },
      {
        campaignId: 'cmp_sample_002',
        title: 'New Year Transformation',
        status: 'Draft',
        persona: 'sarah',
        posts: ['post_004', 'post_005'],
        startDate: '2025-02-01',
        endDate: '2025-03-01',
        primaryCTA: 'Start Your Journey',
        totalReach: 8500,
        engagement: 720,
        platforms: ['instagram', 'tiktok', 'linkedin'],
        abTestActive: false,
        boostLevel: 1,
        description: 'New year marketing campaign for body contouring services'
      },
      {
        campaignId: 'cmp_sample_003',
        title: 'Spring Skincare Launch',
        status: 'Completed',
        persona: 'sarah',
        posts: ['post_006', 'post_007', 'post_008', 'post_009'],
        startDate: '2025-01-01',
        endDate: '2025-01-15',
        primaryCTA: 'Shop Now',
        totalReach: 22000,
        engagement: 1800,
        platforms: ['instagram', 'facebook', 'tiktok'],
        abTestActive: false,
        boostLevel: 3,
        description: 'Launch campaign for new spring skincare line'
      }
    ];
    setCampaigns(sampleCampaigns);
  };

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDrawerOpen(true);
  };

  const handleDismissAction = (actionId: string) => {
    setDismissedActions(prev => new Set([...Array.from(prev), actionId]));
  };

  const handleViewCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.campaignId === campaignId);
    if (campaign) {
      setSelectedCampaign(campaign);
      setDrawerOpen(true);
    }
  };

  const getVisibleExtensionActions = () => {
    return extensionActions.filter(action => {
      const actionId = `${action.campaignId}-${action.timestamp}`;
      return !dismissedActions.has(actionId);
    });
  };

  const handleUpdateCampaign = async (updatedCampaign: Campaign) => {
    try {
      const response = await fetch(`/api/campaigns/${updatedCampaign.campaignId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCampaign)
      });
      
      if (response.ok) {
        const data = await response.json();
        setCampaigns(campaigns.map(c => 
          c.campaignId === updatedCampaign.campaignId ? data.campaign : c
        ));
        setSelectedCampaign(data.campaign);
      } else {
        // Update local state if API fails
        setCampaigns(campaigns.map(c => 
          c.campaignId === updatedCampaign.campaignId ? updatedCampaign : c
        ));
        setSelectedCampaign(updatedCampaign);
      }
    } catch (error) {
      console.error('Failed to update campaign:', error);
      // Update local state if API fails
      setCampaigns(campaigns.map(c => 
        c.campaignId === updatedCampaign.campaignId ? updatedCampaign : c
      ));
      setSelectedCampaign(updatedCampaign);
    }
  };

  const handleUpdatePost = async (post: ScheduledPost) => {
    console.log('Updated post:', post);
  };

  const handleToggleCampaign = async (campaignId: string) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/toggle`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        setCampaigns(campaigns.map(c => 
          c.campaignId === campaignId ? data.campaign : c
        ));
      } else {
        // Update local state if API fails
        setCampaigns(campaigns.map(c => 
          c.campaignId === campaignId 
            ? { ...c, status: c.status === 'Live' ? 'Draft' : 'Live' as any }
            : c
        ));
      }
    } catch (error) {
      console.error('Failed to toggle campaign:', error);
      // Update local state if API fails
      setCampaigns(campaigns.map(c => 
        c.campaignId === campaignId 
          ? { ...c, status: c.status === 'Live' ? 'Draft' : 'Live' as any }
          : c
      ));
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const mockMetrics = {
    totalReach: 45000,
    engagement: 3200,
    clickThroughRate: 4.2,
    conversionRate: 12.5,
    costPerClick: 1.35,
    roi: 285,
    audienceGrowth: 18.5,
    brandMentions: 127
  };

  const mockPlatformData = [
    {
      platform: 'instagram',
      reach: 18000,
      engagement: 1440,
      ctr: 4.8,
      bestPerformingFormat: 'Stories',
      topHashtag: '#wellness',
      optimalPostTime: '8:00 PM'
    },
    {
      platform: 'facebook', 
      reach: 15000,
      engagement: 900,
      ctr: 3.2,
      bestPerformingFormat: 'Image Posts',
      topHashtag: '#skincare',
      optimalPostTime: '7:00 PM'
    },
    {
      platform: 'tiktok',
      reach: 12000,
      engagement: 860,
      ctr: 5.1,
      bestPerformingFormat: 'Short Videos',
      topHashtag: '#transformation',
      optimalPostTime: '6:00 PM'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div className="animate-pulse space-y-6">
            {/* Header Skeleton */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded w-64"></div>
                    <div className="h-4 bg-gray-200 rounded w-96"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-10 bg-gray-200 rounded-lg w-48"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                </div>
              </div>
            </div>
            
            {/* Content Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <div className="h-64 bg-gray-200 rounded-2xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ViVi Campaign Extension Notifications */}
      <CampaignExtensionNudge
        actions={getVisibleExtensionActions()}
        onDismiss={handleDismissAction}
        onViewCampaign={handleViewCampaign}
      />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Executive Command Header - Matching Command Center Style */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              {/* Left Side - Title and Description */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    Campaign Management
                  </h1>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed max-w-2xl">
                    Manage your marketing campaigns and track performance across platforms
                  </p>
                </div>
              </div>
              
              {/* Right Side - Actions */}
              <div className="flex items-center space-x-3">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-50 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-purple-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Target className="w-4 h-4 mr-2 inline" />
                    Campaigns
                  </button>
                  <button 
                    onClick={() => setViewMode('insights')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === 'insights' 
                        ? 'bg-white text-purple-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Brain className="w-4 h-4 mr-2 inline" />
                    ViVi Insights
                  </button>
                  <button 
                    onClick={() => setViewMode('testing')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === 'testing' 
                        ? 'bg-white text-purple-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 mr-2 inline" />
                    A/B Testing
                  </button>
                </div>
                
                {/* Create Campaign Button */}
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
                  <Plus className="w-4 h-4 mr-2" />
                  New Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Content */}
        {viewMode === 'grid' && (
          <>
            {/* Executive Command Filters */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 rounded-xl bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                
                <div className="flex gap-2">
                  {['all', 'live', 'draft', 'completed'].map((status) => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                      className={`capitalize rounded-xl transition-all duration-200 ${
                        statusFilter === status 
                          ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg' 
                          : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                      }`}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Campaign Grid */}
            {filteredCampaigns.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-12">
                <div className="text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Target className="w-12 h-12 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">No Campaigns Yet</h3>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8">
                      Create your first marketing campaign to start reaching your audience and growing your business with ViVi AI.
                    </p>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Campaign
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <CampaignFeedGrid 
                campaigns={filteredCampaigns} 
                onCampaignClick={handleCampaignClick}
                onToggleCampaign={handleToggleCampaign}
              />
            )}
          </>
        )}

        {viewMode === 'insights' && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <ViViCampaignInsights 
              campaignId="global"
              metrics={mockMetrics}
              platformData={mockPlatformData}
            />
          </div>
        )}

        {viewMode === 'testing' && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <ViViABTestingPanel 
              campaignId="cmp_sample_001"
              onStartTest={(testId: string) => {
                console.log('A/B test started:', testId);
              }}
              onPauseTest={(testId: string) => {
                console.log('A/B test paused:', testId);
              }}
              onStopTest={(testId: string) => {
                console.log('A/B test stopped:', testId);
              }}
            />
          </div>
        )}
      </div>

      {/* Campaign Detail Drawer */}
      <CampaignDetailDrawer
        campaign={selectedCampaign}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onUpdateCampaign={handleUpdateCampaign}
        onUpdatePost={handleUpdatePost}
      />
    </div>
  );
};

export default CampaignsPage;