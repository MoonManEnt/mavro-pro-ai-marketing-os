import express from 'express';
import { storage } from '../storage.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all modules
router.get('/modules', async (req, res) => {
  try {
    const { persona, level, category } = req.query;
    const modules = await storage.getGrioModules({
      persona,
      level,
      category,
      isActive: true
    });
    
    res.json({
      success: true,
      data: { modules }
    });
  } catch (error) {
    console.error('Error fetching Grio modules:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch modules'
    });
  }
});

// Get user progress for all modules
router.get('/progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await storage.getUserProgress(userId);
    const userStats = await storage.getUserStats(userId);
    
    res.json({
      success: true,
      data: {
        progress,
        stats: userStats
      }
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch progress'
    });
  }
});

// Update module progress
router.post('/modules/:moduleId/progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { moduleId } = req.params;
    const { status, progressPercent, timeSpent, feedbackRating, feedbackText } = req.body;
    
    const progress = await storage.updateModuleProgress({
      userId,
      moduleId,
      status,
      progressPercent,
      timeSpent,
      feedbackRating,
      feedbackText
    });
    
    // Update user stats if module completed
    if (status === 'completed') {
      await storage.updateUserStats(userId, {
        xpGained: 100, // Default XP, should come from module
        moduleCompleted: true,
        timeSpent
      });
    }
    
    res.json({
      success: true,
      data: { progress }
    });
  } catch (error) {
    console.error('Error updating module progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update progress'
    });
  }
});

// Complete a module
router.post('/modules/:moduleId/complete', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { moduleId } = req.params;
    const { timeSpent, feedbackRating, feedbackText } = req.body;
    
    // Get module details for XP reward
    const module = await storage.getGrioModule(moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Module not found'
      });
    }
    
    // Mark as completed
    const progress = await storage.updateModuleProgress({
      userId,
      moduleId,
      status: 'completed',
      progressPercent: 100,
      timeSpent,
      feedbackRating,
      feedbackText,
      completedAt: new Date()
    });
    
    // Update user stats
    const updatedStats = await storage.updateUserStats(userId, {
      xpGained: module.xpReward || 100,
      moduleCompleted: true,
      timeSpent: timeSpent || 0
    });
    
    res.json({
      success: true,
      data: {
        progress,
        stats: updatedStats,
        xpGained: module.xpReward || 100
      }
    });
  } catch (error) {
    console.error('Error completing module:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to complete module'
    });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { period = 'all_time', industry, region, limit = 50 } = req.query;
    
    const leaderboard = await storage.getLeaderboard({
      period,
      industry,
      region,
      limit: parseInt(limit)
    });
    
    res.json({
      success: true,
      data: { leaderboard }
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard'
    });
  }
});

// Get user's ranking
router.get('/ranking', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = 'all_time', industry } = req.query;
    
    const ranking = await storage.getUserRanking(userId, { period, industry });
    
    res.json({
      success: true,
      data: { ranking }
    });
  } catch (error) {
    console.error('Error fetching user ranking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ranking'
    });
  }
});

// ViVi AI module recommendations
router.get('/recommendations', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { persona } = req.query;
    
    const userStats = await storage.getUserStats(userId);
    const userProgress = await storage.getUserProgress(userId);
    
    // Simple recommendation logic - can be enhanced with AI
    const recommendations = await storage.getModuleRecommendations({
      userId,
      persona,
      completedModules: userProgress.filter(p => p.status === 'completed').map(p => p.moduleId),
      userLevel: userStats?.currentRank || 'Bronze'
    });
    
    res.json({
      success: true,
      data: {
        recommendations,
        message: `Based on your ${persona} persona and ${userStats?.currentRank || 'Bronze'} rank, here are your recommended modules.`
      }
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recommendations'
    });
  }
});

export default router;