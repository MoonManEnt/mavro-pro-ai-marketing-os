import React, { useState, useEffect } from 'react';
import { Users, Phone, Mail, Calendar, DollarSign, TrendingUp, Plus, Filter, Search, MoreHorizontal, Edit, Trash2, MessageSquare, Star, Clock, Target, User, Building, MapPin, Activity, Brain, Zap, ChartBar, Send, Bot, AlertCircle, CheckCircle, XCircle, Timer, AlertTriangle } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  source: 'website' | 'social' | 'referral' | 'event' | 'cold-outreach' | 'linkedin';
  value: number;
  lastContact: string;
  nextFollowUp?: string;
  notes: string;
  tags: string[];
  persona: string;
  priority: 'high' | 'medium' | 'low';
  stage: string;
  // ViVi AI Enhanced Fields
  campaignAttribution?: {
    campaignId: string;
    campaignName: string;
    platform: string;
    contentType: string;
    touchpoints: number;
  };
  viviScore?: number; // AI engagement score 0-100
  viviRecommendations?: string[];
  autoFollowUp?: boolean;
  lastViviAction?: string;
  engagementHistory?: {
    date: string;
    type: 'email' | 'call' | 'meeting' | 'social' | 'content_view';
    platform?: string;
    duration?: number;
    outcome: 'positive' | 'neutral' | 'negative';
  }[];
  leadTemperature?: 'hot' | 'warm' | 'cold';
  predictedCloseDate?: string;
  lifeTimeValue?: number;
}

interface CRMPageProps {
  currentPersona: string;
}

interface ViViInsight {
  id: string;
  contactId: string;
  type: 'follow_up' | 'upsell' | 'content_engagement' | 'temperature_change';
  priority: 'high' | 'medium' | 'low';
  message: string;
  actionable: boolean;
  suggestedAction: string;
  confidence: number;
  createdAt: string;
}

interface ViViAutomation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  isActive: boolean;
  contactsAffected: number;
}

