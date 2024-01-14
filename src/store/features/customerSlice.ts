import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
    customerId: string;
    name: string;
    address: string;
}

interface CustomerState {
    loading: boolean;
    customers: Customer[];
    error: string;
}

const initialState: CustomerState = {
    loading: true,
    customers: JSON.parse(localStorage.getItem('customers') || '[]'),
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchCustomers = createAsyncThunk<Customer[]>(
    'customer/fetchCustomers',
    () =>
        new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem('customers') || '[]'));
            }, 200);
        })
);

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<Customer>) => {
            if (action.payload) {
                state.customers.push({
                    ...action.payload,
                    customerId: String(state.customers.length),
                });
            }
            localStorage.setItem('customers', JSON.stringify(state.customers));
        },
        updateCustomer: (state, action: PayloadAction<{ customerId: string; name: string }>) => {
            const customer = state.customers.find(
                (_customer: Customer) => _customer.customerId === action.payload.customerId
            );
            if (customer) {
                customer.name = action.payload.name;
            }
            localStorage.setItem('customers', JSON.stringify(state.customers));
        },
        removeCustomer: (state, action: PayloadAction<{ customerId: string }>) => {
            const index = state.customers.findIndex(
                (customer: Customer) => customer.customerId === action.payload.customerId
            );
            if (index > -1) {
                state.customers.splice(index, 1);
            }
            localStorage.setItem('customers', JSON.stringify(state.customers));
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
