import React            from 'react';
import { connect } from 'react-redux';
import { Schedule } from '../../../components/pages/member/Schedule';
import * as actions  from '../../../actions/actions';


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
    }),
    (dispatch) => ({
        changeSelectedCustomer: customerId => dispatch(actions.changeSelectedCustomer(customerId)),
        changeSelectedStaff: staffId => dispatch(actions.changeSelectedStaff(staffId)),
        changeSelectedRentalReason: reason => dispatch(actions.changeSelectedRentalReason(reason)),
        changeMemo: m => dispatch(actions.changeMemo(m)),
        changeStart: start => dispatch(actions.changeStart(start)),
        changeEnd: end => dispatch(actions.changeEnd(end)),
        cancelEditSchedule: () => dispatch(actions.cancelEditSchedule()),

        newSchedule: (facilityId, facilityName, startTime, endTime) =>
            dispatch(actions.newSchedule(facilityId, facilityName, startTime, endTime)),

        editSchedule: schedule => dispatch(actions.editSchedule(schedule)),

        saveSchedule: (scheduleId, userId, facilityId, customerId, staffId, start, end, memo, rentalReason) =>
            dispatch(actions.saveSchedule(scheduleId, userId, facilityId,
                customerId, staffId, start, end, memo, rentalReason)),

        addSchedule: (userId, facilityId, customerId, staffId, start, end, memo, rentalReason) =>
            dispatch(actions.addSchedule(userId, facilityId, customerId, staffId, start, end, memo, rentalReason)),

        confirmDeleteSchedule: scheduleId => dispatch(actions.confirmDeleteSchedule(scheduleId)),
        cancelDeleteSchedule: scheduleId => dispatch(actions.cancelDeleteSchedule(scheduleId)),
        deleteSchedule: (userId, scheduleId) => dispatch(actions.deleteSchedule(userId, scheduleId)),

        changeFilterType: filter => dispatch(actions.changeFilterType(filter)),
    })
)(Schedule);