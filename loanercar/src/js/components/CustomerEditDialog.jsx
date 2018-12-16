import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { CommonDropDown } from 'components/CommonDropDown';
import { Error } from "./message/Error";
import {DriverTypes} from "../constant/common";


export const CustomerEditDialog = ({ userId, title, customer, isOpen,
                                       cancelEditCustomer, addCustomer, saveCustomer,
                                       changeCustomerName, changeCustomerDriverType, changeCustomerMemo,
                                       isLoading, messages }) => {
    if(customer === null)
        return false;

    const canSave = customer.driverType < 0 || !customer.name;

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={e => cancelEditCustomer(e)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="customer-edit-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <div style={{ position: "relative"}}>

                        <Grid container spacing={16} style={{opacity: isLoading ? 0.3: 1,
                            height: "100%", width:"100%", marginTop:40}}>

                            <Grid item xs={12}>
                                <Error visible={messages.length > 0} message={messages}/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField fullWidth required={true} label="お客様名" id="textFieldCustomerName"
                                           value={ customer.name }
                                           onChange={e => changeCustomerName(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <CommonDropDown
                                    showLabel={true} fullWidth={true} defaultValue={-1}
                                    list={DriverTypes}
                                    labelText="マニュアル/オートマ"
                                    inputId={"at_mt_type" + customer.customerId.toString()}
                                    value={customer.driverType}
                                    onChange={e => changeCustomerDriverType(e.target.value)}/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="memo" label="メモ" margin="normal" variant="outlined"
                                           multiline fullWidth={true}
                                           value={customer.memo}
                                           onChange={e => changeCustomerMemo(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    {addCustomer === null ? false :
                        <Button color="primary" variant="contained"
                                disabled={canSave}
                                onClick={e => addCustomer(userId, customer.name, customer.driverType, customer.memo)}>
                            保存
                        </Button>}

                    {saveCustomer === null ? false :
                        <Button color="primary" variant="contained"
                                disabled={canSave}
                                onClick={e => saveCustomer(userId, customer.customerId, customer.name,
                                    customer.driverType, customer.memo)}>
                            保存
                        </Button>}

                    <Button onClick={e => cancelEditCustomer(e)} color="default" autoFocus variant="contained">
                        キャンセル
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};