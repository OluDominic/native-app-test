import { loginError, login, loginSuccess, registerError, register, registerSuccess } from "./actions";
import { authState } from "./state";

const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        logoutUser: state => {
            state.authenticated = false;
            state.signInLoading = false;
            state.signInSuccess = {};
            state.isSignInSuccess = false;
            state.signInError = '';
            state.registerLoading = false;
            state.registerSuccess = {};
            state.registerError = '';
        },
        clearLoginError: state => {
            state.signInError = "";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login, (state) => {
            state.signInLoading = true;
        })
        .addCase(loginSuccess, (state, action)=> {
            state.signInLoading = false;
            state.signInSuccess = action.payload;
            state.isSignInSuccess = true;
        })
        .addCase(loginError, (state, action)=> {
            state.signInLoading = false;
            state.signInSuccess = null;
            state.authenticated = true,
            state.isSignInSuccess = false;
            state.signInError = action.payload.message
        })
        .addCase(register, (state) => {
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

export const {logoutUser, clearLoginError} = authSlice.actions;

export default authSlice.reducer;