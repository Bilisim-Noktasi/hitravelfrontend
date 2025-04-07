import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../service/requestService';
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
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await postRequest({ controller: 'Auth', action: 'Login' }, credentials);
      if (!response?.accessToken?.token) throw new Error('Invalid token');
      const token = response.accessToken.token;
      setCookie('next-auth.session-token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
      return { token, user: extractUserFromToken(token, credentials.email) };
    } catch {
      return rejectWithValue('Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  deleteCookie('next-auth.session-token');
  return null;
});

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await postRequest({ controller: 'Auth', action: 'Register' }, credentials);
      if (!response?.token) throw new Error('Invalid token');
      const token = response.token;
      setCookie('next-auth.session-token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
      return { token, user: extractUserFromToken(token, credentials.email) };
    } catch {
      return rejectWithValue('Register failed');
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      deleteCookie('next-auth.session-token');
    },
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(register.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { clearAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
