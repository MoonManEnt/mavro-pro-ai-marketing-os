import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  Star, 
  Download, 
  Search, 
  Filter, 
  Check, 
  Crown,
  Lightbulb,
  BarChart3,
  MessageCircle,
  Camera,
  Globe,
  Calendar,
  DollarSign,
  Heart,
  Megaphone,
  FileText,
  Mail,
  Phone,
  Car,
  Dumbbell,
  Utensils,
  Stethoscope,
  Home,
  Mic,
  ArrowRight,
  Play,
  Settings,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface ViViStorePageProps {
  currentPersona: string;
}

interface ViViAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  isActive: boolean;
  isPremium: boolean;
  isPopular?: boolean;
  capabilities: string[];
  price: string;
  rating: number;
  downloads: string;
  personaRelevance: string[];
  tags: string[];
  previewImage?: string;
  demoAvailable?: boolean;
  leadGenCapable: boolean;
}

const ViViStorePage: React.FC<ViViStorePageProps> = ({ currentPersona }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<ViViAgent | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [installedAgents, setInstalledAgents] = useState<string[]>(['content-wizard', 'trend-scout']);

  const getPersonaAgents = (persona: string): ViViAgent[] => {
    const baseAgents: ViViAgent[] = [
      {
        id: 'content-wizard',
        name: 'Content Wizard',
        description: 'Generate high-converting content across all platforms with AI-powered creativity',
        category: 'Content Creation',
        icon: Sparkles,
        isActive: true,
        isPremium: false,
        isPopular: true,
        capabilities: ['Social Media Posts', 'Email Campaigns', 'Ad Copy', 'Video Scripts'],
        price: 'Free',
        rating: 4.8,
        downloads: '125K+',
        personaRelevance: ['all'],
        tags: ['content', 'ai', 'social media', 'marketing'],
        demoAvailable: true,
        leadGenCapable: true
      },
      {
        id: 'trend-scout',
        name: 'Trend Scout',
        description: 'Monitor and analyze trending topics in your industry for maximum engagement',
        category: 'Analytics',
        icon: TrendingUp,
        isActive: true,
        isPremium: false,
        capabilities: ['Trend Analysis', 'Industry Insights', 'Competitor Monitoring', 'Opportunity Alerts'],
        price: 'Free',
        rating: 4.6,
        downloads: '89K+',
        personaRelevance: ['all'],
        tags: ['analytics', 'trends', 'insights', 'monitoring'],
        demoAvailable: true,
        leadGenCapable: true
      }
    ];

    const personaSpecificAgents: Record<string, ViViAgent[]> = {
      kemar: [
        {
          id: 'speaker-booker',
          name: 'Speaker Booker Pro',
          description: 'AI-powered speaking engagement finder and proposal generator',
          category: 'Lead Generation',
          icon: Mic,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Event Discovery', 'Proposal Writing', 'Fee Negotiation', 'Travel Coordination'],
          price: '$79/month',
          rating: 4.9,
          downloads: '12K+',
          personaRelevance: ['kemar'],
          tags: ['speaking', 'events', 'bookings', 'proposals'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'thought-leader',
          name: 'Thought Leader Engine',
          description: 'Build your personal brand and establish industry authority',
          category: 'Brand Management',
          icon: Crown,
          isActive: false,
          isPremium: true,
          capabilities: ['Content Strategy', 'Personal Branding', 'Industry Positioning', 'Media Relations'],
          price: '$59/month',
          rating: 4.7,
          downloads: '8.3K+',
          personaRelevance: ['kemar'],
          tags: ['branding', 'authority', 'media', 'positioning'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'keynote-optimizer',
          name: 'Keynote Optimizer',
          description: 'Enhance presentation delivery with AI-powered speech analysis',
          category: 'Optimization',
          icon: Target,
          isActive: false,
          isPremium: true,
          capabilities: ['Speech Analysis', 'Audience Engagement', 'Slide Optimization', 'Delivery Coaching'],
          price: '$49/month',
          rating: 4.8,
          downloads: '15K+',
          personaRelevance: ['kemar'],
          tags: ['presentations', 'speaking', 'coaching', 'optimization'],
          demoAvailable: true,
          leadGenCapable: false
        }
      ],
      karen: [
        {
          id: 'property-hunter',
          name: 'Property Hunter AI',
          description: 'Advanced property discovery and market analysis for real estate professionals',
          category: 'Lead Generation',
          icon: Home,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Property Discovery', 'Market Analysis', 'Lead Qualification', 'Buyer Matching'],
          price: '$89/month',
          rating: 4.9,
          downloads: '22K+',
          personaRelevance: ['karen'],
          tags: ['real estate', 'properties', 'leads', 'analysis'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'listing-optimizer',
          name: 'Listing Optimizer Pro',
          description: 'Optimize property listings for maximum visibility and engagement',
          category: 'Optimization',
          icon: Star,
          isActive: false,
          isPremium: true,
          capabilities: ['Listing Enhancement', 'Photo Optimization', 'SEO Optimization', 'Performance Tracking'],
          price: '$49/month',
          rating: 4.6,
          downloads: '18K+',
          personaRelevance: ['karen'],
          tags: ['listings', 'optimization', 'seo', 'photos'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'client-nurture',
          name: 'Client Nurture Suite',
          description: 'Automated client relationship management and follow-up system',
          category: 'CRM',
          icon: Heart,
          isActive: false,
          isPremium: true,
          capabilities: ['Client Tracking', 'Automated Follow-ups', 'Relationship Building', 'Referral Generation'],
          price: '$69/month',
          rating: 4.7,
          downloads: '14K+',
          personaRelevance: ['karen'],
          tags: ['crm', 'clients', 'follow-up', 'referrals'],
          demoAvailable: true,
          leadGenCapable: true
        }
      ],
      sarah: [
        {
          id: 'beauty-booker',
          name: 'Beauty Booker AI',
          description: 'Smart appointment scheduling and client management for beauty professionals',
          category: 'Lead Generation',
          icon: Calendar,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Smart Scheduling', 'Client Management', 'Treatment Recommendations', 'Booking Optimization'],
          price: '$69/month',
          rating: 4.8,
          downloads: '31K+',
          personaRelevance: ['sarah'],
          tags: ['beauty', 'appointments', 'scheduling', 'clients'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'wellness-content',
          name: 'Wellness Content Creator',
          description: 'Create engaging wellness and beauty content that converts',
          category: 'Content Creation',
          icon: Sparkles,
          isActive: false,
          isPremium: true,
          capabilities: ['Wellness Content', 'Before/After Stories', 'Educational Posts', 'Treatment Promotions'],
          price: '$39/month',
          rating: 4.9,
          downloads: '25K+',
          personaRelevance: ['sarah'],
          tags: ['wellness', 'beauty', 'content', 'education'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'treatment-tracker',
          name: 'Treatment Tracker Pro',
          description: 'Track client treatments and optimize service offerings',
          category: 'Analytics',
          icon: Stethoscope,
          isActive: false,
          isPremium: true,
          capabilities: ['Treatment Tracking', 'Client Progress', 'Service Optimization', 'Outcome Analysis'],
          price: '$59/month',
          rating: 4.6,
          downloads: '16K+',
          personaRelevance: ['sarah'],
          tags: ['treatments', 'tracking', 'progress', 'analysis'],
          demoAvailable: true,
          leadGenCapable: false
        }
      ],
      marco: [
        {
          id: 'reservation-rocket',
          name: 'Reservation Rocket',
          description: 'Boost restaurant bookings with AI-powered reservation management',
          category: 'Lead Generation',
          icon: Utensils,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Reservation Management', 'Table Optimization', 'Customer Preferences', 'Booking Predictions'],
          price: '$79/month',
          rating: 4.8,
          downloads: '19K+',
          personaRelevance: ['marco'],
          tags: ['restaurant', 'reservations', 'bookings', 'tables'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'menu-optimizer',
          name: 'Menu Optimizer AI',
          description: 'Optimize menu items and pricing for maximum profitability',
          category: 'Optimization',
          icon: DollarSign,
          isActive: false,
          isPremium: true,
          capabilities: ['Menu Analysis', 'Price Optimization', 'Profit Maximization', 'Seasonal Adjustments'],
          price: '$49/month',
          rating: 4.7,
          downloads: '13K+',
          personaRelevance: ['marco'],
          tags: ['menu', 'pricing', 'profit', 'optimization'],
          demoAvailable: true,
          leadGenCapable: false
        },
        {
          id: 'food-photographer',
          name: 'Food Photo Enhancer',
          description: 'AI-powered food photography enhancement and social media optimization',
          category: 'Content Creation',
          icon: Camera,
          isActive: false,
          isPremium: true,
          capabilities: ['Photo Enhancement', 'Social Media Optimization', 'Food Styling Tips', 'Engagement Boosting'],
          price: '$29/month',
          rating: 4.9,
          downloads: '21K+',
          personaRelevance: ['marco'],
          tags: ['photography', 'food', 'social media', 'enhancement'],
          demoAvailable: true,
          leadGenCapable: true
        }
      ],
      alex: [
        {
          id: 'fitness-lead-gen',
          name: 'Fitness Lead Generator',
          description: 'Generate qualified fitness leads and convert them into clients',
          category: 'Lead Generation',
          icon: Dumbbell,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Lead Generation', 'Client Matching', 'Fitness Assessments', 'Program Recommendations'],
          price: '$69/month',
          rating: 4.8,
          downloads: '28K+',
          personaRelevance: ['alex'],
          tags: ['fitness', 'leads', 'clients', 'training'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'workout-creator',
          name: 'Workout Creator Pro',
          description: 'Create personalized workout plans and nutrition programs',
          category: 'Content Creation',
          icon: Lightbulb,
          isActive: false,
          isPremium: true,
          capabilities: ['Workout Plans', 'Nutrition Programs', 'Progress Tracking', 'Client Customization'],
          price: '$39/month',
          rating: 4.9,
          downloads: '35K+',
          personaRelevance: ['alex'],
          tags: ['workouts', 'nutrition', 'plans', 'fitness'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'transformation-tracker',
          name: 'Transformation Tracker',
          description: 'Track client transformations and create compelling success stories',
          category: 'Analytics',
          icon: BarChart3,
          isActive: false,
          isPremium: true,
          capabilities: ['Progress Tracking', 'Before/After Analysis', 'Success Stories', 'Client Motivation'],
          price: '$49/month',
          rating: 4.7,
          downloads: '17K+',
          personaRelevance: ['alex'],
          tags: ['transformation', 'progress', 'tracking', 'motivation'],
          demoAvailable: true,
          leadGenCapable: false
        }
      ],
      david: [
        {
          id: 'auto-lead-magnet',
          name: 'Auto Lead Magnet',
          description: 'Generate high-quality automotive leads and convert them to sales',
          category: 'Lead Generation',
          icon: Car,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Lead Generation', 'Vehicle Matching', 'Finance Options', 'Trade-in Analysis'],
          price: '$89/month',
          rating: 4.9,
          downloads: '16K+',
          personaRelevance: ['david'],
          tags: ['automotive', 'leads', 'sales', 'vehicles'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'inventory-optimizer',
          name: 'Inventory Optimizer',
          description: 'Optimize vehicle inventory and pricing for maximum profitability',
          category: 'Optimization',
          icon: Target,
          isActive: false,
          isPremium: true,
          capabilities: ['Inventory Management', 'Price Optimization', 'Market Analysis', 'Demand Forecasting'],
          price: '$79/month',
          rating: 4.6,
          downloads: '11K+',
          personaRelevance: ['david'],
          tags: ['inventory', 'pricing', 'optimization', 'automotive'],
          demoAvailable: true,
          leadGenCapable: false
        },
        {
          id: 'customer-follow-up',
          name: 'Customer Follow-up Pro',
          description: 'Automated customer follow-up and relationship management',
          category: 'CRM',
          icon: MessageCircle,
          isActive: false,
          isPremium: true,
          capabilities: ['Customer Follow-up', 'Service Reminders', 'Loyalty Programs', 'Referral Generation'],
          price: '$59/month',
          rating: 4.8,
          downloads: '14K+',
          personaRelevance: ['david'],
          tags: ['follow-up', 'crm', 'customers', 'loyalty'],
          demoAvailable: true,
          leadGenCapable: true
        }
      ]
    };

    return [...baseAgents, ...(personaSpecificAgents[persona] || [])];
  };

  const [agents] = useState<ViViAgent[]>(getPersonaAgents(currentPersona));

  const categories = ['all', 'Content Creation', 'Analytics', 'Lead Generation', 'Optimization', 'Brand Management', 'CRM'];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularAgents = agents.filter(agent => agent.isPopular);
  const freeAgents = agents.filter(agent => !agent.isPremium);

  const installAgent = (agentId: string) => {
    if (!installedAgents.includes(agentId)) {
      setInstalledAgents([...installedAgents, agentId]);
    }
  };

  const uninstallAgent = (agentId: string) => {
    setInstalledAgents(installedAgents.filter(id => id !== agentId));
  };

  const getPersonaTitle = (persona: string) => {
    const titles = {
      kemar: 'Speaking & Leadership Tools',
      karen: 'Real Estate Marketing Tools',
      sarah: 'Beauty & Wellness Tools',
      marco: 'Restaurant & Food Service Tools',
      alex: 'Fitness & Training Tools',
      david: 'Automotive Sales Tools'
    };
    return titles[persona as keyof typeof titles] || 'AI Marketing Tools';
  };

  const getPersonaDescription = (persona: string) => {
    const descriptions = {
      kemar: 'Supercharge your speaking career with AI-powered tools designed for thought leaders and professional speakers.',
      karen: 'Boost your real estate business with intelligent marketing tools that generate leads and close deals.',
      sarah: 'Grow your MedSpa with specialized tools for beauty professionals and wellness practitioners.',
      marco: 'Enhance your restaurant operations with AI tools designed for food service professionals.',
      alex: 'Build your fitness business with tools that help trainers attract and retain clients.',
      david: 'Accelerate your automotive sales with cutting-edge tools for car dealerships and sales professionals.'
    };
    return descriptions[persona as keyof typeof descriptions] || 'AI-powered marketing tools for your business.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white relative overflow-hidden mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Mavro Pro Max</h1>
                  <p className="text-blue-100 text-sm sm:text-lg line-clamp-2">ViVi Enhanced to her full capabilities and packed with more analytics & in-app social media power (i.e., ViVi Powered Ads Campaigns!)</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-2xl sm:text-3xl font-bold">{agents.length}</div>
                <div className="text-blue-100 text-sm">Available Agents</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-8 mt-4 sm:mt-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-semibold">{installedAgents.length}</div>
                <div className="text-blue-100 text-xs sm:text-sm">Installed</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-semibold">{freeAgents.length}</div>
                <div className="text-blue-100 text-xs sm:text-sm">Free Agents</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-semibold">{popularAgents.length}</div>
                <div className="text-blue-100 text-xs sm:text-sm">Popular</div>
              </div>
            </div>
            
            {/* Upgrade Plan Section */}
            <div className="mt-6 sm:mt-8 bg-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Power Up Mavro</h3>
                  <p className="text-blue-100 text-sm sm:text-base">World Class AI Marketing That Pulls The Best in AI Generation and Agency Available Today.</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-white">$199</div>
                    <div className="text-blue-100 text-sm">per month</div>
                  </div>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Advanced Features Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-sm sm:text-base mb-1">AI-Powered Personalized Onboarding Experience</h3>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-sm sm:text-base mb-1">Micro-Interaction Animation Library</h3>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-sm sm:text-base mb-1">Context-Aware UI Theme Selector</h3>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-sm sm:text-base mb-1">Gamified User Progress Tracker</h3>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-sm sm:text-base mb-1">Smart Contextual Tooltip System</h3>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 sm:p-4 flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base mb-1">Show Less</h3>
              <button className="text-purple-400 hover:text-purple-300">
                <ArrowRight className="w-4 h-4 transform rotate-90" />
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter - Mobile Optimized */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Filter className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Popular Agents - Mobile Optimized */}
        {popularAgents.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center px-1">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2" />
              <span className="line-clamp-1">Popular for {getPersonaTitle(currentPersona)}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {popularAgents.map((agent) => (
                <div key={agent.id} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <agent.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">{agent.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                          <span className="text-xs sm:text-sm text-gray-600">{agent.rating}</span>
                          <span className="text-xs sm:text-sm text-gray-400">({agent.downloads})</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
                      {agent.isPopular && (
                        <div className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium">
                          Popular
                        </div>
                      )}
                      {agent.leadGenCapable && (
                        <div className="bg-green-100 text-green-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium">
                          Lead Gen
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{agent.description}</p>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {agent.capabilities.slice(0, 2).map((capability, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs line-clamp-1">
                        {capability}
                      </span>
                    ))}
                    {agent.capabilities.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        +{agent.capabilities.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">{agent.price}</span>
                      {agent.isPremium && (
                        <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      {agent.demoAvailable && (
                        <button
                          onClick={() => {
                            setSelectedAgent(agent);
                            setShowDemo(true);
                          }}
                          className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-xs sm:text-sm"
                        >
                          <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Demo</span>
                        </button>
                      )}
                      {installedAgents.includes(agent.id) ? (
                        <button
                          onClick={() => uninstallAgent(agent.id)}
                          className="flex items-center space-x-1 bg-red-100 text-red-600 px-2 py-1 sm:px-3 sm:py-1 rounded-lg hover:bg-red-200 text-xs sm:text-sm"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => installAgent(agent.id)}
                          className="flex items-center space-x-1 bg-purple-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg hover:bg-purple-700 text-xs sm:text-sm"
                        >
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Install</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Agents - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 px-1">
            All Agents ({filteredAgents.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredAgents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <agent.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">{agent.name}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                        <span className="text-xs sm:text-sm text-gray-600">{agent.rating}</span>
                        <span className="text-xs sm:text-sm text-gray-400">({agent.downloads})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
                    {agent.isPopular && (
                      <div className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium">
                        Popular
                      </div>
                    )}
                    {agent.leadGenCapable && (
                      <div className="bg-green-100 text-green-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium">
                        Lead Gen
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{agent.description}</p>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {agent.capabilities.slice(0, 2).map((capability, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs line-clamp-1">
                      {capability}
                    </span>
                  ))}
                  {agent.capabilities.length > 2 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                      +{agent.capabilities.length - 2} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">{agent.price}</span>
                    {agent.isPremium && (
                      <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {agent.demoAvailable && (
                      <button
                        onClick={() => {
                          setSelectedAgent(agent);
                          setShowDemo(true);
                        }}
                        className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-xs sm:text-sm"
                      >
                        <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Demo</span>
                      </button>
                    )}
                    {installedAgents.includes(agent.id) ? (
                      <button
                        onClick={() => uninstallAgent(agent.id)}
                        className="flex items-center space-x-1 bg-red-100 text-red-600 px-2 py-1 sm:px-3 sm:py-1 rounded-lg hover:bg-red-200 text-xs sm:text-sm"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => installAgent(agent.id)}
                        className="flex items-center space-x-1 bg-purple-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg hover:bg-purple-700 text-xs sm:text-sm"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Install</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Modal - Mobile Optimized */}
        {showDemo && selectedAgent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <selectedAgent.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1">{selectedAgent.name} Demo</h3>
                      <p className="text-gray-600 text-sm sm:text-base">Interactive preview of capabilities</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDemo(false)}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                  >
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 transform rotate-45" />
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">What this agent can do:</h4>
                  <div className="space-y-2">
                    {selectedAgent.capabilities.map((capability, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">Demo Simulation</h4>
                  <p className="text-blue-800 mb-3 sm:mb-4 text-sm sm:text-base">
                    This agent would analyze your {currentPersona === 'kemar' ? 'speaking engagements' : 
                    currentPersona === 'karen' ? 'property listings' : 
                    currentPersona === 'sarah' ? 'client treatments' : 
                    currentPersona === 'marco' ? 'menu items' : 
                    currentPersona === 'alex' ? 'fitness programs' : 'vehicle inventory'} 
                    and provide actionable insights to improve your business results.
                  </p>
                  <div className="bg-white rounded-lg p-3 sm:p-4">
                    <div className="animate-pulse">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{selectedAgent.price}</div>
                  <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                    <button
                      onClick={() => setShowDemo(false)}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                    >
                      Close Demo
                    </button>
                    <button
                      onClick={() => {
                        installAgent(selectedAgent.id);
                        setShowDemo(false);
                      }}
                      className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-700 text-sm sm:text-base"
                    >
                      <Download className="w-4 h-4" />
                      <span>Install Agent</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViViStorePage;