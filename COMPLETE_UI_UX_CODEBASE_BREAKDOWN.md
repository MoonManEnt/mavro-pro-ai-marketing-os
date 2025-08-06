# COMPLETE MAVRO PRO UI/UX CODEBASE BREAKDOWN
## Full Visual & Technical Documentation for Understanding the Project

---

## 🎨 VISUAL IDENTITY & DESIGN SYSTEM

### Core Brand Colors (Exact Hex Values)
```css
/* Primary Brand Identity */
--mavro-purple: #8B5CF6;        /* Main brand color - buttons, accents, CTAs */
--mavro-purple-light: #A78BFA;  /* Hover states, secondary elements */
--mavro-purple-dark: #7C3AED;   /* Active states, emphasis */
--mavro-accent: #DDD6FE;        /* Background highlights, subtle accents */

/* Status & Communication Colors */
--mavro-gold: #EAB308;          /* Premium features, success states */
--mavro-green: #059669;         /* Positive feedback, completed tasks */
--mavro-blue: #3B82F6;          /* Information, links, trust elements */
--mavro-red: #EF4444;           /* Errors, warnings, critical actions */

/* Surface Hierarchy */
--mavro-white: #FFFFFF;         /* Primary surface, cards, modals */
--mavro-gray-50: #FAFAFA;       /* Page backgrounds */
--mavro-gray-100: #F5F5F5;      /* Secondary surfaces */
--mavro-gray-600: #525252;      /* Body text, readable content */
--mavro-gray-900: #171717;      /* Headings, high contrast text */
```

### Typography System (Executive Grade)
```css
/* Font Family Hierarchy */
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

/* Weight Scale */
font-weight: 300;  /* Light - subtle text */
font-weight: 400;  /* Normal - body text */
font-weight: 500;  /* Medium - labels, metadata */
font-weight: 600;  /* Semibold - subheadings */
font-weight: 700;  /* Bold - section headers */
font-weight: 800;  /* Extrabold - page titles */
font-weight: 900;  /* Black - brand name, major headings */

/* Size Scale */
font-size: 0.75rem;   /* 12px - metadata, captions */
font-size: 0.875rem;  /* 14px - small text, labels */
font-size: 1rem;      /* 16px - body text (base) */
font-size: 1.125rem;  /* 18px - large body text */
font-size: 1.25rem;   /* 20px - small headings */
font-size: 1.5rem;    /* 24px - section headings */
font-size: 1.875rem;  /* 30px - page headings */
font-size: 2.25rem;   /* 36px - hero headings */

/* Letter Spacing (Tracking) */
letter-spacing: -0.025em;  /* Tight - headings, titles */
letter-spacing: 0em;       /* Normal - body text */
letter-spacing: 0.025em;   /* Wide - small text, labels */
```

### Shadow System (Enterprise Depth)
```css
/* Executive Command Shadow Hierarchy */
box-shadow: none;                                          /* Flat elements */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);               /* Subtle lift */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);                /* Default cards */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);             /* Elevated cards */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);           /* Floating elements */
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);           /* Modal dialogs */
box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);         /* Top-level overlays */
box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);        /* Mavro signature depth */

/* Branded Shadows */
box-shadow: 0 10px 15px -3px rgb(139 92 246 / 0.3);      /* Purple glow */
box-shadow: 0 10px 15px -3px rgb(234 179 8 / 0.3);       /* Gold premium glow */
```

### Border Radius Architecture
```css
/* Mavro's Signature Rounded System */
border-radius: 0.25rem;     /* 4px - small elements, inputs */
border-radius: 0.375rem;    /* 6px - buttons, badges */
border-radius: 0.5rem;      /* 8px - small cards */
border-radius: 0.75rem;     /* 12px - medium cards */
border-radius: 1rem;        /* 16px - large cards */
border-radius: 1.5rem;      /* 24px - MAVRO SIGNATURE rounded-3xl */
border-radius: 9999px;      /* Full rounds - pills, avatars */
```

---

## 🏗️ LAYOUT ARCHITECTURE & STRUCTURE

