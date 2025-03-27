import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postRequest, postGuardRequest } from '../service/requestService';
import { RootState } from './store';

// Tip tanımlamaları
interface CardDetails {
  cardHolderName: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
}

interface BillingInfo {
  companyName: string;
  taxId: string;
  taxOffice: string;
  billingAddress: string;
}

// API için ödeme veri tipleri
enum PaymentMethod {
  CreditCard = 1,
  BankTransfer = 2,
  Cash = 3,
  Prepayment = 4,
}

enum PaymentStatus {
  Pending = 1,
  Completed = 2,
  Failed = 3,
  Refunded = 4,
}

// API'ye gönderilecek ödeme verisi
interface PaymentApiData {
  bookingId: string;
  amount: number;
  currency: string;
  paymentDate?: string;
  paymentMethod: PaymentMethod;
  paymentStatus?: PaymentStatus;
  transactionId?: string;
  paymentDetails?: string;
}

// UI'dan gelen ödeme verisi
interface PaymentData {
  bookingId: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  cardDetails?: CardDetails;
  billingInfo?: BillingInfo | null;
}

interface PaymentState {
  paymentUrl: string | null;
  paymentId: string | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// Initial state
const initialState: PaymentState = {
  paymentUrl: null,
  paymentId: null,
  isLoading: false,
  error: null,
  success: false
};

// UI'dan gelen ödeme verisini API formatına dönüştür
const mapToApiFormat = (paymentData: PaymentData): PaymentApiData => {
  // PaymentMethod'u string'den enum'a çevir
  let paymentMethodEnum: PaymentMethod;
  
  switch (paymentData.paymentMethod) {
    case 'creditCard':
      paymentMethodEnum = PaymentMethod.CreditCard;
      break;
    case 'bankTransfer':
      paymentMethodEnum = PaymentMethod.BankTransfer;
      break;
    case 'cash':
      paymentMethodEnum = PaymentMethod.Cash;
      break;
    case 'prepayment':
      paymentMethodEnum = PaymentMethod.Prepayment;
      break;
    default:
      paymentMethodEnum = PaymentMethod.CreditCard;
  }
  
  // Kart detaylarını ve fatura bilgilerini JSON string olarak ekle
  let paymentDetails = '';
  
  if (paymentData.cardDetails || paymentData.billingInfo) {
    paymentDetails = JSON.stringify({
      cardDetails: paymentData.cardDetails,
      billingInfo: paymentData.billingInfo
    });
  }
  
  return {
    bookingId: paymentData.bookingId,
    amount: paymentData.amount,
    currency: paymentData.currency,
    paymentDate: new Date().toISOString(),
    paymentMethod: paymentMethodEnum,
    paymentStatus: PaymentStatus.Pending,
    paymentDetails: paymentDetails
  };
};

// Ödeme işlemini gerçekleştiren thunk
export const processPayment = createAsyncThunk(
  'payment/process',
  async (paymentData: PaymentData, { rejectWithValue }) => {
    try {
      // UI verisini API formatına dönüştür
      const apiPaymentData = mapToApiFormat(paymentData);
      
      // Ödeme yöntemine göre API isteği yapılır
      const response = await postRequest(
        { 
          controller: 'Payments'
        },
        apiPaymentData
      );
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.');
    }
  }
);

// Ödeme durumunu kontrol eden thunk
export const checkPaymentStatus = createAsyncThunk(
  'payment/checkStatus',
  async (paymentId: string, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        { 
          controller: 'Payments',
          action: 'status',
          id: paymentId
        },
        {}
      );
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ödeme durumu kontrol edilemedi.');
    }
  }
);

// Payment slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPayment: (state) => {
      state.paymentUrl = null;
      state.paymentId = null;
      state.error = null;
      state.success = false;
    },
    setPaymentSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Ödeme işlemi
      .addCase(processPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.paymentUrl = action.payload.paymentUrl || null;
        state.paymentId = action.payload.id || null;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Ödeme durumu kontrolü
      .addCase(checkPaymentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkPaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // Ödeme durumuna göre gerekli işlemler yapılabilir
        if (action.payload.paymentStatus === PaymentStatus.Completed) {
          state.success = true;
        }
      })
      .addCase(checkPaymentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions ve reducer'ı export et
export const { clearPayment, setPaymentSuccess, setError } = paymentSlice.actions;
export default paymentSlice.reducer; 