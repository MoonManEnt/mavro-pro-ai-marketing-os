# Mavro Pro - Unified AI Marketing OS

## Overview
Mavro Pro is a full-stack AI-powered marketing operating system designed to combine enterprise-grade backend functionality with a polished, persona-driven frontend experience. It serves as a comprehensive marketing management platform offering AI assistance, campaign management, analytics, and advanced data intelligence capabilities. The project's vision is to provide sophisticated business software that is both powerful enough for enterprise boardrooms and intuitive for rapid decision-making, transforming marketing operations with AI. Core focus areas include Reviews Intelligence Hub, Compliance Intelligence Center, and Grio Academy.

## User Preferences
Preferred communication style: Simple, everyday language.
Platform branding: Use only official social media platform logos (no generic icons).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript.
- **Build Tool**: Vite.
- **UI Framework**: Radix UI components with shadcn/ui design system.
- **Styling**: Tailwind CSS with a custom color palette, emphasizing "Executive Command Minimalism" (ultra-clean white foundations with sophisticated gradient overlays, enterprise-grade visual hierarchy, surgical use of color, and micro-interaction sophistication). Key design elements include rounded-3xl architecture, shadow-2xl to shadow-3xl depth, multi-layer gradients, and premium spacing systems.
- **State Management**: React Context API with local storage persistence.
- **Routing**: Wouter for client-side routing.
- **Animation**: Framer Motion for smooth UI interactions.
- **Core Design Principles**: Ultra-clean white foundations, sophisticated gradient overlays, enterprise-grade visual hierarchy, premium typography (font-black, tracking-tight), surgical use of color (functional gradients), and sophisticated micro-interactions (hover scaling, shadow transitions).

### Backend Architecture
- **Runtime**: Node.js with Express.js framework.
- **Language**: TypeScript with ES modules.
- **Database**: PostgreSQL with Drizzle ORM.
- **Database Provider**: Neon serverless PostgreSQL.
- **Session Management**: Connect-pg-simple for PostgreSQL session storage.
- **API Design**: RESTful API with Express routes, including comprehensive routes for ViVi AI interactions, campaign management, analytics, and content management. Authentication middleware is implemented for secure access.

### Core System Features
- **Authentication System**: JWT token management, user session management with PostgreSQL, token verification/refresh, and secure logout.
- **ViVi AI Integration**: Comprehensive AI system with real OpenAI (GPT-4) integration for chat, content generation, and analytics. It includes dynamic persona creation, an extension engine for campaign optimization and geo-performance, and a real-time notification system.
- **Campaign Management**: Full suite for campaign creation, management, A/B testing, and performance tracking.
- **Analytics & Reporting**: "FourSIGHT v2 Analytics Hub" offering advanced metrics, KPI tracking, and AI-driven recommendations.

- **Scheduler**: Google Calendar-style scheduler for post planning with platform-specific color coding and advanced filtering.
- **Persona System**: Dynamic persona management with industry-specific content, analytics, and AI agents.
- **Loading Transition System**: Professional 6-second loading screen with animation sequence and personalized messages.
- **Reviews Management**: Complete Reviews Intelligence Hub with official platform branding (Google, Facebook, Instagram, TikTok, YouTube, LinkedIn, X, Yelp) using authentic social media logos from react-icons library.
- **Compliance Intelligence Center**: Full compliance monitoring system with OAuth health monitoring and platform-specific integrations using official brand logos.
- **ViVi Store**: An app-store-like marketplace for AI-powered marketing tools and "Agent Packs."
- **GROW Tab (KPI Command Center)**: Real-time KPI dashboard with strategy optimization and deployment.
- **Navigation System**: Multi-page navigation, customizable menu with drag-and-drop, and dual dashboard system for demo vs. authenticated users.
- **Mobile Optimization**: Comprehensive mobile-responsive design system across key features.

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connectivity.
- **ORM**: `drizzle-orm` with `drizzle-zod` for type-safe database operations.
- **UI Components**: Radix UI component library.
- **Animation**: Framer Motion.
- **Data Fetching**: TanStack React Query.
- **Form Handling**: React Hook Form with Zod validation.
- **Social Media OAuth**: Integrated with Instagram, Facebook, LinkedIn, X (Twitter), TikTok, YouTube, Pinterest, and Snapchat.
- **AI**: OpenAI API (GPT-4o).

### Development Tools
- **TypeScript**: For full type safety.
- **ESBuild**: For fast bundling.
- **Vite**: For development server with hot module replacement.
- **Tailwind CSS**: Utility-first CSS framework.
- **Session Management**: `connect-pg-simple`.
- **Authentication**: `bcrypt` for password hashing, `jsonwebtoken` for JWT tokens.
- **File Uploads**: `multer` (for production deployment).