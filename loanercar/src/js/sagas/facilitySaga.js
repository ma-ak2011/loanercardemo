import 'babel-polyfill';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Messages } from '../constant/messages';
import { Urls } from '../constant/url';
import { ActionTypes as types} from '../actions/actionTypes';
import * as actions from '../actions/actions';
import API from '../api/api';


function* locationChangeAsync(action) {
    const path = action.payload.location.pathname;

    if(path === Urls.Facility.path){
        const state = yield select();
        const token = localStorage.getItem('TOKEN');
        const response =
            yield call(API.getFacilities, { userId: state.userReducer.user.id, token: token});

        if(response.status === 200)
            yield put(actions.successGetFacilities(response.facilities));
        else
            yield put(actions.errorGetFacilities(response.messages));
    }
}

function* watchLocationChangeAsync() {
    yield takeEvery(types.LOCATION_CHANGE, locationChangeAsync);
}

function* addFacilityAsync(action) {

    const data = action.payload;
    const token = localStorage.getItem('TOKEN');
    const responseAddFacility =
        yield call(API.addFacility, { userId: data.userId,
            name: data.name, carType: data.carType, expireDate: data.expireDate, memo: data.memo, token: token});

    if(responseAddFacility.status === 200)
        yield put(actions.successAddFacility(
            { facilityId: responseAddFacility.facilityId,
                name: data.name, carType: data.carType, expireDate: data.expireDate, memo: data.memo}));
    else
        yield put(actions.errorAddFacility(responseAddFacility.messages));
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
        yield put(actions.successSaveFacility({facilityId: data.facilityId,
            name: data.name, carType: data.carType, expireDate: data.expireDate, memo: data.memo }));
    else
        yield put(actions.errorSaveFacility(response.messages));
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
        yield put(actions.successDeleteFacility(action.payload.facilityId));
    else
        yield put(actions.errorDeleteFacility(responseDeleteFacility.messages));
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