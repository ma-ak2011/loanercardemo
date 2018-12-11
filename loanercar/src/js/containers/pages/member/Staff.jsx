import React            from 'react';
import { connect } from 'react-redux';
import { Staff } from '../../../components/pages/member/Staff';
import * as actions  from '../../../actions/actions';


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
        changeStaffName: name => dispatch(actions.changeStaffName(name)),
        changeStaffMemo: memo => dispatch(actions.changeStaffMemo(memo)),

        newStaff: () => dispatch(actions.newStaff()),
        editStaff: staff => dispatch(actions.editStaff(staff)),
        cancelEditStaff: () => dispatch(actions.cancelEditStaff()),
        addStaff: (userId, name, memo) => dispatch(actions.addStaff(userId, name, memo)),
        saveStaff: (userId, staffId, name, memo) =>
            dispatch(actions.saveStaff(userId, staffId, name, memo)),

        deleteStaff: (userId, staffId) => dispatch(actions.deleteStaff(userId, staffId)),
        cancelDeleteStaff: () => dispatch(actions.cancelDeleteStaff()),
        confirmDeleteStaff: staffId => dispatch(actions.confirmDeleteStaff(staffId)),

    })
)(Staff);