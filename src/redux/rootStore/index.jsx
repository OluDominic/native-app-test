const { configureStore } = require("@reduxjs/toolkit");
import authReducer from '../authStore/authSlice';
import createSagaMiddleware from 'redux-saga';
import authSaga from '../authStore/saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
        serializableCheck: false,
    }).concat(sagaMiddleware)
});

sagaMiddleware.run(authSaga);

export default store;