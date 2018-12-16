import 'babel-polyfill';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {Urls} from '../constant/url';
import {ActionTypes as types} from '../actionTypes/customerActionTypes';
import {ActionTypes as commonTypes} from '../actionTypes/actionTypes';
import API from '../api/api';
import {
    errorAddCustomer,
    errorDeleteCustomer,
    errorGetCustomers,
    errorSaveCustomer,
    successAddCustomer,
    successDeleteCustomer,
    successGetCustomers,
    successSaveCustomer
} from "../actions/customerActions";


function* locationChangeAsync(action) {
    const path = action.payload.location.pathname;

    if(path === Urls.Customer.path){
        const state = yield select();
        const token = localStorage.getItem('TOKEN');
        const response =
            yield call(API.getCustomers, { userId: state.userReducer.user.id, token: token});

        if(response.status === 200)
            yield put(successGetCustomers(response.customers));
        else
            yield put(errorGetCustomers(response.messages));
    }
}

function* watchLocationChangeAsync() {
    yield takeEvery(commonTypes.LOCATION_CHANGE, locationChangeAsync);
}

function* addCustomerAsync(action) {

    const data = action.payload;
    const token = localStorage.getItem('TOKEN');
    const responseAddCustomer =
        yield call(API.addCustomer, { userId: data.userId,
            name: data.name, driverType: data.driverType, memo: data.memo, token: token});

    if(responseAddCustomer.status === 200)
        yield put(successAddCustomer(
            { customerId: responseAddCustomer.customerId,
                name: data.name, driverType: data.driverType, memo: data.memo}));
    else
        yield put(errorAddCustomer(responseAddCustomer.messages));
}

function* watchAddCustomerAsync() {
    yield takeEvery(types.ADD_CUSTOMER, addCustomerAsync);
}

function* saveCustomerAsync(action) {

    const data = action.payload;
    const token = localStorage.getItem('TOKEN');
    const response = yield call(API.saveCustomer, { token: token, userId: data.userId, customerId: data.customerId,
        name: data.name, driverType: data.driverType, memo: data.memo });

    if(response.status === 200)
        yield put(successSaveCustomer({customerId: data.customerId,
            name: data.name, driverType: data.driverType, memo: data.memo }));
    else
        yield put(errorSaveCustomer(response.messages));
}

function* watchSaveCustomerAsync() {
    yield takeEvery(types.SAVE_CUSTOMER, saveCustomerAsync);
}

function* deleteCustomerAsync(action) {

    const token = localStorage.getItem('TOKEN');
    const responseDeleteCustomer =
        yield call(API.deleteCustomer,
            { userId: action.payload.userId, customerId: action.payload.customerId, token: token });

    if(responseDeleteCustomer.status === 200)
        yield put(successDeleteCustomer(action.payload.customerId));
    else
        yield put(errorDeleteCustomer(responseDeleteCustomer.messages));
}

function* watchDeleteCustomerAsync() {
    yield takeEvery(types.DELETE_CUSTOMER, deleteCustomerAsync);
}

export const customerSaga = [
    watchLocationChangeAsync(),
    watchAddCustomerAsync(),
    watchDeleteCustomerAsync(),
    watchSaveCustomerAsync(),
]