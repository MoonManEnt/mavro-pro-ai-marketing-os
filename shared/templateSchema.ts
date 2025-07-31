import { pgTable, serial, text, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const personaTemplates = pgTable("persona_templates", {
  id: serial("id").primaryKey(),
  createdBy: integer("created_by"), // userId of creator, null for system templates
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // e.g., "Healthcare", "E-commerce", "Professional Services"
  businessType: text("business_type").notNull(),
  industry: text("industry").notNull(),
  targetAudience: text("target_audience"),
  brandVoice: text("brand_voice"),
  businessGoals: json("business_goals").$type<string[]>(),
  socialPlatforms: json("social_platforms").$type<string[]>(),
  contentPreferences: json("content_preferences").$type<{
    contentTypes: string[];
    postingFrequency: string;
    preferredTimes: string[];
  }>(),
  demographics: json("demographics").$type<{
    ageRange: string;
    location: string;
    interests: string[];
  }>(),
  tags: json("tags").$type<string[]>(),
  icon: text("icon"), // Emoji or icon name
  isPublic: boolean("is_public").default(true),
  isSystemTemplate: boolean("is_system_template").default(false),
  usageCount: integer("usage_count").default(0),
  rating: integer("rating").default(5), // 1-5 stars
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const templateUsage = pgTable("template_usage", {
  id: serial("id").primaryKey(),
  templateId: integer("template_id").notNull(),
  userId: integer("user_id").notNull(),
  personaId: integer("persona_id"), // resulting persona created from template
  usedAt: timestamp("used_at").defaultNow()
});

export const insertPersonaTemplateSchema = createInsertSchema(personaTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  usageCount: true,
  rating: true
});

export const updatePersonaTemplateSchema = insertPersonaTemplateSchema.partial();

export const insertTemplateUsageSchema = createInsertSchema(templateUsage).omit({
  id: true,
  usedAt: true
});

export type PersonaTemplate = typeof personaTemplates.$inferSelect;
export type InsertPersonaTemplate = z.infer<typeof insertPersonaTemplateSchema>;
export type UpdatePersonaTemplate = z.infer<typeof updatePersonaTemplateSchema>;
export type TemplateUsage = typeof templateUsage.$inferSelect;
export type InsertTemplateUsage = z.infer<typeof insertTemplateUsageSchema>;