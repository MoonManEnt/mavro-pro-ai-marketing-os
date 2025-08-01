import React, { createContext, useContext, useState, useEffect } from 'react';
import { agentAPI } from '../lib/api';
import { useAuth } from './AuthContext';

interface ViViState {
  isActive: boolean;
  isAnalyzing: boolean;
  lastAnalysis: any;
  context: any;
  history: any[];
}

interface ViViContextType {
  state: ViViState;
  runAnalysis: (context: any) => Promise<void>;
  getHistory: () => Promise<void>;
  setActive: (active: boolean) => void;
}

const ViViContext = createContext<ViViContextType | undefined>(undefined);

export const ViViProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, setState] = useState<ViViState>({
    isActive: false,
    isAnalyzing: false,
    lastAnalysis: null,
    context: null,
    history: []
  });

  const runAnalysis = async (context: any) => {
    setState(prev => ({ ...prev, isAnalyzing: true }));
    
    try {
      const response = await agentAPI.runAnalysis(context);
      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        lastAnalysis: response.data,
        context
      }));
      await getHistory();
    } catch (error) {
      setState(prev => ({ ...prev, isAnalyzing: false }));
      throw error;
    }
  };

  const getHistory = async () => {
    try {
      const response = await agentAPI.getHistory();
      setState(prev => ({ ...prev, history: response.data }));
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const setActive = (active: boolean) => {
    setState(prev => ({ ...prev, isActive: active }));
  };

  useEffect(() => {
    if (user) {
      getHistory();
    }
  }, [user]);

  return (
    <ViViContext.Provider value={{ state, runAnalysis, getHistory, setActive }}>
      {children}
    </ViViContext.Provider>
  );
};

function useViVi() {
  const context = useContext(ViViContext);
  if (context === undefined) {
    throw new Error('useViVi must be used within a ViViProvider');
  }
  return context;
}

export { useViVi };
