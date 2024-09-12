import { loginError, loginPending, loginSuccess, registerError, registerPending, registerSuccess } from "./actions";
import { authState } from "./state";

const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    extraReducers: (builder) => {
        builder
        .addCase(loginPending, (state) => {
            state.sig = true;
        })
        .addCase(loginSuccess, (state, action)=> {
            state.signInLoading = false;
            state.signInSuccess = action.payload;
            state.isSignInSuccess = true;
        })
        .addCase(loginError, (state, action)=> {
            state.signInLoading = false;
            state.signInSuccess = null;
            state.isSignInSuccess = false;
            state.signInError = action.payload
        })
        .addCase(registerPending, (state) => {
            state.registerLoading = true;
        })
        .addCase(registerSuccess, (state, action)=> {
            state.registerLoading = false;
            state.registerSuccess = action.payload;
            state.isRegisterSuccess = true;
        })
        .addCase(registerError, (state, action)=> {
            state.registerLoading = false;
            state.registerSuccess = null;
            state.isRegisterSuccess = false;
            state.registerError = action.payload
        })
    }
});

export default authSlice.reducer;