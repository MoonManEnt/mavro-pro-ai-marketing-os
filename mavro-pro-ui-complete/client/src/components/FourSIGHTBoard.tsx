import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Eye, TrendingUp, TrendingDown, DollarSign, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

import analyticsData from '../data/analytics.json';

const FourSIGHTBoard: React.FC = () => {
  const { currentPersona } = useApp();

  const personaAnalytics = analyticsData.analytics.filter(
    (item) => item.persona === currentPersona
  );

  const getIcon = (metric: string) => {
    const metricLower = metric.toLowerCase();
    if (metricLower.includes('revenue')) return DollarSign;
    if (metricLower.includes('leads')) return Users;
    if (metricLower.includes('conversion')) return Target;
    return TrendingUp;
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-mint-green';
    if (change.startsWith('-')) return 'text-sunset-orange';
    return 'text-golden-yellow';
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) return TrendingUp;
    if (change.startsWith('-')) return TrendingDown;
    return TrendingUp;
  };

  return (
    <Card className="foursight-board glass-card border-white/20 bg-white/10">
      <CardHeader>
        <CardTitle className="text-white font-semibold flex items-center">
          <Eye className="w-5 h-5 text-sky-blue mr-2" />
          FourSIGHT Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {personaAnalytics.map((analytics, index) => {
          const Icon = getIcon(analytics.metric);
          const ChangeIcon = getChangeIcon(analytics.change);
          const changeColor = getChangeColor(analytics.change);

          return (
            <motion.div
              key={analytics.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-sky-blue" />
                  <span className="text-white/80 text-sm">{analytics.metric}</span>
                </div>
                <div className={`flex items-center space-x-1 ${changeColor}`}>
                  <ChangeIcon className="w-3 h-3" />
                  <span className="text-sm">{analytics.change}</span>
                </div>
              </div>
              <div className="text-white font-bold text-xl">{analytics.value}</div>
            </motion.div>
          );
        })}

        {personaAnalytics.length === 0 && (
          <div className="text-center py-8">
            <Eye className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No analytics data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FourSIGHTBoard;
