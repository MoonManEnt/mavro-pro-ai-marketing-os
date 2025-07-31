import React, { useState } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'trend';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionable?: boolean;
}

interface NotificationCenterProps {
  notifications?: Notification[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(
    notifications.length > 0 ? notifications : [
      {
        id: 'notif-1',
        type: 'success',
        title: 'Campaign Performance',
        message: 'Your Holiday Botox campaign is performing 23% above target!',
        timestamp: '2024-12-21T10:30:00Z',
        read: false,
        actionable: true
      },
      {
        id: 'notif-2',
        type: 'trend',
        title: 'Trending Alert',
        message: 'Instagram Reels are showing 85% higher engagement in your industry',
        timestamp: '2024-12-21T09:15:00Z',
        read: false,
        actionable: true
      },
      {
        id: 'notif-3',
        type: 'info',
        title: 'New Lead',
        message: 'Jennifer Walsh submitted a consultation request',
        timestamp: '2024-12-21T08:45:00Z',
        read: true,
        actionable: false
      },
      {
        id: 'notif-4',
        type: 'warning',
        title: 'Budget Alert',
        message: 'Skincare campaign has reached 80% of monthly budget',
        timestamp: '2024-12-20T16:20:00Z',
        read: true,
        actionable: true
      }
    ]
  );

  const unreadCount = localNotifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setLocalNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setLocalNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setLocalNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
      case 'trend':
        return TrendingUp;
      default:
        return Info;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-mint-green';
      case 'warning':
        return 'text-golden-yellow';
      case 'trend':
        return 'text-sunset-orange';
      default:
        return 'text-sky-blue';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-sunset-orange rounded-full flex items-center justify-center text-white text-xs font-bold">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-black/90 backdrop-blur-lg border-white/20 p-0">
        <Card className="border-0 bg-transparent">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-sky-blue hover:text-sky-blue/80 hover:bg-white/10 text-xs"
                >
                  Mark all read
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {localNotifications.length === 0 ? (
                <div className="p-4 text-center text-white/60">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                localNotifications.map((notification) => {
                  const Icon = getIcon(notification.type);
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-white/5' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`w-5 h-5 mt-0.5 ${getIconColor(notification.type)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-medium text-sm truncate">
                              {notification.title}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="text-white/40 hover:text-white hover:bg-white/10 p-1 h-auto"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-white/70 text-xs mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-white/40 text-xs">
                              {formatTime(notification.timestamp)}
                            </span>
                            {notification.actionable && (
                              <Badge
                                variant="outline"
                                className="text-sky-blue border-sky-blue/30 bg-sky-blue/10 text-xs"
                              >
                                Action
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
