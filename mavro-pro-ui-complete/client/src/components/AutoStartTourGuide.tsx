import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Play, Sparkles, Target, Users, BarChart3, Settings, Globe, MessageCircle } from 'lucide-react';

interface AutoStartTourGuideProps {
  isVisible: boolean;
  onClose: () => void;
  onStartTour: () => void;
  currentPersona: string;
}

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  highlight: boolean;
}

export default function AutoStartTourGuide({ isVisible, onClose, onStartTour, currentPersona }: AutoStartTourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const tourSteps: TourStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Mavro Pro',
      description: 'Your AI-powered marketing operating system that thinks, creates, and grows like a CMO.',
      icon: Sparkles,
      target: 'main-dashboard',
      position: 'bottom',
      highlight: true
    },
    {
      id: 'personas',
      title: 'Switch Between Personas',
      description: 'Explore different business personas to see how Mavro Pro adapts to various industries.',
      icon: Users,
      target: 'persona-selector',
      position: 'bottom',
      highlight: true
    },
    {
      id: 'campaigns',
      title: 'Campaign Management',
      description: 'Create, manage, and optimize marketing campaigns across all platforms.',
      icon: Target,
      target: 'campaigns-nav',
      position: 'right',
      highlight: true
    },
    {
      id: 'analytics',
      title: 'FourSIGHT™ Analytics',
      description: 'Advanced analytics and insights to track your marketing performance.',
      icon: BarChart3,
      target: 'foursight-nav',
      position: 'right',
      highlight: true
    },
    {
      id: 'geosmart',
      title: 'GeoSmart Intelligence',
      description: 'Geographic performance analytics and location-based marketing insights.',
      icon: Globe,
      target: 'geosmart-nav',
      position: 'right',
      highlight: true
    },
    {
      id: 'ai-assistant',
      title: 'ViVi AI Assistant',
      description: 'Your intelligent marketing assistant that provides contextual help and suggestions.',
      icon: MessageCircle,
      target: 'vivi-assistant',
      position: 'left',
      highlight: true
    }
  ];

  const getPersonaWelcome = () => {
    const welcomeMessages = {
      kemar: "Welcome, Kemar! Let's explore how Mavro Pro can elevate your speaking business.",
      karen: "Welcome, Karen! Discover how Mavro Pro can transform your real estate marketing.",
      sarah: "Welcome, Sarah! See how Mavro Pro can grow your MedSpa business.",
      marco: "Welcome, Marco! Learn how Mavro Pro can boost your restaurant's success.",
      alex: "Welcome, Alex! Explore how Mavro Pro can expand your fitness coaching.",
      david: "Welcome, David! Discover how Mavro Pro can accelerate your auto sales."
    };
    return welcomeMessages[currentPersona as keyof typeof welcomeMessages] || welcomeMessages.kemar;
  };

  const handleStartTour = () => {
    setIsActive(true);
    setCurrentStep(0);
    onStartTour();
  };

  const handleNextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCompletedSteps([...completedSteps, tourSteps[currentStep].id]);
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteTour();
    }
  };

  const handleCompleteTour = () => {
    setIsActive(false);
    setCompletedSteps([...completedSteps, tourSteps[currentStep].id]);
    onClose();
  };

  const handleSkipTour = () => {
    setIsActive(false);
    onClose();
  };

  // Auto-start tour on first visit
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('mavro-tour-completed');
    if (!hasSeenTour && isVisible) {
      // Auto-start after 2 seconds
      setTimeout(() => {
        handleStartTour();
      }, 2000);
    }
  }, [isVisible]);

  if (!isVisible && !isActive) return null;

  return (
    <>
      {/* Welcome Modal */}
      {isVisible && !isActive && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {getPersonaWelcome()}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Take a guided tour to discover all the powerful features that will transform your marketing strategy.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleSkipTour}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Skip Tour
                </button>
                <button
                  onClick={handleStartTour}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tour Step Overlay */}
      {isActive && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
          <div className="absolute inset-0 pointer-events-none">
            {/* Highlight target element */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="tour-highlight"></div>
            </div>
          </div>
          
          {/* Tour Step Card */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  {React.createElement(tourSteps[currentStep].icon, { className: "w-5 h-5 text-white" })}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{tourSteps[currentStep].title}</h3>
                  <p className="text-sm text-gray-500">Step {currentStep + 1} of {tourSteps.length}</p>
                </div>
              </div>
              <button
                onClick={handleSkipTour}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              {tourSteps[currentStep].description}
            </p>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Progress</span>
                <span>{Math.round(((currentStep + 1) / tourSteps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handleSkipTour}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Skip Tour
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
              >
                <span>{currentStep === tourSteps.length - 1 ? 'Complete' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}