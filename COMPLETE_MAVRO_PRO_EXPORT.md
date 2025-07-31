# Mavro Pro - Complete Codebase Export
*Generated: January 28, 2025*

## 🚀 Project Overview

Mavro Pro is a comprehensive AI-powered Marketing Operating System built with React, TypeScript, and advanced ViVi AI integration. This export contains the complete codebase including all UI components, UX systems, ViVi AI modules, and supporting infrastructure.

## 📋 Table of Contents

1. [Project Architecture](#project-architecture)
2. [Core Frontend Components](#core-frontend-components)
3. [ViVi AI System](#vivi-ai-system)
4. [Settings & Configuration](#settings--configuration)
5. [Notification System](#notification-system)
6. [Backend & API](#backend--api)
7. [Database Schema](#database-schema)
8. [Build & Deployment](#build--deployment)
9. [Getting Started](#getting-started)

---

## 🏗️ Project Architecture

### Frontend Structure
```
client/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Main application pages
│   ├── contexts/          # React contexts for state management
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   └── assets/            # Static assets
```

### Backend Structure
```
server/
├── routes.ts              # API endpoints
├── storage.ts             # Database interface
├── auth.ts                # Authentication middleware
├── modules/               # ViVi AI modules
└── vite.ts                # Development server
```

### Key Technologies
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, PostgreSQL, Drizzle ORM
- **AI Integration**: OpenAI GPT-4, Custom ViVi Engine
- **Authentication**: JWT, bcrypt, session management
- **UI Framework**: shadcn/ui, Radix UI, Lucide icons

---

## 🎨 Core Frontend Components

The application follows the "Executive Command Minimalism" design system with sophisticated gradients, rounded-3xl architecture, and premium micro-interactions.

### Main Dashboard Components
- **ExactMavroPlusDashboard.tsx** - Main application hub
- **PlanTab.tsx** - Content planning and creation
- **TrackTab.tsx** - Analytics and performance tracking
- **GrowTab.tsx** - Growth opportunities and KPIs

### Feature Pages
- **CampaignsPage.tsx** - Campaign management
- **ReportsPage.tsx** - FourSIGHT analytics
- **SettingsPage.tsx** - Comprehensive settings control
- **GeoSmartDashboard.tsx** - Geographic intelligence
- **ViViStorePage.tsx** - AI agent marketplace

### UI Component Library
All components follow Executive Command Minimalism design principles:
- Ultra-clean white foundations with gradient overlays
- Rounded-3xl architecture for premium feel
- Shadow-2xl to shadow-3xl depth systems
- Premium typography with font-black weights
- Micro-interactions with hover:scale-[1.02] effects

---

## 🤖 ViVi AI System

### Core ViVi Components
1. **ViViChatWidget.tsx** - Real-time AI chat interface
2. **ViViNotificationEngine.ts** - Intelligent notification system
3. **ViViNotificationPanel.tsx** - Floating notification interface

### ViVi Modules
Located in `server/modules/`:
- **ViViCampaignExtensionEngine.js** - Campaign optimization
- **GeoPerformanceEngine.js** - Location-based analytics
- **ROIForecastEngine.ts** - Revenue projections
- **AutoPilotScheduler.ts** - Automated content planning

### AI Integration Features
- Real-time chat with GPT-4 integration
- Persona-specific AI responses
- Campaign optimization recommendations
- Content generation across platforms
- Intelligent notification system

---

## ⚙️ Settings & Configuration

### Settings System
The settings system provides centralized control over all Mavro OS features:

#### SettingsContext.tsx
- Global state management for all settings
- Real-time save functionality with loading states
- localStorage persistence
- Unsaved changes detection

#### Settings Components
1. **AppearanceSettingsCard.tsx** - 8 premium themes with mode controls
2. **FeatureTogglesCard.tsx** - Comprehensive feature management
3. **IntegrationsCard.tsx** - Social media platform connections
4. **BillingSettingsCard.tsx** - Subscription and usage management

#### Theme System
8 premium themes available:
- Corporate Navy
- Sunset Gradient
- Forest Dawn
- Ocean Breeze
- Purple Haze
- Warm Autumn
- Cool Mint
- Classic Monochrome

---

## 🔔 Notification System (Sprint 25)

### Real-Time Notification Engine
The ViVi Notification Engine provides intelligent, real-time alerts for all platform activities:

#### Core Components
1. **ViViNotificationEngine.ts**
   - Event-driven notification system
   - Type-based categorization (campaign, post, crm, trend)
   - Read/unread state management
   - Real-time event dispatching

2. **ViViNotificationPanel.tsx**
   - Floating bell icon with notification badge
   - Interactive dropdown panel
   - Mark as read functionality
   - Executive Command Minimalism styling

3. **SimulateNotifications.ts**
   - Demo notification generation
   - Realistic campaign alerts
   - Performance notifications
   - CRM activity updates

#### Notification Types
- **Campaign Alerts**: Budget changes, performance updates
- **Post Notifications**: Publishing confirmations, engagement spikes
- **CRM Updates**: New leads, follow-up reminders
- **Trend Analysis**: Market insights, optimization opportunities

---

## 🔧 Backend & API

### API Endpoints
```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register
GET /api/auth/me

// ViVi AI
POST /api/vivi/chat
POST /api/vivi/generate-content
GET /api/vivi/analytics

// Campaign Management
GET /api/campaigns
POST /api/campaigns
PUT /api/campaigns/:id

// Social Media
POST /api/social/connect
GET /api/social/platforms
```

### Database Integration
- PostgreSQL with Drizzle ORM
- 13 ViVi-specific tables
- Session management with connect-pg-simple
- Real-time data synchronization

---

## 🗄️ Database Schema

### Core Tables
```sql
-- Users and Authentication
Users (id, email, firstName, lastName, username, passwordHash)
Sessions (sid, data, expiresAt)

-- ViVi AI System
UserConnectors (id, userId, platform, accessToken)
ScheduledPosts (id, userId, content, platformId, scheduledTime)
FeatureSettings (id, userId, featureName, isEnabled)
ChatHistories (id, userId, message, response, timestamp)
ContentGenerations (id, userId, prompt, generatedContent)

-- Analytics and Reporting
Reports (id, userId, reportType, data, createdAt)
ActivityLogs (id, userId, action, metadata, timestamp)
CompetitorData (id, userId, competitorName, data)

-- Notifications
PushSubscriptions (id, userId, endpoint, keys)
```

---

## 🚀 Build & Deployment

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Database operations
npm run db:push
npm run db:studio
```

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://...
PGHOST=localhost
PGPORT=5432
PGUSER=...
PGPASSWORD=...
PGDATABASE=...

# OpenAI Integration
OPENAI_API_KEY=sk-...

# JWT Secret
JWT_SECRET=your-secret-key

# Session Management
SESSION_SECRET=your-session-secret
```

---

## 🎯 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- OpenAI API key (optional for full AI features)

### Quick Start
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Initialize database: `npm run db:push`
5. Start development server: `npm run dev`
6. Access at `http://localhost:5000`

### Key Features to Explore
1. **Command Center** - Main dashboard with persona management
2. **Plan Tab** - Content creation with Mavro Magic Studio
3. **Settings** - Theme customization and feature toggles
4. **Notifications** - Real-time ViVi AI alerts
5. **Reports** - Comprehensive analytics dashboard

---

## 📱 Mobile Optimization

The application is fully responsive with mobile-first design:
- Touch-optimized interfaces
- Sliding navigation menus
- Responsive typography scaling
- Mobile-friendly form inputs

---

## 🔒 Security Features

- JWT-based authentication
- bcrypt password hashing
- Session management with expiration
- Input validation with Zod schemas
- CORS protection
- Rate limiting preparation

---

## 🎨 Design System: Executive Command Minimalism

### Core Principles
- **Ultra-clean white foundations** with sophisticated gradient overlays
- **Enterprise-grade visual hierarchy** with premium typography
- **Surgical use of color** - functional gradient purposes
- **Micro-interaction sophistication** - hover scaling, shadow transitions
- **Rounded-3xl architecture** for premium feel
- **Shadow-2xl to shadow-3xl** depth systems

### Color Palette
- **Primary Gradients**: Blue-to-indigo, green-to-emerald, orange-to-amber
- **Typography**: Font-black weights, tracking-tight spacing
- **Animations**: Duration-400 to duration-500 with enhanced easing

---

## 📊 Analytics & Performance

### Built-in Analytics
- User interaction tracking
- Performance metrics monitoring
- Campaign analytics
- Geographic performance data
- ROI forecasting

### Performance Optimizations
- Code splitting with Vite
- Lazy loading for components
- Optimized bundle sizes
- Efficient state management

---

## 🔄 Future Enhancements

### Planned Features
- Advanced AI persona customization
- Enhanced social media integrations
- Real-time collaboration tools
- Advanced analytics dashboards
- Mobile app development

### Technical Roadmap
- Migration to modern architecture
- Enhanced security features
- Performance optimizations
- Expanded AI capabilities

---

## 📞 Support & Documentation

For technical support or questions about the codebase:
1. Review the `replit.md` file for project context
2. Check component documentation in source files
3. Refer to API documentation in `server/routes.ts`
4. Examine database schema in `shared/schema.ts`

---

*This export represents the complete Mavro Pro codebase as of January 28, 2025, including all Sprint 24 and Sprint 25 enhancements.*