import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, Info, TrendingUp, Zap, Star } from 'lucide-react';

interface RealTimeNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'trend' | 'milestone' | 'engagement';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  persona: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface RealTimeNotificationSystemProps {
  currentPersona: string;
  isActive: boolean;
  onNotificationClick?: (notification: RealTimeNotification) => void;
}

export default function RealTimeNotificationSystem({ 
  currentPersona, 
  isActive, 
  onNotificationClick 
}: RealTimeNotificationSystemProps) {
  const [notifications, setNotifications] = useState<RealTimeNotification[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [currentToast, setCurrentToast] = useState<RealTimeNotification | null>(null);

  // Generate realistic notifications based on persona
  const generateNotification = (): RealTimeNotification => {
    const notificationTemplates = {
      kemar: [
        {
          type: 'success' as const,
          title: 'New Speaking Inquiry',
          message: 'Fortune 500 company interested in your leadership workshop',
          priority: 'high' as const
        },
        {
          type: 'trend' as const,
          title: 'Trending Topic',
          message: 'Remote leadership is trending - perfect for your next post',
          priority: 'medium' as const
        },
        {
          type: 'milestone' as const,
          title: 'Follower Milestone',
          message: 'You\'ve reached 15K LinkedIn connections!',
          priority: 'high' as const
        },
        {
          type: 'engagement' as const,
          title: 'High Engagement',
          message: 'Your leadership tips post has 500+ likes and counting',
          priority: 'medium' as const
        }
      ],
      karen: [
        {
          type: 'success' as const,
          title: 'New Listing Inquiry',
          message: 'Premium buyer interested in your Beverly Hills property',
          priority: 'high' as const
        },
        {
          type: 'trend' as const,
          title: 'Market Trend',
          message: 'Luxury home market showing 15% increase in your area',
          priority: 'medium' as const
        },
        {
          type: 'milestone' as const,
          title: 'Sales Milestone',
          message: 'You\'ve closed $10M in sales this quarter!',
          priority: 'high' as const
        },
        {
          type: 'engagement' as const,
          title: 'Property Interest',
          message: 'Your virtual tour has been viewed 200+ times today',
          priority: 'medium' as const
        }
      ],
      sarah: [
        {
          type: 'success' as const,
          title: 'New Consultation',
          message: 'Premium client booked anti-aging treatment consultation',
          priority: 'high' as const
        },
        {
          type: 'trend' as const,
          title: 'Wellness Trend',
          message: 'Skincare routines trending - share your expert tips',
          priority: 'medium' as const
        },
        {
          type: 'milestone' as const,
          title: 'Review Milestone',
          message: 'You\'ve received 100+ five-star reviews!',
          priority: 'high' as const
        },
        {
          type: 'engagement' as const,
          title: 'Treatment Interest',
          message: 'Your before/after post has 300+ likes and 50 comments',
          priority: 'medium' as const
        }
      ],
      marco: [
        {
          type: 'success' as const,
          title: 'Catering Inquiry',
          message: 'Corporate event wants to book your Italian catering',
          priority: 'high' as const
        },
        {
          type: 'trend' as const,
          title: 'Food Trend',
          message: 'Authentic Italian cuisine trending on social media',
          priority: 'medium' as const
        },
        {
          type: 'milestone' as const,
          title: 'Reservation Milestone',
          message: 'Fully booked for the next 3 weekends!',
          priority: 'high' as const
        },
        {
          type: 'engagement' as const,
          title: 'Recipe Viral',
          message: 'Your pasta recipe video has 1K+ views in 2 hours',
          priority: 'medium' as const
        }
      ],
      alex: [
        {
          type: 'success' as const,
          title: 'New Client',
          message: 'Premium personal training package purchased',
          priority: 'high' as const
        },
        {
          type: 'trend' as const,
          title: 'Fitness Trend',
          message: 'Home workouts trending - perfect for your content',
          priority: 'medium' as const
        },
        {
          type: 'milestone' as const,
          title: 'Transformation Milestone',
          message: 'Client achieved 20lb weight loss goal!',
          priority: 'high' as const
        },
        {
          type: 'engagement' as const,
          title: 'Workout Viral',
          message: 'Your HIIT workout video has 500+ saves',
          priority: 'medium' as const
        }
      ],
      david: [
        {
          type: 'success' as const,
          title: 'Vehicle Inquiry',
          message: 'Qualified buyer interested in your luxury sedan',
          priority: 'high' as const
        },
        {
          type: 'trend' as const,
          title: 'Market Trend',
          message: 'Electric vehicles showing increased demand',
          priority: 'medium' as const
        },
        {
          type: 'milestone' as const,
          title: 'Sales Milestone',
          message: 'Top performer of the month - 25 vehicles sold!',
          priority: 'high' as const
        },
        {
          type: 'engagement' as const,
          title: 'Showcase Interest',
          message: 'Your vehicle showcase video has 400+ views',
          priority: 'medium' as const
        }
      ]
    };

    const templates = notificationTemplates[currentPersona as keyof typeof notificationTemplates] || notificationTemplates.kemar;
    const template = templates[Math.floor(Math.random() * templates.length)];

    return {
      id: Date.now().toString(),
      ...template,
      timestamp: new Date(),
      read: false,
      persona: currentPersona,
      action: template.type === 'success' ? {
        label: 'View Details',
        onClick: () => console.log('Navigate to details')
      } : undefined
    };
  };

  // Add new notifications periodically
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.7) { // 70% chance of generating notification
        const newNotification = generateNotification();
        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep last 20
        
        // Show toast for high priority notifications
        if (newNotification.priority === 'high') {
          setCurrentToast(newNotification);
          setShowToast(true);
        }
      }
    }, 10000 + Math.random() * 15000); // Random interval between 10-25 seconds

    return () => clearInterval(interval);
  }, [isActive, currentPersona]);

  // Auto-dismiss toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        setCurrentToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'trend': return TrendingUp;
      case 'milestone': return Star;
      case 'engagement': return Zap;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'green';
      case 'trend': return 'blue';
      case 'milestone': return 'purple';
      case 'engagement': return 'orange';
      default: return 'gray';
    }
  };

  const handleNotificationClick = (notification: RealTimeNotification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );

    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  const dismissToast = () => {
    setShowToast(false);
    setCurrentToast(null);
  };

  // Expose notifications for parent components
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('notificationUpdate', {
      detail: { notifications: notifications.slice(0, 5) }
    }));
  }, [notifications]);

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && currentToast && (
          <motion.div
            className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-50 border border-gray-200"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-${getNotificationColor(currentToast.type)}-500 flex items-center justify-center flex-shrink-0`}>
                  {React.createElement(getNotificationIcon(currentToast.type), {
                    className: 'w-4 h-4 text-white'
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">{currentToast.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{currentToast.message}</p>
                  {currentToast.action && (
                    <button
                      onClick={currentToast.action.onClick}
                      className="text-xs text-purple-600 hover:text-purple-800 mt-2 font-medium"
                    >
                      {currentToast.action.label}
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={dismissToast}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Badge (for navbar) */}
      {notifications.filter(n => !n.read).length > 0 && (
        <motion.div
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {notifications.filter(n => !n.read).length}
        </motion.div>
      )}
    </>
  );
}