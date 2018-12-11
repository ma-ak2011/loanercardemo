import React            from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaderForMember from '../components/HeaderForMember';
import * as actions  from '../actions/actions';


export default connect(
    state => ({
        user: state.userReducer.user,
        mobileOpen: state.uiReducer.mobileOpen,
        currentPath: state.router.location === null
            ? ""
            : state.router.location.pathname
    }),
    dispatch => bindActionCreators(actions, dispatch)
)(HeaderForMember);