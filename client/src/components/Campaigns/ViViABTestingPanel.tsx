import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, StopCircle, Trophy, Target, TrendingUp, TrendingDown, BarChart3, Users, MousePointer, DollarSign } from 'lucide-react';

interface ABTestVariant {
  variantId: string;
  name: string;
  content: {
    headline: string;
    description: string;
    cta: string;
    image?: string;
    ctaColor?: string;
  };
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    conversionRate: number;
    cost: number;
  };
}

interface ABTest {
  testId: string;
  campaignId: string;
  testName: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  testDuration: number;
  confidenceLevel: number;
  trafficSplit: number;
  variantA: ABTestVariant;
  variantB: ABTestVariant;
  hypothesis: string;
  testType: 'content' | 'design' | 'creative';
  platforms: string[];
  winner?: 'variant_a' | 'variant_b' | null;
  significance?: number | null;
}

interface ViViABTestingPanelProps {
  campaignId: string;
  activeTests?: ABTest[];
  onStartTest?: (testId: string) => void;
  onPauseTest?: (testId: string) => void;
  onStopTest?: (testId: string) => void;
}

const ViViABTestingPanel: React.FC<ViViABTestingPanelProps> = ({
  campaignId,
  activeTests = [],
  onStartTest,
  onPauseTest,
  onStopTest
}) => {
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);

  // Sample A/B test data for demo
  const sampleTests: ABTest[] = [
    {
      testId: 'ab_test_001',
      campaignId,
      testName: 'Summer Wellness Headline Test',
      status: 'active',
      startDate: '2025-01-20T10:00:00Z',
      endDate: '2025-01-27T10:00:00Z',
      testDuration: 7,
      confidenceLevel: 95,
      trafficSplit: 50,
      variantA: {
        variantId: 'variant_a_001',
        name: 'Original Headline',
        content: {
          headline: 'Transform Your Skin This Summer',
          description: 'Professional wellness treatments for radiant skin',
          cta: 'Book Your Treatment',
          image: 'wellness-original.jpg'
        },
        metrics: {
          impressions: 2500,
          clicks: 180,
          conversions: 32,
          ctr: 7.2,
          conversionRate: 17.8,
          cost: 125.50
        }
      },
      variantB: {
        variantId: 'variant_b_001',
        name: 'Emotional Headline',
        content: {
          headline: 'Unlock Your Most Confident Self',
          description: 'Discover the transformation you deserve',
          cta: 'Start Your Journey',
          image: 'wellness-emotional.jpg'
        },
        metrics: {
          impressions: 2500,
          clicks: 215,
          conversions: 41,
          ctr: 8.6,
          conversionRate: 19.1,
          cost: 118.75
        }
      },
      hypothesis: 'Emotional headlines will drive higher engagement than feature-focused headlines',
      testType: 'content',
      platforms: ['instagram', 'facebook'],
      winner: null,
      significance: null
    },
    {
      testId: 'ab_test_002',
      campaignId,
      testName: 'CTA Button Color Test',
      status: 'completed',
      startDate: '2025-01-15T10:00:00Z',
      endDate: '2025-01-22T10:00:00Z',
      testDuration: 7,
      confidenceLevel: 95,
      trafficSplit: 50,
      variantA: {
        variantId: 'variant_a_002',
        name: 'Purple CTA',
        content: {
          headline: 'New Year, New You',
          description: 'Start your transformation journey today',
          cta: 'Get Started',
          ctaColor: '#8B5CF6',
          image: 'transformation-purple.jpg'
        },
        metrics: {
          impressions: 1800,
          clicks: 126,
          conversions: 18,
          ctr: 7.0,
          conversionRate: 14.3,
          cost: 89.25
        }
      },
      variantB: {
        variantId: 'variant_b_002',
        name: 'Green CTA',
        content: {
          headline: 'New Year, New You',
          description: 'Start your transformation journey today',
          cta: 'Get Started',
          ctaColor: '#10B981',
          image: 'transformation-green.jpg'
        },
        metrics: {
          impressions: 1800,
          clicks: 152,
          conversions: 28,
          ctr: 8.4,
          conversionRate: 18.4,
          cost: 82.50
        }
      },
      hypothesis: 'Green CTA buttons will perform better than purple due to positive psychological associations',
      testType: 'design',
      platforms: ['instagram'],
      winner: 'variant_b',
      significance: 96.2
    }
  ];

  const tests = activeTests.length > 0 ? activeTests : sampleTests;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatPercentage = (num: number) => `${num.toFixed(1)}%`;

  const formatCurrency = (num: number) => `$${num.toFixed(2)}`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWinnerVariant = (test: ABTest) => {
    if (!test.winner) return null;
    return test.winner === 'variant_a' ? test.variantA : test.variantB;
  };

  const getTestProgress = (test: ABTest) => {
    if (test.status === 'completed') return 100;
    if (test.status === 'draft') return 0;
    
    const startDate = new Date(test.startDate);
    const endDate = new Date(test.endDate);
    const now = new Date();
    
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  };

  const calculateLift = (variantA: ABTestVariant, variantB: ABTestVariant, metric: 'ctr' | 'conversionRate') => {
    const aValue = variantA.metrics[metric];
    const bValue = variantB.metrics[metric];
    const lift = ((bValue - aValue) / aValue) * 100;
    return lift;
  };

  return (
    <div className="p-8 space-y-8">
      {/* Executive Command Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-red-500 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl">
          <Target className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">ViVi A/B Testing Lab</h1>
          <p className="text-lg text-gray-600 font-medium">Scientific testing for maximum campaign performance</p>
        </div>
      </div>

      {/* Testing Strategy Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
        <div className="bg-gradient-to-br from-orange-50 via-red-50 to-red-100 rounded-2xl p-6 border border-orange-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-orange-900 tracking-tight mb-2">🧪 Testing Strategy Report</p>
              <p className="text-orange-800 font-medium leading-relaxed">
                "Running {tests.filter(t => t.status === 'active').length} active tests. 
                Statistical significance achieved on {tests.filter(t => t.significance && t.significance > 95).length} tests. 
                Ready to implement winning variants for immediate performance boost."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Tests Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Active Tests</span>
          </div>
          <p className="text-2xl font-black text-gray-900 tracking-tight">
            {tests.filter(t => t.status === 'active').length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Completed Tests</span>
          </div>
          <p className="text-2xl font-black text-gray-900 tracking-tight">
            {tests.filter(t => t.status === 'completed').length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Avg. Lift</span>
          </div>
          <p className="text-2xl font-black text-gray-900 tracking-tight">+18.5%</p>
        </div>
      </div>

      {/* Test Results Tabs */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <Tabs defaultValue="active" className="w-full">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <TabsList className="bg-white rounded-xl p-2 shadow-sm">
              <TabsTrigger value="active" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white font-bold">Active Tests</TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white font-bold">Completed Tests</TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white font-bold">Test Templates</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active" className="p-8 space-y-6">
            {tests.filter(t => t.status === 'active').map((test) => (
              <div key={test.testId} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <h4 className="text-xl font-black text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                      {test.testName}
                      <Badge className={`${getStatusColor(test.status)} text-white font-bold`}>
                        {test.status}
                      </Badge>
                    </h4>
                    <p className="text-gray-700 font-medium">{test.hypothesis}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onPauseTest?.(test.testId)}
                      className="hover:bg-yellow-50 hover:border-yellow-300"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onStopTest?.(test.testId)}
                      className="hover:bg-red-50 hover:border-red-300"
                    >
                      <StopCircle className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                </div>
              
                <div className="space-y-6">
                  {/* Test Progress */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="font-black text-blue-900 tracking-tight">Test Progress</span>
                      <span className="font-bold text-blue-800">{Math.round(getTestProgress(test))}% Complete</span>
                    </div>
                    <Progress value={getTestProgress(test)} className="h-3 bg-blue-200" />
                  </div>

                  {/* Variant Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Variant A */}
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-black text-gray-900 tracking-tight">{test.variantA.name}</h4>
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold">A</Badge>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <p className="text-sm font-medium text-gray-700">
                          <span className="font-black text-gray-900">Headline:</span> {test.variantA.content.headline}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          <span className="font-black text-gray-900">CTA:</span> {test.variantA.content.cta}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3">
                          <p className="text-xl font-black text-gray-900 tracking-tight">{formatNumber(test.variantA.metrics.impressions)}</p>
                          <p className="text-gray-600 font-medium">Impressions</p>
                        </div>
                        <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3">
                          <p className="text-xl font-black text-gray-900 tracking-tight">{formatPercentage(test.variantA.metrics.ctr)}</p>
                          <p className="text-gray-600 font-medium">CTR</p>
                        </div>
                        <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3">
                          <p className="text-xl font-black text-gray-900 tracking-tight">{test.variantA.metrics.conversions}</p>
                          <p className="text-gray-600 font-medium">Conversions</p>
                        </div>
                        <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3">
                          <p className="text-xl font-black text-gray-900 tracking-tight">{formatPercentage(test.variantA.metrics.conversionRate)}</p>
                          <p className="text-gray-600 font-medium">Conv. Rate</p>
                        </div>
                      </div>
                    </div>

                    {/* Variant B */}
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-black text-gray-900 tracking-tight">{test.variantB.name}</h4>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">B</Badge>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <p className="text-sm font-medium text-gray-700">
                          <span className="font-black text-gray-900">Headline:</span> {test.variantB.content.headline}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          <span className="font-black text-gray-900">CTA:</span> {test.variantB.content.cta}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3">
                          <p className="text-xl font-black text-gray-900 tracking-tight">{formatNumber(test.variantB.metrics.impressions)}</p>
                          <p className="text-gray-600 font-medium">Impressions</p>
                        </div>
                        <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3">
                          <div className="flex items-center justify-center gap-2">
                            <p className="text-xl font-black text-gray-900 tracking-tight">{formatPercentage(test.variantB.metrics.ctr)}</p>
                            {calculateLift(test.variantA, test.variantB, 'ctr') > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <p className="text-gray-600 font-medium">CTR</p>
                        </div>
                        <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3">
                          <p className="text-xl font-black text-gray-900 tracking-tight">{test.variantB.metrics.conversions}</p>
                          <p className="text-gray-600 font-medium">Conversions</p>
                        </div>
                        <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3">
                          <div className="flex items-center justify-center gap-2">
                            <p className="text-xl font-black text-gray-900 tracking-tight">{formatPercentage(test.variantB.metrics.conversionRate)}</p>
                            {calculateLift(test.variantA, test.variantB, 'conversionRate') > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <p className="text-gray-600 font-medium">Conv. Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Lift Summary */}
                  <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-2xl p-6 border border-gray-300">
                    <h5 className="text-lg font-black text-gray-900 tracking-tight mb-4">Performance Lift (B vs A)</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                        <span className="font-medium text-gray-700">CTR Lift:</span>
                        <Badge className={calculateLift(test.variantA, test.variantB, 'ctr') > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold' : 'bg-gradient-to-r from-red-500 to-red-600 text-white font-bold'}>
                          {calculateLift(test.variantA, test.variantB, 'ctr') > 0 ? '+' : ''}{formatPercentage(calculateLift(test.variantA, test.variantB, 'ctr'))}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                        <span className="font-medium text-gray-700">Conversion Lift:</span>
                        <Badge className={calculateLift(test.variantA, test.variantB, 'conversionRate') > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold' : 'bg-gradient-to-r from-red-500 to-red-600 text-white font-bold'}>
                          {calculateLift(test.variantA, test.variantB, 'conversionRate') > 0 ? '+' : ''}{formatPercentage(calculateLift(test.variantA, test.variantB, 'conversionRate'))}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </TabsContent>

          <TabsContent value="completed" className="p-8 space-y-6">
            {tests.filter(t => t.status === 'completed').map((test) => {
              const winner = getWinnerVariant(test);
              return (
                <div key={test.testId} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1">
                      <h4 className="text-xl font-black text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                        {test.testName}
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
                          Completed
                        </Badge>
                        {winner && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold">
                            <Trophy className="w-4 h-4 mr-2" />
                            Winner: {winner.name}
                          </Badge>
                        )}
                      </h4>
                      <p className="text-gray-700 font-medium">{test.hypothesis}</p>
                    </div>
                    <div className="text-right">
                      {test.significance && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-3 border border-blue-200">
                          <p className="text-lg font-black text-blue-900 tracking-tight">
                            {test.significance}% Confidence
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-2xl p-6 border-l-4 border-green-500">
                    <h5 className="text-lg font-black text-green-900 tracking-tight mb-3">Test Results</h5>
                    <p className="text-green-800 font-medium mb-4">
                      {winner?.name} achieved {formatPercentage(calculateLift(test.variantA, test.variantB, 'conversionRate'))} higher conversion rate
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Apply Winner to Campaign
                    </Button>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="templates" className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Headline A/B Test',
                  description: 'Test different headline approaches',
                  type: 'Content',
                  duration: '7 days',
                  minTraffic: '1,000 impressions',
                  gradient: 'from-blue-500 to-indigo-600'
                },
                {
                  name: 'CTA Button Test',
                  description: 'Test different call-to-action designs',
                  type: 'Design',
                  duration: '5 days',
                  minTraffic: '500 impressions',
                  gradient: 'from-green-500 to-emerald-600'
                },
                {
                  name: 'Image vs Video Test',
                  description: 'Compare static images with video content',
                  type: 'Creative',
                  duration: '10 days',
                  minTraffic: '2,000 impressions',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  name: 'Landing Page Test',
                  description: 'Test different landing page experiences',
                  type: 'Experience',
                  duration: '14 days',
                  minTraffic: '1,500 impressions',
                  gradient: 'from-orange-500 to-red-500'
                }
              ].map((template, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-black text-gray-900 tracking-tight mb-2">{template.name}</h4>
                      <p className="text-gray-700 font-medium">{template.description}</p>
                    </div>
                    <Badge className={`bg-gradient-to-r ${template.gradient} text-white font-bold`}>
                      {template.type}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 flex items-center gap-2">
                        <span className="text-2xl">⏱️</span>
                        <span className="font-medium text-gray-700">Duration: {template.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        <span className="font-medium text-gray-700">Min. Traffic: {template.minTraffic}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className={`w-full bg-gradient-to-r ${template.gradient} hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200`}
                  >
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ViViABTestingPanel;