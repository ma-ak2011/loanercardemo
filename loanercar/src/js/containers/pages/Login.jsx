import React            from 'react';
import { connect } from 'react-redux';
import { Login } from '../../components/pages/Login';
import * as actions  from '../../actions/actions';


export default connect(
    state => ({
        loginFailed: state.loginReducer.loginFailed,
        isLoggedIn: state.loginReducer.isLoggedIn,
        email: state.loginReducer.email,
        password: state.loginReducer.password,
    }),

    dispatch => ({
        changeEmail: e => dispatch(actions.changeLoginEmail(e.target.value)),
        changePassword: e => dispatch(actions.changeLoginPassword(e.target.value)),
        login: (email, password) => dispatch(actions.login(email, password)),
    })
)(Login);