import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DashboardTransitionProps {
  children: React.ReactNode;
}

export default function DashboardTransition({ children }: DashboardTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth transition from loading screen
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2 
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}