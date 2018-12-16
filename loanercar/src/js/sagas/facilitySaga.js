import 'babel-polyfill';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {Urls} from '../constant/url';
import {ActionTypes as types} from '../actionTypes/facilityActionTypes';
import {ActionTypes as commonTypes} from '../actionTypes/actionTypes';
import API from '../api/api';
import {
    errorAddFacility,
    errorDeleteFacility,
    errorGetFacilities,
    errorSaveFacility,
    successAddFacility,
    successDeleteFacility,
    successGetFacilities,
    successSaveFacility
} from "../actions/facilityActions";


function* locationChangeAsync(action) {
    const path = action.payload.location.pathname;

    if(path === Urls.Facility.path){
        const state = yield select();
        const token = localStorage.getItem('TOKEN');
        const response =
            yield call(API.getFacilities, { userId: state.userReducer.user.id, token: token});

        if(response.status === 200)
            yield put(successGetFacilities(response.facilities));
        else
            yield put(errorGetFacilities(response.messages));
    }
}

function* watchLocationChangeAsync() {
    yield takeEvery(commonTypes.LOCATION_CHANGE, locationChangeAsync);
}

function* addFacilityAsync(action) {

    const data = action.payload;
    const token = localStorage.getItem('TOKEN');
    const responseAddFacility =
        yield call(API.addFacility, { userId: data.userId,
            name: data.name, carType: data.carType, expireDate: data.expireDate, memo: data.memo, token: token});

    if(responseAddFacility.status === 200)
        yield put(successAddFacility(
            { facilityId: responseAddFacility.facilityId,
                name: data.name, carType: data.carType, expireDate: data.expireDate, memo: data.memo}));
    else
        yield put(errorAddFacility(responseAddFacility.messages));
}

function* watchAddFacilityAsync() {
    yield takeEvery(types.ADD_FACILITY, addFacilityAsync);
}

function* saveFacilityAsync(action) {

    const data = action.payload;
    const token = localStorage.getItem('TOKEN');
    const response = yield call(API.saveFacility, { token: token, userId: data.userId, facilityId: data.facilityId,
        name: data.name, carType: data.carType, expireDate: data.expireDate, memo: data.memo });

    if(response.status === 200)
        yield put(successSaveFacility({facilityId: data.facilityId,
            name: data.name, carType: data.carType, expireDate: data.expireDate, memo: data.memo }));
    else
        yield put(errorSaveFacility(response.messages));
}

function* watchSaveFacilityAsync() {
    yield takeEvery(types.SAVE_FACILITY, saveFacilityAsync);
}

function* deleteFacilityAsync(action) {

    const token = localStorage.getItem('TOKEN');
    const responseDeleteFacility =
        yield call(API.deleteFacility,
            { userId: action.payload.userId, facilityId: action.payload.facilityId, token: token });

    if(responseDeleteFacility.status === 200)
        yield put(successDeleteFacility(action.payload.facilityId));
    else
        yield put(errorDeleteFacility(responseDeleteFacility.messages));
}

function* watchDeleteFacilityAsync() {
    yield takeEvery(types.DELETE_FACILITY, deleteFacilityAsync);
}

export const facilitySaga = [
    watchLocationChangeAsync(),
    watchAddFacilityAsync(),
    watchDeleteFacilityAsync(),
    watchSaveFacilityAsync(),
]