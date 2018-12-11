import {createReducer, updateState} from "./utility";


export const initialLoginState = {
    isLoggedIn: false,
    loginFailed: false,
    logoutFailed: false,
    email: "",
    password: "", };

const successFetchLoginState = (state, action) => updateState(state, { isLoggedIn: action.payload.status === 200 });

const changeLoginEmail = (state, action) => updateState(state, { email: action.payload.email });

const changeLoginPassword = (state, action) => updateState(state, { password: action.payload.password });

const successLogin = (state, action) => updateState(state, { isLoggedIn: true });

const errorLogin = (state, action) => updateState(state, { loginFailed: true });

const successLogout = (state, action) => updateState(state, { isLoggedIn: false });

const errorLogout = (state, action) => updateState(state, { logoutFailed: true });

const successCreateAccount = (state, action) => updateState(state, { isLoggedIn: true });

const handlers = {
    SUCCESS_FETCH_LOGIN_STATE: successFetchLoginState,
    CHANGE_LOGIN_EMAIL: changeLoginEmail,
    CHANGE_LOGIN_PASSWORD: changeLoginPassword,
    SUCCESS_LOGIN: successLogin,
    ERROR_LOGIN: errorLogin,
    SUCCESS_LOGOUT: successLogout,
    ERROR_LOGOUT: errorLogout,
    SUCCESS_CREATE_ACCOUNT: successCreateAccount,
};

export const loginReducer = createReducer(initialLoginState, handlers);