import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
    backUrl: string;
    title: string;
}

const initialState: ConfigState = {
    backUrl: '/',
    title: '',
};

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setBackUrl(state, action: PayloadAction<string>) {
            state.backUrl = action.payload;
        },
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
    },
});

export default configSlice.reducer;
export const { setBackUrl, setTitle } = configSlice.actions;
