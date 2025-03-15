'use client';

import { useTranslations } from 'next-intl';
import UserProfile from '../../../components/elements/UserProfile';
import withAuth from '../../../components/hoc/withAuth';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Profile page component
 * Protected by withAuth HOC to ensure only authenticated users can access it
 */
function ProfilePage() {
  const t = useTranslations('Common');
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to home if not authenticated
  useEffect(() => {
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

  // Only render the profile if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="main">
      <div className="container mt-50 mb-50">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="page-content">
              <h1 className="text-center mb-30"></h1>
              <UserProfile />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Export the component directly without withAuth HOC
// We're handling authentication checks directly in the component
export default ProfilePage; 