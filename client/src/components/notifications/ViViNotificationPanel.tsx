import React, { useState, useEffect } from 'react';
import { Bell, X, ExternalLink, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecentNotifications, markNotificationAsRead, clearAllNotifications } from './ViViNotificationEngine';

export const ViViNotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initial load
    setNotifications(getRecentNotifications());

    // Listen for new notifications
    const handleNewNotification = (event: CustomEvent) => {
      setNotifications(getRecentNotifications());
    };

    const handleClearNotifications = () => {
      setNotifications([]);
    };

    window.addEventListener('viviNotification', handleNewNotification);
    window.addEventListener('viviNotificationsCleared', handleClearNotifications);

    return () => {
      window.removeEventListener('viviNotification', handleNewNotification);
      window.removeEventListener('viviNotificationsCleared', handleClearNotifications);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      campaign: '🎯',
      post: '📱',
      crm: '👥',
      trend: '📈'
    };
    return iconMap[type] || '🔔';
  };

  const getNotificationColor = (type: string) => {
    const colorMap = {
      campaign: 'from-blue-500 to-indigo-600',
      post: 'from-green-500 to-emerald-600',
      crm: 'from-purple-500 to-violet-600',
      trend: 'from-orange-500 to-amber-600'
    };
    return colorMap[type] || 'from-gray-500 to-gray-600';
  };

  const handleMarkAsRead = (id: number) => {
    markNotificationAsRead(id);
    setNotifications(getRecentNotifications());
  };

  const handleClearAll = () => {
    clearAllNotifications();
    setNotifications([]);
  };

  return (
    <>
      {/* Notification Bell */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <Bell className="w-5 h-5 text-white" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-white min-w-[20px] h-5 rounded-full flex items-center justify-center text-xs font-bold">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <Card className="fixed top-20 right-4 z-40 w-96 max-h-[500px] overflow-hidden shadow-2xl border-2 border-gray-200 rounded-2xl bg-white">
          <CardHeader className="pb-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span className="font-black">ViVi Notifications</span>
              </CardTitle>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-lg"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {notifications.length > 0 && (
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-purple-100">
                  {unreadCount} unread of {notifications.length} total
                </span>
                <Button
                  onClick={handleClearAll}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 rounded-lg text-xs"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Clear All
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-0 max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">No notifications yet</p>
                <p className="text-sm text-gray-500">ViVi will keep you updated on important activities</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 hover:bg-gray-50 transition-colors duration-200 ${
                      !notification.read ? 'bg-blue-50 border-l-blue-500' : 'border-l-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-br ${getNotificationColor(notification.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notification.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          {!notification.read && (
                            <Button
                              onClick={() => handleMarkAsRead(notification.id)}
                              size="sm"
                              variant="outline"
                              className="text-xs rounded-lg border-gray-300 hover:bg-gray-100"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          {notification.actionLink && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs rounded-lg border-purple-300 text-purple-600 hover:bg-purple-50"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};