import { useState, useEffect } from 'react';
// In real usage, import data from relevant JSONs
import scheduledPosts from './data/scheduledPosts.json';
import campaigns from './data/campaigns.json';
import leads from './data/leads.json';

export const useReportData = () => {
  const [data, setData] = useState({
    reach: 0,
    leads: 0,
    campaigns: 0,
    platformStats: []
  });

  useEffect(() => {
    const reach = scheduledPosts.reduce((sum, post) => sum + (post.reach || 0), 0);
    const leadsCount = leads.length;
    const campaignCount = campaigns.length;
    const platformStats = ['Instagram', 'TikTok', 'Facebook'].map(p => ({
      platform: p,
      reach: scheduledPosts
        .filter(post => post.platform === p)
        .reduce((sum, post) => sum + (post.reach || 0), 0)
    }));

    setData({ reach, leads: leadsCount, campaigns: campaignCount, platformStats });
  }, []);

  return data;
};
