import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/auth';

// JWT secret with fallback
const JWT_SECRET = process.env.JWT_SECRET || 'mavro-pro-secret-key-development-only';

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        console.log('❌ Token verification failed:', {
          hasPayload: !!decoded,
          type: decoded?.type,
          token: token.substring(0, 20) + '...'
        });
        res.status(403).json({ error: 'Invalid or expired token' });
        return;
      }

      // Ensure we have the correct user format
      req.user = {
        id: decoded.userId,
        email: decoded.email
      };

      next();
    });
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}

export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      // No token provided, continue without authentication
      next();
      return;
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (!err && decoded) {
        req.user = {
          id: decoded.userId,
          email: decoded.email
        };
      }
      // Continue regardless of token validity for optional auth
      next();
    });
  } catch (error) {
    // Continue without authentication on error
    next();
  }
}