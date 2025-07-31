import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export default function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isDemoMode } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated && !isDemoMode) {
      console.log('ProtectedRoute: Redirecting to auth - user not authenticated');
      setLocation('/auth');
    }
  }, [isAuthenticated, isLoading, requireAuth, isDemoMode, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
          <p className="text-white">Loading Mavro Pro...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated && !isDemoMode) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}