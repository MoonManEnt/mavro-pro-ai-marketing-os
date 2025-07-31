// Campaign Composer - Manages campaign creation, optimization, and lifecycle
import { v4 as uuidv4 } from 'uuid';

class CampaignComposer {
  constructor() {
    this.campaigns = new Map();
    this.posts = new Map();
    this.templates = new Map();
    this.initializeTemplates();
  }

  // Initialize sample campaigns for demo/testing
  initializeSampleCampaigns() {
    const sampleCampaigns = [
      {
        campaignId: 'cmp_sample_001',
        title: 'Summer Wellness Campaign',
        status: 'Live',
        persona: 'sarah',
        posts: ['post_001', 'post_002', 'post_003'],
        startDate: '2025-01-20',
        endDate: '2025-02-20',
        primaryCTA: 'Book Your Treatment',
        totalReach: 15000,
        engagement: 1200,
        platforms: ['instagram', 'facebook'],
        abTestActive: true,
        boostLevel: 2,
        description: 'Promote summer wellness treatments and anti-aging packages',
        userId: 'demo-user',
        createdAt: new Date().toISOString(),
        metrics: {
          clickThroughRate: 4.2,
          conversionRate: 8.5,
          roi: 240,
          costPerClick: 1.25
        }
      },
      {
        campaignId: 'cmp_sample_002',
        title: 'New Year Transformation',
        status: 'Draft',
        persona: 'sarah',
        posts: ['post_004', 'post_005'],
        startDate: '2025-02-01',
        endDate: '2025-03-01',
        primaryCTA: 'Start Your Journey',
        totalReach: 8500,
        engagement: 720,
        platforms: ['instagram', 'tiktok', 'linkedin'],
        abTestActive: false,
        boostLevel: 1,
        description: 'New year marketing campaign for body contouring services',
        userId: 'demo-user',
        createdAt: new Date().toISOString(),
        metrics: {
          clickThroughRate: 3.8,
          conversionRate: 12.0,
          roi: 285,
          costPerClick: 1.15
        }
      },
      {
        campaignId: 'cmp_sample_003',
        title: 'Spring Skincare Launch',
        status: 'Completed',
        persona: 'sarah',
        posts: ['post_006', 'post_007', 'post_008', 'post_009'],
        startDate: '2025-01-01',
        endDate: '2025-01-15',
        primaryCTA: 'Shop Now',
        totalReach: 22000,
        engagement: 1800,
        platforms: ['instagram', 'facebook', 'tiktok'],
        abTestActive: false,
        boostLevel: 3,
        description: 'Launch campaign for new spring skincare line',
        userId: 'demo-user',
        createdAt: new Date().toISOString(),
        metrics: {
          clickThroughRate: 5.1,
          conversionRate: 15.2,
          roi: 380,
          costPerClick: 0.95
        }
      }
    ];

    // Initialize sample data
    sampleCampaigns.forEach(campaign => {
      this.campaigns.set(campaign.campaignId, campaign);
    });

    // Initialize sample posts
    this.initializeSamplePosts();
  }

  initializeSamplePosts() {
    const samplePosts = [
      {
        postId: 'post_001',
        campaignId: 'cmp_sample_001',
        status: 'scheduled',
        platform: 'instagram',
        content: 'Transform your skin this summer with our exclusive wellness treatments! ✨',
        hashtags: ['#wellness', '#skincare', '#summer', '#transformation'],
        scheduledAt: '2025-01-25T19:00:00Z',
        boostLevel: 2,
        autoApproved: true,
        metrics: {
          reach: 5000,
          engagement: 400,
          clicks: 45,
          shares: 12
        }
      },
      {
        postId: 'post_002',
        campaignId: 'cmp_sample_001',
        status: 'posted',
        platform: 'facebook',
        content: 'Ready for radiant summer skin? Book your consultation today!',
        hashtags: ['#skincare', '#beauty', '#consultation'],
        scheduledAt: '2025-01-22T18:00:00Z',
        boostLevel: 2,
        autoApproved: true,
        metrics: {
          reach: 6500,
          engagement: 520,
          clicks: 68,
          shares: 18
        }
      },
      {
        postId: 'post_003',
        campaignId: 'cmp_sample_001',
        status: 'draft',
        platform: 'instagram',
        content: 'Behind the scenes: Our exclusive summer treatment process',
        hashtags: ['#behindthescenes', '#treatments', '#process'],
        scheduledAt: '2025-01-28T20:00:00Z',
        boostLevel: 1,
        autoApproved: false,
        metrics: null
      }
    ];

    samplePosts.forEach(post => {
      this.posts.set(post.postId, post);
    });
  }

