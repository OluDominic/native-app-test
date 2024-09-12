import { createAction } from '@reduxjs/toolkit';

export const loginPending = createAction(
    'login/pending',
    data => {
        return {payload: data}
    },
);

export const loginSuccess = createAction(
    'login/success',
    data => {
        return {payload: data}
    },
);

export const loginError = createAction(
    'login/error',
    error => {
        return {payload: error}
    },
);

export const registerPending = createAction(
    'register/pending',
    data => {
        return {payload: data}
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