import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart : (state) => {
            state.loading=true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error  = null;
        },
        signInFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {signInStart , signInSuccess, signInFailure} = userSlice.actions;

// The value of `state` passed into the reducer is the state obtained by combining all reducers with their respective initial states through combine
// The value of `reducer` in the Redux store will be set to the return value of this function.
export default userSlice.reducer;