import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      time: '2 hours ago',
      description: 'Your artwork "Sunset Valley" has been approved',
      visitLink: '/gallery/artwork/123',
      from: 'Admin Review Team',
      isRead: false
    },
    {
      id: 2,
      time: '1 day ago',
      description: 'New comment on your artwork submission',
      visitLink: '/dashboard/submissions',
      from: 'Professor Johnson',
      isRead: false
    },
    {
      id: 3,
      time: '3 days ago',
      description: 'Your curator application is under review',
      visitLink: '/upgrade-curator',
      from: 'System Administrator',
      isRead: true
    },
    {
      id: 4,
      time: '1 week ago',
      description: 'Welcome to the Historical Archive platform',
      visitLink: '/dashboard',
      from: 'System',
      isRead: true
    }
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Visit Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <Badge variant={notification.isRead ? "secondary" : "default"}>
                      {notification.isRead ? "Read" : "Unread"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {notification.time}
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-foreground">{notification.description}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {notification.from}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={notification.visitLink} className="flex items-center space-x-1">
                        <span>Visit</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
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
    </div>
  );
};