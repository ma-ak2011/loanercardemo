import React from 'react';
import {connect} from 'react-redux';
import {Staff} from '../../../components/pages/member/Staff';
import {
    addStaff,
    cancelDeleteStaff,
    cancelEditStaff,
    changeStaffMemo,
    changeStaffName,
    confirmDeleteStaff,
    deleteStaff,
    editStaff,
    newStaff,
    saveStaff
} from "../../../actions/staffActions";


export default connect(
    state => ({
        staffs: state.staffReducer.staffs,
        staffName: state.staffReducer.staffName,
        messages: state.staffReducer.messages,
        userId: state.userReducer.user.id,
        confirmDeleteId: state.staffReducer.confirmDeleteId,
        editingStaff: state.staffReducer.editingStaff,
        isLoading: state.staffReducer.isLoading,
    }),
    (dispatch) => ({
        changeStaffName: name => dispatch(changeStaffName(name)),
        changeStaffMemo: memo => dispatch(changeStaffMemo(memo)),

        newStaff: () => dispatch(newStaff()),
        editStaff: staff => dispatch(editStaff(staff)),
        cancelEditStaff: () => dispatch(cancelEditStaff()),
        addStaff: (userId, name, memo) => dispatch(addStaff(userId, name, memo)),
        saveStaff: (userId, staffId, name, memo) =>
            dispatch(saveStaff(userId, staffId, name, memo)),

        deleteStaff: (userId, staffId) => dispatch(deleteStaff(userId, staffId)),
        cancelDeleteStaff: () => dispatch(cancelDeleteStaff()),
        confirmDeleteStaff: staffId => dispatch(confirmDeleteStaff(staffId)),

    })
)(Staff);