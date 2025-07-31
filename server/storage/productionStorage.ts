import { db } from '../db';
import { 
  users, 
  oauthAccounts, 
  sessions, 
  workspaces, 
  campaigns, 
  leads, 
  analytics, 
  content, 
  socialAccounts, 
  viviInteractions, 
  trends,
  type User,
  type InsertUser,
  type OAuthAccount,
  type InsertOAuthAccount,
  type Session,
  type InsertSession,
  type Workspace,
  type InsertWorkspace,
  type Campaign,
  type InsertCampaign,
  type Lead,
  type InsertLead,
  type Analytics,
  type InsertAnalytics,
  type Content,
  type InsertContent,
  type SocialAccount,
  type InsertSocialAccount,
  type ViviInteraction,
  type InsertViviInteraction,
  type Trend,
  type InsertTrend
} from '@shared/schema';
import { eq, and, desc, asc } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export class ProductionStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    // Set trial end date (14 days from now)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        trialEndsAt,
        emailVerified: userData.password ? false : true, // OAuth users are auto-verified
      })
      .returning();
    
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    
    return updatedUser;
  }

  async markOnboardingCompleted(userId: string): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({ 
        onboardingCompleted: true, 
        updatedAt: new Date() 
      })
      .where(eq(users.id, userId))
      .returning();
    
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return updatedUser;
  }

  // OAuth Account operations
  async getOAuthAccount(userId: string, provider: string): Promise<OAuthAccount | undefined> {
    const [account] = await db
      .select()
      .from(oauthAccounts)
      .where(and(eq(oauthAccounts.userId, userId), eq(oauthAccounts.provider, provider)));
    
    return account;
  }

  async upsertOAuthAccount(accountData: InsertOAuthAccount): Promise<OAuthAccount> {
    const existingAccount = await this.getOAuthAccount(accountData.userId, accountData.provider);
    
    if (existingAccount) {
      const [updatedAccount] = await db
        .update(oauthAccounts)
        .set({ ...accountData, updatedAt: new Date() })
        .where(eq(oauthAccounts.id, existingAccount.id))
        .returning();
      
      return updatedAccount;
    } else {
      const [newAccount] = await db
        .insert(oauthAccounts)
        .values(accountData)
        .returning();
      
      return newAccount;
    }
  }

  // Session operations
  async createSession(sessionData: InsertSession): Promise<Session> {
    console.log('Creating session with data:', sessionData);
    const [session] = await db
      .insert(sessions)
      .values(sessionData)
      .returning();
    
    return session;
  }

  async getSession(sessionToken: string): Promise<Session | undefined> {
    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.sessionToken, sessionToken));
    
    return session;
  }

  async deleteSession(sessionToken: string): Promise<boolean> {
    const result = await db
      .delete(sessions)
      .where(eq(sessions.sessionToken, sessionToken));
    
    return result.rowCount > 0;
  }

  // Workspace operations
  async createWorkspace(workspaceData: InsertWorkspace): Promise<Workspace> {
    const [workspace] = await db
      .insert(workspaces)
      .values(workspaceData)
      .returning();
    
    return workspace;
  }

  async getWorkspacesByUserId(userId: string): Promise<Workspace[]> {
    return await db
      .select()
      .from(workspaces)
      .where(and(eq(workspaces.userId, userId), eq(workspaces.isActive, true)))
      .orderBy(asc(workspaces.createdAt));
  }

  async getWorkspace(id: string): Promise<Workspace | undefined> {
    const [workspace] = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.id, id));
    
    return workspace;
  }

  async updateWorkspace(id: string, updates: Partial<Workspace>): Promise<Workspace | undefined> {
    const [updatedWorkspace] = await db
      .update(workspaces)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(workspaces.id, id))
      .returning();
    
    return updatedWorkspace;
  }

  // Campaign operations
  async getCampaignsByUserId(userId: string): Promise<Campaign[]> {
    return await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.userId, userId))
      .orderBy(desc(campaigns.createdAt));
  }

  async getCampaignsByWorkspaceId(workspaceId: string): Promise<Campaign[]> {
    return await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.workspaceId, workspaceId))
      .orderBy(desc(campaigns.createdAt));
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    const [campaign] = await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.id, id));
    
    return campaign;
  }

  async createCampaign(campaignData: InsertCampaign): Promise<Campaign> {
    const [campaign] = await db
      .insert(campaigns)
      .values(campaignData)
      .returning();
    
    return campaign;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    const [updatedCampaign] = await db
      .update(campaigns)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(campaigns.id, id))
      .returning();
    
    return updatedCampaign;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    const result = await db
      .delete(campaigns)
      .where(eq(campaigns.id, id));
    
    return result.rowCount > 0;
  }

  // Lead operations
  async getLeadsByUserId(userId: string): Promise<Lead[]> {
    return await db
      .select()
      .from(leads)
      .where(eq(leads.userId, userId))
      .orderBy(desc(leads.createdAt));
  }

  async getLeadsByWorkspaceId(workspaceId: string): Promise<Lead[]> {
    return await db
      .select()
      .from(leads)
      .where(eq(leads.workspaceId, workspaceId))
      .orderBy(desc(leads.createdAt));
  }

  async getLeadsByCampaignId(campaignId: string): Promise<Lead[]> {
    return await db
      .select()
      .from(leads)
      .where(eq(leads.campaignId, campaignId))
      .orderBy(desc(leads.createdAt));
  }

  async createLead(leadData: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(leadData)
      .returning();
    
    return lead;
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead | undefined> {
    const [updatedLead] = await db
      .update(leads)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    
    return updatedLead;
  }

  // Analytics operations
  async getAnalyticsByUserId(userId: string): Promise<Analytics[]> {
    return await db
      .select()
      .from(analytics)
      .where(eq(analytics.userId, userId))
      .orderBy(desc(analytics.recordedAt));
  }

  async getAnalyticsByWorkspaceId(workspaceId: string): Promise<Analytics[]> {
    return await db
      .select()
      .from(analytics)
      .where(eq(analytics.workspaceId, workspaceId))
      .orderBy(desc(analytics.recordedAt));
  }

  async createAnalytics(analyticsData: InsertAnalytics): Promise<Analytics> {
    const [analytics] = await db
      .insert(analytics)
      .values(analyticsData)
      .returning();
    
    return analytics;
  }

  // Content operations
  async getContentByUserId(userId: string): Promise<Content[]> {
    return await db
      .select()
      .from(content)
      .where(eq(content.userId, userId))
      .orderBy(desc(content.createdAt));
  }

  async getContentByWorkspaceId(workspaceId: string): Promise<Content[]> {
    return await db
      .select()
      .from(content)
      .where(eq(content.workspaceId, workspaceId))
      .orderBy(desc(content.createdAt));
  }

  async createContent(contentData: InsertContent): Promise<Content> {
    const [contentItem] = await db
      .insert(content)
      .values(contentData)
      .returning();
    
    return contentItem;
  }

  async updateContent(id: string, updates: Partial<Content>): Promise<Content | undefined> {
    const [updatedContent] = await db
      .update(content)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(content.id, id))
      .returning();
    
    return updatedContent;
  }

  // Social Account operations
  async getSocialAccountsByWorkspaceId(workspaceId: string): Promise<SocialAccount[]> {
    return await db
      .select()
      .from(socialAccounts)
      .where(eq(socialAccounts.workspaceId, workspaceId))
      .orderBy(asc(socialAccounts.platform));
  }

  async createSocialAccount(accountData: InsertSocialAccount): Promise<SocialAccount> {
    const [account] = await db
      .insert(socialAccounts)
      .values(accountData)
      .returning();
    
    return account;
  }

  async updateSocialAccount(id: string, updates: Partial<SocialAccount>): Promise<SocialAccount | undefined> {
    const [updatedAccount] = await db
      .update(socialAccounts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(socialAccounts.id, id))
      .returning();
    
    return updatedAccount;
  }

  // ViVi Interaction operations
  async createViviInteraction(interactionData: InsertViviInteraction): Promise<ViviInteraction> {
    const [interaction] = await db
      .insert(viviInteractions)
      .values(interactionData)
      .returning();
    
    return interaction;
  }

  async getViviInteractionsByUserId(userId: string, limit: number = 50): Promise<ViviInteraction[]> {
    return await db
      .select()
      .from(viviInteractions)
      .where(eq(viviInteractions.userId, userId))
      .orderBy(desc(viviInteractions.createdAt))
      .limit(limit);
  }

  // Trend operations
  async getAllTrends(): Promise<Trend[]> {
    return await db
      .select()
      .from(trends)
      .where(eq(trends.isActive, true))
      .orderBy(desc(trends.momentum));
  }

  async getTrendsByIndustry(industry: string): Promise<Trend[]> {
    return await db
      .select()
      .from(trends)
      .where(and(eq(trends.isActive, true), eq(trends.industry, industry)))
      .orderBy(desc(trends.momentum));
  }

  async createTrend(trendData: InsertTrend): Promise<Trend> {
    const [trend] = await db
      .insert(trends)
      .values(trendData)
      .returning();
    
    return trend;
  }

  async updateTrend(id: string, updates: Partial<Trend>): Promise<Trend | undefined> {
    const [updatedTrend] = await db
      .update(trends)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(trends.id, id))
      .returning();
    
    return updatedTrend;
  }
}