### Main Application Layout
```jsx
// Top-level application structure
<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
  {/* Fixed Top Navigation - Always Visible */}
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
    <div className="max-w-full mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo & Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <ViViLogo className="w-8 h-8" />
            <span className="text-2xl font-black text-gray-900">Mavro Pro</span>
          </div>
          {/* 6 main navigation buttons in horizontal layout */}
        </div>
        
        {/* Right: Actions & Profile */}
        <div className="flex items-center space-x-4">
          <Bell /> <Settings /> <ProfileAvatar />
        </div>
      </div>
    </div>
  </nav>

  {/* Main Content Area - Below Fixed Nav */}
  <main className="pt-20 min-h-screen">
    {/* Dynamic page content renders here */}
  </main>

  {/* ViVi AI Chat Widget - Fixed Bottom Right */}
  <ViViChatWidget />
</div>
```

### Dashboard Command Center Layout
```jsx
// Three-tab system: Plan | Track | Grow
<div className="max-w-7xl mx-auto px-6 py-8">
  {/* Tab Navigation */}
  <div className="flex items-center justify-center mb-8">
    <div className="flex bg-white rounded-2xl p-2 shadow-xl border border-gray-200">
      {['plan', 'track', 'grow'].map(tab => (
        <button className={`
          px-8 py-4 rounded-xl font-bold text-lg transition-all duration-400
          ${activeTab === tab 
            ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-xl border border-purple-400/50 transform scale-105' 
            : 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-100/50 hover:shadow-lg hover:scale-102'}
        `}>
          <TabIcon className="w-6 h-6 inline mr-3" />
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  </div>

  {/* Tab Content Area */}
  <div className="transition-all duration-500 ease-in-out">
    {activeTab === 'plan' && <PlanTabContent />}
    {activeTab === 'track' && <TrackTabContent />}
    {activeTab === 'grow' && <GrowTabContent />}
  </div>
</div>
```

### Card System Architecture
```jsx
// Standard Mavro Card Component
<div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-3xl hover:scale-102 transition-all duration-300">
  {/* Card Header */}
  <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <CardIcon className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Card Title</h3>
          <p className="text-gray-600 text-sm">Subtitle or description</p>
        </div>
      </div>
      <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
        LIVE
      </Badge>
    </div>
  </div>

  {/* Card Content */}
  <div className="px-8 py-6">
    {/* Card body content */}
  </div>

  {/* Card Footer (Optional) */}
  <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
    {/* Footer actions */}
  </div>
</div>
```

---

## 🎯 INTERACTIVE COMPONENTS & ANIMATIONS

### Button System (All Variants)
```jsx
// Primary Action Button
<button className="
  bg-gradient-to-r from-purple-600 to-blue-600 
  hover:from-purple-700 hover:to-blue-700 
  text-white font-bold px-8 py-4 rounded-xl 
  shadow-lg hover:shadow-xl 
  transform hover:scale-105 
  transition-all duration-300 
  focus:ring-4 focus:ring-purple-300 focus:outline-none
">
  <Sparkles className="w-5 h-5 inline mr-3" />
  Generate with AI
</button>

// Secondary Button
<button className="
  border-2 border-purple-300 text-purple-700 
  hover:bg-purple-50 hover:border-purple-400 
  font-semibold px-6 py-3 rounded-lg 
  transition-all duration-200
">
  Preview
</button>

// Success Button
<button className="
  bg-gradient-to-r from-green-500 to-emerald-500 
  hover:from-green-600 hover:to-emerald-600 
  text-white font-bold px-6 py-3 rounded-lg 
  shadow-md hover:shadow-lg 
  transform hover:scale-105 
  transition-all duration-300
">
  <Check className="w-4 h-4 inline mr-2" />
  Complete
</button>

// Danger/Warning Button
<button className="
  bg-gradient-to-r from-red-500 to-pink-500 
  hover:from-red-600 hover:to-pink-600 
  text-white font-bold px-6 py-3 rounded-lg 
  shadow-md hover:shadow-lg
">
  <AlertTriangle className="w-4 h-4 inline mr-2" />
  Delete
</button>
```

### Input Field System
```jsx
// Standard Input Field
<div className="relative">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Field Label
  </label>
  <input 
    type="text" 
    className="
      w-full px-4 py-3 
      border-2 border-gray-200 
      rounded-xl 
      focus:border-purple-500 focus:ring-4 focus:ring-purple-100 
      transition-all duration-200 
      text-gray-900 placeholder-gray-500
    "
    placeholder="Enter your content here..."
  />
  {/* Character counter */}
  <div className="absolute right-3 top-11 text-sm text-gray-400">
    0/2500
  </div>
</div>

// Textarea with AI Generation
<div className="relative">
  <textarea 
    className="
      w-full px-6 py-4 
      border-2 border-gray-200 
      rounded-2xl 
      min-h-[200px] 
      resize-none 
      focus:border-purple-500 focus:ring-4 focus:ring-purple-100 
      transition-all duration-300 
      text-gray-900 
      leading-relaxed
    "
    placeholder="Write your engaging caption here... Tell your story, share your thoughts, or inspire your audience!"
  />
  
  {/* AI Enhancement Overlay */}
  <div className="absolute bottom-4 right-4 flex items-center space-x-2">
    <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
      <Mic className="w-4 h-4 text-blue-600" />
    </button>
    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
      <Sparkles className="w-4 h-4 mr-2" />
      AI Generate
    </button>
  </div>
</div>
```

### Loading & Animation States
```jsx
// Loading Spinner Component
<div className="flex items-center justify-center space-x-3">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
  <span className="text-gray-600 font-medium">Generating content...</span>
</div>

// Pulse Animation for Live Data
<div className="flex items-center space-x-2">
  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
  <span className="text-sm font-medium text-green-700">LIVE DATA</span>
</div>

// Hover Lift Animation (Cards)
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.hover-lift:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
}

// Micro-interaction for Buttons
.button-press {
  transition: transform 0.1s ease;
}
.button-press:active {
  transform: scale(0.98);
}
```

---

## 🤖 VIVI AI CHAT WIDGET (COMPLETE UI)

### Chat Widget States
```jsx
// Closed State (Floating Action Button)
<div className="fixed bottom-6 right-6 z-50">
  <button className="
    relative h-16 w-16 
    rounded-full 
    bg-gradient-to-r from-purple-600 to-blue-600 
    hover:from-purple-700 hover:to-blue-700 
    shadow-2xl hover:shadow-3xl 
    transform hover:scale-110 
    transition-all duration-400 
    group
  ">
    <MessageCircle className="h-7 w-7 text-white mx-auto" />
    
    {/* Pulse Animation Ring */}
    <div className="absolute inset-0 rounded-full bg-purple-600 animate-ping opacity-20"></div>
    
    {/* ViVi Sparkles */}
    <Sparkles className="h-4 w-4 text-white absolute -top-1 -right-1 animate-pulse" />
    
    {/* Notification Badge */}
    <div className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
      <span className="text-xs text-white font-bold">3</span>
    </div>
  </button>
</div>

// Open State (Full Chat Interface)
<div className="fixed bottom-6 right-6 z-50">
  <div className="w-96 h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
    {/* Chat Header */}
    <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold">ViVi AI Assistant</h3>
            <div className="flex items-center space-x-2 text-sm opacity-90">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online & Learning</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-white/10 rounded-lg">
            <Minimize2 className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    {/* Messages Area */}
    <div className="flex-1 p-4 space-y-4 bg-gradient-to-b from-white to-gray-50 h-[440px] overflow-y-auto">
      {/* User Message */}
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm">Generate a social media post about our new product launch</p>
          <div className="text-xs text-blue-100 mt-2">2:45 PM</div>
        </div>
      </div>

      {/* ViVi Response */}
      <div className="flex justify-start">
        <div className="max-w-[85%] bg-white text-gray-900 border border-gray-200 rounded-2xl p-4 shadow-sm">
          <p className="text-sm leading-relaxed">I'd be happy to help you create an engaging post for your product launch! Here's a compelling caption with trending hashtags...</p>
          
          {/* Suggestions Pills */}
          <div className="mt-4 space-y-2">
            <div className="text-xs text-gray-600 font-medium">Try asking:</div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs cursor-pointer hover:bg-purple-100">
                Add emojis
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs cursor-pointer hover:bg-purple-100">
                Make it shorter
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs cursor-pointer hover:bg-purple-100">
                Add hashtags
              </span>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-3">
            <span>2:45 PM</span>
            <span className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>92% confident</span>
            </span>
          </div>
        </div>
      </div>

      {/* Typing Indicator */}
      <div className="flex justify-start">
        <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <span className="text-sm text-gray-600">ViVi is thinking...</span>
        </div>
      </div>
    </div>

    {/* Input Area */}
    <div className="p-4 border-t bg-white">
      {/* Smart Suggestions */}
      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-2">Suggestions:</div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 border border-purple-300 text-purple-700 rounded-full text-xs cursor-pointer hover:bg-purple-50">
            Create a post
          </span>
          <span className="px-3 py-1 border border-purple-300 text-purple-700 rounded-full text-xs cursor-pointer hover:bg-purple-50">
            Analyze campaign
          </span>
          <span className="px-3 py-1 border border-purple-300 text-purple-700 rounded-full text-xs cursor-pointer hover:bg-purple-50">
            Get hashtags
          </span>
        </div>
      </div>
      
      {/* Input Field */}
      <div className="flex space-x-2">
        <input 
          type="text" 
          placeholder="Ask ViVi anything..." 
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
        />
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium">
          <Send className="h-4 w-4" />
        </button>
      </div>
      
      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 hover:text-purple-600">
            <Mic className="h-3 w-3" />
            <span>Voice</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-purple-600">
            <Camera className="h-3 w-3" />
            <span>Image</span>
          </button>
        </div>
        <div className="flex items-center space-x-1">
          <Shield className="h-3 w-3" />
          <span>Secure</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 🎨 ENHANCED AI CAMPAIGN BUILDER (COMPLETE LAYOUT)

### Main Campaign Builder Interface
```jsx
<div className="max-w-7xl mx-auto px-6 py-8">
  {/* Page Header */}
  <div className="mb-8">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Enhanced AI Campaign Builder</h1>
        <p className="text-xl text-gray-600">Create compelling content with AI assistance</p>
      </div>
      <div className="flex space-x-4">
        <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50">
          Save Draft
        </button>
        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg">
          Schedule Post
        </button>
      </div>
    </div>
  </div>

  {/* Main Grid Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    
    {/* Left Column: Content Creation */}
    <div className="space-y-6">
      
      {/* Caption Section */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-white to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Caption</h3>
                <p className="text-gray-600 text-sm">Write your engaging content</p>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-600">
              <span id="char-count">0</span>/2500
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="relative">
            <textarea 
              className="w-full h-48 px-6 py-4 border-2 border-gray-200 rounded-2xl resize-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-gray-900 leading-relaxed text-lg"
              placeholder="Write your engaging caption here... Tell your story, share your thoughts, or inspire your audience!"
            ></textarea>
            
            {/* AI Enhancement Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-purple-600">
                <Sparkles className="w-4 h-4" />
                <span>AI suggestions available</span>
              </div>
              
              <div className="flex space-x-2">
                {/* Voice Input Button */}
                <button className="flex items-center px-4 py-2 border-2 border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Input
                </button>
                
                {/* AI Generation Button */}
                <button className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Selection */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Globe className="w-6 h-6 mr-3 text-green-600" />
            Platform Selection
          </h3>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              {name: 'Instagram', icon: '📸', color: 'pink', active: true},
              {name: 'Facebook', icon: '👥', color: 'blue', active: false},
              {name: 'LinkedIn', icon: '💼', color: 'blue', active: true},
              {name: 'TikTok', icon: '🎵', color: 'black', active: false},
              {name: 'YouTube', icon: '📺', color: 'red', active: false},
              {name: 'Twitter', icon: '🐦', color: 'blue', active: true}
            ].map(platform => (
              <button 
                key={platform.name}
                className={`
                  p-4 rounded-2xl border-2 transition-all duration-300 text-left
                  ${platform.active 
                    ? 'border-purple-300 bg-purple-50 shadow-lg transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{platform.name}</div>
                    <div className="text-sm text-gray-500">
                      {platform.active ? 'Selected' : 'Click to select'}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Right Column: AI Assistance */}
    <div className="space-y-6">
      
      {/* Trending Hashtags */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-white to-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Hash className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Trending Hashtags</h3>
                <p className="text-gray-600 text-sm">Powered by TrendTap™</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              LIVE
            </div>
          </div>
        </div>
        
        <div className="p-8 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {/* Instagram Hashtags */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xl">📸</span>
                <span className="font-semibold text-gray-900">Instagram</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">LIVE</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  {tag: '#entrepreneur', status: 'HOT', color: 'red'},
                  {tag: '#smallbusiness', status: 'TRENDING', color: 'orange'},
                  {tag: '#marketing', status: 'RISING', color: 'yellow'},
                  {tag: '#success', status: 'STABLE', color: 'gray'},
                  {tag: '#motivation', status: 'HOT', color: 'red'},
                  {tag: '#leadership', status: 'TRENDING', color: 'orange'}
                ].map((hashtag, i) => (
                  <button 
                    key={i}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="font-medium text-gray-900">{hashtag.tag}</span>
                    <span className={`
                      px-2 py-1 text-xs font-bold rounded-full
                      ${hashtag.color === 'red' ? 'bg-red-100 text-red-800' :
                        hashtag.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                        hashtag.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {hashtag.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Hashtag Input */}
            <div className="border-t pt-4">
              <div className="flex items-center space-x-2 mb-3">
                <Hash className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-900">Add Custom Hashtag</span>
              </div>
              
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Enter custom hashtag"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium">
                  Add
                </button>
              </div>
              
              <div className="mt-3 text-xs text-gray-500 space-y-1">
                <div>💡 Use your brand name or unique identifiers</div>
                <div>💡 Keep it short and memorable</div>
                <div>💡 Check if it's already in use by others</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Content Suggestions */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-white to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">AI Content Suggestions</h3>
              <p className="text-gray-600 text-sm">Smart recommendations for your content</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {/* Filter Buttons */}
          <div className="flex space-x-2 mb-6">
            {['Hook', 'CTA', 'Story'].map((filter, i) => (
              <button 
                key={filter}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${i === 0 
                    ? 'bg-purple-600 text-white' 
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Suggestions List */}
          <div className="space-y-4">
            {[
              {
                type: 'HOOK',
                engagement: 'HIGH',
                content: "Did you know that 73% of successful entrepreneurs have this one trait in common?",
                confidence: "94% match"
              },
              {
                type: 'HOOK', 
                engagement: 'MEDIUM',
                content: "The biggest mistake I made in my first year of business (and how you can avoid it)",
                confidence: "89% match"
              },
              {
                type: 'HOOK',
                engagement: 'HIGH', 
                content: "Stop doing this immediately if you want your business to grow",
                confidence: "92% match"
              }
            ].map((suggestion, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                      {suggestion.type}
                    </span>
                    <span className={`
                      px-2 py-1 text-xs font-bold rounded-full
                      ${suggestion.engagement === 'HIGH' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                      }
                    `}>
                      {suggestion.engagement} ENGAGEMENT
                    </span>
                  </div>
                  
                  <button className="px-4 py-1 border border-purple-300 text-purple-700 hover:bg-purple-50 rounded-lg text-sm font-medium">
                    Use This
                  </button>
                </div>
                
                <p className="text-gray-700 mb-3">{suggestion.content}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{suggestion.engagement.toLowerCase()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <BarChart3 className="w-3 h-3" />
                    <span>{suggestion.confidence}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button className="w-full py-3 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl font-medium">
              Generate More Suggestions
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Action Bar */}
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-2xl">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </button>
        <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Ready to schedule?</span>
        </div>
        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
          <Calendar className="w-5 h-5 mr-2 inline" />
          Schedule Post
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## 🌟 REVIEWS INTELLIGENCE HUB (COMPLETE INTERFACE)

### Reviews Dashboard Layout
```jsx
<div className="max-w-7xl mx-auto px-6 py-8">
  {/* Header Section */}
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center space-x-6">
      <h1 className="text-4xl font-black text-gray-900">Reviews Intelligence Hub</h1>
      <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        Live Data
      </div>
    </div>
    
    {/* Platform Filter Buttons */}
    <div className="flex items-center space-x-2">
      {[
        {id: 'all', label: 'All Platforms', icon: '🌐', active: true},
        {id: 'google', label: 'Google', icon: '🔍', color: 'blue', active: false},
        {id: 'facebook', label: 'Facebook', icon: '👥', color: 'blue', active: false},
        {id: 'instagram', label: 'Instagram', icon: '📸', color: 'pink', active: false},
        {id: 'yelp', label: 'Yelp', icon: '⭐', color: 'red', active: false}
      ].map(platform => (
        <button 
          key={platform.id}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all
            ${platform.active 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <span>{platform.icon}</span>
          <span className="hidden md:inline">{platform.label}</span>
        </button>
      ))}
    </div>
  </div>

  {/* Stats Overview */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    {[
      {title: 'Total Reviews', value: '2,847', change: '+12%', icon: MessageSquare, color: 'blue'},
      {title: 'Avg Rating', value: '4.6', change: '+0.2', icon: Star, color: 'yellow'},
      {title: 'Response Rate', value: '94%', change: '+5%', icon: Reply, color: 'green'},
      {title: 'Pending Responses', value: '23', change: '-8%', icon: Clock, color: 'orange'}
    ].map((stat, i) => (
      <div key={i} className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center
            ${stat.color === 'blue' ? 'bg-blue-100' :
              stat.color === 'yellow' ? 'bg-yellow-100' :
              stat.color === 'green' ? 'bg-green-100' :
              'bg-orange-100'
            }
          `}>
            <stat.icon className={`
              w-7 h-7
              ${stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'yellow' ? 'text-yellow-600' :
                stat.color === 'green' ? 'text-green-600' :
                'text-orange-600'
              }
            `} />
          </div>
          <span className="text-2xl font-black text-gray-900">{stat.value}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">{stat.title}</span>
          <span className="text-green-600 font-bold text-sm">{stat.change}</span>
        </div>
      </div>
    ))}
  </div>

  {/* Reviews Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {/* Individual Review Cards */}
    {[
      {
        id: 1,
        platform: 'google',
        platformIcon: '🔍',
        customerName: 'Sarah Johnson',
        rating: 5,
        timeAgo: '2 hours ago',
        content: "Absolutely amazing service! The team went above and beyond to ensure everything was perfect. Highly recommend to anyone looking for quality work.",
        sentiment: 'positive',
        hasResponse: false,
        aiSuggestion: "Thank you so much for this wonderful review, Sarah! We're thrilled that our team exceeded your expectations. Your recommendation means the world to us, and we look forward to serving you again soon!"
      },
      {
        id: 2,
        platform: 'facebook',
        platformIcon: '👥',
        customerName: 'Mike Chen',
        rating: 4,
        timeAgo: '5 hours ago',
        content: "Good experience overall. The product quality is solid and delivery was on time. Customer service could be a bit faster in responding to queries.",
        sentiment: 'positive',
        hasResponse: true,
        response: "Hi Mike, thank you for your feedback! We're glad you're happy with the product quality and delivery. We're working on improving our response times and appreciate your patience."
      },
      {
        id: 3,
        platform: 'yelp',
        platformIcon: '⭐',
        customerName: 'Jennifer Rodriguez',
        rating: 2,
        timeAgo: '1 day ago',
        content: "Was expecting much better based on the reviews. The service was slow and the final result didn't meet expectations. Disappointed with the experience.",
        sentiment: 'negative',
        hasResponse: false,
        aiSuggestion: "Hi Jennifer, we sincerely apologize that we didn't meet your expectations. We take all feedback seriously and would love the opportunity to make this right. Please contact us directly so we can discuss how to improve your experience."
      }
    ].map(review => (
      <div key={review.id} className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-3xl hover:scale-102 transition-all duration-300">
        {/* Review Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-xl
                ${review.platform === 'google' ? 'bg-blue-100' :
                  review.platform === 'facebook' ? 'bg-blue-100' :
                  'bg-red-100'
                }
              `}>
                {review.platformIcon}
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{review.customerName}</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
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
                  <span className="text-sm text-gray-500">{review.timeAgo}</span>
                </div>
              </div>
            </div>
            
            <div className={`
              px-3 py-1 rounded-full text-sm font-bold
              ${review.sentiment === 'positive' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
              }
            `}>
              {review.sentiment.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Review Content */}
        <div className="px-8 py-6">
          <p className="text-gray-700 leading-relaxed mb-6">{review.content}</p>
          
          {/* Response Section */}
          {review.hasResponse ? (
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-600">Your Response</span>
              </div>
              <p className="text-sm text-gray-700">{review.response}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* AI Suggestion */}
              <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">AI Suggestion</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                    SMART
                  </span>
                </div>
                <p className="text-sm text-purple-700 mb-4 leading-relaxed">{review.aiSuggestion}</p>
                
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Use This Response
                  </button>
                  <button className="px-4 py-2 border border-purple-300 text-purple-700 hover:bg-purple-50 rounded-lg text-sm font-medium transition-colors">
                    Generate New
                  </button>
                </div>
              </div>
              
              {/* Manual Response Options */}
              <div className="flex space-x-2">
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Write Response
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                  <Clock className="w-4 h-4 mr-2" />
                  Remind Later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Load More Button */}
  <div className="text-center mt-12">
    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
      Load More Reviews
    </button>
  </div>
</div>
```

---

## 📱 MOBILE RESPONSIVENESS & BREAKPOINTS

### Mobile Navigation System
```jsx
// Mobile-First Navigation (< 768px)
<div className="lg:hidden">
  {/* Mobile Top Bar */}
  <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
    <div className="flex items-center justify-between px-4 h-full">
      <div className="flex items-center space-x-2">
        <ViViLogo className="w-7 h-7" />
        <span className="text-xl font-bold text-gray-900">Mavro Pro</span>
      </div>
      
      <button className="p-2 text-gray-600 hover:text-gray-900">
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </div>

  {/* Mobile Bottom Navigation */}
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
    <div className="grid grid-cols-5 h-16">
      {[
        {id: 'dashboard', icon: Home, label: 'Home'},
        {id: 'campaigns', icon: Target, label: 'Campaigns'},
        {id: 'reviews', icon: MessageCircle, label: 'Reviews'},
        {id: 'analytics', icon: BarChart3, label: 'Analytics'},
        {id: 'settings', icon: Settings, label: 'Settings'}
      ].map(item => (
        <button 
          key={item.id}
          className={`
            flex flex-col items-center justify-center space-y-1 transition-colors
            ${activeTab === item.id ? 'text-purple-600' : 'text-gray-600'}
          `}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-xs font-medium">{item.label}</span>
          {activeTab === item.id && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-purple-600 rounded-full" />
          )}
        </button>
      ))}
    </div>
  </div>

  {/* Main Content with Mobile Padding */}
  <main className="pt-16 pb-16 px-4">
    {/* Mobile-optimized content */}
  </main>
</div>

// Desktop Navigation (≥ 768px)
<div className="hidden lg:flex">
  {/* Desktop layout as shown above */}
</div>
```

### Responsive Grid System
```css
/* Mobile-First Grid Classes */
.grid-mobile-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-mobile-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }

@media (min-width: 768px) {
  .grid-tablet-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-tablet-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .grid-desktop-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid-desktop-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

/* Mobile-Optimized Touch Targets */
.touch-target {
  min-height: 44px;    /* iOS guideline */
  min-width: 44px;
  touch-action: manipulation;  /* Disable double-tap zoom */
}

.mobile-button {
  padding: 12px 24px;
  font-size: 16px;     /* Prevent zoom on iOS */
  border-radius: 12px;
}

.mobile-input {
  padding: 16px;
  font-size: 16px;     /* Prevent zoom on iOS */
  border-radius: 12px;
  min-height: 48px;
}
```

---

## 🎭 ANIMATION & MICRO-INTERACTIONS

### Loading States & Transitions
```jsx
// Page Transition Animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  className="min-h-screen"
>
  {/* Page content */}
</motion.div>

// Button Hover Effects
<motion.button
  whileHover={{ 
    scale: 1.05, 
    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)" 
  }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold"
>
  Click Me
</motion.button>

// Card Hover Animations
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

// Loading Spinner
<div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
</div>

// Pulse Animation for Live Data
<div className="flex items-center space-x-2">
  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
  <span className="text-green-700 font-medium">LIVE</span>
</div>

// Typing Indicator (ViVi Chat)
<div className="flex space-x-1">
  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
</div>

// Success Checkmark Animation
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ 
    type: "spring", 
    stiffness: 260, 
    damping: 20,
    delay: 0.1 
  }}
  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
>
  <motion.svg
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="w-8 h-8 text-white"
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m9 12 2 2 4-4"
    />
  </motion.svg>
</motion.div>
```

---

This comprehensive breakdown gives you the complete visual and technical understanding of how Mavro Pro looks, feels, and operates. Every element from colors and typography to layouts and animations is documented with exact specifications you can reference when building or understanding the project. The design emphasizes executive-grade professionalism with sophisticated gradients, premium spacing, and intelligent micro-interactions that create a polished, trustworthy user experience.