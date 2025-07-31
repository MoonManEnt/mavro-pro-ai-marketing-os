import React from 'react';
import { Button } from './ui/button';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import PersonaLoader from './PersonaLoader';
import NotificationCenter from './NotificationCenter';
import ModeSelector from './ModeSelector';

const TopNavigation: React.FC = () => {
  return (
    <nav className="glass-card border-b border-white/20 sticky top-0 z-50 bg-white/5 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-sunset-orange to-golden-yellow rounded-lg flex items-center justify-center">
                <i className="fas fa-rocket text-white text-sm"></i>
              </div>
              <span className="text-white font-bold text-xl">Mavro Pro</span>
            </motion.div>
            
            <ModeSelector />
          </div>
          
          <div className="flex items-center space-x-4">
            <PersonaLoader />
            <NotificationCenter />
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
