import React from 'react';
import { motion } from 'framer-motion';
import trendData from '../data/trendData.json';

const TrendTicker: React.FC = () => {
  const trends = trendData.trends;

  return (
    <div className="trend-ticker bg-black/20 text-white py-2 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap space-x-8"
        animate={{
          x: ['100%', '-100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {trends.map((trend, index) => (
          <span key={`${trend.id}-${index}`} className="inline-flex items-center space-x-2 text-sm">
            <i className={`${trend.icon} text-${trend.color}`} />
            <span>{trend.title}</span>
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {trends.map((trend, index) => (
          <span key={`${trend.id}-dup-${index}`} className="inline-flex items-center space-x-2 text-sm">
            <i className={`${trend.icon} text-${trend.color}`} />
            <span>{trend.title}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default TrendTicker;
