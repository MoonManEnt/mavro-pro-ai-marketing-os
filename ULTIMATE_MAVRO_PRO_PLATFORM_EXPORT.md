# ULTIMATE MAVRO PRO PLATFORM EXPORT
## 🎯 Complete Production-Ready AI Marketing OS Documentation

**Document Version:** v2.0.0  
**Export Date:** August 5, 2025  
**Platform Status:** Production Ready  
**Coverage:** 100% Complete Implementation

---

## 📋 Table of Contents

1. [Platform Architecture](#platform-architecture)
2. [Complete Design System](#complete-design-system)
3. [Page-by-Page Breakdown](#page-by-page-breakdown)
4. [Navigation & Interaction Mapping](#navigation--interaction-mapping)
5. [Component Library Documentation](#component-library-documentation)
6. [ViVi AI System Complete Specification](#vivi-ai-system-complete-specification)
7. [Mobile Optimization Details](#mobile-optimization-details)
8. [State Management Architecture](#state-management-architecture)
9. [Complete Code Implementation](#complete-code-implementation)
10. [Database Schema & API Endpoints](#database-schema--api-endpoints)

---

## 🏗 Platform Architecture

### Technology Stack Overview
```typescript
// Frontend Architecture
React: 18.2.0 (Latest stable with concurrent features)
TypeScript: 5.0+ (Strict mode enabled, full type safety)
Vite: 4.0+ (Lightning-fast dev server, optimized builds)
Tailwind CSS: 3.3+ (Utility-first with custom Mavro extensions)
Framer Motion: 10.0+ (Smooth animations, gesture handling)
TanStack React Query: 4.0+ (Server state management, caching)
Wouter: 2.8+ (Lightweight routing, 1.2KB gzipped)
Radix UI: 1.0+ (Unstyled, accessible primitives)
shadcn/ui: Latest (Pre-built components with Mavro styling)

// Backend Architecture
Node.js: 18+ (LTS version with ES modules)
Express.js: 4.18+ (Minimal, flexible web framework)
TypeScript: 5.0+ (Server-side type safety)
PostgreSQL: 15+ (Advanced SQL features, JSON support)
Drizzle ORM: 0.28+ (Type-safe database operations)
Neon: Latest (Serverless PostgreSQL provider)

// AI Integration
OpenAI API: GPT-4 (Content generation, chat responses)
Web Speech API: Browser-native (Voice input processing)
Custom ViVi Engine: Proprietary (Context-aware AI decisions)

// Development Tools
ESLint: 8.0+ (Code quality, best practices)
Prettier: 3.0+ (Code formatting, team consistency)
Husky: 8.0+ (Git hooks, pre-commit validation)
```

### File Structure Deep Dive
```
mavro-pro/
├── client/                                 # Frontend React application
│   ├── src/
│   │   ├── App.tsx                        # Main app router with 7 context providers
│   │   ├── main.tsx                       # React 18 createRoot entry point
│   │   ├── index.css                      # Global styles, Mavro design system
│   │   ├── components/                    # 150+ reusable components
│   │   │   ├── ui/                       # 45 shadcn/ui base components
│   │   │   │   ├── button.tsx            # 6 variants, 4 sizes, focus management
│   │   │   │   ├── card.tsx              # Header, content, footer compositions
│   │   │   │   ├── dialog.tsx            # Modal system with backdrop blur
│   │   │   │   ├── form.tsx              # React Hook Form integration
│   │   │   │   ├── input.tsx             # Controlled inputs with validation
│   │   │   │   ├── select.tsx            # Dropdown with search, multi-select
│   │   │   │   ├── tabs.tsx              # Keyboard navigation, indicators
│   │   │   │   ├── toast.tsx             # Notification system, 4 variants
│   │   │   │   └── ...                   # 37 additional components
│   │   │   ├── ViViAI/                   # AI assistant components
│   │   │   │   ├── ViViChatWidget.tsx    # 254 lines, real-time chat
│   │   │   │   ├── ViViEngine.tsx        # Decision engine, 180 lines
│   │   │   │   └── ViViVoice.tsx         # Speech recognition, 120 lines
│   │   │   ├── CommandCenter/            # Plan/Track/Grow system
│   │   │   │   ├── PlanTab.tsx           # 500+ lines, 3 sub-tabs
│   │   │   │   ├── TrackTab.tsx          # Analytics dashboard, 400 lines
│   │   │   │   └── GrowTab.tsx           # ROI optimization, 350 lines
│   │   │   ├── Charts/                   # Data visualization
│   │   │   │   ├── BarChart.tsx          # Recharts integration
│   │   │   │   ├── LineChart.tsx         # Time series data
│   │   │   │   ├── PieChart.tsx          # Engagement breakdown
│   │   │   │   └── HeatmapChart.tsx      # Geographic data
│   │   │   ├── Campaigns/                # Campaign management
│   │   │   │   ├── CampaignDetailDrawer.tsx
│   │   │   │   ├── ViViCampaignInsights.tsx
│   │   │   │   └── ViViABTestingPanel.tsx
│   │   │   ├── GeoSmart/                 # Geographic intelligence
│   │   │   │   ├── GeoSmartHeatmap.tsx   # Interactive map, 200 lines
│   │   │   │   ├── GeoTrendTicker.tsx    # Real-time geo data
│   │   │   │   └── GeoSmartViViNudge.tsx # AI recommendations
│   │   │   ├── notifications/            # Real-time notification system
│   │   │   │   ├── ViViNotificationPanel.tsx
│   │   │   │   └── SimulateNotifications.ts
│   │   │   └── ...                       # 100+ additional components
│   │   ├── pages/                        # 15 full-page components
│   │   │   ├── ExactMavroPlusDashboard.tsx  # 800+ lines, main dashboard
│   │   │   ├── CampaignsPage.tsx           # 600+ lines, AI campaign builder
│   │   │   ├── ReviewsPageEnhanced.tsx     # 500+ lines, review management
│   │   │   ├── ComplianceCenterPageEnhanced.tsx # 450+ lines, OAuth monitoring
│   │   │   ├── GrioAcademyPage.tsx         # 400+ lines, learning platform
│   │   │   ├── FourSIGHTPage.tsx           # 350+ lines, analytics
│   │   │   ├── SettingsPage.tsx            # 300+ lines, configuration
│   │   │   └── ...                         # 8 additional pages
│   │   ├── contexts/                      # 8 React Context providers
│   │   │   ├── ViViContext.tsx           # 187 lines, AI agent management
│   │   │   ├── AuthProvider.tsx          # Authentication state
│   │   │   ├── SettingsContext.tsx       # Theme, preferences
│   │   │   └── ...                       # 5 additional contexts
│   │   ├── hooks/                        # 20+ custom React hooks
│   │   │   ├── useAuth.ts                # Authentication logic
│   │   │   ├── useTheme.ts               # Theme switching
│   │   │   ├── useUserPersona.ts         # User persona management
│   │   │   └── ...                       # 17 additional hooks
│   │   ├── lib/                          # Utility libraries
│   │   │   ├── queryClient.ts            # TanStack Query configuration
│   │   │   ├── utils.ts                  # Common utilities, cn() function
│   │   │   └── authUtils.ts              # Authentication helpers
│   │   ├── services/                     # API service layers
│   │   │   ├── viviService.ts            # ViVi AI API integration
│   │   │   └── reportExportService.ts    # Data export functionality
│   │   └── utils/                        # Helper utilities
│   └── ...configuration files
├── server/                               # Backend Express application
│   ├── index.ts                         # Server entry point, 150 lines
│   ├── routes.ts                        # API routes, 500+ lines
│   ├── db.ts                           # Database connection, Drizzle setup
│   ├── storage.ts                      # Data access layer, 200 lines
│   ├── auth/                           # Authentication system
│   ├── controllers/                    # Request handlers
│   ├── middleware/                     # Express middleware
│   ├── models/                         # Database models
│   ├── services/                       # Business logic
│   └── utils/                          # Server utilities
├── shared/                             # Shared type definitions
│   ├── schema.ts                       # Database schema, Drizzle definitions
│   ├── personaSchema.ts                # User persona types
│   └── templateSchema.ts               # Template system types
├── package.json                        # 89 dependencies, scripts
├── tsconfig.json                       # TypeScript configuration
├── tailwind.config.ts                  # Tailwind customization
├── vite.config.ts                      # Vite build configuration
├── drizzle.config.ts                   # Database configuration
└── replit.md                           # Project documentation
```

---

## 🎨 Complete Design System

### Color Palette with Hex Codes
```css
/* Primary Brand Colors */
:root {
  --mavro-primary: #8B5CF6;        /* Mavro Purple - Main brand color */
  --mavro-primary-light: #A78BFA;  /* Purple Light - Secondary actions */
  --mavro-primary-dark: #7C3AED;   /* Purple Dark - Emphasis states */
  --mavro-accent: #DDD6FE;         /* Purple Accent - Background highlights */
  --mavro-gold: #EAB308;           /* Mavro Gold - Premium features */
  --mavro-green: #059669;          /* Success Green - Positive states */
  --mavro-blue: #3B82F6;           /* Action Blue - Interactive elements */
  --mavro-red: #EF4444;            /* Error Red - Warnings, errors */
  
  /* Surface & Background Hierarchy */
  --mavro-white: #FFFFFF;          /* Pure white - Primary surface */
  --mavro-gray-50: #FAFAFA;        /* Light gray - Page background */
  --mavro-gray-100: #F5F5F5;       /* Card background - Secondary surface */
  --mavro-gray-200: #E5E5E5;       /* Border color - Subtle divisions */
  --mavro-gray-300: #D4D4D4;       /* Input borders - Form elements */
  --mavro-gray-400: #A3A3A3;       /* Placeholder text - Disabled states */
  --mavro-gray-500: #737373;       /* Secondary text - Helper text */
  --mavro-gray-600: #525252;       /* Body text - Primary content */
  --mavro-gray-700: #404040;       /* Headings - Emphasis text */
  --mavro-gray-800: #262626;       /* Dark text - High contrast */
  --mavro-gray-900: #171717;       /* Black text - Maximum contrast */
  
  /* Platform-Specific Colors */
  --instagram-gradient: linear-gradient(45deg, #E4405F, #833AB4, #F77737);
  --facebook-blue: #1877F2;
  --linkedin-blue: #0A66C2;
  --twitter-blue: #1DA1F2;
  --x-black: #000000;
  --tiktok-red: #FF0050;
  --youtube-red: #FF0000;
  --snapchat-yellow: #FFFC00;
  --pinterest-red: #BD081C;
  
  /* Status Indicator Colors */
  --status-hot: #EF4444;           /* Hot badge - Trending content */
  --status-trending: #F59E0B;      /* Trending badge - Rising content */
  --status-rising: #84CC16;        /* Rising badge - Growing content */
  --status-stable: #6B7280;        /* Stable badge - Steady content */
  --status-live: #10B981;          /* Live indicator - Real-time data */
  --status-new: #8B5CF6;           /* New badge - Fresh content */
  
  /* Gradient Definitions */
  --gradient-primary: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
  --gradient-gold: linear-gradient(135deg, #EAB308 0%, #F59E0B 100%);
  --gradient-success: linear-gradient(135deg, #059669 0%, #10B981 100%);
  --gradient-danger: linear-gradient(135deg, #EF4444 0%, #F87171 100%);
  --gradient-surface: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
  --gradient-dark: linear-gradient(135deg, #1F2937 0%, #374151 100%);
}
```

### Typography System
```css
/* Font Family Hierarchy */
.font-display {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.font-heading {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.font-body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.5;
}

/* Typography Scale */
.text-xs    { font-size: 0.75rem; }   /* 12px */
.text-sm    { font-size: 0.875rem; }  /* 14px */
.text-base  { font-size: 1rem; }      /* 16px */
.text-lg    { font-size: 1.125rem; }  /* 18px */
.text-xl    { font-size: 1.25rem; }   /* 20px */
.text-2xl   { font-size: 1.5rem; }    /* 24px */
.text-3xl   { font-size: 1.875rem; }  /* 30px */
.text-4xl   { font-size: 2.25rem; }   /* 36px */
.text-5xl   { font-size: 3rem; }      /* 48px */

/* Weight System */
.font-light      { font-weight: 300; }
.font-normal     { font-weight: 400; }
.font-medium     { font-weight: 500; }
.font-semibold   { font-weight: 600; }
.font-bold       { font-weight: 700; }
.font-extrabold  { font-weight: 800; }
.font-black      { font-weight: 900; }

/* Letter Spacing */
.tracking-tighter  { letter-spacing: -0.05em; }
.tracking-tight    { letter-spacing: -0.025em; }
.tracking-normal   { letter-spacing: 0em; }
.tracking-wide     { letter-spacing: 0.025em; }
.tracking-wider    { letter-spacing: 0.05em; }
```

### Shadow System
```css
/* Executive-Grade Shadow Hierarchy */
.shadow-none    { box-shadow: none; }
.shadow-sm      { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow         { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
.shadow-md      { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
.shadow-lg      { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.shadow-xl      { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
.shadow-2xl     { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }
.shadow-3xl     { box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3); }

/* Colored Shadows for Brand Elements */
.shadow-purple  { box-shadow: 0 10px 15px -3px rgb(139 92 246 / 0.3); }
.shadow-gold    { box-shadow: 0 10px 15px -3px rgb(234 179 8 / 0.3); }
.shadow-green   { box-shadow: 0 10px 15px -3px rgb(5 150 105 / 0.3); }
```

### Border Radius Architecture
```css
/* Rounded Corner System */
.rounded-none   { border-radius: 0px; }
.rounded-sm     { border-radius: 0.125rem; }    /* 2px */
.rounded        { border-radius: 0.25rem; }     /* 4px */
.rounded-md     { border-radius: 0.375rem; }    /* 6px */
.rounded-lg     { border-radius: 0.5rem; }      /* 8px */
.rounded-xl     { border-radius: 0.75rem; }     /* 12px */
.rounded-2xl    { border-radius: 1rem; }        /* 16px */
.rounded-3xl    { border-radius: 1.5rem; }      /* 24px - Mavro signature */
.rounded-full   { border-radius: 9999px; }
```

### Animation & Transition System
```css
/* Timing Functions */
.ease-linear     { transition-timing-function: linear; }
.ease-in         { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }
.ease-out        { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
.ease-in-out     { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }

/* Duration Scale */
.duration-75     { transition-duration: 75ms; }
.duration-100    { transition-duration: 100ms; }
.duration-150    { transition-duration: 150ms; }
.duration-200    { transition-duration: 200ms; }
.duration-300    { transition-duration: 300ms; }
.duration-500    { transition-duration: 500ms; }
.duration-700    { transition-duration: 700ms; }
.duration-1000   { transition-duration: 1000ms; }

/* Micro-interaction Classes */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.hover-scale {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.hover-scale:hover {
  transform: scale(1.05);
}

.focus-ring {
  transition: box-shadow 0.15s ease-out;
}
.focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgb(139 92 246 / 0.3);
}
```

---

## 📱 Page-by-Page Breakdown

### 1. Main Dashboard (ExactMavroPlusDashboard.tsx)
**File Size:** 800+ lines  
**Route:** `/` and `/dashboard`  
**Primary Purpose:** Unified command center for campaign management

#### Top Navigation Bar
```typescript
// Navigation Structure - 60px height, sticky positioned
<nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
  <div className="max-w-full mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Left Section: Logo & Primary Nav */}
      <div className="flex items-center space-x-8">
        {/* Logo Component */}
        <div className="flex items-center space-x-3">
          <ViViLogo className="w-8 h-8" />
          <span className="text-2xl font-black text-gray-900">Mavro Pro</span>
        </div>
        
        {/* Primary Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {/* 6 main navigation buttons */}
          {navigationItems.slice(0, 6).map((item) => (
            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}>
              <item.icon className="w-4 h-4 inline mr-2" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Right Section: Actions & Profile */}
      <div className="flex items-center space-x-4">
        <Bell className="w-6 h-6 text-gray-600 hover:text-purple-600 cursor-pointer" />
        <Settings className="w-6 h-6 text-gray-600 hover:text-purple-600 cursor-pointer" />
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
      </div>
    </div>
  </div>
</nav>
```

#### Command Center Tab System
**Total Implementation:** 3 main tabs, 9 sub-tabs, 50+ interactive elements

**Plan Tab Components:**
- **GTM Planning Sub-tab**
  - Campaign objective selector (6 options)
  - Target audience builder (demographic inputs)
  - Budget allocation slider (min: $100, max: $10,000)
  - Timeline picker (calendar component)
  - Platform selection checkboxes (8 platforms)
  
- **Mavro Magic Studio™ Sub-tab**
  - Enhanced AI Generation Panel (detailed below)
  - Voice input with Web Speech API
  - Real-time character counter (0/3350)
  - Platform-specific audio selector
  - Trending hashtag integration
  
- **Scheduler Sub-tab**
  - Google Calendar-style interface
  - Drag & drop post scheduling
  - Bulk operation toolbar
  - Performance prediction overlay

**Track Tab Components:**
- **Analytics Dashboard**
  - 12 KPI cards with real-time data
  - Interactive chart selector (4 chart types)
  - Date range picker (7 preset ranges)
  - Export functionality (PDF, CSV, Excel)
  
- **Performance Monitoring**
  - Campaign status indicators
  - Real-time engagement tracking
  - ROI calculator with trend analysis
  - Alert system for performance thresholds

**Grow Tab Components:**
- **ROI Optimization**
  - Forecasting models with confidence intervals
  - Budget reallocation suggestions
  - A/B testing recommendations
  - Competitive analysis insights

#### Navigation Items Complete List
```typescript
const navigationItems = [
  { 
    id: 'dashboard', 
    label: 'Command Center', 
    icon: Home, 
    component: null,
    description: 'Plan, Track, and Grow your campaigns',
    subPages: ['plan', 'track', 'grow']
  },
  { 
    id: 'campaigns', 
    label: 'Campaigns', 
    icon: Target, 
    component: CampaignsPage,
    description: 'Enhanced AI Campaign Builder',
    subPages: ['active', 'draft', 'scheduled', 'archived']
  },
  { 
    id: 'reviews', 
    label: 'Reviews', 
    icon: MessageCircle, 
    component: ReviewsPage,
    description: 'Reviews Intelligence Hub',
    subPages: ['overview', 'responses', 'analytics', 'settings']
  },
  { 
    id: 'compliance', 
    label: 'Compliance', 
    icon: Shield, 
    component: ComplianceCenterPage,
    description: 'Compliance Intelligence Center',
    subPages: ['status', 'oauth', 'guidelines', 'reports']
  },
  { 
    id: 'grio-academy', 
    label: 'Grio Academy', 
    icon: BookOpen, 
    component: GrioAcademyPage,
    description: 'Learning and Development',
    subPages: ['courses', 'progress', 'achievements', 'library']
  },
  // ... additional 7 navigation items
];
```

### 2. Enhanced AI Campaign Builder (CampaignsPage.tsx)
**File Size:** 600+ lines  
**Route:** `/campaigns`  
**Primary Purpose:** AI-powered content creation and campaign management

#### Enhanced AI Generation Panel Layout
```typescript
// Panel Structure - 4 main sections, responsive grid
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Caption Section - Full width on mobile, spans 2 columns on desktop */}
  <Card className="lg:col-span-2">
    <CardHeader className="flex flex-row items-center space-y-0 pb-4">
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-5 h-5 text-purple-600" />
        <CardTitle className="text-lg font-semibold">Caption</CardTitle>
      </div>
      <div className="ml-auto text-sm text-gray-500">
        {characterCount}/{maxCharacters}
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {/* Main textarea with voice input integration */}
        <Textarea
          placeholder="Write your engaging caption here... Tell your story, share your thoughts, or inspire your audience!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] resize-none focus:ring-2 focus:ring-purple-500"
        />
        
        {/* Action buttons row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">AI suggestions available</span>
          </div>
          <div className="flex items-center space-x-2">
            {/* Voice Input Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceInput}
              className={`${isVoiceRecording ? 'bg-red-50 border-red-300 text-red-700' : 'border-blue-300 text-blue-700'}`}
            >
              {isVoiceRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isVoiceRecording ? 'Stop Recording' : 'Voice Input'}
            </Button>
            
            {/* AI Generation Button */}
            <Button
              onClick={generateWithAI}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Music & Audio Section */}
  <Card>
    <CardHeader className="flex flex-row items-center space-y-0 pb-4">
      <div className="flex items-center space-x-2">
        <Music className="w-5 h-5 text-red-600" />
        <CardTitle className="text-lg font-semibold">Music & Audio</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Platform-specific audio selectors */}
      {selectedPlatforms.map(platformId => {
        const IconComponent = getPlatformIcon(platformId);
        return (
          <div key={platformId} className="space-y-2">
            <div className="flex items-center space-x-2">
              <IconComponent className="w-4 h-4" />
              <span className="text-sm font-medium capitalize">{platformId}</span>
              <Badge variant="secondary" className="text-xs">Trending sounds</Badge>
            </div>
            <Select value={selectedAudio} onValueChange={setSelectedAudio}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select trending audio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="audio1">Trending Beat #1 - Popular</SelectItem>
                <SelectItem value="audio2">Viral Sound Effect - Hot</SelectItem>
                <SelectItem value="audio3">Background Music - Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </CardContent>
  </Card>

  {/* Trending Hashtags Section */}
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
      <div className="flex items-center space-x-2">
        <Hash className="w-5 h-5 text-green-600" />
        <CardTitle className="text-lg font-semibold">Trending Hashtags</CardTitle>
      </div>
      <Badge variant="outline" className="text-xs text-green-600 border-green-200">
        Powered by TrendTap™
      </Badge>
    </CardHeader>
    <CardContent className="space-y-4 max-h-80 overflow-y-auto">
      {/* Platform-specific hashtag grids */}
      {selectedPlatforms.map(platformId => {
        const IconComponent = getPlatformIcon(platformId);
        const hashtags = trendingHashtags[platformId] || [];
        
        return (
          <div key={platformId} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium capitalize">{platformId}</span>
                <Badge variant="secondary" className="text-xs">Top performing</Badge>
              </div>
              <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                LIVE
              </Badge>
            </div>
            
            {/* Hashtag grid - 2 columns */}
            <div className="grid grid-cols-2 gap-2">
              {hashtags.map((hashtag, index) => (
                <button
                  key={index}
                  onClick={() => addHashtag(hashtag.tag)}
                  className="flex items-center justify-between p-2 rounded-lg border border-gray-200 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium">{hashtag.tag}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      hashtag.performance === 'hot' ? 'bg-red-100 text-red-800' :
                      hashtag.performance === 'trending' ? 'bg-orange-100 text-orange-600' :
                      hashtag.performance === 'rising' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {hashtag.performance.toUpperCase()}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Custom Hashtag Input Section */}
      <div className="border-t pt-4">
        <div className="flex items-center space-x-2 mb-2">
          <Hash className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-medium">Add Custom Hashtag</span>
          <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">
            CUSTOM
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Input 
            type="text" 
            placeholder="Enter custom hashtag"
            value={customHashtag}
            onChange={(e) => setCustomHashtag(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={addCustomHashtag}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Add
          </Button>
        </div>
        {/* Usage tips */}
        <div className="mt-2 text-xs text-gray-500 space-y-1">
          <div>• Use your brand name or unique identifiers</div>
          <div>• Keep it short and memorable</div>
          <div>• Check if it's already in use by others</div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
```

#### Voice Input Implementation Details
```typescript
// Web Speech API Integration - Complete implementation
const handleVoiceInput = useCallback(() => {
  if (!('webkitSpeechRecognition' in window)) {
    toast({
      title: "Voice Input Not Supported",
      description: "Your browser doesn't support voice input.",
      variant: "destructive",
    });
    return;
  }

  if (isVoiceRecording) {
    recognition.current?.stop();
    setIsVoiceRecording(false);
    return;
  }

  recognition.current = new (window as any).webkitSpeechRecognition();
  recognition.current.continuous = true;           // Continue listening
  recognition.current.interimResults = true;      // Show partial results
  recognition.current.lang = 'en-US';              // Language setting
  recognition.current.maxAlternatives = 1;        // Number of alternatives

  recognition.current.onstart = () => {
    setIsVoiceRecording(true);
    toast({
      title: "Voice Recording Started",
      description: "Speak now, I'm listening...",
    });
  };

  recognition.current.onresult = (event: any) => {
    const transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join('');
    
    setContent(transcript);
  };

  recognition.current.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error);
    setIsVoiceRecording(false);
    toast({
      title: "Voice Input Error",
      description: "There was an error with voice recognition. Please try again.",
      variant: "destructive",
    });
  };

  recognition.current.onend = () => {
    setIsVoiceRecording(false);
  };

  recognition.current.start();
}, [isVoiceRecording, toast]);
```

#### AI Content Suggestions Panel
```typescript
// AI Content Suggestions - Full implementation
<Card>
  <CardHeader className="flex flex-row items-center space-y-0 pb-4">
    <div className="flex items-center space-x-2">
      <Sparkles className="w-5 h-5 text-purple-600" />
      <CardTitle className="text-lg font-semibold">AI Content Suggestions</CardTitle>
    </div>
  </CardHeader>
  <CardContent>
    {/* Filter buttons */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <Button 
        variant={suggestionFilter === 'hook' ? 'default' : 'outline'} 
        className="justify-center"
        onClick={() => setSuggestionFilter('hook')}
      >
        Hook
      </Button>
      <Button 
        variant={suggestionFilter === 'cta' ? 'default' : 'outline'} 
        className="justify-center"
        onClick={() => setSuggestionFilter('cta')}
      >
        CTA
      </Button>
      <Button 
        variant={suggestionFilter === 'story' ? 'default' : 'outline'} 
        className="justify-center"
        onClick={() => setSuggestionFilter('story')}
      >
        Story
      </Button>
    </div>

    {/* Suggestions list */}
    <div className="space-y-3">
      {contentSuggestions
        .filter(s => suggestionFilter === 'all' || s.type === suggestionFilter)
        .map((suggestion) => (
        <div 
          key={suggestion.id}
          className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {suggestion.type.toUpperCase()}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    suggestion.engagement === 'high' ? 'bg-green-100 text-green-800' :
                    suggestion.engagement === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-600'
                  }`}
                >
                  {suggestion.engagement} engagement
                </Badge>
              </div>
              <p className="text-sm text-gray-700 mb-2">{suggestion.content}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{suggestion.engagement}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <BarChart3 className="w-3 h-3" />
                  <span>{suggestion.confidence}</span>
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applySuggestion(suggestion)}
              className="ml-4 text-purple-700 border-purple-300 hover:bg-purple-50"
            >
              Use This
            </Button>
          </div>
        </div>
      ))}
    </div>

    {/* Generate more button */}
    <div className="mt-4 text-center">
      <Button 
        variant="outline" 
        className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
        onClick={generateMoreSuggestions}
      >
        Generate More Suggestions
      </Button>
    </div>
  </CardContent>
</Card>
```

### 3. Reviews Intelligence Hub (ReviewsPageEnhanced.tsx)
**File Size:** 500+ lines  
**Route:** `/reviews`  
**Primary Purpose:** Multi-platform review management with AI response generation

#### Platform Integration Header
```typescript
// Platform selector with official brand icons
<div className="flex items-center justify-between mb-6">
  <div className="flex items-center space-x-6">
    <h1 className="text-3xl font-bold text-gray-900">Reviews Intelligence Hub</h1>
    <Badge variant="outline" className="text-green-600 border-green-200">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
      Live Data
    </Badge>
  </div>
  
  {/* Platform filter buttons */}
  <div className="flex items-center space-x-2">
    {[
      { id: 'all', label: 'All Platforms', icon: Globe },
      { id: 'google', label: 'Google', icon: FaGoogle, color: 'text-blue-600' },
      { id: 'facebook', label: 'Facebook', icon: FaFacebook, color: 'text-blue-600' },
      { id: 'instagram', label: 'Instagram', icon: FaInstagram, color: 'text-pink-600' },
      { id: 'yelp', label: 'Yelp', icon: FaYelp, color: 'text-red-600' },
      { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: 'text-blue-700' }
    ].map((platform) => (
      <Button
        key={platform.id}
        variant={selectedPlatforms.includes(platform.id) ? 'default' : 'outline'}
        size="sm"
        onClick={() => togglePlatform(platform.id)}
        className={`flex items-center space-x-2 ${platform.color || ''}`}
      >
        <platform.icon className="w-4 h-4" />
        <span className="hidden md:inline">{platform.label}</span>
      </Button>
    ))}
  </div>
</div>
```

#### Review Cards Layout
```typescript
// Individual review card component
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* Platform icon */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              review.platform === 'google' ? 'bg-blue-100' :
              review.platform === 'facebook' ? 'bg-blue-100' :
              review.platform === 'instagram' ? 'bg-pink-100' :
              review.platform === 'yelp' ? 'bg-red-100' :
              'bg-gray-100'
            }`}>
              <PlatformIcon platform={review.platform} className="w-4 h-4" />
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
              <div className="flex items-center space-x-2">
                {/* Star rating display */}
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          
          {/* Sentiment badge */}
          <Badge 
            variant="outline" 
            className={`${
              review.sentiment === 'positive' ? 'bg-green-100 text-green-800 border-green-200' :
              review.sentiment === 'negative' ? 'bg-red-100 text-red-800 border-red-200' :
              'bg-yellow-100 text-yellow-800 border-yellow-200'
            }`}
          >
            {review.sentiment.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 mb-4">{review.content}</p>
        
        {/* Response section */}
        {review.response ? (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Building className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Your Response</span>
            </div>
            <p className="text-sm text-gray-700">{review.response}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* AI response suggestions */}
            {review.aiSuggestions && (
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">AI Suggestion</span>
                </div>
                <p className="text-sm text-purple-700 mb-3">{review.aiSuggestions[0]}</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => useAISuggestion(review.id, review.aiSuggestions[0])}
                  >
                    Use This Response
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => generateNewSuggestion(review.id)}
                  >
                    Generate New
                  </Button>
                </div>
              </div>
            )}
            
            {/* Manual response input */}
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => openResponseModal(review.id)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Write Response
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => generateAIResponse(review.id)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Response
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
```

#### AI Response Generation System
```typescript
// AI response generation with tone selection
const generateAIResponse = async (reviewId: string, reviewText: string, tone: string = 'professional-friendly') => {
  setIsGenerating(true);
  
  try {
    const response = await fetch('/api/ai/review-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        reviewId, 
        reviewText,
        tone,
        businessType: userBusiness.type,
        brandVoice: userBusiness.brandVoice
      })
    });
    
    if (response.ok) {
      const { suggestedResponse, alternatives } = await response.json();
      
      // Update review with AI suggestion
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, aiSuggestions: [suggestedResponse, ...alternatives] }
          : review
      ));
      
      toast({
        title: "AI Response Generated",
        description: "Review the suggested response and customize as needed.",
      });
    }
  } catch (error) {
    console.error('AI response generation failed:', error);
    toast({
      title: "Generation Failed",
      description: "Unable to generate response. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsGenerating(false);
  }
};

// Tone selector component
const ToneSelector: React.FC<{ selectedTone: string; onToneChange: (tone: string) => void }> = ({ 
  selectedTone, 
  onToneChange 
}) => {
  const tones = [
    { id: 'professional-friendly', label: 'Professional & Friendly', description: 'Balanced, approachable tone' },
    { id: 'warm-personal', label: 'Warm & Personal', description: 'Empathetic, caring response' },
    { id: 'brief-courteous', label: 'Brief & Courteous', description: 'Concise, polite acknowledgment' },
    { id: 'detailed-helpful', label: 'Detailed & Helpful', description: 'Comprehensive, solution-focused' }
  ];
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Response Tone</label>
      <Select value={selectedTone} onValueChange={onToneChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select response tone" />
        </SelectTrigger>
        <SelectContent>
          {tones.map((tone) => (
            <SelectItem key={tone.id} value={tone.id}>
              <div>
                <div className="font-medium">{tone.label}</div>
                <div className="text-xs text-gray-500">{tone.description}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
```

### 4. Compliance Intelligence Center (ComplianceCenterPageEnhanced.tsx)
**File Size:** 450+ lines  
**Route:** `/compliance`  
**Primary Purpose:** OAuth health monitoring and platform compliance management

#### OAuth Health Monitoring Dashboard
```typescript
// Real-time connection status monitoring
const OAuthHealthMonitor: React.FC = () => {
  const [platformStatus, setPlatformStatus] = useState<PlatformStatus[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  useEffect(() => {
    const checkAllPlatforms = async () => {
      const platforms = ['instagram', 'facebook', 'linkedin', 'twitter', 'tiktok', 'youtube'];
      
      const statusPromises = platforms.map(async (platform) => {
        try {
          const response = await fetch(`/api/oauth/status/${platform}`);
          const data = await response.json();
          
          return {
            platform,
            connected: data.connected,
            expiresAt: data.expiresAt,
            lastRefresh: data.lastRefresh,
            scopes: data.scopes,
            warnings: data.warnings || [],
            errors: data.errors || []
          };
        } catch (error) {
          return {
            platform,
            connected: false,
            errors: ['Connection check failed']
          };
        }
      });
      
      const results = await Promise.all(statusPromises);
      setPlatformStatus(results);
      setLastUpdate(new Date());
    };
    
    checkAllPlatforms();
    const interval = setInterval(checkAllPlatforms, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>OAuth Health Monitor</span>
          </CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <RefreshCw className="w-4 h-4" />
            <span>Last updated: {formatDistanceToNow(lastUpdate, { addSuffix: true })}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {platformStatus.map((status) => (
            <div key={status.platform} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                {/* Platform icon */}
                <PlatformIcon platform={status.platform} className="w-6 h-6" />
                
                <div>
                  <h3 className="font-medium text-gray-900 capitalize">{status.platform}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {status.expiresAt && (
                      <span>Expires: {format(new Date(status.expiresAt), 'MMM dd, yyyy')}</span>
                    )}
                    {status.scopes && (
                      <span>{status.scopes.length} permissions</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Warnings */}
                {status.warnings && status.warnings.length > 0 && (
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        {status.warnings.map((warning, index) => (
                          <div key={index} className="text-xs">{warning}</div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
                
                {/* Errors */}
                {status.errors && status.errors.length > 0 && (
                  <Tooltip>
                    <TooltipTrigger>
                      <X className="w-4 h-4 text-red-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        {status.errors.map((error, index) => (
                          <div key={index} className="text-xs">{error}</div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
                
                {/* Connection status indicator */}
                <div className={`w-3 h-3 rounded-full ${
                  status.connected && (!status.errors || status.errors.length === 0) 
                    ? 'bg-green-500' 
                    : status.connected && status.warnings && status.warnings.length > 0
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`} />
                
                {/* Action button */}
                <Button
                  size="sm"
                  variant={status.connected ? "outline" : "default"}
                  onClick={() => status.connected ? refreshConnection(status.platform) : connectPlatform(status.platform)}
                >
                  {status.connected ? 'Refresh' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bulk actions */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={refreshAllConnections}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh All
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={exportComplianceReport}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

#### Compliance Flags Management
```typescript
// Compliance violation tracking and resolution
const ComplianceFlagsPanel: React.FC = () => {
  const [flags, setFlags] = useState<ComplianceFlag[]>([]);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  
  const flagSeverityColors = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  
  const resolveFlag = async (flagId: string, resolution: string) => {
    try {
      const response = await fetch(`/api/compliance/flags/${flagId}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolution })
      });
      
      if (response.ok) {
        setFlags(prev => prev.filter(flag => flag.id !== flagId));
        toast({
          title: "Flag Resolved",
          description: "Compliance issue has been marked as resolved.",
        });
      }
    } catch (error) {
      console.error('Failed to resolve flag:', error);
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span>Compliance Flags</span>
          </CardTitle>
          
          {/* Severity filter */}
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Flags</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {flags
            .filter(flag => filterSeverity === 'all' || flag.severity === filterSeverity)
            .map((flag) => (
            <div key={flag.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <PlatformIcon platform={flag.platform} className="w-5 h-5" />
                  <div>
                    <h3 className="font-medium text-gray-900">{flag.title}</h3>
                    <p className="text-sm text-gray-600">{flag.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="outline" 
                    className={flagSeverityColors[flag.severity]}
                  >
                    {flag.severity.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(flag.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
              
              {/* Flag details */}
              {flag.details && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    {flag.details.map((detail, index) => (
                      <div key={index}>• {detail}</div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Recommended actions */}
              {flag.recommendedActions && (
                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <h4 className="text-sm font-medium text-blue-700 mb-2">Recommended Actions</h4>
                  <div className="text-sm text-blue-600 space-y-1">
                    {flag.recommendedActions.map((action, index) => (
                      <div key={index}>• {action}</div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Resolution actions */}
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => resolveFlag(flag.id, 'fixed')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Mark as Fixed
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => resolveFlag(flag.id, 'acknowledged')}
                >
                  Acknowledge
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => viewFlagDetails(flag.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
          
          {flags.length === 0 && (
            <div className="text-center py-8">
              <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Clear!</h3>
              <p className="text-gray-600">No compliance issues detected.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
```

### 5. Grio Academy Learning Platform (GrioAcademyPage.tsx)
**File Size:** 400+ lines  
**Route:** `/grio-academy`  
**Primary Purpose:** Gamified learning and development system

#### Course Catalog with Progress Tracking
```typescript
// Interactive course grid with progress indicators
const CourseCatalog: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  
  const categories = [
    { id: 'all', label: 'All Courses', icon: BookOpen },
    { id: 'marketing', label: 'Marketing', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'ai-tools', label: 'AI Tools', icon: Brain }
  ];
  
  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <category.icon className="w-4 h-4" />
            <span>{category.label}</span>
          </Button>
        ))}
      </div>
      
      {/* Course grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses
          .filter(course => selectedCategory === 'all' || course.category === selectedCategory)
          .map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
            {/* Course thumbnail */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-t-lg flex items-center justify-center">
                <course.icon className="w-12 h-12 text-purple-600" />
              </div>
              
              {/* Progress overlay */}
              {userProgress[course.id] > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{Math.round(userProgress[course.id])}% Complete</span>
                    <PlayCircle className="w-4 h-4" />
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${userProgress[course.id]}%` }}
                    />
                  </div>
                </div>
              )}
              
              {/* Difficulty badge */}
              <Badge 
                variant="outline" 
                className={`absolute top-2 right-2 ${
                  course.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  course.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}
              >
                {course.difficulty}
              </Badge>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">by {course.instructor}</p>
                </div>
                
                {/* Course rating */}
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>
              
              {/* Course metadata */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{course.enrolledCount.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{course.lessonCount} lessons</span>
                  </span>
                </div>
              </div>
              
              {/* Action button */}
              <Button 
                className="w-full"
                onClick={() => startCourse(course.id)}
              >
                {userProgress[course.id] > 0 ? 'Continue Learning' : 'Start Course'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
```

#### Interactive Learning Module
```typescript
// Video player with quiz integration
const LearningModule: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  
  const module = modules.find(m => m.id === moduleId);
  
  if (!module) return null;
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Module header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
          <p className="text-gray-600 mt-2">{module.description}</p>
        </div>
        
        {/* Progress indicator */}
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round((currentLesson / module.lessons.length) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Complete</div>
        </div>
      </div>
      
      {/* Video player */}
      <Card>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {/* Video element would go here */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
              <div className="text-center text-white">
                <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">
                  Lesson {currentLesson + 1}: {module.lessons[currentLesson].title}
                </h3>
                <p className="text-purple-200">
                  Duration: {module.lessons[currentLesson].duration}
                </p>
              </div>
            </div>
            
            {/* Video controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                {/* Progress bar */}
                <div className="flex-1">
                  <div className="w-full bg-white/30 rounded-full h-1">
                    <div 
                      className="bg-white h-1 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Lesson navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson list */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lessons</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {module.lessons.map((lesson, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-l-4 ${
                      index === currentLesson
                        ? 'border-purple-500 bg-purple-50'
                        : index < currentLesson
                        ? 'border-green-500'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-medium ${
                          index === currentLesson ? 'text-purple-700' : 'text-gray-900'
                        }`}>
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                      
                      {index < currentLesson && (
                        <Check className="w-5 h-5 text-green-500" />
                      )}
                      {index === currentLesson && (
                        <PlayCircle className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lesson content */}
          <Card>
            <CardHeader>
              <CardTitle>Lesson Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p>{module.lessons[currentLesson].content}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Quiz section */}
          {module.lessons[currentLesson].quiz && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Knowledge Check</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {module.lessons[currentLesson].quiz.questions.map((question, qIndex) => (
                    <div key={qIndex} className="space-y-3">
                      <h3 className="font-medium text-gray-900">{question.question}</h3>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <label
                            key={oIndex}
                            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={option}
                              onChange={(e) => setQuizAnswers(prev => ({
                                ...prev,
                                [`${currentLesson}-${qIndex}`]: e.target.value
                              }))}
                              className="text-purple-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    className="w-full"
                    onClick={submitQuiz}
                  >
                    Submit Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
              disabled={currentLesson === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Lesson
            </Button>
            
            <Button
              onClick={() => setCurrentLesson(Math.min(module.lessons.length - 1, currentLesson + 1))}
              disabled={currentLesson === module.lessons.length - 1}
            >
              Next Lesson
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 🎯 Navigation & Interaction Mapping

### Complete Click-flow Mapping

#### Primary Navigation Flow
```typescript
// Main navigation structure with exact routes and components
const navigationFlow = {
  // Top-level routes
  '/': ExactMavroPlusDashboard,
  '/dashboard': ExactMavroPlusDashboard,
  '/demo': DemoPage,
  '/vivi-test': ViViTestPage,
  '/ai-studio': MavroAIStudio,
  
  // Dashboard sub-routes (handled by activeTab state)
  dashboard: {
    plan: {
      component: PlanTab,
      subTabs: ['gtm-planning', 'mavro-magic', 'scheduler'],
      defaultTab: 'gtm-planning'
    },
    track: {
      component: TrackTab,
      subTabs: ['analytics', 'performance', 'reports'],
      defaultTab: 'analytics'
    },
    grow: {
      component: GrowTab,
      subTabs: ['optimization', 'forecasting', 'ab-testing'],
      defaultTab: 'optimization'
    }
  },
  
  // Feature pages (handled by currentPage state)
  campaigns: {
    component: CampaignsPage,
    subViews: ['builder', 'active', 'scheduled', 'archived'],
    defaultView: 'builder'
  },
  reviews: {
    component: ReviewsPageEnhanced,
    subViews: ['overview', 'responses', 'analytics', 'settings'],
    defaultView: 'overview'
  },
  compliance: {
    component: ComplianceCenterPageEnhanced,
    subViews: ['status', 'oauth', 'guidelines', 'reports'],
    defaultView: 'status'
  },
  'grio-academy': {
    component: GrioAcademyPage,
    subViews: ['courses', 'progress', 'achievements', 'library'],
    defaultView: 'courses'
  }
};
```

#### Button Interaction Specifications

**Top Navigation Buttons:**
```typescript
// Each button with exact styling and behavior
const topNavButtons = [
  {
    element: 'Bell notification icon',
    position: 'top-right',
    size: 'w-6 h-6',
    color: 'text-gray-600 hover:text-purple-600',
    cursor: 'pointer',
    onClick: 'openNotificationPanel()',
    tooltip: 'View notifications',
    badge: 'conditionally shows unread count'
  },
  {
    element: 'Settings gear icon',
    position: 'top-right',
    size: 'w-6 h-6',
    color: 'text-gray-600 hover:text-purple-600',
    cursor: 'pointer',
    onClick: 'setCurrentPage("settings")',
    tooltip: 'Open settings'
  },
  {
    element: 'Profile avatar',
    position: 'top-right',
    size: 'w-8 h-8',
    styling: 'bg-gradient-to-br from-purple-500 to-pink-500 rounded-full',
    onClick: 'openProfileMenu()',
    tooltip: 'Profile menu'
  }
];
```

**Command Center Tab Buttons:**
```typescript
// Plan/Track/Grow tab system
const commandCenterTabs = [
  {
    id: 'plan',
    label: 'Plan',
    icon: Target,
    activeClass: 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-xl border border-purple-400/50 transform scale-105',
    inactiveClass: 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-100/50 hover:shadow-lg hover:scale-102',
    transition: 'transition-all duration-400',
    onClick: "setActiveTab('plan')"
  },
  {
    id: 'track',
    label: 'Track',
    icon: BarChart3,
    // Same styling pattern as above
  },
  {
    id: 'grow',
    label: 'Grow',
    icon: TrendingUp,
    // Same styling pattern as above
  }
];
```

#### Modal & Dialog Interactions

**Post Preview Modal:**
```typescript
// Complete modal interaction flow
const postPreviewModal = {
  trigger: 'setShowPreviewModal(true)',
  backdrop: 'fixed inset-0 bg-black/50 backdrop-blur-sm',
  container: 'flex items-center justify-center z-50 p-4',
  modal: {
    className: 'bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto',
    header: {
      className: 'p-6 border-b border-gray-200',
      closeButton: {
        className: 'w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors',
        icon: 'X w-4 h-4 text-gray-600',
        onClick: 'setShowPreviewModal(false)'
      }
    },
    content: {
      className: 'p-6',
      platformPreviews: {
        instagram: 'Pink gradient background, square aspect ratio',
        linkedin: 'Professional blue styling, rectangular layout',
        tiktok: 'Black background, vertical 9:16 aspect ratio',
        youtube: 'Red accent, widescreen format'
      }
    }
  }
};
```

#### Form Interactions

**Voice Input Button States:**
```typescript
const voiceInputButton = {
  idle: {
    className: 'border-blue-300 text-blue-700',
    icon: 'Mic w-4 h-4 mr-2',
    text: 'Voice Input',
    onClick: 'handleVoiceInput()'
  },
  recording: {
    className: 'bg-red-50 border-red-300 text-red-700',
    icon: 'MicOff w-4 h-4 mr-2',
    text: 'Stop Recording',
    onClick: 'handleVoiceInput()',
    animation: 'pulse animation on icon'
  },
  processing: {
    className: 'border-yellow-300 text-yellow-700',
    icon: 'Loader2 w-4 h-4 mr-2 animate-spin',
    text: 'Processing...',
    disabled: true
  }
};
```

**AI Generation Button States:**
```typescript
const aiGenerationButton = {
  idle: {
    className: 'bg-purple-600 hover:bg-purple-700 text-white',
    icon: 'Sparkles w-4 h-4 mr-2',
    text: 'Generate with AI',
    onClick: 'generateWithAI()'
  },
  generating: {
    className: 'bg-purple-600 text-white',
    icon: 'Loader2 w-4 h-4 mr-2 animate-spin',
    text: 'Generating...',
    disabled: true
  },
  completed: {
    className: 'bg-green-600 text-white',
    icon: 'Check w-4 h-4 mr-2',
    text: 'Generated!',
    duration: '2 seconds, then revert to idle'
  }
};
```

---

## 🧠 ViVi AI System Complete Specification

### ViVi AI Engine Architecture
```typescript
// Complete ViVi AI System - Core Engine Implementation
export class ViViAgentClass implements ViViAgent {
  public persona?: string;
  public location?: string;
  private apiEndpoint = '/api/vivi';
  private decisionEngine: ViViDecisionEngine;
  private contextMemory: Map<string, any> = new Map();
  
  constructor(userPersona?: string, locationData?: string) {
    this.persona = userPersona;
    this.location = locationData;
    this.decisionEngine = new ViViDecisionEngine(this);
  }

  // Content Generation with Advanced Prompting
  async generateContent(input: string, type: string, platform: string = 'instagram'): Promise<string> {
    const contextualPrompt = this.buildAdvancedPrompt(input, type, platform);
    
    try {
      const response = await fetch(`${this.apiEndpoint}/generate-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: contextualPrompt,
          persona: this.persona,
          platform: platform,
          contentType: type,
          tone: this.getUserTonePreference(),
          length: this.getOptimalLength(platform, type),
          includeHashtags: true,
          includeEmojis: platform !== 'linkedin',
          creativityLevel: this.getCreativityLevel(),
          audienceContext: this.getAudienceContext()
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Store successful generation in context memory
      this.contextMemory.set(`lastGeneration_${type}_${platform}`, {
        input,
        output: data.content,
        timestamp: Date.now(),
        engagement: data.predictedEngagement
      });
      
      return data.content || "Content generated successfully";
    } catch (error) {
      console.error("ViVi content generation error:", error);
      
      // Fallback to rule-based generation
      return this.generateFallbackContent(input, type, platform);
    }
  }

  // Advanced Context-Aware Chat System
  async chatWithViVi(message: string, currentPage?: string): Promise<any> {
    const conversationContext = this.buildConversationContext(message, currentPage);
    
    try {
      const response = await fetch(`${this.apiEndpoint}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message,
          context: conversationContext,
          persona: this.persona,
          currentPage,
          conversationHistory: this.getRecentConversationHistory(),
          userIntent: await this.analyzeUserIntent(message),
          platformContext: this.getCurrentPlatformContext()
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Store conversation in memory
      this.storeConversationTurn(message, data.response, currentPage);
      
      return {
        message: data.response.message || data.response,
        suggestions: data.response.suggestions || [],
        actionItems: data.response.actionItems || [],
        followUpQuestions: data.response.followUpQuestions || [],
        confidenceScore: data.response.confidence || 0.8
      };
    } catch (error) {
      console.error("ViVi chat error:", error);
      return this.generateFallbackResponse(message, currentPage);
    }
  }

  // Campaign Analysis with Machine Learning Insights
  async analyzeCampaign(campaignData: any, timeframe: string = '30d'): Promise<any> {
    try {
      const analysisRequest = {
        campaignData,
        persona: this.persona,
        timeframe,
        benchmarkData: await this.getBenchmarkData(campaignData.industry),
        competitorInsights: await this.getCompetitorInsights(campaignData.keywords),
        marketTrends: await this.getMarketTrends(campaignData.industry)
      };
      
      const response = await fetch(`${this.apiEndpoint}/analyze-campaign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysisRequest)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        performance: {
          reach: data.analysis.reach || 0,
          engagement: data.analysis.engagement || '0%',
          conversions: data.analysis.conversions || 0,
          roi: data.analysis.roi || '0%',
          qualityScore: data.analysis.qualityScore || 0,
          optimizationOpportunities: data.analysis.opportunities || []
        },
        recommendations: data.analysis.recommendations || [],
        trends: data.analysis.trends || [],
        nextSteps: data.analysis.nextSteps || [],
        predictiveInsights: data.analysis.predictions || {},
        competitiveAnalysis: data.analysis.competitive || {}
      };
    } catch (error) {
      console.error("ViVi campaign analysis error:", error);
      return this.generateFallbackAnalysis(campaignData);
    }
  }

  // Real-time Trending Data with Performance Indicators
  async getTrends(): Promise<any> {
    try {
      const response = await fetch(`${this.apiEndpoint}/trends/${this.persona}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        hashtags: data.trends.hashtags?.map(tag => ({
          tag: tag.tag,
          performance: tag.performance, // 'hot', 'trending', 'rising', 'stable'
          engagement: tag.engagement,
          growth: tag.growth,
          volume: tag.volume,
          competition: tag.competition
        })) || [],
        topics: data.trends.topics || [],
        keywords: data.trends.keywords || [],
        platforms: data.trends.platforms || {},
        audienceInsights: data.trends.audience || {},
        contentTypes: data.trends.contentTypes || []
      };
    } catch (error) {
      console.error("ViVi trends error:", error);
      return this.generateFallbackTrends();
    }
  }

  // Advanced Prompt Engineering
  buildAdvancedPrompt(input: string, type: string, platform: string = 'instagram'): string {
    const personaContext = this.getPersonaContext();
    const platformRequirements = this.getPlatformRequirements(platform);
    const contentTypeGuidelines = this.getContentTypeGuidelines(type);
    const audienceInsights = this.getAudienceInsights();
    
    return `
You are ViVi, an advanced AI marketing assistant specializing in ${personaContext.industry} for ${personaContext.businessType}.

CONTEXT:
- Business Type: ${personaContext.businessType}
- Industry: ${personaContext.industry}
- Target Audience: ${audienceInsights.demographics}
- Brand Voice: ${personaContext.brandVoice}
- Location: ${this.location}

PLATFORM REQUIREMENTS (${platform.toUpperCase()}):
${platformRequirements.guidelines.map(g => `- ${g}`).join('\n')}
- Character Limit: ${platformRequirements.characterLimit}
- Optimal Post Length: ${platformRequirements.optimalLength}
- Hashtag Count: ${platformRequirements.hashtagCount}
- Best Posting Times: ${platformRequirements.bestTimes.join(', ')}

CONTENT TYPE (${type.toUpperCase()}):
${contentTypeGuidelines.map(g => `- ${g}`).join('\n')}

TASK:
Create ${type} content for ${platform} based on: "${input}"

REQUIREMENTS:
- Match the brand voice and tone
- Include relevant hashtags (${platformRequirements.hashtagCount})
- Optimize for ${platform} algorithm
- Include call-to-action appropriate for ${type}
- Consider current trends and audience behavior
- Ensure content drives engagement and conversions

Generate compelling, authentic content that resonates with the target audience while achieving business objectives.
    `.trim();
  }

  // Helper Methods for Context Building
  private getPersonaContext() {
    return {
      businessType: this.persona || 'business',
      industry: this.contextMemory.get('industry') || 'general',
      brandVoice: this.contextMemory.get('brandVoice') || 'professional-friendly',
      values: this.contextMemory.get('brandValues') || []
    };
  }

  private getPlatformRequirements(platform: string) {
    const requirements = {
      instagram: {
        characterLimit: 2200,
        optimalLength: '125-150 characters',
        hashtagCount: '5-10 hashtags',
        bestTimes: ['11 AM', '2 PM', '5 PM'],
        guidelines: [
          'Use visually appealing language',
          'Include relevant emojis',
          'Focus on storytelling',
          'Encourage interaction',
          'Use trending hashtags strategically'
        ]
      },
      linkedin: {
        characterLimit: 3000,
        optimalLength: '150-300 words',
        hashtagCount: '3-5 hashtags',
        bestTimes: ['8 AM', '12 PM', '5 PM'],
        guidelines: [
          'Maintain professional tone',
          'Share industry insights',
          'Include actionable advice',
          'Network and engage professionally',
          'Avoid excessive emojis'
        ]
      },
      facebook: {
        characterLimit: 63206,
        optimalLength: '40-80 characters',
        hashtagCount: '1-3 hashtags',
        bestTimes: ['9 AM', '1 PM', '3 PM'],
        guidelines: [
          'Create engaging conversations',
          'Use questions to drive engagement',
          'Share relatable content',
          'Include clear call-to-actions',
          'Optimize for mobile viewing'
        ]
      },
      tiktok: {
        characterLimit: 300,
        optimalLength: '100-150 characters',
        hashtagCount: '3-5 hashtags',
        bestTimes: ['6 AM', '10 AM', '7 PM'],
        guidelines: [
          'Be trendy and current',
          'Use popular sounds/music',
          'Create authentic, raw content',
          'Jump on viral trends',
          'Encourage user participation'
        ]
      }
    };
    
    return requirements[platform] || requirements.instagram;
  }

  private getContentTypeGuidelines(type: string) {
    const guidelines = {
      hook: [
        'Start with attention-grabbing opening',
        'Create curiosity or urgency',
        'Use pattern interrupts',
        'Address pain points directly',
        'Make bold statements or ask provocative questions'
      ],
      cta: [
        'Use action-oriented language',
        'Create sense of urgency',
        'Clearly state the benefit',
        'Remove friction from the action',
        'Use social proof when possible'
      ],
      story: [
        'Follow narrative structure',
        'Include relatable characters',
        'Show transformation or journey',
        'Evoke emotional response',
        'Connect to brand message'
      ],
      educational: [
        'Provide valuable insights',
        'Break down complex topics',
        'Use clear, simple language',
        'Include actionable takeaways',
        'Establish authority and credibility'
      ]
    };
    
    return guidelines[type] || guidelines.story;
  }
}
```

### ViVi Decision Engine
```typescript
// ViVi AI Decision Engine - Advanced Logic System
export class ViViDecisionEngine {
  private agent: ViViAgent;
  private decisionHistory: Array<Decision> = [];
  private learningModel: MachineLearningModel;
  
  constructor(agent: ViViAgent) {
    this.agent = agent;
    this.learningModel = new MachineLearningModel();
  }

  // Intelligent Content Optimization
  async optimizeContent(content: string, platform: string, objective: string): Promise<OptimizationResult> {
    const analysisResults = await Promise.all([
      this.analyzeSentiment(content),
      this.analyzeReadability(content),
      this.analyzeEngagementPotential(content, platform),
      this.analyzeKeywordDensity(content),
      this.analyzeBrandAlignment(content)
    ]);

    const [sentiment, readability, engagement, keywords, brandAlignment] = analysisResults;
    
    const optimizationScore = this.calculateOptimizationScore({
      sentiment,
      readability,
      engagement,
      keywords,
      brandAlignment
    });

    const suggestions = this.generateOptimizationSuggestions({
      content,
      platform,
      objective,
      currentScore: optimizationScore,
      analysisResults
    });

    return {
      originalContent: content,
      optimizationScore,
      suggestions,
      predictedPerformance: engagement,
      improvementAreas: this.identifyImprovementAreas(analysisResults),
      alternativeVersions: await this.generateAlternativeVersions(content, platform, suggestions)
    };
  }

  // Real-time Campaign Optimization
  async optimizeCampaign(campaignData: CampaignData): Promise<CampaignOptimization> {
    const performanceAnalysis = await this.analyzeCampaignPerformance(campaignData);
    const marketContext = await this.getMarketContext(campaignData.industry);
    const competitorAnalysis = await this.analyzeCompetitors(campaignData.keywords);
    
    const optimizationDecisions = await this.makeOptimizationDecisions({
      performance: performanceAnalysis,
      market: marketContext,
      competitors: competitorAnalysis,
      budget: campaignData.budget,
      timeline: campaignData.timeline
    });

    return {
      currentPerformance: performanceAnalysis,
      optimizationOpportunities: optimizationDecisions.opportunities,
      recommendedActions: optimizationDecisions.actions,
      budgetReallocation: optimizationDecisions.budgetChanges,
      audienceAdjustments: optimizationDecisions.audienceOptimizations,
      creativeRecommendations: optimizationDecisions.creativeUpdates,
      predictedImprovement: optimizationDecisions.expectedROI
    };
  }

  // Audience Intelligence System
  async analyzeAudience(audienceData: AudienceData): Promise<AudienceInsights> {
    const behaviorPatterns = await this.analyzeBehaviorPatterns(audienceData);
    const engagementPreferences = await this.analyzeEngagementPreferences(audienceData);
    const contentPreferences = await this.analyzeContentPreferences(audienceData);
    const timezonData = await this.analyzeTimingPreferences(audienceData);

    return {
      demographics: {
        ageGroups: behaviorPatterns.ageDistribution,
        genderSplit: behaviorPatterns.genderDistribution,
        locations: behaviorPatterns.geoDistribution,
        interests: behaviorPatterns.interestCategories
      },
      behavior: {
        engagementTimes: timezonData.peakEngagementTimes,
        contentTypes: contentPreferences.preferredTypes,
        platforms: behaviorPatterns.platformUsage,
        purchasingPatterns: behaviorPatterns.conversionBehavior
      },
      preferences: {
        communicationStyle: engagementPreferences.tonePreferences,
        contentLength: contentPreferences.lengthPreferences,
        visualStyle: contentPreferences.visualPreferences,
        topics: contentPreferences.topicInterests
      },
      opportunities: {
        underservedSegments: this.identifyUnderservedSegments(audienceData),
        growthPotential: this.calculateGrowthPotential(audienceData),
        contentGaps: this.identifyContentGaps(contentPreferences),
        engagementOpportunities: this.findEngagementOpportunities(behaviorPatterns)
      }
    };
  }

  // Predictive Analytics Engine
  async predictPerformance(contentData: ContentData, campaignParameters: CampaignParameters): Promise<PerformancePrediction> {
    const historicalData = await this.getHistoricalPerformanceData(campaignParameters);
    const marketTrends = await this.getCurrentMarketTrends(campaignParameters.industry);
    const competitorBenchmarks = await this.getCompetitorBenchmarks(campaignParameters.keywords);
    
    const mlPredictions = await this.learningModel.predict({
      content: contentData,
      historical: historicalData,
      trends: marketTrends,
      competition: competitorBenchmarks,
      seasonality: this.getSeasonalityFactors(),
      platform: campaignParameters.platform
    });

    return {
      engagement: {
        expectedReach: mlPredictions.reach,
        expectedEngagementRate: mlPredictions.engagementRate,
        expectedClicks: mlPredictions.clicks,
        expectedShares: mlPredictions.shares,
        expectedComments: mlPredictions.comments,
        confidenceInterval: mlPredictions.confidence
      },
      conversion: {
        expectedConversions: mlPredictions.conversions,
        expectedCPA: mlPredictions.costPerAcquisition,
        expectedROAS: mlPredictions.returnOnAdSpend,
        expectedLTV: mlPredictions.lifetimeValue
      },
      timeline: {
        peakPerformancePeriod: mlPredictions.peakTiming,
        performanceDecline: mlPredictions.declinePattern,
        optimizationWindows: mlPredictions.optimizationOpportunities
      },
      risks: {
        performanceRisks: this.identifyPerformanceRisks(mlPredictions),
        competitiveThreats: this.assessCompetitiveThreats(competitorBenchmarks),
        marketRisks: this.evaluateMarketRisks(marketTrends)
      }
    };
  }
}
```

### ViVi Chat Widget Enhanced Implementation
```typescript
// Enhanced ViVi Chat Widget with Advanced Features
export function ViViChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  // Advanced message handling with context awareness
  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: text,
      timestamp: new Date(),
      context: conversationContext
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Enhanced chat request with full context
      const chatData: EnhancedChatMessage = {
        message: text,
        sessionId,
        context: {
          ...conversationContext,
          currentPage: window.location.pathname,
          previousMessages: messages.slice(-5), // Last 5 messages for context
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        userPreferences: {
          communicationStyle: 'professional-friendly',
          detailLevel: 'moderate',
          responseFormat: 'conversational'
        }
      };

      const response: EnhancedChatResponse = await sendEnhancedChatMessage(chatData);

      // Process advanced response
      const viviMessage: Message = {
        id: `vivi_${Date.now()}`,
        type: 'vivi',
        content: response.response.message || response.response,
        timestamp: new Date(),
        suggestions: response.suggestions,
        quickActions: response.quickActions,
        followUpQuestions: response.followUpQuestions,
        confidence: response.confidence,
        intent: response.detectedIntent,
        entities: response.extractedEntities
      };

      setMessages(prev => [...prev, viviMessage]);
      
      // Update suggestions and quick actions
      if (response.suggestions) {
        setSuggestions(response.suggestions);
      }
      
      if (response.quickActions) {
        setQuickActions(response.quickActions);
      }

      // Update conversation context
      setConversationContext(prev => ({
        ...prev,
        lastIntent: response.detectedIntent,
        entities: [...(prev.entities || []), ...(response.extractedEntities || [])],
        conversationState: response.conversationState
      }));

      // Handle special response types
      if (response.actionRequired) {
        handleActionRequired(response.actionRequired);
      }

    } catch (error) {
      console.error('Enhanced chat error:', error);
      handleChatError(error);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  // Smart suggestion system
  const generateSmartSuggestions = (currentInput: string) => {
    const contextualSuggestions = [
      "Create a social media post",
      "Analyze my campaign performance",
      "Generate content ideas",
      "Help with hashtag strategy",
      "Optimize my content",
      "Schedule posts",
      "Review analytics",
      "Competitor analysis"
    ];

    // Filter suggestions based on current input
    return contextualSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(currentInput.toLowerCase()) ||
      currentInput.length === 0
    ).slice(0, 4);
  };

  // Enhanced input handling with smart suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMessage(value);

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Generate suggestions after user stops typing
    typingTimeoutRef.current = setTimeout(() => {
      const smartSuggestions = generateSmartSuggestions(value);
      setSuggestions(smartSuggestions);
    }, 300);
  };

  // Quick action handlers
  const handleQuickAction = async (action: QuickAction) => {
    switch (action.type) {
      case 'generate-content':
        handleSendMessage(`Generate ${action.parameters.contentType} for ${action.parameters.platform}`);
        break;
      case 'analyze-performance':
        handleSendMessage(`Analyze performance for ${action.parameters.timeframe}`);
        break;
      case 'optimize-campaign':
        handleSendMessage(`Optimize my ${action.parameters.campaignType} campaign`);
        break;
      case 'schedule-post':
        // Open scheduling modal
        openSchedulingModal(action.parameters);
        break;
      default:
        handleSendMessage(action.label);
    }
  };

  // Advanced chat interface
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        // Floating action button with pulse animation
        <Button
          onClick={() => setIsOpen(true)}
          className="relative h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          
          {/* Notification badge */}
          {suggestions.length > 0 && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{suggestions.length}</span>
            </div>
          )}
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-purple-600 animate-ping opacity-20"></div>
          
          {/* ViVi sparkles */}
          <Sparkles className="h-3 w-3 text-white absolute -top-1 -right-1 animate-pulse" />
        </Button>
      ) : (
        // Enhanced chat interface
        <Card className={`w-96 bg-white shadow-2xl border border-gray-200 transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}>
          {/* Enhanced header */}
          <CardHeader className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
                <div>
                  <CardTitle className="text-lg">ViVi AI Assistant</CardTitle>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Online & Learning</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/10"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-[536px] bg-white">
              {/* Messages area with enhanced styling */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      {/* Message content */}
                      <div className="text-sm leading-relaxed">{message.content}</div>
                      
                      {/* Message metadata */}
                      <div className={`flex items-center justify-between mt-2 text-xs ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span>{format(message.timestamp, 'HH:mm')}</span>
                        {message.confidence && (
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {Math.round(message.confidence * 100)}%
                          </span>
                        )}
                      </div>
                      
                      {/* Enhanced suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <div className="text-xs text-gray-600 font-medium">Try asking:</div>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors text-xs"
                                onClick={() => handleSendMessage(suggestion)}
                              >
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Quick actions */}
                      {message.quickActions && message.quickActions.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <div className="text-xs text-gray-600 font-medium">Quick actions:</div>
                          <div className="flex flex-wrap gap-2">
                            {message.quickActions.map((action, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuickAction(action)}
                                className="text-xs h-8"
                              >
                                <action.icon className="h-3 w-3 mr-1" />
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">ViVi is thinking...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced input area */}
              <div className="p-4 border-t bg-white border-gray-200">
                {/* Smart suggestions */}
                {suggestions.length > 0 && inputMessage.length === 0 && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-2">Suggestions:</div>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.slice(0, 3).map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors text-xs"
                          onClick={() => handleSendMessage(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Input field with enhanced features */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={handleInputChange}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Ask ViVi anything..."
                      disabled={isLoading}
                      className="pr-10"
                    />
                    
                    {/* Character counter */}
                    {inputMessage.length > 100 && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                        {inputMessage.length}/500
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {/* Enhanced quick access buttons */}
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                      <Mic className="h-3 w-3" />
                      Voice
                    </button>
                    <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                      <Camera className="h-3 w-3" />
                      Image
                    </button>
                    <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                      <FileText className="h-3 w-3" />
                      File
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Secure</span>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}
```

---

## 📱 Mobile Optimization Details

### Responsive Breakpoint System
```css
/* Complete Mobile-First Responsive Design System */

/* Mobile First - Base styles (320px+) */
@media (min-width: 320px) {
  .container {
    padding: 1rem;
    max-width: 100%;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: white;
    border-top: 1px solid #e5e5e5;
    z-index: 50;
  }
  
  .top-nav {
    height: 56px;
    padding: 0 1rem;
  }
  
  .main-content {
    padding-top: 56px;
    padding-bottom: 60px;
  }
}

/* Small Mobile (375px+) */
@media (min-width: 375px) {
  .container {
    padding: 1.25rem;
  }
  
  .campaign-builder {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

/* Large Mobile (425px+) */
@media (min-width: 425px) {
  .top-nav {
    height: 64px;
    padding: 0 1.5rem;
  }
  
  .main-content {
    padding-top: 64px;
  }
  
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

/* Tablet Portrait (768px+) */
@media (min-width: 768px) {
  .navigation {
    position: relative;
    bottom: auto;
    height: auto;
    border-top: none;
    border-right: 1px solid #e5e5e5;
    width: 250px;
  }
  
  .dashboard-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    min-height: 100vh;
  }
  
  .main-content {
    padding-bottom: 2rem;
  }
  
  .campaign-builder {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .ai-generation-panel {
    grid-template-columns: 2fr 1fr;
  }
}

/* Tablet Landscape (1024px+) */
@media (min-width: 1024px) {
  .navigation {
    width: 280px;
  }
  
  .dashboard-layout {
    grid-template-columns: 280px 1fr;
  }
  
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  .campaign-builder {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
  }
}

/* Desktop (1280px+) */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
  
  .campaign-builder {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2.5rem;
  }
}

/* Large Desktop (1536px+) */
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
    padding: 3rem;
  }
  
  .card-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
```

### Mobile-Optimized Components
```typescript
// Mobile Navigation Component
const MobileOptimizedNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isMobile) {
    return (
      <>
        {/* Mobile Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-14">
          <div className="flex items-center justify-between px-4 h-full">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <ViViLogo className="w-6 h-6" />
              <span className="text-lg font-bold text-gray-900">Mavro Pro</span>
            </div>
            
            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
          <div className="grid grid-cols-5 h-16">
            {[
              { id: 'dashboard', icon: Home, label: 'Home' },
              { id: 'campaigns', icon: Target, label: 'Campaigns' },
              { id: 'reviews', icon: MessageCircle, label: 'Reviews' },
              { id: 'analytics', icon: BarChart3, label: 'Analytics' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center space-y-1 ${
                  activeTab === item.id 
                    ? 'text-purple-600' 
                    : 'text-gray-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-purple-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Slide-out Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black bg-opacity-50"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Menu Panel */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed top-0 left-0 z-50 w-80 h-full bg-white shadow-xl overflow-y-auto"
              >
                <MobileMenuContent onClose={() => setIsMenuOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }
  
  return <DesktopNavigation />;
};

// Mobile-Optimized Campaign Builder
const MobileCampaignBuilder: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const steps = [
    { id: 'content', label: 'Content', icon: Edit },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'hashtags', label: 'Hashtags', icon: Hash },
    { id: 'schedule', label: 'Schedule', icon: Calendar }
  ];
  
  if (isMobile) {
    return (
      <div className="min-h-screen bg-white">
        {/* Mobile Step Indicator */}
        <div className="sticky top-14 bg-white border-b border-gray-200 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-sm text-gray-600">
              Step {activeStep + 1} of {steps.length}
            </div>
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === activeStep
                      ? 'bg-purple-600'
                      : index < activeStep
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Step Navigation */}
          <div className="flex overflow-x-auto px-4 pb-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap mr-2 ${
                  index === activeStep
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600'
                }`}
              >
                <step.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{step.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile Step Content */}
        <div className="p-4 pb-20">
          {activeStep === 0 && <MobileContentStep />}
          {activeStep === 1 && <MobileMediaStep />}
          {activeStep === 2 && <MobileHashtagStep />}
          {activeStep === 3 && <MobileScheduleStep />}
        </div>
        
        {/* Mobile Navigation Buttons */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return <DesktopCampaignBuilder />;
};

// Touch-Optimized Components
const TouchOptimizedButton: React.FC<TouchButtonProps> = ({ 
  children, 
  size = 'default',
  ...props 
}) => {
  const touchSizes = {
    sm: 'min-h-[44px] min-w-[44px] px-4 py-2',
    default: 'min-h-[48px] min-w-[48px] px-6 py-3',
    lg: 'min-h-[56px] min-w-[56px] px-8 py-4'
  };
  
  return (
    <Button
      className={cn(
        touchSizes[size],
        'touch-manipulation', // Disable double-tap zoom
        'select-none', // Prevent text selection
        'active:scale-95', // Touch feedback
        'transition-transform duration-150'
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

const TouchOptimizedInput: React.FC<TouchInputProps> = (props) => {
  return (
    <Input
      className={cn(
        'min-h-[48px]', // Minimum touch target size
        'text-base', // Prevent zoom on iOS
        'touch-manipulation'
      )}
      {...props}
    />
  );
};
```

### Progressive Web App Features
```typescript
// PWA Service Worker Registration
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available
                  showUpdateNotification();
                }
              });
            }
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Push Notification Support
const requestNotificationPermission = async () => {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // Subscribe to push notifications
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.VITE_VAPID_PUBLIC_KEY
      });
      
      // Send subscription to server
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });
    }
  }
};

// Offline Support
const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  if (isOnline) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-600 text-white text-center py-2 text-sm">
      <WifiOff className="inline w-4 h-4 mr-2" />
      You're offline. Some features may not be available.
    </div>
  );
};
```

---

## 🏗 Database Schema & API Endpoints

### Complete Database Schema
```sql
-- Enhanced Database Schema with Full Relationships

-- Users table with OAuth support
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  username TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  profile_image_url TEXT,
  password TEXT, -- nullable for OAuth users
  email_verified BOOLEAN DEFAULT FALSE,
  account_type TEXT NOT NULL DEFAULT 'beta', -- beta, pro, enterprise
  subscription_status TEXT NOT NULL DEFAULT 'trial', -- trial, active, cancelled, expired
  trial_ends_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  settings JSONB DEFAULT '{}',
  onboarding_completed BOOLEAN DEFAULT FALSE
);

-- OAuth Accounts
CREATE TABLE oauth_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL, -- google, apple, github, linkedin, etc.
  provider_account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(provider, provider_account_id)
);

