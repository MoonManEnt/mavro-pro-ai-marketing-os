import React, { useState, useEffect } from 'react';
import { X, TrendingUp, MapPin, AlertTriangle, MessageCircle, Info, Zap } from 'lucide-react';

/**
 * ViVi Toast Component - Intelligent notification system
 * Auto-adjusts colors and icons based on notification type
 */
const ViViToast = ({ 
  toast, 
  onClose, 
  onAction 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 50);
    
    // Auto dismiss if duration is set
    if (toast.duration && toast.duration > 0) {
      const dismissTimer = setTimeout(() => {
        handleClose();
      }, toast.duration);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(dismissTimer);
      };
    }
    
    return () => clearTimeout(timer);
  }, [toast.duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.(toast.id);
    }, 300);
  };

  const handleAction = () => {
    if (onAction) {
      onAction(toast);
    }
  };

  const getToastStyles = () => {
    const baseStyles = "transform transition-all duration-300 ease-in-out";
    const visibilityStyles = isVisible && !isExiting 
      ? "translate-x-0 opacity-100" 
      : "translate-x-full opacity-0";
    
    return `${baseStyles} ${visibilityStyles}`;
  };

  const getToastConfig = () => {
    const configs = {
      trend: {
        bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
        border: 'border-purple-300',
        icon: TrendingUp,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        textColor: 'text-white',
        titleColor: 'text-white'
      },
      info: {
        bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        border: 'border-blue-300',
        icon: Info,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        textColor: 'text-white',
        titleColor: 'text-white'
      },
      warning: {
        bg: 'bg-gradient-to-r from-orange-500 to-red-500',
        border: 'border-orange-300',
        icon: AlertTriangle,
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        textColor: 'text-white',
        titleColor: 'text-white'
      },
      review: {
        bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
        border: 'border-green-300',
        icon: MessageCircle,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        textColor: 'text-white',
        titleColor: 'text-white'
      },
      geo: {
        bg: 'bg-gradient-to-r from-teal-500 to-cyan-500',
        border: 'border-teal-300',
        icon: MapPin,
        iconBg: 'bg-teal-100',
        iconColor: 'text-teal-600',
        textColor: 'text-white',
        titleColor: 'text-white'
      }
    };
    
    return configs[toast.type] || configs.info;
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  return (
    <div className={`${getToastStyles()} w-96 max-w-sm`}>
      <div className={`${config.bg} rounded-lg shadow-lg border ${config.border} overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 ${config.iconBg} rounded-lg flex items-center justify-center`}>
              <IconComponent className={`w-4 h-4 ${config.iconColor}`} />
            </div>
            <div>
              <h4 className={`font-semibold text-sm ${config.titleColor}`}>
                {toast.title || 'ViVi Notification'}
              </h4>
              {toast.type === 'trend' && (
                <div className="flex items-center space-x-1 mt-1">
                  <Zap className="w-3 h-3 text-yellow-300" />
                  <span className="text-xs text-yellow-200">Trending Now</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleClose}
            className={`${config.textColor} hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors duration-200`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-4 pb-4">
          <p className={`text-sm ${config.textColor} leading-relaxed`}>
            {toast.message}
          </p>
          
          {/* Data Display */}
          {toast.data && Object.keys(toast.data).length > 0 && (
            <div className="mt-3 p-3 bg-white bg-opacity-20 rounded-lg">
              <div className="space-y-1">
                {Object.entries(toast.data).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-white text-opacity-80 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-white font-medium">
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Button */}
          {toast.actionable && (
            <div className="mt-3 flex space-x-2">
              <button
                onClick={handleAction}
                className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200"
              >
                Take Action
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-white bg-opacity-10 hover:bg-opacity-20 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Toast Manager Component - Handles multiple toasts
 */
export const ToastManager = ({ toasts = [], onToastClose, onToastAction }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <ViViToast
          key={toast.id}
          toast={toast}
          onClose={onToastClose}
          onAction={onToastAction}
        />
      ))}
    </div>
  );
};

/**
 * Hook for managing toast notifications
 */
export const useViViToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (toastConfig) => {
    const toast = {
      id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ...toastConfig
    };
    
    setToasts(prev => [...prev, toast]);
    
    return toast.id;
  };

  const hideToast = (toastId) => {
    setToasts(prev => prev.filter(toast => toast.id !== toastId));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const handleToastAction = (toast) => {
    // Default action behavior - can be overridden
    console.log('Toast action triggered:', toast);
    
    // Auto-dismiss actionable toasts after action
    hideToast(toast.id);
  };

  return {
    toasts,
    showToast,
    hideToast,
    clearAllToasts,
    handleToastAction
  };
};

export default ViViToast;