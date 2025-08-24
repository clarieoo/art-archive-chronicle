import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="relative">
          <h1 className="text-8xl font-bold text-primary/20 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🎨</span>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
          >
            Return to Home
          </a>
          <a 
            href="/gallery" 
            className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md font-medium transition-colors"
          >
            Browse Gallery
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