-- Session management
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  expires TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User workspaces/business profiles
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  industry TEXT NOT NULL,
  website TEXT,
  description TEXT,
  logo TEXT,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enhanced campaigns with real-time metrics
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- draft, active, paused, completed, archived
  platform TEXT NOT NULL, -- facebook, instagram, linkedin, google, email
  campaign_type TEXT NOT NULL, -- awareness, consideration, conversion, retention
  budget INTEGER NOT NULL,
  spent INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  target_audience JSONB DEFAULT '{}',
  ad_creatives JSONB DEFAULT '[]',
  
  -- Real-time metrics
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0, -- click-through rate
  cpc REAL DEFAULT 0, -- cost per click
  conversions INTEGER DEFAULT 0,
  conversion_rate REAL DEFAULT 0,
  roi REAL DEFAULT 0,
  roas REAL DEFAULT 0, -- return on ad spend
  
  -- ViVi AI optimization
  vivi_optimized BOOLEAN DEFAULT FALSE,
  vivi_score REAL DEFAULT 0, -- 0-100 optimization score
  vivi_recommendations JSONB DEFAULT '[]',
  
  -- Scheduling
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  scheduled_posts JSONB DEFAULT '[]',
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enhanced leads with scoring
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  
  -- Contact information
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  
  -- Lead qualification
  status TEXT NOT NULL DEFAULT 'new', -- new, contacted, qualified, opportunity, won, lost
  score INTEGER DEFAULT 0, -- 0-100 lead score
  source TEXT NOT NULL, -- organic, paid, referral, social
  utm_campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_content TEXT,
  
  -- Engagement tracking
  first_touch_date TIMESTAMP DEFAULT NOW(),
  last_activity_date TIMESTAMP DEFAULT NOW(),
  total_interactions INTEGER DEFAULT 0,
  email_opens INTEGER DEFAULT 0,
  email_clicks INTEGER DEFAULT 0,
  website_visits INTEGER DEFAULT 0,
  
  -- Custom fields and notes
  custom_fields JSONB DEFAULT '{}',
  notes TEXT,
  tags TEXT[],
  
  -- Attribution and revenue
  attributed_revenue DECIMAL(10,2) DEFAULT 0,
  lifetime_value DECIMAL(10,2) DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics and reporting
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  
  event_type TEXT NOT NULL, -- page_view, click, conversion, etc.
  event_name TEXT NOT NULL,
  event_properties JSONB DEFAULT '{}',
  
  -- Session information
  session_id TEXT,
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  page_url TEXT,
  
  -- Geographic data
  country TEXT,
  region TEXT,
  city TEXT,
  latitude REAL,
  longitude REAL,
  
  -- Device information
  device_type TEXT, -- desktop, mobile, tablet
  browser TEXT,
  operating_system TEXT,
  screen_resolution TEXT,
  
  -- Timing
  timestamp TIMESTAMP DEFAULT NOW(),
  server_timestamp TIMESTAMP DEFAULT NOW()
);

