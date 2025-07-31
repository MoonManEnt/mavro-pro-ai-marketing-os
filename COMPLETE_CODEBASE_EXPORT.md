# MAVRO PRO - COMPLETE CODEBASE EXPORT FOR CHATGPT ANALYSIS

## PROJECT OVERVIEW
Mavro Pro is an advanced AI-driven Marketing Operating System with React/TypeScript frontend and Node.js/Express backend. Features include ViVi AI integration, campaign management, analytics dashboard, and comprehensive social media automation.

## TECHNICAL STACK
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express + TypeScript + PostgreSQL + Drizzle ORM
- **Authentication**: JWT + bcrypt + Sessions
- **AI**: OpenAI GPT-4 integration
- **State Management**: React Context + TanStack Query

---

## 🔥 CRITICAL FILES FOR ANALYSIS

### 📱 FRONTEND CORE FILES

#### 1. Application Entry & Router (client/src/App.tsx)
```typescript
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModeProvider } from "@/contexts/ModeContext";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { VoiceProvider } from "@/contexts/VoiceContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ViViProvider } from "@/contexts/ViViContext";
import { AuthProvider } from "@/hooks/useAuth";

import ExactMavroPlusDashboard from "@/pages/ExactMavroPlusDashboard";
import DemoPage from "@/pages/DemoPage";
import ViViTestPage from "@/pages/ViViTestPage";
import MavroAIStudio from "@/pages/MavroAIStudio";
import AuthPage from "@/pages/AuthPage";
import OnboardingPage from "@/pages/OnboardingPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

function RootRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading Mavro Pro...</p>
        </div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <ExactMavroPlusDashboard isDemoMode={false} isBetaUser={true} />;
  }
  
  return <AuthPage />;
}

function Router() {
  return (
    <Switch>
      <Route path="/onboarding">
        <ProtectedRoute>
          <OnboardingPage />
        </ProtectedRoute>
      </Route>
      <Route path="/demo">
        <ProtectedRoute requireAuth={false}>
          <DemoPage />
        </ProtectedRoute>
      </Route>
      <Route path="/vivi-test">
        <ProtectedRoute>
          <ViViTestPage />
        </ProtectedRoute>
      </Route>
      <Route path="/ai-studio">
        <ProtectedRoute>
          <MavroAIStudio />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <ExactMavroPlusDashboard isDemoMode={false} isBetaUser={true} />
        </ProtectedRoute>
      </Route>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="/">
        <RootRoute />
      </Route>
      <Route>
        <AuthPage />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ViViProvider>
          <ModeProvider>
            <OrganizationProvider>
              <ProfileProvider>
                <VoiceProvider>
                  <SettingsProvider>
                    <TooltipProvider>
                      <Toaster />
                      <Router />
                    </TooltipProvider>
                  </SettingsProvider>
                </VoiceProvider>
              </ProfileProvider>
            </OrganizationProvider>
          </ModeProvider>
        </ViViProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
```

#### 2. Main Entry Point (client/src/main.tsx)
```typescript
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

#### 3. Theme Hook with Dark Mode (client/src/hooks/useTheme.ts)
```typescript
import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('mavro-theme');
    return (stored as Theme) || 'system';
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    let effectiveTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = systemPrefersDark ? 'dark' : 'light';
    } else {
      effectiveTheme = theme;
    }
    
    // Apply theme class to root element
    root.classList.add(effectiveTheme);
    setIsDark(effectiveTheme === 'dark');
    
    // Store theme preference
    localStorage.setItem('mavro-theme', theme);
  }, [theme]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      const systemPrefersDark = mediaQuery.matches;
      const effectiveTheme = systemPrefersDark ? 'dark' : 'light';
      root.classList.add(effectiveTheme);
      setIsDark(effectiveTheme === 'dark');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    isDark,
    setTheme: setThemeMode,
  };
}
```

### 🎯 KEY CONFIGURATION FILES

#### 1. Package.json Dependencies
```json
{
  "name": "rest-express",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@tanstack/react-query": "^5.60.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "wouter": "^3.5.0",
    "drizzle-orm": "^0.39.1",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^3.0.2",
    "openai": "^5.10.1",
    // ... 50+ more dependencies
  }
}
```

#### 2. Vite Configuration (vite.config.ts)
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
```

