import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  accountType: 'beta' | 'pro' | 'enterprise';
  subscriptionStatus: 'trial' | 'active' | 'cancelled' | 'expired';
  trialEndsAt: Date;
  isActive: boolean;
  onboardingCompleted: boolean;
  settings: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  id: string;
  userId: string;
  name: string;
  businessType: string;
  industry: string;
  website?: string;
  description?: string;
  logo?: string;
  settings: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: string;
  userId: string;
  workspaceId: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
  platform: string;
  campaignType: string;
  budget: number;
  spent: number;
  currency: string;
  targetAudience: Record<string, any>;
  adCreatives: any[];
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number;
  conversionRate: number;
  roi: number;
  roas: number;
  viviOptimized: boolean;
  viviScore: number;
  viviRecommendations: any[];
  startDate?: Date;
  endDate?: Date;
  scheduledPosts: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  userId: string;
  workspaceId: string;
  campaignId?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  status: 'new' | 'contacted' | 'qualified' | 'opportunity' | 'won' | 'lost';
  score: number;
  source: string;
  medium?: string;
  campaign?: string;
  estimatedValue: number;
  actualValue: number;
  convertedAt?: Date;
  viviScore: number;
  viviInsights: Record<string, any>;
  lastContactedAt?: Date;
  nextFollowUpAt?: Date;
  notes?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  id: string;
  userId: string;
  workspaceId: string;
  campaignId?: string;
  metric: string;
  category: string;
  value: number;
  previousValue?: number;
  change?: number;
  period: string;
  dateRange: string;
  platform?: string;
  audience?: string;
  contentType?: string;
  metadata: Record<string, any>;
  recordedAt: Date;
}

export interface Content {
  id: string;
  userId: string;
  workspaceId: string;
  campaignId?: string;
  title: string;
  description?: string;
  content: string;
  contentType: string;
  platform: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  scheduledFor?: Date;
  publishedAt?: Date;
  mediaUrls: string[];
  thumbnailUrl?: string;
  hashtags: string[];
  mentions: string[];
  targetAudience: Record<string, any>;
  impressions: number;
  reach: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
  viviOptimized: boolean;
  viviScore: number;
  viviSuggestions: any[];
  createdAt: Date;
  updatedAt: Date;
}

// User Service
export const userService = {
  async getCurrentUser(userId: string): Promise<User | null> {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async completeOnboarding(userId: string): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, {
        onboardingCompleted: true,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  }
};

// Workspace Service
export const workspaceService = {
  async getUserWorkspaces(userId: string): Promise<Workspace[]> {
    try {
      const q = query(
        collection(db, 'workspaces'),
        where('userId', '==', userId),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Workspace[];
    } catch (error) {
      console.error('Error getting workspaces:', error);
      throw error;
    }
  },

  async createWorkspace(workspace: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'workspaces'), {
        ...workspace,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating workspace:', error);
      throw error;
    }
  },

  async updateWorkspace(workspaceId: string, updates: Partial<Workspace>): Promise<void> {
    try {
      const docRef = doc(db, 'workspaces', workspaceId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating workspace:', error);
      throw error;
    }
  }
};

// Campaign Service
export const campaignService = {
  async getUserCampaigns(userId: string): Promise<Campaign[]> {
    try {
      const q = query(
        collection(db, 'campaigns'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Campaign[];
    } catch (error) {
      console.error('Error getting campaigns:', error);
      throw error;
    }
  },

  async getWorkspaceCampaigns(workspaceId: string): Promise<Campaign[]> {
    try {
      const q = query(
        collection(db, 'campaigns'),
        where('workspaceId', '==', workspaceId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Campaign[];
    } catch (error) {
      console.error('Error getting workspace campaigns:', error);
      throw error;
    }
  },

  async createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'campaigns'), {
        ...campaign,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  },

  async updateCampaign(campaignId: string, updates: Partial<Campaign>): Promise<void> {
    try {
      const docRef = doc(db, 'campaigns', campaignId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  },

  async deleteCampaign(campaignId: string): Promise<void> {
    try {
      const docRef = doc(db, 'campaigns', campaignId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting campaign:', error);
      throw error;
    }
  }
};

// Lead Service
export const leadService = {
  async getUserLeads(userId: string): Promise<Lead[]> {
    try {
      const q = query(
        collection(db, 'leads'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
    } catch (error) {
      console.error('Error getting leads:', error);
      throw error;
    }
  },

  async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'leads'), {
        ...lead,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  async updateLead(leadId: string, updates: Partial<Lead>): Promise<void> {
    try {
      const docRef = doc(db, 'leads', leadId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  }
};

// Analytics Service
export const analyticsService = {
  async getUserAnalytics(userId: string, period: string = '7d'): Promise<Analytics[]> {
    try {
      const q = query(
        collection(db, 'analytics'),
        where('userId', '==', userId),
        where('period', '==', period),
        orderBy('recordedAt', 'desc'),
        limit(100)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Analytics[];
    } catch (error) {
      console.error('Error getting analytics:', error);
      throw error;
    }
  },

  async createAnalytics(analytics: Omit<Analytics, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'analytics'), {
        ...analytics,
        recordedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating analytics:', error);
      throw error;
    }
  }
};

// Content Service
export const contentService = {
  async getUserContent(userId: string): Promise<Content[]> {
    try {
      const q = query(
        collection(db, 'content'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Content[];
    } catch (error) {
      console.error('Error getting content:', error);
      throw error;
    }
  },

  async createContent(content: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'content'), {
        ...content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating content:', error);
      throw error;
    }
  },

  async updateContent(contentId: string, updates: Partial<Content>): Promise<void> {
    try {
      const docRef = doc(db, 'content', contentId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  }
};

// Real-time listeners
export const realtimeService = {
  onUserWorkspaces(userId: string, callback: (workspaces: Workspace[]) => void) {
    const q = query(
      collection(db, 'workspaces'),
      where('userId', '==', userId),
      where('isActive', '==', true)
    );
    
    return onSnapshot(q, (snapshot) => {
      const workspaces = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Workspace[];
      callback(workspaces);
    });
  },

  onUserCampaigns(userId: string, callback: (campaigns: Campaign[]) => void) {
    const q = query(
      collection(db, 'campaigns'),
      where('userId', '==', userId)
    );
    
    return onSnapshot(q, (snapshot) => {
      const campaigns = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Campaign[];
      callback(campaigns);
    });
  },

  onUserLeads(userId: string, callback: (leads: Lead[]) => void) {
    const q = query(
      collection(db, 'leads'),
      where('userId', '==', userId)
    );
    
    return onSnapshot(q, (snapshot) => {
      const leads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      callback(leads);
    });
  }
};
