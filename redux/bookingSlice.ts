import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postRequest } from '../service/requestService';
import axios from 'axios';
import { RootState } from './store';

// Define types for our state
interface Booking {
  id: string;
  tourId: string;
  tourName: string;
  date: string;
  time: string;
  totalPrice: number;
  adults: {
    count: number;
    price: number;
  };
  children?: {
    age: number;
    price: number;
  }[];
  tourExtras?: {
    name: string;
    price: number;
  }[];
  transfer?: {
    id: string;
    cityId: string;
    cityName: string;
    stateId: string;
    stateName: string;
    price: number;
  } | null;
  customerInfo?: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    identityNumber?: string;
    note?: string;
  };
  billingInfo?: {
    companyName: string;
    taxId: string;
    taxOffice: string;
    billingAddress: string;
  } | null;
  status: string;
  currency: string;
}

interface BookingState {
  booking: Booking | null;
  isLoading: boolean;
  error: string | null;
  paymentUrl: string | null;
}

// Initial state
const initialState: BookingState = {
  booking: null,
  isLoading: false,
  error: null,
  paymentUrl: null
};

// Create Booking async thunk
export const createBooking = createAsyncThunk(
  'booking/create',
  async (bookingData: Partial<Booking>, { rejectWithValue, getState }) => {
    try {
      // Auth state'inden token'ı al
      const state = getState() as RootState;
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('Oturum süreniz dolmuş olabilir. Lütfen tekrar giriş yapın.');
      }
      
      const response = await axios.post(
        'https://api.hitravel.com.tr/api/Bookings',
        bookingData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      // Token ile ilgili hatalar için özel kontrol
      if (error.response?.status === 401) {
        return rejectWithValue('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
      } else if (error.response?.status === 403) {
        return rejectWithValue('Bu işlem için yetkiniz bulunmuyor.');
      }
      return rejectWithValue(error.response?.data?.message || 'Booking creation failed. Please try again.');
    }
  }
);

// Process payment async thunk
export const processPayment = createAsyncThunk(
  'booking/processPayment',
  async (paymentData: { bookingId: string; paymentMethod: string; cardDetails?: any }, { rejectWithValue, getState }) => {
    try {
      // Auth state'inden token'ı al
      const state = getState() as RootState;
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('Oturum süreniz dolmuş olabilir. Lütfen tekrar giriş yapın.');
      }
      
      const response = await axios.post(
        'https://api.hitravel.com.tr/api/Payments',
        paymentData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      // Token ile ilgili hatalar için özel kontrol
      if (error.response?.status === 401) {
        return rejectWithValue('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
      } else if (error.response?.status === 403) {
        return rejectWithValue('Bu işlem için yetkiniz bulunmuyor.');
      }
      return rejectWithValue(error.response?.data?.message || 'Payment processing failed. Please try again.');
    }
  }
);

// Booking slice
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearBooking: (state) => {
      state.booking = null;
      state.error = null;
      state.paymentUrl = null;
    },
    setBookingData: (state, action: PayloadAction<Partial<Booking>>) => {
      state.booking = { ...state.booking, ...action.payload } as Booking;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create booking reducers
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Process payment reducers
      .addCase(processPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentUrl = action.payload.paymentUrl || null;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearBooking, setBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;