const CRMPage: React.FC<CRMPageProps> = ({ currentPersona }) => {
  // For demo purposes, show all sample data
  const actualBetaUser = false;
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'leads' | 'prospects' | 'customers' | 'vivi-insights'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [viviInsights, setViviInsights] = useState<ViViInsight[]>([]);
  const [viviAutomations, setViviAutomations] = useState<ViViAutomation[]>([]);
  const [showViviPanel, setShowViviPanel] = useState(false);

  useEffect(() => {
    // For beta users, show empty state; for demo users, generate persona-specific contacts
    if (actualBetaUser) {
      setContacts([]);
      return;
    }
    
    const generateContacts = () => {
      const baseContacts: Record<string, Contact[]> = {
        kemar: [
          {
            id: 'contact-001',
            name: 'Jennifer Martinez',
            email: 'jennifer.martinez@techcorp.com',
            phone: '(555) 123-4567',
            company: 'TechCorp Solutions',
            position: 'VP of Operations',
            status: 'prospect',
            source: 'linkedin',
            value: 15000,
            lastContact: '2025-01-10',
            nextFollowUp: '2025-01-15',
            notes: 'Interested in executive coaching program. Has budget approval for Q1. Wants to discuss team leadership development.',
            tags: ['executive-coaching', 'leadership', 'high-value'],
            persona: 'kemar',
            priority: 'high',
            stage: 'Proposal Sent',
            campaignAttribution: {
              campaignId: 'camp-001',
              campaignName: 'Leadership Excellence LinkedIn Campaign',
              platform: 'LinkedIn',
              contentType: 'Video Post',
              touchpoints: 3
            },
            viviScore: 87,
            viviRecommendations: ['Send executive coaching case study', 'Schedule call within 48 hours', 'Offer team assessment'],
            autoFollowUp: true,
            lastViviAction: 'Sent personalized LinkedIn message with leadership insights',
            engagementHistory: [
              { date: '2025-01-10', type: 'email', duration: 0, outcome: 'positive' },
              { date: '2025-01-08', type: 'social', platform: 'LinkedIn', duration: 120, outcome: 'positive' },
              { date: '2025-01-05', type: 'content_view', platform: 'Website', duration: 480, outcome: 'positive' }
            ],
            leadTemperature: 'hot',
            predictedCloseDate: '2025-01-25',
            lifeTimeValue: 45000
          },
          {
            id: 'contact-002',
            name: 'Michael Chen',
            email: 'mchen@innovatetech.com',
            phone: '(555) 234-5678',
            company: 'InnovateTech',
            position: 'CEO',
            status: 'lead',
            source: 'website',
            value: 25000,
            lastContact: '2025-01-08',
            nextFollowUp: '2025-01-12',
            notes: 'Attended leadership summit. Needs help with organizational restructuring. Follow up on keynote speaking opportunity.',
            tags: ['keynote-speaking', 'org-development', 'ceo'],
            persona: 'kemar',
            priority: 'high',
            stage: 'Initial Contact',
            campaignAttribution: {
              campaignId: 'camp-002',
              campaignName: 'CEO Keynote Speaker Outreach',
              platform: 'Website',
              contentType: 'Event Page',
              touchpoints: 2
            },
            viviScore: 92,
            viviRecommendations: ['Send keynote speaking portfolio', 'Offer free 15-min consultation', 'Connect on LinkedIn'],
            autoFollowUp: true,
            lastViviAction: 'Scheduled follow-up email with speaking testimonials',
            engagementHistory: [
              { date: '2025-01-08', type: 'meeting', duration: 3600, outcome: 'positive' },
              { date: '2025-01-06', type: 'email', duration: 0, outcome: 'positive' }
            ],
            leadTemperature: 'hot',
            predictedCloseDate: '2025-01-20',
            lifeTimeValue: 75000
          },
          {
            id: 'contact-003',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@globalcorp.com',
            phone: '(555) 345-6789',
            company: 'GlobalCorp',
            position: 'Chief People Officer',
            status: 'customer',
            source: 'referral',
            value: 35000,
            lastContact: '2025-01-05',
            nextFollowUp: '2025-01-20',
            notes: 'Completed 6-month executive coaching program. Excellent results. Interested in team coaching for her direct reports.',
            tags: ['repeat-customer', 'team-coaching', 'success-story'],
            persona: 'kemar',
            priority: 'medium',
            stage: 'Upsell Opportunity',
            viviScore: 95,
            viviRecommendations: ['Present team coaching package', 'Offer loyalty discount', 'Schedule team assessment'],
            autoFollowUp: true,
            lastViviAction: 'Sent team coaching success stories and pricing',
            engagementHistory: [
              { date: '2025-01-05', type: 'call', duration: 1800, outcome: 'positive' },
              { date: '2024-12-20', type: 'meeting', duration: 3600, outcome: 'positive' }
            ],
            leadTemperature: 'warm',
            predictedCloseDate: '2025-02-01',
            lifeTimeValue: 85000
          }
        ],
        karen: [
          {
            id: 'contact-004',
            name: 'David Rodriguez',
            email: 'david.rodriguez@email.com',
            phone: '(555) 456-7890',
            company: 'Self-employed',
            position: 'Software Engineer',
            status: 'customer',
            source: 'website',
            value: 850000,
            lastContact: '2025-01-12',
            nextFollowUp: '2025-02-01',
            notes: 'Purchased luxury condo in Miami Beach. Looking for investment properties. High net worth client.',
            tags: ['luxury-buyer', 'investment', 'repeat-customer'],
            persona: 'karen',
            priority: 'high',
            stage: 'Investment Search'
          },
          {
            id: 'contact-005',
            name: 'Lisa Thompson',
            email: 'lisa.thompson@gmail.com',
            phone: '(555) 567-8901',
            company: 'Marketing Agency',
            position: 'Marketing Director',
            status: 'prospect',
            source: 'social',
            value: 450000,
            lastContact: '2025-01-09',
            nextFollowUp: '2025-01-14',
            notes: 'First-time home buyer. Pre-approved for $450K. Looking in Coral Gables area. Wants modern home with office space.',
            tags: ['first-time-buyer', 'coral-gables', 'pre-approved'],
            persona: 'karen',
            priority: 'medium',
            stage: 'House Hunting'
          },
          {
            id: 'contact-006',
            name: 'Robert Wilson',
            email: 'rwilson@business.com',
            phone: '(555) 678-9012',
            company: 'Wilson Enterprises',
            position: 'Business Owner',
            status: 'lead',
            source: 'referral',
            value: 600000,
            lastContact: '2025-01-07',
            nextFollowUp: '2025-01-13',
            notes: 'Referred by David Rodriguez. Looking for commercial property for business expansion. Needs 5000+ sq ft.',
            tags: ['commercial', 'referral', 'business-expansion'],
            persona: 'karen',
            priority: 'high',
            stage: 'Needs Assessment'
          }
        ],
        sarah: [
          {
            id: 'contact-007',
            name: 'Amanda Foster',
            email: 'amanda.foster@email.com',
            phone: '(555) 789-0123',
            company: 'Fashion Designer',
            position: 'Creative Director',
            status: 'customer',
            source: 'social',
            value: 2500,
            lastContact: '2025-01-11',
            nextFollowUp: '2025-02-11',
            notes: 'Regular Botox and filler client. Excellent results. Refers many clients. VIP treatment status.',
            tags: ['vip-client', 'botox', 'referral-source'],
            persona: 'sarah',
            priority: 'high',
            stage: 'Maintenance Plan'
          },
          {
            id: 'contact-008',
            name: 'Maria Gonzalez',
            email: 'maria.gonzalez@gmail.com',
            phone: '(555) 890-1234',
            company: 'Wellness Coach',
            position: 'Wellness Coach',
            status: 'prospect',
            source: 'website',
            value: 1800,
            lastContact: '2025-01-08',
            nextFollowUp: '2025-01-15',
            notes: 'Interested in lip filler and facial treatments. Consultation scheduled. Follows on Instagram.',
            tags: ['lip-filler', 'facial-treatment', 'consultation'],
            persona: 'sarah',
            priority: 'medium',
            stage: 'Consultation Scheduled'
          },
          {
            id: 'contact-009',
            name: 'Jessica Park',
            email: 'jpark@corporate.com',
            phone: '(555) 901-2345',
            company: 'Corporate Executive',
            position: 'Executive Assistant',
            status: 'lead',
            source: 'referral',
            value: 3200,
            lastContact: '2025-01-06',
            nextFollowUp: '2025-01-12',
            notes: 'Referred by Amanda Foster. Interested in comprehensive anti-aging treatment plan. Budget discussion needed.',
            tags: ['anti-aging', 'comprehensive-plan', 'budget-discussion'],
            persona: 'sarah',
            priority: 'medium',
            stage: 'Budget Discussion'
          }
        ],
        marco: [
          {
            id: 'contact-010',
            name: 'Anthony DiMarco',
            email: 'anthony.dimarco@email.com',
            phone: '(555) 012-3456',
            company: 'Event Planner',
            position: 'Event Coordinator',
            status: 'customer',
            source: 'event',
            value: 1200,
            lastContact: '2025-01-10',
            nextFollowUp: '2025-01-25',
            notes: 'Regular customer for business dinners. Books private dining room monthly. Excellent relationship.',
            tags: ['business-dinners', 'private-dining', 'monthly-bookings'],
            persona: 'marco',
            priority: 'high',
            stage: 'Regular Customer'
          },
          {
            id: 'contact-011',
            name: 'Emily Watson',
            email: 'emily.watson@gmail.com',
            phone: '(555) 123-4567',
            company: 'Food Blogger',
            position: 'Food Blogger',
            status: 'prospect',
            source: 'social',
            value: 800,
            lastContact: '2025-01-08',
            nextFollowUp: '2025-01-14',
            notes: 'Food blogger with 50K followers. Interested in collaboration. Could bring significant exposure.',
            tags: ['food-blogger', 'collaboration', 'social-media'],
            persona: 'marco',
            priority: 'medium',
            stage: 'Collaboration Discussion'
          },
          {
            id: 'contact-012',
            name: 'Tom Anderson',
            email: 'tanderson@company.com',
            phone: '(555) 234-5678',
            company: 'Tech Company',
            position: 'HR Manager',
            status: 'lead',
            source: 'website',
            value: 2000,
            lastContact: '2025-01-06',
            nextFollowUp: '2025-01-13',
            notes: 'Interested in catering company events. Needs proposal for quarterly team lunches. 50+ employees.',
            tags: ['catering', 'corporate-events', 'quarterly-booking'],
            persona: 'marco',
            priority: 'high',
            stage: 'Proposal Needed'
          }
        ],
        alex: [
          {
            id: 'contact-013',
            name: 'Rachel Kim',
            email: 'rachel.kim@email.com',
            phone: '(555) 345-6789',
            company: 'Marketing Manager',
            position: 'Marketing Manager',
            status: 'customer',
            source: 'website',
            value: 2400,
            lastContact: '2025-01-09',
            nextFollowUp: '2025-01-16',
            notes: 'Completed transformation program. Lost 30 pounds. Excellent testimonial. Interested in nutrition coaching.',
            tags: ['transformation-success', 'nutrition-coaching', 'testimonial'],
            persona: 'alex',
            priority: 'high',
            stage: 'Upsell Opportunity'
          },
          {
            id: 'contact-014',
            name: 'James Miller',
            email: 'james.miller@gmail.com',
            phone: '(555) 456-7890',
            company: 'Construction Worker',
            position: 'Foreman',
            status: 'prospect',
            source: 'referral',
            value: 1800,
            lastContact: '2025-01-07',
            nextFollowUp: '2025-01-14',
            notes: 'Referred by Rachel Kim. Wants to build muscle and improve fitness. Shift work schedule needs flexible training.',
            tags: ['muscle-building', 'flexible-schedule', 'shift-worker'],
            persona: 'alex',
            priority: 'medium',
            stage: 'Schedule Consultation'
          },
          {
            id: 'contact-015',
            name: 'Karen Davis',
            email: 'karen.davis@health.com',
            phone: '(555) 567-8901',
            company: 'Healthcare Worker',
            position: 'Nurse',
            status: 'lead',
            source: 'social',
            value: 1200,
            lastContact: '2025-01-05',
            nextFollowUp: '2025-01-12',
            notes: 'Interested in stress management and fitness. Works long hours. Needs quick effective workouts.',
            tags: ['stress-management', 'time-efficient', 'healthcare-worker'],
            persona: 'alex',
            priority: 'medium',
            stage: 'Needs Assessment'
          }
        ],
        david: [
          {
            id: 'contact-016',
            name: 'Steven Parker',
            email: 'steven.parker@email.com',
            phone: '(555) 678-9012',
            company: 'Tech Startup',
            position: 'Software Developer',
            status: 'customer',
            source: 'website',
            value: 35000,
            lastContact: '2025-01-11',
            nextFollowUp: '2025-01-18',
            notes: 'Purchased new electric vehicle. Excellent experience. Interested in extended warranty. Potential referral source.',
            tags: ['electric-vehicle', 'extended-warranty', 'referral-potential'],
            persona: 'david',
            priority: 'high',
            stage: 'Warranty Discussion'
          },
          {
            id: 'contact-017',
            name: 'Jennifer Lee',
            email: 'jennifer.lee@business.com',
            phone: '(555) 789-0123',
            company: 'Consulting Firm',
            position: 'Business Consultant',
            status: 'prospect',
            source: 'referral',
            value: 42000,
            lastContact: '2025-01-08',
            nextFollowUp: '2025-01-15',
            notes: 'Referred by Steven Parker. Looking for luxury SUV for business use. Needs fleet pricing information.',
            tags: ['luxury-suv', 'business-use', 'fleet-pricing'],
            persona: 'david',
            priority: 'high',
            stage: 'Fleet Pricing'
          },
          {
            id: 'contact-018',
            name: 'Mike Johnson',
            email: 'mjohnson@family.com',
            phone: '(555) 890-1234',
            company: 'Family Business',
            position: 'Business Owner',
            status: 'lead',
            source: 'social',
            value: 28000,
            lastContact: '2025-01-04',
            nextFollowUp: '2025-01-11',
            notes: 'Interested in family vehicle. Has financing questions. Needs to discuss trade-in value.',
            tags: ['family-vehicle', 'financing', 'trade-in'],
            persona: 'david',
            priority: 'medium',
            stage: 'Financing Discussion'
          }
        ]
      };

      return baseContacts[currentPersona] || [];
    };

    const generateViviInsights = () => {
      if (actualBetaUser) return [];
      
      return [
        {
          id: 'insight-1',
          contactId: '1',
          type: 'follow_up' as const,
          priority: 'high' as const,
          message: 'Michael Thompson has not responded to last email sent 3 days ago. ViVi recommends a LinkedIn follow-up with leadership content.',
          actionable: true,
          suggestedAction: 'Send LinkedIn message with "5 Leadership Mistakes to Avoid" article',
          confidence: 0.89,
          createdAt: '2025-01-15T10:30:00Z'
        },
        {
          id: 'insight-2',
          contactId: '2',
          type: 'upsell' as const,
          priority: 'medium' as const,
          message: 'Sarah Williams has high engagement with team coaching content. Perfect timing for team coaching package upsell.',
          actionable: true,
          suggestedAction: 'Present team coaching package with 20% loyalty discount',
          confidence: 0.92,
          createdAt: '2025-01-15T09:15:00Z'
        },
        {
          id: 'insight-3',
          contactId: '1',
          type: 'temperature_change' as const,
          priority: 'high' as const,
          message: 'Contact temperature increased from Warm to Hot based on recent LinkedIn engagement and email opens.',
          actionable: true,
          suggestedAction: 'Schedule proposal call within 24 hours',
          confidence: 0.94,
          createdAt: '2025-01-15T08:45:00Z'
        }
      ];
    };

    const generateViviAutomations = () => {
      if (actualBetaUser) return [];
      
      return [
        {
          id: 'auto-1',
          name: 'Leadership Content Follow-up',
          trigger: 'Contact views leadership content for 2+ minutes',
          action: 'Send personalized follow-up email with case study',
          isActive: true,
          contactsAffected: 12
        },
        {
          id: 'auto-2',
          name: 'Hot Lead Alert',
          trigger: 'ViVi Score increases above 85',
          action: 'Notify sales team and schedule priority follow-up',
          isActive: true,
          contactsAffected: 3
        },
        {
          id: 'auto-3',
          name: 'Cold Lead Re-engagement',
          trigger: 'No interaction for 30 days',
          action: 'Send re-engagement campaign with industry insights',
          isActive: false,
          contactsAffected: 8
        }
      ];
    };

    setContacts(generateContacts());
    setViviInsights(generateViviInsights());
    setViviAutomations(generateViviAutomations());
  }, [currentPersona, actualBetaUser]);

  const filteredContacts = contacts.filter(contact => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'leads' && contact.status === 'lead') ||
                      (activeTab === 'prospects' && contact.status === 'prospect') ||
                      (activeTab === 'customers' && contact.status === 'customer') ||
                      (activeTab === 'vivi-insights' && contact.viviScore >= 80);
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead': return 'bg-blue-100 text-blue-800';
      case 'prospect': return 'bg-yellow-100 text-yellow-800';
      case 'customer': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getLeadTemperatureColor = (temperature: string) => {
    switch (temperature) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-orange-100 text-orange-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getViviScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getInsightPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const totalContacts = contacts.length;
  const activeCustomers = contacts.filter(c => c.status === 'customer').length;
  const totalPipelineValue = contacts.reduce((sum, c) => sum + c.value, 0);
  const conversionRate = totalContacts > 0 ? (activeCustomers / totalContacts) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-8 space-y-8">
      {/* Executive Command Header */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-4">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">ViVi-Powered CRM</h1>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 px-4 py-2 rounded-2xl shadow-sm">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-bold text-purple-700">AI Enhanced</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="text-gray-600 text-lg mt-2">Intelligent customer relationship management with campaign attribution & AI-driven insights</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={() => setShowViviPanel(!showViviPanel)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <Bot className="w-5 h-5 mr-2" />
              <span className="font-medium">ViVi Insights</span>
              <Badge className="ml-2 bg-white/20 text-white border-white/30">{viviInsights.length}</Badge>
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <Plus className="w-5 h-5 mr-2" />
              <span className="font-medium">Add Contact</span>
            </Button>
            <Button className="bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              Import Contacts
            </Button>
          </div>
        </div>
      </div>

      {/* Executive Command ViVi Intelligence Panel */}
      {showViviPanel && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">ViVi Intelligence Center</h3>
                <p className="text-gray-600">Live AI analysis and automation recommendations</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500 font-medium">Live Analysis</span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Executive Command AI Insights */}
              <div>
                <h4 className="text-xl font-black text-gray-900 mb-6 flex items-center tracking-tight">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  Live AI Insights
                </h4>
                <div className="space-y-4">
                  {viviInsights.map((insight) => (
                    <div key={insight.id} className={`p-6 rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${getInsightPriorityColor(insight.priority)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900 leading-relaxed">{insight.message}</p>
                          <p className="text-xs mt-2 text-gray-700 bg-white/50 rounded-lg px-3 py-1 inline-block">{insight.suggestedAction}</p>
                          <div className="flex items-center mt-4 space-x-3">
                            <Badge className="bg-white/70 text-gray-800 border border-gray-300 font-bold">
                              {(insight.confidence * 100).toFixed(0)}% confidence
                            </Badge>
                            <span className="text-xs text-gray-600 font-medium">
                              {new Date(insight.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {insight.actionable && (
                          <Button className="ml-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                            <Send className="w-4 h-4 mr-2" />
                            Action
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executive Command ViVi Automations */}
              <div>
                <h4 className="text-xl font-black text-gray-900 mb-6 flex items-center tracking-tight">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  ViVi Automations
                </h4>
                <div className="space-y-4">
                  {viviAutomations.map((automation) => (
                    <div key={automation.id} className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h5 className="font-black text-sm text-gray-900">{automation.name}</h5>
                            <div className={`w-3 h-3 rounded-full shadow-sm ${automation.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                            {automation.isActive && (
                              <Badge className="bg-green-100 text-green-800 border-green-300 font-bold text-xs">
                                Live
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-700 font-medium bg-white/60 rounded-lg px-3 py-1 mb-2 inline-block">{automation.trigger}</p>
                          <p className="text-xs text-gray-600 mb-3">{automation.action}</p>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-300 font-bold text-xs">
                            {automation.contactsAffected} contacts affected
                          </Badge>
                        </div>
                        <Button 
                          className={`ml-4 px-4 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                            automation.isActive 
                              ? 'bg-white border-2 border-green-300 text-green-700 hover:bg-green-50' 
                              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                          }`}
                        >
                          {automation.isActive ? 'Active' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Executive Command Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Contacts</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight">{totalContacts}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight">{activeCustomers}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight">{formatCurrency(totalPipelineValue)}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight">{conversionRate.toFixed(1)}%</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 rounded-2xl border border-purple-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-purple-700">Avg ViVi Score</p>
              <p className={`text-3xl font-black tracking-tight ${getViviScoreColor(contacts.reduce((sum, c) => sum + (c.viviScore || 0), 0) / contacts.length || 0)}`}>
                {contacts.length > 0 ? Math.round(contacts.reduce((sum, c) => sum + (c.viviScore || 0), 0) / contacts.length) : 0}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Executive Command Filters */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="flex space-x-2 bg-gray-100 rounded-2xl p-2">
            {['all', 'leads', 'prospects', 'customers', 'vivi-insights'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:scale-[1.02]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                {tab === 'vivi-insights' && <Brain className="w-4 h-4" />}
                <span>{tab === 'vivi-insights' ? 'ViVi Insights' : tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>

          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
              />
            </div>
            <button className="px-6 py-3 border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50 flex items-center space-x-2 font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Executive Command Contacts Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50">
              <tr>
                <th className="text-left px-8 py-6 text-sm font-black text-gray-900 uppercase tracking-tight">
                  Contact
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-purple-600 uppercase tracking-wider">
                  <div className="flex items-center">
                    <Brain className="w-3 h-3 mr-1" />
                    ViVi Score
                  </div>
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign Attribution
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-medium text-sm">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contact.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {contact.email}
                        </div>
                        {contact.company && (
                          <div className="text-sm text-gray-500">
                            {contact.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(contact.priority)}`}>
                        {contact.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`text-lg font-bold ${getViviScoreColor(contact.viviScore || 0)}`}>
                        {contact.viviScore || 0}
                      </div>
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(contact.viviScore || 0)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {contact.leadTemperature && (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLeadTemperatureColor(contact.leadTemperature)}`}>
                        {contact.leadTemperature}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {contact.campaignAttribution ? (
                      <div className="text-xs">
                        <div className="font-medium text-gray-900">{contact.campaignAttribution.campaignName}</div>
                        <div className="text-gray-500">{contact.campaignAttribution.platform} • {contact.campaignAttribution.contentType}</div>
                        <div className="text-purple-600">{contact.campaignAttribution.touchpoints} touchpoints</div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No campaign data</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(contact.value)}
                    </div>
                    {contact.nextFollowUp && (
                      <div className="text-sm text-purple-600">
                        Next: {contact.nextFollowUp}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="p-1 h-7 w-7" title="ViVi AI Recommendation">
                        <Brain className="w-3 h-3 text-purple-600" />
                      </Button>
                      <button className="text-gray-400 hover:text-blue-600 p-1" title="Call">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-green-600 p-1" title="Email">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-purple-600 p-1" title="Schedule">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1" title="More">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Executive Command ViVi AI Recommendations */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">ViVi AI Recommendations</h3>
              <p className="text-gray-600">Recent activity analysis and automation recommendations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
            <span className="text-sm text-gray-600 font-medium">Live AI Analysis</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Executive Command Recent Activity */}
          <div>
            <h4 className="text-lg font-black text-gray-900 mb-6 flex items-center tracking-tight">
              Recent Activity & ViVi Actions
            </h4>
            <div className="space-y-4">
              {contacts.slice(0, 4).map((contact, index) => (
                <div key={contact.id} className="flex items-start space-x-4 p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-black text-sm text-gray-900">{contact.name}</span> 
                      <Badge className="bg-purple-100 text-purple-700 border-purple-300 font-bold text-xs">
                        Score: {contact.viviScore || Math.floor(Math.random() * 40) + 60}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      ViVi Action: {index === 0 ? 'Sent personalized follow-up email' : 
                                    index === 1 ? 'Scheduled optimal call time based on engagement' :
                                    index === 2 ? 'Updated lead temperature to "hot"' :
                                    'Generated content recommendation'}
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      Next: {contact.nextFollowUp || 'ViVi analyzing best approach'}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 flex flex-col items-end">
                    <span>{formatCurrency(contact.value)}</span>
                    <span className="text-green-600 font-medium">+{Math.floor(Math.random() * 20) + 5}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Command ViVi Recommendations Panel */}
          <div>
            <h4 className="text-lg font-black text-gray-900 mb-6 flex items-center tracking-tight">
              ViVi AI Recommendations
            </h4>
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-black text-blue-900">High-Value Opportunity</span>
                </div>
                <p className="text-sm text-blue-800 font-medium mb-4">Contact Sarah Johnson for expansion discussion. ViVi detected 85% readiness score.</p>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Execute Action
                </Button>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-black text-green-900">Automation Ready</span>
                </div>
                <p className="text-sm text-green-800 font-medium mb-4">3 contacts ready for automated nurture sequence. Estimated +$15K value.</p>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Start Automation
                </Button>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-black text-orange-900">Attention Needed</span>
                </div>
                <p className="text-sm text-orange-800 font-medium mb-4">Mike Chen hasn't been contacted in 14 days. Risk of churn detected.</p>
                <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Send Outreach
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMPage;