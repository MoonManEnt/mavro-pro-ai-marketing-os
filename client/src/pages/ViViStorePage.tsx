import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  Gift
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
      },
      {
        id: 'revenue-accelerator',
        name: 'Revenue Accelerator Pro',
        description: 'Universal revenue acceleration system for any business type',
        category: 'Business Accelerators',
        icon: DollarSign,
        isActive: false,
        isPremium: true,
        isPopular: true,
        capabilities: ['Revenue Optimization', 'Sales Funnel Automation', 'Pricing Strategy', 'Growth Analytics'],
        price: '$99/month',
        rating: 4.9,
        downloads: '45K+',
        personaRelevance: ['all'],
        tags: ['revenue', 'acceleration', 'sales', 'growth'],
        demoAvailable: true,
        leadGenCapable: true
      },
      {
        id: 'market-expansion-toolkit',
        name: 'Market Expansion Toolkit',
        description: 'Comprehensive toolkit for expanding into new markets and demographics',
        category: 'Business Accelerators',
        icon: Globe,
        isActive: false,
        isPremium: true,
        capabilities: ['Market Analysis', 'Expansion Strategy', 'Demographic Research', 'Competitive Intelligence'],
        price: '$149/month',
        rating: 4.8,
        downloads: '28K+',
        personaRelevance: ['all'],
        tags: ['market', 'expansion', 'strategy', 'intelligence'],
        demoAvailable: true,
        leadGenCapable: true
      },
      {
        id: 'executive-coaching-ai',
        name: 'Executive Coaching AI',
        description: 'AI-powered executive coaching and leadership development system',
        category: 'Business Accelerators',
        icon: Brain,
        isActive: false,
        isPremium: true,
        capabilities: ['Leadership Development', 'Executive Coaching', 'Decision Support', 'Performance Optimization'],
        price: '$199/month',
        rating: 4.9,
        downloads: '19K+',
        personaRelevance: ['all'],
        tags: ['executive', 'coaching', 'leadership', 'development'],
        demoAvailable: true,
        leadGenCapable: false
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
        },
        {
          id: 'speech-writer-ai',
          name: 'AI Speech Writer Pro',
          description: 'Generate compelling speeches and presentations using advanced AI technology',
          category: 'Content Creation',
          icon: FileText,
          isActive: false,
          isPremium: true,
          capabilities: ['Speech Generation', 'Topic Research', 'Audience Adaptation', 'Storytelling Enhancement'],
          price: '$69/month',
          rating: 4.6,
          downloads: '18K+',
          personaRelevance: ['kemar'],
          tags: ['speeches', 'writing', 'ai', 'presentations'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'media-pitch-master',
          name: 'Media Pitch Master',
          description: 'Craft perfect media pitches and secure speaking opportunities',
          category: 'Lead Generation',
          icon: Megaphone,
          isActive: false,
          isPremium: true,
          capabilities: ['Media Outreach', 'Pitch Crafting', 'Press Release Generation', 'Interview Prep'],
          price: '$89/month',
          rating: 4.8,
          downloads: '9.5K+',
          personaRelevance: ['kemar'],
          tags: ['media', 'pitching', 'publicity', 'interviews'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'speaking-fee-optimizer',
          name: 'Speaking Fee Optimizer',
          description: 'Maximize your speaking fees with data-driven pricing strategies',
          category: 'Analytics',
          icon: DollarSign,
          isActive: false,
          isPremium: true,
          capabilities: ['Fee Analysis', 'Market Research', 'Pricing Strategy', 'Negotiation Support'],
          price: '$99/month',
          rating: 4.9,
          downloads: '6.8K+',
          personaRelevance: ['kemar'],
          tags: ['pricing', 'fees', 'negotiation', 'strategy'],
          demoAvailable: true,
          leadGenCapable: false
        },
        {
          id: 'virtual-event-mastery',
          name: 'Virtual Event Mastery',
          description: 'Master virtual and hybrid speaking events with specialized tools',
          category: 'Optimization',
          icon: Globe,
          isActive: false,
          isPremium: true,
          capabilities: ['Virtual Setup', 'Engagement Tools', 'Tech Support', 'Audience Interaction'],
          price: '$59/month',
          rating: 4.7,
          downloads: '11K+',
          personaRelevance: ['kemar'],
          tags: ['virtual', 'online', 'events', 'technology'],
          demoAvailable: true,
          leadGenCapable: false
        },
        {
          id: 'business-accelerator-pro',
          name: 'Business Accelerator Pro',
          description: 'Accelerate your speaking business with comprehensive growth strategies and automation',
          category: 'Business Accelerators',
          icon: Zap,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Business Strategy', 'Revenue Optimization', 'Process Automation', 'Growth Analytics'],
          price: '$149/month',
          rating: 4.9,
          downloads: '8.5K+',
          personaRelevance: ['kemar'],
          tags: ['business', 'growth', 'acceleration', 'strategy'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'speaking-empire-builder',
          name: 'Speaking Empire Builder',
          description: 'Build and scale your speaking business into a multi-revenue stream empire',
          category: 'Business Accelerators',
          icon: Crown,
          isActive: false,
          isPremium: true,
          capabilities: ['Empire Building', 'Multiple Revenue Streams', 'Team Management', 'Brand Expansion'],
          price: '$199/month',
          rating: 4.8,
          downloads: '5.2K+',
          personaRelevance: ['kemar'],
          tags: ['empire', 'scaling', 'revenue', 'expansion'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'thought-leadership-accelerator',
          name: 'Thought Leadership Accelerator',
          description: 'Rapidly establish yourself as the go-to expert in your industry',
          category: 'Business Accelerators',
          icon: Brain,
          isActive: false,
          isPremium: true,
          capabilities: ['Authority Building', 'Media Positioning', 'Industry Influence', 'Expert Recognition'],
          price: '$99/month',
          rating: 4.7,
          downloads: '12K+',
          personaRelevance: ['kemar'],
          tags: ['authority', 'influence', 'expert', 'leadership'],
          demoAvailable: true,
          leadGenCapable: true
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
        },
        {
          id: 'market-analyzer-pro',
          name: 'Market Analyzer Pro',
          description: 'Advanced market intelligence and trend analysis for real estate professionals',
          category: 'Analytics',
          icon: BarChart3,
          isActive: false,
          isPremium: true,
          capabilities: ['Market Trends', 'Price Predictions', 'Comparative Analysis', 'Investment Insights'],
          price: '$79/month',
          rating: 4.8,
          downloads: '16K+',
          personaRelevance: ['karen'],
          tags: ['market', 'analysis', 'trends', 'predictions'],
          demoAvailable: true,
          leadGenCapable: false
        },
        {
          id: 'virtual-tour-creator',
          name: 'Virtual Tour Creator',
          description: 'Create immersive virtual tours and property showcases',
          category: 'Content Creation',
          icon: Camera,
          isActive: false,
          isPremium: true,
          capabilities: ['Virtual Tours', '3D Showcases', 'Interactive Walkthroughs', 'Video Production'],
          price: '$59/month',
          rating: 4.7,
          downloads: '13K+',
          personaRelevance: ['karen'],
          tags: ['virtual', 'tours', 'showcase', 'video'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'lead-magnet-generator',
          name: 'Lead Magnet Generator',
          description: 'Generate compelling lead magnets and buyer/seller guides',
          category: 'Lead Generation',
          icon: Megaphone,
          isActive: false,
          isPremium: true,
          capabilities: ['Lead Magnets', 'Buyer Guides', 'Market Reports', 'Educational Content'],
          price: '$39/month',
          rating: 4.6,
          downloads: '20K+',
          personaRelevance: ['karen'],
          tags: ['lead magnets', 'guides', 'education', 'content'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'referral-network-builder',
          name: 'Referral Network Builder',
          description: 'Build and manage a powerful referral network for consistent leads',
          category: 'CRM',
          icon: Users,
          isActive: false,
          isPremium: true,
          capabilities: ['Referral Tracking', 'Network Management', 'Automated Outreach', 'Relationship Building'],
          price: '$89/month',
          rating: 4.9,
          downloads: '10K+',
          personaRelevance: ['karen'],
          tags: ['referrals', 'network', 'relationships', 'outreach'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'real-estate-accelerator',
          name: 'Real Estate Accelerator',
          description: 'Accelerate your real estate business with advanced market intelligence and automation',
          category: 'Business Accelerators',
          icon: Zap,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Market Intelligence', 'Deal Automation', 'Lead Nurturing', 'Revenue Optimization'],
          price: '$129/month',
          rating: 4.9,
          downloads: '11K+',
          personaRelevance: ['karen'],
          tags: ['real estate', 'acceleration', 'market', 'automation'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'property-empire-builder',
          name: 'Property Empire Builder',
          description: 'Build your property investment and sales empire with strategic growth tools',
          category: 'Business Accelerators',
          icon: Crown,
          isActive: false,
          isPremium: true,
          capabilities: ['Empire Building', 'Investment Strategy', 'Portfolio Management', 'Team Scaling'],
          price: '$179/month',
          rating: 4.8,
          downloads: '7.3K+',
          personaRelevance: ['karen'],
          tags: ['empire', 'investment', 'portfolio', 'scaling'],
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
        },
        {
          id: 'client-education-hub',
          name: 'Client Education Hub',
          description: 'Educate clients about treatments and build trust through informative content',
          category: 'Content Creation',
          icon: Brain,
          isActive: false,
          isPremium: true,
          capabilities: ['Educational Content', 'Treatment Guides', 'FAQ Generation', 'Client Resources'],
          price: '$49/month',
          rating: 4.7,
          downloads: '19K+',
          personaRelevance: ['sarah'],
          tags: ['education', 'content', 'resources', 'trust'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'beauty-influencer-connector',
          name: 'Beauty Influencer Connector',
          description: 'Connect with beauty influencers for authentic partnerships and promotion',
          category: 'Brand Management',
          icon: Users,
          isActive: false,
          isPremium: true,
          capabilities: ['Influencer Matching', 'Partnership Management', 'Campaign Tracking', 'ROI Analysis'],
          price: '$89/month',
          rating: 4.6,
          downloads: '12K+',
          personaRelevance: ['sarah'],
          tags: ['influencers', 'partnerships', 'beauty', 'promotion'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'seasonal-promotions-ai',
          name: 'Seasonal Promotions AI',
          description: 'Create seasonal beauty campaigns and limited-time offers',
          category: 'Lead Generation',
          icon: Gift,
          isActive: false,
          isPremium: true,
          capabilities: ['Seasonal Campaigns', 'Promotional Offers', 'Limited-Time Deals', 'Holiday Marketing'],
          price: '$59/month',
          rating: 4.8,
          downloads: '15K+',
          personaRelevance: ['sarah'],
          tags: ['seasonal', 'promotions', 'campaigns', 'offers'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'wellness-community-builder',
          name: 'Wellness Community Builder',
          description: 'Build a loyal community of wellness enthusiasts around your brand',
          category: 'CRM',
          icon: Heart,
          isActive: false,
          isPremium: true,
          capabilities: ['Community Building', 'Engagement Strategies', 'Loyalty Programs', 'User-Generated Content'],
          price: '$79/month',
          rating: 4.9,
          downloads: '13K+',
          personaRelevance: ['sarah'],
          tags: ['community', 'loyalty', 'engagement', 'wellness'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'wellness-business-accelerator',
          name: 'Wellness Business Accelerator',
          description: 'Accelerate your wellness business with advanced client acquisition and retention strategies',
          category: 'Business Accelerators',
          icon: Zap,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Client Acquisition', 'Treatment Packages', 'Retention Strategies', 'Revenue Growth'],
          price: '$119/month',
          rating: 4.8,
          downloads: '9.8K+',
          personaRelevance: ['sarah'],
          tags: ['wellness', 'acceleration', 'clients', 'revenue'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'medspa-empire-builder',
          name: 'MedSpa Empire Builder',
          description: 'Build your wellness empire with multi-location scaling and advanced systems',
          category: 'Business Accelerators',
          icon: Crown,
          isActive: false,
          isPremium: true,
          capabilities: ['Multi-Location Scaling', 'Systems Automation', 'Staff Management', 'Brand Expansion'],
          price: '$199/month',
          rating: 4.9,
          downloads: '4.2K+',
          personaRelevance: ['sarah'],
          tags: ['empire', 'scaling', 'automation', 'wellness'],
          demoAvailable: true,
          leadGenCapable: true
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
        },
        {
          id: 'delivery-optimizer',
          name: 'Delivery Optimizer Pro',
          description: 'Optimize delivery operations and expand your restaurant reach',
          category: 'Optimization',
          icon: Car,
          isActive: false,
          isPremium: true,
          capabilities: ['Delivery Management', 'Route Optimization', 'Driver Coordination', 'Customer Communication'],
          price: '$69/month',
          rating: 4.6,
          downloads: '17K+',
          personaRelevance: ['marco'],
          tags: ['delivery', 'logistics', 'optimization', 'reach'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'customer-loyalty-builder',
          name: 'Customer Loyalty Builder',
          description: 'Build customer loyalty with personalized rewards and retention programs',
          category: 'CRM',
          icon: Heart,
          isActive: false,
          isPremium: true,
          capabilities: ['Loyalty Programs', 'Customer Segmentation', 'Personalized Offers', 'Retention Analytics'],
          price: '$59/month',
          rating: 4.8,
          downloads: '24K+',
          personaRelevance: ['marco'],
          tags: ['loyalty', 'retention', 'rewards', 'customers'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'event-catering-manager',
          name: 'Event Catering Manager',
          description: 'Manage catering events and expand your revenue streams',
          category: 'Lead Generation',
          icon: Calendar,
          isActive: false,
          isPremium: true,
          capabilities: ['Event Planning', 'Catering Management', 'Client Communication', 'Revenue Tracking'],
          price: '$89/month',
          rating: 4.7,
          downloads: '11K+',
          personaRelevance: ['marco'],
          tags: ['catering', 'events', 'revenue', 'management'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'social-media-chef',
          name: 'Social Media Chef',
          description: 'Create engaging culinary content for social media platforms',
          category: 'Content Creation',
          icon: MessageCircle,
          isActive: false,
          isPremium: true,
          capabilities: ['Content Creation', 'Recipe Sharing', 'Behind-the-Scenes', 'Community Building'],
          price: '$39/month',
          rating: 4.9,
          downloads: '29K+',
          personaRelevance: ['marco'],
          tags: ['social media', 'content', 'recipes', 'community'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'restaurant-accelerator',
          name: 'Restaurant Accelerator',
          description: 'Accelerate your restaurant business with advanced operations and marketing automation',
          category: 'Business Accelerators',
          icon: Zap,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Operations Automation', 'Marketing Campaigns', 'Customer Retention', 'Revenue Growth'],
          price: '$139/month',
          rating: 4.8,
          downloads: '8.7K+',
          personaRelevance: ['marco'],
          tags: ['restaurant', 'acceleration', 'operations', 'marketing'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'culinary-empire-builder',
          name: 'Culinary Empire Builder',
          description: 'Build your culinary empire with multi-location scaling and franchise systems',
          category: 'Business Accelerators',
          icon: Crown,
          isActive: false,
          isPremium: true,
          capabilities: ['Multi-Location Scaling', 'Franchise Systems', 'Brand Expansion', 'Operations Management'],
          price: '$189/month',
          rating: 4.9,
          downloads: '3.9K+',
          personaRelevance: ['marco'],
          tags: ['empire', 'culinary', 'franchise', 'scaling'],
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
        },
        {
          id: 'nutrition-coach-ai',
          name: 'Nutrition Coach AI',
          description: 'Provide personalized nutrition coaching and meal planning',
          category: 'Content Creation',
          icon: Heart,
          isActive: false,
          isPremium: true,
          capabilities: ['Meal Planning', 'Nutritional Analysis', 'Dietary Recommendations', 'Progress Monitoring'],
          price: '$59/month',
          rating: 4.8,
          downloads: '22K+',
          personaRelevance: ['alex'],
          tags: ['nutrition', 'coaching', 'meal planning', 'health'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'fitness-community-builder',
          name: 'Fitness Community Builder',
          description: 'Build an engaged fitness community around your brand',
          category: 'CRM',
          icon: Users,
          isActive: false,
          isPremium: true,
          capabilities: ['Community Building', 'Member Engagement', 'Challenge Creation', 'Social Features'],
          price: '$49/month',
          rating: 4.7,
          downloads: '19K+',
          personaRelevance: ['alex'],
          tags: ['community', 'engagement', 'fitness', 'social'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'online-trainer-platform',
          name: 'Online Trainer Platform',
          description: 'Create and manage online fitness training programs',
          category: 'Content Creation',
          icon: Globe,
          isActive: false,
          isPremium: true,
          capabilities: ['Online Training', 'Video Delivery', 'Progress Tracking', 'Client Management'],
          price: '$79/month',
          rating: 4.9,
          downloads: '14K+',
          personaRelevance: ['alex'],
          tags: ['online', 'training', 'platform', 'digital'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'fitness-challenge-creator',
          name: 'Fitness Challenge Creator',
          description: 'Create engaging fitness challenges to attract and retain clients',
          category: 'Lead Generation',
          icon: Target,
          isActive: false,
          isPremium: true,
          capabilities: ['Challenge Creation', 'Gamification', 'Progress Tracking', 'Community Building'],
          price: '$39/month',
          rating: 4.8,
          downloads: '26K+',
          personaRelevance: ['alex'],
          tags: ['challenges', 'gamification', 'engagement', 'fitness'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'fitness-business-accelerator',
          name: 'Fitness Business Accelerator',
          description: 'Accelerate your fitness business with advanced client acquisition and retention systems',
          category: 'Business Accelerators',
          icon: Zap,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Client Acquisition', 'Membership Growth', 'Retention Systems', 'Revenue Optimization'],
          price: '$129/month',
          rating: 4.9,
          downloads: '12K+',
          personaRelevance: ['alex'],
          tags: ['fitness', 'acceleration', 'membership', 'revenue'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'gym-empire-builder',
          name: 'Gym Empire Builder',
          description: 'Build your fitness empire with multi-location scaling and franchise systems',
          category: 'Business Accelerators',
          icon: Crown,
          isActive: false,
          isPremium: true,
          capabilities: ['Multi-Location Scaling', 'Franchise Development', 'Brand Expansion', 'Operations Management'],
          price: '$199/month',
          rating: 4.8,
          downloads: '6.1K+',
          personaRelevance: ['alex'],
          tags: ['empire', 'fitness', 'franchise', 'scaling'],
          demoAvailable: true,
          leadGenCapable: true
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
        },
        {
          id: 'vehicle-showcase-creator',
          name: 'Vehicle Showcase Creator',
          description: 'Create stunning vehicle showcases and virtual showrooms',
          category: 'Content Creation',
          icon: Camera,
          isActive: false,
          isPremium: true,
          capabilities: ['Vehicle Photography', 'Virtual Showrooms', '360° Views', 'Video Walkarounds'],
          price: '$69/month',
          rating: 4.7,
          downloads: '18K+',
          personaRelevance: ['david'],
          tags: ['showcase', 'photography', 'virtual', 'automotive'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'financing-calculator-pro',
          name: 'Financing Calculator Pro',
          description: 'Advanced financing calculations and payment options for customers',
          category: 'Optimization',
          icon: DollarSign,
          isActive: false,
          isPremium: true,
          capabilities: ['Payment Calculations', 'Loan Comparisons', 'Credit Analysis', 'Approval Predictions'],
          price: '$49/month',
          rating: 4.8,
          downloads: '21K+',
          personaRelevance: ['david'],
          tags: ['financing', 'payments', 'loans', 'credit'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'trade-in-evaluator',
          name: 'Trade-in Evaluator AI',
          description: 'Instantly evaluate trade-in values and negotiate better deals',
          category: 'Analytics',
          icon: RefreshCw,
          isActive: false,
          isPremium: true,
          capabilities: ['Trade-in Valuation', 'Market Comparisons', 'Condition Assessment', 'Negotiation Support'],
          price: '$39/month',
          rating: 4.6,
          downloads: '15K+',
          personaRelevance: ['david'],
          tags: ['trade-in', 'valuation', 'negotiation', 'automotive'],
          demoAvailable: true,
          leadGenCapable: false
        },
        {
          id: 'service-department-booster',
          name: 'Service Department Booster',
          description: 'Boost service department revenue with automated scheduling and upselling',
          category: 'Lead Generation',
          icon: Settings,
          isActive: false,
          isPremium: true,
          capabilities: ['Service Scheduling', 'Maintenance Reminders', 'Upselling Tools', 'Customer Retention'],
          price: '$79/month',
          rating: 4.9,
          downloads: '12K+',
          personaRelevance: ['david'],
          tags: ['service', 'maintenance', 'scheduling', 'upselling'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'auto-business-accelerator',
          name: 'Auto Business Accelerator',
          description: 'Accelerate your automotive business with advanced sales and inventory management systems',
          category: 'Business Accelerators',
          icon: Zap,
          isActive: false,
          isPremium: true,
          isPopular: true,
          capabilities: ['Sales Acceleration', 'Inventory Management', 'Customer Acquisition', 'Revenue Optimization'],
          price: '$149/month',
          rating: 4.8,
          downloads: '7.5K+',
          personaRelevance: ['david'],
          tags: ['automotive', 'acceleration', 'sales', 'inventory'],
          demoAvailable: true,
          leadGenCapable: true
        },
        {
          id: 'dealership-empire-builder',
          name: 'Dealership Empire Builder',
          description: 'Build your automotive empire with multi-location scaling and franchise systems',
          category: 'Business Accelerators',
          icon: Crown,
          isActive: false,
          isPremium: true,
          capabilities: ['Multi-Location Scaling', 'Dealership Networks', 'Brand Expansion', 'Operations Management'],
          price: '$199/month',
          rating: 4.9,
          downloads: '4.8K+',
          personaRelevance: ['david'],
          tags: ['empire', 'automotive', 'dealership', 'scaling'],
          demoAvailable: true,
          leadGenCapable: true
        }
      ]
    };

    return [...baseAgents, ...(personaSpecificAgents[persona] || [])];
  };

  const [agents, setAgents] = useState<ViViAgent[]>(getPersonaAgents(currentPersona));

  // Update agents when currentPersona changes
  useEffect(() => {
    setAgents(getPersonaAgents(currentPersona));
  }, [currentPersona]);

  const categories = ['all', 'Content Creation', 'Analytics', 'Lead Generation', 'Optimization', 'Brand Management', 'CRM', 'Business Accelerators'];

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
        {/* Header - Clean Modern Design */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-gray-900 relative overflow-hidden mb-6 sm:mb-8 shadow-xl border border-gray-200">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 text-gray-900">ViVi Agent Store</h1>
                  <p className="text-gray-600 text-sm sm:text-lg line-clamp-2">AI-powered marketing tools and automation agents to supercharge your business growth</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{agents.length}</div>
                <div className="text-gray-600 text-sm">Available Agents</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-8 mt-4 sm:mt-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-semibold text-gray-900">{installedAgents.length}</div>
                <div className="text-gray-600 text-xs sm:text-sm">Installed</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-semibold text-gray-900">{freeAgents.length}</div>
                <div className="text-gray-600 text-xs sm:text-sm">Free Agents</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-semibold text-gray-900">{popularAgents.length}</div>
                <div className="text-gray-600 text-xs sm:text-sm">Popular</div>
              </div>
            </div>
            
            {/* Upgrade Plan Section */}
            <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-200">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Upgrade to Pro</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Unlock premium agents and advanced automation features for accelerated growth.</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">$99</div>
                    <div className="text-gray-600 text-sm">per month</div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="bg-gray-50 rounded-xl p-6 sm:p-8 mb-6 sm:mb-8 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Premium Features Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">AI-Powered Analytics</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Advanced performance tracking and insights</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Automation Workflows</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Custom automated marketing sequences</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Advanced Integrations</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Connect with CRM and marketing tools</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Priority Support</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">24/7 dedicated customer success</p>
            </div>
          </div>
        </div>

        {/* Search and Filter - Clean Modern Design */}
        <div className="bg-white rounded-xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-lg border border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center px-1">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-3" />
              <span className="line-clamp-1">Popular for {getPersonaTitle(currentPersona)}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularAgents.map((agent) => (
                <div key={agent.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <agent.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">{agent.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                          <span className="text-xs sm:text-sm text-gray-600 font-medium">{agent.rating}</span>
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 px-1">
            All Agents ({filteredAgents.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
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