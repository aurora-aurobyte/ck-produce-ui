import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './features/customerSlice';
import productReducer from './features/productSlice';
import orderReducer from './features/orderSlice';
import invoiceReducer from './features/invoiceSlice';
import categoryReducer from './features/categorySlice';

export const store = configureStore({
    reducer: {
        customer: customerReducer,
        product: productReducer,
        order: orderReducer,
        invoice: invoiceReducer,
        category: categoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
