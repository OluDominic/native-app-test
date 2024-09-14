import { call, put, takeEvery } from "redux-saga/effects";
import { login, loginError, loginSuccess, register, registerError, registerSuccess } from "../actions";
import { authService } from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function* callSignIn({payload: {email, password}}) {
    console.log({ email, password }, 'Saga signin data');
    try {
        const response = yield call(authService.signInService, {email, password});
        yield put(loginSuccess(response));
        yield call(AsyncStorage.setItem('userData',  JSON.stringify(response)))
    } catch (error) {
        const errorMessage = error.message || 'An unexpected error occurred';
        console.log('error signin', errorMessage);
        yield put(loginError({ message: errorMessage }));
    }
};

export function* callRegister({payload: {firstname, lastname, email, password}}) {
    console.log({ firstname, lastname, email, password }, 'Saga signin data');
    try {
        const response = yield call(authService.registerService, {firstname, lastname, email, password});
        yield put(registerSuccess(response))
        console.log(response, 'signup data')
    } catch (error) {
        console.log('error signing up', error);
        yield put(registerError(error))
    }
};

export function* watchLogin() {
    yield takeEvery(login.type, callSignIn)
}

export function* watchRegister() {
    yield takeEvery(register.type, callRegister)
}