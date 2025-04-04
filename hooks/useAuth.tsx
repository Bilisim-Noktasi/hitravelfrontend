import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { login, logout } from '../redux/authSlice';
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = (credentials: { email: string; password: string }) =>
    dispatch(login(credentials)).unwrap();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isLoading) return;

  }, [dispatch, token, isLoading]);

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
