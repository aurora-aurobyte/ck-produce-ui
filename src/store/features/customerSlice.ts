import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import customerService from 'src/http/services/customerService';

export interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    postalCode: number;
    businessName: string;
    address: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
}

interface CustomerState {
    loading: boolean;
    customers: Customer[];
    error: string;
}

const initialState: CustomerState = {
    loading: true,
    customers: [],
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchCustomers = createAsyncThunk<Customer[]>('customer/fetchCustomers', () =>
    customerService.getCustomers()
);

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<Customer>) => {
            if (action.payload) {
                state.customers.push(action.payload);
            }
        },
        updateCustomer: (
            state,
            action: PayloadAction<{ _id: string; name: string; address: string }>
        ) => {
            const customer = state.customers.find(
                (_customer: Customer) => _customer._id === action.payload._id
            );
            if (customer) {
                customer.name = action.payload.name;
                customer.address = action.payload.address;
            }
        },
        removeCustomer: (state, action: PayloadAction<string>) => {
            const index = state.customers.findIndex(
                (customer: Customer) => customer._id === action.payload
            );
            if (index > -1) {
                state.customers.splice(index, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            state.loading = false;
            state.customers = action.payload;
            state.error = '';
        });
        builder.addCase(fetchCustomers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
        });
    },
});

export default customerSlice.reducer;
export const { addCustomer, updateCustomer, removeCustomer } = customerSlice.actions;
