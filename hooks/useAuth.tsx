import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { login, logout } from '../redux/authSlice';
import { useCallback } from 'react';
import { deleteCookie } from 'cookies-next';

/**
 * Custom hook for authentication functionality
 * Provides access to auth state and authentication methods
 */
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  /**
   * Login function
   * @param credentials - User credentials (email and password)
   */
  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      return await dispatch(login(credentials)).unwrap();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  /**
   * Logout function
   */
  const handleLogout = useCallback(() => {
    // Remove the auth token from cookies
    deleteCookie('next-auth.session-token');
    
    // Dispatch the logout action to update the Redux store
    dispatch(logout());
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth; 