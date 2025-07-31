// Authentication middleware for ViVi API routes
import jwt from 'jsonwebtoken';

// Optional authentication - allows both authenticated and demo users
export function optionalAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '') || 
                req.cookies?.authToken || 
                req.session?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mavro-pro-secret');
      req.user = decoded;
    } catch (error) {
      // Invalid token, but we continue for demo users
      console.warn('Invalid token in optionalAuth:', error.message);
    }
  }

  // Always continue, whether authenticated or not
  next();
}

// Required authentication
export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '') || 
                req.cookies?.authToken || 
                req.session?.token;

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mavro-pro-secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// Role-based access control
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}