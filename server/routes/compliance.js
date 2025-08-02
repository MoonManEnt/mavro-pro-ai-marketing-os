// /api/compliance.js
import express from 'express';
const router = express.Router();

// Dummy in-memory DB
let complianceFlags = [
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
];

// OAuth status data
let oauthStatus = [
  {
    platform: 'Google Business',
    status: 'valid',
    expiresAt: '2024-09-15',
    lastChecked: '2024-08-01',
    scopes: ['business.manage', 'reviews.read']
  },
  {
    platform: 'Facebook',
    status: 'warning',
    expiresAt: '2024-08-10',
    lastChecked: '2024-08-01',
    scopes: ['pages_manage_posts', 'pages_read_engagement']
  },
  {
    platform: 'LinkedIn',
    status: 'valid',
    expiresAt: '2024-10-01',
    lastChecked: '2024-08-01',
    scopes: ['w_member_social', 'r_liteprofile']
  },
  {
    platform: 'Instagram',
    status: 'expired',
    expiresAt: '2024-07-25',
    lastChecked: '2024-08-01',
    scopes: ['instagram_basic', 'instagram_content_publish']
  }
];

// Get all compliance flags
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      flags: complianceFlags,
      score: calculateComplianceScore(),
      summary: {
        total: complianceFlags.length,
        resolved: complianceFlags.filter(f => f.resolved).length,
        highSeverity: complianceFlags.filter(f => f.severity === 'High' && !f.resolved).length,
        mediumSeverity: complianceFlags.filter(f => f.severity === 'Medium' && !f.resolved).length,
        lowSeverity: complianceFlags.filter(f => f.severity === 'Low' && !f.resolved).length
      }
    }
  });
});

// Get OAuth status
router.get('/oauth', (req, res) => {
  res.json({
    success: true,
    data: oauthStatus
  });
});

// Resolve a compliance flag
router.post('/resolve/:id', (req, res) => {
  const { id } = req.params;
  const flag = complianceFlags.find(f => f.id === id);
  if (!flag) return res.status(404).json({ 
    success: false, 
    error: 'Compliance flag not found' 
  });

  flag.resolved = true;
  flag.riskLevel = Math.max(10, flag.riskLevel - 50);
  flag.resolvedAt = new Date().toISOString();

  return res.json({ 
    success: true,
    message: `Compliance flag ${id} resolved successfully`, 
    data: flag 
  });
});

// Run compliance scan
router.post('/scan', (req, res) => {
  // Simulate running a compliance scan
  const scanResults = {
    scannedAt: new Date().toISOString(),
    platformsScanned: ['instagram', 'facebook', 'linkedin', 'google'],
    newFlags: Math.floor(Math.random() * 3), // Random 0-2 new flags
    resolvedFlags: Math.floor(Math.random() * 2), // Random 0-1 resolved flags
    score: calculateComplianceScore()
  };

  res.json({
    success: true,
    message: 'Compliance scan completed successfully',
    data: scanResults
  });
});

// Helper function to calculate compliance score
function calculateComplianceScore() {
  const totalFlags = complianceFlags.length;
  if (totalFlags === 0) return 100;

  const resolvedFlags = complianceFlags.filter(flag => flag.resolved).length;
  const unresolvedHighSeverity = complianceFlags.filter(flag => !flag.resolved && flag.severity === 'High').length;
  const unresolvedMediumSeverity = complianceFlags.filter(flag => !flag.resolved && flag.severity === 'Medium').length;

  const baseScore = (resolvedFlags / totalFlags) * 100;
  const penalties = (unresolvedHighSeverity * 30) + (unresolvedMediumSeverity * 15);
  const finalScore = Math.max(0, Math.min(100, baseScore - penalties));
  
  return Math.round(finalScore);
}

export default router;