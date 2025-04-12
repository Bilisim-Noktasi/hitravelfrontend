import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Currency tipini enum olarak tanımlıyoruz
export enum Currency {
  USD = 'USD',
  TL = 'TL',
  EUR = 'EUR',
}

// Initial state
interface CurrencyState {
  currency: Currency;
}

const initialState: CurrencyState = {
  currency: Currency.USD, // Varsayılan kur USD
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
