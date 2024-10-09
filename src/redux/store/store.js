"use client"
import { configureStore } from "@reduxjs/toolkit";
import UsrSlice from "../slices/UsrSlice";
import LoginSlice from "../slices/LoginSlice";

// config the store
const store = configureStore({
  reducer: {
    user: UsrSlice,
    login: LoginSlice,
  },
});

// export default the store
export default store;
