import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface PurchaseItem {
    productId: string;
    productName: string;
    purchasePrice: number;
    quantity: number;
}

export interface Purchase {
    purchaseId: string;
    sellerName: string;
    date: string;
    subTotal: number;
    discount: number;
    total: number;
    purchaseItems: PurchaseItem[];
}

interface PurchaseState {
    loading: boolean;
    purchases: Purchase[];
    error: string;
}

const initialState: PurchaseState = {
    loading: true,
    purchases: [],
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchPurchases = createAsyncThunk<Purchase[]>(
    'purchase/fetchPurchases',
    () =>
        new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem('purchases') || '[]'));
            }, 200);
        })
);

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        addPurchase: (state, action: PayloadAction<Purchase>) => {
            if (action.payload) {
                state.purchases.push(action.payload);
            }
            localStorage.setItem('purchases', JSON.stringify(state.purchases));
        },
        updatePurchase: (state, action: PayloadAction<Purchase>) => {
            const purchase = state.purchases.find(
                (_purchase: Purchase) => _purchase.purchaseId === action.payload.purchaseId
            );
            if (purchase) {
                purchase.sellerName = action.payload.sellerName;
                purchase.date = action.payload.date;
                purchase.subTotal = action.payload.subTotal;
                purchase.discount = action.payload.discount;
                purchase.total = action.payload.total;
                purchase.purchaseItems = action.payload.purchaseItems;
            }
            localStorage.setItem('purchases', JSON.stringify(state.purchases));
        },
        removePurchase: (state, action: PayloadAction<string>) => {
            const index = state.purchases.findIndex(
                (purchase: Purchase) => purchase.purchaseId === action.payload
            );
            if (index > -1) {
                state.purchases.splice(index, 1);
            }
            localStorage.setItem('purchases', JSON.stringify(state.purchases));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPurchases.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPurchases.fulfilled, (state, action) => {
            state.loading = false;
            state.purchases = action.payload;
            state.error = '';
        });
        builder.addCase(fetchPurchases.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
        });
    },
});

export default purchaseSlice.reducer;
export const { addPurchase, updatePurchase, removePurchase } = purchaseSlice.actions;
