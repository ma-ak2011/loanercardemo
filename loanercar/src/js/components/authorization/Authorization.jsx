import React from 'react'
import { Redirect } from 'react-router-dom'
import * as actions from "../../actions/actions";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";
import { Urls } from "../../constant/url"

const Authorization = (props) => (props.isLoggedIn
    ? props.children
    : <Redirect to={Urls.Login.path}/>);



export default connect(
    state => ({ isLoggedIn: state.loginReducer.isLoggedIn}),
    dispatch => bindActionCreators(actions, dispatch)
)(Authorization);