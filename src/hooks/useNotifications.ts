import { useState, useEffect } from 'react';

export interface Notification {
  id: number;
  time: string;
  description: string;
  visitLink: string;
  from: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    time: '2 hours 15 minutes ago',
    description: 'Your artwork "Sunset Valley" has been approved',
    visitLink: '/gallery/artwork/123',
    from: 'Admin Review Team',
    isRead: false
  },
  {
    id: 2,
    time: '1 day 5 minutes ago',
    description: 'New comment on your artwork submission',
    visitLink: '/dashboard/submissions',
    from: 'Professor Johnson',
    isRead: false
  },
  {
    id: 3,
    time: '3 days 45 minutes ago',
    description: 'Your curator application is under review',
    visitLink: '/upgrade-curator',
    from: 'System Administrator',
    isRead: true
  },
  {
    id: 4,
    time: '1 week 2 days ago',
    description: 'Welcome to the Historical Archive platform',
    visitLink: '/dashboard',
    from: 'System',
    isRead: true
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  return {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead
  };
};