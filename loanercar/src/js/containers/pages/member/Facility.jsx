import React            from 'react';
import { connect } from 'react-redux';
import { Facility } from '../../../components/pages/member/Facility';
import * as actions  from '../../../actions/actions';


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
        changeFacilityName: name => dispatch(actions.changeFacilityName(name)),
        changeFacilityCarType: type => dispatch(actions.changeFacilityCarType(type)),
        changeExpireDate: date => dispatch(actions.changeExpireDate(date)),
        changeFacilityMemo: memo => dispatch(actions.changeFacilityMemo(memo)),

        newFacility: () => dispatch(actions.newFacility()),
        editFacility: facility => dispatch(actions.editFacility(facility)),
        cancelEditFacility: () => dispatch(actions.cancelEditFacility()),
        addFacility: (userId, name, type, date, memo) => dispatch(actions.addFacility(userId, name, type, date, memo)),
        saveFacility: (userId, facilityId, name, carType, expireDate, memo) =>
            dispatch(actions.saveFacility(userId, facilityId, name, carType, expireDate, memo)),

        deleteFacility: (userId, facilityId) => dispatch(actions.deleteFacility(userId, facilityId)),
        cancelDeleteFacility: () => dispatch(actions.cancelDeleteFacility()),
        confirmDeleteFacility: facilityId => dispatch(actions.confirmDeleteFacility(facilityId)),

    })
)(Facility);