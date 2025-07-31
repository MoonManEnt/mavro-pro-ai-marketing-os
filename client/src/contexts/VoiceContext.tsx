import React, { createContext, useContext, useState, useEffect } from 'react';

interface VoiceContextType {
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
  toggle: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggle = () => {
    setIsEnabled(!isEnabled);
  };

  const value = {
    isEnabled,
    setIsEnabled,
    toggle,
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}