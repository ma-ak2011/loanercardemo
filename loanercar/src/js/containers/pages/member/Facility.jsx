import React from 'react';
import {connect} from 'react-redux';
import {Facility} from '../../../components/pages/member/Facility';
import {
    addFacility,
    cancelDeleteFacility,
    cancelEditFacility,
    changeExpireDate,
    changeFacilityCarType,
    changeFacilityMemo,
    changeFacilityName,
    confirmDeleteFacility,
    deleteFacility,
    editFacility,
    newFacility,
    saveFacility
} from "../../../actions/facilityActions";


export default connect(
    state => ({
        facilities: state.facilityReducer.facilities,
        facilityName: state.facilityReducer.facilityName,
        carType: state.facilityReducer.carType,
        messages: state.facilityReducer.messages,
        userId: state.userReducer.user.id,
        confirmDeleteId: state.facilityReducer.confirmDeleteId,
        editingFacility: state.facilityReducer.editingFacility,
        isLoading: state.facilityReducer.isLoading,
    }),
    (dispatch) => ({
        changeFacilityName: name => dispatch(changeFacilityName(name)),
        changeFacilityCarType: type => dispatch(changeFacilityCarType(type)),
        changeExpireDate: date => dispatch(changeExpireDate(date)),
        changeFacilityMemo: memo => dispatch(changeFacilityMemo(memo)),

        newFacility: () => dispatch(newFacility()),
        editFacility: facility => dispatch(editFacility(facility)),
        cancelEditFacility: () => dispatch(cancelEditFacility()),
        addFacility: (userId, name, type, date, memo) => dispatch(addFacility(userId, name, type, date, memo)),
        saveFacility: (userId, facilityId, name, carType, expireDate, memo) =>
            dispatch(saveFacility(userId, facilityId, name, carType, expireDate, memo)),

        deleteFacility: (userId, facilityId) => dispatch(deleteFacility(userId, facilityId)),
        cancelDeleteFacility: () => dispatch(cancelDeleteFacility()),
        confirmDeleteFacility: facilityId => dispatch(confirmDeleteFacility(facilityId)),

    })
)(Facility);