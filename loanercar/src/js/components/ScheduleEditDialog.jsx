import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { CommonDropDown } from 'components/CommonDropDown';
import {Error} from "./message/Error";
import {RentalReason} from "../constant/common";
import moment from "moment/moment";


export const ScheduleEditDialog = ({ userId, isOpen, title, schedule,
                                       customers, changeSelectedCustomer,
                                       staffs, changeSelectedStaff,
                                       changeSelectedRentalReason,
                                       changeStart, changeEnd,
                                       cancel, addSchedule, saveSchedule, confirmDeleteSchedule,
                                       changeMemo,
                                       isLoading, messages }) => {
    if(!isOpen)
        return false;

    const invalidToSave = schedule.customerId < 0 || schedule.staffId < 0 || schedule.rentalReason < 0;
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={e => cancel(e)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <div style={{ position: "relative"}}>

                        <Grid container spacing={16} style={{opacity: isLoading ? 0.3: 1,
                            height: "100%", width:"100%", marginTop:40}}>

                            <Grid item xs={12}>
                                {schedule.facilityName}
                            </Grid>

                            <Grid item xs={12}>
                                <Error visible={messages.length > 0} message={messages}/>
                            </Grid>

                            <Grid item xs={12}>
                                <CommonDropDown fullWidth={true} labelText="お客様" inputId="select-customer"
                                                defaultValue={-1} required={true}
                                                list={customers.map(c => ({ key: c.name, value: c.customerId }))}
                                                value={schedule.customerId}
                                                onChange={e => changeSelectedCustomer(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <CommonDropDown fullWidth={true} labelText="担当スタッフ" inputId="select-staff"
                                                defaultValue={-1} required={true}
                                                list={staffs.map(s => ({ key: s.name, value: s.staffId }))}
                                                value={schedule.staffId}
                                                onChange={e => changeSelectedStaff(e.target.value)}/>
                            </Grid>

                            <Grid item xs={12}>
                                <CommonDropDown fullWidth={true} labelText="代車貸出理由" inputId="select-staff"
                                                defaultValue={-1} required={true}
                                                list={RentalReason}
                                                value={schedule.rentalReason}
                                                onChange={e => changeSelectedRentalReason(e.target.value)}/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="start" label="開始" type="datetime-local"
                                           fullWidth={true}
                                           value={schedule.start.format("YYYY-MM-DDTHH:mm")}
                                           onChange={e => changeStart(moment(e.target.value))}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="end" label="終了" type="datetime-local"
                                           fullWidth={true}
                                           value={schedule.end.format("YYYY-MM-DDTHH:mm")}
                                           onChange={e => changeEnd(moment(e.target.value))}/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="memo" label="メモ" margin="normal" variant="outlined"
                                           multiline fullWidth={true}
                                           value={schedule.memo}
                                           onChange={e => changeMemo(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>

                    {confirmDeleteSchedule === null ? false :
                        <Button onClick={e => confirmDeleteSchedule(schedule.scheduleId)}
                                color="secondary" variant="contained">
                            削除
                        </Button>}

                    {addSchedule === null ? false :
                        <Button color="primary" variant="contained"
                                disabled={invalidToSave}
                                onClick={e => addSchedule(userId, schedule.facilityId, schedule.customerId,
                                    schedule.staffId, schedule.start, schedule.end, schedule.memo,
                                    schedule.rentalReason)}>
                            保存
                        </Button>}

                    {saveSchedule === null ? false :
                        <Button color="primary" variant="contained"
                                disabled={invalidToSave}
                                onClick={e => saveSchedule(schedule.scheduleId, userId, schedule.facilityId,
                                    schedule.customerId, schedule.staffId, schedule.start, schedule.end, schedule.memo,
                                    schedule.rentalReason)}>
                            保存
                        </Button>}

                    <Button onClick={e => cancel(e)} color="default" autoFocus variant="contained">
                        キャンセル
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};