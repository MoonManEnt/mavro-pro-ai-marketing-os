/**
 * ViVi Campaign Extension Engine
 * Autonomously manages campaign lifecycle based on performance metrics
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ViViCampaignExtensionEngine {
  constructor() {
    this.triggersPath = path.join(__dirname, '../data/campaignExtensionTriggers.json');
    this.logPath = path.join(__dirname, '../data/extensionActivityLog.json');
    this.campaignsPath = path.join(__dirname, '../data/campaigns.json');
    this.isRunning = false;
    this.checkInterval = 60000; // Check every minute
  }

  async initialize() {
    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, '../data');
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Initialize trigger configuration
    await this.initializeTriggers();
    
    // Initialize activity log
    await this.initializeActivityLog();
    
    console.log('ViVi Campaign Extension Engine initialized');
  }

  async initializeTriggers() {
    const defaultTriggers = {
      "medspa": {
        "minEngagementRate": 0.025,
        "minReachVelocity": 1.1,
        "maxPostSpacingHours": 6,
        "failureThreshold": 0.015,
        "extensionPostCount": 2
      },
      "speaker": {
        "minEngagementRate": 0.035,
        "minReachVelocity": 1.15,
        "maxPostSpacingHours": 8,
        "failureThreshold": 0.02,
        "extensionPostCount": 1
      },
      "realestate": {
        "minEngagementRate": 0.02,
        "minReachVelocity": 1.08,
        "maxPostSpacingHours": 12,
        "failureThreshold": 0.012,
        "extensionPostCount": 3
      },
      "restaurant": {
        "minEngagementRate": 0.03,
        "minReachVelocity": 1.2,
        "maxPostSpacingHours": 4,
        "failureThreshold": 0.018,
        "extensionPostCount": 2
      },
      "fitness": {
        "minEngagementRate": 0.028,
        "minReachVelocity": 1.12,
        "maxPostSpacingHours": 6,
        "failureThreshold": 0.016,
        "extensionPostCount": 2
      },
      "automotive": {
        "minEngagementRate": 0.022,
        "minReachVelocity": 1.05,
        "maxPostSpacingHours": 24,
        "failureThreshold": 0.014,
        "extensionPostCount": 1
      }
    };

    try {
      await fs.access(this.triggersPath);
    } catch {
      await fs.writeFile(this.triggersPath, JSON.stringify(defaultTriggers, null, 2));
    }
  }

  async initializeActivityLog() {
    const defaultLog = {
      extensions: [],
      pivots: [],
      archives: [],
      lastCheck: new Date().toISOString()
    };

    try {
      await fs.access(this.logPath);
    } catch {
      await fs.writeFile(this.logPath, JSON.stringify(defaultLog, null, 2));
    }
  }

  async getCampaigns() {
    try {
      const data = await fs.readFile(this.campaignsPath, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getTriggers() {
    try {
      const data = await fs.readFile(this.triggersPath, 'utf8');
      return JSON.parse(data);
    } catch {
      return {};
    }
  }

  async getActivityLog() {
    try {
      const data = await fs.readFile(this.logPath, 'utf8');
      return JSON.parse(data);
    } catch {
      return { extensions: [], pivots: [], archives: [], lastCheck: new Date().toISOString() };
    }
  }

  async updateActivityLog(log) {
    await fs.writeFile(this.logPath, JSON.stringify(log, null, 2));
  }

  calculateEngagementRate(campaign) {
    const totalEngagement = campaign.analytics?.totalLikes + campaign.analytics?.totalComments + campaign.analytics?.totalShares || 0;
    const totalReach = campaign.analytics?.totalReach || 1;
    return totalEngagement / totalReach;
  }

  calculateReachVelocity(campaign) {
    // Simulate reach velocity based on campaign performance
    const baseVelocity = 1.0;
    const performanceMultiplier = (campaign.analytics?.engagementRate || 0.02) * 50;
    return baseVelocity + performanceMultiplier;
  }

  getWinningPostFormat(campaign) {
    const posts = campaign.posts || [];
    if (posts.length === 0) return 'reels';
    
    // Find format with highest engagement
    const formatPerformance = {};
    posts.forEach(post => {
      const format = post.format || 'reels';
      if (!formatPerformance[format]) {
        formatPerformance[format] = { totalEngagement: 0, count: 0 };
      }
      formatPerformance[format].totalEngagement += (post.likes || 0) + (post.comments || 0);
      formatPerformance[format].count++;
    });

    let bestFormat = 'reels';
    let bestAverage = 0;
    
    Object.entries(formatPerformance).forEach(([format, data]) => {
      const average = data.totalEngagement / data.count;
      if (average > bestAverage) {
        bestAverage = average;
        bestFormat = format;
      }
    });

    return bestFormat;
  }

  generateExtensionPost(campaign, winningFormat, persona) {
    const templates = {
      reels: [
        "Behind the scenes of our top-performing content!",
        "You loved our last video, so here's more!",
        "Building on what's working - more engaging content coming your way!"
      ],
      story: [
        "Quick update on our successful campaign!",
        "More insights from our trending story!",
        "Following up on what you're loving!"
      ],
      post: [
        "Continuing our successful content series!",
        "More of what's working for our community!",
        "Building momentum with proven content!"
      ]
    };

    const template = templates[winningFormat] || templates.reels;
    const content = template[Math.floor(Math.random() * template.length)];

    return {
      id: `ext_${campaign.id}_${Date.now()}`,
      content,
      format: winningFormat,
      platforms: campaign.platforms || ['instagram'],
      scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      status: 'scheduled',
      autoGenerated: true,
      extensionSource: campaign.id,
      createdAt: new Date().toISOString()
    };
  }

  async extendCampaign(campaign, triggers, persona) {
    const winningFormat = this.getWinningPostFormat(campaign);
    const newPosts = [];

    for (let i = 0; i < triggers.extensionPostCount; i++) {
      const post = this.generateExtensionPost(campaign, winningFormat, persona);
      newPosts.push(post);
    }

    // Update campaign
    campaign.posts = [...(campaign.posts || []), ...newPosts];
    campaign.status = 'Extended by ViVi';
    campaign.lastExtension = new Date().toISOString();
    campaign.extensions = (campaign.extensions || 0) + 1;

    return {
      action: 'extend',
      campaignId: campaign.id,
      newPostsCount: newPosts.length,
      winningFormat,
      timestamp: new Date().toISOString(),
      reason: 'Performance exceeds benchmarks'
    };
  }

  async pivotCampaign(campaign, persona) {
    const currentFormat = this.getWinningPostFormat(campaign);
    const formatOptions = ['reels', 'story', 'post'];
    const newFormat = formatOptions.find(f => f !== currentFormat) || 'reels';

    const pivotPost = this.generateExtensionPost(campaign, newFormat, persona);
    campaign.posts = [...(campaign.posts || []), pivotPost];
    campaign.status = 'Pivoted by ViVi';
    campaign.lastPivot = new Date().toISOString();

    return {
      action: 'pivot',
      campaignId: campaign.id,
      fromFormat: currentFormat,
      toFormat: newFormat,
      timestamp: new Date().toISOString(),
      reason: 'Format optimization attempt'
    };
  }

  async archiveCampaign(campaign) {
    campaign.status = 'Archived by ViVi';
    campaign.archivedAt = new Date().toISOString();

    return {
      action: 'archive',
      campaignId: campaign.id,
      timestamp: new Date().toISOString(),
      reason: 'Underperforming - below failure threshold'
    };
  }

  async processCampaigns() {
    try {
      const campaigns = await this.getCampaigns();
      const triggers = await this.getTriggers();
      const activityLog = await this.getActivityLog();

      const actions = [];

      for (const campaign of campaigns) {
        if (campaign.status !== 'Live') continue;

        const persona = campaign.persona || 'medspa';
        const personaTriggers = triggers[persona];
        
        if (!personaTriggers) continue;

        const engagementRate = this.calculateEngagementRate(campaign);
        const reachVelocity = this.calculateReachVelocity(campaign);

        // Check for extension opportunity
        if (engagementRate >= personaTriggers.minEngagementRate && 
            reachVelocity >= personaTriggers.minReachVelocity) {
          
          const action = await this.extendCampaign(campaign, personaTriggers, persona);
          actions.push(action);
          activityLog.extensions.push(action);
        }
        // Check for failure threshold
        else if (engagementRate < personaTriggers.failureThreshold) {
          const action = await this.archiveCampaign(campaign);
          actions.push(action);
          activityLog.archives.push(action);
        }
        // Check for pivot opportunity (mediocre performance)
        else if (engagementRate < personaTriggers.minEngagementRate && 
                 engagementRate >= personaTriggers.failureThreshold) {
          
          const action = await this.pivotCampaign(campaign, persona);
          actions.push(action);
          activityLog.pivots.push(action);
        }
      }

      // Update activity log
      activityLog.lastCheck = new Date().toISOString();
      await this.updateActivityLog(activityLog);

      if (actions.length > 0) {
        // Save updated campaigns
        await fs.writeFile(this.campaignsPath, JSON.stringify(campaigns, null, 2));
        console.log(`ViVi processed ${actions.length} campaign actions:`, actions.map(a => a.action));
      }

      return actions;
    } catch (error) {
      console.error('Error processing campaigns:', error);
      return [];
    }
  }

  async start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('ViVi Campaign Extension Engine started');

    // Initial check
    await this.processCampaigns();

    // Set up periodic checks
    this.intervalId = setInterval(async () => {
      await this.processCampaigns();
    }, this.checkInterval);
  }

  async stop() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    console.log('ViVi Campaign Extension Engine stopped');
  }

  async getRecentActions(limit = 10) {
    const log = await this.getActivityLog();
    const allActions = [
      ...log.extensions.map(a => ({ ...a, type: 'extension' })),
      ...log.pivots.map(a => ({ ...a, type: 'pivot' })),
      ...log.archives.map(a => ({ ...a, type: 'archive' }))
    ];

    return allActions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }
}

export default ViViCampaignExtensionEngine;