import { useState, useEffect } from 'react';

export const useComplianceScanner = () => {
  const [complianceFlags, setComplianceFlags] = useState([
    {
      id: '101',
      issueType: 'HIPAA Violation',
      platform: 'Instagram',
      description: 'Photo posted without patient consent',
      severity: 'High',
      resolved: false,
      riskLevel: 85,
      category: 'health',
      priority: 'critical',
      lastChecked: '2024-08-01',
      nextReview: '2024-08-03',
      affectedPlatforms: ['instagram'],
      regulatoryBody: 'HIPAA',
      viviResolution: 'ViVi suggests removing the photo and implementing consent verification workflow for future health-related content.',
      actions: ['Remove non-compliant content', 'Implement consent verification', 'Update content guidelines']
    },
    {
      id: '102',
      issueType: 'LinkedIn Professional Content Guidelines',
      platform: 'LinkedIn',
      description: 'Post contains promotional language that may violate platform TOS',
      severity: 'Medium',
      resolved: false,
      riskLevel: 65,
      category: 'platform',
      priority: 'high',
      lastChecked: '2024-07-30',
      nextReview: '2024-08-05',
      affectedPlatforms: ['linkedin'],
      regulatoryBody: 'LinkedIn Platform',
      viviResolution: 'ViVi recommends reframing promotional content as educational insights and adding value-driven context.',
      actions: ['Review recent posts', 'Adjust content strategy', 'Update posting guidelines']
    },
    {
      id: '103',
      issueType: 'Data Privacy Compliance',
      platform: 'Facebook',
      description: 'Missing privacy policy link in data collection forms',
      severity: 'Low',
      resolved: true,
      riskLevel: 25,
      category: 'privacy',
      priority: 'medium',
      lastChecked: '2024-08-01',
      nextReview: '2024-08-15',
      affectedPlatforms: ['facebook', 'instagram'],
      regulatoryBody: 'GDPR/CCPA',
      viviResolution: 'ViVi has automatically added privacy policy links to all data collection forms.',
      actions: ['Add privacy policy links', 'Update consent forms', 'Review data collection practices']
    }
  ]);

  const [complianceScore, setComplianceScore] = useState(76);

  // Calculate compliance score based on flags
  useEffect(() => {
    const totalFlags = complianceFlags.length;
    if (totalFlags === 0) {
      setComplianceScore(100);
      return;
    }

    const resolvedFlags = complianceFlags.filter(flag => flag.resolved).length;
    const unresolvedHighSeverity = complianceFlags.filter(flag => !flag.resolved && flag.severity === 'High').length;
    const unresolvedMediumSeverity = complianceFlags.filter(flag => !flag.resolved && flag.severity === 'Medium').length;

    // Calculate score: resolved flags contribute positively, unresolved high severity flags have major impact
    const baseScore = (resolvedFlags / totalFlags) * 100;
    const penalties = (unresolvedHighSeverity * 30) + (unresolvedMediumSeverity * 15);
    const finalScore = Math.max(0, Math.min(100, baseScore - penalties));
    
    setComplianceScore(Math.round(finalScore));
  }, [complianceFlags]);

  const resolveFlag = async (flagId) => {
    try {
      const response = await fetch(`/api/compliance/resolve/${flagId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setComplianceFlags(prev => prev.map(flag => 
          flag.id === flagId ? { ...flag, resolved: true, riskLevel: Math.max(10, flag.riskLevel - 50) } : flag
        ));
        return { success: true, message: `Compliance flag ${flagId} resolved successfully` };
      } else {
        throw new Error('Failed to resolve flag');
      }
    } catch (error) {
      console.error('Error resolving flag:', error);
      return { success: false, error: 'Failed to resolve compliance flag' };
    }
  };

  const scanCompliance = async () => {
    // Simulate compliance scan
    console.log('Running compliance scan...');
    // In real implementation, this would trigger a backend scan
    return { success: true, message: 'Compliance scan completed' };
  };

  return { 
    complianceFlags, 
    complianceScore, 
    resolveFlag, 
    scanCompliance,
    setComplianceFlags 
  };
};