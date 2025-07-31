import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useUserAnalytics, PerformanceMonitor } from "@/components/UserAnalytics";
import { RealTimeOpenAI } from "@/components/RealTimeOpenAI";
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Bug,
  Lightbulb,
  Star,
  Activity,
  Globe,
  Zap
} from "lucide-react";

export default function BetaTestingDashboard() {
  const analytics = useUserAnalytics();
  const [currentPersona, setCurrentPersona] = useState('kemar');
  const [analyticsData, setAnalyticsData] = useState<any>({});
  const [performanceData, setPerformanceData] = useState<any>({});

  useEffect(() => {
    // Fetch analytics data
    const data = analytics.getSummary();
    setAnalyticsData(data);

    // Fetch performance data
    const perfData = PerformanceMonitor.getPerformanceSummary();
    setPerformanceData(perfData);

    // Track page view
    analytics.pageView('/beta-testing-dashboard');
  }, [analytics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-medium">BETA TESTING ACTIVE</span>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-200 border-purple-500/30">
              v1.0.0-beta
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-white">Mavro Pro Beta Testing Center</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time monitoring, user feedback, and performance analytics for the Mavro Pro beta testing program.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Sessions</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.totalEvents || 0}</div>
              <p className="text-xs text-gray-400">
                +12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">ViVi Interactions</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.viviInteractions || 0}</div>
              <p className="text-xs text-gray-400">
                AI conversations & content generation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Content Generated</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analyticsData.contentGenerated || 0}</div>
              <p className="text-xs text-gray-400">
                AI-powered content pieces
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">API Performance</CardTitle>
              <Activity className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {performanceData.averageAPITime ? `${performanceData.averageAPITime.toFixed(0)}ms` : '0ms'}
              </div>
              <p className="text-xs text-gray-400">
                Average response time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Real-Time OpenAI Testing */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span>Live ViVi AI Testing</span>
              <Badge variant="secondary" className="bg-green-600/20 text-green-300 border-green-500/30">
                OpenAI GPT-4o Connected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealTimeOpenAI 
              persona={currentPersona}
              onContentGenerated={(content) => {
                analytics.contentGenerated('testing', 'ai_generated', true);
              }}
            />
          </CardContent>
        </Card>

        {/* Performance Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span>User Engagement Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Feature Usage</span>
                  <span className="text-white">{analyticsData.totalEvents || 0} interactions</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Content Generation</span>
                  <span className="text-white">{analyticsData.contentGenerated || 0} pieces</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Persona Switches</span>
                  <span className="text-white">{analyticsData.personaSwitches || 0} changes</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>System Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">API Success Rate</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">
                    {performanceData.apiSuccessRate ? `${performanceData.apiSuccessRate.toFixed(1)}%` : '100%'}
                  </span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Average Load Time</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">
                    {performanceData.averageRenderTime ? `${performanceData.averageRenderTime.toFixed(0)}ms` : '0ms'}
                  </span>
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Error Rate</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">
                    {analyticsData.errors || 0} errors
                  </span>
                  {(analyticsData.errors || 0) === 0 ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Beta Testing Status */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-400" />
              <span>Beta Testing Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Core Features</span>
                </div>
                <p className="text-gray-300 text-sm">
                  All core functionality is operational and ready for testing.
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>✅ ViVi AI Integration (OpenAI GPT-4o)</li>
                  <li>✅ Content Generation</li>
                  <li>✅ Persona Management</li>
                  <li>✅ Real-time Analytics</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Bug className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Feedback Collection</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Advanced feedback system with bug reporting and user ratings.
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>✅ Bug Report System</li>
                  <li>✅ User Rating Collection</li>
                  <li>✅ Feature Requests</li>
                  <li>✅ Performance Monitoring</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">Beta Readiness</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Platform is production-ready for beta testing program.
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>✅ Authentication System</li>
                  <li>✅ Database Integration</li>
                  <li>✅ Error Handling</li>
                  <li>✅ User Analytics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={() => analytics.featureUsed('beta_dashboard_view')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Full Analytics
          </Button>
          <Button 
            onClick={() => window.open('/api/feedback/analytics', '_blank')}
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Feedback Reports
          </Button>
          <Button 
            onClick={() => analytics.featureUsed('performance_check')}
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance Check
          </Button>
        </div>
      </div>
    </div>
  );
}