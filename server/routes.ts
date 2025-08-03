import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { storage } from "./storage";
import { insertUserSchema, insertCampaignSchema, insertLeadSchema, insertAnalyticsSchema, insertTrendSchema, insertContentSchema } from "@shared/schema";
import { submitFeedbackHandler, submitUserFeedbackHandler, getFeedbackAnalyticsHandler } from "./feedback";
import { socialMediaRoutes } from "./socialMediaAPIs";
import authRoutes from "./routes/auth";
import viviRoutes from "./routes/vivi.js";
import viviExtensionRoutes from "./routes/vivi-extensions.js";
import campaignRoutes from "./routes/campaigns.js";
import analyticsRoutes from "./routes/analytics";
import contentRoutes from "./routes/content";
import socialRoutes from "./routes/social";
import reviewsRoutes from "./routes/reviews.js";
import complianceRoutes from "./routes/compliance.js";
import grioRoutes from "./routes/grio.js";
import { authenticateToken, optionalAuth } from "./auth/middleware";
import { authenticateToken as newAuthMiddleware, optionalAuth as newOptionalAuth } from "./middleware/authMiddleware";
import { userController } from "./controllers/userController";
import { campaignController } from "./controllers/campaignController";
import {
  ObjectStorageService,
  ObjectNotFoundError,
} from "./objectStorage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add session middleware
  app.use(cookieParser());
  app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));
  
  // Authentication routes
  app.use("/api/auth", authRoutes);

  // ViVi AI routes (protected)
  app.use("/api/vivi", viviRoutes);
  
  // ViVi Extension Engine routes
  app.use("/api/vivi-extensions", viviExtensionRoutes);

  // Campaign Management routes
  app.use("/api/campaigns", campaignRoutes);

  // Analytics routes
  app.use("/api/analytics", analyticsRoutes);

  // Content Management routes
  app.use("/api/content", contentRoutes);

  // Social Media routes (protected)
  app.use("/api/social", socialRoutes);

  // Reviews Management routes
  app.use("/api/reviews", reviewsRoutes);

  // Compliance Management routes
  app.use("/api/compliance", complianceRoutes);

  // Grio Academy routes
  app.use("/api/grio", grioRoutes);

  // Beta Testing Feedback routes
  app.post("/api/feedback", submitFeedbackHandler);
  app.post("/api/feedback/user", optionalAuth, submitUserFeedbackHandler);
  app.get("/api/feedback/analytics", getFeedbackAnalyticsHandler);

  // User routes (protected) - Using new controller pattern
  app.get("/api/users/:id", newAuthMiddleware, userController.getUser.bind(userController));
  app.patch("/api/users/:id", newAuthMiddleware, userController.updateUser.bind(userController));

  // Campaign routes (protected) - Using new controller pattern
  app.get("/api/campaigns/user/:userId", newAuthMiddleware, campaignController.getCampaignsByUserId.bind(campaignController));
  app.post("/api/campaigns", newAuthMiddleware, campaignController.createCampaign.bind(campaignController));
  app.patch("/api/campaigns/:id", newAuthMiddleware, campaignController.updateCampaign.bind(campaignController));
  app.delete("/api/campaigns/:id", newAuthMiddleware, campaignController.deleteCampaign.bind(campaignController));

  // Lead routes (protected)
  app.get("/api/leads/user/:userId", authenticateToken, async (req, res) => {
    try {
      const userId = req.params.userId;
      
      // Users can only access their own leads
      if (req.user!.id !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const leads = await storage.getLeadsByUserId(userId);
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/campaign/:campaignId", authenticateToken, async (req, res) => {
    try {
      const campaignId = req.params.campaignId;
      const leads = await storage.getLeadsByCampaignId(campaignId);
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.post("/api/leads", authenticateToken, async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      res.json(lead);
    } catch (error) {
      res.status(400).json({ message: "Invalid lead data" });
    }
  });

  // Analytics routes (protected)
  app.get("/api/analytics/user/:userId", authenticateToken, async (req, res) => {
    try {
      const userId = req.params.userId;
      
      // Users can only access their own analytics
      if (req.user!.id !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const analytics = await storage.getAnalyticsByUserId(userId);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.post("/api/analytics", authenticateToken, async (req, res) => {
    try {
      const analyticsData = insertAnalyticsSchema.parse(req.body);
      const analytics = await storage.createAnalytics(analyticsData);
      res.json(analytics);
    } catch (error) {
      res.status(400).json({ message: "Invalid analytics data" });
    }
  });

  // Trend routes
  app.get("/api/trends", async (req, res) => {
    try {
      const trends = await storage.getAllTrends();
      res.json(trends);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trends" });
    }
  });

  app.post("/api/trends", async (req, res) => {
    try {
      const trendData = insertTrendSchema.parse(req.body);
      const trend = await storage.createTrend(trendData);
      res.json(trend);
    } catch (error) {
      res.status(400).json({ message: "Invalid trend data" });
    }
  });

  // Content routes (protected)
  app.get("/api/content/user/:userId", authenticateToken, async (req, res) => {
    try {
      const userId = req.params.userId;
      
      // Users can only access their own content
      if (req.user!.id !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const content = await storage.getContentByUserId(userId);
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.post("/api/content", authenticateToken, async (req, res) => {
    try {
      const contentData = insertContentSchema.parse(req.body);
      const content = await storage.createContent(contentData);
      res.json(content);
    } catch (error) {
      res.status(400).json({ message: "Invalid content data" });
    }
  });

  // Enhanced AI Generation API routes
  app.post("/api/ai/generate-hashtags", async (req, res) => {
    try {
      const { generateTrendingHashtags } = await import('./openai');
      const { platform, persona } = req.body;
      
      if (!platform || !persona) {
        return res.status(400).json({ message: "Platform and persona are required" });
      }
      
      const hashtags = await generateTrendingHashtags({
        platform,
        persona,
        industry: req.body.industry || 'default'
      });
      
      res.json(hashtags);
    } catch (error) {
      console.error('Hashtag generation error:', error);
      res.status(500).json({ message: "Failed to generate hashtags" });
    }
  });

  app.post("/api/ai/content-suggestions", async (req, res) => {
    try {
      const { generateAIContentSuggestions } = await import('./openai');
      const { persona, platform } = req.body;
      
      if (!persona || !platform) {
        return res.status(400).json({ message: "Persona and platform are required" });
      }
      
      const suggestions = await generateAIContentSuggestions(persona, platform);
      res.json({ suggestions });
    } catch (error) {
      console.error('Content suggestions error:', error);
      res.status(500).json({ message: "Failed to generate content suggestions" });
    }
  });

  app.post("/api/ai/voice-to-text", async (req, res) => {
    try {
      const { generateVoiceToText } = await import('./openai');
      const { audioData } = req.body;
      
      const text = await generateVoiceToText(audioData);
      res.json({ text });
    } catch (error) {
      console.error('Voice to text error:', error);
      res.status(500).json({ message: "Failed to process voice input" });
    }
  });

  app.post("/api/ai/generate-caption", async (req, res) => {
    try {
      const { generateContent } = await import('./openai');
      const { prompt, persona, platform, tone, length } = req.body;
      
      if (!prompt || !persona || !platform) {
        return res.status(400).json({ message: "Prompt, persona, and platform are required" });
      }
      
      const content = await generateContent({
        prompt,
        persona,
        platform,
        contentType: 'caption',
        tone: tone || 'professional',
        length: length || 'medium'
      });
      
      res.json({ content });
    } catch (error) {
      console.error('Caption generation error:', error);
      res.status(500).json({ message: "Failed to generate caption" });
    }
  });

  // Social Media API routes
  app.post("/api/social-media/connect", socialMediaRoutes.connectAccount);
  app.get("/api/social-media/insights", socialMediaRoutes.getInsights);
  app.post("/api/social-media/post", socialMediaRoutes.postContent);
  app.post("/api/social-media/verify", socialMediaRoutes.verifyConnection);

  // Object Storage routes for Mavro Magic Studio
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    const objectStorageService = new ObjectStorageService();
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/objects/upload", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error generating upload URL:", error);
      res.status(500).json({ error: "Failed to generate upload URL" });
    }
  });

  app.put("/api/objects/campaign-media", async (req, res) => {
    if (!req.body.mediaURL) {
      return res.status(400).json({ error: "mediaURL is required" });
    }

    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = objectStorageService.normalizeObjectEntityPath(
        req.body.mediaURL,
      );

      // Store campaign media reference in database if needed
      // For now, just return the normalized path
      res.status(200).json({
        objectPath: objectPath,
        mediaURL: req.body.mediaURL
      });
    } catch (error) {
      console.error("Error setting campaign media:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