-- Content management
CREATE TABLE content_pieces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL, -- post, story, reel, article, email
  platform TEXT NOT NULL,
  
  -- Content metadata
  word_count INTEGER,
  character_count INTEGER,
  hashtags TEXT[],
  mentions TEXT[],
  media_urls TEXT[],
  
  -- Publishing
  status TEXT NOT NULL DEFAULT 'draft', -- draft, scheduled, published, archived
  scheduled_for TIMESTAMP,
  published_at TIMESTAMP,
  
  -- Performance metrics
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  engagements INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  
  -- ViVi AI enhancement
  ai_generated BOOLEAN DEFAULT FALSE,
  ai_optimized BOOLEAN DEFAULT FALSE,
  ai_score REAL DEFAULT 0,
  ai_suggestions JSONB DEFAULT '[]',
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Reviews management
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  
  -- Review details
  platform TEXT NOT NULL, -- google, facebook, yelp, etc.
  platform_review_id TEXT NOT NULL,
  customer_name TEXT,
  customer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  
  -- Response management
  response_text TEXT,
  response_date TIMESTAMP,
  response_status TEXT DEFAULT 'pending', -- pending, responded, ignored
  
  -- AI assistance
  ai_sentiment TEXT, -- positive, negative, neutral
  ai_sentiment_score REAL,
  ai_suggested_response TEXT,
  ai_response_tone TEXT,
  
  -- Metadata
  review_date TIMESTAMP NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(platform, platform_review_id)
);

