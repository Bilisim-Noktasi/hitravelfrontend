import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getGuardRequest, postRequest } from '../service/requestService';
import { deleteCookie, setCookie } from 'cookies-next';

// Define types for our state
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Login async thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // First request to get the token
      const loginResponse = await postRequest(
        { controller: 'Auth', action: 'Login' },
        credentials
      );
      
      // Store the token in a cookie for subsequent requests
      const token = loginResponse.accessToken.token;
      setCookie('next-auth.session-token', token);
      
      // Second request to get user details
      const userResponse = await getGuardRequest({
        controller: 'Users',
        action: 'GetFromAuth',
      });
      
      return {
        token,
        user: userResponse,
      };
    } catch (error) {
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      deleteCookie('next-auth.session-token');
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

// Export actions and reducer
export const { handleLogout, setCredentials } = authSlice.actions;
export default authSlice.reducer;

