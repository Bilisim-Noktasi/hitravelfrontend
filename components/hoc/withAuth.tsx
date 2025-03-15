'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Higher-Order Component (HOC) to protect routes that require authentication
 * Redirects to home page if user is not authenticated
 * @param Component - The component to be protected
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      // Redirect to home if not authenticated and not loading
      if (!isLoading && !isAuthenticated) {
        // Extract locale from the current path
        const locale = pathname.split('/')[1];
        router.push(`/${locale}`);
      }
    }, [isAuthenticated, isLoading, router, pathname]);

    // Show loading state while checking authentication
    if (isLoading) {
      return (
        <div className="container mt-50 mb-50">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      );
    }

    // Only render the component if authenticated
    return isAuthenticated ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth; 