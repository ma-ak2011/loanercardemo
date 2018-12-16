import {createAction} from 'redux-actions';
import {ActionTypes as actions} from "../actionTypes/actionTypes";
import moment from 'moment';

moment.locale("ja");

export const clearState = createAction(actions.CLEAR_STATE);


