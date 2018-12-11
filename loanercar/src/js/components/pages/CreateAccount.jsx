import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Error } from '../message/Error';
import Grid from '@material-ui/core/Grid';
import {Urls} from '../../constant/url';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Img from "../../../img/top.jpg";


export const CreateAccount = (props) => {

    const style = {
        backgroundImage: `url(${Img})`,
        width: "100vw",
        height: "100vh",
        position: "relative"
    };

    return props.isLoggedIn
        ? (<Redirect to={Urls.Schedule.path} />)
        :(
            <div style={style}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h4" color="inherit" style={{flexGrow: 1}}>
                        </Typography>
                        <Button color="inherit" component={Link} to='/login'>ログイン</Button>
                    </Toolbar>
                </AppBar>
                <main>
                    <div>
                        <Grid container spacing={24} direction="column"
                              style={{position: "absolute", top: `calc(50% - 200px)`,left: `calc(50% - 150px)`,
                                  width: 300, padding:20,
                                  borderRadius:6, marginTop:40, backgroundColor: "white"}}>

                            <Grid item xs={12}>
                                <TextField id="standard-mail" label="メールアドレス" margin="normal"
                                           fullWidth
                                           value={ props.email }
                                           onChange={e => props.changeEmail(e)}
                                           onBlur={() => props.validateEmail(props.email)} />

                                <Error visible={props.errorEmailMessage.length > 0}
                                       message={props.errorEmailMessage }/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="standard-password-input" label="パスワード" type="password"
                                           fullWidth
                                           value={ props.password }
                                           onFocus={ e => props.passwordFocusedOnce(e) }
                                           onChange={ e => props.changePassword(e) }
                                           onBlur={ () => props.validatePassword(props.password) }/>
                                <Typography color="textSecondary">
                                    半角英数字8〜12文字で入力してください。
                                </Typography>
                                <Error visible={props.errorPasswordMessage.length > 0}
                                       message={props.errorPasswordMessage}/>

                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="standard-password-confirm-input" label="パスワード確認" type="password"
                                           fullWidth
                                           value={ props.passwordConfirm }
                                           onFocus={ e => props.passwordConfirmFocusedOnce(e) }
                                           onChange={ e => props.changePasswordConfirm(e) }
                                           onBlur={ () => props.validatePasswordConfirm(props.passwordConfirm) }/>

                                <Error visible={props.errorPasswordConfirmMessage.length > 0}
                                       message={props.errorPasswordConfirmMessage}/>
                            </Grid>
                            <Grid item xs={12}>

                                <Error visible={props.errorServerMessage.length > 0}
                                       message={props.errorServerMessage}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" fullWidth
                                        onClick={e => props.createAccount(props.password, props.passwordConfirm, props.email) }>
                                    アカウント作成
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </main>
            </div>
        );
};