import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postRequest } from '../service/requestService';

// Define types for our state
interface Booking {
  id: string;
  userId: string;
  date: string;
  time: string;
  status: string;
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
  error: null,
};

// Create Booking async thunk
export const createBooking = createAsyncThunk(
  'booking/create',
  async (bookingData: { userId: string; date: string; time: string }, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        { controller: 'Booking', action: 'Create' },
        bookingData
      );
      return response;
    } catch (error) {
      return rejectWithValue('Booking creation failed. Please try again.');
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
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

// Export actions and reducer
export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
