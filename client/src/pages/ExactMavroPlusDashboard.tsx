import { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Bell, Settings, Mic, MicOff, Sparkles, Zap, TrendingUp, Target, BarChart3, Home, Users, MessageCircle, 
  CreditCard, FileText, User, Calendar, Upload, Image, Play, Check, X, Hash, Music, Clock, ChevronLeft, 
  ChevronRight, Send, Save, Globe, ChevronDown, AlertTriangle, Eye, ArrowRight, Share2, MessageSquare, 
  BookOpen, Trophy, Heart, Minimize, RotateCcw, MapPin, Share, Shield, Package, Palette, Award, Star, 
  Medal, Gift, Crown, Brain, Lightbulb, Plus, ArrowLeft, LogOut, User as UserIcon, RefreshCw 
} from 'lucide-react';
import ViViLogo from '../components/ViViLogo';
import GeoSmartDashboard from './GeoSmartDashboard';
import { FaInstagram, FaLinkedin, FaTiktok, FaYoutube, FaSnapchat, FaFacebook } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import CampaignsPage from './CampaignsPage';
import ReviewsPage from './ReviewsPageEnhanced';
import CRMPage from './CRMPage';
import FourSIGHTPage from './FourSIGHTPage';
import ReportsPage from './ReportsPage';
import FourSightPanel from '../components/FourSight/FourSightPanel';
import SettingsPage from './SettingsPage';
import ComplianceCenterPage from './ComplianceCenterPageEnhanced';
import GrioAcademyPage from './GrioAcademyPage';

import InventoryManagerPage from './InventoryManagerPage';
import ViViStorePage from './ViViStorePage';
import MavroAIStudio from './MavroAIStudio';
import MagicStudioPage from './MagicStudioPage';
import BetaFeedbackPage from './BetaFeedbackPage';


// Import advanced UI components
import PersonalizedInteractionAnimations from '../components/PersonalizedInteractionAnimations';
import ContextualMicroInteractions from '../components/ContextualMicroInteractions';
import AdaptiveColorThemeSelector from '../components/AdaptiveColorThemeSelector';
import GamifiedUserProgress from '../components/GamifiedUserProgress';
import SmartOnboardingTooltips from '../components/SmartOnboardingTooltips';
import ThemeChangeNotification from '../components/ThemeChangeNotification';
import AutoStartTourGuide from '../components/AutoStartTourGuide';
import InteractiveHotspots from '../components/InteractiveHotspots';
import DemoProgressTracker from '../components/DemoProgressTracker';
import LiveDataSimulator from '../components/LiveDataSimulator';
import EnhancedMicroAnimations, { LoadingSkeleton, SuccessAnimation, ConfettiAnimation } from '../components/EnhancedMicroAnimations';
import RealTimeNotificationSystem from '../components/RealTimeNotificationSystem';
import PersonaComparisonMode from '../components/PersonaComparisonMode';
import MobileOptimizedNavigation from '../components/MobileOptimizedNavigation';
import EnhancedViViAssistant from '../components/EnhancedViViAssistant';
import PlayfulLoadingMascot from '../components/PlayfulLoadingMascot';
import { usePlayfulLoading } from '../hooks/usePlayfulLoading';
import { BetaFeedbackSystem, UserRatingFeedback } from '../components/BetaFeedbackSystem';
import { 
  AgentPackSelector, 
  SoundSelector, 
  AutoPilotDashboard, 
  CRMandReviewPanel, 
  CampaignSuccessDashboard 
} from '../components/ViViAutomationSuite';
import {
  CampaignSuccessDashboard as NewCampaignSuccess,
  AutoPilotDashboard as NewAutoPilotDashboard,
  AgentPackSelector as NewAgentPackSelector,
  SoundSelector as NewSoundSelector
} from '../components/NewViViComponents';
import PlanTab from '../components/CommandCenter/PlanTab';
import TrackTab from '../components/CommandCenter/TrackTab';
import GrowTab from '../components/CommandCenter/GrowTab';
import { RealTimeOpenAI } from '../components/RealTimeOpenAI';
import { useUserAnalytics } from '../components/UserAnalytics';
import { useUserPersona } from '../hooks/useUserPersona';
import DashboardTransition from '@/components/DashboardTransition';
import { ViViChatWidget } from '../components/ViViAI/ViViChatWidget';
import { ViViNotificationPanel } from '@/components/notifications/ViViNotificationPanel';
import { simulateMockAlerts } from '@/components/notifications/SimulateNotifications';

