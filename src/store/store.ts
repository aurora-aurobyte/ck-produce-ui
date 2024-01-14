import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './features/customerSlice';
import productReducer from './features/productSlice';

export const store = configureStore({
    reducer: {
        customer: customerReducer,
        product: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
