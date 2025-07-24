import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Image, 
  Info, 
  Mail, 
  User, 
  Edit3, 
  Lock, 
  Heart, 
  LogOut, 
  ArrowUp,
  Settings,
  Users,
  CheckCircle,
  BarChart,
  Upload,
  MessageSquare,
  GraduationCap,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'visitor' | 'curator' | 'professor' | 'admin';
  isAuthenticated?: boolean;
}

export const Sidebar = ({ isOpen, onClose, userRole = 'visitor', isAuthenticated = false }: SidebarProps) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const isActive = (path: string) => location.pathname === path;

  const handleItemClick = () => {
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-card border-l shadow-elegant z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onDoubleClick={onClose}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-primary">Menu</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Account Info */}
          {isAuthenticated && (
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">John Doe</p>
                  <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
                </div>
              </div>
            </div>
          )}

          {/* User-specific sections */}
          {isAuthenticated && (
            <div className="px-6 space-y-2 flex-1">
              {/* Visitor/Curator sections */}
              {(userRole === 'visitor' || userRole === 'curator') && (
                <>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">ACCOUNT</h3>
                  
                  <Link 
                    to="/profile" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/profile') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </Link>

                  <Link 
                    to="/profile/edit" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/profile/edit') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </Link>

                  <Link 
                    to="/change-password" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/change-password') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <Lock className="h-4 w-4" />
                    <span>Change Password</span>
                  </Link>

                  <Link 
                    to="/watched-later" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/watched-later') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                    <span>Watched Later</span>
                  </Link>

                  {userRole === 'visitor' && (
                    <Link 
                      to="/upgrade-curator" 
                      onClick={handleItemClick}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors bg-accent hover:bg-accent/80 text-accent-foreground"
                    >
                      <ArrowUp className="h-4 w-4" />
                      <span>Upgrade to Curator</span>
                    </Link>
                  )}
                </>
              )}

              {/* Curator specific */}
              {userRole === 'curator' && (
                <>
                  <Separator className="my-4" />
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">CURATOR</h3>
                  
                  <Link 
                    to="/curator/upload" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/curator/upload') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Art</span>
                  </Link>

                  <Link 
                    to="/curator/dashboard" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/curator/dashboard') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </>
              )}

              {/* Professor specific */}
              {userRole === 'professor' && (
                <>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">PROFESSOR</h3>
                  
                  <Link 
                    to="/professor/dashboard" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/professor/dashboard') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Professor Dashboard</span>
                  </Link>

                  <Link 
                    to="/professor/review" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/professor/review') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Review Arts</span>
                  </Link>
                </>
              )}

              {/* Admin specific */}
              {userRole === 'admin' && (
                <>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">ADMIN</h3>
                  
                  <Link 
                    to="/admin/dashboard" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/admin/dashboard') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>

                  <Link 
                    to="/admin/users" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/admin/users') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    <span>Manage Users</span>
                  </Link>

                  <Link 
                    to="/admin/arts" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/admin/arts') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Review Arts</span>
                  </Link>

                  <Link 
                    to="/admin/categories" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/admin/categories') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <Image className="h-4 w-4" />
                    <span>Categories</span>
                  </Link>

                  <Link 
                    to="/admin/reports" 
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/admin/reports') ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <BarChart className="h-4 w-4" />
                    <span>Reports</span>
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Logout */}
          {isAuthenticated && (
            <>
              <Separator />
              <div className="p-6">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    // Handle logout
                    handleItemClick();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </Button>
              </div>
            </>
          )}

          {/* Sign in prompt for non-authenticated users */}
          {!isAuthenticated && (
            <>
              <Separator />
              <div className="p-6 space-y-3">
                <p className="text-sm text-muted-foreground">Sign in to access more features</p>
                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <Link to="/signin" onClick={handleItemClick}>Sign In</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/signup" onClick={handleItemClick}>Sign Up</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};