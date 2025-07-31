import { pgTable, text, serial, integer, boolean, jsonb, timestamp, varchar, uuid, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enhanced Users table with OAuth support
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  username: text("username").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  password: text("password"), // nullable for OAuth users
  emailVerified: boolean("email_verified").default(false),
  accountType: text("account_type").notNull().default("beta"), // beta, pro, enterprise
  subscriptionStatus: text("subscription_status").notNull().default("trial"), // trial, active, cancelled, expired
  trialEndsAt: timestamp("trial_ends_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at"),
  isActive: boolean("is_active").default(true),
  settings: jsonb("settings").default('{}'),
  onboardingCompleted: boolean("onboarding_completed").default(false),
});

// OAuth Accounts table
export const oauthAccounts = pgTable("oauth_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  provider: text("provider").notNull(), // google, apple, github, linkedin, etc.
  providerAccountId: text("provider_account_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  tokenType: text("token_type"),
  scope: text("scope"),
  idToken: text("id_token"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Session management
export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  sessionToken: text("session_token").notNull().unique(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// User workspace/business profiles
export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  name: text("name").notNull(),
  businessType: text("business_type").notNull(),
  industry: text("industry").notNull(),
  website: text("website"),
  description: text("description"),
  logo: text("logo"),
  settings: jsonb("settings").default('{}'),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Real-time campaign tracking with advanced metrics
export const campaigns = pgTable("campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  workspaceId: uuid("workspace_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("draft"), // draft, active, paused, completed, archived
  platform: text("platform").notNull(), // facebook, instagram, linkedin, google, email, etc.
  campaignType: text("campaign_type").notNull(), // awareness, consideration, conversion, retention
  budget: integer("budget").notNull(),
  spent: integer("spent").notNull().default(0),
  currency: text("currency").notNull().default("USD"),
  targetAudience: jsonb("target_audience").default('{}'),
  adCreatives: jsonb("ad_creatives").default('[]'),
  
  // Real-time metrics
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  ctr: real("ctr").default(0), // click-through rate
  cpc: real("cpc").default(0), // cost per click
  conversions: integer("conversions").default(0),
  conversionRate: real("conversion_rate").default(0),
  roi: real("roi").default(0),
  roas: real("roas").default(0), // return on ad spend
  
  // ViVi AI optimization
  viviOptimized: boolean("vivi_optimized").default(false),
  viviScore: real("vivi_score").default(0), // 0-100 optimization score
  viviRecommendations: jsonb("vivi_recommendations").default('[]'),
  
  // Scheduling and automation
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  scheduledPosts: jsonb("scheduled_posts").default('[]'),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced leads with scoring and attribution
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  workspaceId: uuid("workspace_id").notNull(),
  campaignId: uuid("campaign_id"),
  
  // Contact information
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  jobTitle: text("job_title"),
  
  // Lead qualification
  status: text("status").notNull().default("new"), // new, contacted, qualified, opportunity, won, lost
  score: integer("score").default(0), // 0-100 lead score
  source: text("source").notNull(), // organic, paid, referral, social, etc.
  medium: text("medium"), // cpc, social, email, etc.
  campaign: text("campaign"), // campaign name/id
  
  // Value and conversion tracking
  estimatedValue: integer("estimated_value").default(0),
  actualValue: integer("actual_value").default(0),
  convertedAt: timestamp("converted_at"),
  
  // ViVi AI insights
  viviScore: real("vivi_score").default(0), // AI-calculated lead quality score
  viviInsights: jsonb("vivi_insights").default('{}'),
  
  // Communication tracking
  lastContactedAt: timestamp("last_contacted_at"),
  nextFollowUpAt: timestamp("next_follow_up_at"),
  notes: text("notes"),
  tags: jsonb("tags").default('[]'),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Real-time analytics with time-series data
export const analytics = pgTable("analytics", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  workspaceId: uuid("workspace_id").notNull(),
  campaignId: uuid("campaign_id"), // optional, for campaign-specific analytics
  
  // Metric identification
  metric: text("metric").notNull(), // revenue, leads, conversion_rate, engagement, etc.
  category: text("category").notNull(), // performance, audience, content, roi
  
  // Time-series data
  value: real("value").notNull(),
  previousValue: real("previous_value"),
  change: real("change"), // percentage change
  period: text("period").notNull(), // hourly, daily, weekly, monthly
  dateRange: text("date_range").notNull(), // ISO date range
  
  // Dimensions and segmentation
  platform: text("platform"), // facebook, instagram, linkedin, etc.
  audience: text("audience"), // demographics, interests, behaviors
  contentType: text("content_type"), // video, image, text, carousel
  
  // Metadata
  metadata: jsonb("metadata").default('{}'),
  
  createdAt: timestamp("created_at").defaultNow(),
  recordedAt: timestamp("recorded_at").notNull().defaultNow(),
});

// Dynamic content management with AI optimization
export const content = pgTable("content", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  workspaceId: uuid("workspace_id").notNull(),
  campaignId: uuid("campaign_id"),
  
  // Content details
  title: text("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  contentType: text("content_type").notNull(), // post, video, image, story, reel, etc.
  
  // Publishing details
  platform: text("platform").notNull(), // facebook, instagram, linkedin, twitter, etc.
  status: text("status").notNull().default("draft"), // draft, scheduled, published, archived
  scheduledFor: timestamp("scheduled_for"),
  publishedAt: timestamp("published_at"),
  
  // Media and assets
  mediaUrls: jsonb("media_urls").default('[]'),
  thumbnailUrl: text("thumbnail_url"),
  
  // Targeting and optimization
  hashtags: jsonb("hashtags").default('[]'),
  mentions: jsonb("mentions").default('[]'),
  targetAudience: jsonb("target_audience").default('{}'),
  
  // Performance metrics
  impressions: integer("impressions").default(0),
  reach: integer("reach").default(0),
  engagement: integer("engagement").default(0),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  shares: integer("shares").default(0),
  saves: integer("saves").default(0),
  clicks: integer("clicks").default(0),
  
  // ViVi AI optimization
  viviOptimized: boolean("vivi_optimized").default(false),
  viviScore: real("vivi_score").default(0),
  viviSuggestions: jsonb("vivi_suggestions").default('[]'),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Social media account connections
export const socialAccounts = pgTable("social_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  workspaceId: uuid("workspace_id").notNull(),
  
  platform: text("platform").notNull(), // facebook, instagram, linkedin, etc.
  accountId: text("account_id").notNull(), // platform-specific account ID
  accountName: text("account_name").notNull(),
  accountHandle: text("account_handle"), // @username
  
  // Authentication
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  
  // Account metrics
  followers: integer("followers").default(0),
  following: integer("following").default(0),
  posts: integer("posts").default(0),
  
  // Connection status
  isConnected: boolean("is_connected").default(true),
  lastSyncAt: timestamp("last_sync_at"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ViVi AI interaction and learning data
export const viviInteractions = pgTable("vivi_interactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  workspaceId: uuid("workspace_id").notNull(),
  
  // Interaction details
  type: text("type").notNull(), // chat, recommendation, optimization, analysis
  category: text("category").notNull(), // content, campaign, audience, strategy
  
  // Input and output
  userInput: text("user_input"),
  viviResponse: text("vivi_response"),
  context: jsonb("context").default('{}'),
  
  // Learning and feedback
  wasHelpful: boolean("was_helpful"),
  userFeedback: text("user_feedback"),
  actionTaken: text("action_taken"), // accepted, rejected, modified
  
  // Performance tracking
  responseTime: integer("response_time"), // milliseconds
  accuracy: real("accuracy"), // if measurable
  
  createdAt: timestamp("created_at").defaultNow(),
});

// System-wide trends and insights
export const trends = pgTable("trends", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // industry, platform, content, technology
  industry: text("industry"), // for industry-specific trends
  
  // Trend metrics
  momentum: real("momentum").default(0), // 0-100 trend strength
  growth: real("growth").default(0), // percentage growth
  confidence: real("confidence").default(0), // 0-100 confidence score
  
  // Visual and metadata
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  imageUrl: text("image_url"),
  
  // Relevance and targeting
  relevantIndustries: jsonb("relevant_industries").default('[]'),
  relevantPlatforms: jsonb("relevant_platforms").default('[]'),
  
  // Lifecycle
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas for all tables
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  username: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
  password: true,
});

export const insertOAuthAccountSchema = createInsertSchema(oauthAccounts).pick({
  userId: true,
  provider: true,
  providerAccountId: true,
  accessToken: true,
  refreshToken: true,
  expiresAt: true,
  tokenType: true,
  scope: true,
  idToken: true,
});

export const insertSessionSchema = createInsertSchema(sessions).pick({
  userId: true,
  sessionToken: true,
  expires: true,
});

export const insertWorkspaceSchema = createInsertSchema(workspaces).pick({
  userId: true,
  name: true,
  businessType: true,
  industry: true,
  website: true,
  description: true,
  logo: true,
  settings: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).pick({
  userId: true,
  workspaceId: true,
  name: true,
  description: true,
  status: true,
  platform: true,
  campaignType: true,
  budget: true,
  currency: true,
  targetAudience: true,
  startDate: true,
  endDate: true,
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  userId: true,
  workspaceId: true,
  campaignId: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  company: true,
  jobTitle: true,
  status: true,
  source: true,
  medium: true,
  campaign: true,
  estimatedValue: true,
  notes: true,
  tags: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  userId: true,
  workspaceId: true,
  campaignId: true,
  metric: true,
  category: true,
  value: true,
  previousValue: true,
  change: true,
  period: true,
  dateRange: true,
  platform: true,
  audience: true,
  contentType: true,
  metadata: true,
  recordedAt: true,
});

export const insertContentSchema = createInsertSchema(content).pick({
  userId: true,
  workspaceId: true,
  campaignId: true,
  title: true,
  description: true,
  content: true,
  contentType: true,
  platform: true,
  status: true,
  scheduledFor: true,
  mediaUrls: true,
  hashtags: true,
  mentions: true,
  targetAudience: true,
});

export const insertSocialAccountSchema = createInsertSchema(socialAccounts).pick({
  userId: true,
  workspaceId: true,
  platform: true,
  accountId: true,
  accountName: true,
  accountHandle: true,
  accessToken: true,
  refreshToken: true,
  expiresAt: true,
});

export const insertViviInteractionSchema = createInsertSchema(viviInteractions).pick({
  userId: true,
  workspaceId: true,
  type: true,
  category: true,
  userInput: true,
  viviResponse: true,
  context: true,
});

export const insertTrendSchema = createInsertSchema(trends).pick({
  title: true,
  description: true,
  category: true,
  industry: true,
  momentum: true,
  growth: true,
  confidence: true,
  icon: true,
  color: true,
  imageUrl: true,
  relevantIndustries: true,
  relevantPlatforms: true,
  expiresAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type OAuthAccount = typeof oauthAccounts.$inferSelect;
export type InsertOAuthAccount = z.infer<typeof insertOAuthAccountSchema>;

export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;

export type Workspace = typeof workspaces.$inferSelect;
export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>;

export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;

export type Content = typeof content.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;

export type SocialAccount = typeof socialAccounts.$inferSelect;
export type InsertSocialAccount = z.infer<typeof insertSocialAccountSchema>;

export type ViviInteraction = typeof viviInteractions.$inferSelect;
export type InsertViviInteraction = z.infer<typeof insertViviInteractionSchema>;

export type Trend = typeof trends.$inferSelect;
export type InsertTrend = z.infer<typeof insertTrendSchema>;

// Re-export custom persona types (these will be created later)
// export { customPersonas, insertCustomPersonaSchema, updateCustomPersonaSchema } from "./personaSchema";
// export type { CustomPersona, InsertCustomPersona, UpdateCustomPersona } from "./personaSchema";

// Re-export template types (these will be created later)
// export { personaTemplates, templateUsage, insertPersonaTemplateSchema, updatePersonaTemplateSchema, insertTemplateUsageSchema } from "./templateSchema";
// export type { PersonaTemplate, InsertPersonaTemplate, UpdatePersonaTemplate, TemplateUsage, InsertTemplateUsage } from "./templateSchema";
