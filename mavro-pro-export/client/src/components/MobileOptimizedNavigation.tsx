import React, { useState } from 'react';
import { Menu, X, Home, Target, Star, Users, BarChart3, Settings, Globe, Shield, User, Package, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileOptimizedNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  currentPersona: string;
}

export default function MobileOptimizedNavigation({ 
  currentView, 
  onViewChange, 
  currentPersona 
}: MobileOptimizedNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Command Center', icon: Home, color: 'purple' },
    { id: 'campaigns', label: 'Campaigns', icon: Target, color: 'blue' },
    { id: 'reviews', label: 'Reviews', icon: Star, color: 'yellow' },
    { id: 'crm', label: 'CRM', icon: Users, color: 'green' },
    { id: 'foursight', label: 'FourSIGHT™', icon: BarChart3, color: 'indigo' },
    { id: 'geosmart', label: 'GeoSmart', icon: Globe, color: 'teal' },
    { id: 'vivistore', label: 'ViVi Store', icon: Brain, color: 'purple' },
    { id: 'compliance', label: 'Compliance', icon: Shield, color: 'red' },
    { id: 'clientportal', label: 'Client Portal', icon: User, color: 'pink' },
    { id: 'inventory', label: 'Inventory', icon: Package, color: 'orange' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' }
  ];

  const handleNavigation = (viewId: string) => {
    onViewChange(viewId);
    setIsOpen(false);
  };

  const getPersonaColor = () => {
    const colors = {
      kemar: 'purple',
      karen: 'blue',
      sarah: 'pink',
      marco: 'orange',
      alex: 'green',
      david: 'red'
    };
    return colors[currentPersona as keyof typeof colors] || 'purple';
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Sliding Menu */}
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-${getPersonaColor()}-500 to-${getPersonaColor()}-600 flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">
                        {currentPersona === 'kemar' && 'KH'}
                        {currentPersona === 'karen' && 'KT'}
                        {currentPersona === 'sarah' && 'SM'}
                        {currentPersona === 'marco' && 'MR'}
                        {currentPersona === 'alex' && 'AC'}
                        {currentPersona === 'david' && 'DW'}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Mavro Pro</h2>
                      <p className="text-sm text-gray-600">Mobile Menu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          isActive
                            ? `bg-${item.color}-50 text-${item.color}-600 border-r-4 border-${item.color}-500`
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? `text-${item.color}-600` : 'text-gray-500'}`} />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Demo Mode Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
        <div className="flex justify-around">
          {navigationItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? `text-${item.color}-600 bg-${item.color}-50`
                    : 'text-gray-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}