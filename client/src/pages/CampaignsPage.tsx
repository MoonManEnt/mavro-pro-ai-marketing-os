import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, TrendingUp, Users, Target, BarChart3, Play, Pause, Settings, Brain, Sparkles, CalendarIcon, Clock, Hash, MapPin, Zap, CheckCircle, AlertCircle, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FaInstagram, FaFacebook, FaLinkedin, FaTiktok, FaYoutube, FaSnapchat } from 'react-icons/fa';
import { XIcon } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'grid' | 'insights' | 'testing' | 'builder'>('grid');
  const [loading, setLoading] = useState(true);
  const [extensionActions, setExtensionActions] = useState<any[]>([]);
  const [dismissedActions, setDismissedActions] = useState<Set<string>>(new Set());
  
  // Campaign Builder State
  const [campaignId] = useState(() => `cmp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [builderStep, setBuilderStep] = useState(1);
  const [campaignObjective, setCampaignObjective] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [campaignContent, setCampaignContent] = useState('');
  const [scheduleMode, setScheduleMode] = useState<'auto' | 'manual'>('auto');
  const [campaignMedia, setCampaignMedia] = useState<any[]>([]);

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
                  <button 
                    onClick={() => setViewMode('builder')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === 'builder' 
                        ? 'bg-white text-purple-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Zap className="w-4 h-4 mr-2 inline" />
                    Builder
                  </button>
                </div>
                
                {/* Create Campaign Button */}
                <Button 
                  onClick={() => setViewMode('builder')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                >
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
                    <Button 
                      onClick={() => setViewMode('builder')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                    >
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

        {viewMode === 'builder' && (
          <CampaignBuilderModule 
            campaignId={campaignId}
            step={builderStep}
            setStep={setBuilderStep}
            objective={campaignObjective}
            setObjective={setCampaignObjective}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
            content={campaignContent}
            setContent={setCampaignContent}
            scheduleMode={scheduleMode}
            setScheduleMode={setScheduleMode}

            onBackToGrid={() => setViewMode('grid')}
            onLaunchCampaign={(campaign) => {
              setCampaigns(prev => [...prev, campaign]);
              setViewMode('grid');
            }}
          />
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

// Campaign Builder Module Component
interface CampaignBuilderProps {
  campaignId: string;
  step: number;
  setStep: (step: number) => void;
  objective: string;
  setObjective: (objective: string) => void;
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
  content: string;
  setContent: (content: string) => void;
  scheduleMode: 'auto' | 'manual';
  setScheduleMode: (mode: 'auto' | 'manual') => void;

  onBackToGrid: () => void;
  onLaunchCampaign: (campaign: Campaign) => void;
}

const CampaignBuilderModule: React.FC<CampaignBuilderProps> = ({
  campaignId,
  step,
  setStep,
  objective,
  setObjective,
  selectedPlatforms,
  setSelectedPlatforms,
  content,
  setContent,
  scheduleMode,
  setScheduleMode,

  onBackToGrid,
  onLaunchCampaign
}) => {
  // ViVi AI Suggestions
  const viviSuggestions = {
    content: "Let's launch a 7-day campaign focused on back-to-school promos.",
    timing: "Start Monday morning, peak times between 9-11am & 4-6pm",
    hashtags: ["#BackToSchool", "#AugustSale", "#MavroMagic"]
  };

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: 'from-purple-500 to-pink-500' },
    { id: 'facebook', name: 'Facebook', icon: FaFacebook, color: 'from-blue-600 to-blue-700' },
    { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin, color: 'from-blue-700 to-blue-800' },
    { id: 'tiktok', name: 'TikTok', icon: FaTiktok, color: 'from-black to-gray-800' },
    { id: 'youtube', name: 'YouTube', icon: FaYoutube, color: 'from-red-600 to-red-700' },
    { id: 'snapchat', name: 'Snapchat', icon: FaSnapchat, color: 'from-yellow-400 to-yellow-500' }
  ];

  const objectives = [
    'Drive local foot traffic',
    'Promote new product/service',
    'Engage existing customers',
    'Build email list',
    'Increase brand awareness',
    'Generate leads'
  ];

  const togglePlatform = (platformId: string) => {
    const newPlatforms = selectedPlatforms.includes(platformId) 
      ? selectedPlatforms.filter((id: string) => id !== platformId)
      : [...selectedPlatforms, platformId];
    setSelectedPlatforms(newPlatforms);
  };

  const generateWithViVi = () => {
    const generatedContent = `🌟 Transform your ${objective.toLowerCase()} experience! 

${viviSuggestions.content}

✨ What makes us different:
• Expert-driven approach
• Personalized solutions  
• Proven results

Ready to get started? ${viviSuggestions.timing}

${viviSuggestions.hashtags.join(' ')} #TransformWithUs`;
    
    setContent(generatedContent);
  };

  const handleLaunch = () => {
    const newCampaign: Campaign = {
      campaignId,
      title: objective || 'New Campaign',
      status: 'Draft',
      persona: 'current',
      posts: [],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      primaryCTA: 'Learn More',
      totalReach: 0,
      engagement: 0,
      platforms: selectedPlatforms,
      abTestActive: false,
      boostLevel: 1,
      description: content.substring(0, 100) + '...'
    };
    
    onLaunchCampaign(newCampaign);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Campaign Builder</h2>
          <p className="text-sm text-gray-500 font-medium">ViVi-ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{campaignId}</code></p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onBackToGrid}>
            ← Back to Campaigns
          </Button>
          <Button variant="outline" onClick={() => window.open('/scheduler', '_blank')}>
            ↗ Go to Scheduler
          </Button>
        </div>
      </div>

      {/* ViVi Suggestions Card */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader className="flex flex-row items-center space-y-0 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-lg font-semibold text-purple-800">ViVi Suggests:</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-2 font-medium">{viviSuggestions.content}</p>
          <p className="text-sm text-gray-600 mb-2">Optimal Timing: {viviSuggestions.timing}</p>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <Hash className="w-3 h-3" />
            <span>Hashtags: {viviSuggestions.hashtags.join(", ")}</span>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Builder Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Define Objective */}
        <Card className={`transition-all duration-200 ${step >= 1 ? 'ring-2 ring-purple-200 shadow-lg' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <span>Define Objective</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <select 
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select campaign objective...</option>
              {objectives.map((obj) => (
                <option key={obj} value={obj}>{obj}</option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Step 2: Target Platforms */}
        <Card className={`transition-all duration-200 ${step >= 2 ? 'ring-2 ring-purple-200 shadow-lg' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <span>Target Platform(s)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => {
                const IconComponent = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                      isSelected 
                        ? `bg-gradient-to-r ${platform.color} text-white border-transparent shadow-lg transform scale-105` 
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Compose Content */}
        <Card className={`md:col-span-2 transition-all duration-200 ${step >= 3 ? 'ring-2 ring-purple-200 shadow-lg' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
                <span>Compose Content</span>
              </div>

            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <textarea
                rows={6}
                placeholder="Let ViVi help you or paste your draft here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={generateWithViVi}
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with ViVi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Scheduling */}
        <Card className={`md:col-span-2 transition-all duration-200 ${step >= 4 ? 'ring-2 ring-purple-200 shadow-lg' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 4 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                4
              </div>
              <span>Scheduling</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 mb-4">Choose post timing or auto-optimize with ViVi's forecast engine:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant={scheduleMode === 'auto' ? "default" : "outline"}
                onClick={() => setScheduleMode('auto')}
                className={`flex items-center justify-center space-x-2 h-12 ${
                  scheduleMode === 'auto' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Auto Schedule with ViVi</span>
                {scheduleMode === 'auto' && <CheckCircle className="w-4 h-4" />}
              </Button>
              <Button 
                variant={scheduleMode === 'manual' ? "default" : "outline"}
                onClick={() => setScheduleMode('manual')}
                className={`flex items-center justify-center space-x-2 h-12 ${
                  scheduleMode === 'manual' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Manual Schedule</span>
                {scheduleMode === 'manual' && <CheckCircle className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Launch Campaign Button */}
      <div className="flex justify-end pt-6">
        <Button 
          size="lg"
          onClick={handleLaunch}
          disabled={!objective || selectedPlatforms.length === 0 || !content}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3"
        >
          🎉 Launch Campaign
        </Button>
      </div>
    </div>
  );
};

export default CampaignsPage;