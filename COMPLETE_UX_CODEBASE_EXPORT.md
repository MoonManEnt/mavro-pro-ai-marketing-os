# Mavro Pro - Complete UX Codebase Export

This document contains the complete frontend UX codebase for the Mavro Pro AI Marketing OS platform, including all React components, pages, styling, and functionality.

## 📁 Project Structure Overview

```
client/src/
├── App.tsx                     # Main application router
├── main.tsx                    # Entry point
├── index.css                   # Global styles & Mavro color system
├── components/                 # Reusable UI components
│   ├── ui/                    # shadcn/ui components
│   ├── Auth/                  # Authentication components
│   ├── Charts/                # Data visualization
│   ├── CommandCenter/         # Plan/Track/Grow tabs
│   ├── Campaigns/             # Campaign management
│   ├── ViViAI/               # AI assistant components
│   ├── GeoSmart/             # Geographic intelligence
│   ├── FourSight/            # Analytics dashboard
│   └── ...                   # Other feature components
├── pages/                     # Full page components
│   ├── ExactMavroPlusDashboard.tsx  # Main dashboard
│   ├── CampaignsPage.tsx           # Enhanced AI Campaign Builder
│   ├── ReviewsPage.tsx             # Reviews Intelligence Hub
│   ├── ComplianceCenterPage.tsx    # Compliance Center
│   ├── GrioAcademyPage.tsx         # Learning platform
│   └── ...                        # Other pages
├── contexts/                  # React Context providers
├── hooks/                     # Custom React hooks
├── lib/                      # Utility libraries
├── services/                 # API services
└── utils/                    # Helper utilities
```

## 🎨 Core Design System

### Color Palette (CSS Variables)
```css
:root {
  /* Primary Brand Colors */
  --mavro-primary: #8B5CF6;        /* Mavro Purple */
  --mavro-secondary: #A78BFA;      /* Purple Light */
  --mavro-accent: #DDD6FE;         /* Purple Accent */
  --mavro-gold: #EAB308;           /* Mavro Gold */
  --mavro-green: #059669;          /* Success Green */
  --mavro-dark: #2D3748;           /* Dark Gray */
  
  /* Surface & Background */
  --mavro-white: #FFFFFF;
  --mavro-bg: #FAFAFA;
  --mavro-surface: #FFFFFF;
  --mavro-card: #FFFFFF;
  
  /* Text Hierarchy */
  --mavro-text: #1F2937;           /* Primary text */
  --mavro-text-secondary: #6B7280; /* Secondary text */
  --mavro-text-muted: #9CA3AF;     /* Muted text */
}
```

### Component Architecture Patterns
```typescript
// Standard component pattern with TypeScript
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Component: React.FC<ComponentProps> = ({ 
  className, 
  children, 
  variant = 'primary',
  ...props 
}) => {
  return (
    <div className={cn('base-classes', variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
};
```

## 🚀 Key UX Components

### 1. Enhanced AI Generation Panel
**File:** `client/src/pages/CampaignsPage.tsx`

Key Features:
- Voice input with Web Speech API
- Real-time character counting
- Platform-specific audio selection
- Live trending hashtags with performance indicators
- AI content suggestions (Hook/CTA/Story)
- Custom hashtag management

```typescript
// AI Content Generation Hook
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
  recognition.current.continuous = true;
  recognition.current.interimResults = true;

  recognition.current.onstart = () => setIsVoiceRecording(true);
  recognition.current.onresult = (event: any) => {
    const transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join('');
    
    setContent(transcript);
  };

  recognition.current.start();
}, [isVoiceRecording, toast]);
```

### 2. Main Dashboard Architecture
**File:** `client/src/pages/ExactMavroPlusDashboard.tsx`

Multi-tab command center with:
- Plan Tab: Campaign planning and AI generation
- Track Tab: Performance monitoring and analytics
- Grow Tab: ROI forecasting and optimization

```typescript
const ExactMavroPlusDashboard: React.FC<DashboardProps> = ({ 
  isDemoMode = false, 
  isBetaUser = false 
}) => {
  const [activeTab, setActiveTab] = useState('plan');
  
  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />
      <main className="pt-16">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="track">Track</TabsTrigger>
            <TabsTrigger value="grow">Grow</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plan">
            <PlanTab />
          </TabsContent>
          <TabsContent value="track">
            <TrackTab />
          </TabsContent>
          <TabsContent value="grow">
            <GrowTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
```

### 3. ViVi AI Assistant Integration
**File:** `client/src/components/ViViAI/ViViChatWidget.tsx`

Real-time AI assistant with:
- Natural language processing
- Context-aware responses
- Campaign optimization suggestions
- Geo-targeting insights

```typescript
const ViViChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/vivi/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      });
      
      const aiResponse = await response.json();
      
      const viviMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.response,
        type: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, viviMessage]);
    } catch (error) {
      console.error('ViVi chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };
  
  return (
    <Card className="w-80 h-96 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-sm">ViVi AI Assistant</CardTitle>
            <p className="text-xs text-gray-500">Always here to help</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
      </CardContent>
      
      <div className="p-3 border-t">
        <MessageInput onSend={sendMessage} />
      </div>
    </Card>
  );
};
```

