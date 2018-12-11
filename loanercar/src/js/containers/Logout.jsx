import React            from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Logout } from '../components/Logout';
import * as actions  from '../actions/actions';


export default connect(
    state => ({ logoutFailed: state.loginReducer.logoutFailed}),
    dispatch => bindActionCreators(actions, dispatch)
)(Logout);