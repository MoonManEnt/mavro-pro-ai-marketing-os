import { Router } from 'express';
import { adminDb } from '../lib/firebase-admin';
import { authenticate } from '../auth';

const router = Router();

// Get user profile
router.get('/user/profile', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const userDoc = await adminDb.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user: { id: userDoc.id, ...userDoc.data() } });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// Update user profile
router.put('/user/profile', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const updates = req.body;
    
    await adminDb.collection('users').doc(userId).update({
      ...updates,
      updatedAt: new Date(),
    });
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user workspaces
router.get('/workspaces', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const workspacesSnapshot = await adminDb
      .collection('workspaces')
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .orderBy('createdAt', 'desc')
      .get();
    
    const workspaces = workspacesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ workspaces });
  } catch (error) {
    console.error('Error getting workspaces:', error);
    res.status(500).json({ error: 'Failed to get workspaces' });
  }
});

// Create workspace
router.post('/workspaces', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const workspaceData = req.body;
    
    const docRef = await adminDb.collection('workspaces').add({
      ...workspaceData,
      userId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    res.json({ 
      message: 'Workspace created successfully',
      workspaceId: docRef.id 
    });
  } catch (error) {
    console.error('Error creating workspace:', error);
    res.status(500).json({ error: 'Failed to create workspace' });
  }
});

// Get user campaigns
router.get('/campaigns', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const { workspaceId } = req.query;
    
    let query = adminDb.collection('campaigns').where('userId', '==', userId);
    
    if (workspaceId) {
      query = query.where('workspaceId', '==', workspaceId);
    }
    
    const campaignsSnapshot = await query.orderBy('createdAt', 'desc').get();
    
    const campaigns = campaignsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ campaigns });
  } catch (error) {
    console.error('Error getting campaigns:', error);
    res.status(500).json({ error: 'Failed to get campaigns' });
  }
});

// Create campaign
router.post('/campaigns', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const campaignData = req.body;
    
    const docRef = await adminDb.collection('campaigns').add({
      ...campaignData,
      userId,
      spent: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      cpc: 0,
      conversions: 0,
      conversionRate: 0,
      roi: 0,
      roas: 0,
      viviOptimized: false,
      viviScore: 0,
      viviRecommendations: [],
      scheduledPosts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    res.json({ 
      message: 'Campaign created successfully',
      campaignId: docRef.id 
    });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

// Update campaign
router.put('/campaigns/:id', authenticate, async (req, res) => {
  try {
    const campaignId = req.params.id;
    const updates = req.body;
    
    await adminDb.collection('campaigns').doc(campaignId).update({
      ...updates,
      updatedAt: new Date(),
    });
    
    res.json({ message: 'Campaign updated successfully' });
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
});

// Get user leads
router.get('/leads', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const { workspaceId, campaignId, status } = req.query;
    
    let query = adminDb.collection('leads').where('userId', '==', userId);
    
    if (workspaceId) {
      query = query.where('workspaceId', '==', workspaceId);
    }
    
    if (campaignId) {
      query = query.where('campaignId', '==', campaignId);
    }
    
    if (status) {
      query = query.where('status', '==', status);
    }
    
    const leadsSnapshot = await query.orderBy('createdAt', 'desc').get();
    
    const leads = leadsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ leads });
  } catch (error) {
    console.error('Error getting leads:', error);
    res.status(500).json({ error: 'Failed to get leads' });
  }
});