### 4. Enhanced Scheduler Component
**File:** `client/src/components/EnhancedScheduler.tsx`

Google Calendar-style interface with:
- Drag & drop post scheduling
- Platform-specific color coding
- Bulk operations
- Performance predictions

```typescript
const EnhancedScheduler: React.FC = () => {
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  
  const handlePostDrop = useCallback((postId: string, newDate: Date, newTime: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, scheduledDate: newDate, scheduledTime: newTime }
        : post
    ));
  }, []);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <SchedulerHeader 
        view={view} 
        onViewChange={setView}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      
      <div className="flex h-[600px]">
        <PostSidebar posts={posts} />
        
        <div className="flex-1">
          {view === 'week' && (
            <WeekView 
              selectedDate={selectedDate}
              posts={posts}
              onPostDrop={handlePostDrop}
            />
          )}
          {view === 'month' && (
            <MonthView 
              selectedDate={selectedDate}
              posts={posts}
              onPostDrop={handlePostDrop}
            />
          )}
          {view === 'day' && (
            <DayView 
              selectedDate={selectedDate}
              posts={posts}
              onPostDrop={handlePostDrop}
            />
          )}
        </div>
      </div>
    </div>
  );
};
```

### 5. Reviews Intelligence Hub
**File:** `client/src/pages/ReviewsPageEnhanced.tsx`

Comprehensive review management with:
- Multi-platform review aggregation
- AI-powered response suggestions
- Sentiment analysis
- Performance tracking

```typescript
const ReviewsPageEnhanced: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');
  
  const generateAIResponse = async (reviewId: string, reviewText: string) => {
    try {
      const response = await fetch('/api/ai/review-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          reviewId, 
          reviewText,
          tone: 'professional-friendly'
        })
      });
      
      const { suggestedResponse } = await response.json();
      return suggestedResponse;
    } catch (error) {
      console.error('AI response generation failed:', error);
      return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <ReviewsHeader 
        platforms={selectedPlatforms}
        onPlatformChange={setSelectedPlatforms}
        sentimentFilter={sentimentFilter}
        onSentimentChange={setSentimentFilter}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <ReviewsList 
            reviews={reviews}
            onGenerateResponse={generateAIResponse}
          />
        </div>
        
        <div className="space-y-4">
          <ReviewsAnalytics reviews={reviews} />
          <AIResponsePanel />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};
```

### 6. Compliance Intelligence Center
**File:** `client/src/pages/ComplianceCenterPageEnhanced.tsx`

OAuth and platform compliance monitoring:
- Real-time platform connection status
- Compliance flag management
- OAuth token health monitoring
- Platform-specific guidelines

```typescript
const ComplianceCenterPageEnhanced: React.FC = () => {
  const [platformStatus, setPlatformStatus] = useState<PlatformStatus[]>([]);
  const [complianceFlags, setComplianceFlags] = useState<ComplianceFlag[]>([]);
  
  const checkPlatformCompliance = async (platform: string) => {
    try {
      const response = await fetch(`/api/compliance/check/${platform}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const status = await response.json();
      
      setPlatformStatus(prev => prev.map(p => 
        p.platform === platform ? { ...p, ...status } : p
      ));
    } catch (error) {
      console.error(`Compliance check failed for ${platform}:`, error);
    }
  };
  
  return (
    <div className="space-y-6">
      <ComplianceHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PlatformStatusGrid 
            platforms={platformStatus}
            onCheckCompliance={checkPlatformCompliance}
          />
          
          <ComplianceFlagsPanel 
            flags={complianceFlags}
            onResolveFlag={resolveFlag}
          />
        </div>
        
        <div className="space-y-4">
          <OAuthHealthMonitor />
          <ComplianceGuidelines />
          <AutoComplianceSettings />
        </div>
      </div>
    </div>
  );
};
```

## 🎯 Context Providers & State Management

### ViVi AI Context
**File:** `client/src/contexts/ViViContext.tsx`

```typescript
interface ViViContextType {
  isActive: boolean;
  currentPersona: string;
  setPersona: (persona: string) => void;
  sendMessage: (message: string) => Promise<string>;
  generateContent: (params: ContentGenerationParams) => Promise<string>;
}

