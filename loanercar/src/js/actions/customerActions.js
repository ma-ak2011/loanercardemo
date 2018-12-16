import {ActionTypes as actions} from "../actionTypes/customerActionTypes";
import {createAction} from "redux-actions";

export const changeCustomerName = name => ({
    type: actions.CHANGE_CUSTOMER_NAME,
    payload: {name: name},
    meta: {},
    error: false
});
export const changeCustomerDriverType = driverType => ({
    type: actions.CHANGE_CUSTOMER_DRIVER_TYPE,
    payload: {driverType: driverType},
    meta: {},
    error: false
});
export const changeCustomerMemo = memo => ({
    type: actions.CHANGE_CUSTOMER_MEMO,
    payload: {memo: memo},
    meta: {},
    error: false
});
export const newCustomer = () => ({
    type: actions.NEW_CUSTOMER,
    payload: {
        customerId: -1,
        name: "",
        driverType: -1,
        memo: "",
    },
    meta: {},
    error: false
});
export const editCustomer = customer => ({
    type: actions.EDIT_CUSTOMER,
    payload: customer,
    meta: {},
    error: false
});
export const cancelEditCustomer = createAction(actions.CANCEL_EDIT_CUSTOMER);
export const addCustomer = (userId, name, driverType, memo) => ({
    type: actions.ADD_CUSTOMER,
    payload: {userId: userId, name: name, driverType: driverType, memo: memo},
    meta: {},
    error: false
});
export const successAddCustomer = customer => ({
    type: actions.SUCCESS_ADD_CUSTOMER,
    payload: {customer: customer},
    meta: {},
    error: false
});
export const errorAddCustomer = massages => ({
    type: actions.ERROR_ADD_CUSTOMER,
    payload: {massages: massages},
    meta: {},
    error: false
});
export const saveCustomer = (userId, customerId, name, driverType, memo) => ({
    type: actions.SAVE_CUSTOMER,
    payload: {
        userId: userId, customerId: customerId,
        name: name, driverType: driverType, memo: memo
    },
    meta: {},
    error: false
});
export const errorSaveCustomer = createAction(actions.ERROR_SAVE_CUSTOMER);
export const successSaveCustomer = customer => ({
    type: actions.SUCCESS_SAVE_CUSTOMER,
    payload: {customer: customer},
    meta: {},
    error: false
});
export const successGetCustomers = customers => ({
    type: actions.SUCCESS_GET_CUSTOMERS,
    payload: {customers: customers},
    meta: {},
    error: false
});
export const errorGetCustomers = massages => ({
    type: actions.ERROR_GET_CUSTOMERS,
    payload: {massages: massages},
    meta: {},
    error: false
});
export const cancelDeleteCustomer = createAction(actions.CANCEL_DELETE_CUSTOMER);
export const confirmDeleteCustomer = customerId => ({
    type: actions.CONFIRM_DELETE_CUSTOMER,
    payload: {customerId: customerId},
    meta: {},
    error: false
});
export const deleteCustomer = (userId, customerId) => ({
    type: actions.DELETE_CUSTOMER,
    payload: {userId: userId, customerId: customerId},
    meta: {},
    error: false
});
export const successDeleteCustomer = customerId => ({
    type: actions.SUCCESS_DELETE_CUSTOMER,
    payload: {customerId: customerId},
    meta: {},
    error: false
});
export const errorDeleteCustomer = massages => ({
    type: actions.ERROR_DELETE_CUSTOMER,
    payload: {massages: massages},
    meta: {},
    error: false
});