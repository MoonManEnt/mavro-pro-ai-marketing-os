import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import TopNavigation from '../components/TopNavigation';
import TrendTicker from '../components/TrendTicker';
import ViViAssistant from '../components/ViViAssistant';
import QuickActions from '../components/QuickActions';
import CampaignOverview from '../components/CampaignOverview';
import MavroMagicComposer from '../components/MavroMagicComposer';
import FourSIGHTBoard from '../components/FourSIGHTBoard';
import BoostSummaryPanel from '../components/BoostSummaryPanel';
import SchedulerWidget from '../components/SchedulerWidget';
import FloatingViVi from '../components/FloatingViVi';
import ContentWizard from '../components/ContentWizard';
import ViViVoice from '../components/ViViVoice';

import campaignsData from '../data/campaigns.json';

const Dashboard: React.FC = () => {
  const { currentPersona, activeTab } = useApp();

  const personaCampaigns = campaignsData.campaigns.filter(
    (campaign) => campaign.persona === currentPersona
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'plan':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              <ViViAssistant />
              <ViViVoice />
              <QuickActions />
            </div>
            
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6">
              <ContentWizard />
              <CampaignOverview />
              <MavroMagicComposer />
            </div>
            
            {/* Right Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              <FourSIGHTBoard />
              <BoostSummaryPanel campaigns={personaCampaigns} />
              <SchedulerWidget />
            </div>
          </div>
        );
      
      case 'track':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <FourSIGHTBoard />
              <CampaignOverview />
            </div>
            <div className="xl:col-span-1 space-y-6">
              <ViViAssistant />
              <BoostSummaryPanel campaigns={personaCampaigns} />
            </div>
          </div>
        );
      
      case 'grow':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <BoostSummaryPanel campaigns={personaCampaigns} />
              <MavroMagicComposer />
            </div>
            <div className="xl:col-span-1 space-y-6">
              <ViViAssistant />
              <FourSIGHTBoard />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-sierra-sunset">
      <TopNavigation />
      <TrendTicker />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {renderTabContent()}
      </motion.div>
      
      <FloatingViVi />
    </div>
  );
};

export default Dashboard;
