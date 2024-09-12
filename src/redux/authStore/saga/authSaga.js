import { call, takeEvery } from "redux-saga/effects";
import { loginError, loginPending, loginSuccess, registerPending, registerSuccess } from "../actions";
import { authService } from "../services";

export function* callSignIn({payload: {data}}) {
    try {
        const response = yield call(authService.signInService, data);
        yield put(loginSuccess(response))
    } catch (error) {
        yield put(loginError(error))
    }
};

export function* callRegister({payload: {data}}) {
    try {
        const response = yield call(authService.registerService, data);
        yield put(registerSuccess(response))
    } catch (error) {
        yield put(registerError(error))
    }
};

export function* watchLogin() {
    yield takeEvery(loginPending.type, callSignIn)
}

export function* watchRegister() {
    yield takeEvery(registerPending.type, callRegister)
}