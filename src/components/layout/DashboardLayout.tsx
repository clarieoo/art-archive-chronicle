import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  userRole: 'curator' | 'professor' | 'admin';
}

export const DashboardLayout = ({ userRole }: DashboardLayoutProps) => {
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
        isAuthenticated={true}
        userRole={userRole}
      />
      
      <main className="relative">
        <Outlet />
      </main>

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleSidebarClose}
        userRole={userRole}
        isAuthenticated={true}
      />
    </div>
  );
};