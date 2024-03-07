import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Customer } from './customerSlice';
import { Invoice } from './invoiceSlice';

export interface PendingPayment {
    customerId: string;
    customer?: Customer;
    previousBalance: number;
    invoiceBalance: number;
}

interface PendingPaymentState {
    loading: boolean;
    pendingPayments: PendingPayment[];
    error: string;
}

const initialState: PendingPaymentState = {
    loading: true,
    pendingPayments: JSON.parse(localStorage.getItem('pendingPayments') || '[]'),
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchPendingPayments = createAsyncThunk<PendingPayment[]>(
    'pendingPayment/fetchPendingPayments',
    () =>
        new Promise((resolve, _) => {
            setTimeout(() => {
                const customers = JSON.parse(
                    localStorage.getItem('customers') || '[]'
                ) as Customer[];
                const invoices = JSON.parse(localStorage.getItem('invoices') || '[]') as Invoice[];
                const pendingPayments: PendingPayment[] = customers.map((customer: Customer) => ({
                    customerId: customer._id,
                    customerName: customer.name,
                    previousBalance: customer.balance || 0,
                    invoiceBalance: invoices.reduce((total: number, invoice: Invoice) => {
                        if (invoice.customerId === customer._id) {
                            total += invoice.total;
                        }
                        return total;
                    }, 0),
                }));

                resolve(pendingPayments);
            }, 200);
        })
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
