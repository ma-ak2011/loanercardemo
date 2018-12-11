import { createAction } from 'redux-actions';
import { ActionTypes as actions }from "./actionTypes";
import moment from 'moment';

moment.locale("ja");

export const validateEmail = email => ({
    type: actions.VALIDATE_EMAIL,
    payload: { email: email },
    meta: {},
    error: false
});

export const finishEmailValidation = errorMessage => ({
    type: actions.FINISH_EMAIL_VALIDATION,
    payload: { errorEmailMessage: errorMessage },
    meta: {},
    error: false
});

export const changeEmail = email => ({
    type: actions.CHANGE_EMAIL,
    payload: { email: email },
    meta: {},
    error: false
});

export const passwordFocusedOnce = createAction(actions.PASSWORD_FOCUSED_ONCE)
export const validatePassword = password => ({
    type: actions.VALIDATE_PASSWORD,
    payload: { password: password },
    meta: {},
    error: false
});

export const finishPasswordValidation = errorMessage => ({
    type: actions.FINISH_PASSWORD_VALIDATION,
    payload: { errorPasswordMessage: errorMessage },
    meta: {},
    error: false
});

export const changePassword = password => ({
    type: actions.CHANGE_PASSWORD,
    payload: { password: password },
    meta: {},
    error: false
});

export const passwordConfirmFocusedOnce = createAction(actions.PASSWORD_CONFIRM_FOCUSED_ONCE)
export const validatePasswordConfirm = createAction(actions.VALIDATE_PASSWORD_CONFIRM);
export const finishPasswordConfirmValidation = result => ({
    type: actions.FINISH_PASSWORD_CONFIRM_VALIDATION,
    payload: { result: result },
    meta: {},
    error: false
});

export const changePasswordConfirm = passwordConfirm => ({
    type: actions.CHANGE_PASSWORD_CONFIRM,
    payload: { passwordConfirm: passwordConfirm },
    meta: {},
    error: false
});

export const changeLoginEmail = email => ({
    type: actions.CHANGE_LOGIN_EMAIL,
    payload: { email: email },
    meta: {},
    error: false
});

export const changeLoginPassword = password => ({
    type: actions.CHANGE_LOGIN_PASSWORD,
    payload: { password: password },
    meta: {},
    error: false
});

export const createAccount = (password, passwordConfirm, email) => ({
    type: actions.CREATE_ACCOUNT,
    payload: { password: password, passwordConfirm: passwordConfirm, email: email },
    meta: {},
    error: false
});

export const successCreateAccount = user => ({
    type: actions.SUCCESS_CREATE_ACCOUNT,
    payload: { user: user },
    meta: {},
    error: false
});

export const errorCreateAccount = result => ({
    type: actions.ERROR_CREATE_ACCOUNT,
    payload: { result: result },
    meta: {},
    error: true
});

export const fetchLoginState = createAction(actions.FETCH_LOGIN_STATE);
export const successFetchLoginState = response => ({
    type: actions.SUCCESS_FETCH_LOGIN_STATE,
    payload: response ,
    meta: {},
    error: false
});

export const login = (email, password) => ({
    type: actions.LOGIN,
    payload: { password: password, email: email },
    meta: {},
    error: false
});

export const successLogin = response => ({
    type: actions.SUCCESS_LOGIN,
    payload: response,
    meta: {},
    error: false
});

export const errorLogin = response => ({
    type: actions.ERROR_LOGIN,
    payload: response,
    meta: {},
    error: true
});

export const logout = createAction(actions.LOGOUT);
export const successLogout = createAction(actions.SUCCESS_LOGOUT);
export const errorLogout = createAction(actions.ERROR_LOGOUT);

export const changeCustomerName = name => ({
    type: actions.CHANGE_CUSTOMER_NAME,
    payload: { name: name },
    meta: {},
    error: false
});

export const changeCustomerDriverType = driverType => ({
    type: actions.CHANGE_CUSTOMER_DRIVER_TYPE,
    payload: { driverType: driverType },
    meta: {},
    error: false
});

export const changeCustomerMemo = memo => ({
    type: actions.CHANGE_CUSTOMER_MEMO,
    payload: { memo: memo },
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
    payload: customer ,
    meta: {},
    error: false
});

export const cancelEditCustomer = createAction(actions.CANCEL_EDIT_CUSTOMER);

export const addCustomer = (userId, name, driverType, memo) => ({
    type: actions.ADD_CUSTOMER,
    payload: { userId: userId, name: name, driverType: driverType, memo: memo },
    meta: {},
    error: false
});

export const successAddCustomer = customer => ({
    type: actions.SUCCESS_ADD_CUSTOMER,
    payload: { customer: customer },
    meta: {},
    error: false
});

export const errorAddCustomer = massages => ({
    type: actions.ERROR_ADD_CUSTOMER,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const saveCustomer = (userId, customerId, name, driverType, memo) => ({
    type: actions.SAVE_CUSTOMER,
    payload: { userId: userId, customerId: customerId,
        name: name, driverType: driverType, memo: memo },
    meta: {},
    error: false
});

export const errorSaveCustomer = createAction(actions.ERROR_SAVE_CUSTOMER);
export const successSaveCustomer = customer => ({
    type: actions.SUCCESS_SAVE_CUSTOMER,
    payload: { customer: customer },
    meta: {},
    error: false
});

export const successGetCustomers = customers => ({
    type: actions.SUCCESS_GET_CUSTOMERS,
    payload: { customers: customers },
    meta: {},
    error: false
});

export const errorGetCustomers = massages => ({
    type: actions.ERROR_GET_CUSTOMERS,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const cancelDeleteCustomer = createAction(actions.CANCEL_DELETE_CUSTOMER);

export const confirmDeleteCustomer = customerId => ({
    type: actions.CONFIRM_DELETE_CUSTOMER,
    payload: { customerId: customerId },
    meta: {},
    error: false
});

export const deleteCustomer = (userId, customerId) => ({
    type: actions.DELETE_CUSTOMER,
    payload: { userId: userId, customerId: customerId },
    meta: {},
    error: false
});

export const successDeleteCustomer = customerId => ({
    type: actions.SUCCESS_DELETE_CUSTOMER,
    payload: { customerId: customerId },
    meta: {},
    error: false
});

export const errorDeleteCustomer = massages => ({
    type: actions.ERROR_DELETE_CUSTOMER,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const changeStaffName = name => ({
    type: actions.CHANGE_STAFF_NAME,
    payload: { name: name },
    meta: {},
    error: false
});

export const changeStaffMemo = memo => ({
    type: actions.CHANGE_STAFF_MEMO,
    payload: { memo: memo },
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
    payload: staff ,
    meta: {},
    error: false
});

export const cancelEditStaff = createAction(actions.CANCEL_EDIT_STAFF);

export const addStaff = (userId, name, memo) => ({
    type: actions.ADD_STAFF,
    payload: { userId: userId, name: name, memo: memo },
    meta: {},
    error: false
});

export const successAddStaff = staff => ({
    type: actions.SUCCESS_ADD_STAFF,
    payload: { staff: staff },
    meta: {},
    error: false
});

export const errorAddStaff = massages => ({
    type: actions.ERROR_ADD_STAFF,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const saveStaff = (userId, staffId, name, memo) => ({
    type: actions.SAVE_STAFF,
    payload: { userId: userId, staffId: staffId, name: name, memo: memo },
    meta: {},
    error: false
});

export const errorSaveStaff = createAction(actions.ERROR_SAVE_STAFF);
export const successSaveStaff = staff => ({
    type: actions.SUCCESS_SAVE_STAFF,
    payload: { staff: staff },
    meta: {},
    error: false
});

export const successGetStaffs = staffs => ({
    type: actions.SUCCESS_GET_STAFFS,
    payload: { staffs: staffs },
    meta: {},
    error: false
});

export const errorGetStaffs = massages => ({
    type: actions.ERROR_GET_STAFFS,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const cancelDeleteStaff = createAction(actions.CANCEL_DELETE_STAFF);

export const confirmDeleteStaff = staffId => ({
    type: actions.CONFIRM_DELETE_STAFF,
    payload: { staffId: staffId },
    meta: {},
    error: false
});

export const deleteStaff = (userId, staffId) => ({
    type: actions.DELETE_STAFF,
    payload: { userId: userId, staffId: staffId },
    meta: {},
    error: false
});

export const successDeleteStaff = staffId => ({
    type: actions.SUCCESS_DELETE_STAFF,
    payload: { staffId: staffId },
    meta: {},
    error: false
});

export const errorDeleteStaff = massages => ({
    type: actions.ERROR_DELETE_STAFF,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const changeFacilityName = name => ({
    type: actions.CHANGE_FACILITY_NAME,
    payload: { name: name },
    meta: {},
    error: false
});

export const changeFacilityCarType = carType => ({
    type: actions.CHANGE_FACILITY_CAR_TYPE,
    payload: { carType: carType },
    meta: {},
    error: false
});

export const changeExpireDate = date => ({
    type: actions.CHANGE_EXPIRE_DATE,
    payload: { expireDate: date },
    meta: {},
    error: false
});

export const changeFacilityMemo = memo => ({
    type: actions.CHANGE_FACILITY_MEMO,
    payload: { memo: memo },
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
    payload: facility ,
    meta: {},
    error: false
});

export const cancelEditFacility = createAction(actions.CANCEL_EDIT_FACILITY);

export const addFacility = (userId, name, carType, expireDate, memo) => ({
    type: actions.ADD_FACILITY,
    payload: { userId: userId, name: name, carType: carType, expireDate: expireDate, memo: memo },
    meta: {},
    error: false
});

export const successAddFacility = facility => ({
    type: actions.SUCCESS_ADD_FACILITY,
    payload: { facility: facility },
    meta: {},
    error: false
});

export const errorAddFacility = massages => ({
    type: actions.ERROR_ADD_FACILITY,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const saveFacility = (userId, facilityId, name, carType, expireDate, memo) => ({
    type: actions.SAVE_FACILITY,
    payload: { userId: userId, facilityId: facilityId,
        name: name, carType: carType, expireDate: expireDate, memo: memo },
    meta: {},
    error: false
});

export const errorSaveFacility = createAction(actions.ERROR_SAVE_FACILITY);
export const successSaveFacility = facility => ({
    type: actions.SUCCESS_SAVE_FACILITY,
    payload: { facility: facility },
    meta: {},
    error: false
});

export const successGetFacilities = facilities => ({
    type: actions.SUCCESS_GET_FACILITIES,
    payload: { facilities: facilities },
    meta: {},
    error: false
});

export const errorGetFacilities = massages => ({
    type: actions.ERROR_GET_FACILITIES,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const cancelDeleteFacility = createAction(actions.CANCEL_DELETE_FACILITY);

export const confirmDeleteFacility = facilityId => ({
    type: actions.CONFIRM_DELETE_FACILITY,
    payload: { facilityId: facilityId },
    meta: {},
    error: false
});

export const deleteFacility = (userId, facilityId) => ({
    type: actions.DELETE_FACILITY,
    payload: { userId: userId, facilityId: facilityId },
    meta: {},
    error: false
});

export const successDeleteFacility = facilityId => ({
    type: actions.SUCCESS_DELETE_FACILITY,
    payload: { facilityId: facilityId },
    meta: {},
    error: false
});

export const errorDeleteFacility = massages => ({
    type: actions.ERROR_DELETE_FACILITY,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const successGetSchedules = (schedules, customers, facilities, staffs) => ({
    type: actions.SUCCESS_GET_SCHEDULES,
    payload: { schedules: schedules, customers: customers, facilities: facilities, staffs },
    meta: {},
    error: false
});

export const errorGetSchedules = massages => ({
    type: actions.ERROR_GET_SCHEDULES,
    payload: { massages: massages },
    meta: {},
    error: false
});
export const newSchedule = (facilityId, facilityName, start, end) => ({
    type: actions.NEW_SCHEDULE,
    payload: {
        editedSchedule : {
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
    payload: { customerId: customerId },
    meta: {},
    error: false
});

export const changeSelectedStaff = staffId => ({
    type: actions.CHANGE_SELECTED_STAFF,
    payload: { staffId: staffId },
    meta: {},
    error: false
});

export const changeMemo = memo => ({
    type: actions.CHANGE_MEMO,
    payload: { memo: memo },
    meta: {},
    error: false
});

export const changeSelectedRentalReason = reason => ({
    type: actions.CHANGE_SELECTED_RENTAL_REASON,
    payload: { rentalReason: reason },
    meta: {},
    error: false
});

export const changeStart = start => ({
    type: actions.CHANGE_START,
    payload: { start: start },
    meta: {},
    error: false
});

export const changeEnd = end => ({
    type: actions.CHANGE_END,
    payload: { end: end },
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
    payload: { schedule: schedule },
    meta: {},
    error: false
});

export const errorAddSchedule = massages => ({
    type: actions.ERROR_ADD_SCHEDULE,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const editSchedule = schedule => ({
    type: actions.EDIT_SCHEDULE,
    payload: { schedule: schedule },
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
        staffId:staffId,
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
    payload: { schedule: schedule },
    meta: {},
    error: false
});

export const cancelDeleteSchedule = scheduleId => ({
    type: actions.CANCEL_DELETE_SCHEDULE,
    payload: { scheduleId: scheduleId },
    meta: {},
    error: false
});

export const confirmDeleteSchedule = scheduleId => ({
    type: actions.CONFIRM_DELETE_SCHEDULE,
    payload: { scheduleId: scheduleId },
    meta: {},
    error: false
});

export const deleteSchedule = (userId, scheduleId) => ({
    type: actions.DELETE_SCHEDULE,
    payload: { userId: userId, scheduleId: scheduleId },
    meta: {},
    error: false
});

export const successDeleteSchedule = scheduleId => ({
    type: actions.SUCCESS_DELETE_SCHEDULE,
    payload: { scheduleId: scheduleId },
    meta: {},
    error: false
});

export const errorDeleteSchedule = massages => ({
    type: actions.ERROR_DELETE_SCHEDULE,
    payload: { massages: massages },
    meta: {},
    error: false
});

export const changeFilterType = f => ({
    type: actions.CHANGE_FILTER_TYPE,
    payload: { filterType: f },
    meta: {},
    error: false
});

export const clearState = createAction(actions.CLEAR_STATE);

export const toggleMenu = createAction(actions.TOGGLE_MENU);
