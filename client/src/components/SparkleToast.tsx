import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';

interface SparkleToastProps {
  title: string;
  description: string;
  className?: string;
}

const SparkleToast: React.FC<SparkleToastProps> = ({ title, description, className }) => {
  const sparkleElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute"
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ 
        opacity: [0, 1, 0], 
        scale: [0, 1, 0], 
        rotate: [0, 180, 360],
        x: [0, Math.random() * 40 - 20],
        y: [0, Math.random() * 40 - 20]
      }}
      transition={{ 
        duration: 1.5, 
        delay: i * 0.1,
        ease: "easeOut"
      }}
      style={{
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`,
      }}
    >
      <Sparkles className="w-3 h-3 text-yellow-400" />
    </motion.div>
  ));

  return (
    <Toast 
      variant="success" 
      className={`relative overflow-visible border-green-200 bg-white/95 backdrop-blur-sm shadow-xl ${className}`}
    >
      {/* Sparkle animations */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkleElements}
      </div>
      
      {/* Main content */}
      <div className="flex items-start space-x-3 relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: 0.2 
          }}
          className="flex-shrink-0"
        >
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        </motion.div>
        
        <div className="flex-1">
          <ToastTitle className="text-gray-900 font-semibold">
            {title}
          </ToastTitle>
          <ToastDescription className="text-gray-600 opacity-100">
            {description}
          </ToastDescription>
        </div>
      </div>
      
      {/* Success glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2 }}
      />
    </Toast>
  );
};

export default SparkleToast;