'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { login, logout } from '../redux/authSlice';
import { useEffect, useState } from 'react';

// Kullanıcı tipini belirleyelim
interface User {
  email: string;
  firstName?: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  status: boolean;
}

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  
  // Client tarafında olduğumuzdan emin olalım
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // State'e daha güvenli erişim için ayrı selector'lar kullanılıyor
  // Client-side'da değilsek undefined dönebilir, o yüzden fallback değerleri kullanıyoruz
  const authState = useSelector((state: RootState) => state?.auth);
  
  const user = authState?.user || null;
  const token = authState?.token || null;
  const isAuthenticated = !!authState?.isAuthenticated;
  const isLoading = !!authState?.isLoading;
  const error = authState?.error || null;

  // Giriş işlemi
  const handleLogin = (credentials: { email: string; password: string }) =>
    dispatch(login(credentials)).unwrap();

  // Çıkış işlemi
  const handleLogout = () => {
    dispatch(logout());
  };

  // İstemci tarafında değilsek, güvenli varsayılan değerler döndür
  if (!isClient) {
    return {
      user: null,
      email: "Kullanıcı",
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: handleLogin,
      logout: handleLogout,
    };
  }
  
  // Kullanıcı objesinin mevcut olup olmadığını kontrol edelim ve varsayılan değer sağlayalım
  const safeUser = user || null;
  const safeEmail = safeUser?.email || "Kullanıcı";

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