export const ViViProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(true);
  const [currentPersona, setCurrentPersona] = useState('marketing-expert');
  
  const sendMessage = async (message: string): Promise<string> => {
    const response = await fetch('/api/vivi/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, persona: currentPersona })
    });
    
    const { response: aiResponse } = await response.json();
    return aiResponse;
  };
  
  const generateContent = async (params: ContentGenerationParams): Promise<string> => {
    const response = await fetch('/api/ai/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...params, persona: currentPersona })
    });
    
    const { content } = await response.json();
    return content;
  };
  
  return (
    <ViViContext.Provider value={{
      isActive,
      currentPersona,
      setPersona: setCurrentPersona,
      sendMessage,
      generateContent
    }}>
      {children}
    </ViViContext.Provider>
  );
};
```

### Theme & Settings Context
**File:** `client/src/contexts/SettingsContext.tsx`

```typescript
interface SettingsContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  userPreferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultPreferences);
  
  const updateTheme = useCallback((updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updates }));
    
    // Apply CSS custom properties
    Object.entries(updates).forEach(([key, value]) => {
      if (key.startsWith('color')) {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    });
  }, []);
  
  return (
    <SettingsContext.Provider value={{
      theme,
      updateTheme,
      userPreferences,
      updatePreferences: (updates) => setUserPreferences(prev => ({ ...prev, ...updates }))
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
```

## 🛠 Custom Hooks

### useAuth Hook
**File:** `client/src/hooks/useAuth.ts`

```typescript
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (credentials: LoginCredentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
      return userData;
    }
    
    throw new Error('Login failed');
  };
  
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };
  
  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  };
};
```

### useTheme Hook
**File:** `client/src/hooks/useTheme.ts`

```typescript
export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  
  const applyTheme = useCallback((themeName: string, customColors?: ThemeColors) => {
    const theme = customColors || predefinedThemes[themeName];
    
    // Apply CSS custom properties
    Object.entries(theme).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    
    setCurrentTheme(themeName);
    localStorage.setItem('mavro-theme', themeName);
    
    if (customColors) {
      localStorage.setItem('mavro-custom-colors', JSON.stringify(customColors));
    }
  }, []);
  
  const resetTheme = useCallback(() => {
    applyTheme('light');
    localStorage.removeItem('mavro-custom-colors');
  }, [applyTheme]);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('mavro-theme') || 'light';
    const savedColors = localStorage.getItem('mavro-custom-colors');
    
    if (savedColors) {
      applyTheme(savedTheme, JSON.parse(savedColors));
    } else {
      applyTheme(savedTheme);
    }
  }, [applyTheme]);
  
  return {
    currentTheme,
    applyTheme,
    resetTheme,
    themes: Object.keys(predefinedThemes)
  };
};
```

## 📱 Mobile Optimization

### Responsive Navigation
**File:** `client/src/components/MobileOptimizedNavigation.tsx`

```typescript
const MobileOptimizedNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl"
            >
              <MobileMenuContent onClose={() => setIsMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
  
  return <DesktopNavigation />;
};
```

## 🎨 Animation System

### Micro-Interactions
**File:** `client/src/components/EnhancedMicroAnimations.tsx`

```typescript
export const useHoverAnimation = () => {
  return {
    whileHover: { 
      scale: 1.02, 
      y: -2,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    whileTap: { 
      scale: 0.98,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };
};

export const useCardAnimation = () => {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" }
  };
};

export const useFadeInUp = (delay = 0) => {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay, duration: 0.5, ease: "easeOut" }
    }
  };
};
```

## 🔧 Utility Functions

### API Client
**File:** `client/src/lib/queryClient.ts`

```typescript
import { QueryClient } from '@tanstack/react-query';

const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => apiRequest(queryKey[0] as string),
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        if (error.message.includes('401')) return false;
        return failureCount < 3;
      },
    },
  },
});

export { apiRequest };
```

### Class Name Utilities
**File:** `client/src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
```

## 🚀 Key UX Features Summary

### 1. **Enhanced AI Generation System**
- Voice input with Web Speech API
- Real-time content generation
- Platform-specific optimization
- Smart hashtag suggestions

### 2. **Intelligent Dashboard**
- Multi-tab command center (Plan/Track/Grow)
- Real-time data visualization
- Contextual AI assistance
- Mobile-optimized layout

### 3. **Advanced Scheduler**
- Google Calendar-style interface
- Drag & drop functionality
- Platform color coding
- Bulk operations

### 4. **Reviews Intelligence**
- Multi-platform aggregation
- AI response generation
- Sentiment analysis
- Performance tracking

### 5. **Compliance Center**
- OAuth health monitoring
- Real-time platform status
- Automated compliance checks
- Platform-specific guidelines

### 6. **ViVi AI Integration**
- Context-aware conversations
- Persona-based responses
- Real-time recommendations
- Seamless workflow integration

### 7. **Responsive Design**
- Mobile-first approach
- Adaptive layouts
- Touch-optimized interactions
- Progressive web app features

### 8. **Animation System**
- Smooth micro-interactions
- Page transitions
- Loading states
- Hover effects

### 9. **Theme System**
- Dynamic color customization
- CSS custom properties
- User preference persistence
- Accessibility compliance

### 10. **Performance Optimization**
- Code splitting
- Lazy loading
- Optimized rendering
- Efficient state management

This codebase represents a comprehensive, production-ready UX implementation with modern React patterns, TypeScript safety, and enterprise-grade design systems.