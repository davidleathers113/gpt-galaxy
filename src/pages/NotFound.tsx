
import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button"; // Added Button

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Added navigate hook

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-transparent px-6">
      <div className="text-center max-w-md mx-auto">
        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-primary/10">
          <span className="text-6xl font-bold gradient-text select-none">404</span>
        </div>

        <h1 className="text-3xl font-bold mb-3">Page not found</h1>

        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Don't worry, it happens to the best of us.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)} // Use navigate(-1)
            className="w-full sm:w-auto" // Apply width classes to Button
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back
          </Button>

          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4 mr-2" />
            Return to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