// Create lead
router.post('/leads', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const leadData = req.body;
    
    const docRef = await adminDb.collection('leads').add({
      ...leadData,
      userId,
      score: 0,
      viviScore: 0,
      viviInsights: {},
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    res.json({ 
      message: 'Lead created successfully',
      leadId: docRef.id 
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

// Update lead
router.put('/leads/:id', authenticate, async (req, res) => {
  try {
    const leadId = req.params.id;
    const updates = req.body;
    
    await adminDb.collection('leads').doc(leadId).update({
      ...updates,
      updatedAt: new Date(),
    });
    
    res.json({ message: 'Lead updated successfully' });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// Get analytics
router.get('/analytics', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const { period = '7d', workspaceId, campaignId } = req.query;
    
    let query = adminDb.collection('analytics')
      .where('userId', '==', userId)
      .where('period', '==', period);
    
    if (workspaceId) {
      query = query.where('workspaceId', '==', workspaceId);
    }
    
    if (campaignId) {
      query = query.where('campaignId', '==', campaignId);
    }
    
    const analyticsSnapshot = await query
      .orderBy('recordedAt', 'desc')
      .limit(100)
      .get();
    
    const analytics = analyticsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ analytics });
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ error: 'Failed to get analytics' });
  }
});

// Get content
router.get('/content', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const { workspaceId, campaignId, status } = req.query;
    
    let query = adminDb.collection('content').where('userId', '==', userId);
    
    if (workspaceId) {
      query = query.where('workspaceId', '==', workspaceId);
    }
    
    if (campaignId) {
      query = query.where('campaignId', '==', campaignId);
    }
    
    if (status) {
      query = query.where('status', '==', status);
    }
    
    const contentSnapshot = await query.orderBy('createdAt', 'desc').get();
    
    const content = contentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ content });
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ error: 'Failed to get content' });
  }
});

// Create content
router.post('/content', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const contentData = req.body;
    
    const docRef = await adminDb.collection('content').add({
      ...contentData,
      userId,
      impressions: 0,
      reach: 0,
      engagement: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      clicks: 0,
      viviOptimized: false,
      viviScore: 0,
      viviSuggestions: [],
      mediaUrls: [],
      hashtags: [],
      mentions: [],
      targetAudience: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    res.json({ 
      message: 'Content created successfully',
      contentId: docRef.id 
    });
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
});

// Update content
router.put('/content/:id', authenticate, async (req, res) => {
  try {
    const contentId = req.params.id;
    const updates = req.body;
    
    await adminDb.collection('content').doc(contentId).update({
      ...updates,
      updatedAt: new Date(),
    });
    
    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Get trends (public)
router.get('/trends', async (req, res) => {
  try {
    const { category, industry } = req.query;
    
    let query = adminDb.collection('trends').where('isActive', '==', true);
    
    if (category) {
      query = query.where('category', '==', category);
    }
    
    if (industry) {
      query = query.where('industry', '==', industry);
    }
    
    const trendsSnapshot = await query.orderBy('createdAt', 'desc').get();
    
    const trends = trendsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ trends });
  } catch (error) {
    console.error('Error getting trends:', error);
    res.status(500).json({ error: 'Failed to get trends' });
  }
});

// Get Grio modules (public)
router.get('/grio-modules', async (req, res) => {
  try {
    const { level, category, industry } = req.query;
    
    let query = adminDb.collection('grioModules').where('isActive', '==', true);
    
    if (level) {
      query = query.where('level', '==', level);
    }
    
    if (category) {
      query = query.where('category', '==', category);
    }
    
    if (industry) {
      query = query.where('industry', '==', industry);
    }
    
    const modulesSnapshot = await query.orderBy('sortOrder', 'asc').get();
    
    const modules = modulesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ modules });
  } catch (error) {
    console.error('Error getting Grio modules:', error);
    res.status(500).json({ error: 'Failed to get modules' });
  }
});

// Get user progress
router.get('/grio-progress', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const { moduleId } = req.query;
    
    let query = adminDb.collection('grioUserProgress').where('userId', '==', userId);
    
    if (moduleId) {
      query = query.where('moduleId', '==', moduleId);
    }
    
    const progressSnapshot = await query.get();
    
    const progress = progressSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ progress });
  } catch (error) {
    console.error('Error getting user progress:', error);
    res.status(500).json({ error: 'Failed to get progress' });
  }
});

// Update user progress
router.put('/grio-progress/:moduleId', authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const moduleId = req.params.moduleId;
    const updates = req.body;
    
    await adminDb.collection('grioUserProgress').doc(`${userId}_${moduleId}`).set({
      userId,
      moduleId,
      ...updates,
      updatedAt: new Date(),
    }, { merge: true });
    
    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

export default router;
