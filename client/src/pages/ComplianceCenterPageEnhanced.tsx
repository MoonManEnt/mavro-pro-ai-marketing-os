import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Clock, Users, Scale, Eye, Download, Upload, Search, Filter, AlertCircle, Lock, BookOpen, ExternalLink, Zap, Target, BarChart3, Calendar, Award, Building, Globe, FileCheck, AlertOctagon, Sparkles, MoreHorizontal } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ComplianceRule {
  id: string;
  title: string;
  description: string;
  category: 'marketing' | 'privacy' | 'financial' | 'health' | 'legal' | 'platform';
  status: 'compliant' | 'warning' | 'violation' | 'pending';
  priority: 'low' | 'medium' | 'high' | 'critical';
  lastChecked: string;
  nextReview: string;
  industry: string[];
  requirements: string[];
  actions: string[];
  riskLevel: number;
  affectedPlatforms?: string[];
  regulatoryBody?: string;
}

interface ComplianceDocument {
  id: string;
  name: string;
  type: 'policy' | 'consent' | 'disclosure' | 'license' | 'certificate' | 'template' | 'audit';
  status: 'current' | 'expiring' | 'expired' | 'draft';
  expiryDate?: string;
  uploadedDate: string;
  persona: string;
  size?: string;
  version?: string;
  tags?: string[];
}

interface ComplianceAudit {
  id: string;
  title: string;
  date: string;
  status: 'passed' | 'failed' | 'pending' | 'in-progress';
  score: number;
  category: string;
  findings: number;
  recommendations: string[];
}

interface ComplianceCenterPageProps {
  currentPersona: string;
}

