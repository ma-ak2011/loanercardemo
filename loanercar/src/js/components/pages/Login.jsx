import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Error } from '../message/Error';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Urls} from '../../constant/url';

export const Login = (props) => {

    return props.isLoggedIn
        ? (<Redirect to={Urls.Schedule.path} />)
        :(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h4" color="inherit" style={{flexGrow: 1}}>
                        </Typography>
                        <Button color="inherit" component={Link} to='/'>アカウント作成</Button>
                    </Toolbar>
                </AppBar>
                <main>
                    <div>
                        <Grid container spacing={24} direction="column"
                              style={{position: "absolute", top: `calc(50% - 140px)`, left: `calc(50% - 150px)`,
                                  width: 300, padding:20, border: "solid 1px",
                                  borderRadius:6, marginTop:40, backgroundColor: "white"}}>

                            <Grid item xs={12} >
                                <TextField id="standard-mail" label="メールアドレス"
                                           fullWidth
                                           value={ props.email } onChange={e => props.changeEmail(e)} />
                            </Grid>

                            <Grid item xs={12} >
                                <TextField id="standard-password-input" label="Password" type="password"
                                           autoComplete="current-password"
                                           fullWidth
                                           value={ props.password } onChange={ e => props.changePassword(e) }/>
                            </Grid>

                            <Grid item xs={12} >
                                <Button variant="contained" color="primary"
                                        fullWidth
                                        onClick={e => props.login(props.email, props.password)}>
                                    ログイン
                                </Button>
                                <Error visible={props.loginFailed} message={["ログインに失敗しました。"]}/>
                            </Grid>
                        </Grid>
                    </div>
                </main>
            </div>
        );
};
