import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import productService from 'src/http/services/productService';
import { Category } from './categorySlice';

export interface Product {
    _id: string;
    name: string;
    purchasePrice: number;
    unitPrice: number;
    tax: number;
    categoryId: string;
    category?: Category;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface ProductState {
    loading: boolean;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    loading: true,
    products: [],
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchProducts = createAsyncThunk<Product[]>('product/fetchProducts', () =>
    productService.getProducts()
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            if (action.payload) {
                state.products.push(action.payload);
            }
        },
        updateProduct: (
            state,
            action: PayloadAction<{
                _id: String;
                name: string;
                purchasePrice: number;
                unitPrice: number;
                tax: number;
                categoryId: string;
                description: string;
            }>
        ) => {
            const product = state.products.find(
                (_product: Product) => _product._id === action.payload._id
            );
            if (product) {
                product.name = action.payload.name;
                product.purchasePrice = action.payload.purchasePrice;
                product.unitPrice = action.payload.unitPrice;
                product.tax = action.payload.tax;
                product.categoryId = action.payload.categoryId;
                // product.category = action.payload.category;
                product.description = action.payload.description;
            }
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            const index = state.products.findIndex(
                (product: Product) => product._id === action.payload
            );
            if (index > -1) {
                state.products.splice(index, 1);
            }
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
