import { useState } from 'react';
import { 
  Users, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Building, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  MessageSquare, 
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  Send,
  Target,
  Award,
  Briefcase,
  Globe,
  Tag,
  Settings,
  BarChart3,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const CRMPage = () => {
  const [selectedContact, setSelectedContact] = useState('contact-1');
  const [viewMode, setViewMode] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const contacts = [
    {
      id: 'contact-1',
      name: 'Sarah Johnson',
      title: 'CEO',
      company: 'TechVision Inc.',
      email: 'sarah.johnson@techvision.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      status: 'hot',
      lastContact: '2025-01-15',
      nextFollowUp: '2025-01-22',
      leadSource: 'LinkedIn',
      estimatedValue: '$25,000',
      tags: ['CEO', 'Tech', 'Leadership Summit', 'High Priority'],
      notes: 'Interested in Q2 leadership development program for 500+ executives. Mentioned budget of $25K. Very responsive to initial outreach.',
      interactions: [
        { type: 'email', date: '2025-01-15', subject: 'Leadership Summit Follow-up' },
        { type: 'call', date: '2025-01-12', subject: 'Initial consultation call' },
        { type: 'meeting', date: '2025-01-10', subject: 'Networking event introduction' }
      ],
      eventHistory: [
        { event: 'Corporate Leadership Summit', date: '2025-01-10', role: 'Attendee' },
        { event: 'Tech Innovation Expo', date: '2024-12-15', role: 'Keynote Listener' }
      ],
      engagementScore: 95,
      industry: 'Technology',
      companySize: '500+',
      avatar: 'SJ'
    },
    {
      id: 'contact-2',
      name: 'Michael Chen',
      title: 'Conference Director',
      company: 'Innovation Expo',
      email: 'michael.chen@innovationexpo.com',
      phone: '+1 (555) 987-6543',
      location: 'Austin, TX',
      status: 'warm',
      lastContact: '2025-01-12',
      nextFollowUp: '2025-01-19',
      leadSource: 'Referral',
      estimatedValue: '$15,000',
      tags: ['Conference', 'Innovation', 'Recurring Client', 'Decision Maker'],
      notes: 'Repeat client who books annual keynote. Praised 2024 performance. Wants to discuss 2025 speaking opportunities.',
      interactions: [
        { type: 'email', date: '2025-01-12', subject: '2025 Conference Planning' },
        { type: 'call', date: '2025-01-08', subject: 'Booking confirmation call' },
        { type: 'contract', date: '2025-01-05', subject: 'Contract renewal discussion' }
      ],
      eventHistory: [
        { event: 'Innovation Expo 2024', date: '2024-09-20', role: 'Keynote Speaker' },
        { event: 'Innovation Expo 2023', date: '2023-09-15', role: 'Keynote Speaker' }
      ],
      engagementScore: 88,
      industry: 'Events & Conferences',
      companySize: '50-100',
      avatar: 'MC'
    },
    {
      id: 'contact-3',
      name: 'Dr. Amanda Rodriguez',
      title: 'Head of L&D',
      company: 'MedTech Solutions',
      email: 'amanda.rodriguez@medtechsolutions.com',
      phone: '+1 (555) 456-7890',
      location: 'Boston, MA',
      status: 'cold',
      lastContact: '2025-01-10',
      nextFollowUp: '2025-01-17',
      leadSource: 'Website',
      estimatedValue: '$8,000',
      tags: ['Healthcare', 'Training', 'Virtual Events', 'Budget Conscious'],
      notes: 'Interested in virtual leadership training for medical professionals. Limited budget but high potential for referrals.',
      interactions: [
        { type: 'email', date: '2025-01-10', subject: 'Virtual training inquiry' },
        { type: 'webinar', date: '2025-01-07', subject: 'Leadership in Healthcare webinar' }
      ],
      eventHistory: [
        { event: 'Healthcare Leadership Webinar', date: '2025-01-07', role: 'Attendee' }
      ],
      engagementScore: 72,
      industry: 'Healthcare',
      companySize: '200-500',
      avatar: 'AR'
    },
    {
      id: 'contact-4',
      name: 'James Patterson',
      title: 'Event Coordinator',
      company: 'Business Leaders Network',
      email: 'james.patterson@businessleaders.net',
      phone: '+1 (555) 234-5678',
      location: 'Chicago, IL',
      status: 'prospect',
      lastContact: '2025-01-08',
      nextFollowUp: '2025-01-15',
      leadSource: 'Social Media',
      estimatedValue: '$3,500',
      tags: ['Networking', 'Small Events', 'Local', 'Budget Sensitive'],
      notes: 'Organizes monthly networking events for 80+ business leaders. Positive feedback from recent event. Looking for quarterly speakers.',
      interactions: [
        { type: 'email', date: '2025-01-08', subject: 'Monthly event speaker inquiry' },
        { type: 'social', date: '2025-01-05', subject: 'LinkedIn connection' }
      ],
      eventHistory: [
        { event: 'January Networking Event', date: '2025-01-08', role: 'Host' }
      ],
      engagementScore: 65,
      industry: 'Business Networking',
      companySize: '10-50',
      avatar: 'JP'
    },
    {
      id: 'contact-5',
      name: 'Lisa Thompson',
      title: 'Marketing Director',
      company: 'StartupHub',
      email: 'lisa.thompson@startuphub.com',
      phone: '+1 (555) 345-6789',
      location: 'New York, NY',
      status: 'hot',
      lastContact: '2025-01-05',
      nextFollowUp: '2025-01-12',
      leadSource: 'Event',
      estimatedValue: '$12,000',
      tags: ['Startup', 'Founders', 'Growth', 'Innovative'],
      notes: 'Loved the startup founders workshop. Wants to book quarterly sessions for growing entrepreneur community. Great networking opportunity.',
      interactions: [
        { type: 'meeting', date: '2025-01-05', subject: 'Quarterly booking discussion' },
        { type: 'email', date: '2025-01-03', subject: 'Workshop feedback and future plans' },
        { type: 'event', date: '2025-01-01', subject: 'Startup Founders Workshop' }
      ],
      eventHistory: [
        { event: 'Startup Founders Workshop', date: '2025-01-01', role: 'Organizer' }
      ],
      engagementScore: 92,
      industry: 'Startups',
      companySize: '20-50',
      avatar: 'LT'
    },
    {
      id: 'contact-6',
      name: 'Robert Kim',
      title: 'HR Director',
      company: 'Global Enterprises',
      email: 'robert.kim@globalenterprises.com',
      phone: '+1 (555) 567-8901',
      location: 'Los Angeles, CA',
      status: 'warm',
      lastContact: '2025-01-03',
      nextFollowUp: '2025-01-10',
      leadSource: 'Cold Outreach',
      estimatedValue: '$18,000',
      tags: ['HR', 'Corporate', 'Large Company', 'Process Oriented'],
      notes: 'Large corporation with formal procurement process. Interested in leadership development for 200+ managers. Slow decision making but high value.',
      interactions: [
        { type: 'email', date: '2025-01-03', subject: 'Leadership development proposal' },
        { type: 'call', date: '2024-12-28', subject: 'Initial needs assessment' }
      ],
      eventHistory: [],
      engagementScore: 78,
      industry: 'Corporate',
      companySize: '1000+',
      avatar: 'RK'
    }
  ];

  const statusColors = {
    hot: 'bg-red-500/20 text-red-300 border-red-500/30',
    warm: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    cold: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    prospect: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  };

  const statusIcons = {
    hot: '🔥',
    warm: '⚡',
    cold: '❄️',
    prospect: '👀'
  };

  const totalContacts = contacts.length;
  const totalValue = contacts.reduce((sum, contact) => sum + parseFloat(contact.estimatedValue.replace('$', '').replace(',', '')), 0);
  const averageEngagement = contacts.reduce((sum, contact) => sum + contact.engagementScore, 0) / totalContacts;
  const hotLeads = contacts.filter(c => c.status === 'hot').length;

  const filteredContacts = contacts.filter(contact => {
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const currentContact = contacts.find(c => c.id === selectedContact);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Users className="w-8 h-8 mr-3 text-purple-400" />
            Customer Relationship Management
          </h1>
          <p className="text-purple-300 mt-1">Manage leads, contacts, and client relationships</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
          <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-800/30">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-800/30">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-purple-300 text-sm">Total Contacts</div>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalContacts}</div>
          <div className="text-purple-400 text-sm">+3 this week</div>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-green-300 text-sm">Pipeline Value</div>
            <DollarSign className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</div>
          <div className="text-green-400 text-sm">+$8K this month</div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-blue-300 text-sm">Avg Engagement</div>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{averageEngagement.toFixed(0)}%</div>
          <div className="text-blue-400 text-sm">+5% improvement</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-yellow-300 text-sm">Hot Leads</div>
            <Target className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">{hotLeads}</div>
          <div className="text-yellow-400 text-sm">Urgent follow-up</div>
        </div>

        <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="text-red-300 text-sm">Conversion Rate</div>
            <TrendingUp className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">68%</div>
          <div className="text-red-400 text-sm">Above average</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="all">All Status</option>
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="cold">Cold</option>
                  <option value="prospect">Prospect</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-purple-600/20 border-purple-500' : 'border-slate-600'}
                >
                  Grid
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-purple-600/20 border-purple-500' : 'border-slate-600'}
                >
                  List
                </Button>
              </div>
            </div>

            {/* Contacts Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedContact === contact.id
                      ? 'bg-purple-800/50 border-purple-500/50 shadow-lg'
                      : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                        {contact.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-white">{contact.name}</div>
                        <div className="text-sm text-slate-400">{contact.title}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[contact.status]}`}>
                      {statusIcons[contact.status]} {contact.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-slate-300">
                      <Building className="w-4 h-4 mr-2" />
                      {contact.company}
                    </div>
                    <div className="flex items-center text-slate-300">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {contact.estimatedValue}
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      Next: {new Date(contact.nextFollowUp).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-slate-400">Engagement: {contact.engagementScore}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-1">
          {currentContact && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      {currentContact.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{currentContact.name}</div>
                      <div className="text-sm text-slate-400">{currentContact.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-slate-300">
                    <Building className="w-4 h-4 mr-3" />
                    <div>
                      <div className="font-medium">{currentContact.company}</div>
                      <div className="text-sm text-slate-400">{currentContact.industry}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Mail className="w-4 h-4 mr-3" />
                    <div>
                      <div className="font-medium">{currentContact.email}</div>
                      <div className="text-sm text-slate-400">Primary contact</div>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Phone className="w-4 h-4 mr-3" />
                    <div>
                      <div className="font-medium">{currentContact.phone}</div>
                      <div className="text-sm text-slate-400">Mobile</div>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <MapPin className="w-4 h-4 mr-3" />
                    <div>
                      <div className="font-medium">{currentContact.location}</div>
                      <div className="text-sm text-slate-400">Location</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Estimated Value:</span>
                    <span className="font-medium text-green-400">{currentContact.estimatedValue}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-slate-400">Engagement Score:</span>
                    <span className="font-medium text-blue-400">{currentContact.engagementScore}%</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentContact.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Interactions */}
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Interactions
                </h3>
                <div className="space-y-3">
                  {currentContact.interactions.map((interaction, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg">
                      <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                        {interaction.type === 'email' && <Mail className="w-4 h-4 text-purple-400" />}
                        {interaction.type === 'call' && <Phone className="w-4 h-4 text-green-400" />}
                        {interaction.type === 'meeting' && <Calendar className="w-4 h-4 text-blue-400" />}
                        {interaction.type === 'social' && <MessageSquare className="w-4 h-4 text-pink-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{interaction.subject}</div>
                        <div className="text-xs text-slate-400">{new Date(interaction.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Notes
                </h3>
                <div className="text-sm text-slate-300 leading-relaxed">
                  {currentContact.notes}
                </div>
                <div className="mt-4">
                  <Button size="sm" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-800/30">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Notes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CRMPage;