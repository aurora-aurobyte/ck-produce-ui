import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    productId: string;
    name: string;
    purchasePrice: number;
    unitPrice: number;
    tax: number;
    categoryId: string;
    description: string;
    categoryName: string;
}

interface ProductState {
    loading: boolean;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    loading: true,
    products: JSON.parse(localStorage.getItem('products') || '[]'),
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchProducts = createAsyncThunk<Product[]>(
    'product/fetchProducts',
    () =>
        new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem('products') || '[]'));
            }, 200);
        })
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            if (action.payload) {
                state.products.push(action.payload);
            }
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const product = state.products.find(
                (_product: Product) => _product.productId === action.payload.productId
            );
            if (product) {
                product.name = action.payload.name;
                product.purchasePrice = action.payload.purchasePrice;
                product.unitPrice = action.payload.unitPrice;
                product.tax = action.payload.tax;
                product.categoryId = action.payload.categoryId;
                product.categoryName = action.payload.categoryName;
                product.description = action.payload.description;
            }
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            const index = state.products.findIndex(
                (product: Product) => product.productId === action.payload
            );
            if (index > -1) {
                state.products.splice(index, 1);
            }
            localStorage.setItem('products', JSON.stringify(state.products));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = '';
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
        });
    },
});

export default productSlice.reducer;
export const { addProduct, updateProduct, removeProduct } = productSlice.actions;
