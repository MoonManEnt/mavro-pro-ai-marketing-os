import { eq, desc } from 'drizzle-orm';
import { db } from '../db';
import { users, campaigns, leads, analytics, trends, content, customPersonas, personaTemplates, templateUsage } from '@shared/schema';
import type { 
  User, InsertUser, 
  Campaign, InsertCampaign, 
  Lead, InsertLead, 
  Analytics, InsertAnalytics, 
  Trend, InsertTrend, 
  Content, InsertContent,
  CustomPersona, InsertCustomPersona, UpdateCustomPersona,
  PersonaTemplate, InsertPersonaTemplate, UpdatePersonaTemplate,
  TemplateUsage, InsertTemplateUsage
} from '@shared/schema';
import type { IStorage } from '../storage';

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const result = await db.update(users).set(userUpdate).where(eq(users.id, id)).returning();
    return result[0];
  }

  // Campaign operations
  async getCampaignsByUserId(userId: number): Promise<Campaign[]> {
    return await db.select().from(campaigns).where(eq(campaigns.userId, userId));
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
    return result[0];
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const result = await db.insert(campaigns).values(campaign).returning();
    return result[0];
  }

  async updateCampaign(id: number, campaignUpdate: Partial<Campaign>): Promise<Campaign | undefined> {
    const result = await db.update(campaigns).set(campaignUpdate).where(eq(campaigns.id, id)).returning();
    return result[0];
  }

  async deleteCampaign(id: number): Promise<boolean> {
    const result = await db.delete(campaigns).where(eq(campaigns.id, id)).returning();
    return result.length > 0;
  }

  // Lead operations
  async getLeadsByUserId(userId: number): Promise<Lead[]> {
    return await db.select().from(leads).where(eq(leads.userId, userId));
  }

  async getLeadsByCampaignId(campaignId: number): Promise<Lead[]> {
    return await db.select().from(leads).where(eq(leads.campaignId, campaignId));
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const result = await db.insert(leads).values(lead).returning();
    return result[0];
  }

  async updateLead(id: number, leadUpdate: Partial<Lead>): Promise<Lead | undefined> {
    const result = await db.update(leads).set(leadUpdate).where(eq(leads.id, id)).returning();
    return result[0];
  }

  // Analytics operations
  async getAnalyticsByUserId(userId: number): Promise<Analytics[]> {
    return await db.select().from(analytics).where(eq(analytics.userId, userId));
  }

  async createAnalytics(analyticsData: InsertAnalytics): Promise<Analytics> {
    const result = await db.insert(analytics).values(analyticsData).returning();
    return result[0];
  }

  // Trend operations
  async getAllTrends(): Promise<Trend[]> {
    return await db.select().from(trends);
  }

  async createTrend(trend: InsertTrend): Promise<Trend> {
    const result = await db.insert(trends).values(trend).returning();
    return result[0];
  }

  // Content operations
  async getContentByUserId(userId: number): Promise<Content[]> {
    return await db.select().from(content).where(eq(content.userId, userId));
  }

  async createContent(contentData: InsertContent): Promise<Content> {
    const result = await db.insert(content).values(contentData).returning();
    return result[0];
  }

  async updateContent(id: number, contentUpdate: Partial<Content>): Promise<Content | undefined> {
    const result = await db.update(content).set(contentUpdate).where(eq(content.id, id)).returning();
    return result[0];
  }

  // Custom Persona operations
  async getCustomPersonasByUserId(userId: number): Promise<CustomPersona[]> {
    return await db.select().from(customPersonas).where(eq(customPersonas.userId, userId));
  }

  async getCustomPersona(id: number): Promise<CustomPersona | undefined> {
    const result = await db.select().from(customPersonas).where(eq(customPersonas.id, id)).limit(1);
    return result[0];
  }

  async createCustomPersona(persona: InsertCustomPersona): Promise<CustomPersona> {
    const result = await db.insert(customPersonas).values(persona).returning();
    return result[0];
  }

  async updateCustomPersona(id: number, personaUpdate: UpdateCustomPersona): Promise<CustomPersona | undefined> {
    const result = await db.update(customPersonas)
      .set({ ...personaUpdate, updatedAt: new Date() })
      .where(eq(customPersonas.id, id))
      .returning();
    return result[0];
  }

  async deleteCustomPersona(id: number): Promise<boolean> {
    const result = await db.delete(customPersonas).where(eq(customPersonas.id, id)).returning();
    return result.length > 0;
  }

  async getActiveCustomPersonas(): Promise<CustomPersona[]> {
    return await db.select().from(customPersonas).where(eq(customPersonas.isActive, true));
  }

  // Template operations
  async getPersonaTemplates(): Promise<PersonaTemplate[]> {
    return await db.select().from(personaTemplates).orderBy(desc(personaTemplates.usageCount));
  }

  async getPersonaTemplatesByCategory(category: string): Promise<PersonaTemplate[]> {
    return await db.select().from(personaTemplates).where(eq(personaTemplates.category, category));
  }

  async getPersonaTemplate(id: number): Promise<PersonaTemplate | undefined> {
    const result = await db.select().from(personaTemplates).where(eq(personaTemplates.id, id)).limit(1);
    return result[0];
  }

  async createPersonaTemplate(template: InsertPersonaTemplate): Promise<PersonaTemplate> {
    const result = await db.insert(personaTemplates).values(template).returning();
    return result[0];
  }

  async updatePersonaTemplate(id: number, templateUpdate: UpdatePersonaTemplate): Promise<PersonaTemplate | undefined> {
    const result = await db.update(personaTemplates)
      .set({ ...templateUpdate, updatedAt: new Date() })
      .where(eq(personaTemplates.id, id))
      .returning();
    return result[0];
  }

  async deletePersonaTemplate(id: number): Promise<boolean> {
    const result = await db.delete(personaTemplates).where(eq(personaTemplates.id, id)).returning();
    return result.length > 0;
  }

  async getPopularTemplates(limit: number = 10): Promise<PersonaTemplate[]> {
    return await db.select().from(personaTemplates)
      .orderBy(desc(personaTemplates.usageCount))
      .limit(limit);
  }

  async getTemplatesByCreator(userId: number): Promise<PersonaTemplate[]> {
    return await db.select().from(personaTemplates).where(eq(personaTemplates.createdBy, userId));
  }

  async incrementTemplateUsage(templateId: number): Promise<void> {
    // For DatabaseStorage, we need to manually increment since we can't use field references
    const template = await this.getPersonaTemplate(templateId);
    if (template) {
      await db.update(personaTemplates)
        .set({ 
          usageCount: template.usageCount + 1,
          updatedAt: new Date()
        })
        .where(eq(personaTemplates.id, templateId));
    }
  }

  async logTemplateUsage(usage: InsertTemplateUsage): Promise<TemplateUsage> {
    const result = await db.insert(templateUsage).values(usage).returning();
    return result[0];
  }
}