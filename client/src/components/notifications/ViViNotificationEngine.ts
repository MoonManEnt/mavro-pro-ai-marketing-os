interface Notification {
  id: number;
  type: string;
  message: string;
  actionLink?: string;
  timestamp: string;
  read?: boolean;
}

let notifications: Notification[] = [];

export function pushNotification({ type, message, actionLink }: { type: string; message: string; actionLink?: string }) {
  const entry = {
    id: Date.now(),
    type,
    message,
    actionLink,
    timestamp: new Date().toISOString()
  };

  notifications.unshift(entry);
  if (notifications.length > 50) {
    notifications = notifications.slice(0, 50);
  }

  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('viviNotification', { detail: entry }));
}

export function getRecentNotifications() {
  return notifications;
}

export function markNotificationAsRead(id: number) {
  const index = notifications.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications[index].read = true;
  }
}

export function clearAllNotifications() {
  notifications = [];
  window.dispatchEvent(new CustomEvent('viviNotificationsCleared'));
}