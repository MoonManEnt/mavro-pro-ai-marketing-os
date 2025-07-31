// ViVi AI Service - Frontend API Integration
import { apiRequest } from '@/lib/queryClient';

const API_BASE = '/api/vivi';

// Chat with ViVi AI
export interface ChatMessage {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  success: boolean;
  response: string;
  suggestions: string[];
}

export async function sendChatMessage(data: ChatMessage): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Failed to send chat message');
  }
  
  return response.json();
}

// Content Generation
export interface ContentGenerationRequest {
  prompt: string;
  platform: string;
  contentType?: string;
}

export interface ContentGenerationResponse {
  success: boolean;
  content: string;
  platform: string;
  contentType: string;
  suggestions: string[];
}

export async function generateContent(data: ContentGenerationRequest): Promise<ContentGenerationResponse> {
  const response = await fetch(`${API_BASE}/generate-content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate content');
  }
  
  return response.json();
}

// Social Media OAuth
export interface OAuthResponse {
  success: boolean;
  authUrl: string;
}

export async function initiateOAuth(platform: string): Promise<OAuthResponse> {
  const response = await fetch(`${API_BASE}/oauth/${platform}/authorize`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to initiate OAuth for ${platform}`);
  }
  
  return response.json();
}

// Schedule Content
export interface SchedulePostRequest {
  content: string;
  platforms: string[];
  publishAt: string;
}

export interface SchedulePostResponse {
  success: boolean;
  postId: number;
}

export async function schedulePost(data: SchedulePostRequest): Promise<SchedulePostResponse> {
  const response = await fetch(`${API_BASE}/schedule`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Failed to schedule post');
  }
  
  return response.json();
}

// Get Scheduled Posts
export interface ScheduledEvent {
  id: number;
  title: string;
  start: string;
  content: string;
  platforms: string[];
  status: string;
}

export interface ScheduleResponse {
  success: boolean;
  events: ScheduledEvent[];
}

export async function getScheduledPosts(): Promise<ScheduleResponse> {
  const response = await fetch(`${API_BASE}/schedule`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch scheduled posts');
  }
  
  return response.json();
}

// Analytics
export interface AnalyticsData {
  connectedPlatforms: string[];
  totalPosts: number;
  contentGenerated: number;
  chatInteractions: number;
  recentActivity: Array<{
    type: string;
    timestamp: string;
    details: any;
  }>;
  platformStats: any[];
  engagement: {
    averageReach: number;
    engagementRate: string;
    totalLikes: number;
    totalComments: number;
  };
}

export interface AnalyticsResponse {
  success: boolean;
  analytics: AnalyticsData;
}

export async function getAnalytics(): Promise<AnalyticsResponse> {
  const response = await fetch(`${API_BASE}/analytics`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch analytics');
  }
  
  return response.json();
}

// Connected Accounts
export interface ConnectionData {
  platform: string;
  connected: boolean;
  valid: boolean;
  connectedAt: string;
  expiresAt: string;
}

export interface ConnectionsResponse {
  success: boolean;
  connections: ConnectionData[];
}

export async function getConnections(): Promise<ConnectionsResponse> {
  const response = await fetch(`${API_BASE}/connections`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch connections');
  }
  
  return response.json();
}

// Disconnect Account
export async function disconnectAccount(platform: string): Promise<{ success: boolean; platform: string }> {
  const response = await fetch(`${API_BASE}/connections/${platform}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to disconnect ${platform}`);
  }
  
  return response.json();
}

// Activity Feed
export interface Activity {
  id: number;
  userId: string;
  eventType: string;
  payload: any;
  read: boolean;
  createdAt: string;
}

export interface ActivityResponse {
  success: boolean;
  activities: Activity[];
}

export async function getActivity(): Promise<ActivityResponse> {
  const response = await fetch(`${API_BASE}/activity`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch activity');
  }
  
  return response.json();
}

// Feature Settings
export interface SettingsResponse {
  success: boolean;
  settings: Record<string, boolean>;
}

export async function getSettings(): Promise<SettingsResponse> {
  const response = await fetch(`${API_BASE}/settings`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch settings');
  }
  
  return response.json();
}

export async function updateSetting(key: string, value: boolean): Promise<{ success: boolean; [key: string]: boolean }> {
  const response = await fetch(`${API_BASE}/settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    },
    body: JSON.stringify({ key, value })
  });
  
  if (!response.ok) {
    throw new Error('Failed to update setting');
  }
  
  return response.json();
}

// Helper function to get current user ID
export function getCurrentUserId(): string {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || 'demo-user';
    }
  } catch (error) {
    console.warn('Failed to get user ID from token:', error);
  }
  return 'demo-user';
}