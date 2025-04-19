import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGuardRequest, postRequest } from '../service/requestService';
import { deleteCookie, setCookie, getCookie } from 'cookies-next';
import { extractUserFromToken } from '@/utils/auth';

// Define types for state
interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  status?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tokenExpiresAt: number | null;
  isRefreshing: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  tokenExpiresAt: null,
  isRefreshing: false,
};

// Tokenın süresini hesapla (varsayılan olarak 15 dakika)
const calculateTokenExpiry = (token: string): number => {
  try {
    // Token'dan expiry süresini çıkarmaya çalış
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload && payload.exp) {
      return payload.exp * 1000; // UNIX timestamp -> milisaniye
    }
  } catch (error) {
    console.error('Token expiry calculation error:', error);
  }
  
  // Varsayılan olarak şu anki zamana 15 dakika ekle
  return Date.now() + 15 * 60 * 1000;
};

// Check if there's a token saved on page load
const tokenFromCookie = typeof window !== 'undefined' ? getCookie('next-auth.session-token') : null;
const initialUser = tokenFromCookie ? extractUserFromToken(tokenFromCookie.toString()) : null;
const initialExpiry = tokenFromCookie ? calculateTokenExpiry(tokenFromCookie.toString()) : null;

const initialStateWithUser = {
  ...initialState,
  token: tokenFromCookie || null,
  user: initialUser,
  isAuthenticated: !!tokenFromCookie,
  tokenExpiresAt: initialExpiry,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await postRequest({ controller: 'Auth', action: 'Login' }, credentials);
      
      if (!response?.accessToken?.token) throw new Error('Invalid token');
      const token = response.accessToken.token;
      
      // API'den gelen email kullanıcı adını ayıklayalım (yoksa credentials'dan alalım)
      const userEmail = credentials.email;
      
      // Token'dan kullanıcı bilgilerini çıkarmayı deneyelim
      const tokenUser = extractUserFromToken(token, userEmail);
      
      // Kullanıcı bilgisini her kaynaktan birleştirelim
      const user: User = {
        id: tokenUser.id,
        email: userEmail
      };
      
      // Token süresini hesapla
      const tokenExpiresAt = calculateTokenExpiry(token);
      
      // Token bilgilerini kaydediyoruz
      setCookie('next-auth.session-token', token, { 
        maxAge: 30 * 24 * 60 * 60, 
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      // Kullanıcı bilgilerini de localStorage'a kaydedelim
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-token', token);
        localStorage.setItem('auth-user', JSON.stringify(user));
        localStorage.setItem('auth-token-expires', tokenExpiresAt.toString());
      }
      
      return { token, user, tokenExpiresAt };
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue('Login failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };

      const tokenInCookie = getCookie('next-auth.session-token');
      if (!tokenInCookie) {
        throw new Error('No token to refresh');
      }

      const response = await getGuardRequest({
        controller: 'Auth',
        action: 'RefreshToken',
      });

      const newToken = response?.accessToken?.token;
      if (!newToken) {
        throw new Error('Invalid refresh token response');
      }

      const tokenExpiresAt = calculateTokenExpiry(newToken);
      const currentUser = state.auth.user;
      const tokenUser = extractUserFromToken(newToken, currentUser?.email || '');

      const user: User = {
        ...currentUser,
        id: tokenUser.id,
        email: tokenUser.email,
      };

      setCookie('next-auth.session-token', newToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-token', newToken);
        localStorage.setItem('auth-user', JSON.stringify(user));
        localStorage.setItem('auth-token-expires', tokenExpiresAt.toString());
      }

      return { token: newToken, user, tokenExpiresAt };
    } catch (error) {
      console.error('Token refresh error:', error);

      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
        localStorage.removeItem('auth-token-expires');
      }
      deleteCookie('next-auth.session-token');

      return rejectWithValue('Token refresh failed');
    }
  }
);


export const logout = createAsyncThunk('auth/logout', async () => {
  deleteCookie('next-auth.session-token');
  
  // Clear all auth data from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token-expires');
  }
  
  return null;
});

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await postRequest({ controller: 'Auth', action: 'Register' }, credentials);
      
      if (!response?.token) throw new Error('Invalid token');
      const token = response.token;
      
      // API'den dönen kullanıcı bilgisini alalım
      const apiUser = response.user || response.userData || response.userInfo || {};
      
      // API'den gelen email kullanıcı adını ayıklayalım (yoksa credentials'dan alalım)
      const userEmail = apiUser.email || apiUser.mail || credentials.email;
      
      // Token'dan kullanıcı bilgilerini çıkarmayı deneyelim
      const tokenUser = extractUserFromToken(token, userEmail);
      
      // Kullanıcı bilgisini her kaynaktan birleştirelim
      const user: User = {
        id: apiUser.id || apiUser.userId || tokenUser.id || '',
        email: userEmail,
        firstName: apiUser.firstName || apiUser.first_name || tokenUser.firstName || '',
        lastName: apiUser.lastName || apiUser.last_name || tokenUser.lastName || '',
        phoneNumber: apiUser.phoneNumber || apiUser.phone || '',
        status: apiUser.status !== undefined ? apiUser.status : true
      };
      
      // Token süresini hesapla
      const tokenExpiresAt = calculateTokenExpiry(token);
      
      // Token bilgilerini kaydediyoruz
      setCookie('next-auth.session-token', token, { 
        maxAge: 30 * 24 * 60 * 60, 
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      // Kullanıcı bilgilerini de localStorage'a kaydedelim
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-token', token);
        localStorage.setItem('auth-user', JSON.stringify(user));
        localStorage.setItem('auth-token-expires', tokenExpiresAt.toString());
      }
      
      return { token, user, tokenExpiresAt };
    } catch (error) {
      console.error('Register error:', error);
      return rejectWithValue('Register failed');
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateWithUser,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.tokenExpiresAt = null;
      deleteCookie('next-auth.session-token');
      
      // Clear all auth data from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
        localStorage.removeItem('auth-token-expires');
      }
    },
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      
      // isAuthenticated değerini doğrudan payload'dan al ya da varsayılan olarak true olsun
      state.isAuthenticated = action.payload.isAuthenticated !== undefined 
        ? action.payload.isAuthenticated 
        : true;
      
      if (action.payload.tokenExpiresAt) {
        state.tokenExpiresAt = action.payload.tokenExpiresAt;
      } else if (state.token) {
        state.tokenExpiresAt = calculateTokenExpiry(state.token);
      }
      
      // Update localStorage when user is set manually
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-user', JSON.stringify(action.payload.user));
        if (state.tokenExpiresAt) {
          localStorage.setItem('auth-token-expires', state.tokenExpiresAt.toString());
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { 
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.token;
        state.tokenExpiresAt = payload.tokenExpiresAt;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      // Refresh token cases
      .addCase(refreshToken.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.token;
        state.tokenExpiresAt = payload.tokenExpiresAt;
      })
      .addCase(refreshToken.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.tokenExpiresAt = null;
        state.error = payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.tokenExpiresAt = null;
      })
      .addCase(register.pending, (state) => { 
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.token;
        state.tokenExpiresAt = payload.tokenExpiresAt;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { clearAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
