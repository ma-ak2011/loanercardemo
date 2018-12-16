import {ActionTypes as actions} from "../actionTypes/loginActionTypes";
import {createAction} from "redux-actions";

export const changeLoginEmail = email => ({
    type: actions.CHANGE_LOGIN_EMAIL,
    payload: {email: email},
    meta: {},
    error: false
});
export const changeLoginPassword = password => ({
    type: actions.CHANGE_LOGIN_PASSWORD,
    payload: {password: password},
    meta: {},
    error: false
});
export const fetchLoginState = createAction(actions.FETCH_LOGIN_STATE);
export const successFetchLoginState = response => ({
    type: actions.SUCCESS_FETCH_LOGIN_STATE,
    payload: response,
    meta: {},
    error: false
});
export const login = (email, password) => ({
    type: actions.LOGIN,
    payload: {password: password, email: email},
    meta: {},
    error: false
});
export const successLogin = response => ({
    type: actions.SUCCESS_LOGIN,
    payload: response,
    meta: {},
    error: false
});
export const errorLogin = response => ({
    type: actions.ERROR_LOGIN,
    payload: response,
    meta: {},
    error: true
});
export const logout = createAction(actions.LOGOUT);
export const successLogout = createAction(actions.SUCCESS_LOGOUT);
export const errorLogout = createAction(actions.ERROR_LOGOUT);