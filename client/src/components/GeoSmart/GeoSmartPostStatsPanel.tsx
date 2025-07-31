import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Calendar, 
  TrendingUp, 
  BarChart3,
  Play,
  Pause,
  CheckCircle,
  Zap
} from 'lucide-react';
import { 
  SiInstagram, 
  SiFacebook, 
  SiTiktok, 
  SiLinkedin,
  SiYoutube,
  SiX
} from 'react-icons/si';

interface GeoPost {
  postId: string;
  campaignId: string;
  platform: string;
  contentType: 'Reel' | 'Story' | 'Post' | 'Video' | 'Short';
  content: string;
  boostLevel: number;
  status: 'scheduled' | 'live' | 'completed';
  scheduledDate: string;
  engagementRate: number;
  reach: number;
  region: string;
  zipCode: string;
  preview?: string;
}

interface GeoSmartPostStatsPanelProps {
  selectedRegion?: string | null;
  selectedFilters: {
    campaigns: string[];
    formats: string[];
    boostLevels: number[];
    status: string[];
  };
  onFilterChange: (filters: any) => void;
}

const GeoSmartPostStatsPanel: React.FC<GeoSmartPostStatsPanelProps> = ({
  selectedRegion,
  selectedFilters,
  onFilterChange
}) => {
  const [posts, setPosts] = useState<GeoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'engagement' | 'reach'>('date');

  useEffect(() => {
    loadGeoPostData();
  }, [selectedRegion, selectedFilters]);

  const loadGeoPostData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedRegion) params.append('region', selectedRegion);
      if (selectedFilters.campaigns.length) params.append('campaigns', selectedFilters.campaigns.join(','));
      if (selectedFilters.status.length) params.append('status', selectedFilters.status.join(','));
      
      const response = await fetch(`/api/vivi-extensions/geo-posts?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPosts(data.posts || []);
        }
      } else {
        loadDemoPostData();
      }
    } catch (error) {
      console.error('Failed to load geo post data:', error);
      loadDemoPostData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoPostData = () => {
    const demoPosts: GeoPost[] = [
      {
        postId: 'post_001',
        campaignId: 'cmp_001',
        platform: 'instagram',
        contentType: 'Reel',
        content: 'Transform your skin with our signature HydraFacial treatment ✨',
        boostLevel: 3,
        status: 'live',
        scheduledDate: '2025-01-26T18:00:00.000Z',
        engagementRate: 5.2,
        reach: 2840,
        region: 'west_coast',
        zipCode: '90210',
        preview: 'Before & after transformation reel'
      },
      {
        postId: 'post_002',
        campaignId: 'cmp_001',
        platform: 'tiktok',
        contentType: 'Video',
        content: 'POV: You finally found the perfect medspa 💅 #skincare #transformation',
        boostLevel: 2,
        status: 'scheduled',
        scheduledDate: '2025-01-27T14:30:00.000Z',
        engagementRate: 7.8,
        reach: 1920,
        region: 'east_coast',
        zipCode: '10001',
        preview: 'Trending transformation video'
      },
      {
        postId: 'post_003',
        campaignId: 'cmp_002',
        platform: 'facebook',
        contentType: 'Post',
        content: 'New Year, New Skin! Book your consultation today for 20% off',
        boostLevel: 1,
        status: 'completed',
        scheduledDate: '2025-01-25T16:00:00.000Z',
        engagementRate: 3.4,
        reach: 3250,
        region: 'south',
        zipCode: '33139',
        preview: 'Promotional offer post'
      },
      {
        postId: 'post_004',
        campaignId: 'cmp_003',
        platform: 'instagram',
        contentType: 'Story',
        content: 'Behind the scenes: Our team preparing for your treatments',
        boostLevel: 1,
        status: 'live',
        scheduledDate: '2025-01-26T10:00:00.000Z',
        engagementRate: 4.1,
        reach: 1560,
        region: 'south',
        zipCode: '78704',
        preview: 'BTS story content'
      },
      {
        postId: 'post_005',
        campaignId: 'cmp_002',
        platform: 'youtube',
        contentType: 'Short',
        content: 'The science behind our advanced laser treatments',
        boostLevel: 2,
        status: 'scheduled',
        scheduledDate: '2025-01-28T12:00:00.000Z',
        engagementRate: 6.3,
        reach: 2180,
        region: 'midwest',
        zipCode: '60610',
        preview: 'Educational short video'
      }
    ];
    setPosts(demoPosts);
  };

  const getPlatformIcon = (platform: string) => {
    const iconProps = { className: "w-4 h-4" };
    
    switch (platform.toLowerCase()) {
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

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'text-purple-600 bg-purple-50';
      case 'facebook': return 'text-blue-600 bg-blue-50';
      case 'twitter': case 'x': return 'text-black bg-gray-50';
      case 'youtube': return 'text-red-600 bg-red-50';
      case 'tiktok': return 'text-black bg-gray-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBoostColor = (level: number) => {
    switch (level) {
      case 3: return 'text-red-600';
      case 2: return 'text-orange-600';
      case 1: return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredPosts = posts.filter(post => {
    if (searchTerm && !post.content.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedFilters.formats.length && !selectedFilters.formats.includes(post.contentType)) {
      return false;
    }
    if (selectedFilters.boostLevels.length && !selectedFilters.boostLevels.includes(post.boostLevel)) {
      return false;
    }
    if (selectedFilters.status.length && !selectedFilters.status.includes(post.status)) {
      return false;
    }
    return true;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'engagement':
        return b.engagementRate - a.engagementRate;
      case 'reach':
        return b.reach - a.reach;
      case 'date':
      default:
        return new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime();
    }
  });

  if (loading) {
    return (
      <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-black text-gray-900">Post Performance</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-black text-gray-900">Post Performance</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            {filteredPosts.length} Posts
          </Badge>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              variant={sortBy === 'date' ? 'default' : 'outline'}
              onClick={() => setSortBy('date')}
              className="text-xs"
            >
              <Calendar className="w-3 h-3 mr-1" />
              Date
            </Button>
            <Button
              size="sm"
              variant={sortBy === 'engagement' ? 'default' : 'outline'}
              onClick={() => setSortBy('engagement')}
              className="text-xs"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Engagement
            </Button>
            <Button
              size="sm"
              variant={sortBy === 'reach' ? 'default' : 'outline'}
              onClick={() => setSortBy('reach')}
              className="text-xs"
            >
              <BarChart3 className="w-3 h-3 mr-1" />
              Reach
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No posts found</p>
            </div>
          ) : (
            sortedPosts.map((post) => (
              <div
                key={post.postId}
                className="border border-gray-200 rounded-lg p-3 space-y-3 hover:shadow-md transition-shadow duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getPlatformColor(post.platform)}`}>
                      {getPlatformIcon(post.platform)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="text-xs capitalize">
                          {post.contentType}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(post.status)}`}>
                          {post.status}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(post.boostLevel)].map((_, i) => (
                            <Zap key={i} className={`w-3 h-3 ${getBoostColor(post.boostLevel)}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
                      {post.preview && (
                        <p className="text-xs text-gray-500 mt-1">{post.preview}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-xs text-gray-600">Engagement</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {post.engagementRate.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-xs text-gray-600">Reach</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {post.reach.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-xs text-gray-600">Scheduled</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {formatDate(post.scheduledDate)}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>ZIP: {post.zipCode}</span>
                  <span>Campaign: {post.campaignId}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeoSmartPostStatsPanel;