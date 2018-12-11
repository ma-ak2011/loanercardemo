import {createReducer, updateState} from "./utility";

export const initialUserState = {
    user: { id: 0, name:"", email: ""}
};

const updateUser = (state, action) => updateState(state, { user: action.payload.user });

const handlers = {
    SUCCESS_LOGIN: updateUser,
    SUCCESS_FETCH_LOGIN_STATE: updateUser,
    SUCCESS_CREATE_ACCOUNT: updateUser,
};

export const userReducer = createReducer(initialUserState, handlers);