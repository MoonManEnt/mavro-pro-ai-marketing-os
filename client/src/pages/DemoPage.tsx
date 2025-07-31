import { useState, useRef, useCallback, useEffect } from 'react';
import { Bell, Settings, Mic, MicOff, Sparkles, Zap, TrendingUp, Target, BarChart3, Home, Users, MessageCircle, CreditCard, FileText, User, Calendar, Upload, Image, Play, Check, X, Hash, Music, Clock, ChevronLeft, ChevronRight, Send, Save, Globe, ChevronDown, AlertTriangle, Eye, ArrowRight, Share2, MessageSquare, BookOpen, Trophy, Heart, Minimize, RotateCcw, MapPin, Share, Shield, Package, Palette, Award, Star, Medal, Gift, Crown, Brain, Lightbulb, Plus } from 'lucide-react';
import ViViLogo from '../components/ViViLogo';
import { FaInstagram, FaLinkedin, FaTiktok, FaYoutube, FaSnapchat, FaFacebook } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import CampaignsPage from './demo/CampaignsPage';
import ReviewsPage from './demo/ReviewsPage';
import CRMPage from './demo/CRMPage';
import FourSIGHTPage from './demo/FourSIGHTPage';
import SettingsPage from './demo/SettingsPage';

// Custom X Icon Component  
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Stock Ticker Trends Component
const StockTickerTrends = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const trendSections = [
    {
      title: "Speaking Industry Trends",
      trends: [
        { trend: 'Virtual & Hybrid Events', growth: '+45%', note: 'Post-pandemic adaptation' },
        { trend: 'Leadership Development', growth: '+32%', note: 'High demand in Q1' },
        { trend: 'AI & Future of Work', growth: '+67%', note: 'Emerging hot topic' },
        { trend: 'Wellness & Mental Health', growth: '+28%', note: 'Corporate focus' },
        { trend: 'Diversity & Inclusion', growth: '+41%', note: 'Sustained interest' },
        { trend: 'Entrepreneurship', growth: '+25%', note: 'Always popular' }
      ]
    },
    {
      title: "Upcoming Event Opportunities",
      trends: [
        { trend: 'Tech Leadership Summit 2025', growth: 'Mar 15-17', note: 'Keynote • 2,500+ attendees' },
        { trend: 'Women in Business Conference', growth: 'Apr 8-10', note: 'Panel • 1,200+ attendees' },
        { trend: 'Innovation & Growth Expo', growth: 'May 22-24', note: 'Workshop • 800+ attendees' },
        { trend: 'Future of Work Symposium', growth: 'Jun 5-7', note: 'Keynote • 3,000+ attendees' },
        { trend: 'Digital Transformation Summit', growth: 'Jul 12-14', note: 'Panel • 1,800+ attendees' },
        { trend: 'Leadership Excellence Awards', growth: 'Aug 19-21', note: 'Keynote • 2,200+ attendees' }
      ]
    },
    {
      title: "Content Reminders",
      trends: [
        { trend: 'Scheduled Reel Missed', growth: 'URGENT', note: 'Leadership Mindset Tips - 10:00 AM' },
        { trend: 'Remix Opportunity', growth: 'HOT', note: 'Success Mindset post got 1.2K likes' },
        { trend: 'LinkedIn Article Draft', growth: 'PENDING', note: 'Future of Leadership - Review needed' },
        { trend: 'Instagram Story Series', growth: 'READY', note: 'Behind the Scenes - 5 stories queued' },
        { trend: 'TikTok Trend Alert', growth: 'TRENDING', note: 'Leadership Challenge - 2.3M views' },
        { trend: 'Weekly Newsletter', growth: 'DUE', note: 'Success Strategies - Send by Friday' }
      ]
    }
  ];

  // Auto-cycle through sections
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % trendSections.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTrends = trendSections[currentSection];

  return (
    <div className="bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-purple-700/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="text-white font-medium text-sm">TrendTicker™</h3>
        </div>
        <div className="flex space-x-1">
          {trendSections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSection ? 'bg-purple-400' : 'bg-purple-600/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mb-3">
        <h4 className="text-purple-200 font-medium text-xs mb-2">{currentTrends.title}</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {currentTrends.trends.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs p-2 bg-purple-800/20 rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{item.trend}</div>
                <div className="text-purple-300 text-xs truncate">{item.note}</div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                item.growth.includes('%') ? 'bg-green-500/20 text-green-300' :
                item.growth === 'URGENT' ? 'bg-red-500/20 text-red-300' :
                item.growth === 'HOT' ? 'bg-orange-500/20 text-orange-300' :
                item.growth === 'TRENDING' ? 'bg-pink-500/20 text-pink-300' :
                'bg-blue-500/20 text-blue-300'
              }`}>
                {item.growth}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DemoPage = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('track');
  const [selectedPersona, setSelectedPersona] = useState('kemar');
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState('platforms');
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Persona data
  const personas = {
    kemar: {
      name: 'Thomas Vette',
      role: 'Keynote Speaker & Leadership Expert',
      avatar: 'TV',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'from-purple-900/50 to-pink-900/50',
      accent: 'purple',
      industry: 'Speaking',
      platforms: ['LinkedIn', 'Instagram', 'YouTube', 'TikTok', 'Twitter'],
      metrics: {
        followers: '127K',
        engagement: '8.4%',
        reach: '2.3M',
        bookings: '23'
      }
    }
  };

  const currentPersona = personas[selectedPersona];

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: Home, active: true },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'reviews', label: 'Reviews', icon: MessageCircle },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'foursight', label: 'FourSIGHT™', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Recent activity data
  const recentActivity = [
    {
      type: 'post',
      platform: 'LinkedIn',
      content: 'Just shared insights on transformational leadership at the Global Business Summit...',
      engagement: '2.4K likes, 184 comments',
      time: '2 hours ago',
      performance: '+23% above average'
    },
    {
      type: 'booking',
      platform: 'Event',
      content: 'New keynote booking confirmed for Tech Innovation Conference 2025',
      engagement: '$25,000 fee',
      time: '4 hours ago',
      performance: '3,500 expected attendees'
    },
    {
      type: 'content',
      platform: 'Instagram',
      content: 'Leadership mindset reel gained viral momentum overnight',
      engagement: '47K views, 3.2K likes',
      time: '8 hours ago',
      performance: '+340% reach increase'
    }
  ];

  // Platform metrics
  const platformMetrics = [
    { name: 'LinkedIn', followers: '45.2K', engagement: '12.3%', trend: 'up', color: 'text-blue-400' },
    { name: 'Instagram', followers: '32.7K', engagement: '8.9%', trend: 'up', color: 'text-pink-400' },
    { name: 'YouTube', followers: '28.1K', engagement: '15.7%', trend: 'up', color: 'text-red-400' },
    { name: 'TikTok', followers: '21.6K', engagement: '11.2%', trend: 'up', color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800/80 via-purple-800/60 to-slate-800/80 backdrop-blur-lg border-b border-purple-500/30 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Mavro OS Demo</h1>
              <p className="text-sm text-purple-300">Interactive Platform Preview</p>
            </div>
          </div>

          {/* Demo Controls */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-purple-400 text-purple-300 hover:bg-purple-800/30"
              onClick={() => setLocation('/')}
            >
              ← Back to Home
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => setLocation('/dashboard')}
            >
              Access Full Platform
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-slate-800/90 to-purple-900/40 backdrop-blur-sm border-r border-purple-500/30 min-h-screen p-4">
          {/* Persona Display */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-lg backdrop-blur-sm">
              <div className={`w-10 h-10 bg-gradient-to-br ${currentPersona.color} rounded-full flex items-center justify-center text-white font-bold`}>
                {currentPersona.avatar}
              </div>
              <div>
                <div className="text-white font-medium">{currentPersona.name}</div>
                <div className="text-purple-300 text-xs">{currentPersona.role}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNavItem(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeNavItem === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-purple-800/30 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* TrendTicker */}
          <div className="mt-6">
            <StockTickerTrends />
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="flex-1 p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-slate-800/50 backdrop-blur-sm rounded-lg p-1">
            {['plan', 'track', 'grow', 'learn'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 font-medium capitalize ${
                  activeTab === tab
                    ? tab === 'plan' ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg' :
                      tab === 'track' ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg' :
                      tab === 'grow' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' :
                      'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="space-y-6">
            {/* Render appropriate page based on active navigation */}
            {activeNavItem === 'campaigns' && <CampaignsPage />}
            {activeNavItem === 'reviews' && <ReviewsPage />}
            {activeNavItem === 'crm' && <CRMPage />}
            {activeNavItem === 'foursight' && <FourSIGHTPage />}
            {activeNavItem === 'settings' && <SettingsPage />}
            
            {/* Default Dashboard Content */}
            {activeNavItem === 'dashboard' && (
              <>
                {/* Analytics Tabs */}
                <div className="flex space-x-1 mb-6 bg-slate-800/50 backdrop-blur-sm rounded-lg p-1">
                  {[
                    { id: 'platforms', label: 'Platforms', icon: Globe },
                    { id: 'content', label: 'Content', icon: FileText },
                    { id: 'audience', label: 'Audience', icon: Users }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveAnalyticsTab(tab.id)}
                      className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 font-medium flex items-center justify-center space-x-2 ${
                        activeAnalyticsTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-purple-300 text-sm">Total Followers</div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">{currentPersona.metrics.followers}</div>
                <div className="text-green-400 text-sm">+12.5% this month</div>
              </div>

              <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-green-300 text-sm">Engagement Rate</div>
                  <Target className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">{currentPersona.metrics.engagement}</div>
                <div className="text-green-400 text-sm">+2.3% from last week</div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-blue-300 text-sm">Monthly Reach</div>
                  <Eye className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">{currentPersona.metrics.reach}</div>
                <div className="text-blue-400 text-sm">+45% increase</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-yellow-300 text-sm">Speaking Bookings</div>
                  <Calendar className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white">{currentPersona.metrics.bookings}</div>
                <div className="text-yellow-400 text-sm">+8 this quarter</div>
              </div>
            </div>

            {/* Recent Activity & Platform Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                          {activity.platform}
                        </span>
                        <span className="text-xs text-slate-400">{activity.time}</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">{activity.content}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-400">{activity.engagement}</span>
                        <span className="text-purple-300">{activity.performance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Performance */}
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Platform Performance
                </h3>
                <div className="space-y-4">
                  {platformMetrics.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          platform.name === 'LinkedIn' ? 'bg-blue-600/20' :
                          platform.name === 'Instagram' ? 'bg-pink-600/20' :
                          platform.name === 'YouTube' ? 'bg-red-600/20' :
                          'bg-purple-600/20'
                        }`}>
                          {platform.name === 'LinkedIn' && <FaLinkedin className="w-5 h-5 text-blue-400" />}
                          {platform.name === 'Instagram' && <FaInstagram className="w-5 h-5 text-pink-400" />}
                          {platform.name === 'YouTube' && <FaYoutube className="w-5 h-5 text-red-400" />}
                          {platform.name === 'TikTok' && <FaTiktok className="w-5 h-5 text-purple-400" />}
                        </div>
                        <div>
                          <div className="font-medium text-white">{platform.name}</div>
                          <div className="text-sm text-slate-400">{platform.followers} followers</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">{platform.engagement}</div>
                        <div className="text-sm text-green-400 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          engagement
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analytics Tab Content */}
            <div className="space-y-6">
              {/* Platforms Tab */}
              {activeAnalyticsTab === 'platforms' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Platform Performance Details */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Platform Analytics
                    </h3>
                    <div className="space-y-4">
                      {[
                        { platform: 'LinkedIn', followers: '45.2K', engagement: '12.3%', posts: '23', reach: '892K', color: 'blue' },
                        { platform: 'Instagram', followers: '32.7K', engagement: '8.9%', posts: '18', reach: '654K', color: 'pink' },
                        { platform: 'YouTube', followers: '28.1K', engagement: '15.7%', posts: '8', reach: '423K', color: 'red' },
                        { platform: 'TikTok', followers: '21.6K', engagement: '11.2%', posts: '12', reach: '387K', color: 'purple' }
                      ].map((item, index) => (
                        <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white">{item.platform}</h4>
                            <span className={`text-${item.color}-400 text-sm`}>{item.engagement} engagement</span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-slate-400">Followers</div>
                              <div className="text-white font-semibold">{item.followers}</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Posts</div>
                              <div className="text-white font-semibold">{item.posts}</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Reach</div>
                              <div className="text-white font-semibold">{item.reach}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Growth Trends */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Growth Trends
                    </h3>
                    <div className="space-y-4">
                      {[
                        { metric: 'Total Followers', value: '127K', change: '+12.5%', trend: 'up' },
                        { metric: 'Monthly Reach', value: '2.3M', change: '+23.1%', trend: 'up' },
                        { metric: 'Engagement Rate', value: '11.8%', change: '+5.7%', trend: 'up' },
                        { metric: 'Content Posts', value: '61', change: '+18.2%', trend: 'up' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                          <div>
                            <div className="text-white font-medium">{item.metric}</div>
                            <div className="text-slate-400 text-sm">{item.value}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 text-sm font-semibold">{item.change}</div>
                            <div className="text-green-400 text-xs">this month</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Content Tab */}
              {activeAnalyticsTab === 'content' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Content Performance */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Content Performance
                    </h3>
                    <div className="space-y-4">
                      {[
                        { 
                          title: 'Leadership Transformation Workshop', 
                          type: 'Video', 
                          views: '45.2K', 
                          engagement: '92%', 
                          platform: 'LinkedIn',
                          date: '2 days ago'
                        },
                        { 
                          title: 'Building High-Performance Teams', 
                          type: 'Article', 
                          views: '32.1K', 
                          engagement: '88%', 
                          platform: 'LinkedIn',
                          date: '5 days ago'
                        },
                        { 
                          title: 'Executive Presence Masterclass', 
                          type: 'Reel', 
                          views: '78.9K', 
                          engagement: '95%', 
                          platform: 'Instagram',
                          date: '1 week ago'
                        }
                      ].map((item, index) => (
                        <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-white text-sm">{item.title}</h4>
                            <span className="text-purple-400 text-xs">{item.platform}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <div className="text-slate-400">Views</div>
                              <div className="text-white font-semibold">{item.views}</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Engagement</div>
                              <div className="text-green-400 font-semibold">{item.engagement}</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Posted</div>
                              <div className="text-slate-300">{item.date}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Categories */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Hash className="w-5 h-5 mr-2" />
                      Content Categories
                    </h3>
                    <div className="space-y-4">
                      {[
                        { category: 'Leadership Tips', posts: 18, engagement: '94%', color: 'purple' },
                        { category: 'Team Building', posts: 12, engagement: '91%', color: 'blue' },
                        { category: 'Executive Coaching', posts: 15, engagement: '89%', color: 'green' },
                        { category: 'Speaking Events', posts: 9, engagement: '87%', color: 'yellow' },
                        { category: 'Industry Insights', posts: 7, engagement: '85%', color: 'pink' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 bg-${item.color}-500/20 rounded-full flex items-center justify-center`}>
                              <Hash className={`w-4 h-4 text-${item.color}-400`} />
                            </div>
                            <div>
                              <div className="text-white font-medium">{item.category}</div>
                              <div className="text-slate-400 text-sm">{item.posts} posts</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-semibold">{item.engagement}</div>
                            <div className="text-slate-400 text-xs">avg engagement</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Audience Tab */}
              {activeAnalyticsTab === 'audience' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Audience Demographics */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Audience Demographics
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Age Groups</h4>
                        <div className="space-y-2">
                          {[
                            { age: '25-34', percentage: 42, color: 'purple' },
                            { age: '35-44', percentage: 35, color: 'blue' },
                            { age: '45-54', percentage: 18, color: 'green' },
                            { age: '55+', percentage: 5, color: 'yellow' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-12 text-sm text-slate-300">{item.age}</div>
                              <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                                <div 
                                  className={`bg-gradient-to-r from-${item.color}-600 to-${item.color}-400 h-2 rounded-full transition-all duration-300`}
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                              <div className="w-8 text-sm text-slate-300">{item.percentage}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-2">Industries</h4>
                        <div className="space-y-2">
                          {[
                            { industry: 'Technology', percentage: 28, color: 'blue' },
                            { industry: 'Finance', percentage: 24, color: 'green' },
                            { industry: 'Healthcare', percentage: 19, color: 'red' },
                            { industry: 'Education', percentage: 16, color: 'yellow' },
                            { industry: 'Other', percentage: 13, color: 'purple' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-16 text-sm text-slate-300">{item.industry}</div>
                              <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                                <div 
                                  className={`bg-gradient-to-r from-${item.color}-600 to-${item.color}-400 h-2 rounded-full transition-all duration-300`}
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                              <div className="w-8 text-sm text-slate-300">{item.percentage}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Engagement Insights */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Engagement Insights
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Peak Activity Times</h4>
                        <div className="space-y-2">
                          {[
                            { time: '9:00 AM', activity: 92, day: 'Weekdays' },
                            { time: '12:00 PM', activity: 78, day: 'Weekdays' },
                            { time: '7:00 PM', activity: 85, day: 'Weekends' },
                            { time: '10:00 AM', activity: 71, day: 'Weekends' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="text-slate-300">{item.time} ({item.day})</div>
                              <div className="text-purple-400 font-medium">{item.activity}% active</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Top Interests</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Leadership', 'Team Building', 'Executive Coaching', 'Public Speaking',
                            'Business Strategy', 'Performance Management', 'Corporate Training'
                          ].map((interest, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Geographic Distribution</h4>
                        <div className="space-y-2">
                          {[
                            { location: 'United States', percentage: 45 },
                            { location: 'Canada', percentage: 18 },
                            { location: 'United Kingdom', percentage: 12 },
                            { location: 'Australia', percentage: 8 },
                            { location: 'Other', percentage: 17 }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="text-slate-300">{item.location}</div>
                              <div className="text-blue-400 font-medium">{item.percentage}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ViVi AI Assistant */}
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <ViViLogo className="w-6 h-6 mr-2" />
                  ViVi AI Assistant
                </h3>
                <button className="text-purple-300 hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-purple-800/20 rounded-lg border border-purple-500/30">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <ViViLogo className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-purple-200 mb-2">
                        Great engagement on your latest leadership post, Thomas! I've identified 3 opportunities to maximize this momentum:
                      </p>
                      <ul className="text-sm text-purple-300 space-y-1">
                        <li>• Cross-post to LinkedIn with industry-specific hashtags</li>
                        <li>• Create a follow-up video expanding on key points</li>
                        <li>• Schedule related content for peak engagement times</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Implement Suggestions
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-purple-400 text-purple-300 hover:bg-purple-800/30"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;