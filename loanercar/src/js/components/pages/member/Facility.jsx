import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import { Error } from '../../message/Error';
import { ConfirmDialog } from '../../ConfirmDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { FacilityEditDialog } from 'components/FacilityEditDialog';
import Tooltip from '@material-ui/core/Tooltip';
import {DriverTypes, TransmissionTypes} from "../../../constant/common";
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

                    {facilities.map(f => {
                        const today = moment();
                        return (
                            <Card style={{opacity: isLoading ? 0.3: 1, margin: 4}} key={f.facilityId}>
                                <CardHeader title={ f.name } style={{textAlign: "left"}} action={
                                    <div>
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
                                    </div>
                                }/>
                                <CardContent style={{textAlign: "left"}}>
                                    <Typography variant="h6">
                                        車種：{ TransmissionTypes.find(t => t.value === f.carType).key }
                                    </Typography>

                                    <Typography variant="h6">
                                        車検期限：{f.expireDate.format(format.YYYYMMDDdddJp)}
                                        {f.expireDate <= today
                                            ? <Tooltip title={
                                                <span style={{fontSize: 16, whiteSpace: "pre-wrap" }}>
                                                    車検期限が切れています
                                                </span>}>
                                                <ErrorIcon color="error"/>
                                            </Tooltip>
                                            : (f.expireDate.diff(today, "days") < 30)
                                                ? <Tooltip title={
                                                    <span style={{fontSize: 16, whiteSpace: "pre-wrap" }}>
                                                        車検期限まで1ヶ月です
                                                    </span>}>
                                                    <WarningIcon nativeColor="darkorange"/>
                                                </Tooltip>
                                                : false}
                                    </Typography>
                                </CardContent>
                            </Card>
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