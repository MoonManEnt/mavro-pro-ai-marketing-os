import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Lightbulb, Target, Zap, Users, BarChart3, Settings, Play, Pause, RotateCcw } from 'lucide-react';

interface SmartOnboardingTooltipsProps {
  currentPersona: string;
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ElementType;
  personaSpecific?: boolean;
  content?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const SmartOnboardingTooltips: React.FC<SmartOnboardingTooltipsProps> = ({
  currentPersona,
  isActive,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getPersonaSteps = (): OnboardingStep[] => {
    const baseSteps: OnboardingStep[] = [
      {
        id: 'welcome',
        title: 'Welcome to Mavro Pro!',
        description: 'Let me show you around the most powerful marketing platform designed for your success.',
        target: 'main-header',
        position: 'bottom',
        icon: Target,
        content: (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              This quick tour will help you get started with the key features that matter most to your business.
            </p>
            <div className="bg-blue-50 p-2 rounded-lg">
              <p className="text-xs text-blue-700">
                💡 Tip: You can pause this tour at any time or skip to specific sections.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'vivi_assistant',
        title: 'Meet ViVi, Your AI Assistant',
        description: 'Your personal AI marketing assistant that understands your business and helps you create engaging content.',
        target: 'vivi-assistant',
        position: 'right',
        icon: Zap,
        content: (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              ViVi learns from your industry and adapts to your style, providing personalized suggestions and insights.
            </p>
            <div className="bg-purple-50 p-2 rounded-lg">
              <p className="text-xs text-purple-700">
                🎯 Try asking ViVi: "What's trending in my industry?"
              </p>
            </div>
          </div>
        ),
        action: {
          label: 'Chat with ViVi',
          onClick: () => {
            const viviButton = document.querySelector('.vivi-assistant button');
            if (viviButton) (viviButton as HTMLElement).click();
          }
        }
      },
      {
        id: 'content_creation',
        title: 'Create Powerful Content',
        description: 'Use our AI-powered content wizard to create posts that resonate with your audience.',
        target: 'content-creation',
        position: 'left',
        icon: Lightbulb,
        content: (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Upload media, select platforms, and let AI help you craft the perfect message for each audience.
            </p>
            <div className="bg-green-50 p-2 rounded-lg">
              <p className="text-xs text-green-700">
                ✨ AI suggests hashtags, captions, and optimal posting times
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'analytics',
        title: 'Track Your Performance',
        description: 'Monitor your marketing success with real-time analytics and insights.',
        target: 'analytics-section',
        position: 'top',
        icon: BarChart3,
        content: (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              See which content performs best and optimize your strategy based on data-driven insights.
            </p>
            <div className="bg-indigo-50 p-2 rounded-lg">
              <p className="text-xs text-indigo-700">
                📊 Track engagement, reach, and conversion metrics
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'navigation',
        title: 'Explore All Features',
        description: 'Navigate between different sections to manage campaigns, reviews, CRM, and more.',
        target: 'navigation-menu',
        position: 'right',
        icon: Users,
        content: (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Each section is tailored to your business type with industry-specific tools and insights.
            </p>
            <div className="bg-orange-50 p-2 rounded-lg">
              <p className="text-xs text-orange-700">
                🔧 Specialized tools unlock based on your business needs
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'settings',
        title: 'Customize Your Experience',
        description: 'Personalize your dashboard and connect your social media accounts.',
        target: 'settings-button',
        position: 'left',
        icon: Settings,
        content: (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Connect your social accounts, set up notifications, and customize your workspace.
            </p>
            <div className="bg-red-50 p-2 rounded-lg">
              <p className="text-xs text-red-700">
                ⚙️ Don't forget to connect your social media accounts!
              </p>
            </div>
          </div>
        )
      }
    ];

    // Add persona-specific steps
    const personaSteps = {
      kemar: [
        {
          id: 'speaking_opportunities',
          title: 'Speaking Opportunities',
          description: 'Discover trending topics and event opportunities in the speaking industry.',
          target: 'analytics-section',
          position: 'bottom' as const,
          icon: Target,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Stay ahead of industry trends and find speaking opportunities that match your expertise.
              </p>
              <div className="bg-purple-50 p-2 rounded-lg">
                <p className="text-xs text-purple-700">
                  🎤 AI tracks speaking industry trends and suggests relevant topics
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'thought_leadership',
          title: 'Build Thought Leadership',
          description: 'Create content that positions you as an authority in your field.',
          target: 'content-creation',
          position: 'right' as const,
          icon: Lightbulb,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Share insights, case studies, and motivational content that resonates with your audience.
              </p>
              <div className="bg-gold-50 p-2 rounded-lg">
                <p className="text-xs text-yellow-700">
                  💡 Focus on leadership, motivation, and industry insights
                </p>
              </div>
            </div>
          )
        }
      ],
      karen: [
        {
          id: 'market_insights',
          title: 'Real Estate Market Insights',
          description: 'Stay updated on local market trends and property opportunities.',
          target: 'analytics-section',
          position: 'bottom' as const,
          icon: BarChart3,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Get real-time market data and insights to better serve your clients and grow your business.
              </p>
              <div className="bg-green-50 p-2 rounded-lg">
                <p className="text-xs text-green-700">
                  🏠 Track property values, market trends, and buyer behavior
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'lead_generation',
          title: 'Lead Generation Tools',
          description: 'Convert social media followers into qualified real estate leads.',
          target: 'vivi-assistant',
          position: 'left' as const,
          icon: Users,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Use targeted content and smart engagement to attract potential buyers and sellers.
              </p>
              <div className="bg-blue-50 p-2 rounded-lg">
                <p className="text-xs text-blue-700">
                  💼 Showcase listings, share market updates, and build trust
                </p>
              </div>
            </div>
          )
        }
      ],
      sarah: [
        {
          id: 'treatment_showcase',
          title: 'Showcase Your Treatments',
          description: 'Create compelling before/after content that attracts new clients.',
          target: 'content-creation',
          position: 'top' as const,
          icon: Zap,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Highlight your expertise with professional treatment results and wellness content.
              </p>
              <div className="bg-pink-50 p-2 rounded-lg">
                <p className="text-xs text-pink-700">
                  ✨ Focus on transformation stories and wellness education
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'client_testimonials',
          title: 'Client Success Stories',
          description: 'Share testimonials and reviews to build trust and credibility.',
          target: 'analytics-section',
          position: 'right' as const,
          icon: Users,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Let satisfied clients tell your story and attract new business through authentic testimonials.
              </p>
              <div className="bg-orange-50 p-2 rounded-lg">
                <p className="text-xs text-orange-700">
                  💬 Video testimonials have 2x higher engagement rates
                </p>
              </div>
            </div>
          )
        }
      ],
      marco: [
        {
          id: 'food_photography',
          title: 'Food Photography Tips',
          description: 'Create mouth-watering content that brings customers to your restaurant.',
          target: 'content-creation',
          position: 'bottom' as const,
          icon: Lightbulb,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Learn techniques to make your dishes look irresistible and drive restaurant traffic.
              </p>
              <div className="bg-red-50 p-2 rounded-lg">
                <p className="text-xs text-red-700">
                  🍕 Great food photography can increase orders by 30%
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'seasonal_promotions',
          title: 'Seasonal Promotions',
          description: 'Create timely campaigns that capitalize on seasonal trends and holidays.',
          target: 'vivi-assistant',
          position: 'left' as const,
          icon: Target,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Plan ahead with seasonal menus, holiday specials, and event-based promotions.
              </p>
              <div className="bg-yellow-50 p-2 rounded-lg">
                <p className="text-xs text-yellow-700">
                  📅 Plan campaigns 2-3 weeks ahead for best results
                </p>
              </div>
            </div>
          )
        }
      ],
      alex: [
        {
          id: 'workout_content',
          title: 'Workout Content Creation',
          description: 'Share effective workout routines and fitness tips to inspire your audience.',
          target: 'content-creation',
          position: 'top' as const,
          icon: Zap,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Create engaging workout videos, nutrition tips, and transformation stories.
              </p>
              <div className="bg-blue-50 p-2 rounded-lg">
                <p className="text-xs text-blue-700">
                  💪 Short workout videos get 3x more engagement
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'client_transformations',
          title: 'Client Transformations',
          description: 'Showcase amazing client results to attract new members to your gym.',
          target: 'analytics-section',
          position: 'right' as const,
          icon: Users,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Share inspiring transformation stories that motivate others to start their fitness journey.
              </p>
              <div className="bg-green-50 p-2 rounded-lg">
                <p className="text-xs text-green-700">
                  🏆 Always get permission before sharing client results
                </p>
              </div>
            </div>
          )
        }
      ],
      david: [
        {
          id: 'vehicle_showcases',
          title: 'Vehicle Showcases',
          description: 'Create compelling content that highlights your vehicle inventory.',
          target: 'content-creation',
          position: 'bottom' as const,
          icon: Target,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Showcase vehicles with professional photography and detailed feature highlights.
              </p>
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-700">
                  🚗 Interior and exterior shots increase interest by 40%
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'customer_reviews',
          title: 'Customer Reviews',
          description: 'Build trust through authentic customer testimonials and reviews.',
          target: 'analytics-section',
          position: 'left' as const,
          icon: Users,
          personaSpecific: true,
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Happy customers are your best salespeople. Share their stories and build credibility.
              </p>
              <div className="bg-purple-50 p-2 rounded-lg">
                <p className="text-xs text-purple-700">
                  ⭐ 85% of buyers read reviews before making a purchase
                </p>
              </div>
            </div>
          )
        }
      ]
    };

    const currentPersonaSteps = personaSteps[currentPersona as keyof typeof personaSteps] || [];
    return [...baseSteps, ...currentPersonaSteps];
  };

