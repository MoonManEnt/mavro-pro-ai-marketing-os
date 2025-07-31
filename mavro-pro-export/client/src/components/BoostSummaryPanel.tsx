import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Rocket, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface BoostSummaryPanelProps {
  campaigns?: Array<{
    id: string;
    boostLevel: number;
    roi: string;
  }>;
}

const BoostSummaryPanel: React.FC<BoostSummaryPanelProps> = ({ campaigns = [] }) => {
  // Calculate boost summary
  const boostSummary = campaigns.reduce((acc, campaign) => {
    const level = campaign.boostLevel;
    if (!acc[level]) {
      acc[level] = 0;
    }
    acc[level]++;
    return acc;
  }, {} as Record<number, number>);

  const totalImpact = campaigns.reduce((total, campaign) => {
    const roi = parseFloat(campaign.roi.replace('%', ''));
    return total + roi;
  }, 0);

  const averageImpact = campaigns.length > 0 ? (totalImpact / campaigns.length).toFixed(0) : 0;

  const boostColors = {
    1: 'mint-green',
    2: 'golden-yellow',
    3: 'sunset-orange'
  };

  return (
    <Card className="boost-summary glass-card border-white/20 bg-white/10">
      <CardHeader>
        <CardTitle className="text-white font-semibold flex items-center">
          <Rocket className="w-5 h-5 text-sunset-orange mr-2" />
          Boost Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[1, 2, 3].map((level) => (
          <motion.div
            key={level}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: level * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 bg-${boostColors[level as keyof typeof boostColors]} rounded-full`} />
              <span className="text-white text-sm">{level}x Boost</span>
            </div>
            <span className="text-white/60 text-sm">
              {boostSummary[level] || 0} campaign{(boostSummary[level] || 0) !== 1 ? 's' : ''}
            </span>
          </motion.div>
        ))}

        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Total Impact
            </span>
            <span className="text-mint-green font-bold">
              +{averageImpact}% ROI
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostSummaryPanel;
