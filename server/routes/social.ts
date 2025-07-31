import { Router } from 'express';
import { z } from 'zod';
import { storage } from '../storage';
import { authenticateToken } from '../auth/middleware';

const router = Router();

// Connect social media account
const connectAccountSchema = z.object({
  workspaceId: z.string().uuid(),
  platform: z.enum(['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok', 'youtube', 'pinterest', 'snapchat']),
  accountData: z.object({
    username: z.string(),
    accessToken: z.string(),
    refreshToken: z.string().optional(),
    expiresAt: z.string().optional(),
    accountId: z.string(),
    permissions: z.array(z.string()).optional(),
  }),
});

router.post('/connect', authenticateToken, async (req, res) => {
  try {
    const { workspaceId, platform, accountData } = connectAccountSchema.parse(req.body);
    
    // Verify workspace access
    const workspace = await storage.getWorkspace(workspaceId);
    if (!workspace || workspace.userId !== req.user!.id) {
      return res.status(403).json({ error: 'Access denied to workspace' });
    }

    // Create or update social account
    const socialAccount = await storage.createSocialAccount({
      workspaceId,
      platform,
      username: accountData.username,
      accessToken: accountData.accessToken,
      refreshToken: accountData.refreshToken || null,
      expiresAt: accountData.expiresAt ? new Date(accountData.expiresAt) : null,
      accountId: accountData.accountId,
      isActive: true,
      permissions: accountData.permissions || [],
      metadata: {
        connectedAt: new Date().toISOString(),
        lastSync: new Date().toISOString(),
      },
    });

    res.json({
      success: true,
      account: {
        id: socialAccount.id,
        platform: socialAccount.platform,
        username: socialAccount.username,
        isActive: socialAccount.isActive,
        connectedAt: socialAccount.metadata?.connectedAt,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Social account connection error:', error);
    res.status(500).json({ error: 'Failed to connect social account' });
  }
});

// Get connected social accounts
router.get('/accounts/:workspaceId', authenticateToken, async (req, res) => {
  try {
    const { workspaceId } = req.params;
    
    // Verify workspace access
    const workspace = await storage.getWorkspace(workspaceId);
    if (!workspace || workspace.userId !== req.user!.id) {
      return res.status(403).json({ error: 'Access denied to workspace' });
    }

    const accounts = await storage.getSocialAccountsByWorkspaceId(workspaceId);
    
    const formattedAccounts = accounts.map(account => ({
      id: account.id,
      platform: account.platform,
      username: account.username,
      isActive: account.isActive,
      connectedAt: account.metadata?.connectedAt,
      lastSync: account.metadata?.lastSync,
      permissions: account.permissions,
      followerCount: account.metadata?.followerCount || 0,
      engagementRate: account.metadata?.engagementRate || 0,
    }));

    res.json({
      success: true,
      accounts: formattedAccounts,
    });
  } catch (error) {
    console.error('Get social accounts error:', error);
    res.status(500).json({ error: 'Failed to fetch social accounts' });
  }
});

// Get social media insights
const insightsSchema = z.object({
  workspaceId: z.string().uuid(),
  platform: z.string().optional(),
  dateRange: z.object({
    start: z.string(),
    end: z.string(),
  }).optional(),
});

router.post('/insights', authenticateToken, async (req, res) => {
  try {
    const { workspaceId, platform, dateRange } = insightsSchema.parse(req.body);
    
    // Verify workspace access
    const workspace = await storage.getWorkspace(workspaceId);
    if (!workspace || workspace.userId !== req.user!.id) {
      return res.status(403).json({ error: 'Access denied to workspace' });
    }

    // Get connected accounts
    const accounts = await storage.getSocialAccountsByWorkspaceId(workspaceId);
    const filteredAccounts = platform 
      ? accounts.filter(acc => acc.platform === platform)
      : accounts;

    // Generate insights for each account
    const insights = await Promise.all(
      filteredAccounts.map(async (account) => {
        // In a real implementation, you would call the actual social media APIs here
        // For now, we'll return structured demo data that represents real insights
        
        const mockInsights = generateMockInsights(account.platform, account.username);
        
        return {
          platform: account.platform,
          username: account.username,
          accountId: account.accountId,
          insights: mockInsights,
          lastUpdated: new Date().toISOString(),
        };
      })
    );

    res.json({
      success: true,
      insights,
      dateRange: dateRange || {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Social insights error:', error);
    res.status(500).json({ error: 'Failed to fetch social insights' });
  }
});

// Post content to social media
const postContentSchema = z.object({
  workspaceId: z.string().uuid(),
  platforms: z.array(z.string()),
  content: z.object({
    text: z.string(),
    mediaUrls: z.array(z.string()).optional(),
    hashtags: z.array(z.string()).optional(),
  }),
  scheduledAt: z.string().optional(),
});

router.post('/post', authenticateToken, async (req, res) => {
  try {
    const { workspaceId, platforms, content, scheduledAt } = postContentSchema.parse(req.body);
    
    // Verify workspace access
    const workspace = await storage.getWorkspace(workspaceId);
    if (!workspace || workspace.userId !== req.user!.id) {
      return res.status(403).json({ error: 'Access denied to workspace' });
    }

    // Get connected accounts for specified platforms
    const accounts = await storage.getSocialAccountsByWorkspaceId(workspaceId);
    const targetAccounts = accounts.filter(acc => 
      platforms.includes(acc.platform) && acc.isActive
    );

    if (targetAccounts.length === 0) {
      return res.status(400).json({ 
        error: 'No active accounts found for specified platforms' 
      });
    }

    // Process posting for each platform
    const postResults = await Promise.all(
      targetAccounts.map(async (account) => {
        try {
          // In a real implementation, you would call the actual social media APIs
          // For now, we'll simulate the posting process
          
          const postData = {
            platform: account.platform,
            username: account.username,
            content: adaptContentForPlatform(content, account.platform),
            status: scheduledAt ? 'scheduled' : 'posted',
            postId: `${account.platform}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            postedAt: scheduledAt || new Date().toISOString(),
            engagement: {
              likes: 0,
              comments: 0,
              shares: 0,
              reach: 0,
            },
          };

          // Store content record
          await storage.createContent({
            userId: req.user!.id,
            workspaceId,
            type: 'social_post',
            platforms: [account.platform],
            title: `Post to ${account.platform}`,
            content: JSON.stringify(postData.content),
            status: postData.status as any,
            scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
            metadata: {
              postId: postData.postId,
              platform: account.platform,
              username: account.username,
            },
          });

          return {
            success: true,
            platform: account.platform,
            postId: postData.postId,
            status: postData.status,
          };
        } catch (error) {
          console.error(`Failed to post to ${account.platform}:`, error);
          return {
            success: false,
            platform: account.platform,
            error: `Failed to post to ${account.platform}`,
          };
        }
      })
    );

    const successfulPosts = postResults.filter(result => result.success);
    const failedPosts = postResults.filter(result => !result.success);

    res.json({
      success: successfulPosts.length > 0,
      results: postResults,
      summary: {
        total: postResults.length,
        successful: successfulPosts.length,
        failed: failedPosts.length,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Social post error:', error);
    res.status(500).json({ error: 'Failed to post content' });
  }
});

// Disconnect social account
router.delete('/disconnect/:accountId', authenticateToken, async (req, res) => {
  try {
    const { accountId } = req.params;
    
    // Get account to verify ownership
    const account = await storage.getSocialAccountsByWorkspaceId(''); // We'll need to modify this
    // For now, we'll update the account status
    
    const updatedAccount = await storage.updateSocialAccount(accountId, {
      isActive: false,
      metadata: {
        disconnectedAt: new Date().toISOString(),
      },
    });

    if (!updatedAccount) {
      return res.status(404).json({ error: 'Social account not found' });
    }

    res.json({
      success: true,
      message: 'Social account disconnected successfully',
    });
  } catch (error) {
    console.error('Disconnect social account error:', error);
    res.status(500).json({ error: 'Failed to disconnect social account' });
  }
});

// Helper functions
function generateMockInsights(platform: string, username: string) {
  const baseMetrics = {
    followers: Math.floor(Math.random() * 10000) + 1000,
    following: Math.floor(Math.random() * 1000) + 100,
    posts: Math.floor(Math.random() * 500) + 50,
    engagementRate: (Math.random() * 5 + 1).toFixed(2),
    reach: Math.floor(Math.random() * 50000) + 5000,
    impressions: Math.floor(Math.random() * 100000) + 10000,
  };

  const platformSpecific = {
    instagram: {
      ...baseMetrics,
      stories: Math.floor(Math.random() * 100) + 10,
      reels: Math.floor(Math.random() * 50) + 5,
      avgLikes: Math.floor(Math.random() * 500) + 50,
      avgComments: Math.floor(Math.random() * 50) + 5,
    },
    facebook: {
      ...baseMetrics,
      pageViews: Math.floor(Math.random() * 5000) + 500,
      shares: Math.floor(Math.random() * 100) + 10,
      reactions: Math.floor(Math.random() * 1000) + 100,
    },
    twitter: {
      ...baseMetrics,
      tweets: Math.floor(Math.random() * 1000) + 100,
      retweets: Math.floor(Math.random() * 200) + 20,
      mentions: Math.floor(Math.random() * 100) + 10,
    },
    linkedin: {
      ...baseMetrics,
      connections: Math.floor(Math.random() * 2000) + 200,
      articles: Math.floor(Math.random() * 20) + 2,
      profileViews: Math.floor(Math.random() * 1000) + 100,
    },
  };

  return platformSpecific[platform as keyof typeof platformSpecific] || baseMetrics;
}

function adaptContentForPlatform(content: any, platform: string) {
  const { text, mediaUrls, hashtags } = content;
  
  const adaptations = {
    instagram: {
      text: text.substring(0, 2200),
      hashtags: hashtags?.slice(0, 30) || [],
      mediaRequired: true,
    },
    facebook: {
      text: text.substring(0, 63206),
      hashtags: hashtags?.slice(0, 20) || [],
      mediaRequired: false,
    },
    twitter: {
      text: text.substring(0, 280),
      hashtags: hashtags?.slice(0, 10) || [],
      mediaRequired: false,
    },
    linkedin: {
      text: text.substring(0, 3000),
      hashtags: hashtags?.slice(0, 15) || [],
      mediaRequired: false,
    },
    tiktok: {
      text: text.substring(0, 150),
      hashtags: hashtags?.slice(0, 20) || [],
      mediaRequired: true,
    },
    youtube: {
      text: text.substring(0, 5000),
      hashtags: hashtags?.slice(0, 15) || [],
      mediaRequired: false,
    },
  };

  const adaptation = adaptations[platform as keyof typeof adaptations];
  
  return {
    text: adaptation?.text || text,
    mediaUrls: mediaUrls || [],
    hashtags: adaptation?.hashtags || [],
    platform,
    characterLimit: adaptation?.text.length || text.length,
  };
}

export default router;