// ViVi Behavior Engine imports
import { ToastManager, useViViToast } from '@/components/ui/ViViToast';
import ViViLogicSlider from '@/components/ui/ViViLogicSlider';

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
        { trend: 'Podcast Interview Prep', growth: 'TOMORROW', note: 'Business Growth Show - 2 PM' },
        { trend: 'Weekly Newsletter', growth: 'DUE', note: 'Industry insights - Draft 80% complete' }
      ]
    }
  ];

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % trendSections.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getGrowthColor = (growth: string) => {
    if (growth.includes('%')) {
      const num = parseInt(growth.replace('%', '').replace('+', ''));
      if (num >= 50) return 'text-green-600';
      if (num >= 30) return 'text-blue-600';
      return 'text-yellow-600';
    }
    if (growth === 'URGENT') return 'text-red-600';
    if (growth === 'HOT') return 'text-orange-600';
    if (growth === 'PENDING') return 'text-yellow-600';
    if (growth === 'READY') return 'text-green-600';
    if (growth === 'TOMORROW') return 'text-purple-600';
    if (growth === 'DUE') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="relative">
      {/* Ticker Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">LIVE</span>
          </div>
          <h5 className="text-lg font-bold text-gray-900">
            {trendSections[currentSection].title}
          </h5>
        </div>
        
        {/* Dot Navigation */}
        <div className="flex items-center space-x-2">
          {trendSections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection 
                  ? 'bg-blue-500 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Ticker Content */}
      <div className="relative overflow-hidden bg-gray-900 rounded-lg p-4 min-h-[200px]">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 animate-pulse"></div>
        
        {/* Scrolling Content */}
        <div className="relative z-10 overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSection * 100}%)` }}
          >
            {trendSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.trends.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                          {item.trend}
                        </h6>
                        <span className={`font-bold text-sm ${getGrowthColor(item.growth)}`}>
                          {item.growth}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        {item.note}
                      </p>
                      {/* Action Button for certain sections */}
                      {(sectionIndex === 1 || sectionIndex === 2) && (
                        <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                          {sectionIndex === 1 ? 'Apply' : 'Action'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticker Tape Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500">
          <div 
            className="h-full bg-white/30 transition-all duration-500 ease-in-out"
            style={{ 
              width: `${((currentSection + 1) / trendSections.length) * 100}%`,
              transform: 'translateX(0)'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface UploadedFile {
  id: string;
  file: File;
  type: 'image' | 'video';
  preview: string;
  size: number;
  duration?: number;
}

interface ContentData {
  caption: string;
  hashtags: string[];
  music?: string;
  scheduledTime?: Date;
  quickSchedule?: string;
}

interface ExactMavroPlusDashboardProps {
  isDemoMode?: boolean;
  isBetaUser?: boolean;
}

export default function ExactMavroPlusDashboard({ isDemoMode = false, isBetaUser = false }: ExactMavroPlusDashboardProps) {
  const { userPersona } = useUserPersona();
  const analytics = useUserAnalytics();
  
  // Simplified mode detection without authentication
  const actualDemoMode = isDemoMode;
  const actualBetaUser = isBetaUser;
  
  // Debug logging to track mode detection
  console.log('🎯 Dashboard Mode Detection:', { 
    actualDemoMode, 
    actualBetaUser,
    propsIsDemoMode: isDemoMode,
    propsIsBetaUser: isBetaUser
  });
  const [activeMode, setActiveMode] = useState<'plan' | 'track' | 'grow' | 'learn'>('plan');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showTourGuide, setShowTourGuide] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'campaigns' | 'reviews' | 'crm' | 'foursight' | 'settings' | 'geosmart' | 'compliance' | 'clientportal' | 'inventory' | 'vivistore' | 'magicstudio' | 'aistudio' | 'betafeedback' | 'academy'>('dashboard');

  
  // User profile photo state
  const [userProfilePhoto, setUserProfilePhoto] = useState<string | null>(
    localStorage.getItem('userProfilePhoto') || null
  );

  // Save profile photo to localStorage when it changes
  useEffect(() => {
    if (userProfilePhoto) {
      localStorage.setItem('userProfilePhoto', userProfilePhoto);
    }
  }, [userProfilePhoto]);



  // Define detailed persona data with first names
  const getPersonaData = (persona: string) => {
    const personaMap: { [key: string]: { firstName: string; fullName: string; industry: string; title: string } } = {
      'kemar': { firstName: 'Kemar', fullName: 'Kemar Hinds', industry: 'Speaking & Leadership', title: 'Executive Speaker' },
      'karen': { firstName: 'Karen', fullName: 'Karen Rodriguez', industry: 'Real Estate', title: 'Real Estate Agent' },
      'sarah': { firstName: 'Sarah', fullName: 'Sarah Chen', industry: 'MedSpa & Wellness', title: 'MedSpa Owner' },
      'marco': { firstName: 'Marco', fullName: 'Marco Antonelli', industry: 'Food & Beverage', title: 'Restaurant Owner' },
      'alex': { firstName: 'Alex', fullName: 'Alex Johnson', industry: 'Fitness & Wellness', title: 'Fitness Coach' },
      'david': { firstName: 'David', fullName: 'David Thompson', industry: 'Automotive', title: 'Auto Dealer' },
      'elena': { firstName: 'Elena', fullName: 'Elena Martinez', industry: 'Beauty & Fashion', title: 'Beauty Salon Owner' },
      'mike': { firstName: 'Mike', fullName: 'Mike Sullivan', industry: 'Legal Services', title: 'Attorney' },
      'lisa': { firstName: 'Lisa', fullName: 'Lisa Wang', industry: 'Healthcare', title: 'Healthcare Consultant' },
      'james': { firstName: 'James', fullName: 'James Mitchell', industry: 'Education', title: 'Educational Consultant' },
      'maria': { firstName: 'Maria', fullName: 'Maria Gonzalez', industry: 'Non-Profit', title: 'Non-Profit Director' },
      'robert': { firstName: 'Robert', fullName: 'Robert Kim', industry: 'Technology', title: 'Tech Consultant' }
    };
    
    return personaMap[persona] || personaMap['kemar']; // Default to Kemar if persona not found
  };

  // Conditional data initialization based on user type
  const getInitialNotifications = () => {
    if (actualDemoMode) {
      // Rich demo data with profile photos for full demo experience
      return [
        { 
          id: 1, 
          title: 'New campaign performance', 
          message: 'Your keynote promotion campaign is performing 23% above average', 
          time: '2 min ago', 
          read: false, 
          type: 'success',
          userPhoto: userProfilePhoto || '/api/placeholder/32/32',
          userName: 'Kemar Griffin'
        },
        { 
          id: 2, 
          title: 'Content suggestion ready', 
          message: 'ViVi has generated 5 new content ideas for your speaking events', 
          time: '1 hour ago', 
          read: false, 
          type: 'info',
          userPhoto: userProfilePhoto || '/api/placeholder/32/32',
          userName: 'ViVi AI'
        },
        { 
          id: 3, 
          title: 'Analytics update', 
          message: 'Weekly performance report is now available', 
          time: '2 hours ago', 
          read: true, 
          type: 'info',
          userPhoto: userProfilePhoto || '/api/placeholder/32/32',
          userName: 'Analytics Team'
        },
        { 
          id: 4, 
          title: 'Trending topic alert', 
          message: 'Leadership development is trending in your industry', 
          time: '3 hours ago', 
          read: false, 
          type: 'trend',
          userPhoto: userProfilePhoto || '/api/placeholder/32/32',
          userName: 'Trend Analysis'
        },
        { 
          id: 5, 
          title: 'Engagement milestone', 
          message: 'You\'ve reached 10K followers on LinkedIn!', 
          time: '1 day ago', 
          read: true, 
          type: 'success',
          userPhoto: userProfilePhoto || '/api/placeholder/32/32',
          userName: 'LinkedIn'
        }
      ];
    } else if (actualBetaUser) {
      // Minimal starter data for new beta users with photos
      return [
        { 
          id: 1, 
          title: 'Welcome to Mavro Pro!', 
          message: 'Your workspace is ready. Start by creating your first campaign.', 
          time: 'Just now', 
          read: false, 
          type: 'info',
          userPhoto: userProfilePhoto || '/api/placeholder/32/32',
          userName: 'Mavro Team'
        },
        { 
          id: 2, 
          title: 'Getting Started', 
          message: 'Check out our Quick Start guide to maximize your results.', 
          time: '1 min ago', 
          read: false, 
          type: 'info',
          userPhoto: userProfilePhoto || '/api/placeholder/32/32',
          userName: 'Support Team'
        }
      ];
    }
    return [];
  };
  
  const [notifications, setNotifications] = useState(getInitialNotifications());
  
  // Drag and drop state for menu rearrangement
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<string | null>(null);
  const [menuOrder, setMenuOrder] = useState<string[]>([]);
  const [isDragModeEnabled, setIsDragModeEnabled] = useState(false);
  
  // Set initial persona based on user type
  const getInitialPersona = () => {
    if (actualDemoMode) {
      return 'kemar'; // Demo always starts with Kemar for consistency
    } else if (actualBetaUser) {
      // For beta users, use their actual persona from onboarding if available
      return userPersona?.businessType || 'kemar';
    }
    return 'kemar';
  };
  
  const [currentPersona, setCurrentPersona] = useState(() => {
    // For beta users, don't use personas - use their actual business info
    if (actualBetaUser && userPersona) {
      return 'user'; // Use actual user data instead of demo personas
    }
    return getInitialPersona();
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'linkedin', 'tiktok']);
  
  // Initialize usePlayfulLoading hook
  const { 
    isLoading: showPlayfulLoading, 
    loadingText: playfulLoadingText, 
    startLoading, 
    stopLoading
  } = usePlayfulLoading();
  
  // Initialize ViVi Toast system
  const { toasts, showToast, hideToast, handleToastAction } = useViViToast();
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['portrait']);
  const [showPersonaDropdown, setShowPersonaDropdown] = useState(false);
  
  // Advanced UI component states
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showGamifiedProgress, setShowGamifiedProgress] = useState(false);
  const [showOnboardingTooltips, setShowOnboardingTooltips] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  
  // Enhanced demo component states
  const [showAutoTour, setShowAutoTour] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [showProgressTracker, setShowProgressTracker] = useState(false);
  const [liveDataActive, setLiveDataActive] = useState(true);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPersonaComparison, setShowPersonaComparison] = useState(false);
  const [notificationSystemActive, setNotificationSystemActive] = useState(true);
  const [viviMinimized, setViviMinimized] = useState(false);
  const [showFeatureDashboard, setShowFeatureDashboard] = useState<string | null>(null);
  const [showViViAutomation, setShowViViAutomation] = useState(false);
  
  // ViVi Behavior Engine state
  const [viviAutonomyLevel, setViviAutonomyLevel] = useState(0.7);
  const [viviBehaviorFlow, setViviBehaviorFlow] = useState(null);
  const [interactionType, setInteractionType] = useState<'hover' | 'click' | 'success' | 'engagement' | 'achievement'>('hover');
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [showThemeNotification, setShowThemeNotification] = useState(false);
  const [themeNotificationData, setThemeNotificationData] = useState<{
    name: string;
    color: string;
  }>({ name: '', color: '' });
  
  // Initialize theme system
  useEffect(() => {
    const savedTheme = localStorage.getItem('mavro-theme');
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme);
        setSelectedTheme(theme);
      } catch (error) {
        console.error('Failed to load saved theme:', error);
      }
    }
  }, []);
  
  // Handle theme changes
  const handleThemeChange = (theme: any) => {
    setSelectedTheme(theme);
    setThemeNotificationData({
      name: theme.name,
      color: theme.primary
    });
    setShowThemeNotification(true);
    setShowThemeSelector(false);
    
    // Force CSS update by triggering a reflow
    setTimeout(() => {
      document.body.style.display = 'none';
      document.body.offsetHeight; // Force reflow
      document.body.style.display = '';
    }, 100);
  };
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [contentData, setContentData] = useState<ContentData>({
    caption: '',
    hashtags: [],
    music: '',
    scheduledTime: undefined,
    quickSchedule: ''
  });
  const [previewIndex, setPreviewIndex] = useState(0);
  const [showSaveDraftModal, setShowSaveDraftModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentPreviewPlatform, setCurrentPreviewPlatform] = useState(0);
  const [currentAspectRatio, setCurrentAspectRatio] = useState(0);
  const [activeContentType, setActiveContentType] = useState('Caption');
  const [performanceMetrics, setPerformanceMetrics] = useState({
    engagement: 0,
    reach: 0,
    conversion: 0
  });
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [optimalPostingTimes, setOptimalPostingTimes] = useState<{ [key: string]: string }>({});
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);
  const [viviButtonClicked, setViviButtonClicked] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const personaDropdownRef = useRef<HTMLDivElement>(null);

  // Auto-start onboarding on first login
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('mavro-onboarding-completed');
    if (!hasCompletedOnboarding) {
      // Start onboarding after a brief delay to allow UI to render
      setTimeout(() => {
        setShowOnboardingTooltips(true);
      }, 2000);
    }
    
    // Auto-start tour guide for new users
    const hasSeenTour = localStorage.getItem('mavro-tour-completed');
    if (!hasSeenTour) {
      setShowAutoTour(true);
    }
  }, []);

  // Demo reset functionality
  const handleDemoReset = () => {
    // Clear all local storage
    localStorage.removeItem('mavro-welcome-seen');
    localStorage.removeItem('mavro-tour-completed');
    localStorage.removeItem('mavro-theme-preference');
    localStorage.removeItem('mavro-onboarding-completed');
    
    // Reset all states
    setCurrentPersona('kemar');
    setCurrentView('dashboard');
    setActiveMode('plan');
    setShowWelcomeModal(false);
    setShowAutoTour(true);
    setShowHotspots(true);
    setLiveDataActive(true);
    setNotificationSystemActive(true);
    setUploadedFiles([]);
    setContentData({ caption: '', hashtags: [], music: '', scheduledTime: undefined, quickSchedule: '' });
    setSelectedPlatforms(['instagram', 'linkedin', 'tiktok']);
    setSelectedFormats(['portrait']);
    
    // Show success animation
    setShowSuccessAnimation(true);
    setTimeout(() => setShowSuccessAnimation(false), 2000);
    
    // Show confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Enhanced action handlers
  const handleTourComplete = () => {
    localStorage.setItem('mavro-tour-completed', 'true');
    setShowAutoTour(false);
    setShowHotspots(true);
  };

  const handlePersonaComparisonToggle = () => {
    setShowPersonaComparison(!showPersonaComparison);
  };

  // Voice activation functions
  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        if (event.results[event.results.length - 1].isFinal) {
          setContentData(prev => ({ ...prev, caption: transcript }));
          setIsListening(false);
        }
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      setSpeechRecognition(recognition);
    }
  };
  
  const startListening = () => {
    if (speechRecognition) {
      setIsListening(true);
      speechRecognition.start();
    }
  };
  
  const stopListening = () => {
    if (speechRecognition) {
      speechRecognition.stop();
      setIsListening(false);
    }
  };

  // Initialize speech recognition and performance metrics
  useEffect(() => {
    initializeSpeechRecognition();
    
    // Initialize performance metrics with persona-specific data
    const metrics = {
      engagement: Math.floor(Math.random() * 15) + 5,
      reach: Math.floor(Math.random() * 25) + 10,
      conversion: Math.floor(Math.random() * 8) + 2
    };
    setPerformanceMetrics(metrics);
    
    // Set trending topics based on persona
    const topics = currentPersona === 'kemar' ? 
      ['#leadership', '#motivation', '#success', '#mindset', '#growth'] :
      ['#business', '#marketing', '#growth', '#success', '#tips'];
    setTrendingTopics(topics);
    
    // Set optimal posting times
    const times = {
      instagram: '12:00 PM',
      facebook: '3:00 PM',
      x: '9:00 AM',
      linkedin: '8:00 AM',
      tiktok: '6:00 PM'
    };
    setOptimalPostingTimes(times);
  }, [currentPersona]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (personaDropdownRef.current && !personaDropdownRef.current.contains(event.target as Node)) {
        setShowPersonaDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const defaultNavigationItems = [
    { icon: Home, label: 'Command Center', active: currentView === 'dashboard', key: 'dashboard' },
    { icon: Target, label: 'Campaigns', active: currentView === 'campaigns', key: 'campaigns' },
    { icon: Upload, label: 'Magic Studio™', active: currentView === 'magicstudio', key: 'magicstudio' },
    { icon: MessageCircle, label: 'Reviews', active: currentView === 'reviews', key: 'reviews' },
    { icon: Users, label: 'CRM', active: currentView === 'crm', key: 'crm' },
    { icon: FileText, label: 'FourSIGHT™', active: currentView === 'foursight', key: 'foursight' },
    { icon: MapPin, label: 'GeoSmart™', active: currentView === 'geosmart', key: 'geosmart' },

    { icon: Zap, label: 'AI Studio', active: currentView === 'aistudio', key: 'aistudio' },
    { icon: Brain, label: 'ViVi Store', active: currentView === 'vivistore', key: 'vivistore' },
    { icon: MessageSquare, label: 'Beta Feedback', active: currentView === 'betafeedback', key: 'betafeedback' },
    { icon: Settings, label: 'Settings', active: currentView === 'settings', key: 'settings' },
  ];

  // Initialize menu order from localStorage or default order
  useEffect(() => {
    const savedOrder = localStorage.getItem('menuOrder');
    if (savedOrder) {
      setMenuOrder(JSON.parse(savedOrder));
    } else {
      const defaultOrder = defaultNavigationItems.map(item => item.key);
      setMenuOrder(defaultOrder);
    }
  }, []);

  // Save menu order to localStorage when it changes
  useEffect(() => {
    if (menuOrder.length > 0) {
      localStorage.setItem('menuOrder', JSON.stringify(menuOrder));
    }
  }, [menuOrder]);

  // Create ordered navigation items based on user's custom order
  const getOrderedNavigationItems = () => {
    if (menuOrder.length === 0) return defaultNavigationItems;
    
    const orderedItems = [];
    const itemsMap = new Map(defaultNavigationItems.map(item => [item.key, item]));
    
    // Add items in user's preferred order
    for (const key of menuOrder) {
      const item = itemsMap.get(key);
      if (item) {
        orderedItems.push({
          ...item,
          active: currentView === key || (key === 'dashboard' && currentView === 'dashboard')
        });
      }
    }
    
    // Add any new items that weren't in the saved order
    for (const item of defaultNavigationItems) {
      if (!menuOrder.includes(item.key)) {
        orderedItems.push({
          ...item,
          active: currentView === item.key || (item.key === 'dashboard' && currentView === 'dashboard')
        });
      }
    }
    
    return orderedItems;
  };

  const navigationItems = getOrderedNavigationItems();

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, itemKey: string) => {
    setDraggedItem(itemKey);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, itemKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverItem(itemKey);
  };

  const handleDragLeave = () => {
    setDraggedOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetKey: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetKey) {
      setDraggedItem(null);
      setDraggedOverItem(null);
      return;
    }

    const newOrder = [...menuOrder];
    const draggedIndex = newOrder.indexOf(draggedItem);
    const targetIndex = newOrder.indexOf(targetKey);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove the dragged item and insert it at the target position
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedItem);
      setMenuOrder(newOrder);
    }

    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  // Add specialized pages based on persona
  const specializedPages = [];
  if (['sarah', 'karen', 'david', 'alex', 'kemar'].includes(currentPersona)) {
    specializedPages.push({ icon: Shield, label: 'Compliance', active: currentView === 'compliance', key: 'compliance' });
  }

  if (['marco', 'david', 'alex'].includes(currentPersona)) {
    specializedPages.push({ icon: Package, label: 'Inventory', active: currentView === 'inventory', key: 'inventory' });
  }

  const allNavigationItems = [...navigationItems, ...specializedPages];

  const wizardSteps = [
    { id: 1, title: 'Upload Media', subtitle: 'Add photos and videos', active: currentStep === 1 },
    { id: 2, title: 'Select Platforms', subtitle: 'Choose where to post', active: currentStep === 2 },
    { id: 3, title: 'Create Content', subtitle: 'Write your caption', active: currentStep === 3 },
    { id: 4, title: 'Schedule & Preview', subtitle: 'Set timing and review', active: currentStep === 4 },
  ];

  const platforms = [
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: FaInstagram, 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      ratios: ['1.91:1', '1:1', '4:5', '9:16'], // Feed landscape, square, portrait, stories/reels
      description: 'Feed • Stories • Reels'
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: FaFacebook, 
      color: 'bg-blue-600',
      ratios: ['1.91:1', '1:1', '4:5', '9:16'], // Feed posts, square, portrait, stories/reels
      description: 'Feed • Stories • Reels'
    },
    { 
      id: 'x', 
      name: 'X', 
      icon: XIcon, 
      color: 'bg-black',
      ratios: ['16:9', '9:16', '1:1'], // In-stream landscape, vertical, square
      description: '16:9 • 9:16 • 1:1'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: FaLinkedin, 
      color: 'bg-blue-700',
      ratios: ['1.91:1', '1:1', '4:5', '9:16', '16:9'], // Feed share, square, portrait, vertical, video
      description: 'Feed • Video • Profile'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: FaTiktok, 
      color: 'bg-black',
      ratios: ['9:16', '1.91:1', '1:1'], // Feed vertical, carousel wide, ads square
      description: '9:16 • Ads • Carousel'
    },
    { 
      id: 'snapchat', 
      name: 'Snapchat', 
      icon: FaSnapchat, 
      color: 'bg-yellow-400',
      ratios: ['9:16'], // Vertical full-screen only
      description: '9:16 Stories'
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: FaYoutube, 
      color: 'bg-red-600',
      ratios: ['16:9', '9:16'], // Standard videos, Shorts
      description: '16:9 • 9:16 Shorts'
    },
  ];

  const formats = [
    { id: 'portrait', name: 'Portrait', ratio: '4:5', icon: '📱' },
    { id: 'story', name: 'Story', ratio: '9:16', icon: '📲' },
    { id: 'landscape', name: 'Landscape', ratio: '16:9', icon: '🖼️' },
    // For beta users, show all format options (not persona-specific)
    ...(!actualBetaUser && currentPersona === 'kemar' ? [
      { id: 'reel', name: 'Reel', ratio: '9:16', icon: '🎬' },
      { id: 'carousel', name: 'Carousel', ratio: '1:1', icon: '📝' },
      { id: 'event-promo', name: 'Event Promo', ratio: '16:9', icon: '🎯' },
    ] : actualBetaUser ? [
      { id: 'reel', name: 'Reel', ratio: '9:16', icon: '🎬' },
      { id: 'carousel', name: 'Carousel', ratio: '1:1', icon: '📝' },
      { id: 'square', name: 'Square', ratio: '1:1', icon: '⏹️' },
    ] : []),
  ];

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const toggleFormat = (formatId: string) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  // ViVi Behavior Engine initialization - disabled in demo mode, preserved for beta testing
  useEffect(() => {
    const initializeViViEngine = async () => {
      if (currentView === 'dashboard' && (activeMode === 'plan' || activeMode === 'track' || activeMode === 'grow')) {
        // Get current persona data
        const personaData = {
          name: currentPersona || 'Kemar Hinds',
          industry: currentPersona?.includes('Karen') ? 'Real Estate' :
                   currentPersona?.includes('Sarah') ? 'MedSpa' :
                   currentPersona?.includes('Marco') ? 'Restaurant' :
                   currentPersona?.includes('Alex') ? 'Fitness' :
                   currentPersona?.includes('David') ? 'Automotive' : 'Speaking'
        };
        
        // Simulate ViVi behavior engine analysis
        const simulateViViDecision = () => {
          const decisions = [];
          
          // TrendTap simulation
          if (trendingTopics.length > 0 && viviAutonomyLevel > 0.5) {
            decisions.push({
              type: 'trend_analysis',
              action: 'content_suggestion',
              confidence: 0.85,
              message: `ViVi detected trending topic: "${trendingTopics[0]}" - suggesting content creation`
            });
          }
          
          // GeoSmart simulation
          if (activeMode === 'track' && viviAutonomyLevel > 0.6) {
            const region = personaData.name?.includes('Karen') ? 'Toronto' : 
                          personaData.name?.includes('Sarah') ? 'Miami' :
                          personaData.name?.includes('Marco') ? 'San Francisco' :
                          personaData.name?.includes('Alex') ? 'Los Angeles' :
                          personaData.name?.includes('David') ? 'Detroit' : 'New York';
            
            decisions.push({
              type: 'geo_analysis',
              action: 'audience_optimization',
              confidence: 0.92,
              message: `ViVi optimized content for ${region} audience engagement patterns`
            });
          }
          
          // TrackMode simulation
          if (activeMode === 'grow' && viviAutonomyLevel > 0.7) {
            decisions.push({
              type: 'performance_optimization',
              action: 'boost_recommendation',
              confidence: 0.78,
              message: 'ViVi recommends 2x boost for current campaign based on engagement metrics'
            });
          }
          
          return decisions;
        };

        // Execute ViVi decisions
        const decisions = simulateViViDecision();
        
        decisions.forEach((decision, index) => {
          setTimeout(() => {
            console.log('ViVi Decision:', decision);
            setViviBehaviorFlow((prev: any) => ({
              ...prev,
              lastDecision: decision,
              timestamp: new Date().toISOString()
            }));
            
            // Show autonomous decision notifications - only for beta users
            if (viviAutonomyLevel > 0.5 && actualBetaUser) {
              showToast({
                type: decision.type === 'trend_analysis' ? 'trend' : 'info',
                title: `ViVi Auto-Decision (${Math.round(decision.confidence * 100)}% confidence)`,
                message: decision.message,
                duration: 4000,
                actions: viviAutonomyLevel < 0.8 ? [
                  { label: 'Apply', action: 'apply_suggestion' },
                  { label: 'Dismiss', action: 'dismiss' }
                ] : undefined
              });
            }
          }, index * 2000); // Stagger notifications
        });
      }
    };

    initializeViViEngine();
  }, [currentView, activeMode, selectedPlatforms, selectedFormats, trendingTopics.length, viviAutonomyLevel, actualBetaUser]);

  // Handle autonomy level changes - disabled notifications in demo mode
  const handleAutonomyChange = (newLevel: number) => {
    setViviAutonomyLevel(newLevel);
    
    // Only show toast notifications for beta users
    if (actualBetaUser) {
      showToast({
        type: 'info',
        title: 'ViVi Autonomy Updated',
        message: `ViVi autonomy level set to ${Math.round(newLevel * 100)}%`,
        duration: 3000
      });
    }
  };

  // File upload handling
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    console.log('Files selected:', Array.from(files).map(f => ({ name: f.name, type: f.type, size: f.size })));

    Array.from(files).forEach(file => {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      
      console.log('Processing file:', { name: file.name, type: file.type, isVideo, isImage });
      
      if (isVideo) {
        // For videos, use URL.createObjectURL for proper playback
        const previewUrl = URL.createObjectURL(file);
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          file,
          type: 'video',
          preview: previewUrl,
          size: file.size,
          duration: 0
        };
        console.log('Adding video file:', newFile);
        setUploadedFiles(prev => {
          const updated = [...prev, newFile];
          console.log('Updated files array:', updated);
          return updated;
        });
      } else if (isImage) {
        // For images, use FileReader as before
        const reader = new FileReader();
        reader.onload = (e) => {
          const newFile: UploadedFile = {
            id: Date.now().toString() + Math.random(),
            file,
            type: 'image',
            preview: e.target?.result as string,
            size: file.size
          };
          console.log('Adding image file:', newFile);
          setUploadedFiles(prev => {
            const updated = [...prev, newFile];
            console.log('Updated files array:', updated);
            return updated;
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove && fileToRemove.type === 'video') {
        // Clean up object URL for videos to prevent memory leaks
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  // Platform-specific character limits
  const getCharacterLimit = (platformId: string) => {
    switch (platformId) {
      case 'instagram': return 2200;
      case 'facebook': return 63206;
      case 'x': return 280;
      case 'linkedin': return 3000;
      case 'tiktok': return 150;
      case 'snapchat': return 80;
      default: return 280;
    }
  };

  const getTotalCharacterLimit = (): number => {
    return selectedPlatforms.reduce((total, platform) => total + getCharacterLimit(platform), 0);
  };

  const useContentSuggestion = (suggestion: string) => {
    // Show playful loading animation when applying suggestion
    startLoading("ViVi is applying your content suggestion...", 1500);
    
    setTimeout(() => {
      setContentData(prev => ({
        ...prev,
        caption: suggestion
      }));
      stopLoading();
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 2000);
    }, 1500);
  };

  const getContentSuggestions = (type: string) => {
    const suggestions = {
      Caption: [
        {
          text: "Ready to transform your [industry] experience? Here's what makes us different...",
          tags: ["High Engagement", "Professional"],
          gradient: "from-indigo-50 to-purple-50",
          border: "border-indigo-200",
          icon: Zap,
          iconBg: "bg-indigo-500",
          buttonColor: "text-indigo-600 hover:text-indigo-800"
        },
        {
          text: "The secret to [benefit] that [target audience] don't want you to know...",
          tags: ["Curiosity Hook", "Viral Potential"],
          gradient: "from-purple-50 to-pink-50",
          border: "border-purple-200",
          icon: Target,
          iconBg: "bg-purple-500",
          buttonColor: "text-purple-600 hover:text-purple-800"
        },
        {
          text: "Drop a 🔥 if you agree! What's your biggest challenge with [topic]?",
          tags: ["Engagement", "Community"],
          gradient: "from-green-50 to-teal-50",
          border: "border-green-200",
          icon: MessageCircle,
          iconBg: "bg-green-500",
          buttonColor: "text-green-600 hover:text-green-800"
        }
      ],
      Hook: [
        {
          text: "Stop scrolling! This will change everything you know about [topic]",
          tags: ["Scroll Stopper", "Attention Grabber"],
          gradient: "from-red-50 to-orange-50",
          border: "border-red-200",
          icon: AlertTriangle,
          iconBg: "bg-red-500",
          buttonColor: "text-red-600 hover:text-red-800"
        },
        {
          text: "POV: You just discovered the game-changing secret that [industry] doesn't want you to know",
          tags: ["Trending Format", "Mystery"],
          gradient: "from-yellow-50 to-amber-50",
          border: "border-yellow-200",
          icon: Eye,
          iconBg: "bg-yellow-500",
          buttonColor: "text-yellow-600 hover:text-yellow-800"
        },
        {
          text: "Wait, what?! I can't believe this actually works for [benefit]...",
          tags: ["Surprise Factor", "Curiosity"],
          gradient: "from-blue-50 to-cyan-50",
          border: "border-blue-200",
          icon: Zap,
          iconBg: "bg-blue-500",
          buttonColor: "text-blue-600 hover:text-blue-800"
        }
      ],
      CTA: [
        {
          text: "Ready to get started? Click the link in bio and transform your [outcome] today!",
          tags: ["Direct Action", "Urgency"],
          gradient: "from-emerald-50 to-green-50",
          border: "border-emerald-200",
          icon: ArrowRight,
          iconBg: "bg-emerald-500",
          buttonColor: "text-emerald-600 hover:text-emerald-800"
        },
        {
          text: "Don't miss out! Save this post and tag 3 friends who need to see this",
          tags: ["Social Sharing", "FOMO"],
          gradient: "from-pink-50 to-rose-50",
          border: "border-pink-200",
          icon: Share2,
          iconBg: "bg-pink-500",
          buttonColor: "text-pink-600 hover:text-pink-800"
        },
        {
          text: "Comment 'YES' if you want the free guide to [solution] sent to your DMs",
          tags: ["Lead Generation", "Engagement"],
          gradient: "from-violet-50 to-purple-50",
          border: "border-violet-200",
          icon: MessageSquare,
          iconBg: "bg-violet-500",
          buttonColor: "text-violet-600 hover:text-violet-800"
        }
      ],
      Story: [
        {
          text: "Last month, I was struggling with [problem]. Then I discovered this simple trick that changed everything...",
          tags: ["Personal Journey", "Transformation"],
          gradient: "from-teal-50 to-cyan-50",
          border: "border-teal-200",
          icon: BookOpen,
          iconBg: "bg-teal-500",
          buttonColor: "text-teal-600 hover:text-teal-800"
        },
        {
          text: "My client came to me saying '[problem]' - here's exactly how we solved it in 30 days...",
          tags: ["Case Study", "Results"],
          gradient: "from-orange-50 to-red-50",
          border: "border-orange-200",
          icon: Trophy,
          iconBg: "bg-orange-500",
          buttonColor: "text-orange-600 hover:text-orange-800"
        },
        {
          text: "Behind the scenes: The mistake that cost me [consequence] and how I turned it into my biggest win...",
          tags: ["Vulnerability", "Learning"],
          gradient: "from-slate-50 to-gray-50",
          border: "border-slate-200",
          icon: Heart,
          iconBg: "bg-slate-500",
          buttonColor: "text-slate-600 hover:text-slate-800"
        }
      ]
    };
    return suggestions[type as keyof typeof suggestions] || suggestions.Caption;
  };

  // Sample hashtags for each platform
  const platformHashtags: { [key: string]: string[] } = {
    instagram: currentPersona === 'kemar' ? 
      ['#keynotespeaker', '#thoughtleader', '#speaker', '#publicspeaking', '#leadership', '#motivation', '#inspiration', '#businessgrowth', '#personalbrand', '#influence', '#mindset', '#success', '#entrepreneur', '#coaching', '#conference', '#eventpromo', '#speakerlife', '#leadershipdevelopment', '#professionaldevelopment', '#businesscoach'] :
      ['#instagood', '#photooftheday', '#instadaily', '#picoftheday', '#love', '#beautiful', '#happy', '#fashion', '#follow', '#like4like'],
    facebook: currentPersona === 'kemar' ? 
      ['#keynotespeaker', '#thoughtleadership', '#publicspeaking', '#businessleadership', '#professionaldevelopment', '#speakerlife', '#leadership', '#motivation', '#businessgrowth', '#personalbrand', '#influence', '#mindset', '#success', '#entrepreneur', '#coaching', '#conference', '#eventpromo', '#businesscoach', '#leadershipdevelopment', '#inspiration'] :
      ['#facebook', '#socialmedia', '#marketing', '#business', '#entrepreneur', '#success', '#motivation', '#inspiration', '#community', '#engagement'],
    x: currentPersona === 'kemar' ? 
      ['#keynotespeaker', '#thoughtleader', '#leadership', '#publicspeaking', '#businessleadership', '#speaker', '#motivation', '#inspiration', '#businessgrowth', '#personalbrand', '#influence', '#mindset', '#success', '#entrepreneur', '#coaching', '#conference', '#eventpromo', '#businesscoach', '#leadershipdevelopment'] :
      ['#trending', '#news', '#breaking', '#twitter', '#social', '#tech', '#business', '#politics', '#sports', '#entertainment'],
    linkedin: currentPersona === 'kemar' ? 
      ['#keynotespeaker', '#thoughtleadership', '#publicspeaking', '#businessleadership', '#professionaldevelopment', '#leadership', '#speaker', '#motivation', '#inspiration', '#businessgrowth', '#personalbrand', '#influence', '#mindset', '#success', '#entrepreneur', '#coaching', '#conference', '#eventpromo', '#businesscoach', '#leadershipdevelopment'] :
      ['#linkedin', '#professional', '#business', '#career', '#networking', '#leadership', '#entrepreneur', '#success', '#growth', '#industry'],
    tiktok: currentPersona === 'kemar' ? 
      ['#keynotespeaker', '#speaker', '#leadership', '#motivation', '#inspiration', '#businesstips', '#personalbrand', '#influence', '#mindset', '#success', '#entrepreneur', '#coaching', '#leadershipdevelopment', '#businesscoach', '#thoughtleader', '#publicspeaking', '#businessgrowth', '#professionaldevelopment', '#speakerlife', '#conference'] :
      ['#fyp', '#viral', '#trending', '#foryou', '#tiktok', '#dance', '#music', '#funny', '#comedy', '#challenge'],
    snapchat: currentPersona === 'kemar' ? 
      ['#keynotespeaker', '#speaker', '#leadership', '#motivation', '#inspiration', '#businesstips', '#personalbrand', '#influence', '#mindset', '#success', '#entrepreneur', '#coaching', '#leadershipdevelopment', '#businesscoach', '#thoughtleader', '#publicspeaking', '#businessgrowth', '#professionaldevelopment', '#speakerlife'] :
      ['#snapchat', '#snap', '#story', '#filter', '#lens', '#friends', '#memories', '#moments', '#discover', '#explore']
  };

  // Sample music/sounds for platforms
  const platformMusic: { [key: string]: string[] } = {
    instagram: ['Original Audio', 'Trending Audio', 'Pop Music', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Rock', 'Country', 'R&B'],
    tiktok: ['Trending Sound', 'Viral Audio', 'Original Sound', 'Popular Music', 'Dance Music', 'Comedy Sound', 'Trending Song', 'Remix', 'Mashup', 'Sound Effect'],
    snapchat: ['Snap Original', 'Trending Sound', 'Popular Song', 'Background Music', 'Sound Effect', 'Viral Audio', 'Original Audio', 'Music Track', 'Audio Clip', 'Sound Bite']
  };

  // Quick schedule options
  const quickScheduleOptions = [
    { id: 'now', label: 'Post Now', time: new Date() },
    { id: '1hour', label: '1 Hour from Now', time: new Date(Date.now() + 60 * 60 * 1000) },
    { id: '3hours', label: '3 Hours from Now', time: new Date(Date.now() + 3 * 60 * 60 * 1000) },
    { id: '1day', label: 'Tomorrow', time: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    { id: 'besttime', label: 'Best Time to Post', time: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    { id: '1week', label: 'Next Week', time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
  ];

  // Navigation functions
  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSaveDraft = () => {
    // Save draft data to localStorage
    const draftData = {
      persona: currentPersona,
      step: currentStep,
      contentData,
      selectedPlatforms,
      selectedFormats,
      uploadedFiles: uploadedFiles.map(f => ({ id: f.id, type: f.type, size: f.size })),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('mavro-draft-content', JSON.stringify(draftData));
    
    setShowSaveDraftModal(true);
  };

  const confirmSaveDraft = () => {
    setShowSaveDraftModal(false);
    setShowConfirmationModal(true);
    
    // Auto-hide confirmation after 3 seconds
    setTimeout(() => {
      setShowConfirmationModal(false);
      // Reset wizard state or navigate away
    }, 3000);
  };

  // Get persona-specific congratulatory message
  const getPersonaCongratulatoryMessage = () => {
    switch (currentPersona) {
      case 'kemar':
        return {
          title: "Outstanding Leadership! 🎯",
          message: "Your content is ready to inspire and transform audiences worldwide!",
          quote: "Leaders don't create followers,\nthey create more leaders!"
        };
      case 'karen':
        return {
          title: "Property Sold! 🏡",
          message: "Your real estate content will connect with dream home seekers everywhere!",
          quote: "Home is where your story begins,\nand your success continues!"
        };
      case 'sarah':
        return {
          title: "Glow Up Complete! ✨",
          message: "Your beauty content will help clients discover their most confident selves!",
          quote: "Beauty begins when you decide\nto be yourself!"
        };
      case 'marco':
        return {
          title: "Bon Appetito! 🍝",
          message: "Your culinary content will bring families together around amazing food!",
          quote: "Life is a combination of magic\nand pasta!"
        };
      case 'alex':
        return {
          title: "Fitness Goals Achieved! 💪",
          message: "Your fitness content will motivate people to become their strongest selves!",
          quote: "Your only limit is you,\nand you're limitless!"
        };
      case 'david':
        return {
          title: "Drive Success! 🚗",
          message: "Your automotive content will help customers find their perfect ride!",
          quote: "Life is a journey,\nenjoy the ride!"
        };
      default:
        return {
          title: "Content Creation Complete! 🎉",
          message: "Your content is ready to make a powerful impact!",
          quote: "Success is not final,\nfailure is not fatal!"
        };
    }
  };

  // ViVi button handlers
  const handleViviMagicClick = () => {
    setViviButtonClicked('magic');
    setShowBusinessInfo(true);
  };

  const handleViviNotNowClick = () => {
    setViviButtonClicked('not_now');
    setShowBusinessInfo(true);
  };

  // Get persona business information
  const getPersonaBusinessInfo = () => {
    // Use real user persona data in beta mode, demo personas in demo mode
    if (userPersona && !isDemoMode) {
      return {
        name: userPersona.name,
        business: userPersona.business,
        description: `${userPersona.businessType} specializing in ${userPersona.industry.toLowerCase()}.`,
        industry: userPersona.industry,
        services: userPersona.contentTypes || ['Content Creation', 'Marketing', 'Brand Development'],
        achievements: userPersona.goals || ['Growing Business', 'Building Brand', 'Increasing Revenue']
      };
    }
    
    // Demo personas for demo mode
    const personas = {
      'kemar': {
        name: 'Kemar Hinds',
        business: 'Keynote Speaker & Leadership Expert',
        description: 'Professional speaker specializing in leadership, motivation, and business transformation.',
        industry: 'Professional Speaking',
        services: ['Keynote Speaking', 'Leadership Training', 'Corporate Workshops', 'Executive Coaching'],
        achievements: ['500+ Speaking Events', 'Fortune 500 Clients', 'International Recognition', 'Best-Selling Author']
      },
      'karen': {
        name: 'Karen Thompson',
        business: 'Premium Real Estate Services',
        description: 'Top-performing real estate agent specializing in luxury properties and downtown condos.',
        industry: 'Real Estate',
        services: ['Property Sales', 'Market Analysis', 'Investment Consulting', 'Property Management'],
        achievements: ['Top 1% Agent', '$50M+ Sales Volume', '200+ Happy Clients', 'Market Expert']
      },
      'sarah': {
        name: 'Sarah Martinez',
        business: 'Radiant MedSpa & Wellness',
        description: 'Leading medical spa offering advanced anti-aging treatments and wellness services.',
        industry: 'Medical Spa',
        services: ['Anti-Aging Treatments', 'Facial Rejuvenation', 'Wellness Programs', 'Skincare Consultation'],
        achievements: ['5-Star Rated', 'Certified Practitioners', '1000+ Transformations', 'Award-Winning Spa']
      },
      'marco': {
        name: 'Marco Romano',
        business: 'Nonna\'s Authentic Italian Kitchen',
        description: 'Family-owned Italian restaurant serving authentic farm-to-table dishes.',
        industry: 'Restaurant',
        services: ['Authentic Italian Cuisine', 'Private Dining', 'Catering Services', 'Cooking Classes'],
        achievements: ['Family Recipe Legacy', 'Farm-to-Table Pioneer', 'Local Favorite', 'Authentic Ingredients']
      },
      'alex': {
        name: 'Alex Chen',
        business: 'Peak Performance Fitness',
        description: 'Personal training and fitness coaching focused on transformation and results.',
        industry: 'Fitness & Wellness',
        services: ['Personal Training', 'Fitness Coaching', 'Nutrition Planning', 'Group Classes'],
        achievements: ['Certified Trainer', '500+ Transformations', 'Competition Coach', 'Fitness Expert']
      },
      'david': {
        name: 'David Wilson',
        business: 'Wilson Premium Auto',
        description: 'Premium automotive dealership specializing in luxury and electric vehicles.',
        industry: 'Automotive',
        services: ['Vehicle Sales', 'Trade-In Services', 'Financing Options', 'Service & Maintenance'],
        achievements: ['Top Dealer Award', 'EV Specialist', '20+ Years Experience', 'Customer Satisfaction']
      }
    };

    return personas[currentPersona as keyof typeof personas] || personas.kemar;
  };

  return (
    <DashboardTransition>
      {/* Tutorial Navigation Pills - Hidden from visual display */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden">
        <div className="flex items-center space-x-2 bg-black bg-opacity-80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full hover:bg-purple-700 transition-colors">
              Playful AI Interaction Tutorial
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors">
              One-Click Social Media Content Wizard
            </button>
            <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-green-700 transition-colors">
              Dynamic Persona Mood Indicator
            </button>
          </div>
          <div className="border-l border-gray-600 h-4 mx-2"></div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded-full hover:bg-orange-700 transition-colors">
              Gamified Learning Path for Marketing Tools
            </button>
            <button className="px-3 py-1 bg-pink-600 text-white text-xs rounded-full hover:bg-pink-700 transition-colors">
              Animated Dashboard Performance Sparklines
            </button>
            <button className="text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">
              ∧ Show less
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Mavro Pro</h1>
              <p className="text-sm text-gray-500">
                {isDemoMode ? 'DEMO ACCOUNT' : 'Beta Mode'}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced User Profile */}
        <div className="p-6 border-b border-gray-100">
          {/* Main Profile Section */}
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Large Profile Avatar */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ${
              !isDemoMode && userPersona ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
              currentPersona === 'kemar' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
              currentPersona === 'karen' ? 'bg-green-500' :
              currentPersona === 'sarah' ? 'bg-pink-500' :
              currentPersona === 'marco' ? 'bg-red-500' :
              currentPersona === 'alex' ? 'bg-blue-500' :
              currentPersona === 'david' ? 'bg-purple-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}>
              {/* Show initials */}
              {actualBetaUser ? 'MP' :
                currentPersona === 'kemar' ? 'KH' :
                currentPersona === 'karen' ? 'KT' :
                currentPersona === 'sarah' ? 'SM' :
                currentPersona === 'marco' ? 'MR' :
                currentPersona === 'alex' ? 'AC' :
                currentPersona === 'david' ? 'DW' : 'MP'}
            </div>

            {/* User Name */}
            <h3 className="font-semibold text-gray-900 text-base leading-tight">
              {actualBetaUser ? 'Mavro Pro User' :
                currentPersona === 'kemar' ? 'Kemar Hinds' :
                currentPersona === 'karen' ? 'Karen Thompson' :
                currentPersona === 'sarah' ? 'Sarah Martinez' :
                currentPersona === 'marco' ? 'Marco Romano' :
                currentPersona === 'alex' ? 'Alex Chen' :
                currentPersona === 'david' ? 'David Wilson' : 'Mavro Pro User'}
            </h3>

            {/* Business Category Badge */}
            <div className="text-center">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                !isDemoMode && userPersona ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800' :
                currentPersona === 'kemar' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800' :
                currentPersona === 'karen' ? 'bg-blue-100 text-blue-800' :
                currentPersona === 'sarah' ? 'bg-pink-100 text-pink-800' :
                currentPersona === 'marco' ? 'bg-red-100 text-red-800' :
                currentPersona === 'alex' ? 'bg-blue-100 text-blue-800' :
                currentPersona === 'david' ? 'bg-purple-100 text-purple-800' : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'
              }`}>
                {actualBetaUser && userPersona ? userPersona.industry :
                 currentPersona === 'kemar' ? 'Personal Brand' :
                 currentPersona === 'karen' ? 'Real Estate' :
                 currentPersona === 'sarah' ? 'Health & Wellness' :
                 currentPersona === 'marco' ? 'Food & Beverage' :
                 currentPersona === 'alex' ? 'Fitness' :
                 currentPersona === 'david' ? 'Automotive' : 'General'}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {actualBetaUser && userPersona ? 'thought leader' :
                 currentPersona === 'kemar' ? 'thought leader' :
                 currentPersona === 'karen' ? 'real estate agent' :
                 currentPersona === 'sarah' ? 'spa owner' :
                 currentPersona === 'marco' ? 'chef & owner' :
                 currentPersona === 'alex' ? 'fitness coach' :
                 currentPersona === 'david' ? 'auto sales' : 'thought leader'}
              </p>
            </div>
          </div>
          
          {/* Business Profile Section */}
          {actualBetaUser ? (
            // Show actual user business info for beta users in enhanced card
            <div className="mt-4 space-y-3">
              <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {userPersona?.business?.charAt(0) || 'B'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {userPersona?.business || 'My Business'}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {userPersona?.industry || 'General'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Authentication Fix Button */}
              <button
                onClick={() => window.location.reload()}
                className="w-full px-3 py-2 text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg transition-colors flex items-center justify-center space-x-2"
                title="Clear authentication tokens and reload"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Fix Authentication</span>
              </button>
            </div>
          ) : (
            // Show persona selector for demo users
            <div className="mt-4 relative" ref={personaDropdownRef}>
              <button
                onClick={() => setShowPersonaDropdown(!showPersonaDropdown)}
                className="w-full flex items-center justify-center px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors relative"
              >
                <span className="text-gray-600">Select Your Persona</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform absolute right-3 ${showPersonaDropdown ? 'rotate-180' : ''}`} />
              </button>
            
            {showPersonaDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 mb-2 px-2">Available Personas</div>
                  <div className="space-y-1">
                    {[
                      { id: 'kemar', name: 'Kemar Hinds', role: 'Keynote Speaker', business: 'Thought Leadership', color: 'bg-gradient-to-r from-purple-500 to-pink-500', initials: 'KH' },
                      { id: 'karen', name: 'Karen Thompson', role: 'Real Estate Agent', business: 'Premium Properties', color: 'bg-green-500', initials: 'KT' },
                      { id: 'sarah', name: 'Sarah Martinez', role: 'MedSpa Owner', business: 'Glow Wellness', color: 'bg-pink-500', initials: 'SM' },
                      { id: 'marco', name: 'Marco Romano', role: 'Restaurant Owner', business: 'Bella Vista', color: 'bg-red-500', initials: 'MR' },
                      { id: 'alex', name: 'Alex Chen', role: 'Fitness Coach', business: 'Elite Fitness', color: 'bg-blue-500', initials: 'AC' },
                      { id: 'david', name: 'David Wilson', role: 'Auto Dealer', business: 'Wilson Motors', color: 'bg-purple-500', initials: 'DW' }
                    ].map(persona => (
                      <button
                        key={persona.id}
                        onClick={() => {
                          // Show playful loading for persona switching
                          startLoading(`ViVi is switching to ${persona.name}'s persona...`, 2500);
                          
                          setTimeout(() => {
                            setCurrentPersona(persona.id);
                            setShowPersonaDropdown(false);
                            stopLoading();
                            setShowSuccessAnimation(true);
                            setTimeout(() => setShowSuccessAnimation(false), 2000);
                          }, 2500);
                        }}
                        className="w-full flex items-center space-x-3 px-2 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs ${persona.color}`}>
                          {persona.initials}
                        </div>
                        <div className="flex-1 min-w-0 text-center">
                          <p className="text-sm font-medium text-gray-900 truncate">{persona.name}</p>
                          <p className="text-xs text-gray-500 truncate">{persona.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Create Custom Persona Button */}
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <button
                      onClick={() => {
                        setShowPersonaDropdown(false);
                        window.location.href = '/personas';
                      }}
                      className="w-full flex items-center space-x-3 px-2 py-2 text-left hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-100 text-purple-600">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-purple-700">Create Custom Persona</p>
                        <p className="text-xs text-purple-500">Build your own sandbox example</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowPersonaDropdown(false);
                        window.location.href = '/personas?tab=templates';
                      }}
                      className="w-full flex items-center space-x-3 px-2 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-700">Template Library</p>
                        <p className="text-xs text-blue-500">Use pre-built persona templates</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 navigation-menu" data-tooltip-target="navigation-menu">
          {/* Drag Mode Toggle */}
          <div className="mb-4 pb-3 border-b border-gray-100">
            <button
              onClick={() => setIsDragModeEnabled(!isDragModeEnabled)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                isDragModeEnabled
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={isDragModeEnabled ? 'text-purple-600' : 'text-gray-400'}>
                  <circle cx="2" cy="2" r="1" fill="currentColor"/>
                  <circle cx="6" cy="2" r="1" fill="currentColor"/>
                  <circle cx="10" cy="2" r="1" fill="currentColor"/>
                  <circle cx="2" cy="6" r="1" fill="currentColor"/>
                  <circle cx="6" cy="6" r="1" fill="currentColor"/>
                  <circle cx="10" cy="6" r="1" fill="currentColor"/>
                  <circle cx="2" cy="10" r="1" fill="currentColor"/>
                  <circle cx="6" cy="10" r="1" fill="currentColor"/>
                  <circle cx="10" cy="10" r="1" fill="currentColor"/>
                </svg>
                <span className="font-medium">Rearrange Menu</span>
              </div>
              <div className={`w-8 h-4 rounded-full transition-colors ${
                isDragModeEnabled ? 'bg-purple-500' : 'bg-gray-300'
              }`}>
                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
                  isDragModeEnabled ? 'transform translate-x-4 ml-0.5' : 'ml-0.5'
                }`}></div>
              </div>
            </button>
            {isDragModeEnabled && (
              <p className="text-xs text-purple-600 mt-2 px-3">
                Drag and drop menu items to reorder them
              </p>
            )}
          </div>

          <div className="space-y-2">
            {allNavigationItems.map((item) => (
              <div
                key={item.label}
                draggable={isDragModeEnabled}
                onDragStart={isDragModeEnabled ? (e) => handleDragStart(e, item.key) : undefined}
                onDragOver={isDragModeEnabled ? (e) => handleDragOver(e, item.key) : undefined}
                onDragLeave={isDragModeEnabled ? handleDragLeave : undefined}
                onDrop={isDragModeEnabled ? (e) => handleDrop(e, item.key) : undefined}
                onDragEnd={isDragModeEnabled ? handleDragEnd : undefined}
                className={`relative ${isDragModeEnabled ? 'cursor-move' : ''} ${
                  isDragModeEnabled && draggedItem === item.key ? 'opacity-50' : ''
                } ${
                  isDragModeEnabled && draggedOverItem === item.key ? 'border-t-2 border-purple-500' : ''
                }`}
              >
                <button
                  onClick={() => setCurrentView(item.key as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    item.active
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  data-tooltip-target={item.label === 'Settings' ? 'settings-button' : undefined}
                >
                  <div className="flex items-center space-x-3 w-full">
                    {isDragModeEnabled && (
                      <div className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-gray-400 hover:text-gray-600">
                        <svg width="8" height="16" viewBox="0 0 8 16" fill="none">
                          <circle cx="2" cy="2" r="1" fill="currentColor"/>
                          <circle cx="6" cy="2" r="1" fill="currentColor"/>
                          <circle cx="2" cy="8" r="1" fill="currentColor"/>
                          <circle cx="6" cy="8" r="1" fill="currentColor"/>
                          <circle cx="2" cy="14" r="1" fill="currentColor"/>
                          <circle cx="6" cy="14" r="1" fill="currentColor"/>
                        </svg>
                      </div>
                    )}
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </nav>

        {/* Voice Toggle */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={toggleVoice}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              voiceEnabled
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {voiceEnabled ? (
              <>
                <Mic className="w-5 h-5" />
                <span className="text-sm font-medium">ViVi Voice: ON</span>
                <div className="flex items-center space-x-1 ml-auto">
                  <div className="w-1 bg-white rounded-full" style={{ animation: 'waveHeight 1.2s ease-in-out infinite', animationDelay: '0s' }}></div>
                  <div className="w-1 bg-white rounded-full" style={{ animation: 'waveHeight 1.2s ease-in-out infinite', animationDelay: '0.1s' }}></div>
                  <div className="w-1 bg-white rounded-full" style={{ animation: 'waveHeight 1.2s ease-in-out infinite', animationDelay: '0.2s' }}></div>
                  <div className="w-1 bg-white rounded-full" style={{ animation: 'waveHeight 1.2s ease-in-out infinite', animationDelay: '0.3s' }}></div>
                  <div className="w-1 bg-white rounded-full" style={{ animation: 'waveHeight 1.2s ease-in-out infinite', animationDelay: '0.4s' }}></div>
                </div>
              </>
            ) : (
              <>
                <MicOff className="w-5 h-5" />
                <span className="text-sm font-medium">ViVi Voice: OFF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <header className="relative bg-white border-b border-gray-200 shadow-sm main-header" data-tooltip-target="main-header">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-slate-50 opacity-60"></div>
          
          <div className="relative px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Left Side - Title and Description */}
              <div className="flex items-center space-x-5">
                <div className="relative group">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    {currentView === 'dashboard' ? <Home className="w-7 h-7 text-white relative z-10" /> :
                     currentView === 'campaigns' ? <Target className="w-7 h-7 text-white relative z-10" /> :
                     currentView === 'reviews' ? <MessageSquare className="w-7 h-7 text-white relative z-10" /> :
                     currentView === 'crm' ? <UserIcon className="w-7 h-7 text-white relative z-10" /> :
                     currentView === 'foursight' ? <BarChart3 className="w-7 h-7 text-white relative z-10" /> :
                     currentView === 'geosmart' ? <Globe className="w-7 h-7 text-white relative z-10" /> :
                     currentView === 'vivistore' ? <Sparkles className="w-7 h-7 text-white relative z-10" /> :
                     currentView === 'compliance' ? <Check className="w-7 h-7 text-white relative z-10" /> :
                     currentView === 'inventory' ? <Package className="w-7 h-7 text-white relative z-10" /> :
                     currentView === 'settings' ? <Settings className="w-7 h-7 text-white relative z-10" /> : 
                     <Home className="w-7 h-7 text-white relative z-10" />}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
                      {currentView === 'dashboard' ? 'Command Center' :
                       currentView === 'campaigns' ? 'Campaigns' :
                       currentView === 'reviews' ? 'Reviews' :
                       currentView === 'crm' ? 'CRM' :
                       currentView === 'foursight' ? 'FourSIGHT™ Analytics' :
                       currentView === 'geosmart' ? 'GeoSmart™' :
                       currentView === 'vivistore' ? 'ViVi Store' :
                       currentView === 'compliance' ? 'Compliance Center' :
                       currentView === 'inventory' ? 'Inventory Manager' :
                       currentView === 'settings' ? 'Settings' : 'Command Center'}
                    </h1>
                    {currentView === 'dashboard' && (
                      <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-green-700">Live</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm font-medium leading-relaxed max-w-2xl">
                    {currentView === 'dashboard' ? 
                      `Welcome back, ${!isDemoMode && userPersona ? userPersona.name : getPersonaData(currentPersona).firstName}! Here's your marketing at a highlevel.` :
                     currentView === 'campaigns' ? 'Manage your marketing campaigns and track performance across platforms' :
                     currentView === 'reviews' ? 'Monitor and respond to customer reviews across all platforms' :
                     currentView === 'crm' ? 'Manage your customer relationships and contacts efficiently' :
                     currentView === 'foursight' ? 'Advanced analytics and reporting for your marketing efforts' :
                     currentView === 'geosmart' ? 'Geographic intelligence and persona adaptation powered by AI' :
                     currentView === 'vivistore' ? 'Discover and install AI-powered marketing tools for your business' :
                     currentView === 'compliance' ? 'Ensure compliance with industry regulations and requirements' :
                     currentView === 'inventory' ? 'Track and manage your inventory and stock levels' :
                     currentView === 'settings' ? 'Configure your preferences and integrations' : 'Your marketing command center'}
                  </p>
                </div>
              </div>
              
              {/* Right Side - User Info and Actions */}
              <div className="flex items-center space-x-4">
                {/* Status Badge */}
                <div className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  <UserIcon className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-indigo-700 font-semibold">
                    {isDemoMode ? 'Demo Mode' : 'Beta User'}
                  </span>
                </div>
                
                {/* Logout Button */}
                <button 
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    localStorage.removeItem('demoMode');
                    window.location.href = '/auth';
                  }}
                  className="group flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 group-hover:text-gray-900 transition-colors" />
                  <span className="group-hover:text-gray-900 transition-colors">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Render content based on current view */}
          {currentView === 'dashboard' && (
            <>
              {/* ViVi AI Assistant Card or Business Info Display */}
              {!showBusinessInfo ? (
                <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-yellow-500 rounded-xl p-6 text-white vivi-assistant" data-tooltip-target="vivi-assistant">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <ViViLogo size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">ViVi AI Assistant</h3>
                        <p className="text-purple-100">
                          {actualDemoMode ? (
                            // Demo user messaging - industry-specific trending suggestions
                            currentPersona === 'kemar' ? 'I noticed speaking events are trending in your industry. Ready to create a keynote promotion campaign?' :
                            currentPersona === 'karen' ? 'Market trends show increased interest in condos downtown. Want me to create a targeted campaign?' :
                            currentPersona === 'sarah' ? 'Anti-aging treatments are trending this season. Should I create content highlighting your services?' :
                            currentPersona === 'marco' ? 'Farm-to-table dining is gaining popularity. Want me to showcase your authentic Italian ingredients?' :
                            currentPersona === 'alex' ? 'New Year fitness resolutions are peaking. Ready to create a transformation campaign?' :
                            currentPersona === 'david' ? 'Electric vehicle interest is surging. Should I create content about your EV inventory?' : 'I noticed speaking events are trending in your industry. Ready to create a keynote promotion campaign?'
                          ) : actualBetaUser ? (
                            // Beta user messaging - getting started guidance
                            `Welcome to Mavro Pro! I'm ViVi, your AI marketing assistant. Let's start by creating your first campaign to showcase what we can do together.`
                          ) : (
                            'I noticed speaking events are trending in your industry. Ready to create a keynote promotion campaign?'
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <Zap className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <button 
                      onClick={handleViviMagicClick}
                      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {isDemoMode ? (
                          currentPersona === 'kemar' ? 'Create Speaker Content' : 'Let\'s Make Magic'
                        ) : isBetaUser ? (
                          'Create My First Campaign'
                        ) : (
                          'Let\'s Make Magic'
                        )}
                      </span>
                    </button>
                    <button 
                      onClick={handleViviNotNowClick}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200"
                    >
                      <Minimize className="w-4 h-4" />
                      <span>Not Right Now</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-yellow-500 rounded-xl p-6 text-white animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="text-center w-full">
                      <h3 className="text-2xl font-bold animate-slide-up animate-glow">
                        {getPersonaBusinessInfo().business}
                      </h3>
                      <div className="mt-2 flex justify-center">
                        <div className="w-16 h-0.5 bg-white/30 animate-expand"></div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowBusinessInfo(false)}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-105 ml-4"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

          {/* Mode Selector */}
          <div className="flex">
            <button
              onClick={() => setActiveMode('plan')}
              className={`flex-1 p-6 rounded-l-2xl border-2 transition-all duration-300 ${
                activeMode === 'plan'
                  ? 'border-purple-400 bg-purple-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-purple-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  activeMode === 'plan' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">Plan</h4>
                  <p className="text-sm text-gray-500">Schedule content & boost</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveMode('track')}
              className={`flex-1 p-6 border-2 transition-all duration-300 ${
                activeMode === 'track'
                  ? 'border-green-400 bg-green-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-green-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  activeMode === 'track' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">Track</h4>
                  <p className="text-sm text-gray-500">Reminders & History</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveMode('grow')}
              className={`flex-1 p-6 border-2 transition-all duration-300 ${
                activeMode === 'grow'
                  ? 'border-blue-400 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  activeMode === 'grow' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">Grow</h4>
                  <p className="text-sm text-gray-500">FourSIGHT Analytics</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveMode('learn')}
              className={`flex-1 p-6 rounded-r-2xl border-2 transition-all duration-300 ${
                activeMode === 'learn'
                  ? 'border-orange-400 bg-orange-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-orange-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  activeMode === 'learn' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">Learn</h4>
                  <p className="text-sm text-gray-500">GRIO Academy</p>
                </div>
              </div>
            </button>
          </div>

          {/* Plan Mode Content */}
          {activeMode === 'plan' && (
            <>
              {/* Enhanced Plan Tab for All Users */}
              <div className="rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {actualBetaUser ? 'Welcome to Mavro Pro' : 'Plan Tab - GTM Planning System'}
                      </h3>
                      <p className="text-purple-100 text-lg">
                        {actualBetaUser 
                          ? 'Your clean workspace is ready. Start creating your first campaign!' 
                          : 'Access GTM Planning, Mavro Magic Studio™, and Scheduler'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <PlanTab />
                </div>
              </div>
            </>
          )}

          {/* Track Mode Content */}
          {activeMode === 'track' && (
            <div className="rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-8">
                <TrackTab />
              </div>
            </div>
          )}

          {/* Grow Mode Content */}
          {activeMode === 'grow' && (
            <div className="rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-8">
                <GrowTab />
              </div>
            </div>
          )}

          {/* Learn Mode Content */}
          {activeMode === 'learn' && (
            <div className="rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-8">
                <GrioAcademyPage />
              </div>
            </div>
          )}
            </>
          )}

        {/* Other page views */}
        {currentView === 'campaigns' && <CampaignsPage currentPersona={currentPersona} />}
        {currentView === 'magicstudio' && <MagicStudioPage />}
        {currentView === 'reviews' && <ReviewsPage currentPersona={currentPersona} />}
        {currentView === 'crm' && <CRMPage currentPersona={currentPersona} />}
        {currentView === 'foursight' && <ReportsPage />}
        {currentView === 'geosmart' && <GeoSmartDashboard />}
        {currentView === 'vivistore' && <ViViStorePage currentPersona={currentPersona} />}
        {currentView === 'compliance' && <ComplianceCenterPage currentPersona={currentPersona} />}
        {currentView === 'inventory' && <InventoryManagerPage currentPersona={currentPersona} />}
        {currentView === 'settings' && <SettingsPage currentPersona={currentPersona} />}
        {currentView === 'aistudio' && <MavroAIStudio />}
        {currentView === 'betafeedback' && <BetaFeedbackPage />}
        {currentView === 'academy' && <GrioAcademyPage />}

        </main>

      </div>
      </div>



      {/* Beta Testing Features */}
      {actualBetaUser && (
        <>
          <BetaFeedbackSystem />
          <UserRatingFeedback />
        </>
      )}

      {/* PlayfulLoadingMascot for demo transitions */}
      {showPlayfulLoading && (
        <PlayfulLoadingMascot 
          isVisible={showPlayfulLoading}
          loadingText={playfulLoadingText}
          onComplete={() => stopLoading()}
        />
      )}

      {/* ViVi Toast Manager */}
      {actualBetaUser && (
        <ToastManager 
          toasts={toasts}
          onToastClose={hideToast}
          onToastAction={handleToastAction}
        />
      )}

      {/* ViVi AI Chat Widget - Available for all users */}
      <ViViChatWidget />
      
      {/* ViVi Notification Panel */}
      <ViViNotificationPanel />
    </DashboardTransition>
  );
}
