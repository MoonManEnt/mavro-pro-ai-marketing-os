import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  
  viviVoiceEnabled: boolean;
  setViviVoiceEnabled: (enabled: boolean) => void;
  
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  
  highContrast: boolean;
  setHighContrast: (highContrast: boolean) => void;
  
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });
  
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    return localStorage.getItem('animationsEnabled') !== 'false';
  });
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('notificationsEnabled') !== 'false';
  });
  
  const [viviVoiceEnabled, setViviVoiceEnabled] = useState(() => {
    return localStorage.getItem('viviVoiceEnabled') === 'true';
  });
  
  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('reducedMotion') === 'true' || 
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('highContrast') === 'true';
  });
  
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>(() => {
    return (localStorage.getItem('fontSize') as 'small' | 'medium' | 'large') || 'medium';
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  useEffect(() => {
    localStorage.setItem('animationsEnabled', animationsEnabled.toString());
  }, [animationsEnabled]);

  useEffect(() => {
    localStorage.setItem('notificationsEnabled', notificationsEnabled.toString());
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('viviVoiceEnabled', viviVoiceEnabled.toString());
  }, [viviVoiceEnabled]);

  useEffect(() => {
    localStorage.setItem('reducedMotion', reducedMotion.toString());
    document.documentElement.classList.toggle('reduce-motion', reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('highContrast', highContrast.toString());
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    document.documentElement.classList.remove('font-small', 'font-medium', 'font-large');
    document.documentElement.classList.add(`font-${fontSize}`);
  }, [fontSize]);

  return (
    <SettingsContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        animationsEnabled,
        setAnimationsEnabled,
        notificationsEnabled,
        setNotificationsEnabled,
        viviVoiceEnabled,
        setViviVoiceEnabled,
        reducedMotion,
        setReducedMotion,
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
