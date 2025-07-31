import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { MousePointer, Eye, Hand, Zap, Heart, Star, TrendingUp, Award, Target } from 'lucide-react';

interface ContextualMicroInteractionsProps {
  children: React.ReactNode;
  interactionType: 'hover' | 'click' | 'focus' | 'success' | 'error' | 'loading';
  currentPersona: string;
  intensity?: 'subtle' | 'moderate' | 'vibrant';
  disabled?: boolean;
  onInteraction?: (type: string) => void;
}

const ContextualMicroInteractions: React.FC<ContextualMicroInteractionsProps> = ({
  children,
  interactionType,
  currentPersona,
  intensity = 'moderate',
  disabled = false,
  onInteraction
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const getPersonaTheme = () => {
    const themes = {
      kemar: {
        primary: '#8B5CF6',
        secondary: '#A78BFA',
        accent: '#DDD6FE',
        glow: 'rgba(139, 92, 246, 0.3)',
        pattern: 'leadership'
      },
      karen: {
        primary: '#10B981',
        secondary: '#34D399',
        accent: '#A7F3D0',
        glow: 'rgba(16, 185, 129, 0.3)',
        pattern: 'growth'
      },
      sarah: {
        primary: '#F59E0B',
        secondary: '#FBB042',
        accent: '#FEE7A0',
        glow: 'rgba(245, 158, 11, 0.3)',
        pattern: 'wellness'
      },
      marco: {
        primary: '#EF4444',
        secondary: '#F87171',
        accent: '#FEB2B2',
        glow: 'rgba(239, 68, 68, 0.3)',
        pattern: 'culinary'
      },
      alex: {
        primary: '#3B82F6',
        secondary: '#60A5FA',
        accent: '#BFDBFE',
        glow: 'rgba(59, 130, 246, 0.3)',
        pattern: 'fitness'
      },
      david: {
        primary: '#6B7280',
        secondary: '#9CA3AF',
        accent: '#D1D5DB',
        glow: 'rgba(107, 114, 128, 0.3)',
        pattern: 'automotive'
      }
    };

    return themes[currentPersona as keyof typeof themes] || themes.kemar;
  };

  const getIntensityValues = () => {
    const values = {
      subtle: {
        scale: 1.02,
        glow: 0.1,
        duration: 0.2,
        shadowBlur: 4
      },
      moderate: {
        scale: 1.05,
        glow: 0.2,
        duration: 0.3,
        shadowBlur: 8
      },
      vibrant: {
        scale: 1.08,
        glow: 0.4,
        duration: 0.4,
        shadowBlur: 12
      }
    };

    return values[intensity];
  };

  const theme = getPersonaTheme();
  const intensityValues = getIntensityValues();

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    onInteraction?.('hover');
    
    controls.start({
      scale: intensityValues.scale,
      boxShadow: `0 ${intensityValues.shadowBlur}px ${intensityValues.shadowBlur * 2}px ${theme.glow}`,
      transition: { duration: intensityValues.duration }
    });
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
    
    controls.start({
      scale: 1,
      boxShadow: '0 0px 0px rgba(0,0,0,0)',
      transition: { duration: intensityValues.duration }
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsClicked(true);
    onInteraction?.('click');
    
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setRipplePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setShowRipple(true);
    }
    
    controls.start({
      scale: intensityValues.scale * 0.95,
      transition: { duration: 0.1 }
    });
  };

  const handleMouseUp = () => {
    if (disabled) return;
    setIsClicked(false);
    
    controls.start({
      scale: isHovered ? intensityValues.scale : 1,
      transition: { duration: 0.1 }
    });
    
    setTimeout(() => setShowRipple(false), 600);
  };

  const handleFocus = () => {
    if (disabled) return;
    setIsFocused(true);
    onInteraction?.('focus');
  };

  const handleBlur = () => {
    if (disabled) return;
    setIsFocused(false);
  };

  const getInteractionPattern = () => {
    switch (interactionType) {
      case 'hover':
        return (
          <motion.div
            className="absolute inset-0 rounded-lg opacity-20"
            style={{ backgroundColor: theme.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        );
      
      case 'click':
        return (
          <AnimatePresence>
            {showRipple && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: ripplePosition.x - 20,
                  top: ripplePosition.y - 20,
                  width: 40,
                  height: 40,
                  backgroundColor: theme.primary
                }}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        );
      
      case 'focus':
        return (
          <motion.div
            className="absolute inset-0 rounded-lg border-2 pointer-events-none"
            style={{ borderColor: theme.primary }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.95
            }}
            transition={{ duration: 0.2 }}
          />
        );
      
      case 'success':
        return (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: '#10B981' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              scale: [0.9, 1, 1.02]
            }}
            transition={{ duration: 0.6 }}
          />
        );
      
      case 'error':
        return (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: '#EF4444' }}
            initial={{ opacity: 0, x: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              x: [0, -2, 2, -2, 2, 0]
            }}
            transition={{ duration: 0.5 }}
          />
        );
      
      case 'loading':
        return (
          <motion.div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{ backgroundColor: theme.accent }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  const getContextualIndicator = () => {
    if (!isHovered && !isFocused) return null;
    
    const indicators = {
      kemar: { icon: Award, label: 'Leadership' },
      karen: { icon: TrendingUp, label: 'Growth' },
      sarah: { icon: Heart, label: 'Wellness' },
      marco: { icon: Star, label: 'Excellence' },
      alex: { icon: Target, label: 'Fitness' },
      david: { icon: Zap, label: 'Performance' }
    };
    
    const indicator = indicators[currentPersona as keyof typeof indicators] || indicators.kemar;
    const IconComponent = indicator.icon;
    
    return (
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-lg border-2 pointer-events-none z-10"
        style={{ borderColor: theme.primary }}
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center space-x-1">
          <IconComponent className="w-3 h-3" style={{ color: theme.primary }} />
          <span className="text-xs font-medium text-gray-700">{indicator.label}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={elementRef}
      className="relative overflow-hidden"
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        transformOrigin: 'center',
        willChange: 'transform'
      }}
    >
      {children}
      {getInteractionPattern()}
      
      <AnimatePresence>
        {getContextualIndicator()}
      </AnimatePresence>
      
      {/* Breathing animation for focused state */}
      {isFocused && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 pointer-events-none"
          style={{ borderColor: theme.primary }}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.01, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default ContextualMicroInteractions;