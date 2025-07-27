import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, Star, Heart, Search, Bell, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import logo from '@/assets/logo.jpg';

interface NavbarProps {
  onMenuClick?: () => void;
  isAuthenticated?: boolean;
  userRole?: 'visitor' | 'curator' | 'professor' | 'admin';
}

export const Navbar = ({ onMenuClick, isAuthenticated = false, userRole = 'visitor' }: NavbarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      time: '2 hours ago',
      description: 'Your artwork "Sunset Valley" has been approved',
      visitLink: '/gallery/artwork/123',
      from: 'Admin Review Team'
    },
    {
      id: 2,
      time: '1 day ago',
      description: 'New comment on your artwork submission',
      visitLink: '/dashboard/submissions',
      from: 'Professor Johnson'
    },
    {
      id: 3,
      time: '3 days ago',
      description: 'Your curator application is under review',
      visitLink: '/upgrade-curator',
      from: 'System Administrator'
    }
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Historical Archive" className="h-10 w-auto rounded-lg" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">Historical Archive</h1>
              <p className="text-xs text-muted-foreground">Art Gallery</p>
            </div>
          </Link>

          {/* Navigation Links - Desktop (only for non-dashboard) */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/home"
                className={`font-medium transition-colors hover:text-primary ${
                  isActive('/home') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Home
              </Link>
              <Link
                to="/gallery"
                className={`font-medium transition-colors hover:text-primary ${
                  isActive('/gallery') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Gallery
              </Link>
              <Link
                to="/about"
                className={`font-medium transition-colors hover:text-primary ${
                  isActive('/about') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`font-medium transition-colors hover:text-primary ${
                  isActive('/contact') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Contact
              </Link>
            </div>
          )}

          {/* Search Box and Notifications for dashboards and visitors */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-96" align="end">
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                      <Badge variant="secondary">{notifications.length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="border-b border-border pb-3 last:border-b-0">
                          <div className="space-y-2">
                            <p className="text-sm text-foreground">{notification.description}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{notification.time}</span>
                              </div>
                              <span>From: {notification.from}</span>
                            </div>
                            <Link 
                              to={notification.visitLink}
                              className="inline-flex items-center space-x-1 text-xs text-primary hover:underline"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>Visit</span>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      Mark all as read
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Authentication */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Watched Later (for visitors/curators) */}
                {(userRole === 'visitor' || userRole === 'curator') && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/watched-later">
                      <Heart className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                
                {/* Profile Avatar */}
                <Button variant="ghost" className="p-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {onMenuClick && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="flex items-center space-x-1"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};