import { updateState, createReducer } from "./utility";

export const CreateResult = {
    CREATED: 'CREATED',
};

export const initialAccountState = {
    userId: '',
    password: '',
    errorPasswordMessage: [],
    passwordFocusedOnce: false,
    passwordConfirm: '',
    errorPasswordConfirmMessage: [],
    passwordConfirmFocusedOnce: false,
    email: '',
    errorEmailMessage: [],
    errorServerMessage: [],
};

const errorCreateAccount = (state, action) => updateState(state, {
    errorPasswordMessage: action.payload.result.errorPasswordMessage,
    errorPasswordConfirmMessage: action.payload.result.errorPasswordConfirmMessage,
    errorEmailMessage: action.payload.result.errorEmailMessage,
    errorServerMessage: action.payload.result.errorServerMessage,
});

const changePassword = (state, action) => updateState(state, { password: action.payload.password });

const changePasswordConfirm = (state, action) =>
    updateState(state, { passwordConfirm: action.payload.passwordConfirm });

const finishPasswordValidation = (state, action) =>
    updateState(state, { errorPasswordMessage: action.payload.errorPasswordMessage });

const passwordFocusedOnce = (state, action) => updateState(state, { passwordFocusedOnce: true });

const finishPasswordConfirmValidation = (state, action) =>
    updateState(state, { errorPasswordConfirmMessage: action.payload.errorPasswordConfirmMessage, });

const passwordConfirmFocusedOnce = (state, action) => updateState(state, { passwordConfirmFocusedOnce: true });

const changeEmail = (state, action) => updateState(state, { email: action.payload.email });

const finishEmailValidation = (state, action) =>
    updateState(state, { errorEmailMessage: action.payload.errorEmailMessage });

const handlers = {
    ERROR_CREATE_ACCOUNT: errorCreateAccount,
    CHANGE_PASSWORD: changePassword,
    FINISH_PASSWORD_VALIDATION: finishPasswordValidation,
    PASSWORD_FOCUSED_ONCE: passwordFocusedOnce,
    CHANGE_PASSWORD_CONFIRM: changePasswordConfirm,
    FINISH_PASSWORD_CONFIRM_VALIDATION: finishPasswordConfirmValidation,
    PASSWORD_CONFIRM_FOCUSED_ONCE: passwordConfirmFocusedOnce,
    CHANGE_EMAIL: changeEmail,
    FINISH_EMAIL_VALIDATION: finishEmailValidation,
};

export const createAccountReducer = createReducer(initialAccountState, handlers);