  initializeTemplates() {
    // Campaign templates by industry
    const templates = [
      {
        templateId: 'wellness_launch',
        name: 'Wellness Service Launch',
        industry: 'medspa',
        platforms: ['instagram', 'facebook'],
        duration: 30,
        postCount: 12,
        cta: 'Book Your Treatment',
        description: 'Launch new wellness services with targeted content'
      },
      {
        templateId: 'seasonal_promo',
        name: 'Seasonal Promotion',
        industry: 'general',
        platforms: ['instagram', 'facebook', 'tiktok'],
        duration: 21,
        postCount: 15,
        cta: 'Shop Now',
        description: 'Seasonal promotional campaign template'
      },
      {
        templateId: 'brand_awareness',
        name: 'Brand Awareness',
        industry: 'general',
        platforms: ['linkedin', 'instagram', 'youtube'],
        duration: 45,
        postCount: 20,
        cta: 'Learn More',
        description: 'Build brand awareness and thought leadership'
      }
    ];

    templates.forEach(template => {
      this.templates.set(template.templateId, template);
    });
  }

  // Campaign CRUD Operations
  async createCampaign(campaignData) {
    const campaignId = `cmp_${uuidv4().slice(0, 8)}`;
    
    const campaign = {
      campaignId,
      title: campaignData.title || 'Untitled Campaign',
      status: campaignData.status || 'Draft',
      persona: campaignData.persona || 'default',
      posts: campaignData.posts || [],
      startDate: campaignData.startDate || new Date().toISOString(),
      endDate: campaignData.endDate,
      primaryCTA: campaignData.primaryCTA || 'Learn More',
      totalReach: campaignData.totalReach || 0,
      engagement: campaignData.engagement || 0,
      platforms: campaignData.platforms || ['instagram'],
      abTestActive: campaignData.abTestActive || false,
      boostLevel: campaignData.boostLevel || 1,
      description: campaignData.description || '',
      userId: campaignData.userId || 'demo-user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metrics: {
        clickThroughRate: 0,
        conversionRate: 0,
        roi: 0,
        costPerClick: 0,
        ...campaignData.metrics
      }
    };

