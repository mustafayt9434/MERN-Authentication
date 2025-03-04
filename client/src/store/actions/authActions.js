import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk('register/user', async (user) => {
    const res = await axios.post("/user/signup", user);
    localStorage.setItem("token", res.data.token);
    return res.data
})
export const loginUser = createAsyncThunk('login/user', async (user) => {
    const res = await axios.post("/user/login", user);
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
    }
    localStorage.setItem("token", res.data.token);
    return res.data
})