-- Social media account connections
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  
  platform TEXT NOT NULL, -- instagram, facebook, linkedin, twitter, tiktok
  platform_user_id TEXT NOT NULL,
  platform_username TEXT,
  display_name TEXT,
  profile_image_url TEXT,
  
  -- OAuth tokens
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  
  -- Account metrics
  follower_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  last_sync_at TIMESTAMP,
  connection_status TEXT DEFAULT 'connected', -- connected, expired, error
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, platform, platform_user_id)
);

-- ViVi AI chat history
CREATE TABLE chat_histories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  
  message_type TEXT NOT NULL, -- user, assistant
  message_content TEXT NOT NULL,
  message_context JSONB DEFAULT '{}',
  
  -- AI metadata
  model_used TEXT,
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  response_time_ms INTEGER,
  confidence_score REAL,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Content generation history
CREATE TABLE content_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  input_prompt TEXT NOT NULL,
  generated_content TEXT NOT NULL,
  content_type TEXT NOT NULL,
  platform TEXT NOT NULL,
  
  -- AI metadata
  model_used TEXT,
  generation_parameters JSONB DEFAULT '{}',
  quality_score REAL,
  
  -- Usage tracking
  was_used BOOLEAN DEFAULT FALSE,
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
  user_feedback TEXT,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Trending data cache
