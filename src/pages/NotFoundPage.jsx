import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import './NotFoundPage.css';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 — Page Not Found | Perfect Fit Factory';
  }, []);

  return (
    <div className="not-found-page">
      <div className="not-found-inner">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-sub">
          The page you're looking for doesn't exist or has been moved.
          Head back to the shop or home page to continue browsing.
        </p>
        <div className="not-found-ctas">
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            Go Home
          </Link>
          <Link to="/shop" className="btn btn-outline">
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
