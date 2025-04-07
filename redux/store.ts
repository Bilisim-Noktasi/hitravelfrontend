import { configureStore } from "@reduxjs/toolkit";
import villaSlice from './villaSlice';
import tourSlice from './tourSlice';
// import adminSlice from './adminSlice';
import currencyRate from './currencyRate';
// import searchSlice from './searchSlice';
import tourCategorySlice from './tourCategorySlice';
import tourSubCategorySlice from './tourSubCategorySlice';
import authSlice from './authSlice';
import bookingSlice from './bookingSlice';
import paymentSlice from './paymentSlice';
import blogSlice from './blogSlice';

export const store = configureStore({
    reducer: {
        villa: villaSlice,
        tour: tourSlice,
        // admin: adminSlice,
        currencyRate: currencyRate,
        // search: searchSlice,
        tourCategory: tourCategorySlice,
        tourSubCategory: tourSubCategorySlice,
        auth: authSlice,
        booking: bookingSlice,
        payment: paymentSlice,
        blog: blogSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;