import { createContext, useContext, useEffect, useState } from 'react';

export type ModeType = 'demo' | 'live';

interface ModeContextType {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  isDemo: boolean;
  isLive: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ModeType>('demo');

  const isDemo = mode === 'demo';
  const isLive = mode === 'live';

  // Load mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('mavro-mode') as ModeType;
    if (savedMode && ['demo', 'live'].includes(savedMode)) {
      setMode(savedMode);
    }
  }, []);

  // Save mode to localStorage when changed
  useEffect(() => {
    localStorage.setItem('mavro-mode', mode);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode, isDemo, isLive }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}