import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { User } from '@shared/schema';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Check if user is in demo mode
  const isDemoMode = localStorage.getItem('demoMode') === 'true';

  // Fetch current user
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['/api/auth/user'],
    enabled: !isDemoMode && !!localStorage.getItem('authToken'),
    retry: false,
  });

  // Initialize auth state immediately from localStorage
  useEffect(() => {
    console.log('🔐 AuthProvider initializing...', { isDemoMode, userLoading });
    
    // Check for invalid tokens and clear them immediately
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Check if token is properly formatted JWT
      const tokenParts = storedToken.split('.');
      if (tokenParts.length !== 3 || !storedToken.startsWith('eyJ')) {
        console.log('🧹 Clearing invalid token format');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsLoading(false);
        return;
      }
    }
    
    if (isDemoMode) {
      const demoUser = localStorage.getItem('user');
      if (demoUser) {
        console.log('🔐 Setting demo user from localStorage');
        setUser(JSON.parse(demoUser));
      }
      setIsLoading(false);
    } else {
      // Immediately check localStorage for user data
      const storedUser = localStorage.getItem('user');
      
      if (storedUser && storedToken) {
        console.log('🔐 Setting authenticated user from localStorage');
        setUser(JSON.parse(storedUser));
        setIsLoading(false);
      } else if (!userLoading) {
        console.log('🔐 Setting user from API response');
        setUser(userData as User || null);
        setIsLoading(false);
      }
    }
  }, [isDemoMode, userData, userLoading]);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await apiRequest('POST', '/api/auth/login', { email, password });
      return await response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.tokens.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.removeItem('demoMode');
      setUser(data.user);
      queryClient.invalidateQueries();
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiRequest('POST', '/api/auth/register', userData);
      return await response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.tokens.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.removeItem('demoMode');
      setUser(data.user);
      queryClient.invalidateQueries();
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (userData: any) => {
    await registerMutation.mutateAsync(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('demoMode');
    setUser(null);
    queryClient.clear();
    // Redirect to auth page
    window.location.href = '/auth';
  };

  const refreshUser = async () => {
    if (!isDemoMode && localStorage.getItem('authToken')) {
      try {
        console.log('🔄 Refreshing user data...');
        const token = localStorage.getItem('authToken');
        console.log('🔑 Token exists:', !!token, token?.substring(0, 20) + '...');
        
        await queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
        const response = await apiRequest('GET', '/api/auth/user');
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('✅ User data refreshed successfully', userData);
      } catch (error) {
        console.error('❌ Failed to refresh user data:', error);
        // If refresh fails due to invalid token, clear auth data and redirect to login
        if (error.message?.includes('403') || error.message?.includes('401')) {
          console.log('🚪 Invalid token detected, clearing auth data and redirecting to auth');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          localStorage.removeItem('demoMode');
          setUser(null);
          // Redirect to auth page for re-authentication
          window.location.href = '/auth';
        }
      }
    }
  };

  const isAuthenticated = !!user || (!!localStorage.getItem('authToken') && !!localStorage.getItem('user'));
  
  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    isDemoMode,
    login,
    register,
    logout,
    refreshUser,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}