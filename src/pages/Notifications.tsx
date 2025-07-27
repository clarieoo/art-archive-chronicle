import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

interface Notification {
  id: number;
  time: string;
  description: string;
  visitLink: string;
  from: string;
  isRead: boolean;
}

export const Notifications = () => {
  const navigate = useNavigate();
  
  // Mock notifications data with more detailed time
  const notifications: Notification[] = [
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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <DashboardLayout userRole="curator">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold text-foreground">
              Notifications ({notifications.length})
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <>
                <Badge variant="default" className="text-sm">
                  {unreadCount} Unread
                </Badge>
                <Button variant="outline" size="sm">
                  Read All
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>From</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow 
                  key={notification.id}
                  className={notification.isRead ? 'opacity-60' : 'bg-muted/30'}
                >
                  <TableCell>
                    <Badge variant={notification.isRead ? "secondary" : "default"}>
                      {notification.isRead ? "Read" : "Unread"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {notification.time}
                  </TableCell>
                  <TableCell className="max-w-md">
                    <Link 
                      to={notification.visitLink}
                      className={`hover:underline transition-colors ${
                        notification.isRead 
                          ? 'text-muted-foreground hover:text-foreground' 
                          : 'text-foreground font-medium hover:text-primary'
                      }`}
                    >
                      {notification.description}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {notification.from}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No notifications found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};