import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
    categoryId: string;
    name: string;
}

interface CategoryState {
    loading: boolean;
    categories: Category[];
    error: string;
}

const initialState: CategoryState = {
    loading: true,
    categories: JSON.parse(localStorage.getItem('categories') || '[]'),
    error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchCategories = createAsyncThunk<Category[]>(
    'category/fetchCategories',
    () =>
        new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem('categories') || '[]'));
            }, 200);
        })
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
                (_category: Category) => _category.categoryId === action.payload.categoryId
            );
            if (category) {
                category.name = action.payload.name;
            }
            localStorage.setItem('categories', JSON.stringify(state.categories));
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            const index = state.categories.findIndex(
                (category: Category) => category.categoryId === action.payload
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
