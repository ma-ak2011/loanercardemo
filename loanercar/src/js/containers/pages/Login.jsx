import React from 'react';
import {connect} from 'react-redux';
import {Login} from '../../components/pages/Login';
import {changeLoginEmail, changeLoginPassword, login} from "../../actions/loginActions";


export default connect(
    state => ({
        loginFailed: state.loginReducer.loginFailed,
        isLoggedIn: state.loginReducer.isLoggedIn,
        email: state.loginReducer.email,
        password: state.loginReducer.password,
    }),

    dispatch => ({
        changeEmail: e => dispatch(changeLoginEmail(e.target.value)),
        changePassword: e => dispatch(changeLoginPassword(e.target.value)),
        login: (email, password) => dispatch(login(email, password)),
    })
)(Login);