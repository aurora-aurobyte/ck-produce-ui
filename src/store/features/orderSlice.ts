import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Customer } from './customerSlice';
import { Product } from './productSlice';

export interface OrderItem {
    productId: string;
    product?: Product;
    quantity: number;
    delivered: boolean;
}

export interface Order {
    _id: string;
    date: string;
    customerId: string;
    customer?: Customer;
    orderItems: OrderItem[];
    createdAt: string;
    updatedAt: string;
}

interface OrderState {
    loading: boolean;
    orders: Order[];
    error: string;
}

const initialState: OrderState = {
    loading: true,
    orders: [],
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchOrders = createAsyncThunk<Order[], void, { state: RootState }>(
    'order/fetchOrders',
    (_, { getState }) => {
        const { accessToken } = getState().auth;
        return axios
            .get(`${import.meta.env.VITE_BASE_URL}/orders`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => response.data);
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            if (action.payload) {
                state.orders.push(action.payload);
            }
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            const order = state.orders.find((_order: Order) => _order._id === action.payload._id);
            if (order) {
                order.date = action.payload.date;
                order.customerId = action.payload.customerId;
                order.customer = action.payload.customer;
                order.orderItems = action.payload.orderItems;
            }
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        removeOrder: (state, action: PayloadAction<string>) => {
            const index = state.orders.findIndex((order: Order) => order._id === action.payload);
            if (index > -1) {
                state.orders.splice(index, 1);
            }
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.error = '';
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
        });
    },
});

export default orderSlice.reducer;
export const { addOrder, updateOrder, removeOrder } = orderSlice.actions;