    this.campaigns.set(campaignId, campaign);
    return campaign;
  }

  async getAllCampaigns() {
    return Array.from(this.campaigns.values());
  }

  async getCampaignById(campaignId) {
    return this.campaigns.get(campaignId) || null;
  }

  async getCampaignsByPersona(persona) {
    return Array.from(this.campaigns.values())
      .filter(campaign => campaign.persona === persona);
  }

  async getCampaignsByUserId(userId) {
    return Array.from(this.campaigns.values())
      .filter(campaign => campaign.userId === userId);
  }

  async updateCampaign(campaignId, updates) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const updatedCampaign = {
      ...campaign,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.campaigns.set(campaignId, updatedCampaign);
    return updatedCampaign;
  }

  async updateCampaignStatus(campaignId, status) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    campaign.status = status;
    campaign.updatedAt = new Date().toISOString();
    
    this.campaigns.set(campaignId, campaign);
    return campaign;
  }

  async updateCampaignMetrics(campaignId, metrics) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    campaign.totalReach = metrics.totalReach || campaign.totalReach;
    campaign.engagement = metrics.engagement || campaign.engagement;
    
    if (metrics.metrics) {
      campaign.metrics = { ...campaign.metrics, ...metrics.metrics };
    }
    
    campaign.updatedAt = new Date().toISOString();
    
    this.campaigns.set(campaignId, campaign);
    return campaign;
  }

  async deleteCampaign(campaignId) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // Delete associated posts
    const campaignPosts = Array.from(this.posts.values())
      .filter(post => post.campaignId === campaignId);
    
    campaignPosts.forEach(post => {
      this.posts.delete(post.postId);
    });

    this.campaigns.delete(campaignId);
    
    return {
      success: true,
      deletedCampaign: campaign,
      deletedPosts: campaignPosts.length
    };
  }

  // Post Management
  async addPostsToCampaign(campaignId, posts) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const createdPosts = [];
    
    for (const postData of posts) {
      const postId = `post_${uuidv4().slice(0, 8)}`;
      
      const post = {
        postId,
        campaignId,
        status: postData.status || 'draft',
        platform: postData.platform,
        content: postData.content,
        media: postData.media,
        hashtags: postData.hashtags || [],
        scheduledAt: postData.scheduledAt,
        boostLevel: postData.boostLevel || 1,
        autoApproved: postData.autoApproved || false,
        createdAt: new Date().toISOString(),
        metrics: null
      };

      this.posts.set(postId, post);
      createdPosts.push(post);
      
      // Add post ID to campaign
      campaign.posts.push(postId);
    }

    // Update campaign
    campaign.updatedAt = new Date().toISOString();
    this.campaigns.set(campaignId, campaign);

    return {
      campaign,
      posts: createdPosts,
      totalPosts: campaign.posts.length
    };
  }

  async getCampaignPosts(campaignId) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      return [];
    }

    return campaign.posts
      .map(postId => this.posts.get(postId))
      .filter(post => post !== undefined);
  }

  async updatePost(postId, updates) {
    const post = this.posts.get(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const updatedPost = {
      ...post,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.posts.set(postId, updatedPost);
    return updatedPost;
  }

  // Campaign Templates
  async getTemplates(industry = null) {
    let templates = Array.from(this.templates.values());
    
    if (industry) {
      templates = templates.filter(t => 
        t.industry === industry || t.industry === 'general'
      );
    }
    
    return templates;
  }

  async createCampaignFromTemplate(templateId, customizations = {}) {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    const campaignData = {
      title: customizations.title || template.name,
      platforms: customizations.platforms || template.platforms,
      primaryCTA: customizations.primaryCTA || template.cta,
      description: customizations.description || template.description,
      boostLevel: customizations.boostLevel || 1,
      ...customizations
    };

    return await this.createCampaign(campaignData);
  }

  // Analytics and Insights
  async getCampaignAnalytics(campaignId) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const posts = await this.getCampaignPosts(campaignId);
    
    const analytics = {
      campaignId,
      title: campaign.title,
      status: campaign.status,
      totalReach: campaign.totalReach,
      engagement: campaign.engagement,
      platforms: campaign.platforms,
      metrics: campaign.metrics,
      postPerformance: posts
        .filter(post => post.metrics)
        .map(post => ({
          postId: post.postId,
          platform: post.platform,
          metrics: post.metrics,
          scheduledAt: post.scheduledAt
        })),
      insights: await this.generateInsights(campaign, posts)
    };

    return analytics;
  }

  async generateInsights(campaign, posts) {
    // Generate AI-powered insights based on campaign data
    const insights = [];

    // Performance insights
    if (campaign.metrics.roi > 200) {
      insights.push({
        type: 'success',
        title: 'High ROI Performance',
        description: `Campaign achieving ${campaign.metrics.roi}% ROI, exceeding industry average`,
        priority: 'high'
      });
    }

    // Platform insights
    const platformPerformance = posts.reduce((acc, post) => {
      if (post.metrics) {
        if (!acc[post.platform]) {
          acc[post.platform] = { reach: 0, engagement: 0, count: 0 };
        }
        acc[post.platform].reach += post.metrics.reach;
        acc[post.platform].engagement += post.metrics.engagement;
        acc[post.platform].count++;
      }
      return acc;
    }, {});

    // Find best performing platform
    let bestPlatform = null;
    let bestEngagementRate = 0;

    Object.entries(platformPerformance).forEach(([platform, data]) => {
      const engagementRate = data.engagement / data.reach;
      if (engagementRate > bestEngagementRate) {
        bestEngagementRate = engagementRate;
        bestPlatform = platform;
      }
    });

    if (bestPlatform) {
      insights.push({
        type: 'opportunity',
        title: `${bestPlatform.charAt(0).toUpperCase() + bestPlatform.slice(1)} Outperforming`,
        description: `Consider allocating more budget to ${bestPlatform} for better results`,
        priority: 'medium'
      });
    }

    return insights;
  }

  // Campaign Optimization
  async optimizeCampaign(campaignId, optimizationGoals = []) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const posts = await this.getCampaignPosts(campaignId);
    const optimizations = [];

    // Budget optimization
    if (optimizationGoals.includes('budget')) {
      optimizations.push({
        type: 'budget',
        recommendation: 'Shift 20% budget from Facebook to Instagram for better ROI',
        expectedImpact: '+15% ROI',
        confidence: 85
      });
    }

    // Content optimization
    if (optimizationGoals.includes('content')) {
      optimizations.push({
        type: 'content',
        recommendation: 'Use more video content - shows 40% higher engagement',
        expectedImpact: '+40% engagement',
        confidence: 92
      });
    }

    // Timing optimization
    if (optimizationGoals.includes('timing')) {
      optimizations.push({
        type: 'timing',
        recommendation: 'Post at 8 PM instead of 2 PM for peak audience activity',
        expectedImpact: '+25% reach',
        confidence: 88
      });
    }

    return {
      campaignId,
      optimizations,
      generatedAt: new Date().toISOString()
    };
  }
}

// Export singleton instance
const campaignComposer = new CampaignComposer();
export default campaignComposer;