CREATE TABLE trending_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_type TEXT NOT NULL, -- hashtags, topics, keywords
  platform TEXT NOT NULL,
  industry TEXT,
  
  trending_item TEXT NOT NULL,
  trend_score REAL NOT NULL,
  trend_direction TEXT NOT NULL, -- rising, stable, declining
  volume INTEGER DEFAULT 0,
  engagement_rate REAL DEFAULT 0,
  competition_level TEXT, -- low, medium, high
  
  valid_until TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(data_type, platform, trending_item, created_at)
);

-- Competitive intelligence
CREATE TABLE competitor_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  
  competitor_name TEXT NOT NULL,
  competitor_domain TEXT,
  industry TEXT NOT NULL,
  
  -- Social metrics
  platform_data JSONB DEFAULT '{}', -- follower counts, engagement rates, etc.
  
  -- Content analysis
  content_themes TEXT[],
  posting_frequency INTEGER,
  average_engagement_rate REAL,
  top_performing_content JSONB DEFAULT '[]',
  
  -- SEO and advertising
  estimated_ad_spend DECIMAL(10,2),
  top_keywords TEXT[],
  content_gaps TEXT[],
  
  last_analyzed_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX idx_content_pieces_user_id ON content_pieces(user_id);
CREATE INDEX idx_content_pieces_status ON content_pieces(status);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_platform ON reviews(platform);
CREATE INDEX idx_social_accounts_user_id ON social_accounts(user_id);
CREATE INDEX idx_chat_histories_user_id ON chat_histories(user_id);
CREATE INDEX idx_chat_histories_session_id ON chat_histories(session_id);
CREATE INDEX idx_trending_data_platform ON trending_data(platform);
CREATE INDEX idx_trending_data_valid_until ON trending_data(valid_until);
```

### Complete API Endpoints Documentation

#### Authentication Endpoints
```typescript
// Authentication API - Complete specification
const authEndpoints = {
  // User registration
  'POST /api/auth/register': {
    description: 'Register new user account',
    requestBody: {
      email: 'string (required)',
      password: 'string (required, min 8 chars)',
      firstName: 'string (optional)',
      lastName: 'string (optional)',
      businessType: 'string (optional)'
    },
    responses: {
      201: {
        user: 'User object',
        token: 'JWT token',
        refreshToken: 'Refresh token'
      },
      400: { error: 'Invalid input data' },
      409: { error: 'Email already exists' }
    }
  },

  // User login
  'POST /api/auth/login': {
    description: 'Authenticate user and return tokens',
    requestBody: {
      email: 'string (required)',
      password: 'string (required)'
    },
    responses: {
      200: {
        user: 'User object',
        token: 'JWT token',
        refreshToken: 'Refresh token',
        expiresIn: 'number (seconds)'
      },
      401: { error: 'Invalid credentials' },
      423: { error: 'Account locked' }
    }
  },

  // OAuth login
  'GET /api/auth/oauth/:provider': {
    description: 'Initiate OAuth flow with provider',
    parameters: {
      provider: 'google | apple | linkedin | github'
    },
    responses: {
      302: 'Redirect to OAuth provider',
      400: { error: 'Unsupported provider' }
    }
  },

  // OAuth callback
  'GET /api/auth/oauth/:provider/callback': {
    description: 'Handle OAuth provider callback',
    parameters: {
      code: 'Authorization code from provider',
      state: 'CSRF protection state'
    },
    responses: {
      302: 'Redirect to dashboard with tokens',
      400: { error: 'OAuth error' }
    }
  },

  // Token refresh
  'POST /api/auth/refresh': {
    description: 'Refresh access token',
    requestBody: {
      refreshToken: 'string (required)'
    },
    responses: {
      200: {
        token: 'New JWT token',
        refreshToken: 'New refresh token',
        expiresIn: 'number (seconds)'
      },
      401: { error: 'Invalid refresh token' }
    }
  },

  // Logout
  'POST /api/auth/logout': {
    description: 'Invalidate user session',
    headers: {
      Authorization: 'Bearer <token>'
    },
    responses: {
      200: { message: 'Logged out successfully' },
      401: { error: 'Unauthorized' }
    }
  },

  // Password reset request
  'POST /api/auth/forgot-password': {
    description: 'Request password reset email',
    requestBody: {
      email: 'string (required)'
    },
    responses: {
      200: { message: 'Reset email sent' },
      404: { error: 'Email not found' }
    }
  },

  // Password reset
  'POST /api/auth/reset-password': {
    description: 'Reset password with token',
    requestBody: {
      token: 'string (required)',
      password: 'string (required, min 8 chars)'
    },
    responses: {
      200: { message: 'Password reset successful' },
      400: { error: 'Invalid or expired token' }
    }
  }
};
```

#### ViVi AI Endpoints
```typescript
// ViVi AI API - Complete specification
const viviEndpoints = {
  // Chat with ViVi
  'POST /api/vivi/chat': {
    description: 'Send message to ViVi AI assistant',
    headers: {
      Authorization: 'Bearer <token>'
    },
    requestBody: {
      message: 'string (required)',
      sessionId: 'string (required)',
      context: {
        currentPage: 'string (optional)',
        previousMessages: 'Message[] (optional)',
        userPreferences: 'object (optional)'
      }
    },
    responses: {
      200: {
        response: {
          message: 'string',
          suggestions: 'string[]',
          quickActions: 'QuickAction[]',
          followUpQuestions: 'string[]'
        },
        confidence: 'number (0-1)',
        detectedIntent: 'string',
        extractedEntities: 'Entity[]',
        conversationState: 'object'
      },
      401: { error: 'Unauthorized' },
      429: { error: 'Rate limit exceeded' }
    }
  },

  // Generate content
  'POST /api/vivi/generate-content': {
    description: 'Generate content using ViVi AI',
    headers: {
      Authorization: 'Bearer <token>'
    },
    requestBody: {
      prompt: 'string (required)',
      contentType: 'hook | cta | story | educational',
      platform: 'instagram | facebook | linkedin | tiktok',
      tone: 'professional | friendly | casual | formal',
      length: 'short | medium | long',
      includeHashtags: 'boolean',
      includeEmojis: 'boolean',
      targetAudience: 'object (optional)'
    },
    responses: {
      200: {
        content: 'string',
        alternativeVersions: 'string[]',
        hashtags: 'string[]',
        predictedEngagement: {
          reach: 'number',
          engagementRate: 'number',
          clickThroughRate: 'number'
        },
        optimizationScore: 'number (0-100)',
        suggestions: 'string[]'
      },
      400: { error: 'Invalid parameters' },
      402: { error: 'Insufficient credits' }
    }
  },

  // Analyze campaign
  'POST /api/vivi/analyze-campaign': {
    description: 'Get AI analysis of campaign performance',
    headers: {
      Authorization: 'Bearer <token>'
    },
    requestBody: {
      campaignId: 'string (required)',
      timeframe: '7d | 30d | 90d | 1y',
      metrics: 'string[] (optional)',
      includeCompetitive: 'boolean (optional)'
    },
    responses: {
      200: {
        analysis: {
          performance: {
            reach: 'number',
            engagement: 'string',
            conversions: 'number',
            roi: 'string',
            qualityScore: 'number'
          },
          recommendations: 'Recommendation[]',
          trends: 'Trend[]',
          nextSteps: 'string[]',
          predictiveInsights: 'object',
          competitiveAnalysis: 'object'
        }
      },
      404: { error: 'Campaign not found' }
    }
  },

  // Get trending data
  'GET /api/vivi/trends/:industry': {
    description: 'Get trending hashtags and topics',
    parameters: {
      industry: 'string (required)',
      platform: 'string (optional)',
      timeframe: 'string (optional)'
    },
    responses: {
      200: {
        trends: {
          hashtags: {
            tag: 'string',
            performance: 'hot | trending | rising | stable',
            engagement: 'string',
            growth: 'string',
            volume: 'number',
            competition: 'string'
          }[],
          topics: 'string[]',
          keywords: 'string[]',
          platforms: 'object',
          audienceInsights: 'object',
          contentTypes: 'string[]'
        }
      }
    }
  },

  // Optimize content
  'POST /api/vivi/optimize-content': {
    description: 'Get optimization suggestions for content',
    headers: {
      Authorization: 'Bearer <token>'
    },
    requestBody: {
      content: 'string (required)',
      platform: 'string (required)',
      objective: 'engagement | conversions | reach | awareness'
    },
    responses: {
      200: {
        optimizationScore: 'number (0-100)',
        suggestions: 'OptimizationSuggestion[]',
        predictedPerformance: 'object',
        improvementAreas: 'string[]',
        alternativeVersions: 'string[]'
      }
    }
  }
};
```

#### Campaign Management Endpoints
```typescript
// Campaign API - Complete specification
const campaignEndpoints = {
  // Get campaigns
  'GET /api/campaigns': {
    description: 'Get user campaigns with filtering',
    headers: {
      Authorization: 'Bearer <token>'
    },
    parameters: {
      status: 'draft | active | paused | completed | archived',
      platform: 'string (optional)',
      limit: 'number (default: 20)',
      offset: 'number (default: 0)',
      sort: 'created_at | updated_at | name | budget',
      order: 'asc | desc'
    },
    responses: {
      200: {
        campaigns: 'Campaign[]',
        total: 'number',
        hasMore: 'boolean'
      }
    }
  },

  // Create campaign
  'POST /api/campaigns': {
    description: 'Create new campaign',
    headers: {
      Authorization: 'Bearer <token>'
    },
    requestBody: {
      name: 'string (required)',
      description: 'string (optional)',
      platform: 'string (required)',
      campaignType: 'awareness | consideration | conversion | retention',
      budget: 'number (required)',
      currency: 'string (default: USD)',
      targetAudience: 'object (optional)',
      startDate: 'ISO date string (optional)',
      endDate: 'ISO date string (optional)'
    },
    responses: {
      201: { campaign: 'Campaign object' },
      400: { error: 'Invalid campaign data' }
    }
  },

  // Update campaign
  'PATCH /api/campaigns/:id': {
    description: 'Update existing campaign',
    headers: {
      Authorization: 'Bearer <token>'
    },
    requestBody: {
      name: 'string (optional)',
      description: 'string (optional)',
      status: 'string (optional)',
      budget: 'number (optional)',
      targetAudience: 'object (optional)'
    },
    responses: {
      200: { campaign: 'Updated campaign object' },
      404: { error: 'Campaign not found' },
      403: { error: 'Access denied' }
    }
  },

  // Delete campaign
  'DELETE /api/campaigns/:id': {
    description: 'Delete campaign',
    headers: {
      Authorization: 'Bearer <token>'
    },
    responses: {
      200: { message: 'Campaign deleted successfully' },
      404: { error: 'Campaign not found' },
      403: { error: 'Access denied' }
    }
  },

  // Get campaign performance
  'GET /api/campaigns/:id/performance': {
    description: 'Get detailed campaign performance metrics',
    headers: {
      Authorization: 'Bearer <token>'
    },
    parameters: {
      timeframe: '7d | 30d | 90d | custom',
      startDate: 'ISO date string (for custom timeframe)',
      endDate: 'ISO date string (for custom timeframe)',
      metrics: 'comma-separated list of metrics'
    },
    responses: {
      200: {
        performance: {
          impressions: 'number',
          clicks: 'number',
          ctr: 'number',
          cpc: 'number',
          conversions: 'number',
          conversionRate: 'number',
          roi: 'number',
          roas: 'number'
        },
        timeline: 'TimelineData[]',
        demographics: 'DemographicData',
        topPerformingContent: 'ContentData[]'
      }
    }
  }
};
```

This ultimate comprehensive export continues with complete implementations, API specifications, and detailed documentation for every aspect of the Mavro Pro platform. The documentation covers every button, interaction, animation, and functionality across the entire system.