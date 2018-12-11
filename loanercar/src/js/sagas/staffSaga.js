import 'babel-polyfill';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Messages } from '../constant/messages';
import { Urls } from '../constant/url';
import { ActionTypes as types} from '../actions/actionTypes';
import * as actions from '../actions/actions';
import API from '../api/api';


function* locationChangeAsync(action) {
    const path = action.payload.location.pathname;

    if(path === Urls.Staff.path){
        const state = yield select();
        const token = localStorage.getItem('TOKEN');
        const response = yield call(API.getStaffs, { userId: state.userReducer.user.id, token: token});

        if(response.status === 200)
            yield put(actions.successGetStaffs(response.staffs));
        else
            yield put(actions.errorGetStaffs(response.messages));
    }
}

function* watchLocationChangeAsync() {
    yield takeEvery(types.LOCATION_CHANGE, locationChangeAsync);
}

function* addStaffAsync(action) {

    const data = action.payload;
    const token = localStorage.getItem('TOKEN');
    const responseAddStaff =
        yield call(API.addStaff, { userId: data.userId, name: data.name, memo: data.memo, token: token});

    if(responseAddStaff.status === 200)
        yield put(actions.successAddStaff(
            { staffId: responseAddStaff.staffId, name: data.name, memo: data.memo}));
    else
        yield put(actions.errorAddStaff(responseAddStaff.messages));
}

function* watchAddStaffAsync() {
    yield takeEvery(types.ADD_STAFF, addStaffAsync);
}

function* saveStaffAsync(action) {

    const data = action.payload;
    const token = localStorage.getItem('TOKEN');
    const response = yield call(API.saveStaff, { token: token, userId: data.userId, staffId: data.staffId,
        name: data.name, memo: data.memo });

    if(response.status === 200)
        yield put(actions.successSaveStaff({staffId: data.staffId, name: data.name, memo: data.memo }));
    else
        yield put(actions.errorSaveStaff(response.messages));
}

function* watchSaveStaffAsync() {
    yield takeEvery(types.SAVE_STAFF, saveStaffAsync);
}

function* deleteStaffAsync(action) {

    const token = localStorage.getItem('TOKEN');
    const responseDeleteStaff =
        yield call(API.deleteStaff,
            { userId: action.payload.userId, staffId: action.payload.staffId, token: token });

    if(responseDeleteStaff.status === 200)
        yield put(actions.successDeleteStaff(action.payload.staffId));
    else
        yield put(actions.errorDeleteStaff(responseDeleteStaff.messages));
}

function* watchDeleteStaffAsync() {
    yield takeEvery(types.DELETE_STAFF, deleteStaffAsync);
}

export const staffSaga = [
    watchLocationChangeAsync(),
    watchAddStaffAsync(),
    watchDeleteStaffAsync(),
    watchSaveStaffAsync(),
];