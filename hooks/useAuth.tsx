import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { login, logout } from '../redux/authSlice';
import { useEffect } from 'react';

// Kullanıcı tipini belirleyelim
interface User {
  email: string;
  name?: string;
  // Diğer kullanıcı özellikleri
}

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // Giriş işlemi
  const handleLogin = (credentials: { email: string; password: string }) =>
    dispatch(login(credentials)).unwrap();

  // Çıkış işlemi
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isLoading) return; // Eğer isLoading true ise, herhangi bir işlem yapılmasın.
  }, [isLoading]); // sadece isLoading'e bağlı olarak trigger yapıyoruz.

  // Kullanıcı objesinin mevcut olup olmadığını kontrol edelim ve varsayılan değer sağlayalım
  const safeUser = user || null; // Eğer user objesi null ise, null olarak ayarla
  const safeEmail = safeUser?.email || "Kullanıcı"; // email'e güvenli erişim

  return {
    user: safeUser,
    email: safeEmail,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth;
