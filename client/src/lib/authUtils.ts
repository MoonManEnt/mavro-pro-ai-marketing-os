// Authentication utility functions
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const user = localStorage.getItem('user');
  const demoMode = localStorage.getItem('demoMode') === 'true';
  
  return !!(token && user) || demoMode;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const isDemoMode = (): boolean => {
  return localStorage.getItem('demoMode') === 'true';
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  localStorage.removeItem('demoMode');
  window.location.href = '/auth';
};

export const redirectToAuth = () => {
  window.location.href = '/auth';
};

// Check if error is due to authentication issues
export function isUnauthorizedError(error: Error): boolean {
  return /^401: .*Unauthorized/.test(error.message);
}