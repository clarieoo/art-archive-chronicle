import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  userRole?: 'visitor' | 'curator' | 'professor' | 'admin';
  isAuthenticated?: boolean;
}

export const Layout = ({ userRole = 'visitor', isAuthenticated = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isAuthenticated={isAuthenticated}
        userRole={userRole}
      />
      
      <main className="relative">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};