import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData: {
    email: string;
    username: string;
    password: string;
    business_name?: string;
    industry?: string;
    geo_region?: string;
    geo_country?: string;
  }) => api.post('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  getCurrentUser: () => api.get('/auth/me'),
};

export const agentAPI = {
  runAnalysis: (context: {
    persona: { id: string; name: string; industry: string };
    geo: { country?: string; region?: string };
    metrics: { engagement: number; previous_engagement?: number };
  }) => api.post('/agent/analyze', context),
  
  getHistory: (limit = 50) => api.get(`/agent/history?limit=${limit}`),
  
  getContext: () => api.get('/agent/context'),
};

export const analyticsAPI = {
  track: (event: { event_type: string; event_data: Record<string, any> }) =>
    api.post('/analytics/track', event),
  
  getDashboard: () => api.get('/analytics/dashboard'),
};

export const userAPI = {
  updateProfile: (profileData: Record<string, any>) =>
    api.put('/user/profile', profileData),
};
