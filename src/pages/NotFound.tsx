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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-foreground">Art Gallery</div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">Gallery</a>
              <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary/10 leading-none select-none">404</h1>
          </div>

          {/* Main Message */}
          <div className="space-y-4 mb-8">
            <h2 className="text-4xl font-bold text-foreground">
              Oops! Page not found
            </h2>
            <p className="text-xl text-muted-foreground">
              We can't seem to find the page you're looking for.
            </p>
            <p className="text-base text-muted-foreground">
              The page you requested could not be found. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-foreground mb-2">Error Details:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Error Code: 404</li>
              <li>• Requested URL: {location.pathname}</li>
              <li>• Timestamp: {new Date().toLocaleString()}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </a>
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-8 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </div>

          {/* Help Section */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Still need help? Try these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <a href="/gallery" className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors">Gallery</a>
              <a href="/about" className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors">About Us</a>
              <a href="/contact" className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors">Contact</a>
              <a href="/signin" className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors">Sign In</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
