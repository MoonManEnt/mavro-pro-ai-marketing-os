import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, TrendingUp, Users, Target, Zap, Globe, Sparkles, BarChart3, Brain, ChevronRight, Clock, Calendar, Star, Trophy, Award } from 'lucide-react';
import { ViViGeoTrendEngine } from './ai/ViViGeoTrendEngine.js';

interface GeoSmartDemoProps {
  currentPersona?: string;
}

const GeoSmartDemo: React.FC<GeoSmartDemoProps> = ({ currentPersona = 'kemar' }) => {
  const [personaData, setPersonaData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Get persona-specific data
  const getPersonaConfig = (persona: string) => {
    const configs = {
      kemar: {
        industry: 'Professional Speaking',
        zip: '10001',
        city: 'New York',
        county: 'Manhattan',
        state: 'NY',
        region: 'Northeast',
        brandVoice: 'Inspiring, authoritative, motivational',
        usageTier: 'Enterprise',
        voiceExamples: [
          'Transform your leadership potential into unstoppable impact.',
          'Every great leader starts with a single courageous decision.',
          'Your story has the power to inspire thousands.'
        ],
        businessType: 'Keynote Speaker & Leadership Coach'
      },
      karen: {
        industry: 'Real Estate',
        zip: '90210',
        city: 'Beverly Hills',
        county: 'Los Angeles',
        state: 'CA',
        region: 'West Coast',
        brandVoice: 'Professional, trustworthy, results-driven',
        usageTier: 'Pro',
        voiceExamples: [
          'Your dream home is just one conversation away.',
          'Luxury living meets exceptional service.',
          'Making your real estate dreams a reality.'
        ],
        businessType: 'Luxury Real Estate Agent'
      },
      sarah: {
        industry: 'Medical Aesthetics',
        zip: '33139',
        city: 'Miami Beach',
        county: 'Miami-Dade',
        state: 'FL',
        region: 'Southeast',
        brandVoice: 'Caring, professional, confidence-building',
        usageTier: 'Pro',
        voiceExamples: [
          'Reveal your natural beauty with confidence.',
          'Age gracefully with our advanced treatments.',
          'Your wellness journey starts with self-care.'
        ],
        businessType: 'Medical Spa Owner'
      },
      marco: {
        industry: 'Restaurant & Hospitality',
        zip: '60614',
        city: 'Chicago',
        county: 'Cook',
        state: 'IL',
        region: 'Midwest',
        brandVoice: 'Passionate, authentic, family-focused',
        usageTier: 'Pro',
        voiceExamples: [
          'Authentic Italian flavors from our family to yours.',
          'Every dish tells a story of tradition and love.',
          'Experience the heart of Italy in every bite.'
        ],
        businessType: 'Italian Restaurant Owner'
      },
      alex: {
        industry: 'Fitness & Wellness',
        zip: '78704',
        city: 'Austin',
        county: 'Travis',
        state: 'TX',
        region: 'South Central',
        brandVoice: 'Motivational, energetic, results-focused',
        usageTier: 'Pro',
        voiceExamples: [
          'Transform your body, transform your life.',
          'Every workout brings you closer to your goals.',
          'Strength comes from consistency, not perfection.'
        ],
        businessType: 'Fitness Coach & Gym Owner'
      },
      david: {
        industry: 'Automotive Sales',
        zip: '30309',
        city: 'Atlanta',
        county: 'Fulton',
        state: 'GA',
        region: 'Southeast',
        brandVoice: 'Knowledgeable, reliable, customer-focused',
        usageTier: 'Pro',
        voiceExamples: [
          'Finding the perfect vehicle for your lifestyle.',
          'Quality cars, exceptional service, unbeatable value.',
          'Your next adventure starts with the right car.'
        ],
        businessType: 'Automotive Dealer'
      }
    };
    return configs[persona as keyof typeof configs] || configs.kemar;
  };

  const initializeGeoSmart = async () => {
    setIsLoading(true);
    
    try {
      const config = getPersonaConfig(currentPersona);
      const personaId = `${config.industry.toLowerCase().replace(/\s+/g, '_')}_${config.state}`;
      
      // Step 1: Initialize Persona with Geographic Intelligence
      ViViGeoTrendEngine.initPersona(personaId, config);

      // Step 2: Fetch Local Trends + Competition
      await ViViGeoTrendEngine.updateTrends(
        config.zip, config.city, config.county, config.state, config.region, personaId
      );

      // Step 3: Adapt ViVi Voice
      ViViGeoTrendEngine.adaptVoice(personaId, config.voiceExamples);

      // Step 4: Generate Smart Actions
      const smartActionPlan = ViViGeoTrendEngine.generateProactiveActions(personaId);

      // Step 5: Get Interactive Data
      const displayData = ViViGeoTrendEngine.getInteractivePersonaData(personaId);

      setPersonaData({ ...displayData, smartActionPlan, businessType: config.businessType });
      setInitialized(true);
    } catch (error) {
      console.error('Error initializing GeoSmart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-initialize when persona changes
  useEffect(() => {
    if (currentPersona) {
      initializeGeoSmart();
    }
  }, [currentPersona]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-600">Initializing GeoSmart Engine...</p>
        </div>
      </div>
    );
  }

  if (!personaData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading geographic intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">GeoSmart™ Intelligence</h2>
              <p className="text-purple-100">
                {personaData.businessType} • {personaData.persona.location.city}, {personaData.persona.location.state}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-white/20 text-white border-white/30">
              {personaData.regionBadge}
            </Badge>
            <Badge className="bg-green-500/20 text-green-100 border-green-300/30">
              📊 {personaData.trendSignal}
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-100 border-yellow-300/30">
              🧠 {personaData.voiceMatch}
            </Badge>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'trends', label: 'Local Trends', icon: TrendingUp },
          { id: 'voice', label: 'Voice Profile', icon: Users },
          { id: 'actions', label: 'Smart Actions', icon: Zap }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Market Size</h3>
                <p className="text-sm text-gray-600">Annual revenue potential</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {personaData.marketInsights.marketSize}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">
                  {personaData.marketInsights.growthRate}
                </span>
              </div>
              <span className="text-sm text-gray-500">vs last year</span>
            </div>
          </div>

          {/* Demographics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Target Demographics</h3>
                <p className="text-sm text-gray-600">Primary customer profile</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Age Range:</span>
                <span className="text-sm text-gray-600 ml-2">
                  {personaData.marketInsights.demographics.primaryAge}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Income:</span>
                <span className="text-sm text-gray-600 ml-2">
                  {personaData.marketInsights.demographics.income}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Lifestyle:</span>
                <span className="text-sm text-gray-600 ml-2">
                  {personaData.marketInsights.demographics.lifestyle}
                </span>
              </div>
            </div>
          </div>

          {/* Peak Seasons */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Peak Seasons</h3>
                <p className="text-sm text-gray-600">Highest demand periods</p>
              </div>
            </div>
            <div className="space-y-2">
              {personaData.marketInsights.peakSeasons.map((season: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{season}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Market Opportunities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-3">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Market Opportunities</h3>
                <p className="text-sm text-gray-600">Trending opportunities in your market</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {personaData.marketInsights.opportunities.map((opportunity: string, index: number) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700">High Priority</span>
                  </div>
                  <p className="text-sm text-gray-700">{opportunity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personaData.topTrends.map((trend: any, index: number) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-purple-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{trend.keyword}</h3>
                    <p className="text-sm text-gray-600">Search Volume: {trend.volume}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Growth Rate:</span>
                  <span className="text-sm font-bold text-green-600">{trend.growth}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Competition:</span>
                  <Badge variant="outline" className="text-xs">
                    {trend.competition}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Opportunity:</span>
                  <Badge 
                    variant={trend.opportunity === 'Very High' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {trend.opportunity}
                  </Badge>
                </div>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-200">
                Create Campaign
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'voice' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Voice Profile */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Voice Profile</h3>
                <p className="text-sm text-gray-600">AI-analyzed brand voice characteristics</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Tone:</span>
                <div className="mt-1 p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-purple-700 font-medium">{personaData.voice.tone}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Style:</span>
                <div className="mt-1 p-3 bg-indigo-50 rounded-lg">
                  <span className="text-sm text-indigo-700 font-medium">{personaData.voice.style}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Key Words:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {personaData.voice.keywords.map((keyword: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Voice Examples */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Voice Examples</h3>
                <p className="text-sm text-gray-600">Brand voice in action</p>
              </div>
            </div>
            <div className="space-y-4">
              {personaData.voice.examples.map((example: string, index: number) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-sm text-gray-700 italic">"{example}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'actions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Suggestions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Content Suggestions</h3>
                <p className="text-sm text-gray-600">AI-generated content ideas</p>
              </div>
            </div>
            <div className="space-y-4">
              {personaData.smartActionPlan.contentSuggestions.map((suggestion: any, index: number) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {suggestion.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.platform}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{suggestion.content}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">{suggestion.engagement} Engagement</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Generation */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Lead Generation</h3>
                <p className="text-sm text-gray-600">Targeted strategies for your market</p>
              </div>
            </div>
            <div className="space-y-4">
              {personaData.smartActionPlan.leadGeneration.map((strategy: any, index: number) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{strategy.strategy}</h4>
                    <Badge variant="outline" className="text-xs">
                      {strategy.timeline}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{strategy.target}</p>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">{strategy.expectedLeads}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoSmartDemo;