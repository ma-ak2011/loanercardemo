import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Hidden from '@material-ui/core/Hidden';
import { Error } from '../../message/Error';
import { ConfirmDialog } from '../../ConfirmDialog';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { FacilityEditDialog } from 'components/FacilityEditDialog';
import { TransmissionTypes } from "../../../constant/common";
import { datetimeFormat as format } from "../../../constant/datetime";
import moment from 'moment';

export const Facility = ({userId, facilities,
                             isLoading,
                             editingFacility,
                             changeFacilityName, changeFacilityCarType, changeExpireDate, changeFacilityMemo,
                             newFacility, cancelEditFacility,
                             addFacility,
                             editFacility,
                             saveFacility,
                             confirmDeleteId, confirmDeleteFacility, deleteFacility, cancelDeleteFacility,
                             messages}) => {
    
    const deleteTarget = facilities.find(f => f.facilityId === confirmDeleteId);
    return (
        <div style={{textAlign:"center"}}>
            <Grid container spacing={24} style={{marginTop:40}}>
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
                                    以下の代車を削除します。<br/>
                                    削除した代車のスケジュールも削除されます。<br/>
                                    よろしいですか？<br/>
                                    代車名：{deleteTarget.name}<br/>
                                    車種：{TransmissionTypes.find(t => t.value === deleteTarget.carType).key}<br/>
                                    車検期限：{deleteTarget.expireDate.format(format.YYYYMMDDdddJp)}<br/>
                                    メモ：{deleteTarget.memo}
                                </span>
                            }
                            cancelButtonText="キャンセル"
                            okButtonText="OK"
                            isOpen={true}
                            ok={(e) => deleteFacility(userId, deleteTarget.facilityId)}
                            cancel={e => cancelDeleteFacility()} />
                    }

                    <Grid container spacing={8}  style={{opacity: isLoading ? 0.3: 1, textAlign: "left"}}>
                        <Grid item xs={4}>
                            <Typography color="textSecondary">
                                代車名
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography color="textSecondary">
                                車種
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography color="textSecondary">
                                車検期限
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                    </Grid>
                    <Divider/>

                    {facilities.map(f => {
                        const today = moment();
                        const expireDateColor = f.expireDate <= today
                            ? "red"
                            : (f.expireDate.diff(today, "days") < 30)
                                ? "darkorange"
                                : "";

                        return (
                            <div key={f.facilityId}>
                                <Grid container spacing={8}
                                      style={{opacity: isLoading ? 0.3: 1, wordWrap: "break-word", textAlign: "left"}}>
                                    <Grid item xs={4}>
                                        { f.name }
                                    </Grid>

                                    <Grid item xs={3}>
                                        { TransmissionTypes.find(t => t.value === f.carType).key }
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div style={{ height:"100%", background: expireDateColor }}>
                                            { f.expireDate.format(format.YYYYMMDDdddJp) }
                                        </div>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <IconButton variant="contained" color="primary"
                                                    onClick={e => editFacility({
                                                        facilityId: f.facilityId,
                                                        name: f.name,
                                                        carType: f.carType,
                                                        expireDate: f.expireDate,
                                                        memo: f.memo,
                                                    })}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton variant="contained" color="secondary"
                                                    onClick={e => confirmDeleteFacility(f.facilityId)}>
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

            <FacilityEditDialog userId={userId} title="代車編集"
                                isOpen={editingFacility !== null && editingFacility.facilityId >= 0}
                                facility={editingFacility}
                                cancelEditFacility={cancelEditFacility}
                                addFacility={null}
                                saveFacility={saveFacility}
                                changeFacilityName={changeFacilityName}
                                changeFacilityCarType={changeFacilityCarType}
                                changeExpireDate={changeExpireDate}
                                changeFacilityMemo={changeFacilityMemo}
                                isLoading={isLoading} messages={messages} />

            <FacilityEditDialog userId={userId} title="新規代車"
                                isOpen={editingFacility !== null && editingFacility.facilityId < 0}
                                facility={editingFacility}
                                cancelEditFacility={cancelEditFacility}
                                addFacility={addFacility}
                                saveFacility={null}
                                changeFacilityName={changeFacilityName}
                                changeFacilityCarType={changeFacilityCarType}
                                changeExpireDate={changeExpireDate}
                                changeFacilityMemo={changeFacilityMemo}
                                isLoading={isLoading} messages={messages} />

            <Button variant="extendedFab" color="primary"
                    style={{bottom: "2%", position: "fixed"}}
                    disabled={ isLoading }
                    onClick={(e) => newFacility()}>
                <AddIcon />
                新規作成
            </Button>
        </div>

    );
};