# Mavro Pro - Production Deployment Guide

## Overview
This guide will help you convert Mavro Pro from a demo application to a fully functional production system with real user authentication, database persistence, and ViVi AI integration.

## Prerequisites

### 1. Environment Setup
- Node.js 20+ installed
- PostgreSQL database (Neon recommended)
- ViVi AI codebase access
- Social media API keys for integrations

### 2. Required Environment Variables
Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# Session Security
SESSION_SECRET=your-super-secure-session-secret-key-here

# Social Media API Keys
INSTAGRAM_CLIENT_ID=your-instagram-client-id
INSTAGRAM_CLIENT_SECRET=your-instagram-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-api-secret
TWITTER_BEARER_TOKEN=your-twitter-bearer-token
YOUTUBE_API_KEY=your-youtube-api-key
TIKTOK_CLIENT_ID=your-tiktok-client-id
TIKTOK_CLIENT_SECRET=your-tiktok-client-secret
PINTEREST_APP_ID=your-pinterest-app-id
PINTEREST_APP_SECRET=your-pinterest-app-secret
SNAPCHAT_CLIENT_ID=your-snapchat-client-id
SNAPCHAT_CLIENT_SECRET=your-snapchat-client-secret

# ViVi AI Integration
VIVI_API_KEY=your-vivi-ai-api-key
VIVI_API_URL=https://your-vivi-ai-api-endpoint.com
VIVI_WEBHOOK_SECRET=your-vivi-webhook-secret

# Application Configuration
NODE_ENV=production
PORT=5000
```

## Step-by-Step Deployment Process

### Step 1: Database Setup

#### 1.1 Initialize Database Schema
```bash
# Push database schema to PostgreSQL
npm run db:push
```

#### 1.2 Verify Database Connection
```bash
# Test database connection
npm run check
```

### Step 2: Authentication System

#### 2.1 Remove Demo Data
The current system uses `DatabaseStorage` for production and `MemStorage` for development. In production mode, no demo data is loaded.

#### 2.2 Create Admin User
```bash
# Create initial admin user (implement this endpoint if needed)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@mavropro.com",
    "password": "secure-admin-password",
    "confirmPassword": "secure-admin-password",
    "persona": "admin"
  }'
```

### Step 3: ViVi AI Integration

#### 3.1 Upload ViVi Codebase
1. Create a new directory: `server/vivi-ai/`
2. Upload your ViVi AI codebase to this directory
3. Update the ViVi routes in `server/routes/vivi.ts` to use your actual AI system

#### 3.2 Integration Points
Replace the placeholder functions in `server/routes/vivi.ts`:

```typescript
// Replace these placeholder functions with actual ViVi AI calls:
function generateViViResponse(message: string, context: any, persona: string): string {
  // Integrate with your actual ViVi AI system
  return viviAI.generateResponse(message, context, persona);
}

function generateViViContent(data: any, persona: string): any {
  // Integrate with your actual ViVi AI system
  return viviAI.generateContent(data, persona);
}

function generateViViAnalytics(data: any, persona: string): any {
  // Integrate with your actual ViVi AI system
  return viviAI.generateAnalytics(data, persona);
}
```

### Step 4: Social Media API Setup

#### 4.1 Configure OAuth Applications
For each social media platform, create OAuth applications:

1. **Instagram/Facebook**: https://developers.facebook.com/
2. **LinkedIn**: https://www.linkedin.com/developers/
3. **Twitter/X**: https://developer.twitter.com/
4. **YouTube**: https://console.developers.google.com/
5. **TikTok**: https://developers.tiktok.com/
6. **Pinterest**: https://developers.pinterest.com/
7. **Snapchat**: https://kit.snapchat.com/

#### 4.2 Update Redirect URLs
Set redirect URLs to: `https://your-domain.com/auth/callback`

### Step 5: Frontend Updates

#### 5.1 Update Authentication Components
Create login/register components in the frontend:

```typescript
// client/src/components/Auth/LoginForm.tsx
// client/src/components/Auth/RegisterForm.tsx
// client/src/components/Auth/AuthGuard.tsx
```

#### 5.2 Update API Calls
Update all API calls to use authentication headers:

```typescript
// Add authentication to all API calls
const response = await fetch('/api/protected-route', {
  method: 'GET',
  credentials: 'include', // Include session cookie
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Step 6: Production Build

#### 6.1 Build Application
```bash
# Build for production
npm run build
```

#### 6.2 Start Production Server
```bash
# Start production server
npm start
```

## Security Considerations

### 1. Session Management
- Use secure session secrets
- Enable HTTPS in production
- Set secure cookie flags
- Implement session expiration

### 2. API Security
- Rate limiting on all endpoints
- Input validation on all user inputs
- SQL injection prevention (using Drizzle ORM)
- XSS protection

### 3. Social Media APIs
- Store API keys securely
- Implement token refresh mechanisms
- Handle API rate limits gracefully
- Validate all social media data

## Performance Optimizations

### 1. Database Optimization
- Add database indexes for frequently queried fields
- Implement connection pooling
- Use read replicas for analytics queries

### 2. Caching Strategy
- Redis for session storage
- Cache frequently accessed data
- CDN for static assets

### 3. Monitoring
- Application performance monitoring
- Database query monitoring
- API rate limit monitoring
- Error logging and alerting

## Scaling Considerations

### 1. Horizontal Scaling
- Load balancer configuration
- Session storage in Redis
- Database connection pooling

### 2. Microservices Architecture
- Separate ViVi AI service
- Dedicated analytics service
- Social media integration service

## Testing

### 1. Unit Tests
- Authentication middleware tests
- API endpoint tests
- Database operation tests

### 2. Integration Tests
- End-to-end user flows
- Social media integration tests
- ViVi AI integration tests

## Monitoring and Maintenance

### 1. Application Monitoring
- Server performance metrics
- Database performance
- API response times
- Error rates

### 2. Regular Maintenance
- Database backups
- Security updates
- API key rotation
- Log rotation

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check DATABASE_URL format
   - Verify database credentials
   - Test network connectivity

2. **Authentication Problems**
   - Verify SESSION_SECRET is set
   - Check session configuration
   - Test cookie settings

3. **Social Media API Issues**
   - Verify API keys are correct
   - Check API rate limits
   - Test OAuth redirect URLs

4. **ViVi AI Integration Issues**
   - Verify API endpoints are accessible
   - Check authentication tokens
   - Test API response formats

## Support

For technical support during deployment:
1. Check application logs
2. Monitor database queries
3. Review API error responses
4. Test individual components

## Next Steps

After successful deployment:
1. Set up monitoring dashboards
2. Configure automated backups
3. Implement CI/CD pipeline
4. Plan for scaling requirements
5. Create user documentation