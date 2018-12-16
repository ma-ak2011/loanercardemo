import {createAction} from "redux-actions";
import {ActionTypes as actions} from "../actionTypes/scheduleActionTypes";

export const successGetSchedules = (schedules, customers, facilities, staffs) => ({
    type: actions.SUCCESS_GET_SCHEDULES,
    payload: {schedules: schedules, customers: customers, facilities: facilities, staffs},
    meta: {},
    error: false
});
export const errorGetSchedules = massages => ({
    type: actions.ERROR_GET_SCHEDULES,
    payload: {massages: massages},
    meta: {},
    error: false
});
export const newSchedule = (facilityId, facilityName, start, end) => ({
    type: actions.NEW_SCHEDULE,
    payload: {
        editedSchedule: {
            scheduleId: -1,
            staffId: -1,
            customerId: -1,
            facilityId: facilityId,
            facilityName: facilityName,
            start: start,
            end: end,
            memo: "",
            rentalReason: -1,
        }
    },
    meta: {},
    error: false
});
export const changeSelectedCustomer = customerId => ({
    type: actions.CHANGE_SELECTED_CUSTOMER,
    payload: {customerId: customerId},
    meta: {},
    error: false
});
export const changeSelectedStaff = staffId => ({
    type: actions.CHANGE_SELECTED_STAFF,
    payload: {staffId: staffId},
    meta: {},
    error: false
});
export const changeMemo = memo => ({
    type: actions.CHANGE_MEMO,
    payload: {memo: memo},
    meta: {},
    error: false
});
export const changeSelectedRentalReason = reason => ({
    type: actions.CHANGE_SELECTED_RENTAL_REASON,
    payload: {rentalReason: reason},
    meta: {},
    error: false
});
export const changeStart = start => ({
    type: actions.CHANGE_START,
    payload: {start: start},
    meta: {},
    error: false
});
export const changeEnd = end => ({
    type: actions.CHANGE_END,
    payload: {end: end},
    meta: {},
    error: false
});
export const cancelEditSchedule = createAction(actions.CANCEL_EDIT_SCHEDULE);
export const addSchedule = (userId, facilityId, customerId, staffId, start, end, memo, rentalReason) => ({
    type: actions.ADD_SCHEDULE,
    payload: {
        userId: userId,
        customerId: customerId,
        staffId: staffId,
        facilityId: facilityId,
        start: start,
        end: end,
        memo: memo,
        rentalReason: rentalReason,
    },
    meta: {},
    error: false
});
export const successAddSchedule = schedule => ({
    type: actions.SUCCESS_ADD_SCHEDULE,
    payload: {schedule: schedule},
    meta: {},
    error: false
});
export const errorAddSchedule = massages => ({
    type: actions.ERROR_ADD_SCHEDULE,
    payload: {massages: massages},
    meta: {},
    error: false
});
export const editSchedule = schedule => ({
    type: actions.EDIT_SCHEDULE,
    payload: {schedule: schedule},
    meta: {},
    error: false
});
export const saveSchedule = (scheduleId, userId, facilityId, customerId, staffId, start, end, memo, rentalReason) => ({
    type: actions.SAVE_SCHEDULE,
    payload: {
        scheduleId: scheduleId,
        userId: userId,
        customerId: customerId,
        facilityId: facilityId,
        staffId: staffId,
        start: start,
        end: end,
        memo, memo,
        rentalReason: rentalReason
    },
    meta: {},
    error: false
});
export const errorSaveSchedule = createAction(actions.ERROR_SAVE_SCHEDULE);
export const successSaveSchedule = schedule => ({
    type: actions.SUCCESS_SAVE_SCHEDULE,
    payload: {schedule: schedule},
    meta: {},
    error: false
});
export const cancelDeleteSchedule = scheduleId => ({
    type: actions.CANCEL_DELETE_SCHEDULE,
    payload: {scheduleId: scheduleId},
    meta: {},
    error: false
});
export const confirmDeleteSchedule = scheduleId => ({
    type: actions.CONFIRM_DELETE_SCHEDULE,
    payload: {scheduleId: scheduleId},
    meta: {},
    error: false
});
export const deleteSchedule = (userId, scheduleId) => ({
    type: actions.DELETE_SCHEDULE,
    payload: {userId: userId, scheduleId: scheduleId},
    meta: {},
    error: false
});
export const successDeleteSchedule = scheduleId => ({
    type: actions.SUCCESS_DELETE_SCHEDULE,
    payload: {scheduleId: scheduleId},
    meta: {},
    error: false
});
export const errorDeleteSchedule = massages => ({
    type: actions.ERROR_DELETE_SCHEDULE,
    payload: {massages: massages},
    meta: {},
    error: false
});
export const changeFilterType = f => ({
    type: actions.CHANGE_FILTER_TYPE,
    payload: {filterType: f},
    meta: {},
    error: false
});
export const toggleCarList = createAction(actions.TOGGLE_CAR_LIST);