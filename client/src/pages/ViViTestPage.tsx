import React from 'react';
import PostSchedulerExample from '@/components/PostSchedulerExample';
import ViViChat from '@/components/ViViChat';
import ViViIntegrationStatus from '@/components/ViViIntegrationStatus';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Calendar, MessageSquare, Settings } from 'lucide-react';

export default function ViViTestPage() {
  const { user, workspaces } = useAuth();
  const currentWorkspace = workspaces?.[0];

  if (!user || !currentWorkspace) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <p>Please log in and create a workspace to test ViVi AI features.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            ViVi AI Testing Environment
          </h1>
          <p className="text-gray-600 mt-2">
            Test all ViVi AI features in a controlled environment
          </p>
        </div>

        {/* Integration Status */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold">Integration Status</h2>
          </div>
          <ViViIntegrationStatus />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Post Scheduler */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold">Post Scheduler with ViVi</h2>
            </div>
            <PostSchedulerExample />
          </div>

          {/* ViVi Chat */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">ViVi AI Chat</h2>
            </div>
            <ViViChat
              workspaceId={currentWorkspace.id}
              industry={currentWorkspace.industry}
              persona={user.username}
              currentPage="vivi-test"
            />
          </div>
        </div>

        {/* Testing Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Testing Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Post Scheduler Testing:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Enter post content (e.g., "Flash Sale on Facials")</li>
                  <li>• Select different post types</li>
                  <li>• Click "Generate & Schedule"</li>
                  <li>• Review ViVi's optimized content</li>
                  <li>• Use generated content or copy to clipboard</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">ViVi Chat Testing:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ask ViVi about marketing strategies</li>
                  <li>• Request content generation</li>
                  <li>• Click on quick action suggestions</li>
                  <li>• Review AI confidence metrics</li>
                  <li>• Test industry-specific responses</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Integration Status:</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>✅ ViVi Context Provider integrated with authentication</p>
                <p>✅ OpenAI API integration (with fallback for demo)</p>
                <p>✅ User workspace and persona context</p>
                <p>✅ Interaction tracking and analytics</p>
                <p>✅ Cross-platform content optimization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}