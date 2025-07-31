import { useState, useEffect } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { X, ArrowRight, ArrowLeft, Sparkles, Target, BarChart3 } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ReactNode;
}

interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function TourGuide({ isOpen, onClose, onComplete }: TourGuideProps) {
  const { profile } = useProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tourSteps: TourStep[] = [
    {
      id: 'welcome',
      title: `Welcome to Mavro Plus, ${profile?.name}!`,
      description: `I'm ViVi, your AI marketing assistant. I'll help you create, schedule, and optimize campaigns for ${profile?.businessName}. Let me show you around!`,
      target: 'welcome',
      position: 'bottom',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 'persona',
      title: 'Your Business Persona',
      description: `I've loaded your ${profile?.industry} profile with sample campaigns, leads, and analytics. You can switch between different business types anytime.`,
      target: 'persona-selector',
      position: 'bottom',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 'modes',
      title: 'Three Powerful Modes',
      description: 'Plan Mode for content creation, Track Mode for analytics, and Grow Mode for advanced campaigns. Each mode has specialized tools.',
      target: 'mode-tabs',
      position: 'bottom',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'vivi-chat',
      title: 'Chat with ViVi',
      description: 'Ask me anything! I can create content, analyze performance, suggest improvements, and even predict campaign outcomes.',
      target: 'vivi-chat',
      position: 'left',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 'content-wizard',
      title: 'Mavro Magic Composer',
      description: 'Create posts, reels, emails, and ads with AI. I understand your industry and can match trending content to your brand.',
      target: 'content-wizard',
      position: 'top',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 'scheduler',
      title: 'Visual Scheduler',
      description: 'Drag and drop your content onto the calendar. I can auto-schedule at optimal times for your audience.',
      target: 'scheduler',
      position: 'top',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'analytics',
      title: 'FourSIGHT Dashboard',
      description: 'Track performance, ROI, and get predictions. I can forecast customer churn and suggest retention campaigns.',
      target: 'analytics',
      position: 'top',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'complete',
      title: 'Ready to Create Magic!',
      description: `Perfect! Your ${profile?.industry} workspace is ready. Let's create some amazing content and grow ${profile?.businessName} together!`,
      target: 'complete',
      position: 'bottom',
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  const currentTourStep = tourSteps[currentStep];

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const skipTour = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Tour Modal */}
      <div className={`relative mavro-modal-content max-w-lg w-full mx-4 transition-all duration-300 ${
        isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              {currentTourStep.icon}
            </div>
            <div>
              <h3 className="mavro-heading text-lg">{currentTourStep.title}</h3>
              <div className="text-sm mavro-text-muted">
                Step {currentStep + 1} of {tourSteps.length}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mavro-btn mavro-btn-ghost p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mavro-text-muted mb-2">
            <span>Tour Progress</span>
            <span>{Math.round(((currentStep + 1) / tourSteps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <p className="mavro-text leading-relaxed">
            {currentTourStep.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="mavro-btn mavro-btn-ghost flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={skipTour}
              className="mavro-btn mavro-btn-ghost text-sm"
            >
              Skip Tour
            </button>
          </div>
          
          <button
            onClick={nextStep}
            className="mavro-btn mavro-btn-primary flex items-center space-x-2"
          >
            <span>
              {currentStep === tourSteps.length - 1 ? "Let's Start!" : "Next"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {tourSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentStep 
                  ? 'bg-pink-500 w-6' 
                  : index < currentStep 
                    ? 'bg-pink-500/50' 
                    : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}