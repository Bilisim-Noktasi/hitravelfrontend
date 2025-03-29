import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../service/requestService';

// Ödeme verisi tipi
interface PaymentData {
  bookingId: string;
  paymentMethod: number;
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  cardHolderName?: string;
}

// Redux state tipi
interface PaymentState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// Başlangıç state'i
const initialState: PaymentState = {
  isLoading: false,
  error: null,
  success: false
};

// Ödeme API isteği
export const processPayment = createAsyncThunk(
  'payment/process',
  async (paymentData: PaymentData, { rejectWithValue }) => {
    console.log("Gönderilen ödeme verisi:", paymentData);
    try {
      const response = await postRequest(
        { controller: 'Payments' }, 
        paymentData
      );
      console.log("API'den dönen yanıt:", response);

      // Yanıt null veya içeriği boş ise hata fırlat
      if (!response || !response.content) {
        return rejectWithValue('API yanıtında içerik bulunamadı');
      }

      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Ödeme işlemi başarısız oldu. Lütfen daha sonra tekrar deneyiniz.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Redux Slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

// Export işlemleri
export const { clearError } = paymentSlice.actions;
export default paymentSlice.reducer;
