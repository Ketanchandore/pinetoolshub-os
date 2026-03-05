import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <SEOHead
        title="Page Not Found — 404 Error"
        description="The page you're looking for doesn't exist. Return to PineToolsHub homepage to access 30+ free PDF tools, AI file manager, image compressor and content writer."
        noindex
      />
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page <code className="text-sm bg-muted px-2 py-1 rounded">{location.pathname}</code> doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <Home className="h-4 w-4" /> Go to Dashboard
            </Button>
          </Link>
          <Link to="/pdf-tools">
            <Button variant="outline" className="gap-2">
              PDF Tools
            </Button>
          </Link>
          <Link to="/blog">
            <Button variant="outline" className="gap-2">
              Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
