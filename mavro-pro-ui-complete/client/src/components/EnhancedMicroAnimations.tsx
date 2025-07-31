import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedMicroAnimationsProps {
  children: React.ReactNode;
  animationType: 'hover-lift' | 'hover-glow' | 'hover-scale' | 'pulse' | 'fade-in' | 'slide-up' | 'bounce-in';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function EnhancedMicroAnimations({ 
  children, 
  animationType, 
  delay = 0, 
  duration = 0.3,
  className = ''
}: EnhancedMicroAnimationsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const animations = {
    'hover-lift': {
      initial: { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
      hover: { 
        y: -8, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.2 }
      },
      exit: { 
        y: 0, 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.2 }
      }
    },
    'hover-glow': {
      initial: { boxShadow: '0 0 0px rgba(139, 92, 246, 0)' },
      hover: { 
        boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
        transition: { duration: 0.3 }
      },
      exit: { 
        boxShadow: '0 0 0px rgba(139, 92, 246, 0)',
        transition: { duration: 0.3 }
      }
    },
    'hover-scale': {
      initial: { scale: 1 },
      hover: { 
        scale: 1.05,
        transition: { duration: 0.2 }
      },
      exit: { 
        scale: 1,
        transition: { duration: 0.2 }
      }
    },
    'pulse': {
      initial: { scale: 1 },
      hover: { 
        scale: [1, 1.1, 1],
        transition: { duration: 0.6, repeat: Infinity }
      },
      exit: { 
        scale: 1,
        transition: { duration: 0.2 }
      }
    },
    'fade-in': {
      initial: { opacity: 0, y: 20 },
      hover: { 
        opacity: 1, 
        y: 0,
        transition: { duration: duration, delay: delay }
      },
      exit: { 
        opacity: 0, 
        y: 20,
        transition: { duration: 0.2 }
      }
    },
    'slide-up': {
      initial: { opacity: 0, y: 50 },
      hover: { 
        opacity: 1, 
        y: 0,
        transition: { duration: duration, delay: delay }
      },
      exit: { 
        opacity: 0, 
        y: 50,
        transition: { duration: 0.2 }
      }
    },
    'bounce-in': {
      initial: { opacity: 0, scale: 0.3 },
      hover: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: duration,
          delay: delay,
          type: 'spring',
          stiffness: 400,
          damping: 10
        }
      },
      exit: { 
        opacity: 0, 
        scale: 0.3,
        transition: { duration: 0.2 }
      }
    }
  };

  const currentAnimation = animations[animationType];

  return (
    <motion.div
      className={className}
      initial={currentAnimation.initial}
      animate={isVisible ? currentAnimation.hover : currentAnimation.initial}
      whileHover={isHovered ? currentAnimation.hover : currentAnimation.initial}
      exit={currentAnimation.exit}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
}

// Loading skeleton component
export const LoadingSkeleton = ({ className = '', lines = 3 }: { className?: string; lines?: number }) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-4 bg-gray-200 rounded mb-2 last:mb-0" style={{ width: `${100 - i * 20}%` }}></div>
    ))}
  </div>
);

// Success animation component
export const SuccessAnimation = ({ isVisible, onComplete }: { isVisible: boolean; onComplete: () => void }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 10 }}
            >
              <motion.svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </motion.svg>
            </motion.div>
            <motion.h3
              className="text-lg font-bold text-gray-900 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Action Completed!
            </motion.h3>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Confetti animation component
export const ConfettiAnimation = ({ isVisible }: { isVisible: boolean }) => {
  const colors = ['#9333EA', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    x: Math.random() * 100,
    rotation: Math.random() * 360
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: piece.color,
                left: `${piece.x}%`,
                top: '-10px'
              }}
              initial={{
                y: -50,
                opacity: 1,
                rotate: 0
              }}
              animate={{
                y: window.innerHeight + 50,
                opacity: 0,
                rotate: piece.rotation
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};