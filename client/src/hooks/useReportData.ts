import { useState, useEffect } from 'react';

interface ReportFilters {
  dateRange: string;
  platform: string;
  format: string;
}

interface ReportData {
  reach: number;
  leads: number;
  campaigns: number;
  conversionRate: number;
  topPlatform: string;
  growthRate: number;
  platformStats: Array<{
    platform: string;
    reach: number;
    engagement: number;
    ctr: number;
    color: string;
  }>;
  formatStats: Array<{
    format: string;
    conversion: number;
    volume: number;
    efficiency: number;
  }>;
  campaignStats: Array<{
    name: string;
    status: string;
    viviGrade: string;
    conversion: number;
    spend: number;
  }>;
  geoStats: Array<{
    region: string;
    zip: string;
    performance: number;
    leads: number;
  }>;
  leadStats: {
    total: number;
    qualified: number;
    converted: number;
    pipeline: Array<{
      stage: string;
      count: number;
      percentage: number;
    }>;
  };
  viviImpact: {
    decisionsCount: number;
    revenueImpact: number;
    timesSaved: number;
    optimizations: Array<{
      type: string;
      improvement: string;
      value: number;
    }>;
  };
  recommendations: Array<{
    type: string;
    priority: string;
    title: string;
    description: string;
    action: string;
    potential: string;
  }>;
}

export const useReportData = (filters: ReportFilters): ReportData => {
  const [data, setData] = useState<ReportData>({
    reach: 0,
    leads: 0,
    campaigns: 0,
    conversionRate: 0,
    topPlatform: '',
    growthRate: 0,
    platformStats: [],
    formatStats: [],
    campaignStats: [],
    geoStats: [],
    leadStats: { total: 0, qualified: 0, converted: 0, pipeline: [] },
    viviImpact: { decisionsCount: 0, revenueImpact: 0, timesSaved: 0, optimizations: [] },
    recommendations: []
  });

  useEffect(() => {
    // Simulated data aggregation based on filters
    const generateMockData = (): ReportData => {
      const baseMultiplier = filters.dateRange === '7' ? 0.25 : 
                            filters.dateRange === '30' ? 1 : 
                            filters.dateRange === '90' ? 2.5 : 8;

      return {
        reach: Math.floor(124500 * baseMultiplier),
        leads: Math.floor(142 * baseMultiplier),
        campaigns: Math.floor(8 * (baseMultiplier / 2)),
        conversionRate: 3.2,
        topPlatform: 'Instagram',
        growthRate: 18.5,
        platformStats: [
          {
            platform: 'Instagram',
            reach: Math.floor(72000 * baseMultiplier),
            engagement: 4.8,
            ctr: 2.3,
            color: 'bg-gradient-to-r from-pink-500 to-purple-600'
          },
          {
            platform: 'TikTok', 
            reach: Math.floor(38000 * baseMultiplier),
            engagement: 6.2,
            ctr: 3.1,
            color: 'bg-gradient-to-r from-cyan-500 to-blue-600'
          },
          {
            platform: 'Facebook',
            reach: Math.floor(14500 * baseMultiplier),
            engagement: 2.1,
            ctr: 1.4,
            color: 'bg-gradient-to-r from-blue-600 to-indigo-700'
          },
          {
            platform: 'LinkedIn',
            reach: Math.floor(8200 * baseMultiplier),
            engagement: 3.5,
            ctr: 2.8,
            color: 'bg-gradient-to-r from-blue-500 to-blue-700'
          }
        ],
        formatStats: [
          { format: 'Reels', conversion: 4.2, volume: 45, efficiency: 92 },
          { format: 'Stories', conversion: 2.8, volume: 32, efficiency: 78 },
          { format: 'Posts', conversion: 3.1, volume: 28, efficiency: 85 },
          { format: 'Videos', conversion: 5.1, volume: 18, efficiency: 88 }
        ],
        campaignStats: [
          { name: 'Summer Leadership Series', status: 'Active', viviGrade: 'A+', conversion: 5.2, spend: 2800 },
          { name: 'Q4 Speaking Tour', status: 'Paused', viviGrade: 'B+', conversion: 3.8, spend: 1950 },
          { name: 'Corporate Workshop Promo', status: 'Active', viviGrade: 'A', conversion: 4.6, spend: 3200 },
          { name: 'Leadership Webinar Series', status: 'Completed', viviGrade: 'A-', conversion: 4.1, spend: 2100 }
        ],
        geoStats: [
          { region: 'Bay Area', zip: '94102', performance: 8.2, leads: 34 },
          { region: 'Austin', zip: '78701', performance: 7.8, leads: 28 },
          { region: 'NYC', zip: '10001', performance: 7.1, leads: 42 },
          { region: 'Seattle', zip: '98101', performance: 6.9, leads: 31 }
        ],
        leadStats: {
          total: Math.floor(142 * baseMultiplier),
          qualified: Math.floor(89 * baseMultiplier),
          converted: Math.floor(34 * baseMultiplier),
          pipeline: [
            { stage: 'New Leads', count: 45, percentage: 32 },
            { stage: 'Qualified', count: 38, percentage: 27 },
            { stage: 'Proposal', count: 25, percentage: 18 },
            { stage: 'Negotiation', count: 20, percentage: 14 },
            { stage: 'Closed Won', count: 14, percentage: 9 }
          ]
        },
        viviImpact: {
          decisionsCount: Math.floor(127 * baseMultiplier),
          revenueImpact: Math.floor(18420 * baseMultiplier),
          timesSaved: Math.floor(23 * baseMultiplier),
          optimizations: [
            { type: 'Budget Allocation', improvement: '+23% ROI', value: 4200 },
            { type: 'Content Timing', improvement: '+18% Engagement', value: 2800 },
            { type: 'Audience Targeting', improvement: '+31% CTR', value: 3600 }
          ]
        },
        recommendations: [
          {
            type: 'opportunity',
            priority: 'high',
            title: 'Expand TikTok Investment',
            description: 'TikTok showing 34% growth - highest engagement rate potential',
            action: 'Increase budget allocation by 25%',
            potential: '+$8.2K revenue'
          },
          {
            type: 'optimization',
            priority: 'medium', 
            title: 'LinkedIn Content Strategy',
            description: 'B2B audience showing strong conversion on thought leadership content',
            action: 'Launch executive content series',
            potential: '+$5.8K revenue'
          },
          {
            type: 'alert',
            priority: 'high',
            title: 'Facebook Performance Decline',
            description: 'Engagement down 12% - audience fatigue detected',
            action: 'Refresh creative assets and messaging',
            potential: 'Prevent $3.2K loss'
          }
        ]
      };
    };

    setData(generateMockData());
  }, [filters]);

  return data;
};