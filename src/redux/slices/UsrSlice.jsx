"use client"
import { createSlice } from '@reduxjs/toolkit'

export const UsrSlice = createSlice({
    name: "users",
    initialState: {},
    // initialState: {
    //     name: "",
    //     email: "",
    //     id: "",
    //     phone: "",
    // },
    reducers: {
        // updateName: (state, action) => {
        //     state.name = action.payload.name;
        // },
        // updateEmail: (state, action) => {
        //     state.email = action.payload.email;
        // },
        // updateId: (state, action) => {
        //     state.id = action.payload.id;
        // },
        // updatePhone: (state, action) => {
        //     state.phone = action.payload.phone;
        // },
        // updateUser: (state, action) => {
        //     return {
        //         ...state,
        //         name: action.payload.name,
        //         email: action.payload.email,
        //         id: action.payload.id,
        //         phone: action.payload.phone,
        //     };
        // },
        updateUser: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        
    },

});

export const { updateName, updateEmail, updateId, updatePhone, updateUser } = UsrSlice.actions;
export default UsrSlice.reducer;