import { Router } from 'express';
import { optionalAuth } from '../auth/middleware';

const router = Router();

// Get dashboard analytics overview
router.get('/dashboard', optionalAuth, async (req, res) => {
  try {
    const persona = req.query.persona as string || 'kemar';
    
    // For authenticated users, return empty analytics (beta users start fresh)
    if (req.user) {
      return res.json({
        overview: {
          totalReach: 0,
          totalEngagement: 0,
          totalConversions: 0,
          totalROI: 0
        },
        metrics: [],
        trends: [],
        insights: []
      });
    }

    // For demo users, return persona-specific analytics
    const analytics = getPersonaAnalytics(persona);
    res.json(analytics);
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard analytics' });
  }
});

// Get performance metrics for specific timeframe
router.get('/performance', optionalAuth, async (req, res) => {
  try {
    const { timeframe, persona } = req.query;
    
    const performance = generatePerformanceMetrics(
      timeframe as string || '30d',
      persona as string || 'kemar'
    );
    
    res.json(performance);
  } catch (error) {
    console.error('Performance analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch performance metrics' });
  }
});

// Get social media platform analytics
router.get('/platforms', optionalAuth, async (req, res) => {
  try {
    const persona = req.query.persona as string || 'kemar';
    
    const platformAnalytics = getPlatformAnalytics(persona);
    res.json(platformAnalytics);
  } catch (error) {
    console.error('Platform analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch platform analytics' });
  }
});

// Get audience insights
router.get('/audience', optionalAuth, async (req, res) => {
  try {
    const persona = req.query.persona as string || 'kemar';
    
    const audienceData = getAudienceInsights(persona);
    res.json(audienceData);
  } catch (error) {
    console.error('Audience analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch audience insights' });
  }
});

// Get content performance analytics
router.get('/content', optionalAuth, async (req, res) => {
  try {
    const persona = req.query.persona as string || 'kemar';
    
    const contentAnalytics = getContentPerformance(persona);
    res.json(contentAnalytics);
  } catch (error) {
    console.error('Content analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch content analytics' });
  }
});

// Helper functions for generating analytics data
function getPersonaAnalytics(persona: string) {
  const baseMetrics = {
    kemar: {
      overview: {
        totalReach: 45280,
        totalEngagement: 2847,
        totalConversions: 156,
        totalROI: 312
      },
      recentGrowth: {
        reach: 12.5,
        engagement: 18.3,
        conversions: 24.7,
        roi: 15.8
      }
    },
    karen: {
      overview: {
        totalReach: 38920,
        totalEngagement: 3142,
        totalConversions: 189,
        totalROI: 425
      },
      recentGrowth: {
        reach: 15.2,
        engagement: 22.1,
        conversions: 28.4,
        roi: 19.3
      }
    },
    sarah: {
      overview: {
        totalReach: 42150,
        totalEngagement: 3658,
        totalConversions: 203,
        totalROI: 385
      },
      recentGrowth: {
        reach: 18.7,
        engagement: 25.9,
        conversions: 32.1,
        roi: 22.5
      }
    }
  };

  const personaData = baseMetrics[persona as keyof typeof baseMetrics] || baseMetrics.kemar;
  
  return {
    ...personaData,
    metrics: generateTimeSeriesData(30),
    trends: getPersonaTrends(persona),
    insights: getPersonaInsights(persona),
    topContent: getTopPerformingContent(persona),
    platformBreakdown: getPlatformBreakdown(persona)
  };
}

function generatePerformanceMetrics(timeframe: string, persona: string) {
  const days = timeframe === '7d' ? 7 : timeframe === '90d' ? 90 : 30;
  const dailyData = generateTimeSeriesData(days);
  
  return {
    timeframe,
    summary: {
      totalImpressions: dailyData.reduce((sum, day) => sum + day.impressions, 0),
      totalEngagement: dailyData.reduce((sum, day) => sum + day.engagement, 0),
      totalConversions: dailyData.reduce((sum, day) => sum + day.conversions, 0),
      avgEngagementRate: (dailyData.reduce((sum, day) => sum + day.engagementRate, 0) / dailyData.length).toFixed(2)
    },
    dailyData,
    weeklyComparison: generateWeeklyComparison(),
    monthlyTrends: generateMonthlyTrends()
  };
}

function generateTimeSeriesData(days: number) {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    const baseImpressions = 1000 + Math.floor(Math.random() * 500);
    const engagement = Math.floor(baseImpressions * (0.05 + Math.random() * 0.05));
    
    return {
      date: date.toISOString().split('T')[0],
      impressions: baseImpressions,
      engagement: engagement,
      conversions: Math.floor(engagement * (0.1 + Math.random() * 0.1)),
      engagementRate: (engagement / baseImpressions * 100).toFixed(2),
      reach: Math.floor(baseImpressions * (0.7 + Math.random() * 0.2))
    };
  });
}

