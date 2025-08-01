import React from 'react';
import { Router, Route, Switch, Redirect } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ViViProvider } from './contexts/ViViContext';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { FloatingViVi } from './components/FloatingViVi';
import { NotificationCenter } from './components/NotificationCenter';
import { LoadingTransition } from './components/LoadingTransition';
import { Toaster } from './components/ui/toaster';
import './App.css';

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingTransition />;
  }
  
  return user ? <>{children}</> : <Redirect to="/auth" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingTransition />;
  }
  
  return user ? <Redirect to="/dashboard" /> : <>{children}</>;
};

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
        <Switch>
          <Route path="/auth">
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          </Route>
          
          <Route path="/dashboard">
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Route>
          
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
        
        {user && (
          <>
            <FloatingViVi />
            <div className="fixed top-4 right-4 z-40">
              <NotificationCenter />
            </div>
          </>
        )}
        
        <Toaster />
      </div>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SettingsProvider>
          <AuthProvider>
            <ViViProvider>
              <AppRoutes />
            </ViViProvider>
          </AuthProvider>
        </SettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
