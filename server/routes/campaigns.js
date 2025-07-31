// Campaign Management API Routes
import express from 'express';
import CampaignComposer from '../utils/CampaignComposer.js';
import ABTestingEngine from '../utils/ABTestingEngine.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(express.json());
router.use(optionalAuth);

// Initialize sample data
CampaignComposer.initializeSampleCampaigns();
ABTestingEngine.initializeSampleTests();

// ===== CAMPAIGN CRUD OPERATIONS =====

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const { persona } = req.query;
    
    let campaigns;
    if (persona) {
      campaigns = await CampaignComposer.getCampaignsByPersona(persona);
    } else {
      campaigns = await CampaignComposer.getAllCampaigns();
    }
    
    res.json({ success: true, campaigns });
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch campaigns' });
  }
});

// Get campaign by ID
router.get('/:campaignId', async (req, res) => {
  try {
    const { campaignId } = req.params;
    const campaign = await CampaignComposer.getCampaignById(campaignId);
    
    if (!campaign) {
      return res.status(404).json({ success: false, error: 'Campaign not found' });
    }
    
    // Get campaign posts
    const posts = await CampaignComposer.getCampaignPosts(campaignId);
    
    res.json({ 
      success: true, 
      campaign: { ...campaign, posts },
      postDetails: posts 
    });
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch campaign' });
  }
});

// Create new campaign
router.post('/', async (req, res) => {
  try {
    const userId = req.user?.id || 'demo-user';
    const campaignData = req.body;
    
    // Add user context
    campaignData.userId = userId;
    
    const campaign = await CampaignComposer.createCampaign(campaignData);
    
    res.status(201).json({ 
      success: true, 
      campaign,
      message: 'Campaign created successfully' 
    });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ success: false, error: 'Failed to create campaign' });
  }
});

// Update campaign
router.put('/:campaignId', async (req, res) => {
  try {
    const { campaignId } = req.params;
    const updates = req.body;
    
    // Get existing campaign
    const existingCampaign = await CampaignComposer.getCampaignById(campaignId);
    if (!existingCampaign) {
      return res.status(404).json({ success: false, error: 'Campaign not found' });
    }
    
    // Update campaign metrics if provided
    if (updates.metrics || updates.totalReach || updates.engagement) {
      await CampaignComposer.updateCampaignMetrics(campaignId, updates);
    }
    
    // Update status if provided
    if (updates.status && updates.status !== existingCampaign.status) {
      await CampaignComposer.updateCampaignStatus(campaignId, updates.status);
    }
    
    const updatedCampaign = await CampaignComposer.getCampaignById(campaignId);
    
    res.json({ 
      success: true, 
      campaign: updatedCampaign,
      message: 'Campaign updated successfully' 
    });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ success: false, error: 'Failed to update campaign' });
  }
});

// Delete campaign
router.delete('/:campaignId', async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    const result = await CampaignComposer.deleteCampaign(campaignId);
    
    res.json({ 
      success: true, 
      message: 'Campaign deleted successfully',
      deletedCampaign: result.deletedCampaign
    });
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete campaign' });
  }
});

// Toggle campaign status (play/pause)
router.post('/:campaignId/toggle', async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    const campaign = await CampaignComposer.getCampaignById(campaignId);
    if (!campaign) {
      return res.status(404).json({ success: false, error: 'Campaign not found' });
    }
    
    const newStatus = campaign.status === 'Live' ? 'Draft' : 'Live';
    const updatedCampaign = await CampaignComposer.updateCampaignStatus(campaignId, newStatus);
    
    res.json({ 
      success: true, 
      campaign: updatedCampaign,
      message: `Campaign ${newStatus.toLowerCase()} successfully`
    });
  } catch (error) {
    console.error('Toggle campaign error:', error);
    res.status(500).json({ success: false, error: 'Failed to toggle campaign status' });
  }
});

// ===== CAMPAIGN POSTS MANAGEMENT =====

