import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';
import { storage } from '../storage';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const payload = verifyToken(token);
  if (!payload || payload.type !== 'access') {
    console.error('❌ Token verification failed:', { hasPayload: !!payload, type: payload?.type, token: token?.substring(0, 20) + '...' });
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  // Verify user still exists
  const user = await storage.getUser(payload.userId);
  if (!user) {
    return res.status(403).json({ error: 'User not found' });
  }

  req.user = {
    id: user.id,
    email: user.email
  };

  next();
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    const payload = verifyToken(token);
    if (payload && payload.type === 'access') {
      const user = await storage.getUser(payload.userId);
      if (user) {
        req.user = {
          id: user.id,
          email: user.email
        };
      }
    }
  }

  next();
};