import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface Category {
    _id: string;
    name: string;
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
export const fetchCategories = createAsyncThunk<Category[], void, { state: RootState }>(
    'category/fetchCategories',
    (_, { getState }) => {
        const { accessToken } = getState().auth;
        return axios
            .get(`${import.meta.env.VITE_BASE_URL}/categories`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => response.data);
    }
);

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            if (action.payload) {
                state.categories.push(action.payload);
            }
            localStorage.setItem('categories', JSON.stringify(state.categories));
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
            localStorage.setItem('categories', JSON.stringify(state.categories));
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            const index = state.categories.findIndex(
                (category: Category) => category._id === action.payload
            );
            if (index > -1) {
                state.categories.splice(index, 1);
            }
            localStorage.setItem('categories', JSON.stringify(state.categories));
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
