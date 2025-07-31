import { storage } from "../storage";
import type { User, Campaign, Lead, Analytics, Trend, Content } from "@shared/schema";

export class DatabaseService {
  // User operations
  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await storage.getUser(id);
      return user || null;
    } catch (error) {
      console.error('Database error getting user:', error);
      throw new Error('Failed to retrieve user');
    }
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    try {
      const user = await storage.updateUser(id, updates);
      return user || null;
    } catch (error) {
      console.error('Database error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async createUser(userData: any): Promise<User> {
    try {
      return await storage.createUser(userData);
    } catch (error) {
      console.error('Database error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  // Campaign operations
  async getCampaignsByUserId(userId: string): Promise<Campaign[]> {
    try {
      return await storage.getCampaignsByUserId(userId);
    } catch (error) {
      console.error('Database error getting campaigns:', error);
      throw new Error('Failed to retrieve campaigns');
    }
  }

  async createCampaign(campaignData: any): Promise<Campaign> {
    try {
      return await storage.createCampaign(campaignData);
    } catch (error) {
      console.error('Database error creating campaign:', error);
      throw new Error('Failed to create campaign');
    }
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | null> {
    try {
      const campaign = await storage.updateCampaign(id, updates);
      return campaign || null;
    } catch (error) {
      console.error('Database error updating campaign:', error);
      throw new Error('Failed to update campaign');
    }
  }

  async deleteCampaign(id: string): Promise<boolean> {
    try {
      return await storage.deleteCampaign(id);
    } catch (error) {
      console.error('Database error deleting campaign:', error);
      throw new Error('Failed to delete campaign');
    }
  }

  // Lead operations
  async getLeadsByUserId(userId: string): Promise<Lead[]> {
    try {
      return await storage.getLeadsByUserId(userId);
    } catch (error) {
      console.error('Database error getting leads:', error);
      throw new Error('Failed to retrieve leads');
    }
  }

  async createLead(leadData: any): Promise<Lead> {
    try {
      return await storage.createLead(leadData);
    } catch (error) {
      console.error('Database error creating lead:', error);
      throw new Error('Failed to create lead');
    }
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
    try {
      const lead = await storage.updateLead(id, updates);
      return lead || null;
    } catch (error) {
      console.error('Database error updating lead:', error);
      throw new Error('Failed to update lead');
    }
  }

  // Analytics operations
  async getAnalyticsByUserId(userId: string): Promise<Analytics[]> {
    try {
      return await storage.getAnalyticsByUserId(userId);
    } catch (error) {
      console.error('Database error getting analytics:', error);
      throw new Error('Failed to retrieve analytics');
    }
  }

  async createAnalytics(analyticsData: any): Promise<Analytics> {
    try {
      return await storage.createAnalytics(analyticsData);
    } catch (error) {
      console.error('Database error creating analytics:', error);
      throw new Error('Failed to create analytics');
    }
  }

  // Content operations
  async getContentByUserId(userId: string): Promise<Content[]> {
    try {
      return await storage.getContentByUserId(userId);
    } catch (error) {
      console.error('Database error getting content:', error);
      throw new Error('Failed to retrieve content');
    }
  }

  async createContent(contentData: any): Promise<Content> {
    try {
      return await storage.createContent(contentData);
    } catch (error) {
      console.error('Database error creating content:', error);
      throw new Error('Failed to create content');
    }
  }
}

export const dbService = new DatabaseService();