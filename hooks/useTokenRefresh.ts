'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '@/redux/authSlice';
import { RootState } from '@/redux/store';
import { AnyAction } from '@reduxjs/toolkit';

/**
 * Token yenileme servisi için hook
 * Token süresi dolmadan önce otomatik olarak yenileme yapar
 * @param refreshBeforeExpiryMS Tokenın son kullanma tarihinden ne kadar önce yenilenecek (ms cinsinden)
 */
const useTokenRefresh = (refreshBeforeExpiryMS: number = 60000) => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  
  // Client-side'da olduğumuzdan emin olalım
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Tek bir selector ile güvenli erişim sağlayalım
  const authState = useSelector((state: RootState) => state?.auth);
  
  // Güvenli değerler oluşturalım
  const isAuthenticated = !!authState?.isAuthenticated;
  const token = authState?.token || null;
  const tokenExpiresAt = authState?.tokenExpiresAt || null;
  const isRefreshing = !!authState?.isRefreshing;
  
  // Zamanlayıcıyı tutmak için ref
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Token yenileme işlemini başlat
  const startRefreshTimer = () => {
    // Client tarafında değilsek işlem yapma
    if (!isClient) return;
    
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    
    if (!isAuthenticated || !token || !tokenExpiresAt) {
      return;
    }
    
    const timeUntilExpiry = tokenExpiresAt - Date.now();
    const refreshTime = Math.max(0, timeUntilExpiry - refreshBeforeExpiryMS);
    
    // Token süresinin dolmasına 1 dakika kaldığında yenile
    console.log(`Token will be refreshed in ${Math.floor(refreshTime / 1000)} seconds`);
    
    refreshTimerRef.current = setTimeout(() => {
      if (isAuthenticated && !isRefreshing) {
        console.log('Refreshing token...');
        dispatch(refreshToken() as unknown as AnyAction);
      }
    }, refreshTime);
  };
  
  // Auth state değiştiğinde timer'ı güncelle
  useEffect(() => {
    // Client tarafında değilsek hiçbir şey yapma
    if (!isClient) return () => {};
    
    startRefreshTimer();
    
    return () => {
      // Cleanup
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [isClient, isAuthenticated, token, tokenExpiresAt, isRefreshing]);
  
  // Sayfa görünürlüğü değiştiğinde (sekme aktif olduğunda) süresi geçmişse tokeni yenile
  useEffect(() => {
    // Client tarafında değilsek hiçbir şey yapma
    if (!isClient) return () => {};
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (
          isAuthenticated && 
          tokenExpiresAt && 
          Date.now() > tokenExpiresAt - refreshBeforeExpiryMS &&
          !isRefreshing
        ) {
          console.log('Page became visible, refreshing token...');
          dispatch(refreshToken() as unknown as AnyAction);
        } else {
          // Yeni bir zamanlayıcı başlat
          startRefreshTimer();
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isClient, isAuthenticated, tokenExpiresAt, isRefreshing]);
  
  // Manuel olarak token yenileme işlemini tetikleyen fonksiyon
  const manualRefresh = () => {
    // Client tarafında değilsek hiçbir şey yapma
    if (!isClient) return;
    
    if (isAuthenticated && !isRefreshing) {
      dispatch(refreshToken() as unknown as AnyAction);
    }
  };
  
  return { manualRefresh };
};

export default useTokenRefresh; 