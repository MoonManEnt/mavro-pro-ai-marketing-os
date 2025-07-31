import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { storage } from '../storage';
import { generateAccessToken, generateRefreshToken, generateSessionToken } from '../auth/jwt';
import { getAuthorizationUrl, exchangeCodeForToken, getUserInfo } from '../auth/providers';
import { authenticateToken } from '../auth/middleware';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = registerSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await storage.createUser({
      email,
      password: hashedPassword,
      firstName: firstName || null,
      lastName: lastName || null,
      username: email.split('@')[0], // Use email prefix as username
      emailVerified: false,
    });

    // Create default workspace
    const workspace = await storage.createWorkspace({
      userId: user.id,
      name: 'My Workspace',
      description: 'Default workspace',
      industry: 'general',
      businessType: 'general',
      isActive: true,
    });

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id, user.email);
    
    // Create session
    const sessionToken = generateSessionToken();
    await storage.createSession({
      userId: user.id,
      sessionToken,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        emailVerified: user.emailVerified,
        trialEndsAt: user.trialEndsAt,
        subscription: user.subscription,
      },
      tokens: {
        accessToken,
        refreshToken,
        sessionToken,
      },
      workspace: {
        id: workspace.id,
        name: workspace.name,
        industry: workspace.industry,
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    // Find user
    const user = await storage.getUserByEmail(email);
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get user's workspaces
    const workspaces = await storage.getWorkspacesByUserId(user.id);
    const defaultWorkspace = workspaces[0];

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id, user.email);
    
    // Create session
    const sessionToken = generateSessionToken();
    await storage.createSession({
      userId: user.id,
      sessionToken,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        emailVerified: user.emailVerified,
        trialEndsAt: user.trialEndsAt,
        onboardingCompleted: user.onboardingCompleted,
        subscription: user.subscription,
      },
      tokens: {
        accessToken,
        refreshToken,
        sessionToken,
      },
      workspace: defaultWorkspace ? {
        id: defaultWorkspace.id,
        name: defaultWorkspace.name,
        industry: defaultWorkspace.industry,
      } : null
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// OAuth authorization endpoint (demo mode)
router.get('/oauth/:provider', async (req, res) => {
  try {
    const { provider } = req.params;
    
    // Simulate OAuth success for demo purposes
    const tokenData = await exchangeCodeForToken(provider, 'demo_code');
    const userInfo = await getUserInfo(provider, tokenData.access_token);

    // Find or create user
    let user = await storage.getUserByEmail(userInfo.email);
    
    if (!user) {
      // Create new user
      user = await storage.createUser({
        email: userInfo.email,
        firstName: userInfo.given_name || userInfo.name?.firstName || userInfo.name?.split?.(' ')?.[0] || null,
        lastName: userInfo.family_name || userInfo.name?.lastName || userInfo.name?.split?.(' ')?.slice(1)?.join(' ') || null,
        username: userInfo.login || userInfo.email.split('@')[0],
        profileImageUrl: userInfo.picture || userInfo.avatar_url || null,
        emailVerified: true,
      });

      // Create default workspace with required businessType
      await storage.createWorkspace({
        userId: user.id,
        name: 'My Workspace',
        description: 'Default workspace',
        industry: 'general',
        businessType: 'general',
        isActive: true,
      });
    }

    // Store or update OAuth account
    console.log('OAuth userInfo:', userInfo);
    console.log('Attempting to create OAuth account with providerAccountId:', userInfo.id || userInfo.sub || 'demo_user_id');
    
    await storage.upsertOAuthAccount({
      userId: user.id,
      provider,
      providerAccountId: userInfo.id || userInfo.sub || 'demo_user_id',
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000) : null,
    });

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id, user.email);
    
    // Skip session creation for demo mode
    const sessionToken = generateSessionToken();
    // await storage.createSession({
    //   userId: user.id,
    //   sessionToken,
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    // });

    // Redirect to frontend with tokens
    const baseUrl = process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
    const redirectUrl = `${baseUrl}/?token=${encodeURIComponent(accessToken)}&refresh=${encodeURIComponent(refreshToken)}&session=${encodeURIComponent(sessionToken)}`;
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth authorization error:', error);
    res.status(500).json({ error: 'OAuth authentication failed' });
  }
});

