import { pgTable, serial, text, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const customPersonas = pgTable("custom_personas", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
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
  avatar: text("avatar"),
  isActive: boolean("is_active").default(true),
  isSandbox: boolean("is_sandbox").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const insertCustomPersonaSchema = createInsertSchema(customPersonas).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const updateCustomPersonaSchema = insertCustomPersonaSchema.partial();

export type CustomPersona = typeof customPersonas.$inferSelect;
export type InsertCustomPersona = z.infer<typeof insertCustomPersonaSchema>;
export type UpdateCustomPersona = z.infer<typeof updateCustomPersonaSchema>;