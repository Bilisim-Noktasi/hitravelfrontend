import { configureStore } from "@reduxjs/toolkit";
import villaSlice from './villaSlice';
import tourSlice from './tourSlice';
// import adminSlice from './adminSlice';
import currencyRate from './currencyRate';
// import searchSlice from './searchSlice';
import tourCategorySlice from './tourCategorySlice';
import tourSubCategorySlice from './tourSubCategorySlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        villa: villaSlice,
        tour: tourSlice,
        // admin: adminSlice,
        currencyRate: currencyRate,
        // search: searchSlice,
        tourCategory: tourCategorySlice,
        tourSubCategory: tourSubCategorySlice,
        auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;