import {ActionTypes} from "../actionTypes/actionTypes";
import {loginReducer} from "./loginReducer";
import {userReducer} from "./userReducer";
import {createAccountReducer} from "./createAccountReducer";
import {customerReducer} from "./customerReducer";
import {staffReducer} from "./staffReducer";
import {combineReducers} from "redux";
import {uiReducer} from "./uiReducer";
import {facilityReducer} from "./facilityReducer";
import {scheduleReducer} from "./scheduleReducer";

const combinedReducer = combineReducers({
    loginReducer,
    createAccountReducer,
    userReducer,
    customerReducer,
    staffReducer,
    facilityReducer,
    scheduleReducer,
    uiReducer
});

export function rootReducer(state, action){
    if (action.type === ActionTypes.CLEAR_STATE)
        state = undefined;

    return combinedReducer(state, action);
}