  const steps = getPersonaSteps();

  // Smooth navigation to target elements
  const navigateToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setIsTransitioning(true);
      const targetSelector = steps[stepIndex].target;
      
      // Try multiple ways to find the target element
      let targetElement = document.querySelector(targetSelector);
      
      if (!targetElement) {
        // Try with data-tooltip-target attribute
        targetElement = document.querySelector(`[data-tooltip-target="${targetSelector.replace('.', '')}"]`);
      }
      
      if (!targetElement) {
        // Try with class name
        targetElement = document.querySelector(targetSelector);
      }
      
      if (targetElement) {
        // Smooth scroll with enhanced easing
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });
        
        // Add highlight effect to the target element
        targetElement.classList.add('onboarding-highlight');
        setTimeout(() => {
          targetElement.classList.remove('onboarding-highlight');
          setIsTransitioning(false);
        }, 1000);
      } else {
        console.warn(`Target element not found: ${targetSelector}`);
        setIsTransitioning(false);
      }
    }
  };

  // Auto-start on login and smooth progression
  useEffect(() => {
    if (isActive && steps.length > 0) {
      setCurrentStep(0);
      navigateToStep(0);
      
      // Auto-start the tour
      if (isPlaying) {
        intervalRef.current = setInterval(() => {
          setCurrentStep(prev => {
            if (prev >= steps.length - 1) {
              setIsPlaying(false);
              return prev;
            }
            const nextStep = prev + 1;
            navigateToStep(nextStep);
            return nextStep;
          });
        }, 8000); // Auto-advance every 8 seconds
      }
    }
  }, [isActive, isPlaying, steps.length]);

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Update tooltip position when step changes
  useEffect(() => {
    if (isActive) {
      updateTooltipPosition();
    }
  }, [currentStep, isActive]);

  const updateTooltipPosition = () => {
    const currentStepData = steps[currentStep];
    if (!currentStepData) return;

    const targetElement = document.querySelector(currentStepData.target);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      let x = rect.left + scrollLeft;
      let y = rect.top + scrollTop;
      
      // Adjust position based on tooltip position
      switch (currentStepData.position) {
        case 'top':
          x += rect.width / 2;
          y -= 20;
          break;
        case 'bottom':
          x += rect.width / 2;
          y += rect.height + 20;
          break;
        case 'left':
          x -= 20;
          y += rect.height / 2;
          break;
        case 'right':
          x += rect.width + 20;
          y += rect.height / 2;
          break;
      }
      
      setTooltipPosition({ x, y });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setCompletedSteps(prev => new Set(prev).add(steps[currentStep].id));
      navigateToStep(nextStep);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      navigateToStep(prevStep);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setIsPlaying(false);
    navigateToStep(stepIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentStepData = steps[currentStep];

  if (!isActive || !currentStepData) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Spotlight effect */}
      <div 
        className="absolute bg-white rounded-lg shadow-2xl pointer-events-none"
        style={{
          left: tooltipPosition.x - 150,
          top: tooltipPosition.y - 150,
          width: 300,
          height: 300,
          clipPath: 'circle(50px at 50% 50%)',
          zIndex: 51
        }}
      />

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="absolute bg-white rounded-xl shadow-2xl border border-gray-200 pointer-events-auto max-w-sm"
          style={{
            left: Math.min(tooltipPosition.x, window.innerWidth - 400),
            top: Math.min(tooltipPosition.y, window.innerHeight - 200),
            zIndex: 52
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <currentStepData.icon className="w-5 h-5" />
                <h3 className="font-semibold">{currentStepData.title}</h3>
              </div>
              <button
                onClick={onSkip}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <p className="text-gray-700">{currentStepData.description}</p>
            
            {currentStepData.content && (
              <div>{currentStepData.content}</div>
            )}
            
            {currentStepData.action && (
              <button
                onClick={currentStepData.action.onClick}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
              >
                {currentStepData.action.label}
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <button
                  onClick={togglePlayPause}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => setCurrentStep(0)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {currentStep + 1} / {steps.length}
                </span>
                <button
                  onClick={handleNext}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
            
            {/* Progress indicators */}
            <div className="flex space-x-1 mt-3">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    index === currentStep 
                      ? 'bg-purple-500' 
                      : index < currentStep 
                        ? 'bg-green-500' 
                        : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SmartOnboardingTooltips;