import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { agentAPI, analyticsAPI } from '../lib/api';
import { Brain, TrendingUp, Users, Zap, Settings, History, Play } from 'lucide-react';

interface DashboardStats {
  total_events: number;
  total_decisions: number;
  auto_executed_decisions: number;
  automation_rate: number;
  user_since: string;
}

interface AgentDecision {
  id: string;
  rule_id: string;
  action: string;
  confidence: number;
  auto_executed: boolean;
  timestamp: string;
  payload: any;
  rationale?: string;
}

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [decisions, setDecisions] = useState<AgentDecision[]>([]);
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsResponse, historyResponse] = await Promise.all([
        analyticsAPI.getDashboard(),
        agentAPI.getHistory(10)
      ]);
      
      setStats(statsResponse.data);
      setDecisions(historyResponse.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const runAgentAnalysis = async () => {
    setIsRunningAnalysis(true);
    try {
      const contextResponse = await agentAPI.getContext();
      const analysisResponse = await agentAPI.runAnalysis(contextResponse.data);
      
      await analyticsAPI.track({
        event_type: 'agent_analysis_triggered',
        event_data: { decisions_count: analysisResponse.data.length }
      });
      
      await loadDashboardData();
    } catch (error) {
      console.error('Failed to run agent analysis:', error);
    } finally {
      setIsRunningAnalysis(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 animate-pulse text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your ViVi dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">ViVi AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.username || user?.email}
              </span>
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Decisions</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_decisions || 0}</div>
              <p className="text-xs text-muted-foreground">
                AI-powered recommendations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Automation Rate</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((stats?.automation_rate || 0) * 100)}%
              </div>
              <Progress value={(stats?.automation_rate || 0) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Auto-Executed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.auto_executed_decisions || 0}</div>
              <p className="text-xs text-muted-foreground">
                Automated actions taken
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_events || 0}</div>
              <p className="text-xs text-muted-foreground">
                Tracked interactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="agent" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agent">ViVi Agent</TabsTrigger>
            <TabsTrigger value="history">Decision History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="agent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  ViVi AI Agent Control
                </CardTitle>
                <CardDescription>
                  Run AI analysis to get personalized marketing recommendations for your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Current Configuration</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700 font-medium">Business:</span>{' '}
                        {user?.business_name || 'Not set'}
                      </div>
                      <div>
                        <span className="text-blue-700 font-medium">Industry:</span>{' '}
                        {user?.industry || 'Not set'}
                      </div>
                      <div>
                        <span className="text-blue-700 font-medium">Location:</span>{' '}
                        {user?.geo_region || user?.geo_country || 'Not set'}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={runAgentAnalysis} 
                    disabled={isRunningAnalysis}
                    className="w-full"
                    size="lg"
                  >
                    {isRunningAnalysis ? (
                      <>
                        <Brain className="mr-2 h-4 w-4 animate-pulse" />
                        Running Analysis...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Run ViVi Analysis
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Recent Decisions
                </CardTitle>
                <CardDescription>
                  View your latest AI-generated marketing recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {decisions.length === 0 ? (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No decisions yet. Run your first analysis!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {decisions.map((decision) => (
                      <div key={decision.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant={decision.auto_executed ? "default" : "secondary"}>
                              {decision.auto_executed ? "Auto-executed" : "Manual"}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {new Date(decision.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm font-medium">
                            Confidence: {Math.round(decision.confidence * 100)}%
                          </div>
                        </div>
                        <h4 className="font-medium mb-1">{decision.action}</h4>
                        {decision.rationale && (
                          <p className="text-sm text-gray-600">{decision.rationale}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Update your business information to improve AI recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Username</label>
                      <p className="text-sm text-gray-600">{user?.username}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Business Name</label>
                      <p className="text-sm text-gray-600">{user?.business_name || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Industry</label>
                      <p className="text-sm text-gray-600">{user?.industry || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Country</label>
                      <p className="text-sm text-gray-600">{user?.geo_country || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Region</label>
                      <p className="text-sm text-gray-600">{user?.geo_region || 'Not set'}</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
