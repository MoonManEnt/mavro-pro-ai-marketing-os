import { users, campaigns, leads, analytics, trends, content, type User, type InsertUser, type Campaign, type InsertCampaign, type Lead, type InsertLead, type Analytics, type InsertAnalytics, type Trend, type InsertTrend, type Content, type InsertContent } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Campaign operations
  getCampaignsByUserId(userId: number): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: number, campaign: Partial<Campaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: number): Promise<boolean>;
  
  // Lead operations
  getLeadsByUserId(userId: number): Promise<Lead[]>;
  getLeadsByCampaignId(campaignId: number): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: number, lead: Partial<Lead>): Promise<Lead | undefined>;
  
  // Analytics operations
  getAnalyticsByUserId(userId: number): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  
  // Trend operations
  getAllTrends(): Promise<Trend[]>;
  createTrend(trend: InsertTrend): Promise<Trend>;
  
  // Content operations
  getContentByUserId(userId: number): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: number, content: Partial<Content>): Promise<Content | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private campaigns: Map<number, Campaign>;
  private leads: Map<number, Lead>;
  private analytics: Map<number, Analytics>;
  private trends: Map<number, Trend>;
  private content: Map<number, Content>;
  private currentUserId: number;
  private currentCampaignId: number;
  private currentLeadId: number;
  private currentAnalyticsId: number;
  private currentTrendId: number;
  private currentContentId: number;

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    this.leads = new Map();
    this.analytics = new Map();
    this.trends = new Map();
    this.content = new Map();
    this.currentUserId = 1;
    this.currentCampaignId = 1;
    this.currentLeadId = 1;
    this.currentAnalyticsId = 1;
    this.currentTrendId = 1;
    this.currentContentId = 1;
    
    // Initialize with demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo users
    const demoUsers = [
      { username: "sarah", password: "demo", email: "sarah@medspa.com", persona: "sarah", mode: "demo" },
      { username: "marco", password: "demo", email: "marco@restaurant.com", persona: "marco", mode: "demo" },
      { username: "alex", password: "demo", email: "alex@fitness.com", persona: "alex", mode: "demo" },
    ];

    demoUsers.forEach(user => {
      const newUser: User = { 
        ...user, 
        id: this.currentUserId++, 
        createdAt: new Date(),
        mode: user.mode || 'demo',
        persona: user.persona || 'sarah'
      };
      this.users.set(newUser.id, newUser);
    });

    // Create demo trends
    const demoTrends = [
      { title: "AI-powered video content up 340%", icon: "fas fa-fire", color: "sunset-orange" },
      { title: "Instagram Reels showing 85% higher engagement", icon: "fas fa-chart-line", color: "golden-yellow" },
      { title: "Email automation ROI increased by 67%", icon: "fas fa-trending-up", color: "teal-accent" },
      { title: "Personalized campaigns converting 23% better", icon: "fas fa-star", color: "mint-green" },
    ];

    demoTrends.forEach(trend => {
      const newTrend: Trend = { ...trend, id: this.currentTrendId++, createdAt: new Date() };
      this.trends.set(newTrend.id, newTrend);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      mode: insertUser.mode || 'demo',
      persona: insertUser.persona || 'sarah'
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userUpdate };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getCampaignsByUserId(userId: number): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(campaign => campaign.userId === userId);
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = this.currentCampaignId++;
    const campaign: Campaign = { 
      ...insertCampaign, 
      id, 
      spent: 0, 
      ctr: "0", 
      conversions: 0, 
      roi: "0",
      boostLevel: insertCampaign.boostLevel || 1,
      createdAt: new Date() 
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: number, campaignUpdate: Partial<Campaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;
    
    const updatedCampaign = { ...campaign, ...campaignUpdate };
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  async deleteCampaign(id: number): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  async getLeadsByUserId(userId: number): Promise<Lead[]> {
    return Array.from(this.leads.values()).filter(lead => lead.userId === userId);
  }

  async getLeadsByCampaignId(campaignId: number): Promise<Lead[]> {
    return Array.from(this.leads.values()).filter(lead => lead.campaignId === campaignId);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const lead: Lead = { 
      ...insertLead, 
      id, 
      createdAt: new Date(),
      value: insertLead.value || 0,
      phone: insertLead.phone || null,
      campaignId: insertLead.campaignId || null
    };
    this.leads.set(id, lead);
    return lead;
  }

  async updateLead(id: number, leadUpdate: Partial<Lead>): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (!lead) return undefined;
    
    const updatedLead = { ...lead, ...leadUpdate };
    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  async getAnalyticsByUserId(userId: number): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(analytics => analytics.userId === userId);
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = this.currentAnalyticsId++;
    const analytics: Analytics = { ...insertAnalytics, id, createdAt: new Date() };
    this.analytics.set(id, analytics);
    return analytics;
  }

  async getAllTrends(): Promise<Trend[]> {
    return Array.from(this.trends.values());
  }

  async createTrend(insertTrend: InsertTrend): Promise<Trend> {
    const id = this.currentTrendId++;
    const trend: Trend = { ...insertTrend, id, createdAt: new Date() };
    this.trends.set(id, trend);
    return trend;
  }

  async getContentByUserId(userId: number): Promise<Content[]> {
    return Array.from(this.content.values()).filter(content => content.userId === userId);
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const id = this.currentContentId++;
    const content: Content = { 
      ...insertContent, 
      id, 
      createdAt: new Date(),
      scheduledFor: insertContent.scheduledFor || null
    };
    this.content.set(id, content);
    return content;
  }

  async updateContent(id: number, contentUpdate: Partial<Content>): Promise<Content | undefined> {
    const content = this.content.get(id);
    if (!content) return undefined;
    
    const updatedContent = { ...content, ...contentUpdate };
    this.content.set(id, updatedContent);
    return updatedContent;
  }
}

export const storage = new MemStorage();
