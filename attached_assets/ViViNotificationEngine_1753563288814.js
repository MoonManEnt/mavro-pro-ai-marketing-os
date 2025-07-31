let notifications = [];

export function pushNotification({ type, message, actionLink }) {
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
}

export function getRecentNotifications() {
  return notifications;
}
