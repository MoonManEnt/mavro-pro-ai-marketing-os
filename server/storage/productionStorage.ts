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
  grioModules,
  grioUserProgress,
  grioUserStats,
  grioLeaderboard,
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
  type InsertTrend,
  type GrioModule,
  type InsertGrioModule,
  type GrioUserProgress,
  type InsertGrioUserProgress,
  type GrioUserStats,
  type InsertGrioUserStats,
  type GrioLeaderboard,
  type InsertGrioLeaderboard
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
    
    return result.rowCount ? result.rowCount > 0 : false;
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
    
    return result.rowCount ? result.rowCount > 0 : false;
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
    const [analyticsRecord] = await db
      .insert(analytics)
      .values(analyticsData)
      .returning();
    
    return analyticsRecord;
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

  // Grio Academy operations
  async getGrioModules(filters?: {
    persona?: string;
    level?: string;
    category?: string;
    isActive?: boolean;
  }): Promise<GrioModule[]> {
    let query = db.select().from(grioModules);
    
    const conditions = [];
    if (filters?.isActive !== undefined) {
      conditions.push(eq(grioModules.isActive, filters.isActive));
    }
    if (filters?.level) {
      conditions.push(eq(grioModules.level, filters.level));
    }
    if (filters?.category) {
      conditions.push(eq(grioModules.category, filters.category));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    const modules = await query.orderBy(asc(grioModules.sortOrder));
    
    // Filter by persona on application level since it's stored as JSONB array
    if (filters?.persona) {
      return modules.filter(module => {
        const personas = module.targetPersonas as string[];
        return personas.includes(filters.persona!) || personas.length === 0;
      });
    }
    
    return modules;
  }

  async getGrioModule(id: string): Promise<GrioModule | undefined> {
    const [module] = await db.select().from(grioModules).where(eq(grioModules.id, id));
    return module;
  }

  async createGrioModule(moduleData: InsertGrioModule): Promise<GrioModule> {
    const [module] = await db
      .insert(grioModules)
      .values(moduleData)
      .returning();
    
    return module;
  }

  async updateGrioModule(id: string, updates: Partial<GrioModule>): Promise<GrioModule | undefined> {
    const [updatedModule] = await db
      .update(grioModules)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(grioModules.id, id))
      .returning();
    
    return updatedModule;
  }

  async getUserProgress(userId: string): Promise<GrioUserProgress[]> {
    return await db
      .select()
      .from(grioUserProgress)
      .where(eq(grioUserProgress.userId, userId))
      .orderBy(desc(grioUserProgress.updatedAt));
  }

  async getModuleProgress(userId: string, moduleId: string): Promise<GrioUserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(grioUserProgress)
      .where(and(
        eq(grioUserProgress.userId, userId),
        eq(grioUserProgress.moduleId, moduleId)
      ));
    
    return progress;
  }

  async updateModuleProgress(progressData: {
    userId: string;
    moduleId: string;
    status?: string;
    progressPercent?: number;
    timeSpent?: number;
    feedbackRating?: number;
    feedbackText?: string;
    completedAt?: Date;
  }): Promise<GrioUserProgress> {
    // Check if progress record exists
    const existing = await this.getModuleProgress(progressData.userId, progressData.moduleId);
    
    if (existing) {
      // Update existing record
      const [updated] = await db
        .update(grioUserProgress)
        .set({
          ...progressData,
          updatedAt: new Date(),
          lastAccessedAt: new Date()
        })
        .where(and(
          eq(grioUserProgress.userId, progressData.userId),
          eq(grioUserProgress.moduleId, progressData.moduleId)
        ))
        .returning();
      
      return updated;
    } else {
      // Create new progress record
      const [created] = await db
        .insert(grioUserProgress)
        .values({
          userId: progressData.userId,
          moduleId: progressData.moduleId,
          status: progressData.status || 'not_started',
          progressPercent: progressData.progressPercent || 0,
          timeSpent: progressData.timeSpent || 0,
          feedbackRating: progressData.feedbackRating,
          feedbackText: progressData.feedbackText,
          completedAt: progressData.completedAt,
          lastAccessedAt: new Date()
        })
        .returning();
      
      return created;
    }
  }

  async getUserStats(userId: string): Promise<GrioUserStats | undefined> {
    const [stats] = await db
      .select()
      .from(grioUserStats)
      .where(eq(grioUserStats.userId, userId));
    
    if (!stats) {
      // Create initial stats record
      const [created] = await db
        .insert(grioUserStats)
        .values({
          userId,
          totalXp: 0,
          currentRank: 'Bronze',
          modulesCompleted: 0,
          totalTimeSpent: 0,
          currentStreak: 0,
          longestStreak: 0,
          achievements: [],
          favoriteCategories: []
        })
        .returning();
      
      return created;
    }
    
    return stats;
  }

  async updateUserStats(userId: string, updates: {
    xpGained?: number;
    moduleCompleted?: boolean;
    timeSpent?: number;
  }): Promise<GrioUserStats> {
    const currentStats = await this.getUserStats(userId);
    if (!currentStats) {
      throw new Error('User stats not found');
    }
    
    const newTotalXp = (currentStats.totalXp || 0) + (updates.xpGained || 0);
    const newModulesCompleted = (currentStats.modulesCompleted || 0) + (updates.moduleCompleted ? 1 : 0);
    const newTotalTimeSpent = (currentStats.totalTimeSpent || 0) + (updates.timeSpent || 0);
    
    // Calculate new rank based on XP
    let newRank = 'Bronze';
    if (newTotalXp >= 2500) newRank = 'Diamond';
    else if (newTotalXp >= 2000) newRank = 'Platinum';
    else if (newTotalXp >= 1500) newRank = 'Gold';
    else if (newTotalXp >= 1000) newRank = 'Silver';
    
    // Update streak if module completed
    let newCurrentStreak = currentStats.currentStreak || 0;
    let newLongestStreak = currentStats.longestStreak || 0;
    if (updates.moduleCompleted) {
      newCurrentStreak += 1;
      newLongestStreak = Math.max(newLongestStreak, newCurrentStreak);
    }
    
    const [updated] = await db
      .update(grioUserStats)
      .set({
        totalXp: newTotalXp,
        currentRank: newRank,
        modulesCompleted: newModulesCompleted,
        totalTimeSpent: newTotalTimeSpent,
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastLearningDate: updates.moduleCompleted ? new Date() : currentStats.lastLearningDate,
        updatedAt: new Date()
      })
      .where(eq(grioUserStats.userId, userId))
      .returning();
    
    return updated;
  }

  async getLeaderboard(filters?: {
    period?: string;
    industry?: string;
    region?: string;
    limit?: number;
  }): Promise<GrioLeaderboard[]> {
    let query = db.select().from(grioLeaderboard);
    
    const conditions = [eq(grioLeaderboard.isVisible, true)];
    
    if (filters?.period) {
      conditions.push(eq(grioLeaderboard.period, filters.period));
    }
    if (filters?.industry) {
      conditions.push(eq(grioLeaderboard.industry, filters.industry));
    }
    if (filters?.region) {
      conditions.push(eq(grioLeaderboard.region, filters.region));
    }
    
    query = query.where(and(...conditions)) as any;
    
    return await query
      .orderBy(asc(grioLeaderboard.position))
      .limit(filters?.limit || 50);
  }

  async getUserRanking(userId: string, filters?: {
    period?: string;
    industry?: string;
  }): Promise<{ position: number; totalUsers: number }> {
    // Get user's leaderboard entry
    const conditions = [
      eq(grioLeaderboard.userId, userId),
      eq(grioLeaderboard.isVisible, true)
    ];
    
    if (filters?.period) {
      conditions.push(eq(grioLeaderboard.period, filters.period));
    }
    if (filters?.industry) {
      conditions.push(eq(grioLeaderboard.industry, filters.industry));
    }
    
    const [userEntry] = await db
      .select()
      .from(grioLeaderboard)
      .where(and(...conditions));
    
    if (!userEntry) {
      return { position: 0, totalUsers: 0 };
    }
    
    // Get total users count for same filters
    const totalConditions = [eq(grioLeaderboard.isVisible, true)];
    if (filters?.period) {
      totalConditions.push(eq(grioLeaderboard.period, filters.period));
    }
    if (filters?.industry) {
      totalConditions.push(eq(grioLeaderboard.industry, filters.industry));
    }
    
    const totalUsers = await db
      .select()
      .from(grioLeaderboard)
      .where(and(...totalConditions));
    
    return {
      position: userEntry.position,
      totalUsers: totalUsers.length
    };
  }

  async getModuleRecommendations(params: {
    userId: string;
    persona?: string;
    completedModules: string[];
    userLevel: string;
  }): Promise<GrioModule[]> {
    // Get all modules not completed by user
    const allModules = await this.getGrioModules({
      persona: params.persona,
      isActive: true
    });
    
    // Filter out completed modules
    const availableModules = allModules.filter(
      module => !params.completedModules.includes(module.id)
    );
    
    // Simple recommendation logic - recommend modules matching user level or beginner level
    const recommendedModules = availableModules.filter(module => 
      module.level === 'Beginner' || 
      (params.userLevel === 'Silver' && module.level === 'Intermediate') ||
      (params.userLevel === 'Gold' && (module.level === 'Intermediate' || module.level === 'Advanced')) ||
      (params.userLevel === 'Platinum' && module.level === 'Advanced') ||
      (params.userLevel === 'Diamond')
    );
    
    // Return top 3 recommendations
    return recommendedModules.slice(0, 3);
  }
}