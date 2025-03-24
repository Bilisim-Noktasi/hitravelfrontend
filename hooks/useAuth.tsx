import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { login, logout, setCredentials, clearAuth, initAuth } from '../redux/authSlice';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      return await dispatch(login(credentials)).unwrap();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const setAuth = (userData: { user: any; token: string }) => {
    dispatch(setCredentials(userData));
  };

  const clearAuthState = () => {
    dispatch(clearAuth());
  };

  useEffect(() => {
    if (isLoading) return;

    const hasToken = getCookie('next-auth.session-token');
    if (!isAuthenticated && hasToken) {
      dispatch(initAuth());
    }
  }, [dispatch, isAuthenticated, isLoading]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    setAuth,
    clearAuth: clearAuthState,
  };
};

export default useAuth;
