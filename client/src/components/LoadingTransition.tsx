import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Target, Users } from 'lucide-react';

interface LoadingTransitionProps {
  onComplete: () => void;
  userFirstName?: string;
  duration?: number; // in milliseconds
}

export default function LoadingTransition({ 
  onComplete, 
  userFirstName = "User", 
  duration = 6000 
}: LoadingTransitionProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { icon: Sparkles, text: "Initializing ViVi AI...", delay: 0 },
    { icon: Users, text: "Loading your workspace...", delay: 1500 },
    { icon: TrendingUp, text: "Syncing analytics data...", delay: 3000 },
    { icon: Target, text: "Preparing your dashboard...", delay: 4500 }
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / (duration / 50)); // Update every 50ms
      });
    }, 50);

    // Step animations
    loadingSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, step.delay);
    });

    // Complete loading
    const timer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [duration, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-8 animate-pulse">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {userFirstName}!
        </h1>
        <p className="text-purple-200 mb-8">
          Setting up your Mavro Pro workspace...
        </p>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-purple-200 text-sm">{Math.round(progress)}% Complete</p>
        </div>

        {/* Loading Steps */}
        <div className="space-y-4">
          {loadingSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div 
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                  isActive 
                    ? 'bg-white/10 backdrop-blur-lg transform scale-105' 
                    : 'bg-white/5 opacity-50'
                }`}
              >
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500/20 text-green-400' 
                    : isActive 
                      ? 'bg-purple-500/20 text-purple-400 animate-pulse' 
                      : 'bg-gray-500/20 text-gray-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-sm transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-purple-300'
                }`}>
                  {step.text}
                </span>
                {isActive && !isCompleted && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {isCompleted && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Loading Tips */}
        <div className="mt-8 p-4 bg-white/5 backdrop-blur-lg rounded-lg">
          <p className="text-purple-200 text-xs">
            💡 <strong>Pro Tip:</strong> Use voice commands with ViVi AI for faster content creation
          </p>
        </div>
      </div>
    </div>
  );
}