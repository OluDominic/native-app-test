import { createAction } from '@reduxjs/toolkit';

export const login = createAction(
    'login/pending',
    (email, password) => {
        return { payload: { email, password } };
    }
);

export const loginSuccess = createAction(
    'login/success',
    data => {
        return {payload: data}
    },
);

export const loginError = createAction('login/error', error => {
    return { payload: { message: error.message } };
});


export const register = createAction(
    'register/pending',
    (firstname, lastname, email, password) => {
        return {payload: {firstname, lastname, email, password}}
    },
);

export const registerSuccess = createAction(
    'register/success',
    data => {
        return {payload: data}
    },
);

export const registerError = createAction(
    'register/error',
    error => {
        return {payload: error}
    },
);