import {createSlice} from "@reduxjs/toolkit";
import {loginUser, registerUser} from "../actions/authActions";
import {jwtDecode} from "jwt-decode";

const isToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const user = jwtDecode(token);
            return { user, token };
        }
        catch (error) {
            console.log(error);
            localStorage.removeItem("token");
        }
    }
    return { user: '', token: '' };
}

const initialState = {
    user: {},
    token: localStorage.getItem("token") || null,
    errors: [],
    status: 'idle',
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        rehydrate: (state) => {
            const restoreUser = isToken()
            state.user = restoreUser.user;
            state.token = restoreUser.token;
        },
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = {};
            state.token = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = action.payload.user;
            state.token = action.payload.token;
        }).addCase(registerUser.rejected, (state, action) => {
            state.status = 'error';
            state.errors.push(action.payload);
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
    },
})

export default authSlice.reducer;
export const {rehydrate, logout} = authSlice.actions;