import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postRequest } from '../service/requestService';

// Define types for our state
interface Booking {
  id: string;
  tourId: string;
  tourName: string;
  date: string;
  time: string;
  totalPrice: number;
  participants: {
    isChild: boolean;
    age: number;
  }[];
  adults: {
    isChild: boolean;
    age: number;
  };
  children?: {
    age: number;
    price: number;
  }[];
  bookingExtras?: {
    name: string;
    price: number;
  }[];
  transferId: string;
  userId?: string;
}

interface BookingState {
  booking: Booking | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: BookingState = {
  booking: null,
  isLoading: false,
  error: null
};

// Create Booking async thunk
export const createBooking = createAsyncThunk(
  'booking/create',
  async (bookingData: Partial<Booking>, { rejectWithValue }) => {
    try {
      const bookingDataToSend = { ...bookingData };
      console.log("bookingDataSend:", bookingDataToSend);
      
      const response = await postRequest(
        { 
          controller: 'Bookings'
        },
        bookingDataToSend
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Rezervasyon oluşturma başarısız oldu. Lütfen tekrar deneyin.');
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
    },
    setBookingData: (state, action: PayloadAction<Partial<Booking>>) => {
      state.booking = {
        ...state.booking,
        ...action.payload
      } as Booking;
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
  },
});

// Export actions and reducer
export const { clearBooking, setBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;
