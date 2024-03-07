import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import categoryService from 'src/http/services/categoryService';

export interface Category {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoryState {
    loading: boolean;
    categories: Category[];
    error: string;
}

const initialState: CategoryState = {
    loading: true,
    categories: [],
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchCategories = createAsyncThunk<Category[]>('category/fetchCategories', () =>
    categoryService.getCategories()
);

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            if (action.payload) {
                state.categories.push(action.payload);
            }
        },
        updateCategory: (
            state,
            action: PayloadAction<{
                categoryId: string;
                name: string;
            }>
        ) => {
            const category = state.categories.find(
                (_category: Category) => _category._id === action.payload.categoryId
            );
            if (category) {
                category.name = action.payload.name;
            }
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            const index = state.categories.findIndex(
                (category: Category) => category._id === action.payload
            );
            if (index > -1) {
                state.categories.splice(index, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
            state.error = '';
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
        });
    },
});

export default categorySlice.reducer;
export const { addCategory, updateCategory, removeCategory } = categorySlice.actions;
