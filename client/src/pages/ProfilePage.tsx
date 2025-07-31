import { useAuth } from '@/hooks/useAuth';
import UserProfile from '@/components/UserProfile';
import SocialMediaManager from '@/components/SocialMediaManager';
import ViViChat from '@/components/ViViChat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, MessageSquare, Share2, Crown } from 'lucide-react';

export default function ProfilePage() {
  const { user, workspaces } = useAuth();
  const currentWorkspace = workspaces[0]; // Use first workspace for demo

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <p>Please log in to access your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome back, {user.firstName || user.username}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account, connect social media platforms, and chat with ViVi AI
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Social Media
            </TabsTrigger>
            <TabsTrigger value="vivi" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              ViVi AI
            </TabsTrigger>
            <TabsTrigger value="upgrade" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Upgrade
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>

          <TabsContent value="social">
            {currentWorkspace ? (
              <SocialMediaManager workspaceId={currentWorkspace.id} />
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p>No workspace found. Please contact support.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="vivi">
            {currentWorkspace ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>ViVi AI Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Content Generation</h3>
                        <p className="text-sm text-gray-600">
                          Generate engaging content for all your social media platforms with AI-powered optimization.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Campaign Analytics</h3>
                        <p className="text-sm text-gray-600">
                          Get AI-driven insights and recommendations to optimize your marketing campaigns.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Personalized Recommendations</h3>
                        <p className="text-sm text-gray-600">
                          Receive industry-specific marketing strategies tailored to your business goals.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <a
                        href="/vivi-test"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors"
                      >
                        Test ViVi AI Features
                      </a>
                    </div>
                  </CardContent>
                </Card>
                
                <ViViChat
                  workspaceId={currentWorkspace.id}
                  industry={currentWorkspace.industry}
                  persona={user.username}
                  currentPage="profile"
                />
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p>No workspace found. Please contact support.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upgrade">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Upgrade to Mavro Pro Max
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Current Plan: {user.subscription || 'Free Trial'}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Basic ViVi AI</span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>1 Workspace</span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Basic Analytics</span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>3 Social Accounts</span>
                        <span className="text-green-600">✓</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-purple-600">Pro Max Features</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Advanced ViVi AI</span>
                        <span className="text-purple-600">🚀</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Unlimited Workspaces</span>
                        <span className="text-purple-600">🚀</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Advanced Analytics</span>
                        <span className="text-purple-600">🚀</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Unlimited Social Accounts</span>
                        <span className="text-purple-600">🚀</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>AI-Powered Ad Campaigns</span>
                        <span className="text-purple-600">🚀</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Priority Support</span>
                        <span className="text-purple-600">🚀</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg text-center">
                  <h3 className="text-2xl font-bold mb-2">$99/month</h3>
                  <p className="text-gray-600 mb-4">Unlock the full power of Mavro Pro</p>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors">
                    Upgrade Now
                  </button>
                  <p className="text-xs text-gray-500 mt-2">30-day money-back guarantee</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}