function getPlatformAnalytics(persona: string) {
  const platforms = {
    kemar: [
      { name: 'LinkedIn', impressions: 18420, engagement: 1247, conversions: 89, engagementRate: 6.8 },
      { name: 'Instagram', impressions: 12680, engagement: 892, conversions: 34, engagementRate: 7.0 },
      { name: 'Facebook', impressions: 8950, engagement: 456, conversions: 23, engagementRate: 5.1 },
      { name: 'Twitter', impressions: 5230, engagement: 252, conversions: 10, engagementRate: 4.8 }
    ],
    karen: [
      { name: 'Instagram', impressions: 22580, engagement: 1456, conversions: 126, engagementRate: 6.4 },
      { name: 'Facebook', impressions: 11240, engagement: 789, conversions: 45, engagementRate: 7.0 },
      { name: 'LinkedIn', impressions: 5100, engagement: 897, conversions: 18, engagementRate: 17.6 },
      { name: 'Pinterest', impressions: 3200, engagement: 234, conversions: 8, engagementRate: 7.3 }
    ],
    sarah: [
      { name: 'Instagram', impressions: 28940, engagement: 2156, conversions: 145, engagementRate: 7.4 },
      { name: 'Facebook', impressions: 9850, engagement: 892, conversions: 38, engagementRate: 9.1 },
      { name: 'TikTok', impressions: 3360, engagement: 610, conversions: 20, engagementRate: 18.2 },
      { name: 'YouTube', impressions: 1280, engagement: 156, conversions: 5, engagementRate: 12.2 }
    ]
  };

  return platforms[persona as keyof typeof platforms] || platforms.kemar;
}

function getAudienceInsights(persona: string) {
  const insights = {
    kemar: {
      demographics: {
        ageGroups: [
          { range: '25-34', percentage: 35 },
          { range: '35-44', percentage: 42 },
          { range: '45-54', percentage: 18 },
          { range: '55+', percentage: 5 }
        ],
        locations: [
          { country: 'United States', percentage: 45 },
          { country: 'Canada', percentage: 18 },
          { country: 'United Kingdom', percentage: 12 },
          { country: 'Australia', percentage: 8 },
          { country: 'Germany', percentage: 7 },
          { country: 'Other', percentage: 10 }
        ],
        interests: [
          'Leadership Development',
          'Business Strategy',
          'Executive Coaching',
          'Professional Growth',
          'Team Management'
        ]
      },
      behavior: {
        peakActivity: ['9-10 AM', '12-1 PM', '5-6 PM'],
        avgSessionDuration: '3:24',
        returnVisitorRate: 68,
        mobileUsage: 72
      }
    },
    karen: {
      demographics: {
        ageGroups: [
          { range: '35-44', percentage: 38 },
          { range: '45-54', percentage: 35 },
          { range: '25-34', percentage: 20 },
          { range: '55+', percentage: 7 }
        ],
        locations: [
          { country: 'United States', percentage: 78 },
          { country: 'Canada', percentage: 15 },
          { country: 'United Kingdom', percentage: 4 },
          { country: 'Australia', percentage: 2 },
          { country: 'Other', percentage: 1 }
        ],
        interests: [
          'Luxury Real Estate',
          'Property Investment',
          'Home Design',
          'Wealth Building',
          'Market Analysis'
        ]
      },
      behavior: {
        peakActivity: ['10-11 AM', '2-3 PM', '7-8 PM'],
        avgSessionDuration: '4:12',
        returnVisitorRate: 74,
        mobileUsage: 65
      }
    },
    sarah: {
      demographics: {
        ageGroups: [
          { range: '25-34', percentage: 45 },
          { range: '35-44', percentage: 32 },
          { range: '45-54', percentage: 18 },
          { range: '18-24', percentage: 5 }
        ],
        locations: [
          { country: 'United States', percentage: 68 },
          { country: 'Canada', percentage: 12 },
          { country: 'United Kingdom', percentage: 8 },
          { country: 'Australia', percentage: 6 },
          { country: 'Germany', percentage: 3 },
          { country: 'Other', percentage: 3 }
        ],
        interests: [
          'Beauty & Skincare',
          'Anti-Aging',
          'Wellness',
          'Self-Care',
          'Medical Aesthetics'
        ]
      },
      behavior: {
        peakActivity: ['11 AM-12 PM', '3-4 PM', '8-9 PM'],
        avgSessionDuration: '2:56',
        returnVisitorRate: 71,
        mobileUsage: 84
      }
    }
  };

  return insights[persona as keyof typeof insights] || insights.kemar;
}

