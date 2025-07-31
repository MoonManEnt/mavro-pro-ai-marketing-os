import { Request, Response } from "express";
import { z } from "zod";

// Beta testing feedback schema
const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'improvement', 'general']),
  title: z.string().min(5).max(200),
  description: z.string().min(10).max(2000),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  category: z.enum(['ui', 'performance', 'functionality', 'data', 'integration', 'other']).optional(),
  steps: z.string().optional(), // Steps to reproduce for bugs
  expectedBehavior: z.string().optional(),
  actualBehavior: z.string().optional(),
  browserInfo: z.object({
    userAgent: z.string(),
    viewport: z.string(),
    url: z.string(),
  }).optional(),
  screenshot: z.string().optional(), // Base64 encoded screenshot
  userId: z.string().optional(),
  userEmail: z.string().email().optional(),
  additionalData: z.record(z.any()).optional(),
});

const userFeedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000).optional(),
  features: z.array(z.string()).optional(),
  improvements: z.array(z.string()).optional(),
  wouldRecommend: z.boolean().optional(),
});

export type FeedbackData = z.infer<typeof feedbackSchema>;
export type UserFeedbackData = z.infer<typeof userFeedbackSchema>;

// In-memory storage for beta testing (replace with database in production)
const feedbackStorage: Array<FeedbackData & { id: string; createdAt: Date; status: string }> = [];
const userFeedbackStorage: Array<UserFeedbackData & { id: string; userId?: string; createdAt: Date }> = [];

let feedbackIdCounter = 1;

export class FeedbackService {
  // Submit bug report or feature request
  static async submitFeedback(feedbackData: FeedbackData): Promise<{ id: string; message: string }> {
    try {
      // Validate input
      const validatedData = feedbackSchema.parse(feedbackData);
      
      // Generate ID and create feedback entry
      const id = `FB-${Date.now()}-${feedbackIdCounter++}`;
      const feedback = {
        ...validatedData,
        id,
        createdAt: new Date(),
        status: 'open',
      };
      
      // Store feedback
      feedbackStorage.push(feedback);
      
      // Log for development (replace with proper logging/alerting)
      console.log(`📝 New ${feedback.type} feedback: ${feedback.title}`, {
        id: feedback.id,
        severity: feedback.severity,
        category: feedback.category,
        user: feedback.userId || 'anonymous',
      });
      
      // Send notification to development team (implement email/Slack integration)
      await this.notifyDevelopmentTeam(feedback);
      
      return {
        id,
        message: `Thank you for your feedback! We've received your ${feedback.type} report and will review it soon.`
      };
    } catch (error) {
      console.error("Feedback submission error:", error);
      throw new Error("Failed to submit feedback");
    }
  }

  // Submit user satisfaction feedback
  static async submitUserFeedback(userFeedbackData: UserFeedbackData, userId?: string): Promise<{ message: string }> {
    try {
      // Validate input
      const validatedData = userFeedbackSchema.parse(userFeedbackData);
      
      // Create feedback entry
      const feedback = {
        ...validatedData,
        id: `UF-${Date.now()}-${feedbackIdCounter++}`,
        userId,
        createdAt: new Date(),
      };
      
      // Store feedback
      userFeedbackStorage.push(feedback);
      
      console.log(`⭐ User feedback received: ${feedback.rating}/5 stars`, {
        userId: feedback.userId || 'anonymous',
        comment: feedback.comment?.substring(0, 50) + '...',
      });
      
      return {
        message: "Thank you for rating your experience! Your feedback helps us improve Mavro Pro."
      };
    } catch (error) {
      console.error("User feedback submission error:", error);
      throw new Error("Failed to submit user feedback");
    }
  }

  // Get feedback analytics (admin only)
  static getFeedbackAnalytics() {
    const totalFeedback = feedbackStorage.length;
    const feedbackByType = feedbackStorage.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const feedbackBySeverity = feedbackStorage.reduce((acc, item) => {
      if (item.severity) {
        acc[item.severity] = (acc[item.severity] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    
    const averageRating = userFeedbackStorage.length > 0 
      ? userFeedbackStorage.reduce((sum, item) => sum + item.rating, 0) / userFeedbackStorage.length
      : 0;
    
    const recentFeedback = feedbackStorage
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
    
    return {
      totalFeedback,
      feedbackByType,
      feedbackBySeverity,
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings: userFeedbackStorage.length,
      recentFeedback: recentFeedback.map(item => ({
        id: item.id,
        type: item.type,
        title: item.title,
        severity: item.severity,
        createdAt: item.createdAt,
        status: item.status,
      })),
    };
  }

  // Mark feedback as resolved (admin only)
  static resolveFeedback(feedbackId: string): boolean {
    const feedback = feedbackStorage.find(item => item.id === feedbackId);
    if (feedback) {
      feedback.status = 'resolved';
      return true;
    }
    return false;
  }

  // Get all feedback (admin only)
  static getAllFeedback() {
    return feedbackStorage.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Private method to notify development team
  private static async notifyDevelopmentTeam(feedback: any): Promise<void> {
    // Implement notification logic (email, Slack, Discord, etc.)
    // For now, just log high-priority items
    if (feedback.severity === 'critical' || feedback.severity === 'high') {
      console.log(`🚨 HIGH PRIORITY FEEDBACK: ${feedback.title}`);
      console.log(`Type: ${feedback.type}, Severity: ${feedback.severity}`);
      console.log(`Description: ${feedback.description}`);
      if (feedback.steps) {
        console.log(`Steps to reproduce: ${feedback.steps}`);
      }
    }
  }
}

// Express route handlers
export const submitFeedbackHandler = async (req: Request, res: Response) => {
  try {
    const result = await FeedbackService.submitFeedback(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const submitUserFeedbackHandler = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // From auth middleware
    const result = await FeedbackService.submitUserFeedback(req.body, userId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFeedbackAnalyticsHandler = async (req: Request, res: Response) => {
  try {
    const analytics = FeedbackService.getFeedbackAnalytics();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};