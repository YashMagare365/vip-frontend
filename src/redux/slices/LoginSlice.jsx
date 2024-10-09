import { createSlice } from '@reduxjs/toolkit'

export const LoginSlice = createSlice({
    name: "login",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        updateLogin: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },

});

export const { updateLogin } = LoginSlice.actions;
export default LoginSlice.reducer;