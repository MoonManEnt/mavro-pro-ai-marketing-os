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
import { authenticateToken, optionalAuth } from "./auth/middleware";
import { authenticateToken as newAuthMiddleware, optionalAuth as newOptionalAuth } from "./middleware/authMiddleware";
import { userController } from "./controllers/userController";
import { campaignController } from "./controllers/campaignController";

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

  // Social Media API routes
  app.post("/api/social-media/connect", socialMediaRoutes.connectAccount);
  app.get("/api/social-media/insights", socialMediaRoutes.getInsights);
  app.post("/api/social-media/post", socialMediaRoutes.postContent);
  app.post("/api/social-media/verify", socialMediaRoutes.verifyConnection);

  const httpServer = createServer(app);
  return httpServer;
}
