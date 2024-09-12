import { all, fork } from 'redux-saga/effects';
import { watchLogin, watchRegister } from './authSaga';

export default function* authSaga() {
    yield all([
        fork(watchLogin),
        fork(watchRegister),
    ]);
};