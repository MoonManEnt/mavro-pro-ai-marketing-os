import React, { useState, useEffect } from 'react';
import { Users, Calendar, FileText, MessageSquare, CreditCard, Download, Upload, Clock, CheckCircle, AlertCircle, Star, Phone, Mail, Video, Plus, Edit, Trash2, Filter, Search } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActivity: string;
  totalSpent: number;
  services: string[];
  notes: string;
  persona: string;
}

interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
}

interface Document {
  id: string;
  clientId: string;
  name: string;
  type: 'contract' | 'form' | 'report' | 'certificate' | 'invoice';
  uploadDate: string;
  size: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ClientPortalPageProps {
  currentPersona: string;
}

const ClientPortalPage: React.FC<ClientPortalPageProps> = ({ currentPersona }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'appointments' | 'documents' | 'billing'>('overview');
  const [clients, setClients] = useState<Client[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const generateClientData = () => {
      const baseClients: Record<string, Client[]> = {
        kemar: [
          {
            id: 'client-001',
            name: 'Jennifer Martinez',
            email: 'jennifer.martinez@techcorp.com',
            phone: '(555) 123-4567',
            status: 'active',
            joinDate: '2024-09-15',
            lastActivity: '2025-01-10',
            totalSpent: 15000,
            services: ['Executive Coaching', 'Leadership Development', 'Team Building'],
            notes: 'VP of Operations at TechCorp. Focused on improving team leadership skills.',
            persona: 'kemar'
          },
          {
            id: 'client-002',
            name: 'Michael Chen',
            email: 'mchen@innovatetech.com',
            phone: '(555) 234-5678',
            status: 'active',
            joinDate: '2024-10-22',
            lastActivity: '2025-01-08',
            totalSpent: 8500,
            services: ['Executive Coaching', 'Career Transition'],
            notes: 'CEO transitioning company through major restructuring.',
            persona: 'kemar'
          },
          {
            id: 'client-003',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@globalcorp.com',
            phone: '(555) 345-6789',
            status: 'active',
            joinDate: '2024-08-10',
            lastActivity: '2025-01-05',
            totalSpent: 22000,
            services: ['Executive Coaching', 'Team Coaching', 'Leadership Assessment'],
            notes: 'Chief People Officer. Excellent long-term client with consistent results.',
            persona: 'kemar'
          }
        ],
        karen: [
          {
            id: 'client-004',
            name: 'David Rodriguez',
            email: 'david.rodriguez@email.com',
            phone: '(555) 456-7890',
            status: 'active',
            joinDate: '2024-11-20',
            lastActivity: '2025-01-12',
            totalSpent: 850000,
            services: ['Home Purchase', 'Property Management', 'Investment Consultation'],
            notes: 'Software engineer, purchased luxury condo. Interested in investment properties.',
            persona: 'karen'
          },
          {
            id: 'client-005',
            name: 'Lisa Thompson',
            email: 'lisa.thompson@gmail.com',
            phone: '(555) 567-8901',
            status: 'active',
            joinDate: '2024-12-05',
            lastActivity: '2025-01-09',
            totalSpent: 450000,
            services: ['First-Time Home Buyer', 'Mortgage Consultation'],
            notes: 'First-time buyer, pre-approved for $450K. Looking in Coral Gables.',
            persona: 'karen'
          },
          {
            id: 'client-006',
            name: 'Robert Wilson',
            email: 'rwilson@business.com',
            phone: '(555) 678-9012',
            status: 'pending',
            joinDate: '2025-01-01',
            lastActivity: '2025-01-07',
            totalSpent: 0,
            services: ['Commercial Real Estate'],
            notes: 'Business owner seeking commercial space for expansion.',
            persona: 'karen'
          }
        ],
        sarah: [
          {
            id: 'client-007',
            name: 'Amanda Foster',
            email: 'amanda.foster@email.com',
            phone: '(555) 789-0123',
            status: 'active',
            joinDate: '2024-06-15',
            lastActivity: '2025-01-11',
            totalSpent: 3200,
            services: ['Botox', 'Dermal Fillers', 'Chemical Peels'],
            notes: 'VIP client, regular treatments. Excellent results and referral source.',
            persona: 'sarah'
          },
          {
            id: 'client-008',
            name: 'Maria Gonzalez',
            email: 'maria.gonzalez@gmail.com',
            phone: '(555) 890-1234',
            status: 'active',
            joinDate: '2024-12-10',
            lastActivity: '2025-01-08',
            totalSpent: 1800,
            services: ['Lip Fillers', 'Facial Treatments'],
            notes: 'Wellness coach, interested in comprehensive anti-aging plan.',
            persona: 'sarah'
          },
          {
            id: 'client-009',
            name: 'Jessica Park',
            email: 'jpark@corporate.com',
            phone: '(555) 901-2345',
            status: 'inactive',
            joinDate: '2024-09-20',
            lastActivity: '2024-12-15',
            totalSpent: 1200,
            services: ['Consultation', 'Botox'],
            notes: 'Corporate executive, schedule conflicts. Need to follow up.',
            persona: 'sarah'
          }
        ],
        marco: [
          {
            id: 'client-010',
            name: 'Anthony DiMarco',
            email: 'anthony.dimarco@email.com',
            phone: '(555) 012-3456',
            status: 'active',
            joinDate: '2024-05-10',
            lastActivity: '2025-01-10',
            totalSpent: 2400,
            services: ['Private Dining', 'Corporate Events', 'Catering'],
            notes: 'Event planner, monthly private dining bookings. Excellent relationship.',
            persona: 'marco'
          },
          {
            id: 'client-011',
            name: 'Emily Watson',
            email: 'emily.watson@gmail.com',
            phone: '(555) 123-4567',
            status: 'active',
            joinDate: '2024-11-15',
            lastActivity: '2025-01-08',
            totalSpent: 800,
            services: ['Food Collaboration', 'Social Media'],
            notes: 'Food blogger with 50K followers. Collaboration opportunities.',
            persona: 'marco'
          },
          {
            id: 'client-012',
            name: 'Tom Anderson',
            email: 'tanderson@company.com',
            phone: '(555) 234-5678',
            status: 'pending',
            joinDate: '2025-01-01',
            lastActivity: '2025-01-06',
            totalSpent: 0,
            services: ['Corporate Catering'],
            notes: 'HR Manager, interested in quarterly team lunch catering.',
            persona: 'marco'
          }
        ],
        alex: [
          {
            id: 'client-013',
            name: 'Rachel Kim',
            email: 'rachel.kim@email.com',
            phone: '(555) 345-6789',
            status: 'active',
            joinDate: '2024-08-01',
            lastActivity: '2025-01-09',
            totalSpent: 2400,
            services: ['Personal Training', 'Nutrition Coaching', 'Transformation Program'],
            notes: 'Amazing transformation success story. Lost 30 pounds. Great testimonial.',
            persona: 'alex'
          },
          {
            id: 'client-014',
            name: 'James Miller',
            email: 'james.miller@gmail.com',
            phone: '(555) 456-7890',
            status: 'active',
            joinDate: '2024-12-01',
            lastActivity: '2025-01-07',
            totalSpent: 1200,
            services: ['Personal Training', 'Muscle Building'],
            notes: 'Construction worker, shift schedule. Needs flexible training times.',
            persona: 'alex'
          },
          {
            id: 'client-015',
            name: 'Karen Davis',
            email: 'karen.davis@health.com',
            phone: '(555) 567-8901',
            status: 'pending',
            joinDate: '2025-01-01',
            lastActivity: '2025-01-05',
            totalSpent: 0,
            services: ['Fitness Consultation'],
            notes: 'Healthcare worker, interested in stress management and fitness.',
            persona: 'alex'
          }
        ],
        david: [
          {
            id: 'client-016',
            name: 'Steven Parker',
            email: 'steven.parker@email.com',
            phone: '(555) 678-9012',
            status: 'active',
            joinDate: '2024-10-15',
            lastActivity: '2025-01-11',
            totalSpent: 42000,
            services: ['Vehicle Purchase', 'Extended Warranty', 'Service'],
            notes: 'Software developer, purchased electric vehicle. Excellent experience.',
            persona: 'david'
          },
          {
            id: 'client-017',
            name: 'Jennifer Lee',
            email: 'jennifer.lee@business.com',
            phone: '(555) 789-0123',
            status: 'active',
            joinDate: '2024-11-22',
            lastActivity: '2025-01-08',
            totalSpent: 38000,
            services: ['Business Vehicle', 'Fleet Services'],
            notes: 'Business consultant, interested in luxury SUV for business use.',
            persona: 'david'
          },
          {
            id: 'client-018',
            name: 'Mike Johnson',
            email: 'mjohnson@family.com',
            phone: '(555) 890-1234',
            status: 'pending',
            joinDate: '2025-01-01',
            lastActivity: '2025-01-04',
            totalSpent: 0,
            services: ['Family Vehicle', 'Financing'],
            notes: 'Family business owner, needs family vehicle with financing options.',
            persona: 'david'
          }
        ]
      };

      const baseAppointments: Record<string, Appointment[]> = {
        kemar: [
          {
            id: 'appt-001',
            clientId: 'client-001',
            clientName: 'Jennifer Martinez',
            service: 'Executive Coaching Session',
            date: '2025-01-15',
            time: '10:00 AM',
            duration: 60,
            status: 'scheduled',
            notes: 'Leadership development focus'
          },
          {
            id: 'appt-002',
            clientId: 'client-002',
            clientName: 'Michael Chen',
            service: 'Strategy Session',
            date: '2025-01-16',
            time: '2:00 PM',
            duration: 90,
            status: 'scheduled',
            notes: 'Organizational restructuring planning'
          },
          {
            id: 'appt-003',
            clientId: 'client-003',
            clientName: 'Sarah Johnson',
            service: 'Team Coaching',
            date: '2025-01-10',
            time: '9:00 AM',
            duration: 120,
            status: 'completed',
            notes: 'Successful team building session'
          }
        ],
        sarah: [
          {
            id: 'appt-004',
            clientId: 'client-007',
            clientName: 'Amanda Foster',
            service: 'Botox Treatment',
            date: '2025-01-18',
            time: '11:00 AM',
            duration: 30,
            status: 'scheduled',
            notes: 'Regular maintenance appointment'
          },
          {
            id: 'appt-005',
            clientId: 'client-008',
            clientName: 'Maria Gonzalez',
            service: 'Lip Filler Consultation',
            date: '2025-01-20',
            time: '3:00 PM',
            duration: 45,
            status: 'scheduled',
            notes: 'First-time filler consultation'
          }
        ],
        alex: [
          {
            id: 'appt-006',
            clientId: 'client-013',
            clientName: 'Rachel Kim',
            service: 'Personal Training',
            date: '2025-01-17',
            time: '7:00 AM',
            duration: 60,
            status: 'scheduled',
            notes: 'Strength training focus'
          },
          {
            id: 'appt-007',
            clientId: 'client-014',
            clientName: 'James Miller',
            service: 'Fitness Assessment',
            date: '2025-01-19',
            time: '6:00 PM',
            duration: 90,
            status: 'scheduled',
            notes: 'Initial fitness evaluation'
          }
        ]
      };

      const baseDocuments: Record<string, Document[]> = {
        kemar: [
          {
            id: 'doc-001',
            clientId: 'client-001',
            name: 'Coaching Agreement',
            type: 'contract',
            uploadDate: '2024-09-15',
            size: '2.3 MB',
            status: 'approved'
          },
          {
            id: 'doc-002',
            clientId: 'client-002',
            name: 'Assessment Report',
            type: 'report',
            uploadDate: '2024-11-01',
            size: '1.8 MB',
            status: 'approved'
          }
        ],
        karen: [
          {
            id: 'doc-003',
            clientId: 'client-004',
            name: 'Purchase Agreement',
            type: 'contract',
            uploadDate: '2024-12-01',
            size: '3.2 MB',
            status: 'approved'
          },
          {
            id: 'doc-004',
            clientId: 'client-005',
            name: 'Pre-approval Letter',
            type: 'certificate',
            uploadDate: '2024-12-05',
            size: '1.2 MB',
            status: 'approved'
          }
        ],
        sarah: [
          {
            id: 'doc-005',
            clientId: 'client-007',
            name: 'Treatment Consent Form',
            type: 'form',
            uploadDate: '2024-06-15',
            size: '856 KB',
            status: 'approved'
          },
          {
            id: 'doc-006',
            clientId: 'client-008',
            name: 'Medical History Form',
            type: 'form',
            uploadDate: '2024-12-10',
            size: '1.1 MB',
            status: 'approved'
          }
        ]
      };

      setClients(baseClients[currentPersona] || []);
      setAppointments(baseAppointments[currentPersona] || []);
      setDocuments(baseDocuments[currentPersona] || []);
    };

    generateClientData();
  }, [currentPersona]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-orange-100 text-orange-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
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

  const activeClients = clients.filter(c => c.status === 'active').length;
  const pendingClients = clients.filter(c => c.status === 'pending').length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalSpent, 0);
  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
          <p className="text-gray-600">Manage clients, appointments, and documents</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Client</span>
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Clients</p>
              <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingClients}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'clients', 'appointments', 'documents', 'billing'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {clients.slice(0, 5).map((client) => (
                  <div key={client.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-medium text-sm">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">Last activity: {client.lastActivity}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
              <div className="space-y-4">
                {appointments.filter(a => a.status === 'scheduled').slice(0, 5).map((appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{appointment.clientName}</p>
                      <p className="text-sm text-gray-500">{appointment.service}</p>
                      <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === 'clients' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Client Management</h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search clients..."
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

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Services</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Last Activity</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-medium text-sm">
                              {client.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-sm text-gray-500">{client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {client.services.slice(0, 2).map((service, index) => (
                            <div key={index} className="text-sm text-gray-900">{service}</div>
                          ))}
                          {client.services.length > 2 && (
                            <div className="text-sm text-gray-500">+{client.services.length - 2} more</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{formatCurrency(client.totalSpent)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{client.lastActivity}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-blue-600">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-green-600">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-purple-600">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Management</h3>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{appointment.clientName}</h4>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                        <p className="text-sm text-gray-500">{appointment.date} at {appointment.time} ({appointment.duration} min)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {appointment.notes && (
                    <p className="text-sm text-gray-600 mt-2 ml-16">{appointment.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Document Management</h3>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Document</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">{doc.type}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Size:</span>
                      <span className="text-gray-900">{doc.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Uploaded:</span>
                      <span className="text-gray-900">{doc.uploadDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-medium">
                      View
                    </button>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Management</h3>
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Client billing system</p>
              <p className="text-sm text-gray-500">Invoice generation and payment tracking</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPortalPage;