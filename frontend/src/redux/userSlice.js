import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isLoading: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.isLoading = true;
        },
        signinSuccess: (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        },
        signinFailed: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        signout: (state) => {
            return initialState;
        },
    },
});

export const { 
    signinStart,
    signinSuccess,
    signinFailed,
    signout
} = userSlice.actions;

export default userSlice.reducer;
