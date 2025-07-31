import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  Plus,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Users,
  TrendingUp
} from 'lucide-react';

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  isActive: boolean;
  connectedAt: string;
  lastSync: string;
  permissions: string[];
  followerCount: number;
  engagementRate: number;
}

interface SocialMediaManagerProps {
  workspaceId: string;
}

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Users,
  pinterest: Users,
  snapchat: Users,
};

const platformColors = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  facebook: 'bg-blue-600',
  twitter: 'bg-sky-500',
  linkedin: 'bg-blue-700',
  youtube: 'bg-red-600',
  tiktok: 'bg-black',
  pinterest: 'bg-red-500',
  snapchat: 'bg-yellow-500',
};

export default function SocialMediaManager({ workspaceId }: SocialMediaManagerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  // Get connected social accounts
  const { data: accounts, isLoading } = useQuery({
    queryKey: ['/api/social/accounts', workspaceId],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      const response = await apiRequest(`/api/social/accounts/${workspaceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.accounts as SocialAccount[];
    },
    enabled: !!workspaceId,
  });

  // Connect social account mutation
  const connectMutation = useMutation({
    mutationFn: async ({ platform, accountData }: { platform: string; accountData: any }) => {
      const token = localStorage.getItem('accessToken');
      return await apiRequest('/api/social/connect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          workspaceId,
          platform,
          accountData,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/social/accounts', workspaceId] });
      toast({
        title: 'Account Connected',
        description: 'Your social media account has been connected successfully!',
      });
      setConnectingPlatform(null);
    },
    onError: (error: any) => {
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect social media account',
        variant: 'destructive',
      });
      setConnectingPlatform(null);
    },
  });

  // Get insights mutation
  const insightsMutation = useMutation({
    mutationFn: async (platform?: string) => {
      const token = localStorage.getItem('accessToken');
      return await apiRequest('/api/social/insights', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          workspaceId,
          platform,
          dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            end: new Date().toISOString(),
          },
        }),
      });
    },
    onSuccess: (data) => {
      // Handle insights data
      console.log('Insights:', data);
    },
  });

  const handleConnectPlatform = (platform: string) => {
    setConnectingPlatform(platform);
    
    // Simulate OAuth flow - in production, this would redirect to the actual OAuth URL
    // For demo purposes, we'll create a mock successful connection
    setTimeout(() => {
      const mockAccountData = {
        username: `demo_${platform}_user`,
        accessToken: `mock_token_${Date.now()}`,
        refreshToken: `mock_refresh_${Date.now()}`,
        accountId: `${platform}_${Date.now()}`,
        permissions: ['read', 'write', 'manage'],
      };

      connectMutation.mutate({ platform, accountData: mockAccountData });
    }, 2000);
  };

  const getInsights = (platform?: string) => {
    insightsMutation.mutate(platform);
  };

  const connectedPlatforms = accounts?.map(acc => acc.platform) || [];
  const availablePlatforms = [
    'instagram',
    'facebook', 
    'twitter',
    'linkedin',
    'youtube',
    'tiktok',
    'pinterest',
    'snapchat'
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Social Media Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Social Media Accounts
            <Button
              onClick={() => getInsights()}
              variant="outline"
              size="sm"
              disabled={insightsMutation.isPending}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Get Insights
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Connected Accounts */}
          {accounts && accounts.length > 0 && (
            <div className="space-y-4 mb-6">
              <h3 className="font-medium text-sm text-gray-700">Connected Accounts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accounts.map((account) => {
                  const Icon = platformIcons[account.platform as keyof typeof platformIcons];
                  const colorClass = platformColors[account.platform as keyof typeof platformColors];
                  
                  return (
                    <Card key={account.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center text-white`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium capitalize">{account.platform}</p>
                              <p className="text-sm text-gray-600">@{account.username}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={account.isActive ? "default" : "secondary"}>
                              {account.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Followers</p>
                            <p className="font-medium">{account.followerCount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Engagement</p>
                            <p className="font-medium">{account.engagementRate}%</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                          <span>Last sync: {new Date(account.lastSync).toLocaleDateString()}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => getInsights(account.platform)}
                          >
                            <TrendingUp className="w-3 h-3 mr-1" />
                            View Insights
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Available Platforms to Connect */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700">
              {accounts && accounts.length > 0 ? 'Connect More Platforms' : 'Connect Your First Platform'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availablePlatforms
                .filter(platform => !connectedPlatforms.includes(platform))
                .map((platform) => {
                  const Icon = platformIcons[platform as keyof typeof platformIcons];
                  const colorClass = platformColors[platform as keyof typeof platformColors];
                  const isConnecting = connectingPlatform === platform;
                  
                  return (
                    <Button
                      key={platform}
                      variant="outline"
                      className="h-20 flex flex-col gap-2 hover:border-purple-300"
                      onClick={() => handleConnectPlatform(platform)}
                      disabled={isConnecting || connectMutation.isPending}
                    >
                      <div className={`w-8 h-8 rounded ${colorClass} flex items-center justify-center text-white`}>
                        {isConnecting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <span className="text-xs capitalize">
                        {isConnecting ? 'Connecting...' : platform}
                      </span>
                    </Button>
                  );
                })}
            </div>
          </div>

          {accounts && accounts.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="flex flex-col items-center gap-2">
                <Plus className="w-8 h-8 text-gray-400" />
                <p className="text-gray-600">No social media accounts connected yet</p>
                <p className="text-sm text-gray-500">Connect your first platform to start managing your social presence</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      {accounts && accounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {accounts.reduce((sum, acc) => sum + acc.followerCount, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {(accounts.reduce((sum, acc) => sum + acc.engagementRate, 0) / accounts.length).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">Avg Engagement</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{accounts.length}</p>
                <p className="text-sm text-gray-600">Connected Platforms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}