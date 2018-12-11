import 'babel-polyfill';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Messages } from '../constant/messages';
import { Urls } from '../constant/url';
import { ActionTypes as types} from '../actions/actionTypes';
import * as actions from '../actions/actions';
import API from '../api/api';


function* locationChangeAsync(action) {
    const path = action.payload.location.pathname;

    if(path === Urls.Customer.path){
        const state = yield select();
        const token = localStorage.getItem('TOKEN');
        const response =
            yield call(API.getCustomers, { userId: state.userReducer.user.id, token: token});

        if(response.status === 200)
            yield put(actions.successGetCustomers(response.customers));
        else
            yield put(actions.errorGetCustomers(response.messages));
    }
}

function* watchLocationChangeAsync() {
    yield takeEvery(types.LOCATION_CHANGE, locationChangeAsync);
}

function* addCustomerAsync(action) {

    const data = action.payload;
    const token = localStorage.getItem('TOKEN');
    const responseAddCustomer =
        yield call(API.addCustomer, { userId: data.userId,
            name: data.name, driverType: data.driverType, memo: data.memo, token: token});

    if(responseAddCustomer.status === 200)
        yield put(actions.successAddCustomer(
            { customerId: responseAddCustomer.customerId,
                name: data.name, driverType: data.driverType, memo: data.memo}));
    else
        yield put(actions.errorAddCustomer(responseAddCustomer.messages));
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
        yield put(actions.successSaveCustomer({customerId: data.customerId,
            name: data.name, driverType: data.driverType, memo: data.memo }));
    else
        yield put(actions.errorSaveCustomer(response.messages));
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
        yield put(actions.successDeleteCustomer(action.payload.customerId));
    else
        yield put(actions.errorDeleteCustomer(responseDeleteCustomer.messages));
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