import React from 'react';
import {connect} from 'react-redux';
import {CreateAccount} from '../../components/pages/CreateAccount';
import {
    changeEmail,
    changePassword,
    changePasswordConfirm,
    createAccount,
    passwordConfirmFocusedOnce,
    passwordFocusedOnce,
    validateEmail,
    validatePassword,
    validatePasswordConfirm
} from "../../actions/createAccountActions";


export default connect(
    state => ({
        isLoggedIn: state.loginReducer.isLoggedIn,
        email: state.createAccountReducer.email,
        password: state.createAccountReducer.password,
        passwordConfirm: state.createAccountReducer.passwordConfirm,

        errorPasswordMessage: state.createAccountReducer.errorPasswordMessage,
        errorPasswordConfirmMessage: state.createAccountReducer.errorPasswordConfirmMessage,
        errorEmailMessage: state.createAccountReducer.errorEmailMessage,
        errorServerMessage: state.createAccountReducer.errorServerMessage,
    }),

    (dispatch) => ({
        changeEmail: e => dispatch(changeEmail(e.target.value)),
        validateEmail: email => dispatch(validateEmail(email)),

        changePassword: e => dispatch(changePassword(e.target.value)),
        changePasswordConfirm: e => dispatch(changePasswordConfirm(e.target.value)),
        validatePassword: password => dispatch(validatePassword(password)),
        validatePasswordConfirm: passwordConfirm => dispatch(validatePasswordConfirm(passwordConfirm)),

        createAccount: (password, passwordConfirm, email) =>
            dispatch(createAccount(password, passwordConfirm, email)),
        passwordFocusedOnce: e => dispatch(passwordFocusedOnce()),
        passwordConfirmFocusedOnce: e => dispatch(passwordConfirmFocusedOnce()),
    })
)(CreateAccount);
