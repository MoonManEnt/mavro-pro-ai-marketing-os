import { useState } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { useVoice } from '@/contexts/VoiceContext';
import { useMode } from '@/contexts/ModeContext';
import { useSettings } from '@/contexts/SettingsContext';
import PersonaLoader from '@/components/PersonaLoader';
import ModeSelector from '@/components/ModeSelector';
import TourGuide from '@/components/TourGuide';
import { Bell, Menu, Settings, Mic, MicOff, Sparkles, Zap, TrendingUp, Target, BarChart3 } from 'lucide-react';

export default function MavroPlusDashboard() {
  const { profile } = useProfile();
  const { isEnabled: voiceEnabled, setIsEnabled: setVoiceEnabled } = useVoice();
  const { mode } = useMode();
  const { settings } = useSettings();
  const [activeMode, setActiveMode] = useState<'plan' | 'track' | 'grow'>('plan');
  const [showTour, setShowTour] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="mavro-glass sticky top-0 z-50 border-b border-white/10">
        <div className="mavro-container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mavro-btn mavro-btn-ghost mavro-mobile-only"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-purple-500 via-violet-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div>
                  <h1 className="mavro-heading text-xl">Mavro Plus</h1>
                  <p className="text-xs mavro-text-muted">AI Marketing OS</p>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Voice Toggle */}
              <button
                onClick={toggleVoice}
                className={`mavro-btn ${voiceEnabled ? 'mavro-btn-primary' : 'mavro-btn-ghost'} flex items-center space-x-2`}
              >
                {voiceEnabled ? (
                  <>
                    <Mic className="h-4 w-4" />
                    <span className="hidden sm:inline">ViVi Voice: ON</span>
                    <div className="mavro-voice-wave">
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                    </div>
                  </>
                ) : (
                  <>
                    <MicOff className="h-4 w-4" />
                    <span className="hidden sm:inline">ViVi Voice: OFF</span>
                  </>
                )}
              </button>

              {/* PersonaLoader */}
              <PersonaLoader />

              {/* Notifications */}
              <button className="mavro-btn mavro-btn-ghost relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </button>

              {/* Settings */}
              <button className="mavro-btn mavro-btn-ghost">
                <Settings className="h-5 w-5" />
              </button>

              {/* Tour Guide */}
              <button
                onClick={() => setShowTour(true)}
                className="mavro-btn mavro-btn-secondary flex items-center space-x-2"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Tour</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mavro-container py-8">
        {/* Welcome Section */}
        <div className="mavro-card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mavro-heading text-3xl mb-2">
                Welcome back, {profile?.name}!
              </h2>
              <p className="mavro-text-secondary">
                {profile?.businessName} • {profile?.industry} • {mode.toUpperCase()} MODE
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="mavro-badge primary">
                {mode.toUpperCase()}
              </div>
              {voiceEnabled && (
                <div className="mavro-badge success">
                  ViVi Active
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold mavro-text-gradient">24</div>
              <div className="mavro-text-muted text-sm">Active Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mavro-text-gradient">156</div>
              <div className="mavro-text-muted text-sm">Total Leads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mavro-text-gradient">89%</div>
              <div className="mavro-text-muted text-sm">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mavro-text-gradient">$24.5k</div>
              <div className="mavro-text-muted text-sm">Monthly ROI</div>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-8">
          <ModeSelector 
            activeMode={activeMode} 
            onModeChange={setActiveMode}
          />
        </div>

        {/* Mode-specific Content */}
        {activeMode === 'plan' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mavro Magic Composer */}
            <div className="mavro-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mavro-heading text-lg">Mavro Magic Composer</h3>
                  <p className="mavro-text-muted text-sm">AI-powered content creation</p>
                </div>
              </div>
              <p className="mavro-text-secondary mb-4">
                Create posts, reels, emails, and ads with AI that understands your {profile?.industry} business.
              </p>
              <button className="mavro-btn mavro-btn-primary w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Create Content
              </button>
            </div>

            {/* Visual Scheduler */}
            <div className="mavro-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mavro-heading text-lg">Visual Scheduler</h3>
                  <p className="mavro-text-muted text-sm">Drag & drop content planning</p>
                </div>
              </div>
              <p className="mavro-text-secondary mb-4">
                Schedule your content across all platforms with optimal timing suggestions.
              </p>
              <button className="mavro-btn mavro-btn-primary w-full">
                <Target className="w-4 h-4 mr-2" />
                Open Scheduler
              </button>
            </div>
          </div>
        )}

        {activeMode === 'track' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FourSIGHT Dashboard */}
            <div className="mavro-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mavro-heading text-lg">FourSIGHT Dashboard</h3>
                  <p className="mavro-text-muted text-sm">Advanced analytics & insights</p>
                </div>
              </div>
              <p className="mavro-text-secondary mb-4">
                Track performance, ROI, and get AI-powered predictions for your campaigns.
              </p>
              <button className="mavro-btn mavro-btn-primary w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </button>
            </div>

            {/* Performance Metrics */}
            <div className="mavro-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mavro-heading text-lg">Performance Metrics</h3>
                  <p className="mavro-text-muted text-sm">Real-time performance data</p>
                </div>
              </div>
              <p className="mavro-text-secondary mb-4">
                Monitor engagement, reach, and conversion metrics across all platforms.
              </p>
              <button className="mavro-btn mavro-btn-primary w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Metrics
              </button>
            </div>
          </div>
        )}

        {activeMode === 'grow' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Advanced Campaigns */}
            <div className="mavro-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mavro-heading text-lg">Advanced Campaigns</h3>
                  <p className="mavro-text-muted text-sm">Multi-channel automation</p>
                </div>
              </div>
              <p className="mavro-text-secondary mb-4">
                Set up complex marketing funnels and automated campaigns for maximum growth.
              </p>
              <button className="mavro-btn mavro-btn-primary w-full">
                <Zap className="w-4 h-4 mr-2" />
                Launch Campaign
              </button>
            </div>

            {/* A/B Testing */}
            <div className="mavro-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mavro-heading text-lg">A/B Testing</h3>
                  <p className="mavro-text-muted text-sm">Optimize for best results</p>
                </div>
              </div>
              <p className="mavro-text-secondary mb-4">
                Test different versions of your content and campaigns to maximize performance.
              </p>
              <button className="mavro-btn mavro-btn-primary w-full">
                <Target className="w-4 h-4 mr-2" />
                Start Test
              </button>
            </div>
          </div>
        )}

        {/* ViVi AI Assistant Panel */}
        <div className="mavro-card mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="mavro-heading text-lg">ViVi AI Assistant</h3>
                <p className="mavro-text-muted text-sm">Your AI marketing CMO</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="mavro-status-dot online"></div>
              <span className="text-sm mavro-text-muted">Online</span>
            </div>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg mb-4">
            <p className="mavro-text">
              Hi {profile?.name}! I've been analyzing your {profile?.industry} campaigns. 
              I found 3 optimization opportunities that could increase your ROI by 23%. 
              Would you like me to show you the details?
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button className="mavro-btn mavro-btn-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Show Opportunities
            </button>
            <button className="mavro-btn mavro-btn-secondary">
              <Target className="w-4 h-4 mr-2" />
              Create Content
            </button>
            <button className="mavro-btn mavro-btn-ghost">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </button>
          </div>
        </div>
      </main>

      {/* Tour Guide Modal */}
      <TourGuide 
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        onComplete={() => setShowTour(false)}
      />
    </div>
  );
}