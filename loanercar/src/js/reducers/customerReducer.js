import { fromJS, List } from 'immutable';
import { Urls } from '../constant/url';
import {createReducer, updateState} from "./utility";

export const initialCustomerState = {
    customers: [],
    messages: [],
    confirmDeleteId: -1,
    editingCustomer: null,
    isLoading: false,
};

const locationChange = (state, action) => {
    if(action.payload.location.pathname === Urls.Customer.path)
        return updateState(state, { isLoading: true, messages: [] });

    return state;
};

const updateCustomers =
    (state, action) => updateState(state, { customers: action.payload.customers, isLoading: false });

const errorGetCustomers =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const changeCustomerName =
    (state, action) => fromJS(state).setIn(["editingCustomer", "name"], action.payload.name).toJS();

const changeCustomerDriverType =
    (state, action) => fromJS(state).setIn(["editingCustomer", "driverType"], action.payload.driverType).toJS();

const changeCustomerMemo =
    (state, action) => fromJS(state).setIn(["editingCustomer", "memo"], action.payload.memo).toJS();

const newCustomer = (state, action) => updateState(state, { editingCustomer: action.payload });

const editCustomer = (state, action) => updateState(state, { editingCustomer: action.payload });

const cancelEditCustomer = (state, action) => updateState(state, { editingCustomer: null });

const addCustomer = (state, action) => updateState(state, { isLoading: true });

const successAddCustomer = (state, action) => {
    const newCustomer = {
        customerId: action.payload.customer.customerId,
        name: action.payload.customer.name,
        driverType: action.payload.customer.driverType,
        memo: action.payload.customer.memo
    };

    const addedState = fromJS(state)
        .update('customers', customers => customers.push(newCustomer))
        .set('editingCustomer', null).set('isLoading', false).toJS();

    return addedState;
};

const errorAddCustomer =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const saveCustomer = (state, action) => updateState(state, { isLoading: true });

const successSaveCustomer = (state, action) => {
    const customer = action.payload.customer;
    const copyState = fromJS(state);
    const idx = copyState.get('customers').findIndex(f => f.get('customerId') === customer.customerId);
    const newState = copyState
        .setIn(['customers', idx], customer).set("isLoading", false).set('editingCustomer', null).toJS();

    return newState;
};

const errorSaveCustomer =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const cancelDeleteCustomer = (state, action) => updateState(state, { confirmDeleteId: -1 });

const confirmDeleteCustomer = (state, action) => updateState(state, { confirmDeleteId: action.payload.customerId });

const deleteCustomer = (state, action) => updateState(state, { confirmDeleteId: -1, isLoading: true });

const successDeleteCustomer = (state, action) => {
    const deletedList = List(state.customers).filter(f => f.customerId !== action.payload.customerId).toJS();
    return updateState(state, { customers: deletedList, isLoading: false });
};

const errorDeleteCustomer =
    (state, action) => updateState(state, { messages: action.payload.messages, isLoading: false });

const handlers = {
    "@@router/LOCATION_CHANGE": locationChange,
    SUCCESS_GET_SCHEDULES: updateCustomers,
    SUCCESS_GET_CUSTOMERS: updateCustomers,
    ERROR_GET_CUSTOMERS: errorGetCustomers,

    CHANGE_CUSTOMER_NAME: changeCustomerName,
    CHANGE_CUSTOMER_DRIVER_TYPE: changeCustomerDriverType,
    CHANGE_CUSTOMER_MEMO: changeCustomerMemo,

    NEW_CUSTOMER: newCustomer,
    EDIT_CUSTOMER: editCustomer,
    CANCEL_EDIT_CUSTOMER: cancelEditCustomer,

    ADD_CUSTOMER: addCustomer,
    SUCCESS_ADD_CUSTOMER: successAddCustomer,
    ERROR_ADD_CUSTOMER: errorAddCustomer,

    SAVE_CUSTOMER: saveCustomer,
    SUCCESS_SAVE_CUSTOMER: successSaveCustomer,
    ERROR_SAVE_CUSTOMER: errorSaveCustomer,

    CANCEL_DELETE_CUSTOMER: cancelDeleteCustomer,
    CONFIRM_DELETE_CUSTOMER: confirmDeleteCustomer,

    DELETE_CUSTOMER: deleteCustomer,
    SUCCESS_DELETE_CUSTOMER: successDeleteCustomer,
    ERROR_DELETE_CUSTOMER: errorDeleteCustomer,
};

export const customerReducer = createReducer(initialCustomerState, handlers);

