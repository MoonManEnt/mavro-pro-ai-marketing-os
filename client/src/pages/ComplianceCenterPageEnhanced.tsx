import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Clock, Users, Scale, Eye, Download, Upload, Search, Filter, AlertCircle, Lock, BookOpen, ExternalLink, Zap, Target, BarChart3, Calendar, Award, Building, Globe, FileCheck, AlertOctagon, Sparkles, MoreHorizontal, Settings, RefreshCw, TrendingUp, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlatformIcon } from '../components/ui/PlatformIcon';
import { useComplianceScanner } from '../hooks/useComplianceScanner';

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
  viviResolution?: string;
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

interface OAuthStatus {
  platform: string;
  status: 'valid' | 'expired' | 'revoked' | 'warning';
  expiresAt?: string;
  lastChecked: string;
  scopes: string[];
  icon: string;
}

interface ComplianceCenterPageProps {
  currentPersona: string;
}

const ComplianceCenterPageEnhanced: React.FC<ComplianceCenterPageProps> = ({ currentPersona }) => {
  // Use the provided hook for compliance data management
  const { 
    complianceFlags, 
    complianceScore, 
    resolveFlag, 
    scanCompliance,
    setComplianceFlags 
  } = useComplianceScanner();
  
  // Simple demo mode detection without auth context
  const isDemoMode = localStorage.getItem('demoMode') === 'true';
  const actualBetaUser = !isDemoMode;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'oauth' | 'documents' | 'audits' | 'alerts'>('overview');
  const [documents, setDocuments] = useState<ComplianceDocument[]>([]);
  const [audits, setAudits] = useState<ComplianceAudit[]>([]);
  const [oauthStatus, setOauthStatus] = useState<OAuthStatus[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showViViResolver, setShowViViResolver] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<ComplianceRule | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // For beta users, show empty state; for demo users, generate persona-specific data
    if (actualBetaUser) {
      setDocuments([]);
      setAudits([]);
      setOauthStatus([]);
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
            priority: 'medium',
            lastChecked: '2024-08-01',
            nextReview: '2024-08-15',
            industry: ['Professional Services', 'Consulting'],
            requirements: ['Clear disclaimers', 'Truthful testimonials', 'Professional tone'],
            actions: ['Review social media posts', 'Verify testimonial authenticity'],
            riskLevel: 20,
            affectedPlatforms: ['linkedin', 'facebook'],
            regulatoryBody: 'Professional Standards Board',
            viviResolution: 'ViVi has automatically added professional disclaimers to all marketing content and ensured testimonials include proper attribution.'
          },
          {
            id: 'rule-002',
            title: 'LinkedIn Professional Content Guidelines',
            description: 'Posts must maintain professional standards and avoid promotional language that violates platform TOS',
            category: 'platform',
            status: 'warning',
            priority: 'high',
            lastChecked: '2024-07-30',
            nextReview: '2024-08-05',
            industry: ['All'],
            requirements: ['Professional tone', 'Value-first content', 'No direct sales pitches'],
            actions: ['Review recent posts', 'Adjust content strategy'],
            riskLevel: 65,
            affectedPlatforms: ['linkedin'],
            regulatoryBody: 'LinkedIn Platform',
            viviResolution: 'ViVi suggests reframing promotional content as educational insights and adding value-driven context to all posts.'
          },
          {
            id: 'rule-003',
            title: 'Data Privacy and Collection Compliance',
            description: 'Ensure all data collection practices comply with GDPR and CCPA requirements',
            category: 'privacy',
            status: 'compliant',
            priority: 'critical',
            lastChecked: '2024-08-01',
            nextReview: '2024-08-08',
            industry: ['All'],
            requirements: ['Privacy policy', 'Consent mechanisms', 'Data retention policies'],
            actions: ['Update privacy policy', 'Implement consent forms'],
            riskLevel: 15,
            affectedPlatforms: ['google', 'facebook', 'instagram'],
            regulatoryBody: 'GDPR/CCPA',
            viviResolution: 'ViVi has automatically generated updated privacy policies and implemented cookie consent banners across all platforms.'
          }
        ]
      };

      const baseDocuments: Record<string, ComplianceDocument[]> = {
        kemar: [
          {
            id: 'doc-001',
            name: 'Privacy Policy 2024',
            type: 'policy',
            status: 'current',
            uploadedDate: '2024-07-15',
            persona: 'kemar',
            size: '2.4 MB',
            version: '2.1',
            tags: ['GDPR', 'CCPA', 'Privacy']
          },
          {
            id: 'doc-002',
            name: 'Professional Services License',
            type: 'license',
            status: 'expiring',
            expiryDate: '2024-09-15',
            uploadedDate: '2023-09-15',
            persona: 'kemar',
            size: '1.2 MB',
            version: '1.0',
            tags: ['License', 'Professional']
          },
          {
            id: 'doc-003',
            name: 'Content Disclaimer Template',
            type: 'template',
            status: 'current',
            uploadedDate: '2024-08-01',
            persona: 'kemar',
            size: '0.8 MB',
            version: '1.3',
            tags: ['Disclaimer', 'Template', 'Marketing']
          }
        ]
      };

      const baseAudits: Record<string, ComplianceAudit[]> = {
        kemar: [
          {
            id: 'audit-001',
            title: 'Q2 2024 Compliance Review',
            date: '2024-07-31',
            status: 'passed',
            score: 92,
            category: 'General Compliance',
            findings: 2,
            recommendations: ['Update social media policies', 'Enhance data retention procedures']
          },
          {
            id: 'audit-002',
            title: 'Platform TOS Compliance Check',
            date: '2024-08-01',
            status: 'in-progress',
            score: 0,
            category: 'Platform Compliance',
            findings: 0,
            recommendations: []
          }
        ]
      };

      const baseOAuth: OAuthStatus[] = [
        {
          platform: 'Google Business',
          status: 'valid',
          expiresAt: '2024-09-15',
          lastChecked: '2024-08-01',
          scopes: ['business.manage', 'reviews.read'],
          icon: 'google'
        },
        {
          platform: 'Facebook',
          status: 'warning',
          expiresAt: '2024-08-10',
          lastChecked: '2024-08-01',
          scopes: ['pages_manage_posts', 'pages_read_engagement'],
          icon: 'facebook'
        },
        {
          platform: 'LinkedIn',
          status: 'valid',
          expiresAt: '2024-10-01',
          lastChecked: '2024-08-01',
          scopes: ['w_member_social', 'r_liteprofile'],
          icon: 'linkedin'
        },
        {
          platform: 'Instagram',
          status: 'expired',
          expiresAt: '2024-07-25',
          lastChecked: '2024-08-01',
          scopes: ['instagram_basic', 'instagram_content_publish'],
          icon: 'instagram'
        }
      ];

      // Hook manages the compliance data automatically
      setDocuments(baseDocuments[currentPersona] || baseDocuments.kemar);
      setAudits(baseAudits[currentPersona] || baseAudits.kemar);
      setOauthStatus(baseOAuth);
    };

    generateComplianceData();
  }, [currentPersona, actualBetaUser]);

  // Animation variants
  const tabVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 }
  };

  const cardVariants = {
    hover: { 
      scale: 1.02,
      boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 }
    }
  };

  // Status colors and icons
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': case 'current': case 'passed': case 'valid':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'warning': case 'expiring': case 'in-progress':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'violation': case 'expired': case 'failed': case 'revoked':
        return 'text-red-700 bg-red-100 border-red-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-700 bg-red-100';
      case 'high': return 'text-orange-700 bg-orange-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      default: return 'text-green-700 bg-green-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'marketing': return Target;
      case 'privacy': return Lock;
      case 'financial': return BarChart3;
      case 'health': return Shield;
      case 'legal': return Scale;
      case 'platform': return Globe;
      default: return FileText;
    }
  };

  // Compliance score meter component
  const ComplianceScoreMeter = ({ score }: { score: number }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 144 144">
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="rgb(229, 231, 235)"
            strokeWidth="12"
            fill="transparent"
          />
          <motion.circle
            cx="72"
            cy="72"
            r={radius}
            stroke={score >= 90 ? "rgb(34, 197, 94)" : score >= 70 ? "rgb(234, 179, 8)" : "rgb(239, 68, 68)"}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div 
              className="text-2xl font-black text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {score}
            </motion.div>
            <div className="text-xs text-gray-600">Score</div>
          </div>
        </div>
      </div>
    );
  };

  // OAuth status light component
  const OAuthStatusLight = ({ status }: { status: string }) => {
    const getColor = () => {
      switch (status) {
        case 'valid': return 'bg-green-500';
        case 'warning': return 'bg-yellow-500';
        case 'expired': case 'revoked': return 'bg-red-500';
        default: return 'bg-gray-500';
      }
    };

    return (
      <motion.div
        className={`w-3 h-3 rounded-full ${getColor()}`}
        animate={{
          opacity: status === 'warning' || status === 'expired' ? [1, 0.3, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: status === 'warning' || status === 'expired' ? Infinity : 0,
        }}
      />
    );
  };

  // Fix with ViVi handler
  const handleFixWithViVi = (rule: ComplianceRule) => {
    setSelectedIssue(rule);
    setShowViViResolver(true);
  };

  // Handle resolve compliance flag
  const handleResolveFlag = async (flagId: string) => {
    setIsLoading(true);
    try {
      const result = await resolveFlag(flagId);
      if (result.success) {
        console.log('Compliance flag resolved successfully');
        setShowViViResolver(false);
      } else {
        console.error('Failed to resolve flag:', result.error);
      }
    } catch (error) {
      console.error('Error resolving flag:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle compliance scan
  const handleScanCompliance = async () => {
    setIsLoading(true);
    try {
      const result = await scanCompliance();
      if (result.success) {
        console.log('Compliance scan completed successfully');
      } else {
        console.error('Failed to run compliance scan:', result.error);
      }
    } catch (error) {
      console.error('Error running compliance scan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Tab definitions
  const complianceTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'rules', label: 'Compliance Rules', icon: Shield },
    { id: 'oauth', label: 'OAuth & API Health', icon: Settings },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'audits', label: 'Audits', icon: CheckCircle },
    { id: 'alerts', label: 'Active Alerts', icon: AlertTriangle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto p-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex items-center justify-center w-14 h-14 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Compliance Intelligence Center</h1>
                <p className="text-gray-600 font-medium">Real-time trust & risk monitoring with AI-powered resolution</p>
              </div>
            </div>

            {/* Compliance Score Display */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <ComplianceScoreMeter score={complianceScore} />
                <div className="mt-2">
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                    complianceScore >= 90 ? 'text-green-700 bg-green-100' :
                    complianceScore >= 70 ? 'text-yellow-700 bg-yellow-100' :
                    'text-red-700 bg-red-100'
                  }`}>
                    {complianceScore >= 90 ? 'Excellent' : complianceScore >= 70 ? 'Good' : 'Needs Attention'}
                  </div>
                </div>
              </div>

              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-2xl font-medium hover:bg-purple-200 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4" />
                Generate Compliance Report
              </motion.button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-green-600">{complianceFlags.filter(r => r.resolved).length}</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-yellow-600">{complianceFlags.filter(r => !r.resolved && r.severity === 'Medium').length}</div>
              <div className="text-sm text-gray-600">Warnings</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-red-600">{complianceFlags.filter(r => !r.resolved && r.severity === 'High').length}</div>
              <div className="text-sm text-gray-600">Violations</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-blue-600">{oauthStatus.filter(o => o.status === 'valid').length}</div>
              <div className="text-sm text-gray-600">Valid Tokens</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-black text-purple-600">{documents.filter(d => d.status === 'current').length}</div>
              <div className="text-sm text-gray-600">Current Docs</div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200/50 p-2">
            <div className="flex flex-wrap gap-2">
              {complianceTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Risk Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Compliance Rules Summary */}
                  <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                    <div className="p-8 border-b border-gray-200/50">
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight">Compliance Status</h2>
                      <p className="text-gray-600 font-medium">Current rule compliance overview</p>
                    </div>
                    <div className="p-8">
                      <div className="space-y-4">
                        {complianceFlags.slice(0, 3).map((rule, index) => {
                          const Icon = getCategoryIcon(rule.category);
                          return (
                            <motion.div
                              key={rule.id}
                              className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900">{rule.issueType}</h3>
                                    <p className="text-sm text-gray-600">{rule.regulatoryBody}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${rule.resolved ? 'text-green-700 bg-green-100' : rule.severity === 'High' ? 'text-red-700 bg-red-100' : 'text-yellow-700 bg-yellow-100'}`}>
                                    {rule.resolved ? 'Resolved' : rule.severity}
                                  </span>
                                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${getPriorityColor(rule.priority)}`}>
                                    {rule.priority}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mb-3">{rule.description}</p>
                              {!rule.resolved && rule.viviResolution && (
                                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200/50">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium text-purple-900">ViVi Resolution:</span>
                                  </div>
                                  <p className="text-sm text-purple-800">{rule.viviResolution}</p>
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* OAuth Health Monitor */}
                  <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                    <div className="p-8 border-b border-gray-200/50">
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight">OAuth & API Health</h2>
                      <p className="text-gray-600 font-medium">Platform connection status</p>
                    </div>
                    <div className="p-8">
                      <div className="space-y-4">
                        {oauthStatus.map((oauth, index) => {
                          return (
                            <motion.div
                              key={oauth.platform}
                              className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                                    <PlatformIcon platform={oauth.icon} className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900">{oauth.platform}</h3>
                                    <p className="text-sm text-gray-600">
                                      {oauth.expiresAt && `Expires: ${oauth.expiresAt}`}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <OAuthStatusLight status={oauth.status} />
                                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(oauth.status)}`}>
                                    {oauth.status}
                                  </span>
                                </div>
                              </div>
                              {oauth.status !== 'valid' && (
                                <motion.button
                                  className="mt-3 w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-all"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Re-authorize Connection
                                </motion.button>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                <div className="p-8 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight">Compliance Rules</h2>
                      <p className="text-gray-600 font-medium">{complianceFlags.length} rules configured</p>
                    </div>
                    <motion.button
                      onClick={handleScanCompliance}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-2xl font-medium hover:bg-blue-200 transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                      Scan All Rules
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="space-y-6">
                    {complianceFlags.map((rule, index) => {
                      const Icon = getCategoryIcon(rule.category);
                      return (
                        <motion.div
                          key={rule.id}
                          className="group p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50/20 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                          variants={cardVariants}
                          whileHover="hover"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{rule.issueType}</h3>
                                <p className="text-gray-600">{rule.regulatoryBody}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 text-xs font-bold rounded-full ${rule.resolved ? 'text-green-700 bg-green-100' : rule.severity === 'High' ? 'text-red-700 bg-red-100' : 'text-yellow-700 bg-yellow-100'}`}>
                                {rule.resolved ? 'Resolved' : rule.severity}
                              </span>
                              <span className={`px-3 py-1 text-xs font-bold rounded-full ${getPriorityColor(rule.priority)}`}>
                                {rule.priority}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{rule.description}</p>

                          {/* Risk Level Indicator */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Risk Level</span>
                              <span className="text-sm font-bold text-gray-900">{rule.riskLevel}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                className={`h-2 rounded-full ${
                                  rule.riskLevel >= 70 ? 'bg-red-500' :
                                  rule.riskLevel >= 40 ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${rule.riskLevel}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </div>

                          {/* ViVi Resolution */}
                          {!rule.resolved && rule.viviResolution && (
                            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200/50 mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-purple-600" />
                                <span className="text-sm font-medium text-purple-900">ViVi Resolution Plan:</span>
                              </div>
                              <p className="text-sm text-purple-800">{rule.viviResolution}</p>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <motion.div 
                            className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {!rule.resolved && (
                              <motion.button
                                onClick={() => handleFixWithViVi(rule)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Sparkles className="w-4 h-4" />
                                Fix with ViVi
                              </motion.button>
                            )}
                            <motion.button
                              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'oauth' && (
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                <div className="p-8 border-b border-gray-200/50">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">OAuth & API Health Monitor</h2>
                  <p className="text-gray-600 font-medium">Platform connection status and token management</p>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {oauthStatus.map((oauth, index) => {
                      return (
                        <motion.div
                          key={oauth.platform}
                          className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-gray-100">
                                <PlatformIcon platform={oauth.icon} className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{oauth.platform}</h3>
                                <p className="text-sm text-gray-600">Last checked: {oauth.lastChecked}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <OAuthStatusLight status={oauth.status} />
                              <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(oauth.status)}`}>
                                {oauth.status}
                              </span>
                            </div>
                          </div>

                          {oauth.expiresAt && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-600">Expires: {oauth.expiresAt}</p>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div className={`h-2 rounded-full ${
                                  oauth.status === 'valid' ? 'bg-green-500' :
                                  oauth.status === 'warning' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`} style={{ width: '75%' }} />
                              </div>
                            </div>
                          )}

                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Scopes:</h4>
                            <div className="flex flex-wrap gap-1">
                              {oauth.scopes.map((scope) => (
                                <span key={scope} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  {scope}
                                </span>
                              ))}
                            </div>
                          </div>

                          {oauth.status !== 'valid' && (
                            <motion.button
                              className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Re-authorize Connection
                            </motion.button>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Additional tabs content can be added here following the same pattern */}
          </motion.div>
        </AnimatePresence>

        {/* ViVi Resolution Modal */}
        <AnimatePresence>
          {showViViResolver && selectedIssue && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowViViResolver(false)}
            >
              <motion.div
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={ { scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">ViVi Resolution Plan</h2>
                      <p className="text-gray-600">{selectedIssue.title}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200/50">
                      <h3 className="font-bold text-purple-900 mb-2">Recommended Actions:</h3>
                      <p className="text-purple-800">{selectedIssue.viviResolution}</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200/50">
                      <h3 className="font-bold text-blue-900 mb-2">Implementation Steps:</h3>
                      <ul className="space-y-2">
                        {selectedIssue.actions.map((action, index) => (
                          <li key={index} className="flex items-center gap-2 text-blue-800">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <motion.button
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (selectedIssue) {
                            handleResolveFlag(selectedIssue.id);
                          }
                        }}
                        disabled={isLoading}
                      >
                        Apply ViVi Resolution
                      </motion.button>
                      <motion.button
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowViViResolver(false)}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ComplianceCenterPageEnhanced;