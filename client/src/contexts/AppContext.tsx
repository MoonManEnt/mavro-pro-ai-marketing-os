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
  
  // Determine mode based on authentication status and explicit demo mode
  const isDemoMode = localStorage.getItem('demoMode') === 'true';
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  // Set mode: 'demo' for explicit demo users, 'live' for authenticated beta users
  // Force override localStorage if authentication status changes
  const calculateMode = () => {
    if (isDemoMode) return 'demo';
    if (isAuthenticated) return 'live';
    return 'demo';
  };
  
  const [currentMode, setCurrentMode] = useState<'demo' | 'live' | 'hybrid'>(() => {
    // Check localStorage first, but override based on auth status
    const savedMode = localStorage.getItem('mavro-mode') as 'demo' | 'live' | 'hybrid';
    return calculateMode();
  });
  
  const [activeTab, setActiveTab] = useLocalStorage<'plan' | 'track' | 'grow'>('mavro-active-tab', 'plan');
  const [showTour, setShowTour] = useLocalStorage<boolean>('mavro-show-tour', true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Force update mode based on current authentication status
    const correctMode = calculateMode();
    if (currentMode !== correctMode) {
      console.log(`🔄 Updating mode from ${currentMode} to ${correctMode}`, { isDemoMode, isAuthenticated });
      setCurrentMode(correctMode);
      localStorage.setItem('mavro-mode', correctMode);
    }
    
    // Auto-login for demo mode only
    if (!user && isDemoMode && currentMode === 'demo') {
      console.log('🎭 Creating demo user');
      setUser({
        id: 1,
        username: currentPersona,
        email: `${currentPersona}@demo.com`,
        persona: currentPersona,
        mode: 'demo'
      });
    }
  }, [user, currentPersona, currentMode, setUser, isDemoMode, isAuthenticated]);

  // Save mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mavro-mode', currentMode);
  }, [currentMode]);

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
