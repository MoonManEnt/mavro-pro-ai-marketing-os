import { Router } from 'express';
import { z } from 'zod';
import { optionalAuth } from '../auth/middleware';

const router = Router();

// Create Campaign Schema
const createCampaignSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  platform: z.string(),
  budget: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  targetAudience: z.string().optional(),
  objectives: z.array(z.string()).optional(),
  content: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    media: z.array(z.string()).optional()
  }).optional()
});

// Get all campaigns for user
router.get('/', optionalAuth, async (req, res) => {
  try {
    // For authenticated users, return empty campaigns (beta users have no campaigns yet)
    if (req.user) {
      return res.json([]);
    }

    // For demo users, return sample campaigns based on persona
    const persona = req.query.persona as string || 'kemar';
    const campaigns = getPersonaCampaigns(persona);
    
    res.json(campaigns);
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// Create new campaign
router.post('/', optionalAuth, async (req, res) => {
  try {
    const campaignData = createCampaignSchema.parse(req.body);
    
    // Generate campaign ID
    const campaignId = `camp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const campaign = {
      id: campaignId,
      ...campaignData,
      status: 'draft',
      createdAt: new Date().toISOString(),
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spend: 0,
        ctr: 0,
        cpc: 0,
        roi: 0
      }
    };

    // For authenticated users, store in database (implementation would go here)
    if (req.user) {
      // In a real implementation, save to database
      console.log('Would save campaign to database for user:', req.user.id);
    }

    res.json({
      success: true,
      campaign
    });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

// Get specific campaign
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // For demo purposes, generate campaign details
    const campaign = generateCampaignDetails(id, req.query.persona as string);
    
    res.json(campaign);
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

// Update campaign
router.put('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // For demo purposes, simulate update
    const updatedCampaign = {
      id,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      campaign: updatedCampaign
    });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
});

// Launch campaign
router.post('/:id/launch', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Simulate campaign launch
    const launchedCampaign = {
      id,
      status: 'active',
      launchedAt: new Date().toISOString(),
      performance: {
        impressions: Math.floor(Math.random() * 1000) + 100,
        clicks: Math.floor(Math.random() * 50) + 10,
        conversions: Math.floor(Math.random() * 10) + 1,
        spend: Math.floor(Math.random() * 500) + 50,
        ctr: (Math.random() * 5 + 1).toFixed(2),
        cpc: (Math.random() * 3 + 0.5).toFixed(2),
        roi: (Math.random() * 200 + 100).toFixed(0)
      }
    };
    
    res.json({
      success: true,
      campaign: launchedCampaign
    });
  } catch (error) {
    console.error('Launch campaign error:', error);
    res.status(500).json({ error: 'Failed to launch campaign' });
  }
});

// Campaign performance analytics
router.get('/:id/analytics', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { timeframe } = req.query;
    
    const analytics = generateCampaignAnalytics(id, timeframe as string);
    
    res.json(analytics);
  } catch (error) {
    console.error('Campaign analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch campaign analytics' });
  }
});

// Helper functions for demo data
function getPersonaCampaigns(persona: string) {
  const campaignTemplates = {
    kemar: [
      {
        id: 'camp_leadership_2024',
        name: 'Executive Leadership Series',
        type: 'thought_leadership',
        platform: 'linkedin',
        status: 'active',
        budget: 2500,
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        performance: {
          impressions: 15420,
          clicks: 892,
          conversions: 47,
          spend: 1850,
          ctr: 5.8,
          cpc: 2.07,
          roi: 285
        },
        objectives: ['Build thought leadership', 'Generate speaking opportunities', 'Increase LinkedIn followers']
      },
      {
        id: 'camp_webinar_series',
        name: 'Q1 Webinar Promotion',
        type: 'event_promotion',
        platform: 'multi',
        status: 'completed',
        budget: 1800,
        startDate: '2024-02-01',
        endDate: '2024-02-28',
        performance: {
          impressions: 8750,
          clicks: 425,
          conversions: 89,
          spend: 1650,
          ctr: 4.9,
          cpc: 3.88,
          roi: 340
        },
        objectives: ['Drive webinar registrations', 'Build email list', 'Establish expertise']
      }
    ],
    karen: [
      {
        id: 'camp_luxury_listings',
        name: 'Luxury Listings Showcase',
        type: 'property_promotion',
        platform: 'instagram',
        status: 'active',
        budget: 3200,
        startDate: '2024-01-20',
        endDate: '2024-04-20',
        performance: {
          impressions: 22580,
          clicks: 1247,
          conversions: 73,
          spend: 2450,
          ctr: 5.5,
          cpc: 1.96,
          roi: 420
        },
        objectives: ['Showcase premium properties', 'Attract high-net-worth buyers', 'Build luxury brand']
      },
      {
        id: 'camp_market_insights',
        name: 'Market Intelligence Reports',
        type: 'content_marketing',
        platform: 'linkedin',
        status: 'active',
        budget: 1500,
        startDate: '2024-02-10',
        endDate: '2024-05-10',
        performance: {
          impressions: 9840,
          clicks: 567,
          conversions: 34,
          spend: 980,
          ctr: 5.8,
          cpc: 1.73,
          roi: 295
        },
        objectives: ['Position as market expert', 'Generate seller leads', 'Build professional network']
      }
    ],
    sarah: [
      {
        id: 'camp_beauty_transformations',
        name: 'Beauty Transformation Stories',
        type: 'before_after_showcase',
        platform: 'instagram',
        status: 'active',
        budget: 2800,
        startDate: '2024-01-25',
        endDate: '2024-04-25',
        performance: {
          impressions: 18950,
          clicks: 1156,
          conversions: 68,
          spend: 2180,
          ctr: 6.1,
          cpc: 1.89,
          roi: 385
        },
        objectives: ['Showcase treatment results', 'Build trust with potential clients', 'Increase consultation bookings']
      },
      {
        id: 'camp_skincare_education',
        name: 'Skincare Education Series',
        type: 'educational_content',
        platform: 'facebook',
        status: 'active',
        budget: 1200,
        startDate: '2024-02-15',
        endDate: '2024-03-15',
        performance: {
          impressions: 7650,
          clicks: 423,
          conversions: 29,
          spend: 890,
          ctr: 5.5,
          cpc: 2.10,
          roi: 265
        },
        objectives: ['Educate about treatments', 'Build authority in aesthetics', 'Drive website traffic']
      }
    ]
  };

  return campaignTemplates[persona as keyof typeof campaignTemplates] || [];
}

function generateCampaignDetails(id: string, persona: string = 'kemar') {
  return {
    id,
    name: `Campaign ${id}`,
    type: 'content_marketing',
    platform: 'multi',
    status: 'active',
    budget: 2000,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    targetAudience: 'Business professionals aged 25-55',
    performance: {
      impressions: Math.floor(Math.random() * 20000) + 5000,
      clicks: Math.floor(Math.random() * 1000) + 200,
      conversions: Math.floor(Math.random() * 100) + 20,
      spend: Math.floor(Math.random() * 1500) + 500,
      ctr: (Math.random() * 5 + 2).toFixed(2),
      cpc: (Math.random() * 3 + 1).toFixed(2),
      roi: (Math.random() * 300 + 150).toFixed(0)
    },
    content: {
      title: 'Professional Growth Campaign',
      description: 'Driving engagement and conversions through targeted content',
      media: ['image1.jpg', 'video1.mp4']
    },
    objectives: ['Increase brand awareness', 'Generate leads', 'Drive conversions']
  };
}

function generateCampaignAnalytics(id: string, timeframe: string = '30d') {
  const days = timeframe === '7d' ? 7 : timeframe === '90d' ? 90 : 30;
  
  const dailyData = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    return {
      date: date.toISOString().split('T')[0],
      impressions: Math.floor(Math.random() * 1000) + 100,
      clicks: Math.floor(Math.random() * 50) + 10,
      conversions: Math.floor(Math.random() * 10) + 1,
      spend: Math.floor(Math.random() * 100) + 20,
      ctr: (Math.random() * 5 + 1).toFixed(2),
      cpc: (Math.random() * 3 + 0.5).toFixed(2)
    };
  });

  return {
    timeframe,
    summary: {
      totalImpressions: dailyData.reduce((sum, day) => sum + day.impressions, 0),
      totalClicks: dailyData.reduce((sum, day) => sum + day.clicks, 0),
      totalConversions: dailyData.reduce((sum, day) => sum + day.conversions, 0),
      totalSpend: dailyData.reduce((sum, day) => sum + day.spend, 0),
      avgCtr: (dailyData.reduce((sum, day) => sum + parseFloat(day.ctr), 0) / dailyData.length).toFixed(2),
      avgCpc: (dailyData.reduce((sum, day) => sum + parseFloat(day.cpc), 0) / dailyData.length).toFixed(2)
    },
    dailyData,
    topPerformingContent: [
      { title: 'Industry Insights Post', impressions: 5420, clicks: 287, ctr: 5.3 },
      { title: 'Expert Tips Video', impressions: 4890, clicks: 312, ctr: 6.4 },
      { title: 'Case Study Article', impressions: 3650, clicks: 198, ctr: 5.4 }
    ],
    audienceInsights: {
      topLocations: ['United States', 'Canada', 'United Kingdom'],
      topAgeGroups: ['25-34', '35-44', '45-54'],
      topInterests: ['Business', 'Leadership', 'Professional Development']
    }
  };
}

export default router;