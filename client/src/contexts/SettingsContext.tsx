import React, { createContext, useContext, useState, ReactNode } from 'react';

// Default feature toggles
const defaultToggles = {
  viviVoiceEnabled: true,
  autoSaveEnabled: true,
  notificationsEnabled: true,
  darkModeEnabled: false,
  advancedAnalytics: true,
  realTimeSync: true,
  aiSuggestions: true,
  performanceMonitoring: true
};

// Default theme settings
const defaultTheme = {
  selectedTheme: 'executive',
  colorScheme: 'light',
  compactMode: false,
  animationsEnabled: true,
  sidebarCollapsed: false
};

interface SettingsContextType {
  features: any;
  setFeatures: (features: any) => void;
  updateFeature: (key: string, value: any) => void;
  themeChoice: string;
  setThemeChoice: (theme: string) => void;
  theme: any;
  setTheme: (theme: any) => void;
  updateTheme: (key: string, value: any) => void;
  resetToDefaults: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [features, setFeatures] = useState(defaultToggles);
  const [themeChoice, setThemeChoice] = useState(defaultTheme.selectedTheme);
  const [theme, setTheme] = useState(defaultTheme);

  const updateFeature = (key: string, value: any) => {
    setFeatures(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateTheme = (key: string, value: any) => {
    setTheme(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetToDefaults = () => {
    setFeatures(defaultToggles);
    setTheme(defaultTheme);
    setThemeChoice(defaultTheme.selectedTheme);
  };

  return (
    <SettingsContext.Provider value={{ 
      features, 
      setFeatures, 
      updateFeature,
      themeChoice, 
      setThemeChoice,
      theme,
      setTheme,
      updateTheme,
      resetToDefaults
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};