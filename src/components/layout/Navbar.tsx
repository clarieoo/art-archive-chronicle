import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logo from '@/assets/logo.jpg';

interface NavbarProps {
  onMenuClick?: () => void;
  isAuthenticated?: boolean;
  userRole?: 'visitor' | 'curator' | 'professor' | 'admin';
}

export const Navbar = ({ onMenuClick, isAuthenticated = false, userRole = 'visitor' }: NavbarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

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

          {/* Navigation Links - Desktop */}
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