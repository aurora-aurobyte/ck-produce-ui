import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toBuyService from 'src/http/services/toBuyService';
import { Product } from './productSlice';

export interface ToBuy {
    _id: string;
    productId: string;
    quantity: number;
    orders: number;
    product?: Product;
}

interface ToBuyState {
    loading: boolean;
    toBuys: ToBuy[];
    error: string;
}

const initialState: ToBuyState = {
    loading: true,
    toBuys: [],
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchToBuys = createAsyncThunk<ToBuy[], string>('toBuy/fetchToBuys', (date: string) =>
    toBuyService.getToBuys(date)
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
