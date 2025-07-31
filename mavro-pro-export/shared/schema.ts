import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  persona: text("persona").notNull().default("sarah"),
  mode: text("mode").notNull().default("demo"), // demo, live, hybrid
  createdAt: timestamp("created_at").defaultNow(),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  status: text("status").notNull(), // active, paused, completed
  platform: text("platform").notNull(), // facebook, instagram, email, etc.
  budget: integer("budget").notNull(),
  spent: integer("spent").notNull().default(0),
  ctr: text("ctr").notNull().default("0"),
  conversions: integer("conversions").notNull().default(0),
  roi: text("roi").notNull().default("0"),
  boostLevel: integer("boost_level").notNull().default(1), // 1x, 2x, 3x
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  campaignId: integer("campaign_id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  status: text("status").notNull(), // new, contacted, qualified, converted
  source: text("source").notNull(),
  value: integer("value").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  metric: text("metric").notNull(), // revenue, leads, conversion_rate, etc.
  value: text("value").notNull(),
  period: text("period").notNull(), // monthly, weekly, daily
  change: text("change").notNull(), // percentage change
  createdAt: timestamp("created_at").defaultNow(),
});

export const trends = pgTable("trends", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // post, video, email, etc.
  title: text("title").notNull(),
  platform: text("platform").notNull(),
  status: text("status").notNull(), // draft, scheduled, published
  scheduledFor: timestamp("scheduled_for"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  persona: true,
  mode: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).pick({
  userId: true,
  name: true,
  status: true,
  platform: true,
  budget: true,
  boostLevel: true,
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  userId: true,
  campaignId: true,
  name: true,
  email: true,
  phone: true,
  status: true,
  source: true,
  value: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  userId: true,
  metric: true,
  value: true,
  period: true,
  change: true,
});

export const insertTrendSchema = createInsertSchema(trends).pick({
  title: true,
  icon: true,
  color: true,
});

export const insertContentSchema = createInsertSchema(content).pick({
  userId: true,
  type: true,
  title: true,
  platform: true,
  status: true,
  scheduledFor: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;

export type InsertTrend = z.infer<typeof insertTrendSchema>;
export type Trend = typeof trends.$inferSelect;

export type InsertContent = z.infer<typeof insertContentSchema>;
export type Content = typeof content.$inferSelect;
