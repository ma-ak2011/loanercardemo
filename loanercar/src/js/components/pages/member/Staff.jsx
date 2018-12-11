import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { Error } from '../../message/Error';
import { ConfirmDialog } from '../../ConfirmDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StaffEditDialog } from 'components/StaffEditDialog';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export const Staff = ({userId, staffs,
                             isLoading,
                             editingStaff,
                             changeStaffName, changeStaffMemo,
                             newStaff, cancelEditStaff,
                             addStaff,
                             editStaff,
                             saveStaff,
                             confirmDeleteId, confirmDeleteStaff, deleteStaff, cancelDeleteStaff,
                             messages}) => {

    const deleteTarget = staffs.find(f => f.staffId === confirmDeleteId);
    return (
        <div style={{textAlign:"center"}}>
            <Grid container spacing={24} style={{opacity: isLoading ? 0.3: 1, marginTop:40}}>
                <Grid item xs={12} style={{position:"relative"}}>

                    {isLoading
                        ? <CircularProgress color="primary"
                                            style={{position:"fixed", top:"50%", left:"50%", zIndex: 1400}}/>
                        : false}

                    <Error visible={messages.length > 0} message={messages}/>

                    {typeof deleteTarget === "undefined"
                        ? false
                        :<ConfirmDialog
                            title="確認"
                            content={
                                <span style={{ whiteSpace: "pre-wrap" }}>
                            以下のスタッフを削除します。<br/>
                            削除したスタッフのスケジュールも削除されます。<br/>
                            よろしいですか？<br/>
                            氏名：{deleteTarget.name}<br/>
                            メモ：{deleteTarget.memo}
                        </span>
                            }
                            cancelButtonText="キャンセル"
                            okButtonText="OK"
                            isOpen={true}
                            ok={(e) => deleteStaff(userId, deleteTarget.staffId)}
                            cancel={e => cancelDeleteStaff()} />
                    }

                    <Grid container spacing={8} style={{textAlign: "left"}}>
                        <Grid item xs={9}>
                            <Typography color="textSecondary">
                                スタッフ氏名
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                    </Grid>
                    <Divider/>

                    {staffs.map(s => {
                        return (
                            <div key={s.staffId}>
                                <Grid container spacing={8} style={{wordWrap: "break-word", textAlign: "left"}}>
                                    <Grid item xs={9}>
                                        { s.name }
                                    </Grid>

                                    <Grid item xs={3}>
                                        <IconButton variant="contained" color="primary"
                                                    onClick={e => editStaff({
                                                        staffId: s.staffId,
                                                        name: s.name,
                                                        memo: s.memo,
                                                    })}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton variant="contained" color="secondary"
                                                    onClick={e => confirmDeleteStaff(s.staffId)}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Divider/>
                            </div>
                        );
                    })}
                </Grid>
            </Grid>

            <StaffEditDialog userId={userId} title="スタッフ編集"
                                isOpen={editingStaff !== null && editingStaff.staffId >= 0}
                                staff={editingStaff}
                                cancelEditStaff={cancelEditStaff}
                                addStaff={null}
                                saveStaff={saveStaff}
                                changeStaffName={changeStaffName}
                                changeStaffMemo={changeStaffMemo}
                                isLoading={isLoading} messages={messages} />

            <StaffEditDialog userId={userId} title="新規スタッフ"
                                isOpen={editingStaff !== null && editingStaff.staffId < 0}
                                staff={editingStaff}
                                cancelEditStaff={cancelEditStaff}
                                addStaff={addStaff}
                                saveStaff={null}
                                changeStaffName={changeStaffName}
                                changeStaffMemo={changeStaffMemo}
                                isLoading={isLoading} messages={messages} />

            <Button variant="extendedFab" color="primary"
                    style={{bottom: "2%", position: "fixed"}}
                    disabled={ isLoading }
                    onClick={(e) => newStaff()}>
                <AddIcon />
                新規作成
            </Button>
        </div>

    );
};