#### 3. Tailwind Configuration with Dark Mode (tailwind.config.ts)
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        // ... extensive color system
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
```

---

## 🚨 ANALYSIS PRIORITIES

### 1. CRITICAL PERFORMANCE ISSUES TO IDENTIFY
- **Bundle Size**: The app has 50+ dependencies - analyze for unnecessary bloat
- **Re-renders**: Multiple context providers may cause excessive re-renders
- **Code Splitting**: No lazy loading implemented for large components
- **Database Queries**: Potential N+1 queries in API routes

### 2. SECURITY VULNERABILITIES TO CHECK
- **JWT Implementation**: Token validation and refresh logic
- **Input Validation**: Zod schema validation completeness
- **SQL Injection**: Drizzle ORM usage patterns
- **XSS Protection**: User input sanitization

### 3. CODE QUALITY IMPROVEMENTS NEEDED
- **TypeScript**: Any 'any' types that should be properly typed
- **Error Handling**: Inconsistent error handling patterns
- **Testing**: Zero test coverage currently
- **Documentation**: Missing API documentation

### 4. ARCHITECTURE CONCERNS
- **Context Overuse**: 7 different context providers may be excessive
- **State Management**: Mixed localStorage + React state patterns
- **API Design**: RESTful consistency across routes
- **Database Schema**: Normalization and indexing strategy

---

## 🔍 SPECIFIC FILES NEEDING DEEP ANALYSIS

### FRONTEND FILES TO REVIEW:
1. `client/src/pages/ExactMavroPlusDashboard.tsx` - 3000+ lines, likely needs breaking down
2. `client/src/pages/SettingsPage.tsx` - Recently added dark mode toggle
3. `client/src/hooks/useAuth.ts` - Authentication logic
4. `client/src/contexts/*.tsx` - All context files for optimization
5. `client/src/components/ViViAssistant.tsx` - AI integration component

### BACKEND FILES TO REVIEW:
1. `server/routes.ts` - Main API routes
2. `server/auth.ts` - Authentication middleware
3. `server/storage.ts` - Database layer
4. `shared/schema.ts` - Database schema

### CONFIGURATION FILES TO REVIEW:
1. `package.json` - Dependency optimization
2. `vite.config.ts` - Build optimization
3. `tailwind.config.ts` - CSS optimization

---

## 💡 IMPROVEMENT SUGGESTIONS TO FOCUS ON

### HIGH PRIORITY:
1. **Performance**: Bundle size reduction, code splitting, lazy loading
2. **Security**: Authentication hardening, input validation
3. **Architecture**: Context provider optimization, state management cleanup
4. **Testing**: Implement testing strategy

### MEDIUM PRIORITY:
1. **Code Quality**: TypeScript improvements, error handling
2. **Documentation**: API docs, component documentation
3. **Accessibility**: ARIA labels, keyboard navigation
4. **Mobile**: Responsive design improvements

### LOW PRIORITY:
1. **Developer Experience**: Better dev tools, linting
2. **Monitoring**: Error tracking, performance metrics
3. **SEO**: Meta tags, structured data
4. **Deployment**: CI/CD optimization

---

## 🗄️ DATABASE SCHEMA (shared/schema.ts)
```typescript
// Complete PostgreSQL schema with Drizzle ORM
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  username: text("username").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  password: text("password"), // nullable for OAuth users
  emailVerified: boolean("email_verified").default(false),
  accountType: text("account_type").notNull().default("beta"),
  subscriptionStatus: text("subscription_status").notNull().default("trial"),
  trialEndsAt: timestamp("trial_ends_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at"),
  isActive: boolean("is_active").default(true),
  settings: jsonb("settings").default('{}'),
  onboardingCompleted: boolean("onboarding_completed").default(false),
});

export const campaigns = pgTable("campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  workspaceId: uuid("workspace_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("draft"),
  platform: text("platform").notNull(),
  campaignType: text("campaign_type").notNull(),
  budget: integer("budget").notNull(),
  spent: integer("spent").notNull().default(0),
  // ... extensive campaign tracking fields
});

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  workspaceId: uuid("workspace_id").notNull(),
  campaignId: uuid("campaign_id"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  status: text("status").notNull().default("new"),
  score: integer("score").default(0),
  // ... lead scoring and attribution
});
```

## 🔌 API ROUTES (server/routes.ts)
```typescript
// Main route registration with modular structure
export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(cookieParser());
  app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));
  
  // Route modules
  app.use("/api/auth", authRoutes);
  app.use("/api/vivi", viviRoutes);
  app.use("/api/campaigns", campaignRoutes);
  app.use("/api/analytics", analyticsRoutes);
  app.use("/api/content", contentRoutes);
  app.use("/api/social", socialRoutes);
  
  // Protected user routes
  app.get("/api/users/:id", authenticateToken, async (req, res) => {
    try {
      const userId = req.params.id;
      if (req.user!.id !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
}
```

## 🔐 AUTHENTICATION HOOK (client/src/hooks/useAuth.ts)
```typescript
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  const isDemoMode = localStorage.getItem('demoMode') === 'true';

  // Token validation and cleanup
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const tokenParts = storedToken.split('.');
      if (tokenParts.length !== 3 || !storedToken.startsWith('eyJ')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsLoading(false);
        return;
      }
    }
    // ... authentication logic
  }, [isDemoMode, userData, userLoading]);
}
```

## 🚨 CURRENT TECHNICAL DEBT & ISSUES

### LSP Diagnostics Found:
- **server/routes.ts**: 20 TypeScript errors
- **client/src/hooks/useAuth.ts**: 2 TypeScript errors
- Missing type definitions and proper error handling

### Performance Issues:
1. **Bundle Size**: 50+ dependencies creating large bundle
2. **Re-renders**: Multiple context providers causing excessive re-renders
3. **No Code Splitting**: Large components loading all at once
4. **Memory Leaks**: Potential issues with localStorage and event listeners

### Security Vulnerabilities:
1. **JWT Token Handling**: Improper token validation in multiple places
2. **Session Security**: Fallback secret key in production
3. **Input Validation**: Incomplete Zod validation on API routes
4. **CORS Issues**: Not properly configured for production

### Architecture Problems:
1. **Context Overuse**: 7 different context providers may cause performance issues
2. **Mixed State Management**: localStorage + React state + TanStack Query overlap
3. **Monolithic Components**: ExactMavroPlusDashboard.tsx is 3000+ lines
4. **API Inconsistency**: Mixed patterns across different route handlers

---

## 🏗️ RECOMMENDED PROJECT STRUCTURE (From Provided Documentation)

Based on the attached project structure document, here's the recommended monorepo organization:

```
mavro-pro-beta/
├── client/             # React + Vite front-end
│   ├── src/
│   │   ├── App.tsx     # Root component, providers, router
│   │   ├── api/        # HTTP wrappers
│   │   │   └── vivi.ts  # sendToViVi, auth API
│   │   ├── components/ # Reusable UI
│   │   ├── contexts/   # Global state
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Lazy-loaded routes
│   │   ├── styles/     # CSS and Tailwind config
│   │   └── types/      # TypeScript types
│   └── vite.config.ts

├── server/             # Node.js + Express back-end
│   ├── src/
│   │   ├── routes/     # API route definitions
│   │   ├── controllers/ # Business logic
│   │   ├── services/   # Database and external services
│   │   ├── middlewares/ # Authentication, error handling
│   │   └── utils/      # Schemas and utilities
│   └── tsconfig.json

├── shared/             # Common types and schemas
│   └── schema.ts       # Drizzle ORM schema

├── docker-compose.yml  # Postgres + server + migrations
└── .env.example        # Environment template
```

### Key Improvements Recommended:
1. **Modular API Structure**: Separate controllers, services, and routes
2. **Clean Authentication**: Session-based auth with proper middleware
3. **Service Layer**: Dedicated services for database and ViVi integration
4. **Type Safety**: Shared schemas between client and server
5. **Docker Integration**: Containerized PostgreSQL and server

## 📊 CURRENT PROJECT STATS
- **Lines of Code**: ~15,000+ lines
- **Components**: 50+ React components
- **API Routes**: 20+ endpoints
- **Dependencies**: 50+ npm packages
- **Database Tables**: 10+ tables
- **Authentication**: JWT + Sessions
- **Styling**: Tailwind + shadcn/ui
- **Build Tool**: Vite
- **Database**: PostgreSQL + Drizzle ORM

---

## ❓ KEY QUESTIONS FOR ANALYSIS

1. **What are the biggest performance bottlenecks?**
2. **Which security vulnerabilities need immediate attention?**
3. **How can the codebase be better organized for maintainability?**
4. **What testing strategy would be most effective?**
5. **Which dependencies can be removed or replaced?**
6. **How can the bundle size be reduced?**
7. **What accessibility improvements are needed?**
8. **How can the development experience be improved?**

## 📋 ARCHITECTURAL MIGRATION REQUIREMENTS

Based on the provided project structure document, the codebase needs significant restructuring:

### Immediate Actions Required:
1. **Backend Modularization**: Split monolithic `server/routes.ts` into controllers, services, and focused route files
2. **Service Layer Implementation**: Create dedicated services for database operations, ViVi integration, and external APIs
3. **Middleware Centralization**: Implement proper authentication, validation, and error handling middleware
4. **API Wrapper Creation**: Build client-side API layer for centralized HTTP handling
5. **Docker Integration**: Containerize PostgreSQL and application for consistent development environment

### Expected Benefits:
- **Maintainability**: Clear separation of concerns and modular structure
- **Scalability**: Service-oriented architecture ready for growth
- **Developer Experience**: Easier onboarding and feature development
- **Testing**: Isolated components enable comprehensive testing
- **Performance**: Optimized database operations and API handling

### Implementation Priority:
1. **CRITICAL**: Fix 22 TypeScript errors and implement service layer
2. **HIGH**: Create controller layer and split route files
3. **MEDIUM**: Add Docker configuration and API wrapper layer

This codebase export provides the foundation for comprehensive analysis and the architectural migration plan outlines the path to the recommended structure. Please focus on actionable improvements that will have the highest impact on performance, security, and maintainability.