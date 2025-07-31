import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, TrendingUp, Award, Target, Star } from 'lucide-react';

interface AdvancedMicroAnimationsProps {
  children: React.ReactNode;
  triggerAnimation?: boolean;
  animationType?: 'hover' | 'click' | 'success' | 'engagement' | 'achievement';
  currentPersona?: string;
}

export default function AdvancedMicroAnimations({ 
  children, 
  triggerAnimation = false, 
  animationType = 'hover',
  currentPersona = 'kemar'
}: AdvancedMicroAnimationsProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (triggerAnimation) {
      setIsAnimating(true);
      setShowParticles(true);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setShowParticles(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [triggerAnimation]);

  const getPersonaColors = () => {
    const colors = {
      kemar: { primary: '#8B5CF6', secondary: '#A78BFA', accent: '#C4B5FD' },
      karen: { primary: '#3B82F6', secondary: '#60A5FA', accent: '#93C5FD' },
      sarah: { primary: '#EC4899', secondary: '#F472B6', accent: '#F9A8D4' },
      marco: { primary: '#F59E0B', secondary: '#FBBF24', accent: '#FCD34D' },
      alex: { primary: '#10B981', secondary: '#34D399', accent: '#6EE7B7' },
      david: { primary: '#EF4444', secondary: '#F87171', accent: '#FCA5A5' }
    };
    return colors[currentPersona as keyof typeof colors] || colors.kemar;
  };

  const getAnimationIcon = () => {
    switch (animationType) {
      case 'success': return <Award className="w-6 h-6" />;
      case 'engagement': return <TrendingUp className="w-6 h-6" />;
      case 'achievement': return <Star className="w-6 h-6" />;
      case 'click': return <Zap className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const colors = getPersonaColors();

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
      
      {/* Animated Particles */}
      <AnimatePresence>
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  color: i % 2 === 0 ? colors.primary : colors.secondary,
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  y: [0, -20, -40],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
              >
                {getAnimationIcon()}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Glow Effect */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
              filter: 'blur(20px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Ripple Effect */}
      <AnimatePresence>
        {isAnimating && animationType === 'click' && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              border: `2px solid ${colors.primary}`,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Additional micro-animation components
export function PulseAnimation({ children, isActive = false }: { children: React.ReactNode; isActive?: boolean }) {
  return (
    <motion.div
      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingAnimation({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 2, repeat: Infinity, delay }}
    >
      {children}
    </motion.div>
  );
}

export function GlowOnHover({ children, glowColor = '#8B5CF6' }: { children: React.ReactNode; glowColor?: string }) {
  return (
    <motion.div
      whileHover={{
        boxShadow: `0 0 20px ${glowColor}40`,
        transition: { duration: 0.3 }
      }}
      className="rounded-lg transition-all duration-300"
    >
      {children}
    </motion.div>
  );
}

export function StaggeredFadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}