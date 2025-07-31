import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface User {
  id: number;
  username: string;
  email: string;
  persona: string;
  mode: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentPersona: string;
  setCurrentPersona: (persona: string) => void;
  currentMode: 'demo' | 'live' | 'hybrid';
  setCurrentMode: (mode: 'demo' | 'live' | 'hybrid') => void;
  activeTab: 'plan' | 'track' | 'grow';
  setActiveTab: (tab: 'plan' | 'track' | 'grow') => void;
  showTour: boolean;
  setShowTour: (show: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('mavro-user', null);
  const [currentPersona, setCurrentPersona] = useLocalStorage<string>('mavro-persona', 'sarah');
  const [currentMode, setCurrentMode] = useLocalStorage<'demo' | 'live' | 'hybrid'>('mavro-mode', 'demo');
  const [activeTab, setActiveTab] = useLocalStorage<'plan' | 'track' | 'grow'>('mavro-active-tab', 'plan');
  const [showTour, setShowTour] = useLocalStorage<boolean>('mavro-show-tour', true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Auto-login for demo mode
    if (!user && currentMode === 'demo') {
      setUser({
        id: 1,
        username: currentPersona,
        email: `${currentPersona}@demo.com`,
        persona: currentPersona,
        mode: 'demo'
      });
    }
  }, [user, currentPersona, currentMode, setUser]);

  const value: AppContextType = {
    user,
    setUser,
    currentPersona,
    setCurrentPersona,
    currentMode,
    setCurrentMode,
    activeTab,
    setActiveTab,
    showTour,
    setShowTour,
    isLoading,
    setIsLoading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
