import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface User {
    email: string;
    firstName: string;
    lastName: string;
}

interface AuthState {
    loading: boolean;
    user: null | User;
    accessToken: string;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    loading: true,
    user: null,
    accessToken: localStorage.getItem('accessToken') || '',
    isAuthenticated: false,
};

export const verifyUser = createAsyncThunk<User, void, { state: RootState }>(
    'auth/verifyUser',
    (_, { getState }) => {
        const { accessToken } = getState().auth;
        return axios
            .get(`${import.meta.env.VITE_BASE_URL}/auth/getMyInfo`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => response.data as User);
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ accessToken: string }>) {
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('accessToken', state.accessToken);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = '';
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(verifyUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(verifyUser.rejected, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        });
    },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
