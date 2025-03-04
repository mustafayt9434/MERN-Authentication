import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
const store = configureStore({
    reducer: {
        users: authSlice,
    }
})

export default store;