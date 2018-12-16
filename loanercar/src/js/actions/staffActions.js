import {ActionTypes as actions} from "../actionTypes/staffActionTypes";
import {createAction} from "redux-actions";

export const changeStaffName = name => ({
    type: actions.CHANGE_STAFF_NAME,
    payload: {name: name},
    meta: {},
    error: false
});
export const changeStaffMemo = memo => ({
    type: actions.CHANGE_STAFF_MEMO,
    payload: {memo: memo},
    meta: {},
    error: false
});
export const newStaff = () => ({
    type: actions.NEW_STAFF,
    payload: {
        staffId: -1,
        name: "",
        memo: "",
    },
    meta: {},
    error: false
});
export const editStaff = staff => ({
    type: actions.EDIT_STAFF,
    payload: staff,
    meta: {},
    error: false
});
export const cancelEditStaff = createAction(actions.CANCEL_EDIT_STAFF);
export const addStaff = (userId, name, memo) => ({
    type: actions.ADD_STAFF,
    payload: {userId: userId, name: name, memo: memo},
    meta: {},
    error: false
});
export const successAddStaff = staff => ({
    type: actions.SUCCESS_ADD_STAFF,
    payload: {staff: staff},
    meta: {},
    error: false
});
export const errorAddStaff = massages => ({
    type: actions.ERROR_ADD_STAFF,
    payload: {massages: massages},
    meta: {},
    error: false
});
export const saveStaff = (userId, staffId, name, memo) => ({
    type: actions.SAVE_STAFF,
    payload: {userId: userId, staffId: staffId, name: name, memo: memo},
    meta: {},
    error: false
});
export const errorSaveStaff = createAction(actions.ERROR_SAVE_STAFF);
export const successSaveStaff = staff => ({
    type: actions.SUCCESS_SAVE_STAFF,
    payload: {staff: staff},
    meta: {},
    error: false
});
export const successGetStaffs = staffs => ({
    type: actions.SUCCESS_GET_STAFFS,
    payload: {staffs: staffs},
    meta: {},
    error: false
});
export const errorGetStaffs = massages => ({
    type: actions.ERROR_GET_STAFFS,
    payload: {massages: massages},
    meta: {},
    error: false
});
export const cancelDeleteStaff = createAction(actions.CANCEL_DELETE_STAFF);
export const confirmDeleteStaff = staffId => ({
    type: actions.CONFIRM_DELETE_STAFF,
    payload: {staffId: staffId},
    meta: {},
    error: false
});
export const deleteStaff = (userId, staffId) => ({
    type: actions.DELETE_STAFF,
    payload: {userId: userId, staffId: staffId},
    meta: {},
    error: false
});
export const successDeleteStaff = staffId => ({
    type: actions.SUCCESS_DELETE_STAFF,
    payload: {staffId: staffId},
    meta: {},
    error: false
});
export const errorDeleteStaff = massages => ({
    type: actions.ERROR_DELETE_STAFF,
    payload: {massages: massages},
    meta: {},
    error: false
});