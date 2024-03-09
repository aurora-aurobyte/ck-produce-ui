import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import orderService from 'src/http/services/orderService';
import { RootState } from '../store';
import { Customer } from './customerSlice';
import { Product } from './productSlice';

export interface OrderItem {
    _id: string;
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
    () => orderService.getOrders()
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            if (action.payload) {
                state.orders.push(action.payload);
            }
        },
        updateOrder: (
            state,
            action: PayloadAction<{
                _id: String;
                date: string;
                customerId: string;
                customer?: Customer;
                orderItems?: OrderItem[];
            }>
        ) => {
            const order = state.orders.find((_order: Order) => _order._id === action.payload._id);
            if (order) {
                order.date = action.payload.date;
                order.customerId = action.payload.customerId;
                order.customer = action.payload.customer;
                if (action.payload.orderItems) order.orderItems = action.payload.orderItems;
            }
        },
        removeOrder: (state, action: PayloadAction<string>) => {
            const index = state.orders.findIndex((order: Order) => order._id === action.payload);
            if (index > -1) {
                state.orders.splice(index, 1);
            }
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
