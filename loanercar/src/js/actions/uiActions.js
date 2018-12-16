import {createAction} from "redux-actions";
import {ActionTypes as actions} from "../actionTypes/uiActionTypes";

export const toggleMenu = createAction(actions.TOGGLE_MENU);