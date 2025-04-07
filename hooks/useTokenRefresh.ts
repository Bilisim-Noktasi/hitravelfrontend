'use client';

import { useEffect, useRef } from 'react';
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
  
  // State'e daha güvenli erişim için ayrı selector'lar kullanılıyor
  const isAuthenticated = useSelector((state: RootState) => state.auth?.isAuthenticated || false);
  const token = useSelector((state: RootState) => state.auth?.token || null);
  const tokenExpiresAt = useSelector((state: RootState) => state.auth?.tokenExpiresAt || null);
  const isRefreshing = useSelector((state: RootState) => state.auth?.isRefreshing || false);
  
  // Zamanlayıcıyı tutmak için ref
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Token yenileme işlemini başlat
  const startRefreshTimer = () => {
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
    // Client tarafında çalıştığından emin ol
    if (typeof window === 'undefined') {
      return () => {};
    }
    
    startRefreshTimer();
    
    return () => {
      // Cleanup
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [isAuthenticated, token, tokenExpiresAt, isRefreshing]);
  
  // Sayfa görünürlüğü değiştiğinde (sekme aktif olduğunda) süresi geçmişse tokeni yenile
  useEffect(() => {
    // Client tarafında çalıştığından emin ol
    if (typeof window === 'undefined') {
      return () => {};
    }
    
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
  }, [isAuthenticated, tokenExpiresAt, isRefreshing]);
  
  // Manuel olarak token yenileme işlemini tetikleyen fonksiyon
  const manualRefresh = () => {
    if (isAuthenticated && !isRefreshing) {
      dispatch(refreshToken() as unknown as AnyAction);
    }
  };
  
  return { manualRefresh };
};

export default useTokenRefresh; 