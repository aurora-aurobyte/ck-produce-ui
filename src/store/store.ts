import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/authSlice';
import customerReducer from './features/customerSlice';
import productReducer from './features/productSlice';
import orderReducer from './features/orderSlice';
import invoiceReducer from './features/invoiceSlice';
import categoryReducer from './features/categorySlice';
import purchaseReducer from './features/purchaseSlice';
import toBuyReducer from './features/toBuySlice';
import pendingPaymentReducer from './features/pendingPaymentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        order: orderReducer,
        invoice: invoiceReducer,
        category: categoryReducer,
        purchase: purchaseReducer,
        toBuy: toBuyReducer,
        pendingPayment: pendingPaymentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
