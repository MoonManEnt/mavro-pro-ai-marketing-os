import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Star, Heart, TrendingUp, Target, Award, Rocket } from 'lucide-react';

interface PersonalizedInteractionAnimationsProps {
  currentPersona: string;
  interactionType: 'hover' | 'click' | 'success' | 'engagement' | 'achievement';
  trigger: boolean;
  onComplete?: () => void;
}

const PersonalizedInteractionAnimations: React.FC<PersonalizedInteractionAnimationsProps> = ({
  currentPersona,
  interactionType,
  trigger,
  onComplete
}) => {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (trigger) {
      setIsActive(true);
      generateParticles();
      
      const timer = setTimeout(() => {
        setIsActive(false);
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  const generateParticles = () => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);
  };

  const getPersonaAnimation = () => {
    const animations = {
      kemar: {
        primary: '#8B5CF6',
        secondary: '#A78BFA',
        icon: Award,
        pattern: 'leadership'
      },
      karen: {
        primary: '#10B981',
        secondary: '#34D399',
        icon: Target,
        pattern: 'growth'
      },
      sarah: {
        primary: '#F59E0B',
        secondary: '#FBB042',
        icon: Heart,
        pattern: 'wellness'
      },
      marco: {
        primary: '#EF4444',
        secondary: '#F87171',
        icon: Star,
        pattern: 'culinary'
      },
      alex: {
        primary: '#3B82F6',
        secondary: '#60A5FA',
        icon: TrendingUp,
        pattern: 'fitness'
      },
      david: {
        primary: '#6B7280',
        secondary: '#9CA3AF',
        icon: Rocket,
        pattern: 'automotive'
      }
    };

    return animations[currentPersona as keyof typeof animations] || animations.kemar;
  };

  const getInteractionEffect = () => {
    switch (interactionType) {
      case 'hover':
        return {
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
          duration: 0.3
        };
      case 'click':
        return {
          scale: [1, 0.95, 1.1, 1],
          rotate: [0, -5, 5, 0],
          duration: 0.4
        };
      case 'success':
        return {
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          duration: 0.6
        };
      case 'engagement':
        return {
          scale: [1, 1.1, 1.05],
          y: [0, -10, 0],
          duration: 0.5
        };
      case 'achievement':
        return {
          scale: [1, 1.3, 1.1],
          rotate: [0, 720],
          duration: 0.8
        };
      default:
        return {
          scale: [1, 1.05, 1],
          duration: 0.3
        };
    }
  };

  const persona = getPersonaAnimation();
  const effect = getInteractionEffect();
  const IconComponent = persona.icon;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Central Icon Animation */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: effect.scale,
              rotate: effect.rotate,
              y: effect.y || 0,
              opacity: [0, 1, 1, 0]
            }}
            transition={{ duration: effect.duration, ease: "easeInOut" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: `linear-gradient(45deg, ${persona.primary}, ${persona.secondary})`
              }}
            >
              <IconComponent className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Particle Effects */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: persona.primary
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -50, -100],
                x: [0, Math.random() * 40 - 20, Math.random() * 80 - 40]
              }}
              transition={{
                duration: 1.5,
                delay: particle.delay,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Ripple Effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{ borderColor: persona.primary }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{
              scale: [0, 3, 5],
              opacity: [0.8, 0.3, 0]
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Secondary Ripple */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{ borderColor: persona.secondary }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{
              scale: [0, 2, 4],
              opacity: [0.6, 0.2, 0]
            }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          />

          {/* Success Message for Achievements */}
          {interactionType === 'achievement' && (
            <motion.div
              className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white rounded-lg px-6 py-3 shadow-xl border-2" style={{ borderColor: persona.primary }}>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" style={{ color: persona.primary }} />
                  <span className="font-semibold text-gray-900">Achievement Unlocked!</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Engagement Feedback */}
          {interactionType === 'engagement' && (
            <motion.div
              className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: persona.primary }} />
                  <span className="text-sm font-medium text-gray-700">Engagement +1</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PersonalizedInteractionAnimations;