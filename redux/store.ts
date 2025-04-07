import { configureStore } from "@reduxjs/toolkit";
import villaSlice from './villaSlice';
import tourSlice from './tourSlice';
// import adminSlice from './adminSlice';
import currencyRate from './currencyRate';
// import searchSlice from './searchSlice';
import tourCategorySlice from './tourCategorySlice';
import tourSubCategorySlice from './tourSubCategorySlice';
import authSlice from './authSlice';
import bookingSlice from './bookingSlice';
import paymentSlice from './paymentSlice';
import blogSlice from './blogSlice';
import { User } from '@/utils/auth';

// İstemci tarafında olup olmadığımızı kontrol et
const isClient = typeof window !== 'undefined';

// Redux için başlangıç durumunu oluştur
const createPreloadedState = () => {
  // Sunucu tarafında boş bir state başlat
  if (!isClient) return {};
  
  try {
    // İstemci tarafında localStorage'dan auth verilerini almaya çalış
    const token = localStorage.getItem('auth-token');
    const userJson = localStorage.getItem('auth-user');
    const expiryStr = localStorage.getItem('auth-token-expires');
    
    // Eğer bu veriler mevcutsa, auth state'i hazırla
    if (token && userJson && expiryStr) {
      const user = JSON.parse(userJson) as User;
      const tokenExpiresAt = parseInt(expiryStr, 10);
      
      return {
        auth: {
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          tokenExpiresAt,
          isRefreshing: false
        }
      };
    }
  } catch (error) {
    console.error("Redux state hydration error:", error);
  }
  
  return {};
};

// Redux store yapılandırması
export const store = configureStore({
    reducer: {
        villa: villaSlice,
        tour: tourSlice,
        // admin: adminSlice,
        currencyRate: currencyRate,
        // search: searchSlice,
        tourCategory: tourCategorySlice,
        tourSubCategory: tourSubCategorySlice,
        auth: authSlice,
        booking: bookingSlice,
        payment: paymentSlice,
        blog: blogSlice,
    },
    // Serializable check'i devre dışı bırakarak hydration sorunlarını önleyelim
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;