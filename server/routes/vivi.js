// ViVi AI Routes - Production Beta Testing API
import express from 'express';
import bodyParser from 'body-parser';
import { 
  UserConnector, 
  ScheduledPost, 
  FeatureSetting, 
  AcademyComment, 
  InboxMessage,
  Mention,
  CompetitorData,
  Report,
  ActivityLog,
  ChatHistory,
  ContentGeneration
} from '../models/vivi/index.js';
import { 
  getAuthorizationUrl, 
  fetchPlatformToken, 
  fetchPlatformRefresh,
  validateToken
} from '../utils/vivi/oauthHelpers.js';
import { ConnectorFactory } from '../utils/vivi/socialConnectors.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(bodyParser.json());

// Apply optional authentication to all ViVi routes
router.use(optionalAuth);

// ===== VIVI AI CHAT SYSTEM =====
router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;
    const userId = req.user?.id || 'demo-user';

    // For beta testing, integrate with OpenAI if API key available
    let response = "I'm ViVi, your AI marketing assistant! I'm here to help you create amazing content, analyze performance, and grow your business. What would you like to work on today?";
    
    if (process.env.OPENAI_API_KEY) {
      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content: 'You are ViVi, an expert AI marketing assistant for Mavro Pro. Help users with content creation, social media strategy, analytics insights, and business growth. Be friendly, professional, and actionable.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });

        if (openaiResponse.ok) {
          const data = await openaiResponse.json();
          response = data.choices[0]?.message?.content || response;
        }
      } catch (error) {
        console.warn('OpenAI API call failed, using fallback response:', error.message);
      }
    }

    // Save chat history
    await ChatHistory.create({
      userId,
      message,
      response,
      sessionId
    });

    res.json({ 
      success: true, 
      response,
      suggestions: [
        "Create a social media post",
        "Analyze my campaign performance", 
        "Generate content ideas",
        "Help with hashtag strategy"
      ]
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, error: 'Chat service unavailable' });
  }
});

// ===== CONTENT GENERATION =====
router.post('/generate-content', async (req, res) => {
  try {
    const { prompt, platform, contentType = 'post' } = req.body;
    const userId = req.user?.id || 'demo-user';

    let generatedContent = `🎯 ${platform} ${contentType} ready!\n\n${prompt}\n\n#GrowWithMavro #ViViAI`;

    if (process.env.OPENAI_API_KEY) {
      try {
        const systemPrompt = `You are ViVi, an expert content creator for ${platform}. Create engaging ${contentType} content that drives engagement and conversions. Keep it authentic and platform-appropriate.`;
        
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: prompt }
            ],
            max_tokens: 300,
            temperature: 0.8
          })
        });

        if (openaiResponse.ok) {
          const data = await openaiResponse.json();
          generatedContent = data.choices[0]?.message?.content || generatedContent;
        }
      } catch (error) {
        console.warn('Content generation API call failed:', error.message);
      }
    }

    // Save generation history
    await ContentGeneration.create({
      userId,
      prompt,
      generatedContent,
      platform,
      contentType
    });

    res.json({ 
      success: true, 
      content: generatedContent,
      platform,
      contentType,
      suggestions: [
        "Add trending hashtags",
        "Optimize for engagement",
        "Schedule for best time",
        "Generate variations"
      ]
    });
  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({ success: false, error: 'Content generation failed' });
  }
});

