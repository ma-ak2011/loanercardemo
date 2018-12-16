import {ActionTypes as actions} from "../actionTypes/createAccountActionTypes";
import {createAction} from "redux-actions";

export const validateEmail = email => ({
    type: actions.VALIDATE_EMAIL,
    payload: {email: email},
    meta: {},
    error: false
});
export const finishEmailValidation = errorMessage => ({
    type: actions.FINISH_EMAIL_VALIDATION,
    payload: {errorEmailMessage: errorMessage},
    meta: {},
    error: false
});
export const changeEmail = email => ({
    type: actions.CHANGE_EMAIL,
    payload: {email: email},
    meta: {},
    error: false
});
export const passwordFocusedOnce = createAction(actions.PASSWORD_FOCUSED_ONCE);
export const validatePassword = password => ({
    type: actions.VALIDATE_PASSWORD,
    payload: {password: password},
    meta: {},
    error: false
});
export const finishPasswordValidation = errorMessage => ({
    type: actions.FINISH_PASSWORD_VALIDATION,
    payload: {errorPasswordMessage: errorMessage},
    meta: {},
    error: false
});
export const changePassword = password => ({
    type: actions.CHANGE_PASSWORD,
    payload: {password: password},
    meta: {},
    error: false
});
export const passwordConfirmFocusedOnce = createAction(actions.PASSWORD_CONFIRM_FOCUSED_ONCE);
export const validatePasswordConfirm = createAction(actions.VALIDATE_PASSWORD_CONFIRM);
export const finishPasswordConfirmValidation = result => ({
    type: actions.FINISH_PASSWORD_CONFIRM_VALIDATION,
    payload: {result: result},
    meta: {},
    error: false
});
export const changePasswordConfirm = passwordConfirm => ({
    type: actions.CHANGE_PASSWORD_CONFIRM,
    payload: {passwordConfirm: passwordConfirm},
    meta: {},
    error: false
});
export const createAccount = (password, passwordConfirm, email) => ({
    type: actions.CREATE_ACCOUNT,
    payload: {password: password, passwordConfirm: passwordConfirm, email: email},
    meta: {},
    error: false
});
export const successCreateAccount = user => ({
    type: actions.SUCCESS_CREATE_ACCOUNT,
    payload: {user: user},
    meta: {},
    error: false
});
export const errorCreateAccount = result => ({
    type: actions.ERROR_CREATE_ACCOUNT,
    payload: {result: result},
    meta: {},
    error: true
});