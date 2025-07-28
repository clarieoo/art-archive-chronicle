import React, { createContext, useContext, useState } from 'react';

export interface Notification {
  id: number;
  time: string;
  description: string;
  visitLink: string;
  from: string;
  isRead: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllAsRead: () => void;
  markAsRead: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const mockNotifications: Notification[] = [
  {
    id: 1,
    time: '10:15:30 27/05/2025',
    description: 'Your artwork "Sunset Valley" has been approved',
    visitLink: '/gallery/artwork/123',
    from: 'Admin Review Team',
    isRead: false
  },
  {
    id: 2,
    time: '14:20:45 26/05/2025',
    description: 'New comment on your artwork submission',
    visitLink: '/dashboard/submissions',
    from: 'Professor Johnson',
    isRead: false
  },
  {
    id: 3,
    time: '09:30:15 24/05/2025',
    description: 'Your curator application is under review',
    visitLink: '/upgrade-curator',
    from: 'System Administrator',
    isRead: true
  },
  {
    id: 4,
    time: '12:00:00 20/05/2025',
    description: 'Welcome to the Historical Archive platform',
    visitLink: '/dashboard',
    from: 'System',
    isRead: true
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAllAsRead,
      markAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};