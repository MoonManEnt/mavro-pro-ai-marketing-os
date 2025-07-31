import type { Request } from 'express';

// Base user type to ensure consistency
export interface AuthenticatedUser {
  id: string;
  email: string;
  username?: string;
  persona?: string;
  mode?: string;
}

// Shared authenticated request interface that doesn't conflict with Express types
export interface AuthenticatedRequest extends Omit<Request, 'user'> {
  user?: AuthenticatedUser;
}

export interface UserSession {
  id: string;
  email: string;
  username?: string;
  persona?: string;
  mode?: string;
}

// Legacy support for existing numeric ID system
export interface LegacyAuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
    persona: string;
    mode: string;
  };
}