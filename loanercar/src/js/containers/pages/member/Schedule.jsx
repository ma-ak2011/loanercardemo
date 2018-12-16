import React from 'react';
import {connect} from 'react-redux';
import {Schedule} from '../../../components/pages/member/Schedule';
import {
    addSchedule,
    cancelDeleteSchedule,
    cancelEditSchedule,
    changeEnd,
    changeFilterType,
    changeMemo,
    changeSelectedCustomer,
    changeSelectedRentalReason,
    changeSelectedStaff,
    changeStart,
    confirmDeleteSchedule,
    deleteSchedule,
    editSchedule,
    newSchedule,
    saveSchedule,
    toggleCarList
} from "../../../actions/scheduleActions";


export default connect(
    state => ({
        userId: state.userReducer.user.id,
        facilities: state.facilityReducer.facilities,
        customers: state.customerReducer.customers,
        staffs: state.staffReducer.staffs,
        schedules: state.scheduleReducer.schedules,
        messages: state.facilityReducer.messages,
        deleteConfirmId: state.scheduleReducer.deleteConfirmId,
        editedSchedule: state.scheduleReducer.editedSchedule,
        isLoading: state.scheduleReducer.isLoading,

        filterType: state.scheduleReducer.filterType,
        showCarList: state.scheduleReducer.showCarList,
    }),
    (dispatch) => ({
        changeSelectedCustomer: customerId => dispatch(changeSelectedCustomer(customerId)),
        changeSelectedStaff: staffId => dispatch(changeSelectedStaff(staffId)),
        changeSelectedRentalReason: reason => dispatch(changeSelectedRentalReason(reason)),
        changeMemo: m => dispatch(changeMemo(m)),
        changeStart: start => dispatch(changeStart(start)),
        changeEnd: end => dispatch(changeEnd(end)),
        cancelEditSchedule: () => dispatch(cancelEditSchedule()),

        newSchedule: (facilityId, facilityName, startTime, endTime) =>
            dispatch(newSchedule(facilityId, facilityName, startTime, endTime)),

        editSchedule: schedule => dispatch(editSchedule(schedule)),

        saveSchedule: (scheduleId, userId, facilityId, customerId, staffId, start, end, memo, rentalReason) =>
            dispatch(saveSchedule(scheduleId, userId, facilityId,
                customerId, staffId, start, end, memo, rentalReason)),

        addSchedule: (userId, facilityId, customerId, staffId, start, end, memo, rentalReason) =>
            dispatch(addSchedule(userId, facilityId, customerId, staffId, start, end, memo, rentalReason)),

        confirmDeleteSchedule: scheduleId => dispatch(confirmDeleteSchedule(scheduleId)),
        cancelDeleteSchedule: scheduleId => dispatch(cancelDeleteSchedule(scheduleId)),
        deleteSchedule: (userId, scheduleId) => dispatch(deleteSchedule(userId, scheduleId)),

        changeFilterType: filter => dispatch(changeFilterType(filter)),
        toggleCarList: () => dispatch(toggleCarList()),
    })
)(Schedule);