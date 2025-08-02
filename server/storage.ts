import { 
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
} from "@shared/schema";
import { ProductionStorage } from "./storage/productionStorage";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | undefined>;
  markOnboardingCompleted(userId: string): Promise<User>;
  
  // OAuth Account operations
  getOAuthAccount(userId: string, provider: string): Promise<OAuthAccount | undefined>;
  upsertOAuthAccount(account: InsertOAuthAccount): Promise<OAuthAccount>;
  
  // Session operations
  createSession(session: InsertSession): Promise<Session>;
  getSession(sessionToken: string): Promise<Session | undefined>;
  deleteSession(sessionToken: string): Promise<boolean>;
  
  // Workspace operations
  createWorkspace(workspace: InsertWorkspace): Promise<Workspace>;
  getWorkspacesByUserId(userId: string): Promise<Workspace[]>;
  getWorkspace(id: string): Promise<Workspace | undefined>;
  updateWorkspace(id: string, workspace: Partial<Workspace>): Promise<Workspace | undefined>;
  
  // Campaign operations
  getCampaignsByUserId(userId: string): Promise<Campaign[]>;
  getCampaignsByWorkspaceId(workspaceId: string): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: string, campaign: Partial<Campaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: string): Promise<boolean>;
  
  // Lead operations
  getLeadsByUserId(userId: string): Promise<Lead[]>;
  getLeadsByWorkspaceId(workspaceId: string): Promise<Lead[]>;
  getLeadsByCampaignId(campaignId: string): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, lead: Partial<Lead>): Promise<Lead | undefined>;
  
  // Analytics operations
  getAnalyticsByUserId(userId: string): Promise<Analytics[]>;
  getAnalyticsByWorkspaceId(workspaceId: string): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  
  // Content operations
  getContentByUserId(userId: string): Promise<Content[]>;
  getContentByWorkspaceId(workspaceId: string): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: string, content: Partial<Content>): Promise<Content | undefined>;
  
  // Social Account operations
  getSocialAccountsByWorkspaceId(workspaceId: string): Promise<SocialAccount[]>;
  createSocialAccount(account: InsertSocialAccount): Promise<SocialAccount>;
  updateSocialAccount(id: string, account: Partial<SocialAccount>): Promise<SocialAccount | undefined>;
  
  // ViVi Interaction operations
  createViviInteraction(interaction: InsertViviInteraction): Promise<ViviInteraction>;
  getViviInteractionsByUserId(userId: string, limit?: number): Promise<ViviInteraction[]>;
  
  // Trend operations
  getAllTrends(): Promise<Trend[]>;
  getTrendsByIndustry(industry: string): Promise<Trend[]>;
  createTrend(trend: InsertTrend): Promise<Trend>;
  updateTrend(id: string, trend: Partial<Trend>): Promise<Trend | undefined>;
  
  // Grio Academy operations
  getGrioModules(filters?: {
    persona?: string;
    level?: string;
    category?: string;
    isActive?: boolean;
  }): Promise<GrioModule[]>;
  getGrioModule(id: string): Promise<GrioModule | undefined>;
  createGrioModule(module: InsertGrioModule): Promise<GrioModule>;
  updateGrioModule(id: string, module: Partial<GrioModule>): Promise<GrioModule | undefined>;
  
  getUserProgress(userId: string): Promise<GrioUserProgress[]>;
  getModuleProgress(userId: string, moduleId: string): Promise<GrioUserProgress | undefined>;
  updateModuleProgress(progress: {
    userId: string;
    moduleId: string;
    status?: string;
    progressPercent?: number;
    timeSpent?: number;
    feedbackRating?: number;
    feedbackText?: string;
    completedAt?: Date;
  }): Promise<GrioUserProgress>;
  
  getUserStats(userId: string): Promise<GrioUserStats | undefined>;
  updateUserStats(userId: string, updates: {
    xpGained?: number;
    moduleCompleted?: boolean;
    timeSpent?: number;
  }): Promise<GrioUserStats>;
  
  getLeaderboard(filters?: {
    period?: string;
    industry?: string;
    region?: string;
    limit?: number;
  }): Promise<GrioLeaderboard[]>;
  getUserRanking(userId: string, filters?: {
    period?: string;
    industry?: string;
  }): Promise<{ position: number; totalUsers: number }>;
  
  getModuleRecommendations(params: {
    userId: string;
    persona?: string;
    completedModules: string[];
    userLevel: string;
  }): Promise<GrioModule[]>;
}

// Production storage implementation  
export const storage: IStorage = new ProductionStorage();