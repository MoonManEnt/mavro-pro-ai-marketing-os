import React, { useState, useEffect } from 'react';
import { Users, Phone, Mail, Calendar, DollarSign, TrendingUp, Plus, Filter, Search, MoreHorizontal, Edit, Trash2, MessageSquare, Star, Clock, Target, User, Building, MapPin, Activity } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  source: 'website' | 'social' | 'referral' | 'event' | 'cold-outreach';
  value: number;
  lastContact: string;
  nextFollowUp?: string;
  notes: string;
  tags: string[];
  persona: string;
  priority: 'high' | 'medium' | 'low';
  stage: string;
}

interface CRMPageProps {
  currentPersona: string;
}

const CRMPage: React.FC<CRMPageProps> = ({ currentPersona }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'leads' | 'prospects' | 'customers'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
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
            stage: 'Proposal Sent'
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
            stage: 'Initial Contact'
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
            stage: 'Upsell Opportunity'
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

    setContacts(generateContacts());
  }, [currentPersona]);

  const filteredContacts = contacts.filter(contact => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'leads' && contact.status === 'lead') ||
                      (activeTab === 'prospects' && contact.status === 'prospect') ||
                      (activeTab === 'customers' && contact.status === 'customer');
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

  const totalContacts = contacts.length;
  const activeCustomers = contacts.filter(c => c.status === 'customer').length;
  const totalPipelineValue = contacts.reduce((sum, c) => sum + c.value, 0);
  const conversionRate = totalContacts > 0 ? (activeCustomers / totalContacts) * 100 : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM</h1>
          <p className="text-gray-600">Manage your contacts and customer relationships</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg">
            Import Contacts
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Contacts</p>
              <p className="text-2xl font-bold text-gray-900">{totalContacts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPipelineValue)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{conversionRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {['all', 'leads', 'prospects', 'customers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
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
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(contact.value)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {contact.stage}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {contact.lastContact}
                    </div>
                    {contact.nextFollowUp && (
                      <div className="text-sm text-purple-600">
                        Next: {contact.nextFollowUp}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-blue-600" title="Call">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-green-600" title="Email">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-purple-600" title="Schedule">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" title="More">
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

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {contacts.slice(0, 5).map((contact) => (
            <div key={contact.id} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{contact.name}</span> - {contact.stage}
                </p>
                <p className="text-sm text-gray-500">{contact.lastContact}</p>
              </div>
              <div className="text-sm text-gray-500">
                {formatCurrency(contact.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRMPage;