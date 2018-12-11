import { fromJS, List } from 'immutable';
import { Urls } from '../constant/url';
import {createReducer, updateState} from "./utility";

export const initialStaffState = {
    staffs: [],
    staffName: "",
    messages: [],
    confirmDeleteId: -1,
    editingStaff: null,
    isLoading: false,
};

const locationChange = (state, action) => {
    const t = Urls.Staff.path;
    if(action.payload.location.pathname === Urls.Staff.path)
        return updateState(state, { isLoading: true, messages: [] });

    return state;
};

const updateStaffs =
    (state, action) => updateState(state, { staffs: action.payload.staffs, isLoading: false });

const errorGetStaffs =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const changeStaffName =
    (state, action) => fromJS(state).setIn(["editingStaff", "name"], action.payload.name).toJS();

const changeStaffMemo =
    (state, action) => fromJS(state).setIn(["editingStaff", "memo"], action.payload.memo).toJS();

const newStaff = (state, action) => updateState(state, { editingStaff: action.payload });

const editStaff = (state, action) => updateState(state, { editingStaff: action.payload });

const cancelEditStaff = (state, action) => updateState(state, { editingStaff: null });

const addStaff = (state, action) => updateState(state, { isLoading: true });

const successAddStaff = (state, action) => {
    const newStaff = {
        staffId: action.payload.staff.staffId,
        name: action.payload.staff.name,
        memo: action.payload.staff.memo
    };

    const addedState = fromJS(state)
        .update('staffs', staffs => staffs.push(newStaff))
        .set('editingStaff', null).set('isLoading', false).toJS();

    return addedState;
};

const errorAddStaff =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const saveStaff = (state, action) => updateState(state, { isLoading: true });

const successSaveStaff = (state, action) => {
    const staff = action.payload.staff;
    const copyState = fromJS(state);
    const idx = copyState.get('staffs').findIndex(f => f.get('staffId') === staff.staffId);
    const newState = copyState
        .setIn(['staffs', idx], staff).set("isLoading", false).set('editingStaff', null).toJS();

    return newState;
};

const errorSaveStaff =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const cancelDeleteStaff = (state, action) => updateState(state, { confirmDeleteId: -1 });

const confirmDeleteStaff = (state, action) => updateState(state, { confirmDeleteId: action.payload.staffId });

const deleteStaff = (state, action) => updateState(state, { confirmDeleteId: -1, isLoading: true });

const successDeleteStaff = (state, action) => {
    const deletedList = List(state.staffs).filter(f => f.staffId !== action.payload.staffId).toJS();
    return updateState(state, { staffs: deletedList, isLoading: false });
};

const errorDeleteStaff =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const handlers = {
    "@@router/LOCATION_CHANGE": locationChange,
    SUCCESS_GET_SCHEDULES: updateStaffs,
    SUCCESS_GET_STAFFS: updateStaffs,
    ERROR_GET_STAFFS: errorGetStaffs,

    CHANGE_STAFF_NAME: changeStaffName,
    CHANGE_STAFF_MEMO: changeStaffMemo,

    NEW_STAFF: newStaff,
    EDIT_STAFF: editStaff,
    CANCEL_EDIT_STAFF: cancelEditStaff,

    ADD_STAFF: addStaff,
    SUCCESS_ADD_STAFF: successAddStaff,
    ERROR_ADD_STAFF: errorAddStaff,

    SAVE_STAFF: saveStaff,
    SUCCESS_SAVE_STAFF: successSaveStaff,
    ERROR_SAVE_STAFF: errorSaveStaff,

    CANCEL_DELETE_STAFF: cancelDeleteStaff,
    CONFIRM_DELETE_STAFF: confirmDeleteStaff,

    DELETE_STAFF: deleteStaff,
    SUCCESS_DELETE_STAFF: successDeleteStaff,
    ERROR_DELETE_STAFF: errorDeleteStaff,
};

export const staffReducer = createReducer(initialStaffState, handlers);

