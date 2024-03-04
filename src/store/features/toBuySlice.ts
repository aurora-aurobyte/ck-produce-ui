import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order, OrderItem } from './orderSlice';

export interface ToBuy {
    productId: string;
    productName: string;
    quantity: number;
}

interface ToBuyState {
    loading: boolean;
    toBuys: ToBuy[];
    error: string;
}

const initialState: ToBuyState = {
    loading: true,
    toBuys: JSON.parse(localStorage.getItem('toBuys') || '[]'),
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchToBuys = createAsyncThunk<ToBuy[]>(
    'toBuy/fetchToBuys',
    () =>
        new Promise((resolve, _) => {
            setTimeout(() => {
                const orders = JSON.parse(localStorage.getItem('orders') || '[]') as Order[];
                const toBuys = orders.reduce((acc: ToBuy[], order: Order) => {
                    order.orderItems.forEach((orderItem: OrderItem) => {
                        const toBuyItem = acc.find(
                            (toBuy: ToBuy) => toBuy.productId === orderItem.productId
                        );
                        if (toBuyItem) {
                            toBuyItem.quantity += orderItem.quantity;
                        } else {
                            acc.push({
                                productId: orderItem.productId,
                                productName: orderItem.product?.name || '',
                                quantity: orderItem.quantity,
                            });
                        }
                    });
                    return acc;
                }, [] as ToBuy[]);

                resolve(toBuys);
            }, 200);
        })
);

export const toBuySlice = createSlice({
    name: 'toBuy',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchToBuys.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchToBuys.fulfilled, (state, action) => {
            state.loading = false;
            state.toBuys = action.payload;
            state.error = '';
        });
        builder.addCase(fetchToBuys.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
        });
    },
});

export default toBuySlice.reducer;