// ===== SOCIAL MEDIA OAUTH =====
router.get('/oauth/:platform/authorize', (req, res) => {
  try {
    const { platform } = req.params;
    const redirectUri = `${process.env.API_BASE_URL || 'http://localhost:5000'}/api/vivi/oauth/${platform}/callback`;
    const authUrl = getAuthorizationUrl(platform, redirectUri);
    res.json({ success: true, authUrl });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/oauth/:platform/callback', async (req, res) => {
  try {
    const { platform } = req.params;
    const { code, state } = req.query;
    const userId = state || req.user?.id || 'demo-user';
    
    const redirectUri = `${process.env.API_BASE_URL || 'http://localhost:5000'}/api/vivi/oauth/${platform}/callback`;
    const tokenData = await fetchPlatformToken(platform, code, redirectUri);
    
    const expiresAt = new Date(Date.now() + (tokenData.expires_in || 3600) * 1000);
    
    await UserConnector.create({
      userId,
      platform,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token || '',
      expiresAt
    });

    // Log successful connection
    await ActivityLog.create({
      userId,
      eventType: 'social_connected',
      payload: { platform, connected_at: new Date() }
    });

    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5000'}?connection=${platform}&status=success`);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5000'}?connection=${req.params.platform}&status=error`);
  }
});

// ===== CONTENT SCHEDULING =====
router.get('/schedule', async (req, res) => {
  try {
    const userId = req.user?.id || 'demo-user';
    const posts = await ScheduledPost.findAll({ 
      where: { userId },
      order: [['publishAt', 'ASC']]
    });
    
    const events = posts.map(post => ({
      id: post.id,
      title: `${post.platforms.join(', ')} Post`,
      start: post.publishAt,
      content: post.content.substring(0, 100) + '...',
      platforms: post.platforms,
      status: post.status
    }));
    
    res.json({ success: true, events });
  } catch (error) {
    console.error('Schedule fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch schedule' });
  }
});

router.post('/schedule', async (req, res) => {
  try {
    const { content, platforms, publishAt } = req.body;
    const userId = req.user?.id || 'demo-user';
    
    const scheduledPost = await ScheduledPost.create({
      userId,
      content,
      platforms,
      publishAt: new Date(publishAt),
      postId: Date.now() // Simple ID generation
    });

    await ActivityLog.create({
      userId,
      eventType: 'post_scheduled',
      payload: { 
        platforms, 
        publishAt,
        content: content.substring(0, 100)
      }
    });

    res.json({ success: true, postId: scheduledPost.id });
  } catch (error) {
    console.error('Schedule post error:', error);
    res.status(500).json({ success: false, error: 'Failed to schedule post' });
  }
});

// ===== ANALYTICS & INSIGHTS =====
router.get('/analytics', async (req, res) => {
  try {
    const userId = req.user?.id || 'demo-user';
    
    // Get user's connected platforms
    const connectors = await UserConnector.findAll({ where: { userId } });
    const connectedPlatforms = connectors.map(c => c.platform);
    
    // Get recent activity
    const recentActivity = await ActivityLog.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    // Get content generation stats
    const contentStats = await ContentGeneration.count({
      where: { userId },
      group: ['platform']
    });

    // Mock analytics data for beta testing
    const analyticsData = {
      connectedPlatforms,
      totalPosts: await ScheduledPost.count({ where: { userId } }),
      contentGenerated: await ContentGeneration.count({ where: { userId } }),
      chatInteractions: await ChatHistory.count({ where: { userId } }),
      recentActivity: recentActivity.map(activity => ({
        type: activity.eventType,
        timestamp: activity.createdAt,
        details: activity.payload
      })),
      platformStats: contentStats,
      engagement: {
        averageReach: Math.floor(Math.random() * 5000) + 1000,
        engagementRate: (Math.random() * 8 + 2).toFixed(1) + '%',
        totalLikes: Math.floor(Math.random() * 1000) + 100,
        totalComments: Math.floor(Math.random() * 200) + 20
      }
    };

    res.json({ success: true, analytics: analyticsData });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, error: 'Analytics unavailable' });
  }
});

// ===== FEATURE SETTINGS =====
router.get('/settings', async (req, res) => {
  try {
    const settings = await FeatureSetting.findAll();
    const settingsObj = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});
    res.json({ success: true, settings: settingsObj });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch settings' });
  }
});

router.post('/settings', async (req, res) => {
  try {
    const { key, value } = req.body;
    await FeatureSetting.upsert({ key, value });
    res.json({ success: true, [key]: value });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update settings' });
  }
});

// ===== ACTIVITY FEED =====
router.get('/activity', async (req, res) => {
  try {
    const userId = req.user?.id || 'demo-user';
    const activities = await ActivityLog.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 50
    });
    res.json({ success: true, activities });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch activity' });
  }
});

// ===== CONNECTED ACCOUNTS =====
router.get('/connections', async (req, res) => {
  try {
    const userId = req.user?.id || 'demo-user';
    const connections = await UserConnector.findAll({ where: { userId } });
    
    const connectionData = await Promise.all(connections.map(async (conn) => {
      const isValid = await validateToken(conn.platform, conn.accessToken);
      return {
        platform: conn.platform,
        connected: true,
        valid: isValid,
        connectedAt: conn.createdAt,
        expiresAt: conn.expiresAt
      };
    }));

    res.json({ success: true, connections: connectionData });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch connections' });
  }
});

// ===== DISCONNECT ACCOUNT =====
router.delete('/connections/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    const userId = req.user?.id || 'demo-user';
    
    await UserConnector.destroy({ where: { userId, platform } });
    
    await ActivityLog.create({
      userId,
      eventType: 'social_disconnected',
      payload: { platform, disconnected_at: new Date() }
    });

    res.json({ success: true, platform });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to disconnect account' });
  }
});

export default router;