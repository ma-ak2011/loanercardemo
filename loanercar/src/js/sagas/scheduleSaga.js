import 'babel-polyfill';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {Urls} from '../constant/url';
import {ActionTypes as types} from '../actionTypes/scheduleActionTypes';
import {ActionTypes as commonTypes} from '../actionTypes/actionTypes';
import API from '../api/api';
import {
    errorAddSchedule,
    errorDeleteSchedule,
    errorGetSchedules,
    errorSaveSchedule,
    successAddSchedule,
    successDeleteSchedule,
    successGetSchedules,
    successSaveSchedule
} from "../actions/scheduleActions";


function* locationChangeAsync(action) {
    const path = action.payload.location.pathname;

    if(path === Urls.Schedule.path){
        const state = yield select();
        const token = localStorage.getItem('TOKEN');
        const customerResponse =
            yield call(API.getCustomers, { userId: state.userReducer.user.id, token: token});
        const staffResponse =
            yield call(API.getStaffs, { userId: state.userReducer.user.id, token: token});
        const scheduleResponse =
            yield call(API.getSchedules, { userId: state.userReducer.user.id, token: token});
        const facilityResponse =
            yield call(API.getFacilities, { userId: state.userReducer.user.id, token: token});

        if(customerResponse.status === 200 && scheduleResponse.status === 200 && facilityResponse.status === 200)
            yield put(successGetSchedules(scheduleResponse.schedules, customerResponse.customers,
                facilityResponse.facilities, staffResponse.staffs));
        else
            yield put(errorGetSchedules(scheduleResponse.messages));
    }
}

function* watchLocationChangeAsync() {
    yield takeEvery(commonTypes.LOCATION_CHANGE, locationChangeAsync);
}

function* addScheduleAsync(action) {

    const token = localStorage.getItem('TOKEN');
    const data  = action.payload;
    const response = yield call(API.addSchedule, {
        token: token,
        userId: data.userId,
        customerId: data.customerId,
        facilityId: data.facilityId,
        staffId: data.staffId,
        start: data.start,
        end: data.end,
        memo: data.memo,
        rentalReason: data.rentalReason,
    });

    if(response.status === 200)
        yield put(successAddSchedule({scheduleId: response.scheduleId, facilityId: data.facilityId,
            customerId: data.customerId, staffId: data.staffId, start: data.start, end: data.end, memo: data.memo,
            rentalReason: data.rentalReason }));
    else
        yield put(errorAddSchedule(response.messages));
}

function* watchAddScheduleAsync() {
    yield takeEvery(types.ADD_SCHEDULE, addScheduleAsync);
}

function* saveScheduleAsync(action) {

    const token = localStorage.getItem('TOKEN');
    const data = action.payload;
    const response = yield call(API.saveSchedule, { token: token, userId: data.userId, scheduleId: data.scheduleId,
        facilityId: data.facilityId, staffId: data.staffId,
        customerId: data.customerId, start: data.start,
        end: data.end, memo: data.memo, rentalReason: data.rentalReason });

    if(response.status === 200)
        yield put(successSaveSchedule(data));
    else
        yield put(errorSaveSchedule(response.messages));
}

function* watchSaveScheduleAsync() {
    yield takeEvery(types.SAVE_SCHEDULE, saveScheduleAsync);
}

function* deleteScheduleAsync(action) {

    const token = localStorage.getItem('TOKEN');
    const data = action.payload;
    const response = yield call(API.deleteSchedule, { userId: data.userId, scheduleId: data.scheduleId, token: token });

    if(response.status === 200)
        yield put(successDeleteSchedule(data.scheduleId));
    else
        yield put(errorDeleteSchedule(response.messages));
}

function* watchDeleteScheduleAsync() {
    yield takeEvery(types.DELETE_SCHEDULE, deleteScheduleAsync);
}

export const scheduleSaga = [
    watchLocationChangeAsync(),
    watchAddScheduleAsync(),
    watchSaveScheduleAsync(),
    watchDeleteScheduleAsync(),
]