// OAuth callback endpoint (demo mode with simulated OAuth)
router.get('/oauth/:provider/callback', async (req, res) => {
  try {
    const { provider } = req.params;
    
    // Simulate OAuth success for demo purposes
    const tokenData = await exchangeCodeForToken(provider, 'demo_code');
    const userInfo = await getUserInfo(provider, tokenData.access_token);

    // Find or create user
    let user = await storage.getUserByEmail(userInfo.email);
    
    if (!user) {
      // Create new user
      user = await storage.createUser({
        email: userInfo.email,
        firstName: userInfo.given_name || userInfo.name?.firstName || userInfo.name?.split?.(' ')?.[0] || null,
        lastName: userInfo.family_name || userInfo.name?.lastName || userInfo.name?.split?.(' ')?.slice(1)?.join(' ') || null,
        username: userInfo.login || userInfo.email.split('@')[0],
        profileImageUrl: userInfo.picture || userInfo.avatar_url || null,
        emailVerified: true,
      });

      // Create default workspace
      await storage.createWorkspace({
        userId: user.id,
        name: 'My Workspace',
        description: 'Default workspace',
        industry: 'general',
        isActive: true,
      });
    }

    // Store or update OAuth account
    await storage.upsertOAuthAccount({
      userId: user.id,
      provider,
      providerUserId: userInfo.id || userInfo.sub,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000) : null,
    });

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id, user.email);
    
    // Create session
    const sessionToken = generateSessionToken();
    await storage.createSession({
      userId: user.id,
      sessionToken,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    // Redirect to frontend with tokens
    const baseUrl = process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
    const redirectUrl = `${baseUrl}/?token=${encodeURIComponent(accessToken)}&refresh=${encodeURIComponent(refreshToken)}&session=${encodeURIComponent(sessionToken)}`;
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'OAuth authentication failed' });
  }
});

// Get current user (both /me and /user routes for compatibility)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await storage.getUser(req.user!.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const workspaces = await storage.getWorkspacesByUserId(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        profileImageUrl: user.profileImageUrl,
        emailVerified: user.emailVerified,
        trialEndsAt: user.trialEndsAt,
        subscription: user.subscription,
      },
      workspaces: workspaces.map(w => ({
        id: w.id,
        name: w.name,
        industry: w.industry,
        isActive: w.isActive,
      }))
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const sessionToken = req.headers['x-session-token'] as string;
    if (sessionToken) {
      await storage.deleteSession(sessionToken);
    }
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Alias for /me route - for frontend compatibility
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await storage.getUser(req.user!.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const workspaces = await storage.getWorkspacesByUserId(user.id);

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      profileImageUrl: user.profileImageUrl,
      emailVerified: user.emailVerified,
      trialEndsAt: user.trialEndsAt,
      subscription: user.subscription,
      workspaces: workspaces.map(w => ({
        id: w.id,
        name: w.name,
        industry: w.industry,
        website: w.website,
        description: w.description,
        isActive: w.isActive,
      }))
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
const profileUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  workspace: z.object({
    name: z.string().optional(),
    website: z.string().url().optional().or(z.literal('')),
    description: z.string().optional(),
    phone: z.string().optional(),
    industry: z.string().optional(),
  }).optional(),
});

router.patch('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const updateData = profileUpdateSchema.parse(req.body);
    
    // Update user info if provided
    if (updateData.firstName || updateData.lastName || updateData.email) {
      await storage.updateUser(userId, {
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        email: updateData.email,
      });
    }

    // Update workspace if provided
    if (updateData.workspace) {
      const workspaces = await storage.getWorkspacesByUserId(userId);
      const primaryWorkspace = workspaces[0]; // Get the first/primary workspace
      
      if (primaryWorkspace) {
        await storage.updateWorkspace(primaryWorkspace.id, {
          name: updateData.workspace.name,
          website: updateData.workspace.website,
          description: updateData.workspace.description,
          industry: updateData.workspace.industry,
        });
      }
    }

    // Return updated user data
    const updatedUser = await storage.getUser(userId);
    const updatedWorkspaces = await storage.getWorkspacesByUserId(userId);

    res.json({
      success: true,
      user: {
        id: updatedUser!.id,
        email: updatedUser!.email,
        firstName: updatedUser!.firstName,
        lastName: updatedUser!.lastName,
        username: updatedUser!.username,
        profileImageUrl: updatedUser!.profileImageUrl,
        emailVerified: updatedUser!.emailVerified,
      },
      workspaces: updatedWorkspaces.map(w => ({
        id: w.id,
        name: w.name,
        industry: w.industry,
        website: w.website,
        description: w.description,
        isActive: w.isActive,
      }))
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Mark onboarding as completed
router.post('/complete-onboarding', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const updatedUser = await storage.markOnboardingCompleted(userId);
    res.json({ 
      success: true,
      message: 'Onboarding completed successfully',
      user: updatedUser 
    });
  } catch (error) {
    console.error('Complete onboarding error:', error);
    res.status(500).json({ error: 'Failed to complete onboarding' });
  }
});

export default router;