
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-transparent px-6">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-primary/10">
          <span className="text-6xl font-bold gradient-text">404</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-3">Page not found</h1>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Don't worry, it happens to the best of us.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-border/50 px-4 py-2.5 text-sm font-medium transition-all hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back
          </Link>
          
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium transition-all hover:brightness-110"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
