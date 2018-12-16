import 'babel-polyfill';
import {call, put, takeEvery} from 'redux-saga/effects';
import {Messages} from '../constant/messages';
import {Urls} from '../constant/url';
import {ActionTypes as loginTypes} from '../actionTypes/loginActionTypes';
import {ActionTypes as types} from '../actionTypes/createAccountActionTypes';
import * as actions from '../actions/actions';
import API from '../api/api';

import {validateEmail} from '../validater/emailValidater';
import {validatePassword} from '../validater/passwordValidater';
import {push} from 'connected-react-router';
import {
    errorCreateAccount,
    finishEmailValidation,
    finishPasswordValidation,
    successCreateAccount
} from "../actions/createAccountActions";
import {errorLogin, errorLogout, successFetchLoginState, successLogin} from "../actions/loginActions";


function* runEmailValidationAsync(action) {
    const result = yield call(validateEmail, action.payload.email);

    const errorMessage = result ? [] : [Messages.InvalidMail];

    yield put(finishEmailValidation(errorMessage));
}

function* watchRunEmailValidationAsync() {
    yield takeEvery(types.VALIDATE_EMAIL, runEmailValidationAsync);
}

function* runPasswordValidationAsync(action) {
    const result = yield call(validatePassword, action.payload.password);

    const errorMessage = result ? [] : [Messages.InvalidPassWord];

    yield put(finishPasswordValidation(errorMessage));
}

function* watchRunPasswordValidationAsync() {
    yield takeEvery(types.VALIDATE_PASSWORD, runPasswordValidationAsync);
}

function* tryCreateAccountAsync(action) {

    const result = {
        errorEmailMessage: [],
        errorPasswordMessage: [],
        errorPasswordConfirmMessage:[],
        errorServerMessage: [],
        user: {},
    };

    const isEmailValid = yield call(validateEmail, action.payload.email);
    if(!isEmailValid)
        result.errorEmailMessage.push(Messages.InvalidMail);

    const isPasswordValid = yield call(validatePassword, action.payload.password);
    if(!isPasswordValid)
        result.errorPasswordMessage.push(Messages.InvalidPassWord);

    if(action.payload.password !== action.payload.passwordConfirm)
        result.errorPasswordMessage.push(Messages.NotMatchPasswordConfirm);

    if(result.errorEmailMessage.length > 0 || result.errorPasswordMessage.length > 0)
        yield put(errorCreateAccount(result));
    else{
        const createResult =
            yield call(API.createAccount, { email: action.payload.email, password: action.payload.password });

        if(createResult.status === 200){

            const loginResult = yield call(API.login, { email: action.payload.email, password: action.payload.password });
            if(loginResult.status === 200){
                localStorage.setItem('TOKEN', loginResult.user.token);
                yield put(successCreateAccount(loginResult.user));
            }
            else{
                result.errorServerMessage.push(loginResult.messages);
                yield put(errorCreateAccount(result));
            }
        }
        else if(createResult.status === 422){
            result.errorEmailMessage.push(Messages.UsedMail);
            yield put(errorCreateAccount(result));
        }
        else{
            result.errorServerMessage.push(createResult.messages);
            yield put(errorCreateAccount(createResult));
        }
    }
}

function* watchTryCreateAccountAsync() {
    yield takeEvery(types.CREATE_ACCOUNT, tryCreateAccountAsync);
}

function* fetchLoginStateAsync() {
    const token = localStorage.getItem('TOKEN');

    if(!token)
        yield put(successFetchLoginState({status: 401}));
    else{
        const response = yield call(API.fetchLoginState, { token: token });

        yield put(successFetchLoginState(response));
    }
}

function* watchFetchLoginStateAsync() {
    yield takeEvery(loginTypes.FETCH_LOGIN_STATE, fetchLoginStateAsync);
}

function* logout() {
    const token = localStorage.getItem('TOKEN');
    const response = yield call(API.logout, { token: token });
    if(response.status === 200){
        localStorage.removeItem('TOKEN');
        yield put(actions.clearState());
        yield put(push(Urls.Login.path));
    }
    else
        yield put(errorLogout());
}

function* watchLogout() {
    yield takeEvery(loginTypes.LOGOUT, logout);
}

function* tryLoginAsync(action) {

    const response =
        yield call(API.login, { email: action.payload.email, password: action.payload.password });

    if(response.status === 200){
        localStorage.setItem('TOKEN', response.user.token);
        yield put(successLogin(response));
    }
    else
        yield put(errorLogin(response));

}

function* watchTryLoginAsync() {
    yield takeEvery(loginTypes.LOGIN, tryLoginAsync);
}

export const loginSaga = [
    watchRunEmailValidationAsync(),
    watchRunPasswordValidationAsync(),
    watchTryCreateAccountAsync(),
    watchTryLoginAsync(),
    watchFetchLoginStateAsync(),
    watchLogout(),
]