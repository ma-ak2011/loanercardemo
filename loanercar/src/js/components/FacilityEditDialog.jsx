import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { CommonDropDown } from 'components/CommonDropDown';
import { Error } from "./message/Error";
import {TransmissionTypes} from "../constant/common";
import moment from 'moment';


export const FacilityEditDialog = ({ userId, title, facility, isOpen,
                                       cancelEditFacility, addFacility, saveFacility,
                                       changeFacilityName, changeFacilityCarType, changeExpireDate, changeFacilityMemo,
                                       isLoading, messages }) => {
    if(facility === null)
        return false;

    const canSave = facility.carType < 0 || !facility.name || !facility.expireDate.isValid();

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={e => cancelEditFacility(e)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <div style={{ position: "relative"}}>

                        <Grid container spacing={16} style={{opacity: isLoading ? 0.3: 1,
                            height: "100%", width:"100%", marginTop:40}}>

                            <Grid item xs={12}>
                                <Error visible={messages.length > 0} message={messages}/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField fullWidth required={true} label="代車名"
                                       value={ facility.name }
                                       onChange={e => changeFacilityName(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <CommonDropDown
                                    showLabel={true} fullWidth={true} defaultValue={-1}
                                    list={TransmissionTypes}
                                    labelText="マニュアル/オートマ"
                                    inputId={"at_mt_type" + facility.facilityId.toString()}
                                    value={facility.carType}
                                    onChange={e => changeFacilityCarType(e.target.value)}/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="expire-date" label="車検期限" type="date"
                                           fullWidth={true}
                                           value={facility.expireDate.format("YYYY-MM-DD")}
                                           onChange={e => changeExpireDate(moment(e.target.value))}/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="memo" label="メモ" margin="normal" variant="outlined"
                                           multiline fullWidth={true}
                                           value={facility.memo}
                                           onChange={e => changeFacilityMemo(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    {addFacility === null ? false :
                        <Button color="primary" variant="contained"
                                disabled={canSave}
                                onClick={e => addFacility(userId, facility.name, facility.carType,
                                    facility.expireDate, facility.memo)}>
                            保存
                        </Button>}

                    {saveFacility === null ? false :
                        <Button color="primary" variant="contained"
                                disabled={canSave}
                                onClick={e => saveFacility(userId, facility.facilityId, facility.name, facility.carType,
                                    facility.expireDate, facility.memo)}>
                            保存
                        </Button>}

                    <Button onClick={e => cancelEditFacility(e)} color="default" autoFocus variant="contained">
                        キャンセル
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};