function getContentPerformance(persona: string) {
  const content = {
    kemar: [
      {
        title: 'Leadership in Remote Teams',
        type: 'Article',
        platform: 'LinkedIn',
        impressions: 5420,
        engagement: 387,
        conversions: 23,
        engagementRate: 7.1,
        publishedDate: '2024-01-15'
      },
      {
        title: 'Executive Decision Making',
        type: 'Video',
        platform: 'Instagram',
        impressions: 3890,
        engagement: 456,
        conversions: 18,
        engagementRate: 11.7,
        publishedDate: '2024-01-12'
      },
      {
        title: 'Building High-Performance Teams',
        type: 'Post',
        platform: 'LinkedIn',
        impressions: 2840,
        engagement: 234,
        conversions: 15,
        engagementRate: 8.2,
        publishedDate: '2024-01-10'
      }
    ],
    karen: [
      {
        title: 'Luxury Market Trends 2024',
        type: 'Article',
        platform: 'LinkedIn',
        impressions: 4560,
        engagement: 312,
        conversions: 28,
        engagementRate: 6.8,
        publishedDate: '2024-01-18'
      },
      {
        title: 'Virtual Property Tour',
        type: 'Video',
        platform: 'Instagram',
        impressions: 6780,
        engagement: 892,
        conversions: 45,
        engagementRate: 13.2,
        publishedDate: '2024-01-16'
      },
      {
        title: 'Investment Property Analysis',
        type: 'Carousel',
        platform: 'Instagram',
        impressions: 3420,
        engagement: 287,
        conversions: 19,
        engagementRate: 8.4,
        publishedDate: '2024-01-14'
      }
    ],
    sarah: [
      {
        title: 'Before & After: Botox Results',
        type: 'Video',
        platform: 'Instagram',
        impressions: 8940,
        engagement: 1245,
        conversions: 67,
        engagementRate: 13.9,
        publishedDate: '2024-01-20'
      },
      {
        title: 'Skincare Routine Tips',
        type: 'Carousel',
        platform: 'Instagram',
        impressions: 5670,
        engagement: 456,
        conversions: 34,
        engagementRate: 8.0,
        publishedDate: '2024-01-17'
      },
      {
        title: 'Chemical Peel Benefits',
        type: 'Article',
        platform: 'Facebook',
        impressions: 2890,
        engagement: 234,
        conversions: 18,
        engagementRate: 8.1,
        publishedDate: '2024-01-15'
      }
    ]
  };

  return content[persona as keyof typeof content] || content.kemar;
}

function getPersonaTrends(persona: string) {
  const trends = {
    kemar: [
      { topic: 'Remote Leadership', growth: '+45%', timeframe: '30d' },
      { topic: 'Executive Coaching', growth: '+32%', timeframe: '30d' },
      { topic: 'Team Building', growth: '+28%', timeframe: '30d' }
    ],
    karen: [
      { topic: 'Virtual Tours', growth: '+58%', timeframe: '30d' },
      { topic: 'Luxury Markets', growth: '+41%', timeframe: '30d' },
      { topic: 'Investment Properties', growth: '+35%', timeframe: '30d' }
    ],
    sarah: [
      { topic: 'Non-Invasive Treatments', growth: '+62%', timeframe: '30d' },
      { topic: 'Skincare Education', growth: '+48%', timeframe: '30d' },
      { topic: 'Medical Aesthetics', growth: '+39%', timeframe: '30d' }
    ]
  };

  return trends[persona as keyof typeof trends] || trends.kemar;
}

function getPersonaInsights(persona: string) {
  const insights = {
    kemar: [
      'Video content performs 45% better than text posts',
      'LinkedIn engagement peaks at 9-10 AM on weekdays',
      'Leadership topics drive highest conversion rates',
      'Professional development content has 3x higher save rate'
    ],
    karen: [
      'Property showcase videos have 68% higher engagement',
      'Weekend posts perform 32% better for luxury content',
      'Market analysis content drives most qualified leads',
      'Virtual tours increase inquiry rates by 45%'
    ],
    sarah: [
      'Before/after content generates 78% more engagement',
      'Educational posts have highest share rates',
      'Evening posts (7-9 PM) perform best',
      'Treatment videos drive most consultation bookings'
    ]
  };

  return insights[persona as keyof typeof insights] || insights.kemar;
}

function getTopPerformingContent(persona: string) {
  // This would return the same as getContentPerformance but formatted differently
  return getContentPerformance(persona).slice(0, 3);
}

function getPlatformBreakdown(persona: string) {
  return getPlatformAnalytics(persona).map(platform => ({
    name: platform.name,
    percentage: ((platform.impressions / getPlatformAnalytics(persona).reduce((sum, p) => sum + p.impressions, 0)) * 100).toFixed(1)
  }));
}

function generateWeeklyComparison() {
  return {
    thisWeek: {
      impressions: 8420,
      engagement: 567,
      conversions: 34
    },
    lastWeek: {
      impressions: 7890,
      engagement: 498,
      conversions: 28
    },
    growth: {
      impressions: 6.7,
      engagement: 13.9,
      conversions: 21.4
    }
  };
}

function generateMonthlyTrends() {
  return Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      impressions: Math.floor(Math.random() * 10000) + 15000,
      engagement: Math.floor(Math.random() * 1000) + 800,
      conversions: Math.floor(Math.random() * 100) + 50
    };
  });
}

export default router;