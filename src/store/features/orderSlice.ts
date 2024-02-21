import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
    productId: string;
    productName: string;
    unitPrice: number;
    category: string;
    quantity: number;
    delivered: boolean;
}

export interface Order {
    orderId: string;
    date: string;
    customerId: string;
    customerName: string;
    subTotal: number;
    discount: number;
    total: number;
    orderItems: OrderItem[];
}

interface OrderState {
    loading: boolean;
    orders: Order[];
    error: string;
}

const initialState: OrderState = {
    loading: true,
    orders: JSON.parse(localStorage.getItem('orders') || '[]'),
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchOrders = createAsyncThunk<Order[]>(
    'order/fetchOrders',
    () =>
        new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem('orders') || '[]'));
            }, 200);
        })
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            if (action.payload) {
                state.orders.push({
                    ...action.payload,
                    orderId: String(state.orders.length + 1),
                });
            }
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            const order = state.orders.find(
                (_order: Order) => _order.orderId === action.payload.orderId
            );
            if (order) {
                order.date = action.payload.date;
                order.customerName = action.payload.customerName;
                order.orderItems = action.payload.orderItems;
            }
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        removeOrder: (state, action: PayloadAction<string>) => {
            const index = state.orders.findIndex(
                (order: Order) => order.orderId === action.payload
            );
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
