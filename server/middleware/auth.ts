import { Request, Response, NextFunction } from 'express';
import { storage } from '../storage';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        persona: string;
        mode: string;
      };
    }
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session?.userId;
    
    if (!userId) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Please log in to access this resource'
      });
    }

    const user = await storage.getUser(userId);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid session',
        message: 'User not found'
      });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      persona: user.persona,
      mode: user.mode
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ 
      error: 'Authentication failed',
      message: 'Internal server error'
    });
  }
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session?.userId;
    
    if (userId) {
      const user = await storage.getUser(userId);
      if (user) {
        req.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          persona: user.persona,
          mode: user.mode
        };
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth error:', error);
    next(); // Continue without authentication
  }
};

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Please log in to access this resource'
      });
    }

    // Check if user has admin role (you can extend the User schema to include roles)
    if (req.user.username !== 'admin') {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        message: 'Admin access required'
      });
    }

    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ 
      error: 'Authorization failed',
      message: 'Internal server error'
    });
  }
};