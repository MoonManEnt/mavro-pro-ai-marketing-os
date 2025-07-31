import React from 'react';
import { OverviewMetricsCard } from './OverviewMetricsCard';
import { PlatformPerformanceCard } from './PlatformPerformanceCard';

export const ReportsPage = () => {
  return (
    <div className="p-4 grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <OverviewMetricsCard />
      </div>
      <div className="col-span-12">
        <PlatformPerformanceCard />
      </div>
      {/* Additional cards to follow */}
    </div>
  );
};
