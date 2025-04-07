'use client';

import { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { extractUserFromToken } from '@/utils/auth';
import { User } from '@/utils/auth';
import useTokenRefresh from '@/hooks/useTokenRefresh';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  
  // Token yenileme servisini başlat (15 dakika = 900000 ms, 1 dakika önce yenilesin = 60000 ms)
  // Backend token süresi 15 dakika ise, 14 dakika sonra yenileme yapacak şekilde ayarlayalım
  const { manualRefresh } = useTokenRefresh(60000); // 1 dakika önce yenile

  useEffect(() => {
    const initAuth = () => {
      // First get token from cookie
      let token = getCookie('next-auth.session-token') as string | null;
      
      // If not in cookie, check localStorage
      if (!token && typeof window !== 'undefined') {
        const localToken = localStorage.getItem('auth-token');
        
        // If found in localStorage, add to cookie too
        if (localToken) {
          token = localToken;
          setCookie('next-auth.session-token', localToken, { 
            maxAge: 30 * 24 * 60 * 60, 
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
          });
        }
      }
      
      if (token) {
        try {
          // Önce localStorage'dan kullanıcı bilgilerini almayı deneyelim
          let user: User | null = null;
          let tokenExpiresAt: number | null = null;
          
          if (typeof window !== 'undefined') {
            // Kullanıcı bilgilerini localStorage'dan al
            const userJson = localStorage.getItem('auth-user');
            if (userJson) {
              try {
                user = JSON.parse(userJson);
              } catch (e) {
                console.error('Error parsing user from localStorage:', e);
              }
            }
            
            // Token süresini localStorage'dan al
            const expiryStr = localStorage.getItem('auth-token-expires');
            if (expiryStr) {
              try {
                tokenExpiresAt = parseInt(expiryStr, 10);
              } catch (e) {
                console.error('Error parsing token expiry:', e);
              }
            }
          }
          
          // localStorage'da yoksa token'dan çıkarmayı deneyelim
          if (!user) {
            user = extractUserFromToken(token);
            
            // Kullanıcı bilgilerini localStorage'a kaydedelim
            if (user && typeof window !== 'undefined') {
              localStorage.setItem('auth-user', JSON.stringify(user));
            }
          }
          
          // Token süresini hesapla (localStorage'da yoksa)
          if (!tokenExpiresAt && typeof window !== 'undefined') {
            try {
              // Token payload'ından exp bilgisini çıkarmaya çalış
              const payload = JSON.parse(atob(token.split('.')[1]));
              if (payload && payload.exp) {
                tokenExpiresAt = payload.exp * 1000; // UNIX timestamp -> milisaniye
              } else {
                // Varsayılan olarak 15 dakika sonrasını ayarla
                tokenExpiresAt = Date.now() + 15 * 60 * 1000;
              }
              localStorage.setItem('auth-token-expires', tokenExpiresAt.toString());
            } catch (e) {
              console.error('Error calculating token expiry:', e);
              // Varsayılan olarak 15 dakika sonrasını ayarla
              tokenExpiresAt = Date.now() + 15 * 60 * 1000;
              localStorage.setItem('auth-token-expires', tokenExpiresAt.toString());
            }
          }
          
          // Redux'a kullanıcı bilgilerini ayarla
          if (user) {
            dispatch(setUser({ token, user, tokenExpiresAt }));
          }
          
          // TokenStorage'a kaydet (senkronizasyon için)
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth-token', token);
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
        }
      }
    };

    // Check auth state when page loads
    initAuth();

    // Check token when tab visibility changes (returning to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        initAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen for localStorage changes (for multi-tab login/logout)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'auth-token' || event.key === 'auth-user') {
        initAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
