import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
    invoiceId: string;
    date: string;
    customerId: string;
    customerName: string;
    subTotal: number;
    discount: number;
    total: number;
    paid: boolean;
    invoiceItems: InvoiceItem[];
}

interface InvoiceState {
    loading: boolean;
    invoices: Invoice[];
    error: string;
}

const initialState: InvoiceState = {
    loading: true,
    invoices: JSON.parse(localStorage.getItem('invoices') || '[]'),
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchInvoices = createAsyncThunk<Invoice[]>(
    'invoice/fetchInvoices',
    () =>
        new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem('invoices') || '[]'));
            }, 200);
        })
);

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        addInvoice: (state, action: PayloadAction<Invoice>) => {
            if (action.payload) {
                state.invoices.push(action.payload);
            }
            localStorage.setItem('invoices', JSON.stringify(state.invoices));
        },
        updateInvoice: (state, action: PayloadAction<Invoice>) => {
            const invoice = state.invoices.find(
                (_invoice: Invoice) => _invoice.invoiceId === action.payload.invoiceId
            );
            if (invoice) {
                invoice.date = action.payload.date;
                invoice.customerId = action.payload.customerId;
                invoice.customerName = action.payload.customerName;
                invoice.subTotal = action.payload.subTotal;
                invoice.discount = action.payload.discount;
                invoice.total = action.payload.total;
                invoice.paid = action.payload.paid;
                invoice.invoiceItems = action.payload.invoiceItems;
            }
            localStorage.setItem('invoices', JSON.stringify(state.invoices));
        },
        removeInvoice: (state, action: PayloadAction<string>) => {
            const index = state.invoices.findIndex(
                (invoice: Invoice) => invoice.invoiceId === action.payload
            );
            if (index > -1) {
                state.invoices.splice(index, 1);
            }
            localStorage.setItem('invoices', JSON.stringify(state.invoices));
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
