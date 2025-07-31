import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Download, 
  MapPin, 
  TrendingUp, 
  Users, 
  Target,
  BarChart3,
  Calendar,
  Zap,
  ExternalLink,
  FileText
} from 'lucide-react';
import { 
  SiInstagram, 
  SiFacebook, 
  SiTiktok, 
  SiLinkedin,
  SiYoutube,
  SiX
} from 'react-icons/si';

interface DrillData {
  zipCode: string;
  city: string;
  state: string;
  overview: {
    totalReach: number;
    totalEngagement: number;
    engagementRate: number;
    activeCampaigns: number;
    totalPosts: number;
    conversionRate?: number;
  };
  campaigns: Array<{
    id: string;
    name: string;
    status: string;
    posts: number;
    reach: number;
    engagement: number;
    budget: number;
  }>;
  topPosts: Array<{
    id: string;
    platform: string;
    content: string;
    format: string;
    engagement: number;
    reach: number;
    date: string;
  }>;
  trends: {
    trendingTags: string[];
    trendingAudio: string[];
    demographics: {
      ageGroups: Array<{ age: string; percentage: number }>;
      interests: string[];
    };
  };
}

interface GeoSmartDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  zipCode: string | null;
  regionData: any;
}

const GeoSmartDrillModal: React.FC<GeoSmartDrillModalProps> = ({
  isOpen,
  onClose,
  zipCode,
  regionData
}) => {
  const [drillData, setDrillData] = useState<DrillData | null>(null);
  const [loading, setLoading] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);

  useEffect(() => {
    if (isOpen && zipCode) {
      loadDrillData();
    }
  }, [isOpen, zipCode]);

  const loadDrillData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vivi-extensions/geo-drill/${zipCode}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setDrillData(data.drillData);
        }
      } else {
        loadDemoDrillData();
      }
    } catch (error) {
      console.error('Failed to load drill data:', error);
      loadDemoDrillData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoDrillData = () => {
    if (!zipCode || !regionData) return;

    const demoDrillData: DrillData = {
      zipCode,
      city: regionData.city,
      state: regionData.state,
      overview: {
        totalReach: regionData.reach || 2500,
        totalEngagement: regionData.engagement || 125,
        engagementRate: regionData.engagementRate || 5.0,
        activeCampaigns: 3,
        totalPosts: 12,
        conversionRate: 3.2
      },
      campaigns: [
        {
          id: 'cmp_001',
          name: 'Summer Wellness Campaign',
          status: 'Live',
          posts: 5,
          reach: 1200,
          engagement: 68,
          budget: 850
        },
        {
          id: 'cmp_002',
          name: 'New Year Transformation',
          status: 'Scheduled',
          posts: 4,
          reach: 890,
          engagement: 42,
          budget: 620
        },
        {
          id: 'cmp_003',
          name: 'Spring Skincare Launch',
          status: 'Completed',
          posts: 3,
          reach: 410,
          engagement: 15,
          budget: 320
        }
      ],
      topPosts: [
        {
          id: 'post_001',
          platform: 'instagram',
          content: 'Transform your skin with our signature HydraFacial treatment ✨',
          format: 'Reel',
          engagement: 28,
          reach: 560,
          date: '2025-01-25'
        },
        {
          id: 'post_002',
          platform: 'tiktok',
          content: 'POV: You finally found the perfect medspa 💅',
          format: 'Video',
          engagement: 22,
          reach: 420,
          date: '2025-01-24'
        },
        {
          id: 'post_003',
          platform: 'facebook',
          content: 'New Year, New Skin! Book your consultation today',
          format: 'Post',
          engagement: 18,
          reach: 380,
          date: '2025-01-23'
        }
      ],
      trends: {
        trendingTags: regionData.trendingTag ? [regionData.trendingTag, '#skincare', '#wellness'] : ['#skincare', '#wellness', '#beauty'],
        trendingAudio: regionData.trendingAudio ? [regionData.trendingAudio, 'Trending Audio 2', 'Trending Audio 3'] : ['Popular Song 1', 'Popular Song 2', 'Popular Song 3'],
        demographics: {
          ageGroups: [
            { age: '18-24', percentage: 15 },
            { age: '25-34', percentage: 35 },
            { age: '35-44', percentage: 28 },
            { age: '45-54', percentage: 22 }
          ],
          interests: ['Skincare', 'Wellness', 'Beauty', 'Health', 'Anti-aging']
        }
      }
    };
    setDrillData(demoDrillData);
  };

  const handleExportPDF = async () => {
    setExportingPDF(true);
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would call an API to generate and download the PDF
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`GeoSmart Report for ${drillData?.city}, ${drillData?.state} (${drillData?.zipCode})`));
      element.setAttribute('download', `geosmart-report-${zipCode}.txt`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setExportingPDF(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getPlatformIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    const iconProps = { className: "w-4 h-4" };
    
    switch (platformLower) {
      case 'instagram':
        return <SiInstagram {...iconProps} style={{ color: '#E4405F' }} />;
      case 'facebook':
        return <SiFacebook {...iconProps} style={{ color: '#1877F2' }} />;
      case 'tiktok':
        return <SiTiktok {...iconProps} style={{ color: '#000000' }} />;
      case 'linkedin':
        return <SiLinkedin {...iconProps} style={{ color: '#0A66C2' }} />;
      case 'youtube':
        return <SiYoutube {...iconProps} style={{ color: '#FF0000' }} />;
      case 'x':
      case 'twitter':
        return <SiX {...iconProps} style={{ color: '#000000' }} />;
      default:
        return <Zap {...iconProps} className="text-purple-600" />;
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-lg"
        aria-describedby="geo-modal-description"
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-purple-600" />
            <div>
              <DialogTitle className="text-xl font-black text-gray-900">
                {drillData ? `${drillData.city}, ${drillData.state}` : 'Loading...'}
              </DialogTitle>
              <p id="geo-modal-description" className="text-sm text-gray-600">
                ZIP Code: {zipCode} • Detailed Regional Analysis
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleExportPDF}
              disabled={exportingPDF || !drillData}
              size="sm"
              variant="outline"
              className="text-xs"
            >
              <Download className="w-4 h-4 mr-1" />
              {exportingPDF ? 'Generating...' : 'Export PDF'}
            </Button>
            <Button onClick={onClose} size="sm" variant="ghost">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4 p-6">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : drillData ? (
          <div className="space-y-6 p-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-black text-blue-900">
                    {drillData.overview.totalReach.toLocaleString()}
                  </div>
                  <div className="text-xs text-blue-700 font-medium">Total Reach</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-black text-green-900">
                    {drillData.overview.engagementRate.toFixed(1)}%
                  </div>
                  <div className="text-xs text-green-700 font-medium">Engagement Rate</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-black text-purple-900">
                    {drillData.overview.activeCampaigns}
                  </div>
                  <div className="text-xs text-purple-700 font-medium">Active Campaigns</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-black text-orange-900">
                    {drillData.overview.conversionRate?.toFixed(1) || 'N/A'}%
                  </div>
                  <div className="text-xs text-orange-700 font-medium">Conversion Rate</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Campaigns */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Active Campaigns
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {drillData.campaigns.map((campaign) => (
                      <div key={campaign.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900 text-sm">{campaign.name}</h4>
                            <Badge className={`text-xs ${
                              campaign.status === 'Live' ? 'bg-green-100 text-green-800' :
                              campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {campaign.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="text-center">
                            <div className="text-gray-600">Posts</div>
                            <div className="font-semibold">{campaign.posts}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-600">Reach</div>
                            <div className="font-semibold">{campaign.reach.toLocaleString()}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-600">Engagement</div>
                            <div className="font-semibold">{campaign.engagement}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-600">Budget</div>
                            <div className="font-semibold">{formatCurrency(campaign.budget)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Posts */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    Top Performing Posts
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {drillData.topPosts.map((post, index) => (
                      <div key={post.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                                {getPlatformIcon(post.platform)}
                                <span className="text-xs font-medium capitalize">{post.platform}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">{post.format}</Badge>
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2 mb-2">{post.content}</p>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="text-center bg-gray-50 rounded p-1">
                                <div className="text-gray-600">Engagement</div>
                                <div className="font-semibold">{post.engagement}</div>
                              </div>
                              <div className="text-center bg-gray-50 rounded p-1">
                                <div className="text-gray-600">Reach</div>
                                <div className="font-semibold">{post.reach}</div>
                              </div>
                              <div className="text-center bg-gray-50 rounded p-1">
                                <div className="text-gray-600">Date</div>
                                <div className="font-semibold">{new Date(post.date).toLocaleDateString()}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trends and Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trending Content */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Trending Content
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Popular Hashtags</h4>
                    <div className="flex flex-wrap gap-2">
                      {drillData.trends.trendingTags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Trending Audio</h4>
                    <div className="space-y-1">
                      {drillData.trends.trendingAudio.map((audio, index) => (
                        <div key={index} className="text-sm text-gray-700 bg-gray-50 rounded p-2">
                          {audio}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Demographics */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Demographics & Interests
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Age Groups</h4>
                    <div className="space-y-2">
                      {drillData.trends.demographics.ageGroups.map((group) => (
                        <div key={group.age} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{group.age}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${group.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{group.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Top Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {drillData.trends.demographics.interests.map((interest, index) => (
                        <Badge key={index} className="text-xs bg-blue-100 text-blue-800">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No data available for this region</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GeoSmartDrillModal;