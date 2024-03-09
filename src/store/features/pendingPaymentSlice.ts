import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pendingPaymentService from 'src/http/services/pendingPaymentService';
import { Customer } from './customerSlice';
import { Invoice } from './invoiceSlice';

export interface PendingPayment {
    customerId: string;
    customer?: Customer;
    previousBalance: number;
    invoiceBalance: number;
    invoices: Invoice[];
}

interface PendingPaymentState {
    loading: boolean;
    pendingPayments: PendingPayment[];
    error: string;
}

const initialState: PendingPaymentState = {
    loading: true,
    pendingPayments: [],
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchPendingPayments = createAsyncThunk<PendingPayment[]>(
    'pendingPayment/fetchPendingPayments',
    () => pendingPaymentService.getPendingPayments()
);

export const pendingPaymentSlice = createSlice({
    name: 'pendingPayment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPendingPayments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPendingPayments.fulfilled, (state, action) => {
            state.loading = false;
            state.pendingPayments = action.payload;
            state.error = '';
        });
        builder.addCase(fetchPendingPayments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
        });
    },
});

export default pendingPaymentSlice.reducer;
