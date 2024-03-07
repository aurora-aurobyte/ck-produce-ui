import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import invoiceService from 'src/http/services/invoiceService';

export interface InvoiceItem {
    _id: string;
    productId: string;
    productName: string;
    purchasePrice: number;
    unitPrice: number;
    tax: number;
    category: string;
    quantity: number;
}

export interface Invoice {
    _id: string;
    orderId: string;
    date: string;
    customerId: string;
    subTotal: number;
    discount: number;
    total: number;
    paid: boolean;
    paymentDate: string;
    invoiceItems: InvoiceItem[];
    createdAt: string;
    updatedAt: string;
}

interface InvoiceState {
    loading: boolean;
    invoices: Invoice[];
    error: string;
}

const initialState: InvoiceState = {
    loading: true,
    invoices: [],
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchInvoices = createAsyncThunk<Invoice[]>('invoice/fetchInvoices', () =>
    invoiceService.getInvoices()
);

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        addInvoice: (state, action: PayloadAction<Invoice>) => {
            if (action.payload) {
                state.invoices.push(action.payload);
            }
        },
        updateInvoice: (state, action: PayloadAction<Invoice>) => {
            const invoice = state.invoices.find(
                (_invoice: Invoice) => _invoice._id === action.payload._id
            );
            if (invoice) {
                invoice.date = action.payload.date;
                invoice.customerId = action.payload.customerId;
                invoice.subTotal = action.payload.subTotal;
                invoice.discount = action.payload.discount;
                invoice.total = action.payload.total;
                invoice.paid = action.payload.paid;
                invoice.invoiceItems = action.payload.invoiceItems;
            }
        },
        removeInvoice: (state, action: PayloadAction<string>) => {
            const index = state.invoices.findIndex(
                (invoice: Invoice) => invoice._id === action.payload
            );
            if (index > -1) {
                state.invoices.splice(index, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInvoices.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchInvoices.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = action.payload;
            state.error = '';
        });
        builder.addCase(fetchInvoices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
        });
    },
});

export default invoiceSlice.reducer;
export const { addInvoice, updateInvoice, removeInvoice } = invoiceSlice.actions;
