import React            from 'react';
import { connect } from 'react-redux';
import HeaderForMember from '../components/HeaderForMember';
import * as actions  from '../actions/uiActions';
import * as loginActions  from '../actions/loginActions';


export default connect(
    state => ({
        user: state.userReducer.user,
        mobileOpen: state.uiReducer.mobileOpen,
        currentPath: state.router.location === null
            ? ""
            : state.router.location.pathname
    }),
    dispatch => ({
        logout: () => dispatch(loginActions.logout()),
        toggleMenu: () => dispatch(actions.toggleMenu()),
    })
)(HeaderForMember);