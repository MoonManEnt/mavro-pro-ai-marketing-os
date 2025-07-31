import React, { useState } from 'react';
import { X, Edit3, Play, Pause, BarChart3, Calendar, Users, Target, Eye, TrendingUp, Settings, Plus, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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

interface CampaignDetailDrawerProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCampaign: (campaign: Campaign) => void;
  onUpdatePost: (post: ScheduledPost) => void;
}

const CampaignDetailDrawer: React.FC<CampaignDetailDrawerProps> = ({
  campaign,
  isOpen,
  onClose,
  onUpdateCampaign,
  onUpdatePost
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'analytics' | 'settings'>('overview');
  const [editMode, setEditMode] = useState(false);
  const [editedCampaign, setEditedCampaign] = useState<Campaign | null>(null);

  // Sample posts data for demo
  const samplePosts: ScheduledPost[] = [
    {
      postId: 'post_001',
      campaignId: campaign?.campaignId || '',
      status: 'posted',
      platform: 'instagram',
      content: 'Transform your skin this summer with our exclusive wellness treatments! ✨',
      hashtags: ['#wellness', '#skincare', '#summer', '#transformation'],
      scheduledAt: '2025-01-25T19:00:00Z',
      boostLevel: 2,
      autoApproved: true,
      metrics: {
        reach: 5000,
        engagement: 400,
        clicks: 45,
        shares: 12
      }
    },
    {
      postId: 'post_002',
      campaignId: campaign?.campaignId || '',
      status: 'scheduled',
      platform: 'facebook',
      content: 'Ready for radiant summer skin? Book your consultation today!',
      hashtags: ['#skincare', '#beauty', '#consultation'],
      scheduledAt: '2025-01-28T18:00:00Z',
      boostLevel: 2,
      autoApproved: true
    }
  ];

  React.useEffect(() => {
    if (campaign && editMode) {
      setEditedCampaign({ ...campaign });
    }
  }, [campaign, editMode]);

  if (!isOpen || !campaign) return null;

  const handleSave = () => {
    if (editedCampaign) {
      onUpdateCampaign(editedCampaign);
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditedCampaign(null);
    setEditMode(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-800 border-green-200';
      case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Archived': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlatformIcon = (platform: string) => {
    const platformIcons: Record<string, string> = {
      instagram: '📸',
      facebook: '👥',
      linkedin: '💼',
      tiktok: '🎵',
      x: '🐦',
      youtube: '📺',
      email: '📧'
    };
    return platformIcons[platform] || '🌐';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-end">
      <div className="w-full max-w-2xl h-full bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                {editMode ? 'Edit Campaign' : campaign.title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </Badge>
                {campaign.abTestActive && (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                    A/B Testing Active
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!editMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(true)}
              >
                <Edit3 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: Target },
            { id: 'posts', label: 'Posts', icon: Calendar },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {editMode ? (
                // Edit Form
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Campaign Title</Label>
                    <Input
                      id="title"
                      value={editedCampaign?.title || ''}
                      onChange={(e) => setEditedCampaign(prev => 
                        prev ? { ...prev, title: e.target.value } : null
                      )}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={editedCampaign?.description || ''}
                      onChange={(e) => setEditedCampaign(prev => 
                        prev ? { ...prev, description: e.target.value } : null
                      )}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cta">Primary CTA</Label>
                    <Input
                      id="cta"
                      value={editedCampaign?.primaryCTA || ''}
                      onChange={(e) => setEditedCampaign(prev => 
                        prev ? { ...prev, primaryCTA: e.target.value } : null
                      )}
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // Overview Content
                <>
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">Total Reach</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(campaign.totalReach)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">Engagement</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(campaign.engagement)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-600">Posts</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {campaign.posts?.length || 0}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-gray-600">Platforms</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {campaign.platforms.length}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Campaign Details */}
                  <Card>
                    <CardHeader>
                      <h3 className="font-bold text-lg">Campaign Details</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <span className="text-sm text-gray-600">Description:</span>
                        <p className="text-gray-900 mt-1">{campaign.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">Start Date:</span>
                          <p className="text-gray-900">{formatDate(campaign.startDate)}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">End Date:</span>
                          <p className="text-gray-900">{formatDate(campaign.endDate)}</p>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-600">Primary CTA:</span>
                        <p className="text-gray-900">{campaign.primaryCTA}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-600">Platforms:</span>
                        <div className="flex gap-2 mt-1">
                          {campaign.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" className="flex items-center gap-1">
                              <span>{getPlatformIcon(platform)}</span>
                              <span className="capitalize">{platform}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Campaign Posts</h3>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Post
                </Button>
              </div>
              
              <div className="space-y-3">
                {samplePosts.map((post) => (
                  <Card key={post.postId} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                            <Badge 
                              className={`text-xs ${
                                post.status === 'posted' 
                                  ? 'bg-green-100 text-green-800' 
                                  : post.status === 'scheduled'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {post.status}
                            </Badge>
                            <span className="text-sm text-gray-500 capitalize">{post.platform}</span>
                          </div>
                          
                          <p className="text-gray-900 mb-2 line-clamp-2">{post.content}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>📅 {formatDate(post.scheduledAt)}</span>
                            {post.metrics && (
                              <>
                                <span>👁️ {formatNumber(post.metrics.reach)}</span>
                                <span>❤️ {formatNumber(post.metrics.engagement)}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg">Campaign Analytics</h3>
              
              {/* Performance Chart Placeholder */}
              <Card>
                <CardHeader>
                  <h4 className="font-semibold">Performance Overview</h4>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Analytics charts will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Platform Breakdown */}
              <Card>
                <CardHeader>
                  <h4 className="font-semibold">Platform Performance</h4>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {campaign.platforms.map((platform) => (
                      <div key={platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getPlatformIcon(platform)}</span>
                          <span className="font-medium capitalize">{platform}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatNumber(Math.floor(campaign.totalReach / campaign.platforms.length))}</p>
                          <p className="text-sm text-gray-500">reach</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg">Campaign Settings</h3>
              
              <Card>
                <CardHeader>
                  <h4 className="font-semibold">Campaign Actions</h4>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    {campaign.status === 'Live' ? 'Pause Campaign' : 'Launch Campaign'}
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Campaign Details
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Posts
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <X className="w-4 h-4 mr-2" />
                    Archive Campaign
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailDrawer;