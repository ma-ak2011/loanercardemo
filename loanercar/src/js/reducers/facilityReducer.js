import { fromJS, List } from 'immutable';
import { Urls } from '../constant/url';
import {createReducer, updateState} from "./utility";

export const initialFacilityState = {
    facilities: [],
    facilityName: "",
    carType: 0,
    messages: [],
    confirmDeleteId: -1,
    editingFacility: null,
    isLoading: false,
};

const locationChange = (state, action) => {
    const t = Urls.Facility.path;
    if(action.payload.location.pathname === Urls.Facility.path)
        return updateState(state, { isLoading: true, messages: [] });

    return state;
};

const updateFacilities =
    (state, action) => updateState(state, { facilities: action.payload.facilities, isLoading: false });

const errorGetFacilities =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const changeFacilityName =
    (state, action) => fromJS(state).setIn(["editingFacility", "name"], action.payload.name).toJS();

const changeFacilityCarType =
    (state, action) => fromJS(state).setIn(["editingFacility", "carType"], action.payload.carType).toJS();

const changeExpireDate =
    (state, action) => fromJS(state).setIn(["editingFacility", "expireDate"], action.payload.expireDate).toJS();

const changeFacilityMemo =
    (state, action) => fromJS(state).setIn(["editingFacility", "memo"], action.payload.memo).toJS();

const newFacility = (state, action) => updateState(state, { editingFacility: action.payload });

const editFacility = (state, action) => updateState(state, { editingFacility: action.payload });

const cancelEditFacility = (state, action) => updateState(state, { editingFacility: null });

const addFacility = (state, action) => updateState(state, { isLoading: true });

const successAddFacility = (state, action) => {
    const newFacility = {
        facilityId: action.payload.facility.facilityId,
        name: action.payload.facility.name,
        carType: action.payload.facility.carType,
        expireDate: action.payload.facility.expireDate,
        memo: action.payload.facility.memo
    };

    const addedState = fromJS(state)
        .update('facilities', facilities => facilities.push(newFacility))
        .set('editingFacility', null).set('isLoading', false).toJS();

    return addedState;
};

const errorAddFacility =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const saveFacility = (state, action) => updateState(state, { isLoading: true });

const successSaveFacility = (state, action) => {
    const facility = action.payload.facility;
    const copyState = fromJS(state);
    const idx = copyState.get('facilities').findIndex(f => f.get('facilityId') === facility.facilityId);
    const newState = copyState
        .setIn(['facilities', idx], facility).set("isLoading", false).set('editingFacility', null).toJS();

    return newState;
};

const errorSaveFacility =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const cancelDeleteFacility = (state, action) => updateState(state, { confirmDeleteId: -1 });

const confirmDeleteFacility = (state, action) => updateState(state, { confirmDeleteId: action.payload.facilityId });

const deleteFacility = (state, action) => updateState(state, { confirmDeleteId: -1, isLoading: true });

const successDeleteFacility = (state, action) => {
    const deletedList = List(state.facilities).filter(f => f.facilityId !== action.payload.facilityId).toJS();
    return updateState(state, { facilities: deletedList, isLoading: false });
};

const errorDeleteFacility =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const handlers = {
    "@@router/LOCATION_CHANGE": locationChange,
    SUCCESS_GET_SCHEDULES: updateFacilities,
    SUCCESS_GET_FACILITIES: updateFacilities,
    ERROR_GET_FACILITIES: errorGetFacilities,

    CHANGE_FACILITY_NAME: changeFacilityName,
    CHANGE_FACILITY_CAR_TYPE: changeFacilityCarType,
    CHANGE_EXPIRE_DATE: changeExpireDate,
    CHANGE_FACILITY_MEMO: changeFacilityMemo,

    NEW_FACILITY: newFacility,
    EDIT_FACILITY: editFacility,
    CANCEL_EDIT_FACILITY: cancelEditFacility,

    ADD_FACILITY: addFacility,
    SUCCESS_ADD_FACILITY: successAddFacility,
    ERROR_ADD_FACILITY: errorAddFacility,

    SAVE_FACILITY: saveFacility,
    SUCCESS_SAVE_FACILITY: successSaveFacility,
    ERROR_SAVE_FACILITY: errorSaveFacility,

    CANCEL_DELETE_FACILITY: cancelDeleteFacility,
    CONFIRM_DELETE_FACILITY: confirmDeleteFacility,

    DELETE_FACILITY: deleteFacility,
    SUCCESS_DELETE_FACILITY: successDeleteFacility,
    ERROR_DELETE_FACILITY: errorDeleteFacility,
};

export const facilityReducer = createReducer(initialFacilityState, handlers);

