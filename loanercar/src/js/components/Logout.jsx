import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";


export const Logout = (props) => {
    const errorMessage = props.logoutFailed ? <p>ログアウトに失敗しました。</p> : '';
    return (
        <div>
            <Button color="inherit" onClick={ e => props.logout(e) }>ログアウト</Button>
            {errorMessage}
        </div>
    );
};
