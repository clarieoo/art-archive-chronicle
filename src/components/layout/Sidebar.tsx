import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Edit3, 
  Lock, 
  Heart, 
  LogOut, 
  Settings,
  Users,
  CheckCircle,
  BarChart,
  Upload,
  MessageSquare,
  GraduationCap,
  X,
  Image,
  Bookmark,
  Megaphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogoutDialog } from '@/components/LogoutDialog';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'visitor' | 'curator' | 'professor' | 'admin';
  isAuthenticated?: boolean;
}

export const Sidebar = ({ isOpen, onClose, userRole = 'visitor', isAuthenticated = false }: SidebarProps) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

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
        className={`fixed top-0 right-0 h-full w-80 bg-background border-l shadow-elegant z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onDoubleClick={onClose}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-medium text-foreground">Menu</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Account Info */}
          {isAuthenticated && (
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-lg">John Doe</p>
                  <p className="text-muted-foreground capitalize">{userRole}</p>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          {isAuthenticated && (
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 space-y-6">
                {/* Account Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">ACCOUNT</h3>
                  
                  <div className="space-y-1">
                    <Link 
                      to="/profile" 
                      onClick={handleItemClick}
                      className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>View Profile</span>
                    </Link>

                    <Link 
                      to="/profile/edit" 
                      onClick={handleItemClick}
                      className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                    >
                      <Edit3 className="h-5 w-5" />
                      <span>Edit Profile</span>
                    </Link>

                    <Link 
                      to="/change-password" 
                      onClick={handleItemClick}
                      className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                    >
                      <Lock className="h-5 w-5" />
                      <span>Change Password</span>
                    </Link>

                    {userRole === 'visitor' && (
                      <Link 
                        to="/bookmarks" 
                        onClick={handleItemClick}
                        className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                      >
                        <Bookmark className="h-5 w-5" />
                        <span>My Bookmarks</span>
                      </Link>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Role-specific sections */}
                {userRole === 'visitor' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">VISITOR FUNCTIONS</h3>
                    
                    <div className="space-y-1">
                      <Link 
                        to="/upgrade-curator" 
                        onClick={handleItemClick}
                        className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                      >
                        <GraduationCap className="h-5 w-5" />
                        <span>Upgrade to Curator</span>
                      </Link>
                    </div>
                  </div>
                )}

                {userRole === 'admin' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">ADMIN</h3>
                    
                    <div className="space-y-1">
                      <Link 
                        to="/admin/users" 
                        onClick={handleItemClick}
                        className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                      >
                        <Users className="h-5 w-5" />
                        <span>Manage Users</span>
                      </Link>

                      <Link 
                        to="/admin/arts" 
                        onClick={handleItemClick}
                        className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span>Manage Artworks</span>
                      </Link>

                      <Link 
                        to="/admin/announcements/new" 
                        onClick={handleItemClick}
                        className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                      >
                        <Megaphone className="h-5 w-5" />
                        <span>Make Announcement</span>
                      </Link>
                    </div>
                  </div>
                )}

                {userRole === 'curator' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">CURATOR</h3>
                    
                    <div className="space-y-1">
                      <Link 
                        to="/curator/upload" 
                        onClick={handleItemClick}
                        className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                      >
                        <Upload className="h-5 w-5" />
                        <span>Upload Art</span>
                      </Link>

                      <Link 
                        to="/curator/manage" 
                        onClick={handleItemClick}
                        className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                        <span>Manage Artworks</span>
                      </Link>
                    </div>
                  </div>
                )}

                {userRole === 'professor' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">PROFESSOR</h3>
                    
                    <div className="space-y-1">
                      <Link 
                        to="/professor/review" 
                        onClick={handleItemClick}
                        className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span>Review Arts</span>
                      </Link>

                      <Link 
                        to="/professor/curator-applications" 
                        onClick={handleItemClick}
                        className="flex items-center space-x-3 px-0 py-3 text-foreground hover:text-primary transition-colors"
                      >
                        <GraduationCap className="h-5 w-5" />
                        <span>Check Upgrade to Curator Form</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Logout */}
          {isAuthenticated && (
            <div className="mt-auto">
              <Separator />
              <div className="px-6 py-4">
                <button
                  onClick={() => setLogoutDialogOpen(true)}
                  className="flex items-center space-x-3 px-0 py-3 text-destructive hover:text-destructive/80 transition-colors w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
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
      
      {/* Logout Dialog */}
      <LogoutDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={() => {
          // Handle logout logic here
          console.log('User logged out');
          setLogoutDialogOpen(false);
          onClose();
        }}
      />
    </>
  );
};