// Add posts to campaign
router.post('/:campaignId/posts', async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { posts } = req.body;
    
    if (!Array.isArray(posts) || posts.length === 0) {
      return res.status(400).json({ success: false, error: 'Posts array is required' });
    }
    
    const result = await CampaignComposer.addPostsToCampaign(campaignId, posts);
    
    res.status(201).json({ 
      success: true, 
      ...result,
      message: `${posts.length} posts added to campaign successfully`
    });
  } catch (error) {
    console.error('Add posts error:', error);
    res.status(500).json({ success: false, error: 'Failed to add posts to campaign' });
  }
});

// Get campaign posts
router.get('/:campaignId/posts', async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    const posts = await CampaignComposer.getCampaignPosts(campaignId);
    
    res.json({ 
      success: true, 
      posts,
      count: posts.length
    });
  } catch (error) {
    console.error('Get campaign posts error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch campaign posts' });
  }
});

// ===== A/B TESTING ENDPOINTS =====

// Create A/B test
router.post('/:campaignId/ab-test', async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { variantA, variantB, testDuration } = req.body;
    
    if (!variantA || !variantB) {
      return res.status(400).json({ 
        success: false, 
        error: 'Both variantA and variantB are required' 
      });
    }
    
    const abTest = await ABTestingEngine.createABTest({
      campaignId,
      variantA,
      variantB,
      testDuration
    });
    
    res.status(201).json({ 
      success: true, 
      abTest,
      message: 'A/B test created successfully'
    });
  } catch (error) {
    console.error('Create A/B test error:', error);
    res.status(500).json({ success: false, error: 'Failed to create A/B test' });
  }
});

// Get A/B tests for campaign
router.get('/:campaignId/ab-tests', async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    const abTests = await ABTestingEngine.getABTestsByCampaign(campaignId);
    
    res.json({ 
      success: true, 
      abTests,
      count: abTests.length
    });
  } catch (error) {
    console.error('Get A/B tests error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch A/B tests' });
  }
});

// Get specific A/B test
router.get('/:campaignId/ab-tests/:testId', async (req, res) => {
  try {
    const { testId } = req.params;
    
    const abTest = await ABTestingEngine.getABTestById(testId);
    
    if (!abTest) {
      return res.status(404).json({ success: false, error: 'A/B test not found' });
    }
    
    res.json({ 
      success: true, 
      abTest
    });
  } catch (error) {
    console.error('Get A/B test error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch A/B test' });
  }
});

// ===== CAMPAIGN ANALYTICS =====

// Get campaign insights
router.get('/:campaignId/insights', async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    const campaign = await CampaignComposer.getCampaignById(campaignId);
    if (!campaign) {
      return res.status(404).json({ success: false, error: 'Campaign not found' });
    }
    
    // Generate mock insights data
    const insights = {
      metrics: {
        totalReach: campaign.totalReach || 15000,
        engagement: campaign.engagement || 1200,
        clickThroughRate: campaign.metrics?.clickThroughRate || 3.2,
        conversionRate: campaign.metrics?.conversionRate || 8.5,
        costPerClick: 1.25,
        roi: campaign.metrics?.roi || 240,
        audienceGrowth: 12.5,
        brandMentions: 47
      },
      platformData: campaign.platforms.map(platform => ({
        platform,
        reach: Math.floor(campaign.totalReach / campaign.platforms.length),
        engagement: Math.floor(campaign.engagement / campaign.platforms.length),
        ctr: (2 + Math.random() * 3).toFixed(1),
        bestPerformingFormat: platform === 'tiktok' ? 'Short Videos' : 
                           platform === 'instagram' ? 'Stories' : 
                           platform === 'linkedin' ? 'Professional Posts' : 'Image Posts',
        topHashtag: platform === 'instagram' ? '#wellness' :
                   platform === 'linkedin' ? '#business' :
                   platform === 'tiktok' ? '#trending' : '#marketing',
        optimalPostTime: platform === 'linkedin' ? '9:00 AM' : '8:00 PM'
      }))
    };
    
    res.json({ 
      success: true, 
      insights
    });
  } catch (error) {
    console.error('Get campaign insights error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch campaign insights' });
  }
});

export default router;