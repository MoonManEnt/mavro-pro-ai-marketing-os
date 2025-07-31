import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Clock, Users, Scale, Eye, Download, Upload, Search, Filter, AlertCircle, Lock, BookOpen, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ComplianceRule {
  id: string;
  title: string;
  description: string;
  category: 'marketing' | 'privacy' | 'financial' | 'health' | 'legal';
  status: 'compliant' | 'warning' | 'violation';
  lastChecked: string;
  nextReview: string;
  industry: string[];
  requirements: string[];
  actions: string[];
}

interface ComplianceDocument {
  id: string;
  name: string;
  type: 'policy' | 'consent' | 'disclosure' | 'license' | 'certificate';
  status: 'current' | 'expiring' | 'expired';
  expiryDate?: string;
  uploadedDate: string;
  persona: string;
}

interface ComplianceCenterPageProps {
  currentPersona: string;
}

const ComplianceCenterPage: React.FC<ComplianceCenterPageProps> = ({ currentPersona }) => {
  const { isAuthenticated, isDemoMode } = useAuth();
  const actualBetaUser = isAuthenticated && !isDemoMode;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'documents' | 'audits'>('overview');
  const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>([]);
  const [documents, setDocuments] = useState<ComplianceDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // For beta users, show empty state; for demo users, generate persona-specific data
    if (actualBetaUser) {
      setComplianceRules([]);
      setDocuments([]);
      return;
    }
    
    const generateComplianceData = () => {
      const baseRules: Record<string, ComplianceRule[]> = {
        kemar: [
          {
            id: 'rule-001',
            title: 'Professional Services Advertising',
            description: 'Ensure all marketing materials comply with professional services advertising standards',
            category: 'marketing',
            status: 'compliant',
            lastChecked: '2025-01-10',
            nextReview: '2025-02-10',
            industry: ['professional-services'],
            requirements: ['Clear disclosure of qualifications', 'No misleading claims', 'Testimonial compliance'],
            actions: ['Review all marketing materials monthly', 'Update testimonial disclaimers']
          },
          {
            id: 'rule-002',
            title: 'Client Confidentiality',
            description: 'Maintain strict confidentiality of client information in all communications',
            category: 'privacy',
            status: 'compliant',
            lastChecked: '2025-01-08',
            nextReview: '2025-02-08',
            industry: ['coaching', 'consulting'],
            requirements: ['Non-disclosure agreements', 'Secure data handling', 'Limited use of client examples'],
            actions: ['Update privacy policy', 'Review data retention policies']
          },
          {
            id: 'rule-003',
            title: 'LinkedIn Professional Standards',
            description: 'Adhere to LinkedIn professional networking guidelines',
            category: 'marketing',
            status: 'warning',
            lastChecked: '2025-01-05',
            nextReview: '2025-01-15',
            industry: ['professional-services'],
            requirements: ['Professional tone', 'No spam messaging', 'Authentic engagement'],
            actions: ['Review automated messaging', 'Update connection requests']
          }
        ],
        karen: [
          {
            id: 'rule-004',
            title: 'Real Estate Advertising Standards',
            description: 'Comply with NAR and state real estate advertising requirements',
            category: 'marketing',
            status: 'compliant',
            lastChecked: '2025-01-12',
            nextReview: '2025-02-12',
            industry: ['real-estate'],
            requirements: ['Broker disclosure', 'Fair housing compliance', 'Accurate property descriptions'],
            actions: ['Include brokerage information', 'Review property listings']
          },
          {
            id: 'rule-005',
            title: 'Fair Housing Act Compliance',
            description: 'Ensure all marketing materials comply with fair housing regulations',
            category: 'legal',
            status: 'compliant',
            lastChecked: '2025-01-10',
            nextReview: '2025-02-10',
            industry: ['real-estate'],
            requirements: ['No discriminatory language', 'Equal opportunity display', 'Inclusive marketing'],
            actions: ['Review all content for bias', 'Update fair housing logo']
          },
          {
            id: 'rule-006',
            title: 'Financial Privacy (GLBA)',
            description: 'Protect client financial information per Gramm-Leach-Bliley Act',
            category: 'privacy',
            status: 'compliant',
            lastChecked: '2025-01-08',
            nextReview: '2025-02-08',
            industry: ['real-estate', 'financial'],
            requirements: ['Data encryption', 'Access controls', 'Privacy notices'],
            actions: ['Update privacy notice', 'Review data access logs']
          }
        ],
        sarah: [
          {
            id: 'rule-007',
            title: 'FDA Medical Device Regulations',
            description: 'Comply with FDA regulations for medical device marketing',
            category: 'health',
            status: 'compliant',
            lastChecked: '2025-01-11',
            nextReview: '2025-02-11',
            industry: ['medical', 'aesthetics'],
            requirements: ['FDA-approved claims only', 'Risk disclosures', 'Before/after guidelines'],
            actions: ['Review treatment claims', 'Update consent forms']
          },
          {
            id: 'rule-008',
            title: 'HIPAA Privacy Requirements',
            description: 'Protect patient health information per HIPAA regulations',
            category: 'privacy',
            status: 'compliant',
            lastChecked: '2025-01-09',
            nextReview: '2025-02-09',
            industry: ['medical', 'health'],
            requirements: ['Patient consent', 'Secure storage', 'Limited disclosure'],
            actions: ['Update privacy policy', 'Review staff training']
          },
          {
            id: 'rule-009',
            title: 'Medical Marketing Claims',
            description: 'Ensure all marketing claims are substantiated and not misleading',
            category: 'marketing',
            status: 'warning',
            lastChecked: '2025-01-07',
            nextReview: '2025-01-17',
            industry: ['medical', 'aesthetics'],
            requirements: ['Clinical evidence', 'Realistic expectations', 'Risk disclosure'],
            actions: ['Review before/after photos', 'Update disclaimer text']
          }
        ],
        marco: [
          {
            id: 'rule-010',
            title: 'Food Safety Communications',
            description: 'Ensure all food-related marketing complies with health department standards',
            category: 'health',
            status: 'compliant',
            lastChecked: '2025-01-10',
            nextReview: '2025-02-10',
            industry: ['food-service'],
            requirements: ['Allergen disclosure', 'Health claims accuracy', 'Sanitation standards'],
            actions: ['Update allergen information', 'Review health claims']
          },
          {
            id: 'rule-011',
            title: 'Nutritional Claims Accuracy',
            description: 'Verify accuracy of all nutritional and health claims',
            category: 'marketing',
            status: 'compliant',
            lastChecked: '2025-01-08',
            nextReview: '2025-02-08',
            industry: ['food-service'],
            requirements: ['Accurate nutrition facts', 'Substantiated health claims', 'Allergen warnings'],
            actions: ['Review menu descriptions', 'Update nutritional information']
          },
          {
            id: 'rule-012',
            title: 'Alcohol Marketing Compliance',
            description: 'Comply with alcohol advertising and social media regulations',
            category: 'marketing',
            status: 'compliant',
            lastChecked: '2025-01-06',
            nextReview: '2025-02-06',
            industry: ['food-service', 'alcohol'],
            requirements: ['Age verification', 'Responsible drinking messages', 'Platform compliance'],
            actions: ['Review alcohol posts', 'Update age-gate warnings']
          }
        ],
        alex: [
          {
            id: 'rule-013',
            title: 'Fitness Marketing Standards',
            description: 'Ensure fitness marketing complies with industry standards',
            category: 'marketing',
            status: 'compliant',
            lastChecked: '2025-01-09',
            nextReview: '2025-02-09',
            industry: ['fitness', 'health'],
            requirements: ['Realistic expectations', 'Proper disclaimers', 'Qualification disclosure'],
            actions: ['Review transformation claims', 'Update certification display']
          },
          {
            id: 'rule-014',
            title: 'Health Information Privacy',
            description: 'Protect client health and fitness information',
            category: 'privacy',
            status: 'compliant',
            lastChecked: '2025-01-07',
            nextReview: '2025-02-07',
            industry: ['fitness', 'health'],
            requirements: ['Client consent', 'Secure data handling', 'Limited sharing'],
            actions: ['Update consent forms', 'Review data storage']
          },
          {
            id: 'rule-015',
            title: 'Supplement Marketing Claims',
            description: 'Ensure supplement recommendations comply with FDA guidelines',
            category: 'health',
            status: 'warning',
            lastChecked: '2025-01-05',
            nextReview: '2025-01-15',
            industry: ['fitness', 'nutrition'],
            requirements: ['FDA disclaimer', 'No medical claims', 'Evidence-based recommendations'],
            actions: ['Review supplement content', 'Add FDA disclaimers']
          }
        ],
        david: [
          {
            id: 'rule-016',
            title: 'Automotive Advertising Standards',
            description: 'Comply with FTC automotive advertising guidelines',
            category: 'marketing',
            status: 'compliant',
            lastChecked: '2025-01-11',
            nextReview: '2025-02-11',
            industry: ['automotive'],
            requirements: ['Clear pricing', 'Accurate specifications', 'Financing disclosure'],
            actions: ['Review pricing accuracy', 'Update financing terms']
          },
          {
            id: 'rule-017',
            title: 'Consumer Financial Protection',
            description: 'Protect consumer financial information and comply with lending laws',
            category: 'financial',
            status: 'compliant',
            lastChecked: '2025-01-09',
            nextReview: '2025-02-09',
            industry: ['automotive', 'financial'],
            requirements: ['Truth in lending', 'Data protection', 'Fair credit reporting'],
            actions: ['Update privacy policy', 'Review credit processes']
          },
          {
            id: 'rule-018',
            title: 'Warranty and Service Claims',
            description: 'Ensure all warranty and service claims are accurate and compliant',
            category: 'legal',
            status: 'compliant',
            lastChecked: '2025-01-07',
            nextReview: '2025-02-07',
            industry: ['automotive'],
            requirements: ['Accurate warranty terms', 'Service limitations', 'Clear disclaimers'],
            actions: ['Review warranty language', 'Update service terms']
          }
        ]
      };

      const baseDocuments: Record<string, ComplianceDocument[]> = {
        kemar: [
          {
            id: 'doc-001',
            name: 'Professional Liability Insurance',
            type: 'certificate',
            status: 'current',
            expiryDate: '2025-12-31',
            uploadedDate: '2025-01-01',
            persona: 'kemar'
          },
          {
            id: 'doc-002',
            name: 'Client Privacy Policy',
            type: 'policy',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'kemar'
          },
          {
            id: 'doc-003',
            name: 'Coaching Certification',
            type: 'license',
            status: 'current',
            expiryDate: '2025-06-30',
            uploadedDate: '2024-06-30',
            persona: 'kemar'
          }
        ],
        karen: [
          {
            id: 'doc-004',
            name: 'Real Estate License',
            type: 'license',
            status: 'current',
            expiryDate: '2025-08-31',
            uploadedDate: '2023-08-31',
            persona: 'karen'
          },
          {
            id: 'doc-005',
            name: 'Fair Housing Policy',
            type: 'policy',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'karen'
          },
          {
            id: 'doc-006',
            name: 'Privacy Notice (GLBA)',
            type: 'disclosure',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'karen'
          }
        ],
        sarah: [
          {
            id: 'doc-007',
            name: 'Medical License',
            type: 'license',
            status: 'current',
            expiryDate: '2025-12-31',
            uploadedDate: '2023-12-31',
            persona: 'sarah'
          },
          {
            id: 'doc-008',
            name: 'HIPAA Privacy Policy',
            type: 'policy',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'sarah'
          },
          {
            id: 'doc-009',
            name: 'Patient Consent Forms',
            type: 'consent',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'sarah'
          }
        ],
        marco: [
          {
            id: 'doc-010',
            name: 'Food Handler License',
            type: 'license',
            status: 'expiring',
            expiryDate: '2025-02-28',
            uploadedDate: '2024-02-28',
            persona: 'marco'
          },
          {
            id: 'doc-011',
            name: 'Liquor License',
            type: 'license',
            status: 'current',
            expiryDate: '2025-12-31',
            uploadedDate: '2024-12-31',
            persona: 'marco'
          },
          {
            id: 'doc-012',
            name: 'Allergen Disclosure Policy',
            type: 'policy',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'marco'
          }
        ],
        alex: [
          {
            id: 'doc-013',
            name: 'Personal Trainer Certification',
            type: 'certificate',
            status: 'current',
            expiryDate: '2025-09-30',
            uploadedDate: '2023-09-30',
            persona: 'alex'
          },
          {
            id: 'doc-014',
            name: 'Liability Waiver Template',
            type: 'consent',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'alex'
          },
          {
            id: 'doc-015',
            name: 'Nutrition Counseling Certification',
            type: 'certificate',
            status: 'current',
            expiryDate: '2025-07-31',
            uploadedDate: '2024-07-31',
            persona: 'alex'
          }
        ],
        david: [
          {
            id: 'doc-016',
            name: 'Dealer License',
            type: 'license',
            status: 'current',
            expiryDate: '2025-12-31',
            uploadedDate: '2024-12-31',
            persona: 'david'
          },
          {
            id: 'doc-017',
            name: 'Consumer Privacy Policy',
            type: 'policy',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'david'
          },
          {
            id: 'doc-018',
            name: 'Financing Disclosure Forms',
            type: 'disclosure',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'david'
          }
        ]
      };

      setComplianceRules(baseRules[currentPersona] || []);
      setDocuments(baseDocuments[currentPersona] || []);
    };

    generateComplianceData();
  }, [currentPersona]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'violation': return 'text-red-600 bg-red-100';
      case 'current': return 'text-green-600 bg-green-100';
      case 'expiring': return 'text-yellow-600 bg-yellow-100';
      case 'expired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'current': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
      case 'expiring': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'violation':
      case 'expired': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'marketing': return 'bg-blue-100 text-blue-800';
      case 'privacy': return 'bg-purple-100 text-purple-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'health': return 'bg-red-100 text-red-800';
      case 'legal': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const compliantCount = complianceRules.filter(r => r.status === 'compliant').length;
  const warningCount = complianceRules.filter(r => r.status === 'warning').length;
  const violationCount = complianceRules.filter(r => r.status === 'violation').length;
  const currentDocsCount = documents.filter(d => d.status === 'current').length;
  const expiringDocsCount = documents.filter(d => d.status === 'expiring').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Center</h1>
          <p className="text-gray-600">Monitor regulatory compliance and manage documentation</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compliant</p>
              <p className="text-2xl font-bold text-green-600">{compliantCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Violations</p>
              <p className="text-2xl font-bold text-red-600">{violationCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Docs</p>
              <p className="text-2xl font-bold text-blue-600">{currentDocsCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-600">{expiringDocsCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'rules', 'documents', 'audits'].map((tab) => (
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
            {/* Recent Compliance Alerts */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
              <div className="space-y-4">
                {complianceRules.filter(r => r.status !== 'compliant').map((rule) => (
                  <div key={rule.id} className="flex items-start space-x-3">
                    {getStatusIcon(rule.status)}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{rule.title}</p>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Next review: {rule.nextReview}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expiring Documents */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Expiring Documents</h3>
              <div className="space-y-4">
                {documents.filter(d => d.status === 'expiring').map((doc) => (
                  <div key={doc.id} className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-600">Expires: {doc.expiryDate}</p>
                      <p className="text-xs text-gray-500 mt-1">Type: {doc.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Compliance Rules</h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search rules..."
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

            <div className="space-y-4">
              {complianceRules.map((rule) => (
                <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(rule.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{rule.title}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(rule.category)}`}>
                            {rule.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {rule.requirements.map((req, index) => (
                                <li key={index}>• {req}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Actions:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {rule.actions.map((action, index) => (
                                <li key={index}>• {action}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rule.status)}`}>
                        {rule.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Next review: {rule.nextReview}</p>
                    </div>
                  </div>
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
              <h3 className="text-lg font-semibold text-gray-900">Compliance Documents</h3>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Document</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-500 capitalize">{doc.type}</p>
                      </div>
                    </div>
                    {getStatusIcon(doc.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                    {doc.expiryDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Expires:</span>
                        <span className="text-gray-900">{doc.expiryDate}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Uploaded:</span>
                      <span className="text-gray-900">{doc.uploadedDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-medium">
                      View
                    </button>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium">
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audits Tab */}
      {activeTab === 'audits' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Audits</h3>
            <div className="text-center py-12">
              <Scale className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Audit management system</p>
              <p className="text-sm text-gray-500">Schedule and track compliance audits</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceCenterPage;