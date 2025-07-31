import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Rocket, Plus, TrendingUp, Target, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

import campaignsData from '../data/campaigns.json';

const CampaignOverview: React.FC = () => {
  const { currentPersona } = useApp();

  const personaCampaigns = campaignsData.campaigns.filter(
    (campaign) => campaign.persona === currentPersona
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'mint-green';
      case 'optimizing':
        return 'golden-yellow';
      case 'paused':
        return 'medium-gray';
      default:
        return 'sky-blue';
    }
  };

  const getStatusDot = (status: string) => {
    const color = getStatusColor(status);
    return `w-3 h-3 bg-${color} rounded-full`;
  };

  const getBoostColor = (boostLevel: number) => {
    switch (boostLevel) {
      case 1:
        return 'mint-green';
      case 2:
        return 'sky-blue';
      case 3:
        return 'sunset-orange';
      default:
        return 'mint-green';
    }
  };

  return (
    <Card className="campaign-overview glass-card border-white/20 bg-white/10 draggable-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white font-bold text-xl flex items-center">
            <Rocket className="w-6 h-6 text-sunset-orange mr-3" />
            Active Campaigns
          </CardTitle>
          <Button className="bg-sunset-orange hover:bg-sunset-orange/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {personaCampaigns.length === 0 ? (
          <div className="text-center py-8">
            <Rocket className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No campaigns found for this persona</p>
          </div>
        ) : (
          personaCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={getStatusDot(campaign.status)} />
                  <span className="text-white font-medium">{campaign.name}</span>
                  <Badge
                    variant="outline"
                    className={`text-${getStatusColor(campaign.status)} border-${getStatusColor(campaign.status)}/30 bg-${getStatusColor(campaign.status)}/10 text-xs`}
                  >
                    {campaign.status}
                  </Badge>
                </div>
                <div className={`boost-indicator text-white text-xs px-2 py-1 rounded-full bg-${getBoostColor(campaign.boostLevel)}/20 border border-${getBoostColor(campaign.boostLevel)}/30`}>
                  {campaign.boostLevel}x Boost
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-sky-blue" />
                  <div>
                    <p className="text-white/60">CTR</p>
                    <p className="text-white font-semibold">{campaign.ctr}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-mint-green" />
                  <div>
                    <p className="text-white/60">Conversions</p>
                    <p className="text-white font-semibold">{campaign.conversions}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-golden-yellow" />
                  <div>
                    <p className="text-white/60">ROI</p>
                    <p className="text-white font-semibold">{campaign.roi}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <span className="text-white/60">Platform: {campaign.platform}</span>
                <span className="text-white/60">Budget: ${campaign.budget.toLocaleString()}</span>
              </div>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignOverview;
