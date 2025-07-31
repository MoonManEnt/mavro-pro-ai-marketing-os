import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, BarChart3, Calendar, Users, Target, Eye, Settings, TrendingUp } from 'lucide-react';

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

interface CampaignFeedGridProps {
  campaigns: Campaign[];
  onCampaignClick: (campaign: Campaign) => void;
  onToggleCampaign: (campaignId: string) => void;
}

const CampaignFeedGrid: React.FC<CampaignFeedGridProps> = ({
  campaigns,
  onCampaignClick,
  onToggleCampaign
}) => {
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
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <Card 
          key={campaign.campaignId}
          className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border-gray-200 bg-white"
          onClick={() => onCampaignClick(campaign)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-black text-lg text-gray-900 tracking-tight group-hover:text-purple-700 transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {campaign.description}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <Badge 
                  className={`text-xs font-medium border ${getStatusColor(campaign.status)}`}
                >
                  {campaign.status}
                </Badge>
                {campaign.abTestActive && (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                    A/B Test
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Platforms */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Platforms:</span>
              <div className="flex gap-1">
                {campaign.platforms.map((platform) => (
                  <span key={platform} className="text-lg">
                    {getPlatformIcon(platform)}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-600">Reach</span>
                </div>
                <p className="font-bold text-lg text-gray-900">
                  {formatNumber(campaign.totalReach)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-600">Engagement</span>
                </div>
                <p className="font-bold text-lg text-gray-900">
                  {formatNumber(campaign.engagement)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-gray-600">Duration</span>
                </div>
                <p className="font-bold text-sm text-gray-900">
                  {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-orange-600" />
                  <span className="text-xs text-gray-600">Posts</span>
                </div>
                <p className="font-bold text-lg text-gray-900">
                  {campaign.posts?.length || 0}
                </p>
              </div>
            </div>

            {/* CTA and Boost Level */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">CTA:</span>
                <Badge variant="outline" className="text-xs">
                  {campaign.primaryCTA}
                </Badge>
              </div>
              
              {campaign.boostLevel && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">Boost:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-full ${
                          level <= campaign.boostLevel! 
                            ? 'bg-purple-500' 
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCampaign(campaign.campaignId);
                }}
              >
                {campaign.status === 'Live' ? (
                  <>
                    <Pause className="w-3 h-3 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 mr-1" />
                    {campaign.status === 'Draft' ? 'Launch' : 'Resume'}
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle analytics view
                }}
              >
                <BarChart3 className="w-3 h-3" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle settings
                }}
              >
                <Settings className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CampaignFeedGrid;