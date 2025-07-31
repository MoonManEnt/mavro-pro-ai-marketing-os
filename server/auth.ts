import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { db } from "./db";
import { users, sessions, type User, type InsertUser } from "@shared/schema";
import { eq, and } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET || "mavro-pro-jwt-secret-change-in-production";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface AuthenticatedRequest extends Request {
  user?: User;
  userId?: string;
}

export class AuthService {
  // Hash password for storage
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  // Verify password against hash
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Generate JWT token
  static generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  }

  // Verify JWT token
  static verifyToken(token: string): { userId: string } | null {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
      return null;
    }
  }

  // Register new user
  static async register(userData: InsertUser & { password: string }): Promise<{ user: User; token: string }> {
    try {
      // Check if user already exists
      const existingUser = await db.select().from(users).where(eq(users.email, userData.email)).limit(1);
      if (existingUser.length > 0) {
        throw new Error("User already exists with this email");
      }

      // Hash password
      const hashedPassword = await this.hashPassword(userData.password);

      // Create user
      const [newUser] = await db.insert(users).values({
        ...userData,
        password: hashedPassword,
        emailVerified: false,
        accountType: "beta",
        subscriptionStatus: "trial",
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
        isActive: true,
        onboardingCompleted: false,
      }).returning();

      // Generate token
      const token = this.generateToken(newUser.id);

      // Create session
      await this.createSession(newUser.id, token);

      return { user: newUser, token };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  // Login user
  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      // Find user by email
      const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Verify password
      if (!user.password || !(await this.verifyPassword(password, user.password))) {
        throw new Error("Invalid email or password");
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error("Account is deactivated");
      }

      // Generate token
      const token = this.generateToken(user.id);

      // Create session
      await this.createSession(user.id, token);

      // Update last login
      await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));

      return { user, token };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Create session
  static async createSession(userId: string, sessionToken: string): Promise<void> {
    await db.insert(sessions).values({
      userId,
      sessionToken,
      expires: new Date(Date.now() + SESSION_DURATION),
    });
  }

  // Get user by token
  static async getUserByToken(token: string): Promise<User | null> {
    try {
      // Verify token
      const payload = this.verifyToken(token);
      if (!payload) return null;

      // Check session exists and not expired
      const [session] = await db.select().from(sessions)
        .where(and(
          eq(sessions.sessionToken, token),
          eq(sessions.userId, payload.userId)
        )).limit(1);

      if (!session || session.expires < new Date()) {
        return null;
      }

      // Get user
      const [user] = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
      return user || null;
    } catch {
      return null;
    }
  }

  // Logout user
  static async logout(token: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.sessionToken, token));
  }

  // Update user profile
  static async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    const [updatedUser] = await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    
    return updatedUser;
  }

  // Complete onboarding
  static async completeOnboarding(userId: string): Promise<void> {
    await db.update(users)
      .set({ onboardingCompleted: true, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }
}

// Authentication middleware
export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No valid authentication token provided" });
    }

    const token = authHeader.substring(7);
    const user = await AuthService.getUserByToken(token);
    
    if (!user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = user;
    req.userId = user.id;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Optional authentication (for endpoints that work with or without auth)
export const optionalAuthenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const user = await AuthService.getUserByToken(token);
      if (user) {
        req.user = user;
        req.userId = user.id;
      }
    }
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};