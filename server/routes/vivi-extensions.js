import express from 'express';
import ViViCampaignExtensionEngine from '../modules/ViViCampaignExtensionEngine.js';
import GeoPerformanceEngine from '../modules/GeoPerformanceEngine.js';

const router = express.Router();

// Initialize engines
const extensionEngine = new ViViCampaignExtensionEngine();
const geoEngine = new GeoPerformanceEngine();

// Initialize engines on startup
(async () => {
  try {
    await extensionEngine.initialize();
    await geoEngine.initialize();
    
    // Start the extension engine
    await extensionEngine.start();
    
    console.log('ViVi Extension systems initialized successfully');
  } catch (error) {
    console.error('Error initializing ViVi Extension systems:', error);
  }
})();

// Campaign Extension Engine Routes
router.get('/extension-actions', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const actions = await extensionEngine.getRecentActions(limit);
    res.json({
      success: true,
      actions,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting extension actions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get extension actions'
    });
  }
});

router.post('/process-campaigns', async (req, res) => {
  try {
    const actions = await extensionEngine.processCampaigns();
    res.json({
      success: true,
      actions,
      message: `Processed ${actions.length} campaign actions`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing campaigns:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process campaigns'
    });
  }
});

router.get('/extension-status', async (req, res) => {
  try {
    const activityLog = await extensionEngine.getActivityLog();
    const recentActions = await extensionEngine.getRecentActions(5);
    
    res.json({
      success: true,
      status: {
        isRunning: extensionEngine.isRunning,
        lastCheck: activityLog.lastCheck,
        totalExtensions: activityLog.extensions.length,
        totalPivots: activityLog.pivots.length,
        totalArchives: activityLog.archives.length,
        recentActions
      }
    });
  } catch (error) {
    console.error('Error getting extension status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get extension status'
    });
  }
});

// Geo Performance Engine Routes
router.get('/geo-performance/:persona?', async (req, res) => {
  try {
    const persona = req.params.persona || 'medspa';
    const snapshot = await geoEngine.getGeoPerformanceSnapshot(persona);
    
    res.json({
      success: true,
      persona,
      snapshot,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting geo performance:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get geo performance data'
    });
  }
});

router.get('/geo-top-regions/:persona?', async (req, res) => {
  try {
    const persona = req.params.persona || 'medspa';
    const limit = parseInt(req.query.limit) || 5;
    const topRegions = await geoEngine.getTopPerformingRegions(persona, limit);
    
    res.json({
      success: true,
      persona,
      topRegions,
      limit,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting top regions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get top performing regions'
    });
  }
});

router.get('/geo-boost-potential/:boostLevel/:persona?', async (req, res) => {
  try {
    const { boostLevel } = req.params;
    const persona = req.params.persona || 'medspa';
    const regions = await geoEngine.getRegionsByBoostPotential(boostLevel, persona);
    
    res.json({
      success: true,
      persona,
      boostLevel,
      regions,
      count: regions.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting boost potential regions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get boost potential regions'
    });
  }
});

router.get('/geo-trends/:region', async (req, res) => {
  try {
    const { region } = req.params;
    const trends = await geoEngine.getTrendingContentByRegion(region);
    
    res.json({
      success: true,
      region,
      trends,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting regional trends:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get regional trends'
    });
  }
});

router.post('/geo-simulate-updates', async (req, res) => {
  try {
    const updatedData = await geoEngine.simulateRealTimeUpdates();
    
    res.json({
      success: true,
      message: 'Real-time geo metrics updated',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error simulating geo updates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to simulate geo updates'
    });
  }
});

// Combined ViVi Intelligence Route
router.get('/vivi-intelligence/:persona?', async (req, res) => {
  try {
    const persona = req.params.persona || 'medspa';
    
    // Get parallel data from both engines
    const [geoSnapshot, extensionActions] = await Promise.all([
      geoEngine.getGeoPerformanceSnapshot(persona),
      extensionEngine.getRecentActions(5)
    ]);

    const topRegions = geoSnapshot.slice(0, 3);
    const boostOpportunities = geoSnapshot.filter(region => 
      region.boostPotential === '2x' || region.boostPotential === '3x'
    );

    res.json({
      success: true,
      persona,
      intelligence: {
        geoInsights: {
          topPerformingRegions: topRegions,
          boostOpportunities,
          totalRegions: geoSnapshot.length
        },
        campaignActions: {
          recentActions: extensionActions,
          summary: {
            extensions: extensionActions.filter(a => a.type === 'extension').length,
            pivots: extensionActions.filter(a => a.type === 'pivot').length,
            archives: extensionActions.filter(a => a.type === 'archive').length
          }
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting ViVi intelligence:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get ViVi intelligence data'
    });
  }
});

export default router;