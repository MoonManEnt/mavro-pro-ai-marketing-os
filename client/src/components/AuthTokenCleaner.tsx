import React, { useEffect } from 'react';

export const AuthTokenCleaner: React.FC = () => {
  useEffect(() => {
    const cleanup = () => {
      const token = localStorage.getItem('authToken');
      
      // Check if token exists and is malformed or if there have been recent auth failures
      if (token && (!token.startsWith('eyJ') || token.split('.').length !== 3)) {
        console.log('🧹 Clearing malformed authentication token');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.setItem('tokenCleared', Date.now().toString());
        window.location.reload();
        return;
      }
      
      // Check for repeated auth failures
      const failureCount = parseInt(localStorage.getItem('authFailures') || '0');
      if (failureCount >= 3) {
        console.log('🧹 Clearing failed authentication after repeated failures');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('authFailures');
        localStorage.setItem('tokenCleared', Date.now().toString());
        window.location.reload();
        return;
      }
    };
    
    cleanup();
  }, []);

  return null; // This component doesn't render anything
};

export default AuthTokenCleaner;