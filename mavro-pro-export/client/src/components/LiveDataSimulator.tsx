import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Eye, Heart, MessageCircle, Share2, DollarSign } from 'lucide-react';

interface LiveDataSimulatorProps {
  currentPersona: string;
  isActive: boolean;
}

interface MetricUpdate {
  id: string;
  type: 'engagement' | 'followers' | 'views' | 'revenue' | 'leads';
  value: number;
  change: number;
  timestamp: Date;
}

interface SimulatedNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'trend' | 'milestone';
  timestamp: Date;
  persona: string;
}

export default function LiveDataSimulator({ currentPersona, isActive }: LiveDataSimulatorProps) {
  const [metrics, setMetrics] = useState<Record<string, number>>({
    engagement: 0,
    followers: 0,
    views: 0,
    revenue: 0,
    leads: 0
  });
  const [recentUpdates, setRecentUpdates] = useState<MetricUpdate[]>([]);
  const [notifications, setNotifications] = useState<SimulatedNotification[]>([]);

  // Base metrics for each persona
  const getBaseMetrics = (persona: string) => {
    const baseData = {
      kemar: { engagement: 4567, followers: 12400, views: 45600, revenue: 28500, leads: 234 },
      karen: { engagement: 3241, followers: 8900, views: 34200, revenue: 156000, leads: 89 },
      sarah: { engagement: 5678, followers: 15600, views: 67800, revenue: 89000, leads: 456 },
      marco: { engagement: 2345, followers: 6700, views: 23400, revenue: 34500, leads: 178 },
      alex: { engagement: 6789, followers: 18900, views: 78900, revenue: 67000, leads: 567 },
      david: { engagement: 3456, followers: 9800, views: 45600, revenue: 234000, leads: 123 }
    };
    return baseData[persona as keyof typeof baseData] || baseData.kemar;
  };

  // Initialize metrics
  useEffect(() => {
    const baseMetrics = getBaseMetrics(currentPersona);
    setMetrics(baseMetrics);
  }, [currentPersona]);

  // Simulate real-time updates
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const metricTypes = ['engagement', 'followers', 'views', 'revenue', 'leads'];
      const randomMetric = metricTypes[Math.floor(Math.random() * metricTypes.length)];
      
      // Generate realistic incremental changes
      const changeAmount = getRealisticChange(randomMetric, currentPersona);
      
      setMetrics(prev => ({
        ...prev,
        [randomMetric]: prev[randomMetric] + changeAmount
      }));

      // Add to recent updates
      const update: MetricUpdate = {
        id: Date.now().toString(),
        type: randomMetric as any,
        value: metrics[randomMetric] + changeAmount,
        change: changeAmount,
        timestamp: new Date()
      };

      setRecentUpdates(prev => [update, ...prev.slice(0, 4)]);

      // Occasionally generate notifications
      if (Math.random() < 0.3) {
        generateNotification(randomMetric, changeAmount);
      }
    }, 5000 + Math.random() * 10000); // Random interval between 5-15 seconds

    return () => clearInterval(interval);
  }, [isActive, currentPersona, metrics]);

  const getRealisticChange = (metric: string, persona: string): number => {
    const ranges = {
      engagement: { min: 1, max: 25 },
      followers: { min: 1, max: 15 },
      views: { min: 10, max: 100 },
      revenue: { min: 50, max: 500 },
      leads: { min: 1, max: 8 }
    };

    const range = ranges[metric as keyof typeof ranges];
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  };

  const generateNotification = (metric: string, change: number) => {
    const notificationTemplates = {
      kemar: {
        engagement: [`New speaking inquiry from ${change > 15 ? 'Fortune 500' : 'tech'} company!`, 'Your leadership content is resonating with executives'],
        followers: [`${change} new LinkedIn connections from industry leaders`, 'C-suite executives are following your insights'],
        views: [`Your keynote preview video gained ${change * 10} views`, 'Speaking demo reaching new audiences'],
        revenue: [`New corporate training contract worth $${change * 100}`, 'Speaking fee inquiry for upcoming conference'],
        leads: [`${change} new speaking opportunities this hour`, 'Event planners are discovering your expertise']
      },
      karen: {
        engagement: [`${change} new home listing inquiries`, 'Luxury buyers are engaging with your properties'],
        followers: [`${change} new followers in your target market`, 'High-net-worth clients following your listings'],
        views: [`Virtual tour viewed ${change * 20} times`, 'Property video gaining traction'],
        revenue: [`New listing potential: $${change * 1000}`, 'Buyer inquiry for premium property'],
        leads: [`${change} qualified buyer leads`, 'Seller consultation requests coming in']
      },
      sarah: {
        engagement: [`${change} new treatment inquiries`, 'Anti-aging content driving bookings'],
        followers: [`${change} new followers interested in wellness`, 'Beauty enthusiasts discovering your expertise'],
        views: [`Treatment video viewed ${change * 15} times`, 'Before/after content going viral'],
        revenue: [`${change} new consultation bookings`, 'Premium treatment packages in demand'],
        leads: [`${change} qualified consultation requests`, 'Skincare clients seeking appointments']
      },
      marco: {
        engagement: [`${change} new reservation inquiries`, 'Food lovers engaging with your content'],
        followers: [`${change} new followers discovering your cuisine`, 'Food bloggers following your restaurant'],
        views: [`Recipe video viewed ${change * 25} times`, 'Cooking demonstration gaining popularity'],
        revenue: [`${change} new delivery orders`, 'Catering inquiry for special event'],
        leads: [`${change} potential catering clients`, 'Event planners requesting quotes']
      },
      alex: {
        engagement: [`${change} new training inquiries`, 'Fitness content motivating new clients'],
        followers: [`${change} new fitness enthusiasts following`, 'Transformation results inspiring others'],
        views: [`Workout video viewed ${change * 30} times`, 'Training tips reaching new audience'],
        revenue: [`${change} new personal training sessions`, 'Nutrition coaching packages in demand'],
        leads: [`${change} qualified fitness leads`, 'Transformation challenge sign-ups']
      },
      david: {
        engagement: [`${change} new vehicle inquiries`, 'Car buyers engaging with your inventory'],
        followers: [`${change} new followers in your market`, 'Auto enthusiasts following your dealership'],
        views: [`Vehicle showcase viewed ${change * 10} times`, 'Test drive video gaining interest'],
        revenue: [`Potential sale worth $${change * 500}`, 'Trade-in inquiry for premium vehicle'],
        leads: [`${change} qualified buyer leads`, 'Financing pre-approval requests']
      }
    };

    const personaTemplates = notificationTemplates[currentPersona as keyof typeof notificationTemplates];
    const metricTemplates = personaTemplates[metric as keyof typeof personaTemplates];
    
    if (metricTemplates) {
      const template = metricTemplates[Math.floor(Math.random() * metricTemplates.length)];
      
      const notification: SimulatedNotification = {
        id: Date.now().toString(),
        title: getNotificationTitle(metric, change),
        message: template,
        type: change > 10 ? 'milestone' : Math.random() < 0.5 ? 'success' : 'info',
        timestamp: new Date(),
        persona: currentPersona
      };

      setNotifications(prev => [notification, ...prev.slice(0, 9)]);
    }
  };

  const getNotificationTitle = (metric: string, change: number): string => {
    const titles = {
      engagement: change > 15 ? 'High Engagement Alert!' : 'New Engagement',
      followers: change > 10 ? 'Follower Milestone!' : 'New Followers',
      views: change > 50 ? 'Viral Content!' : 'Increased Views',
      revenue: change > 300 ? 'Big Sale Alert!' : 'Revenue Update',
      leads: change > 5 ? 'Lead Generation Boost!' : 'New Leads'
    };
    return titles[metric as keyof typeof titles] || 'Update';
  };

  const formatMetric = (value: number, type: string): string => {
    if (type === 'revenue') {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  const getMetricIcon = (type: string) => {
    const icons = {
      engagement: Heart,
      followers: Users,
      views: Eye,
      revenue: DollarSign,
      leads: MessageCircle
    };
    return icons[type as keyof typeof icons] || TrendingUp;
  };

  // Expose metrics and notifications for parent components
  useEffect(() => {
    // Dispatch custom event with current data
    window.dispatchEvent(new CustomEvent('liveDataUpdate', {
      detail: { metrics, notifications: notifications.slice(0, 5) }
    }));
  }, [metrics, notifications]);

  return null; // This component doesn't render UI, it just provides data
}