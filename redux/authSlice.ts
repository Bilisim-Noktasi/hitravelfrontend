import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postRequest } from '../service/requestService';
import { deleteCookie, setCookie, getCookie } from 'cookies-next';

// Define types for our state
interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  status?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// LOCALSTORAGE KULLANIMI
const USER_INFO_KEY = 'hitravel_user_info';

// Kullanıcı bilgilerini localStorage'da sakla
const saveUserToStorage = (user: User | null) => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_INFO_KEY);
    }
  }
};

// Kullanıcı bilgilerini localStorage'dan al
const getUserFromStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem(USER_INFO_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (error) {
        console.error('User bilgisi localStorage\'dan okunamadı:', error);
      }
    }
  }
  return null;
};

// Yardımcı fonksiyonlar
const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    try {
      const token = getCookie('next-auth.session-token') as string;
      // Token geçerli bir string mi?
      if (token && typeof token === 'string' && token.length > 0) {
        return token;
      }
    } catch (error) {
      console.error('Token cookie\'den okunamadı:', error);
    }
  }
  return null;
};

/**
 * Token içeriğini decode eder (JWT)
 */
const decodeToken = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token decode hatası:', error);
    return null;
  }
};

// Token'dan kullanıcı bilgilerini çıkart
const extractUserFromToken = (token: string, email: string = ''): User => {
  const tokenPayload = decodeToken(token);

  // Token payload'dan bilgileri çıkartmaya çalış
  // JWT standartlarına göre ve yaygın claim adlarını desteleyecek şekilde
  const extractedEmail = tokenPayload?.email || tokenPayload?.sub || email || '';
  const userId = tokenPayload?.id || tokenPayload?.userId || tokenPayload?.nameid || tokenPayload?.sub;
  const firstName = tokenPayload?.name || tokenPayload?.given_name || tokenPayload?.firstName || '';
  const lastName = tokenPayload?.surname || tokenPayload?.family_name || tokenPayload?.lastName || '';

  return {
    id: userId,
    email: extractedEmail,
    firstName: firstName,
    lastName: lastName,
    status: true
  };
};

// Initial state - localStorage ve cookie'den başlangıç durumunu belirle
const storedToken = getStoredToken();
const storedUser = getUserFromStorage();

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken && !!storedUser,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const loginResponse = await postRequest(
        { controller: 'Auth', action: 'Login' },
        credentials
      );

      if (!loginResponse || !loginResponse.accessToken || !loginResponse.accessToken.token) {
        return rejectWithValue('API geçerli bir token döndürmedi');
      }

      // Token'ı sakla (cookie veya localStorage)
      const token = loginResponse.accessToken.token;
      setCookie('next-auth.session-token', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 gün
        path: '/',
      });

      // Token'dan kullanıcı bilgilerini çıkart
      const userInfo = extractUserFromToken(token, credentials.email);

      // Kullanıcı bilgilerini localStorage'a kaydet
      saveUserToStorage(userInfo);

      return {
        token,
        user: userInfo,
      };
    } catch (error) {
      console.error('Login failed');
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    // Cookie'den token'ı sil
    deleteCookie('next-auth.session-token');

    // localStorage'dan kullanıcı bilgilerini sil
    saveUserToStorage(null);

    return true;
  }
);

// Register thunk
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const registerResponse = await postRequest(
        { controller: 'Auth', action: 'Register' },
        credentials
      );

      console.log('Register Raw Response:', registerResponse);

      if (!registerResponse.token) {
        return rejectWithValue('API geçerli bir toke döndürmedi');
      }
      // Token'ı sakla (cookie veya localStorage)
      const token = registerResponse.token;
      setCookie('next-auth.session-token', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 gün
        path: '/',
      });

      // Token'dan kullanıcı bilgilerini çıkart
      const userInfo = extractUserFromToken(token, credentials.email);

      // Kullanıcı bilgilerini localStorage'a kaydet
      saveUserToStorage(userInfo);

      return {
        token,
        user: userInfo,
      };

    } catch (error) {
      console.error('Register failed');
      return rejectWithValue('Register failed. Please check your credentials.');
    }
  }
)

// Initialize auth - Sayfa yüklendiğinde veya yenilendiğinde çağırılır
export const initAuth = createAsyncThunk(
  'auth/initAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = getStoredToken();

      if (!token) {
        return rejectWithValue('No token found');
      }

      // localStorage'dan kullanıcı bilgilerini alın
      let userInfo = getUserFromStorage();

      // Eğer localStorage'da bilgi yoksa token'dan çıkartmayı deneyin
      if (!userInfo) {
        userInfo = extractUserFromToken(token);

        // Email yoksa geçersiz token
        if (!userInfo.email) {
          console.log('Token geçersiz (email bulunamadı), oturum kapatılıyor');
          // Temizlik
          deleteCookie('next-auth.session-token');
          saveUserToStorage(null);
          return rejectWithValue('Invalid token');
        }

        // Kullanıcı bilgilerini localStorage'a kaydedin
        saveUserToStorage(userInfo);
      }

      console.log('Oturum başarıyla yenilendi');
      return {
        token,
        user: userInfo
      };
    } catch (error) {
      console.error('Auth initialization failed:', error);

      // Temizlik işlemleri
      deleteCookie('next-auth.session-token');
      saveUserToStorage(null);

      return rejectWithValue('Session expired or invalid');
    }
  }
);

// Helper function to add auth header to requests
export const addAuthHeader = (config: any) => {
  const token = getStoredToken();
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    };
  }
  return config;
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Cookie'de token'ı sakla
      setCookie('next-auth.session-token', action.payload.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 gün
        path: '/',
      });

      // localStorage'da kullanıcı bilgilerini sakla
      saveUserToStorage(action.payload.user);
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Cookie'den token'ı sil
      deleteCookie('next-auth.session-token');

      // localStorage'dan kullanıcı bilgilerini sil
      saveUserToStorage(null);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login işlemi
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout işlemini ekle
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        // Logout başarısız olsa bile state'i temizle
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(initAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(initAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('Register Success:', action.payload);
      
        if (!action.payload || !action.payload.token) {
          console.error('Payload token not found:', action.payload);
          return;
        }
      
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || null;  // user yoksa hata vermesin
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;
