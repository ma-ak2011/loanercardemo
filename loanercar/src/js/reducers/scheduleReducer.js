import { fromJS, List } from 'immutable';
import { Urls } from '../constant/url';
import {createReducer, updateState} from "./utility";


export const initialScheduleState = {
    schedules:[],
    customerAge: 0,
    messages: [],
    deleteConfirmId: -1,
    editedSchedule: null,
    isLoading: false,
    filterType: -1,
    showCarList: true
};

const locationChange = (state, action) => {
    if(action.payload.location.pathname === Urls.Schedule.path)
        return updateState(state, { isLoading: true, messages: [] });

    return state;
};

const successGetSchedules =
    (state, action) => updateState(state, { schedules: action.payload.schedules, isLoading: false });

const errorGetSchedules =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const addSchedule = (state, action) => updateState(state, { isLoading: true });

const successAddSchedule = (state, action) => fromJS(state)
    .update('schedules', s => s.push(action.payload.schedule))
    .set("editedSchedule", null)
    .set("isLoading", false)
    .toJS();

const errorAddSchedule = (state, action) => updateState(state, { messages: action.payload.messages });

const newSchedule = (state, action) => updateState(state, { editedSchedule: action.payload.editedSchedule });

const changeSelectedStaff =
    (state, action) => fromJS(state).setIn(["editedSchedule", "staffId"], action.payload.staffId).toJS();

const changeSelectedCustomer =
    (state, action) => fromJS(state).setIn(["editedSchedule", "customerId"], action.payload.customerId).toJS();

const changeMemo =
    (state, action) => fromJS(state).setIn(["editedSchedule", "memo"], action.payload.memo).toJS();

const changeSelectedRentalReason =
    (state, action) => fromJS(state).setIn(["editedSchedule", "rentalReason"], action.payload.rentalReason).toJS();

const changeStart =
    (state, action) => fromJS(state).setIn(["editedSchedule", "start"], action.payload.start).toJS();

const changeEnd =
    (state, action) => fromJS(state).setIn(["editedSchedule", "end"], action.payload.end).toJS();

const editSchedule = (state, action) => updateState(state, {
    editedSchedule: {
        scheduleId: action.payload.schedule.scheduleId,
        facilityId: action.payload.schedule.facilityId,
        facilityName: action.payload.schedule.facilityName,
        staffId: action.payload.schedule.staffId,
        customerId: action.payload.schedule.customerId,
        start: action.payload.schedule.start,
        end: action.payload.schedule.end,
        memo: action.payload.schedule.memo,
        rentalReason: action.payload.schedule.rentalReason,
    }
});

const cancelEditSchedule = (state, action) => updateState(state, { editedSchedule: null });

const saveSchedule = (state, action) => {
    const copyState = fromJS(state);
    const idx = copyState.get('schedules').findIndex(s => s.get('scheduleId') === action.payload.scheduleId);
    const newState = copyState.setIn(['schedules', idx], action.payload).set("isLoading", true).toJS();

    return newState;
};

const successSaveSchedule = (state, action) => updateState(state, { editedSchedule: null, isLoading: false });

const errorSaveSchedule =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const cancelDeleteSchedule = (state, action) => updateState(state, { deleteConfirmId: -1 });

const confirmDeleteSchedule =
    (state, action) => updateState(state, { deleteConfirmId: action.payload.scheduleId });

const deleteSchedule = (state, action) => updateState(state, { isLoading: true, deleteConfirmId: -1 });

const successDeleteSchedule = (state, action) => {
    const newSchedule = List(state.schedules.filter(s => s.scheduleId !== action.payload.scheduleId));
    const deletedState = fromJS(state)
        .set('schedules', newSchedule)
        .set('deleteConfirmId', -1)
        .set("editedSchedule", null)
        .set("isLoading", false)
        .toJS();
    return deletedState;
};

const errorDeleteSchedule = (state, action) => updateState(state, {
    messages: action.payload.messages,
    isLoading:false,
});

const changeFilterType = (state, action) => updateState(state, { filterType: action.payload.filterType });

const toggleCarList = (state, action) => updateState(state, { showCarList: !state.showCarList });

const handlers = {
    "@@router/LOCATION_CHANGE": locationChange,
    SUCCESS_GET_SCHEDULES: successGetSchedules,
    ERROR_GET_SCHEDULES: errorGetSchedules,
    CHANGE_SELECTED_CUSTOMER: changeSelectedCustomer,
    CHANGE_SELECTED_STAFF: changeSelectedStaff,
    CHANGE_MEMO: changeMemo,
    CHANGE_SELECTED_RENTAL_REASON: changeSelectedRentalReason,
    CHANGE_START: changeStart,
    CHANGE_END: changeEnd,
    CANCEL_EDIT_SCHEDULE: cancelEditSchedule,
    NEW_SCHEDULE: newSchedule,
    ADD_SCHEDULE: addSchedule,
    SUCCESS_ADD_SCHEDULE: successAddSchedule,
    ERROR_ADD_SCHEDULE: errorAddSchedule,
    EDIT_SCHEDULE: editSchedule,
    SAVE_SCHEDULE: saveSchedule,
    SUCCESS_SAVE_SCHEDULE: successSaveSchedule,
    ERROR_SAVE_SCHEDULE: errorSaveSchedule,
    DELETE_SCHEDULE: deleteSchedule,
    CANCEL_DELETE_SCHEDULE: cancelDeleteSchedule,
    CONFIRM_DELETE_SCHEDULE: confirmDeleteSchedule,
    SUCCESS_DELETE_SCHEDULE: successDeleteSchedule,
    ERROR_DELETE_SCHEDULE: errorDeleteSchedule,
    CHANGE_FILTER_TYPE: changeFilterType,
    TOGGLE_CAR_LIST: toggleCarList,
};

export const scheduleReducer = createReducer(initialScheduleState, handlers);

