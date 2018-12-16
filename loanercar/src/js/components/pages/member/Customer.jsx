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
import Typography from '@material-ui/core/Typography';
import { CustomerEditDialog } from 'components/CustomerEditDialog';
import {DriverTypes} from "../../../constant/common";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';


export const Customer = ({userId, customers,
                             isLoading,
                             editingCustomer,
                             changeCustomerName, changeCustomerDriverType, changeCustomerMemo,
                             newCustomer, cancelEditCustomer,
                             addCustomer,
                             editCustomer,
                             saveCustomer,
                             confirmDeleteId, confirmDeleteCustomer, deleteCustomer, cancelDeleteCustomer,
                             messages}) => {

    const deleteTarget = customers.find(f => f.customerId === confirmDeleteId);
    return (
        <div style={{textAlign:"center" }}>
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
                            以下のお客様を削除します。<br/>
                            削除したお客様のスケジュールも削除されます。<br/>
                            よろしいですか？<br/>
                            お客様名：{deleteTarget.name}<br/>
                            車種：{DriverTypes.find(t => t.value === deleteTarget.driverType).key}<br/>
                            メモ：{deleteTarget.memo}
                        </span>
                            }
                            cancelButtonText="キャンセル"
                            okButtonText="OK"
                            isOpen={true}
                            ok={(e) => deleteCustomer(userId, deleteTarget.customerId)}
                            cancel={e => cancelDeleteCustomer()} />
                    }

                    {customers.map(f => {
                        return (
                            <Card style={{opacity: isLoading ? 0.3: 1, margin: 4}} key={f.customerId}>
                                <CardHeader title={ f.name } style={{textAlign: "left"}} action={
                                    <div>
                                        <IconButton variant="contained" color="primary"
                                                    onClick={e => editCustomer({
                                                        customerId: f.customerId,
                                                        name: f.name,
                                                        driverType: f.driverType,
                                                        memo: f.memo,
                                                    })}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton variant="contained" color="secondary"
                                                    onClick={e => confirmDeleteCustomer(f.customerId)}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </div>
                                }/>
                                <CardContent style={{textAlign: "left"}}>
                                    <Typography variant="h6">
                                        車種：{ DriverTypes.find(t => t.value === f.driverType).key }
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Grid>
            </Grid>

            <CustomerEditDialog userId={userId} title="お客様編集"
                                isOpen={editingCustomer !== null && editingCustomer.customerId >= 0}
                                customer={editingCustomer}
                                cancelEditCustomer={cancelEditCustomer}
                                addCustomer={null}
                                saveCustomer={saveCustomer}
                                changeCustomerName={changeCustomerName}
                                changeCustomerDriverType={changeCustomerDriverType}
                                changeCustomerMemo={changeCustomerMemo}
                                isLoading={isLoading} messages={messages} />

            <CustomerEditDialog userId={userId} title="新規お客様"
                                isOpen={editingCustomer !== null && editingCustomer.customerId < 0}
                                customer={editingCustomer}
                                cancelEditCustomer={cancelEditCustomer}
                                addCustomer={addCustomer}
                                saveCustomer={null}
                                changeCustomerName={changeCustomerName}
                                changeCustomerDriverType={changeCustomerDriverType}
                                changeCustomerMemo={changeCustomerMemo}
                                isLoading={isLoading} messages={messages} />

            <Button variant="extendedFab" color="primary"
                    style={{bottom: "2%", position: "fixed"}}
                    disabled={ isLoading }
                    onClick={(e) => newCustomer()}>
                <AddIcon />
                新規作成
            </Button>
        </div>

    );
};