import {ActionTypes as actions} from "../actionTypes/facilityActionTypes";
import moment from "moment/moment";
import {createAction} from "redux-actions";

export const changeFacilityName = name => ({
    type: actions.CHANGE_FACILITY_NAME,
    payload: {name: name},
    meta: {},
    error: false
});
export const changeFacilityCarType = carType => ({
    type: actions.CHANGE_FACILITY_CAR_TYPE,
    payload: {carType: carType},
    meta: {},
    error: false
});
export const changeExpireDate = date => ({
    type: actions.CHANGE_EXPIRE_DATE,
    payload: {expireDate: date},
    meta: {},
    error: false
});
export const changeFacilityMemo = memo => ({
    type: actions.CHANGE_FACILITY_MEMO,
    payload: {memo: memo},
    meta: {},
    error: false
});
export const newFacility = () => ({
    type: actions.NEW_FACILITY,
    payload: {
        facilityId: -1,
        name: "",
        carType: -1,
        expireDate: moment().startOf("day"),
        memo: "",
    },
    meta: {},
    error: false
});
export const editFacility = facility => ({
    type: actions.EDIT_FACILITY,
    payload: facility,
    meta: {},
    error: false
});
export const cancelEditFacility = createAction(actions.CANCEL_EDIT_FACILITY);
export const addFacility = (userId, name, carType, expireDate, memo) => ({
    type: actions.ADD_FACILITY,
    payload: {userId: userId, name: name, carType: carType, expireDate: expireDate, memo: memo},
    meta: {},
    error: false
});
export const successAddFacility = facility => ({
    type: actions.SUCCESS_ADD_FACILITY,
    payload: {facility: facility},
    meta: {},
    error: false
});
export const errorAddFacility = massages => ({
    type: actions.ERROR_ADD_FACILITY,
    payload: {massages: massages},
    meta: {},
    error: false
});
export const saveFacility = (userId, facilityId, name, carType, expireDate, memo) => ({
    type: actions.SAVE_FACILITY,
    payload: {
        userId: userId, facilityId: facilityId,
        name: name, carType: carType, expireDate: expireDate, memo: memo
    },
    meta: {},
    error: false
});
export const errorSaveFacility = createAction(actions.ERROR_SAVE_FACILITY);
export const successSaveFacility = facility => ({
    type: actions.SUCCESS_SAVE_FACILITY,
    payload: {facility: facility},
    meta: {},
    error: false
});
export const successGetFacilities = facilities => ({
    type: actions.SUCCESS_GET_FACILITIES,
    payload: {facilities: facilities},
    meta: {},
    error: false
});
export const errorGetFacilities = massages => ({
    type: actions.ERROR_GET_FACILITIES,
    payload: {massages: massages},
    meta: {},
    error: false
});
export const cancelDeleteFacility = createAction(actions.CANCEL_DELETE_FACILITY);
export const confirmDeleteFacility = facilityId => ({
    type: actions.CONFIRM_DELETE_FACILITY,
    payload: {facilityId: facilityId},
    meta: {},
    error: false
});
export const deleteFacility = (userId, facilityId) => ({
    type: actions.DELETE_FACILITY,
    payload: {userId: userId, facilityId: facilityId},
    meta: {},
    error: false
});
export const successDeleteFacility = facilityId => ({
    type: actions.SUCCESS_DELETE_FACILITY,
    payload: {facilityId: facilityId},
    meta: {},
    error: false
});
export const errorDeleteFacility = massages => ({
    type: actions.ERROR_DELETE_FACILITY,
    payload: {massages: massages},
    meta: {},
    error: false
});