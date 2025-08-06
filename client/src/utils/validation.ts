import { z } from 'zod';

// User validation schemas
export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  photoURL: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Workspace validation schemas
export const workspaceSchema = z.object({
  name: z.string().min(2, 'Workspace name must be at least 2 characters'),
  businessType: z.string().min(1, 'Business type is required'),
  industry: z.string().min(1, 'Industry is required'),
  website: z.string().url().optional(),
  description: z.string().optional(),
  logo: z.string().url().optional(),
});

// Campaign validation schemas
export const campaignSchema = z.object({
  name: z.string().min(2, 'Campaign name must be at least 2 characters'),
  description: z.string().optional(),
  status: z.enum(['draft', 'active', 'paused', 'completed', 'archived']),
  platform: z.string().min(1, 'Platform is required'),
  campaignType: z.string().min(1, 'Campaign type is required'),
  budget: z.number().min(1, 'Budget must be at least 1'),
  currency: z.string().default('USD'),
  targetAudience: z.record(z.any()).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

// Lead validation schemas
export const leadSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'opportunity', 'won', 'lost']),
  source: z.string().min(1, 'Source is required'),
  medium: z.string().optional(),
  campaign: z.string().optional(),
  estimatedValue: z.number().min(0).optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Content validation schemas
export const contentSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  contentType: z.string().min(1, 'Content type is required'),
  platform: z.string().min(1, 'Platform is required'),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']),
  scheduledFor: z.date().optional(),
  mediaUrls: z.array(z.string().url()).optional(),
  hashtags: z.array(z.string()).optional(),
  mentions: z.array(z.string()).optional(),
  targetAudience: z.record(z.any()).optional(),
});

// Analytics validation schemas
export const analyticsSchema = z.object({
  metric: z.string().min(1, 'Metric is required'),
  category: z.string().min(1, 'Category is required'),
  value: z.number(),
  period: z.string().min(1, 'Period is required'),
  dateRange: z.string().min(1, 'Date range is required'),
  platform: z.string().optional(),
  audience: z.string().optional(),
  contentType: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

// Validation helper functions
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        errors: error.errors.map(err => err.message) 
      };
    }
    return { success: false, errors: ['Validation failed'] };
  }
};

export const validateField = <T>(schema: z.ZodSchema<T>, value: unknown): { success: true; data: T } | { success: false; error: string } => {
  try {
    const validatedData = schema.parse(value);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Invalid field' };
    }
    return { success: false, error: 'Validation failed' };
  }
};

// Type exports
export type UserFormData = z.infer<typeof userSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type WorkspaceFormData = z.infer<typeof workspaceSchema>;
export type CampaignFormData = z.infer<typeof campaignSchema>;
export type LeadFormData = z.infer<typeof leadSchema>;
export type ContentFormData = z.infer<typeof contentSchema>;
export type AnalyticsFormData = z.infer<typeof analyticsSchema>;
