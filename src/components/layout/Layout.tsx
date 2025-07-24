import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  userRole?: 'visitor' | 'curator' | 'professor' | 'admin';
  isAuthenticated?: boolean;
}

export const Layout = ({ userRole = 'visitor', isAuthenticated = false }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onMenuClick={handleMenuClick} 
        isAuthenticated={isAuthenticated}
        userRole={userRole}
      />
      
      <main className="relative">
        <Outlet />
      </main>

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleSidebarClose}
        userRole={userRole}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};