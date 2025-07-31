import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './settingsContext';
import { ThemeWrapper } from './ThemeProvider';
import { SettingsPage } from './SettingsPage_Dynamic';
import { ViViNotificationPanel } from './ViViNotificationPanel';
import { simulateMockAlerts } from './SimulateNotifications';

const App = () => {
  useEffect(() => {
    simulateMockAlerts(); // Simulate alerts on app load
  }, []);

  return (
    <SettingsProvider>
      <ThemeWrapper>
        <Router>
          <Routes>
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
          <ViViNotificationPanel />
        </Router>
      </ThemeWrapper>
    </SettingsProvider>
  );
};

export default App;
