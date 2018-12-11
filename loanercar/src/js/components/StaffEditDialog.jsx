import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Error } from "./message/Error";


export const StaffEditDialog = ({ userId, title, staff, isOpen,
                                       cancelEditStaff, addStaff, saveStaff,
                                       changeStaffName, changeStaffMemo,
                                       isLoading, messages }) => {
    if(staff === null)
        return false;

    const canSave = !staff.name;

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={e => cancelEditStaff(e)}
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
                                <TextField fullWidth required={true} label="氏名"
                                           value={ staff.name }
                                           onChange={e => changeStaffName(e.target.value)}/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField id="memo" label="メモ" margin="normal" variant="outlined"
                                           multiline fullWidth={true}
                                           value={staff.memo}
                                           onChange={e => changeStaffMemo(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    {addStaff === null ? false :
                        <Button color="primary" variant="contained"
                                disabled={canSave}
                                onClick={e => addStaff(userId, staff.name, staff.memo)}>
                            保存
                        </Button>}

                    {saveStaff === null ? false :
                        <Button color="primary" variant="contained"
                                disabled={canSave}
                                onClick={e => saveStaff(userId, staff.staffId, staff.name, staff.memo)}>
                            保存
                        </Button>}

                    <Button onClick={e => cancelEditStaff(e)} color="default" autoFocus variant="contained">
                        キャンセル
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};