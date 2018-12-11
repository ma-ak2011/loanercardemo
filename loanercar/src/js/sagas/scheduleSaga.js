import 'babel-polyfill';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Messages } from '../constant/messages';
import { Urls } from '../constant/url';
import { ActionTypes as types} from '../actions/actionTypes';
import * as actions from '../actions/actions';
import API from '../api/api';


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
            yield put(actions.successGetSchedules(scheduleResponse.schedules, customerResponse.customers,
                facilityResponse.facilities, staffResponse.staffs));
        else
            yield put(actions.errorGetSchedules(scheduleResponse.messages));
    }
}

function* watchLocationChangeAsync() {
    yield takeEvery(types.LOCATION_CHANGE, locationChangeAsync);
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
        yield put(actions.successAddSchedule({scheduleId: response.scheduleId, facilityId: data.facilityId,
            customerId: data.customerId, staffId: data.staffId, start: data.start, end: data.end, memo: data.memo,
            rentalReason: data.rentalReason }));
    else
        yield put(actions.errorAddSchedule(response.messages));
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
        yield put(actions.successSaveSchedule(data));
    else
        yield put(actions.errorSaveSchedule(response.messages));
}

function* watchSaveScheduleAsync() {
    yield takeEvery(types.SAVE_SCHEDULE, saveScheduleAsync);
}

function* deleteScheduleAsync(action) {

    const token = localStorage.getItem('TOKEN');
    const data = action.payload;
    const response = yield call(API.deleteSchedule, { userId: data.userId, scheduleId: data.scheduleId, token: token });

    if(response.status === 200)
        yield put(actions.successDeleteSchedule(data.scheduleId));
    else
        yield put(actions.errorDeleteSchedule(response.messages));
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