'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import initializeAuth from '@/middleware/authMiddleware';

/**
 * AuthProvider component that initializes authentication state
 * This component should be included in the app's layout
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize authentication when the app loads
    const init = async () => {
      try {
        await initializeAuth(dispatch);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsInitialized(true);
      }
    };
    
    init();
  }, [dispatch]);

  // Optionally, you can show a loading indicator while auth is initializing
  if (!isInitialized) {
    return null; // Or return a loading spinner
  }

  return <>{children}</>;
};

export default AuthProvider; 