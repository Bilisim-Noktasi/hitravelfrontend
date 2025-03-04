import { configureStore } from "@reduxjs/toolkit";
import villaSlice from './villaSlice';
import tourSlice from './tourSlice';
import adminSlice from './adminSlice';
import currencyRate from './currencyRate';
import searchSlice from './searchSlice'

export const store = configureStore({
    reducer: {
        villa: villaSlice,
        tour: tourSlice,
        admin: adminSlice,
        currencyRate: currencyRate,
        search: searchSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;