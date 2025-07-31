import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Heart, Star, Rocket, Wand2 } from 'lucide-react';

interface PlayfulLoadingMascotProps {
  isVisible: boolean;
  loadingText?: string;
  mascotType?: 'vivi' | 'mavro' | 'assistant';
  size?: 'small' | 'medium' | 'large';
  onComplete?: () => void;
  duration?: number; // in milliseconds
}

export const PlayfulLoadingMascot: React.FC<PlayfulLoadingMascotProps> = ({
  isVisible,
  loadingText = "ViVi is working her magic...",
  mascotType = 'vivi',
  size = 'medium',
  onComplete,
  duration = 3000
}) => {
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [dots, setDots] = useState('');
  const [sparklePositions, setSparklePositions] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  // Animation sequences for different mascots
  const animations = {
    vivi: [
      { emoji: '🎭', text: 'Analyzing your audience...' },
      { emoji: '✨', text: 'Crafting perfect content...' },
      { emoji: '🚀', text: 'Optimizing for engagement...' },
      { emoji: '💫', text: 'Almost ready!' }
    ],
    mavro: [
      { emoji: '🎯', text: 'Planning your strategy...' },
      { emoji: '📊', text: 'Crunching the numbers...' },
      { emoji: '🔥', text: 'Igniting your campaigns...' },
      { emoji: '⭐', text: 'Success incoming!' }
    ],
    assistant: [
      { emoji: '🤖', text: 'Processing request...' },
      { emoji: '⚡', text: 'Applying AI magic...' },
      { emoji: '🎨', text: 'Creating something amazing...' },
      { emoji: '🎉', text: 'Ready to go!' }
    ]
  };

  const sizeClasses = {
    small: { container: 'w-32 h-32', emoji: 'text-3xl', text: 'text-sm' },
    medium: { container: 'w-48 h-48', emoji: 'text-5xl', text: 'text-base' },
    large: { container: 'w-64 h-64', emoji: 'text-7xl', text: 'text-lg' }
  };

  // Animated dots effect
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Animation sequence timer
  useEffect(() => {
    if (!isVisible) return;

    const animationInterval = setInterval(() => {
      setCurrentAnimation(prev => 
        prev >= animations[mascotType].length - 1 ? 0 : prev + 1
      );
    }, duration / animations[mascotType].length);

    return () => clearInterval(animationInterval);
  }, [isVisible, mascotType, duration]);

  // Sparkle positions generator
  useEffect(() => {
    if (!isVisible) return;

    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.2
      }));
      setSparklePositions(newSparkles);
    };

    generateSparkles();
    const sparkleInterval = setInterval(generateSparkles, 2000);

    return () => clearInterval(sparkleInterval);
  }, [isVisible]);

  // Auto-complete timer
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onComplete]);

  if (!isVisible) return null;

  const currentAnimationData = animations[mascotType][currentAnimation];
  const classes = sizeClasses[size];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-[100]">
      {/* Animated Background Sparkles */}
      {sparklePositions.map((position, index) => (
        <div
          key={index}
          className="absolute pointer-events-none"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            animation: `sparkle 2s ease-in-out infinite ${position.delay}s`
          }}
        >
          <Sparkles className="w-4 h-4 text-purple-400 opacity-60" />
        </div>
      ))}

      {/* Main Mascot Container */}
      <div className="relative">
        {/* Mascot Circle with Glow Effect */}
        <div className={`${classes.container} relative flex items-center justify-center mx-auto mb-6`}>
          {/* Rotating Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 animate-spin-slow"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-pulse"></div>
          
          {/* Mascot Avatar */}
          <div className="relative z-10 flex items-center justify-center bg-white rounded-full shadow-2xl p-4 animate-bounce-gentle">
            {mascotType === 'vivi' && (
              <div className="flex flex-col items-center">
                <div className={`${classes.emoji} animate-pulse-gentle`}>
                  {currentAnimationData.emoji}
                </div>
                <div className="flex items-center mt-2">
                  <Heart className="w-3 h-3 text-pink-500 mr-1 animate-pulse" />
                  <span className="text-xs font-medium text-purple-600">ViVi</span>
                  <Wand2 className="w-3 h-3 text-purple-500 ml-1 animate-bounce" />
                </div>
              </div>
            )}
            
            {mascotType === 'mavro' && (
              <div className="flex flex-col items-center">
                <div className={`${classes.emoji} animate-pulse-gentle`}>
                  {currentAnimationData.emoji}
                </div>
                <div className="flex items-center mt-2">
                  <Star className="w-3 h-3 text-yellow-500 mr-1 animate-spin-slow" />
                  <span className="text-xs font-medium text-blue-600">Mavro</span>
                  <Rocket className="w-3 h-3 text-blue-500 ml-1 animate-bounce" />
                </div>
              </div>
            )}
            
            {mascotType === 'assistant' && (
              <div className="flex flex-col items-center">
                <div className={`${classes.emoji} animate-pulse-gentle`}>
                  {currentAnimationData.emoji}
                </div>
                <div className="flex items-center mt-2">
                  <Zap className="w-3 h-3 text-yellow-500 mr-1 animate-pulse" />
                  <span className="text-xs font-medium text-gray-600">AI</span>
                  <Sparkles className="w-3 h-3 text-purple-500 ml-1 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h3 className={`${classes.text} font-semibold text-white mb-2 animate-fade-in`}>
            {currentAnimationData.text}
          </h3>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-gray-300 text-sm">{loadingText}</span>
            <span className="text-purple-400 font-bold text-sm min-w-[1rem]">
              {dots}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-48 h-2 bg-gray-700 rounded-full mt-4 mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-progress"
              style={{ 
                animation: `progress ${duration}ms linear forwards` 
              }}
            ></div>
          </div>
        </div>

        {/* Floating Action Icons */}
        <div className="absolute -top-4 -left-4 animate-float-1">
          <Heart className="w-6 h-6 text-pink-400 opacity-70" />
        </div>
        <div className="absolute -top-2 -right-6 animate-float-2">
          <Star className="w-5 h-5 text-yellow-400 opacity-70" />
        </div>
        <div className="absolute -bottom-4 -left-2 animate-float-3">
          <Zap className="w-4 h-4 text-blue-400 opacity-70" />
        </div>
        <div className="absolute -bottom-2 -right-4 animate-float-1">
          <Sparkles className="w-5 h-5 text-purple-400 opacity-70" />
        </div>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(120deg); }
          66% { transform: translateY(4px) rotate(240deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(180deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(90deg); }
          75% { transform: translateY(6px) rotate(270deg); }
        }
        
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 1.5s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-float-1 { animation: float-1 4s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 3s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 5s ease-in-out infinite; }
        .animate-progress { animation: progress linear forwards; }
      `}</style>
    </div>
  );
};

export default PlayfulLoadingMascot;