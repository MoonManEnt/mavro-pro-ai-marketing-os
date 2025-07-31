import React, { useState } from 'react';
import { SettingsSidebarNav } from './SettingsSidebarNav';
import { AccountSettingsCard } from './AccountSettingsCard';
import { FeatureTogglesCard } from './FeatureTogglesCard_Connected';
import { AppearanceSettingsCard } from './AppearanceSettingsCard_Connected';
import { IntegrationsCard } from './IntegrationsCard';
import { BillingSettingsCard } from './BillingSettingsCard';
import { ExportDataCard } from './ExportDataCard';
import { GuidedDemoCard } from './GuidedDemoCard';

export const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('Account');

  const renderSection = () => {
    switch (activeSection) {
      case 'Account': return <AccountSettingsCard />;
      case 'Features': return <FeatureTogglesCard />;
      case 'Appearance': return <AppearanceSettingsCard />;
      case 'Integrations': return <IntegrationsCard />;
      case 'Billing': return <BillingSettingsCard />;
      case 'Export': return <ExportDataCard />;
      case 'Demo': return <GuidedDemoCard />;
      default: return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <div className="md:w-1/4">
        <SettingsSidebarNav active={activeSection} setActive={setActiveSection} />
      </div>
      <div className="md:w-3/4">
        {renderSection()}
      </div>
    </div>
  );
};