const ComplianceCenterPageEnhanced: React.FC<ComplianceCenterPageProps> = ({ currentPersona }) => {
  const { isAuthenticated, isDemoMode } = useAuth();
  const actualBetaUser = isAuthenticated && !isDemoMode;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'documents' | 'audits' | 'alerts'>('overview');
  const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>([]);
  const [documents, setDocuments] = useState<ComplianceDocument[]>([]);
  const [audits, setAudits] = useState<ComplianceAudit[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    // For beta users, show empty state; for demo users, generate persona-specific data
    if (actualBetaUser) {
      setComplianceRules([]);
      setDocuments([]);
      setAudits([]);
      return;
    }
    
    const generateComplianceData = () => {
      const baseRules: Record<string, ComplianceRule[]> = {
        kemar: [
          {
            id: 'rule-001',
            title: 'Professional Services Advertising Standards',
            description: 'Ensure all marketing materials comply with professional services advertising standards and ethical guidelines',
            category: 'marketing',
            status: 'compliant',
            priority: 'high',
            lastChecked: '2025-01-10',
            nextReview: '2025-02-10',
            industry: ['professional-services', 'coaching'],
            requirements: ['Clear disclosure of qualifications', 'No misleading claims', 'Testimonial compliance', 'Professional imagery'],
            actions: ['Review all marketing materials monthly', 'Update testimonial disclaimers', 'Verify credential displays'],
            riskLevel: 2,
            affectedPlatforms: ['LinkedIn', 'Website', 'Speaking Materials'],
            regulatoryBody: 'Professional Standards Board'
          },
          {
            id: 'rule-002',
            title: 'Client Confidentiality & Data Protection',
            description: 'Maintain strict confidentiality of client information in all communications and marketing materials',
            category: 'privacy',
            status: 'compliant',
            priority: 'critical',
            lastChecked: '2025-01-08',
            nextReview: '2025-02-08',
            industry: ['coaching', 'consulting'],
            requirements: ['Non-disclosure agreements', 'Secure data handling', 'Limited use of client examples', 'Anonymization protocols'],
            actions: ['Update privacy policy', 'Review data retention policies', 'Audit client case studies'],
            riskLevel: 1,
            affectedPlatforms: ['All Platforms', 'CRM Systems'],
            regulatoryBody: 'GDPR/CCPA'
          },
          {
            id: 'rule-003',
            title: 'LinkedIn Professional Networking Guidelines',
            description: 'Adhere to LinkedIn professional networking guidelines and platform-specific compliance requirements',
            category: 'platform',
            status: 'warning',
            priority: 'medium',
            lastChecked: '2025-01-05',
            nextReview: '2025-01-15',
            industry: ['professional-services'],
            requirements: ['Professional tone', 'No spam messaging', 'Authentic engagement', 'Connection request limits'],
            actions: ['Review automated messaging sequences', 'Update connection request templates', 'Audit engagement practices'],
            riskLevel: 3,
            affectedPlatforms: ['LinkedIn'],
            regulatoryBody: 'LinkedIn Professional Community Policies'
          },
          {
            id: 'rule-004',
            title: 'Speaking Engagement Compliance',
            description: 'Ensure all speaking engagements meet professional standards and disclosure requirements',
            category: 'marketing',
            status: 'compliant',
            priority: 'medium',
            lastChecked: '2025-01-12',
            nextReview: '2025-02-12',
            industry: ['professional-services', 'leadership'],
            requirements: ['Speaker bio accuracy', 'Credential verification', 'Content disclaimers', 'Conflict of interest disclosure'],
            actions: ['Update speaker materials', 'Verify all credentials', 'Review presentation content'],
            riskLevel: 2,
            affectedPlatforms: ['Speaking Platforms', 'Event Marketing'],
            regulatoryBody: 'Industry Professional Standards'
          }
        ],
        karen: [
          {
            id: 'rule-005',
            title: 'Real Estate Advertising Compliance (NAR)',
            description: 'Comply with National Association of Realtors and state real estate advertising requirements',
            category: 'marketing',
            status: 'compliant',
            priority: 'critical',
            lastChecked: '2025-01-12',
            nextReview: '2025-02-12',
            industry: ['real-estate'],
            requirements: ['Broker disclosure', 'Fair housing compliance', 'Accurate property descriptions', 'License number display'],
            actions: ['Include brokerage information in all ads', 'Review property listings for accuracy', 'Update fair housing logos'],
            riskLevel: 1,
            affectedPlatforms: ['MLS', 'Website', 'Social Media', 'Print Advertising'],
            regulatoryBody: 'National Association of Realtors'
          },
          {
            id: 'rule-006',
            title: 'Fair Housing Act Compliance',
            description: 'Ensure all marketing materials comply with federal and state fair housing regulations',
            category: 'legal',
            status: 'compliant',
            priority: 'critical',
            lastChecked: '2025-01-10',
            nextReview: '2025-02-10',
            industry: ['real-estate'],
            requirements: ['No discriminatory language', 'Equal opportunity displays', 'Inclusive marketing imagery', 'Accessibility compliance'],
            actions: ['Review all content for discriminatory language', 'Update fair housing logo placement', 'Audit marketing imagery'],
            riskLevel: 1,
            affectedPlatforms: ['All Marketing Channels'],
            regulatoryBody: 'HUD/Department of Justice'
          },
          {
            id: 'rule-007',
            title: 'Financial Privacy Protection (GLBA)',
            description: 'Protect client financial information per Gramm-Leach-Bliley Act requirements',
            category: 'privacy',
            status: 'warning',
            priority: 'high',
            lastChecked: '2025-01-08',
            nextReview: '2025-01-18',
            industry: ['real-estate', 'financial'],
            requirements: ['Data encryption', 'Access controls', 'Privacy notices', 'Incident response procedures'],
            actions: ['Update privacy notice language', 'Review data access logs', 'Implement additional encryption'],
            riskLevel: 3,
            affectedPlatforms: ['CRM', 'Transaction Systems', 'Email'],
            regulatoryBody: 'Federal Trade Commission'
          },
          {
            id: 'rule-008',
            title: 'Florida Real Estate License Compliance',
            description: 'Maintain compliance with Florida Department of Business and Professional Regulation requirements',
            category: 'legal',
            status: 'compliant',
            priority: 'critical',
            lastChecked: '2025-01-15',
            nextReview: '2025-07-15',
            industry: ['real-estate'],
            requirements: ['Active license maintenance', 'Continuing education', 'Proper advertising disclosures', 'Transaction documentation'],
            actions: ['Complete CE requirements', 'Renew license', 'Update advertising materials'],
            riskLevel: 1,
            affectedPlatforms: ['All Professional Activities'],
            regulatoryBody: 'Florida DBPR'
          },
          {
            id: 'rule-009',
            title: 'MLS Data Usage & Attribution',
            description: 'Proper usage and attribution of Multiple Listing Service data in marketing materials',
            category: 'platform',
            status: 'pending',
            priority: 'medium',
            lastChecked: '2025-01-05',
            nextReview: '2025-01-20',
            industry: ['real-estate'],
            requirements: ['Proper MLS attribution', 'Data accuracy maintenance', 'Usage rights compliance', 'Timely updates'],
            actions: ['Review MLS attribution on website', 'Update listing information', 'Verify usage rights'],
            riskLevel: 4,
            affectedPlatforms: ['Website', 'Marketing Materials', 'Social Media'],
            regulatoryBody: 'Local MLS Organizations'
          }
        ]
      };

      const baseDocuments: Record<string, ComplianceDocument[]> = {
        kemar: [
          {
            id: 'doc-001',
            name: 'Client Confidentiality Agreement Template',
            type: 'template',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'kemar',
            size: '256 KB',
            version: '2.1',
            tags: ['confidentiality', 'client-agreement', 'legal']
          },
          {
            id: 'doc-002',
            name: 'Professional Services Privacy Policy',
            type: 'policy',
            status: 'current',
            expiryDate: '2025-12-31',
            uploadedDate: '2024-12-15',
            persona: 'kemar',
            size: '512 KB',
            version: '3.0',
            tags: ['privacy', 'gdpr', 'policy']
          },
          {
            id: 'doc-003',
            name: 'Speaker Credential Verification',
            type: 'certificate',
            status: 'current',
            expiryDate: '2025-06-30',
            uploadedDate: '2024-06-01',
            persona: 'kemar',
            size: '128 KB',
            version: '1.0',
            tags: ['credentials', 'speaking', 'verification']
          }
        ],
        karen: [
          {
            id: 'doc-004',
            name: 'Fair Housing Policy Statement',
            type: 'policy',
            status: 'current',
            uploadedDate: '2025-01-01',
            persona: 'karen',
            size: '184 KB',
            version: '1.5',
            tags: ['fair-housing', 'compliance', 'real-estate']
          },
          {
            id: 'doc-005',
            name: 'Florida Real Estate License',
            type: 'license',
            status: 'expiring',
            expiryDate: '2025-03-31',
            uploadedDate: '2023-03-31',
            persona: 'karen',
            size: '92 KB',
            version: '1.0',
            tags: ['license', 'florida', 'real-estate']
          },
          {
            id: 'doc-006',
            name: 'GLBA Compliance Checklist',
            type: 'template',
            status: 'current',
            uploadedDate: '2024-11-15',
            persona: 'karen',
            size: '321 KB',
            version: '2.0',
            tags: ['glba', 'financial', 'privacy', 'checklist']
          }
        ]
      };

      const baseAudits: Record<string, ComplianceAudit[]> = {
        kemar: [
          {
            id: 'audit-001',
            title: 'Q4 2024 Marketing Compliance Review',
            date: '2024-12-15',
            status: 'passed',
            score: 94,
            category: 'Marketing Materials',
            findings: 2,
            recommendations: ['Update testimonial disclaimers', 'Enhance credential displays']
          },
          {
            id: 'audit-002',
            title: 'Data Privacy Assessment',
            date: '2024-11-30',
            status: 'passed',
            score: 98,
            category: 'Privacy & Security',
            findings: 1,
            recommendations: ['Implement additional data encryption protocols']
          }
        ],
        karen: [
          {
            id: 'audit-003',
            title: 'Real Estate Advertising Compliance Check',
            date: '2025-01-05',
            status: 'passed',
            score: 96,
            category: 'Advertising Standards',
            findings: 1,
            recommendations: ['Update MLS attribution on social media posts']
          },
          {
            id: 'audit-004',
            title: 'Fair Housing Compliance Review',
            date: '2024-12-20',
            status: 'passed',
            score: 100,
            category: 'Legal Compliance',
            findings: 0,
            recommendations: ['Maintain current practices', 'Continue inclusive marketing approach']
          }
        ]
      };
      
      const personaRules = baseRules[currentPersona] || [];
      const personaDocuments = baseDocuments[currentPersona] || [];
      const personaAudits = baseAudits[currentPersona] || [];
      
      setComplianceRules(personaRules);
      setDocuments(personaDocuments);
      setAudits(personaAudits);
    };

    generateComplianceData();
  }, [currentPersona, actualBetaUser]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'current':
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
      case 'expiring':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'violation':
      case 'expired':
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
      case 'in-progress':
      case 'draft':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'current':
      case 'passed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'warning':
      case 'expiring':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'violation':
      case 'expired':
      case 'failed':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'pending':
      case 'in-progress':
      case 'draft':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-700 bg-red-100 border-red-300';
      case 'high':
        return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'medium':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'low':
        return 'text-green-700 bg-green-100 border-green-300';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const filteredRules = complianceRules.filter(rule => {
    const matchesSearch = rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || rule.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || rule.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const complianceStats = {
    totalRules: complianceRules.length,
    compliant: complianceRules.filter(r => r.status === 'compliant').length,
    warnings: complianceRules.filter(r => r.status === 'warning').length,
    violations: complianceRules.filter(r => r.status === 'violation').length,
    pending: complianceRules.filter(r => r.status === 'pending').length,
    overallScore: complianceRules.length > 0 ? 
      Math.round((complianceRules.filter(r => r.status === 'compliant').length / complianceRules.length) * 100) : 0,
    criticalItems: complianceRules.filter(r => r.priority === 'critical' && r.status !== 'compliant').length
  };

  if (actualBetaUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Compliance Center</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Set up your compliance monitoring and regulatory requirements to ensure your marketing activities meet industry standards.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white font-black rounded-2xl hover:from-blue-600 hover:via-blue-700 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Configure Compliance Rules
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Compliance Center</h1>
              <p className="text-lg text-gray-600 font-medium">Monitor regulatory compliance and manage risk</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-2 bg-gradient-to-r from-gray-50 via-white to-purple-50/30 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-xl">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'rules', label: 'Compliance Rules', icon: Scale },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'audits', label: 'Audits', icon: FileCheck },
              { id: 'alerts', label: 'Alerts', icon: AlertOctagon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all duration-400 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white shadow-xl border border-blue-400/50 transform scale-105'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-blue-100/50 hover:shadow-lg hover:scale-102'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm font-black tracking-tight">{tab.label}</span>
                {tab.id === 'alerts' && complianceStats.criticalItems > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {complianceStats.criticalItems}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/40 border border-green-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{complianceStats.overallScore}%</p>
                    <p className="text-sm text-gray-600 font-medium">Compliance Score</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 border border-blue-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{complianceStats.totalRules}</p>
                    <p className="text-sm text-gray-600 font-medium">Active Rules</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/40 border border-yellow-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-lg">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{complianceStats.warnings}</p>
                    <p className="text-sm text-gray-600 font-medium">Warnings</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/40 border border-purple-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{documents.length}</p>
                    <p className="text-sm text-gray-600 font-medium">Documents</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Alerts */}
            {complianceStats.criticalItems > 0 && (
              <div className="bg-gradient-to-r from-red-50 via-red-25 to-pink-50/40 border-2 border-red-200 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg">
                    <AlertOctagon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Critical Compliance Items</h2>
                    <p className="text-red-700 font-medium">Immediate attention required</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {complianceRules.filter(r => r.priority === 'critical' && r.status !== 'compliant').map((rule) => (
                    <div key={rule.id} className="p-4 bg-white rounded-2xl border border-red-200/50 shadow-md">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(rule.status)}
                          <div>
                            <p className="font-bold text-gray-900">{rule.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                            <p className="text-xs text-red-600 mt-2">Next review: {rule.nextReview}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getPriorityColor(rule.priority)}`}>
                          {rule.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <div className="p-8 border-b border-gray-200/50">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Compliance Activity</h2>
                <p className="text-gray-600 font-medium">Latest updates and reviews</p>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {audits.slice(0, 3).map((audit) => (
                    <div key={audit.id} className="p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50/20 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                            <FileCheck className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{audit.title}</p>
                            <p className="text-sm text-gray-600">{audit.category} • {audit.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(audit.status)}`}>
                            {audit.status}
                          </span>
                          <span className="text-2xl font-black text-green-600">{audit.score}%</span>
                        </div>
                      </div>
                      {audit.findings > 0 && (
                        <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200/50">
                          <p className="text-sm font-medium text-yellow-800">{audit.findings} findings requiring attention</p>
                        </div>
                      )}
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
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search compliance rules..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    />
                  </div>
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="all">All Categories</option>
                  <option value="marketing">Marketing</option>
                  <option value="privacy">Privacy</option>
                  <option value="legal">Legal</option>
                  <option value="platform">Platform</option>
                  <option value="financial">Financial</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="all">All Statuses</option>
                  <option value="compliant">Compliant</option>
                  <option value="warning">Warning</option>
                  <option value="violation">Violation</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Rules List */}
            <div className="space-y-6">
              {filteredRules.map((rule) => (
                <div key={rule.id} className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden hover:shadow-3xl transition-all duration-300">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                          <Scale className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-900 mb-2">{rule.title}</h3>
                          <p className="text-gray-600 leading-relaxed mb-4">{rule.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Last checked: {rule.lastChecked}</span>
                            <span>Next review: {rule.nextReview}</span>
                            {rule.regulatoryBody && <span>Regulatory body: {rule.regulatoryBody}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-4 py-2 text-sm font-bold rounded-2xl border ${getStatusColor(rule.status)}`}>
                          {rule.status}
                        </span>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getPriorityColor(rule.priority)}`}>
                          {rule.priority}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      {/* Requirements */}
                      <div className="p-4 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 rounded-2xl border border-blue-200/50">
                        <h4 className="text-sm font-bold text-blue-900 mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {rule.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-blue-800">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="p-4 bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50/30 rounded-2xl border border-green-200/50">
                        <h4 className="text-sm font-bold text-green-900 mb-3">Required Actions</h4>
                        <ul className="space-y-2">
                          {rule.actions.map((action, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-green-800">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Affected Platforms */}
                    {rule.affectedPlatforms && (
                      <div className="p-4 bg-gradient-to-br from-purple-50 via-pink-50/50 to-orange-50/30 rounded-2xl border border-purple-200/50 mb-6">
                        <h4 className="text-sm font-bold text-purple-900 mb-3">Affected Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                          {rule.affectedPlatforms.map((platform, idx) => (
                            <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">Risk Level:</span>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < rule.riskLevel ? 'bg-red-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full capitalize">
                          {rule.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                          Review Now
                        </button>
                        <button className="p-3 text-gray-400 hover:text-gray-600 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <div className="p-8 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Compliance Documents</h2>
                    <p className="text-gray-600 font-medium">Policies, licenses, and compliance materials</p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Document</span>
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50/20 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-600">Version {doc.version} • {doc.size}</p>
                            <p className="text-xs text-gray-500 mt-1">Uploaded: {doc.uploadedDate}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                      
                      {doc.expiryDate && (
                        <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200/50 mb-4">
                          <p className="text-sm font-medium text-yellow-800">Expires: {doc.expiryDate}</p>
                        </div>
                      )}

                      {doc.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {doc.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full capitalize">
                          {doc.type}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-all duration-300">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:text-green-800 rounded-lg hover:bg-green-50 transition-all duration-300">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audits Tab */}
        {activeTab === 'audits' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <div className="p-8 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Compliance Audits</h2>
                    <p className="text-gray-600 font-medium">Audit history and compliance assessments</p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Run New Audit</span>
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {audits.map((audit) => (
                    <div key={audit.id} className="p-6 bg-gradient-to-br from-gray-50 via-white to-purple-50/20 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                            <FileCheck className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-lg font-black text-gray-900">{audit.title}</p>
                            <p className="text-sm text-gray-600">{audit.category} • {audit.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-3xl font-black text-green-600">{audit.score}%</p>
                            <p className="text-xs text-gray-500">Compliance Score</p>
                          </div>
                          <span className={`px-4 py-2 text-sm font-bold rounded-2xl border ${getStatusColor(audit.status)}`}>
                            {audit.status}
                          </span>
                        </div>
                      </div>

                      {audit.findings > 0 && (
                        <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200/50 mb-4">
                          <p className="text-sm font-bold text-yellow-900 mb-2">{audit.findings} Findings Identified</p>
                          <ul className="space-y-1">
                            {audit.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm text-yellow-800 flex items-start space-x-2">
                                <Target className="w-3 h-3 mt-1 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-600">Assessment completed</span>
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <div className="p-8 border-b border-gray-200/50">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Compliance Alerts</h2>
                <p className="text-gray-600 font-medium">Active compliance notifications and reminders</p>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {complianceRules.filter(r => r.status !== 'compliant').map((rule) => (
                    <div key={rule.id} className={`p-6 rounded-2xl border-2 shadow-lg ${
                      rule.priority === 'critical' ? 'bg-gradient-to-r from-red-50 via-red-25 to-pink-50/40 border-red-200' :
                      rule.priority === 'high' ? 'bg-gradient-to-r from-orange-50 via-orange-25 to-yellow-50/40 border-orange-200' :
                      'bg-gradient-to-r from-yellow-50 via-yellow-25 to-orange-50/40 border-yellow-200'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          {getStatusIcon(rule.status)}
                          <div>
                            <p className="font-bold text-gray-900">{rule.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              Next review: {rule.nextReview} | Risk Level: {rule.riskLevel}/5
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getPriorityColor(rule.priority)}`}>
                          {rule.priority.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(rule.status)}`}>
                          {rule.status.toUpperCase()}
                        </span>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                          Take Action
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {complianceRules.filter(r => r.status !== 'compliant').length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">All Clear!</h3>
                      <p className="text-gray-600">No active compliance alerts at this time.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceCenterPageEnhanced;