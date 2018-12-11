import React            from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CreateAccount } from '../../components/pages/CreateAccount';
import * as actions  from '../../actions/actions';


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
        changeEmail: e => dispatch(actions.changeEmail(e.target.value)),
        validateEmail: email => dispatch(actions.validateEmail(email)),

        changePassword: e => dispatch(actions.changePassword(e.target.value)),
        changePasswordConfirm: e => dispatch(actions.changePasswordConfirm(e.target.value)),
        validatePassword: password => dispatch(actions.validatePassword(password)),
        validatePasswordConfirm: passwordConfirm => dispatch(actions.validatePasswordConfirm(passwordConfirm)),

        createAccount: (password, passwordConfirm, email) =>
            dispatch(actions.createAccount(password, passwordConfirm, email)),
        passwordFocusedOnce: e => dispatch(actions.passwordFocusedOnce()),
        passwordConfirmFocusedOnce: e => dispatch(actions.passwordConfirmFocusedOnce()),
    })
)(CreateAccount);
