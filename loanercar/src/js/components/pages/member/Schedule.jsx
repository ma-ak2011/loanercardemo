import React, { Component } from 'react';
import Timeline, {
    TimelineMarkers,
    CustomMarker,
    TodayMarker,
    CursorMarker
}  from 'react-calendar-timeline';
import { ConfirmDialog } from '../../ConfirmDialog';
import { Error } from '../../message/Error';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ScheduleEditDialog } from "../../ScheduleEditDialog";
import Tooltip from '@material-ui/core/Tooltip';
import {TransmissionTypes} from "../../../constant/common";
import {RentalReason} from "../../../constant/common";
import { CommonDropDown } from 'components/CommonDropDown';


export const Schedule = ({userId, facilities, customers, schedules, staffs,
                             isLoading,
                             newSchedule,
                             editSchedule,
                             addSchedule,
                             saveSchedule,
                             deleteSchedule, confirmDeleteSchedule, cancelDeleteSchedule, deleteConfirmId,
                             editedSchedule, changeSelectedCustomer, changeSelectedStaff, cancelEditSchedule,
                             changeSelectedRentalReason, changeStart, changeEnd,
                             changeMemo,
                             filterType, changeFilterType,
                             messages}) => {

    const groups = facilities
        .filter(f => (filterType < 0) ? true : f.carType === filterType)
        .sort((a, b) => a.carType - b.carType)
        .map(f => ({
            id: f.facilityId,
            title: "(" + TransmissionTypes.find(t => t.value === f.carType).key + ")" + f.name
        }));

    const items = schedules.map(s => {
        const customer = customers.find(st => st.customerId === s.customerId);
        const facility = facilities.find(f => f.facilityId === s.facilityId);
        const staff = staffs.find(st => st.staffId === s.staffId);
        const rentalReason = RentalReason.find(r => r.value === s.rentalReason);

        return {
            id: s.scheduleId,
            group: s.facilityId,
            facilityName: (typeof facility === "undefined") ? "": facility.name,
            expireDate: (typeof facility === "undefined") ? "": facility.expireDate,
            customerId: s.customerId,
            title: (typeof customer === "undefined") ? "": customer.name,
            staffId: s.staffId,
            staffName: (typeof staff === "undefined") ? "": staff.name,
            start: s.start,
            end: s.end,
            memo: s.memo,
            rentalReason: s.rentalReason,
            rentalReasonName: (typeof rentalReason === "undefined") ? "": rentalReason.key,
        };
    });

    const itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
        const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

        const title = <span key={item.id} style={{fontSize: 16, whiteSpace: "pre-wrap" }}>
                          代車：{item.facilityName}<br/>
                          スタッフ：{item.staffName}<br/>
                          お客様：{item.title}<br/>
                          代車貸出理由：{item.rentalReasonName}<br/>
                          <br/>
                          期間：{item.start.format(datetimeFormat)}&nbsp;〜&nbsp;{item.end.format(datetimeFormat)}<br/>
                          メモ：<br/>
                          {item.memo}
                      </span>;

        const rentalReasonColors = [
            {rentalReason: 1, color: "#FBD01D"},
            {rentalReason: 2, color: "royalblue"},
            {rentalReason: 3, color: "hotpink"},
            {rentalReason: 4, color: "seagreen"},
        ];

        const color = (item.expireDate < item.end)
            ? "crimson"
            : rentalReasonColors.find(r => r.rentalReason === item.rentalReason).color;

        const style = {
            borderRadius: 8,
            border: "1px solid " + color,
            background: color,
            opacity: itemContext.selected ? 0.5 : 1,
        };
        
        return (
            <Tooltip title={title}>
                <div {...getItemProps({ style: style})}>

                    {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

                    <div className="rct-item-content"
                         style={{textAlign: "center", display: "block", fontWeight: "bold", fontSize: 16}}>
                        {itemContext.title}
                    </div>

                    {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}

                </div>
            </Tooltip>
        );
    };

    const keys = {
        groupIdKey: "id",
        groupTitleKey: "title",
        groupRightTitleKey: "rightTitle",
        itemIdKey: "id",
        itemTitleKey: "title",
        itemDivTitleKey: "title",
        itemGroupKey: "group",
        itemTimeStartKey: "start",
        itemTimeEndKey: "end"
    };

    const deleteTargetItem = items.filter(i => i.id === deleteConfirmId);

    const datetimeFormat = "YYYY年MM月DD日(ddd) HH:mm ";
    moment.locale("ja");

    return (
        <div style={{marginTop:60, position: "relative"}} >

            {isLoading
                ? <CircularProgress color="primary"
                                    style={{position:"absolute", top:"50%", left:"50%", zIndex: 1400}}/>
                : false}

            <Error visible={messages.length > 0} message={messages}/>

            <ConfirmDialog
                title="確認"
                content={
                    <span>
                        以下のスケジュールを削除します。<br/>
                        よろしいですか？<br/>

                        {deleteTargetItem.map(i =>
                            <span key={i.id}>
                                代車:{i.facilityName}<br/>
                                スタッフ:{i.staffName}<br/>
                                お客様:{i.title}<br/>
                                <br/>
                                期間:{i.start.format(datetimeFormat)}&nbsp;〜&nbsp;{i.end.format(datetimeFormat)}
                            </span>)}
                    </span>
                }
                cancelButtonText="キャンセル"
                okButtonText="OK"
                isOpen={deleteConfirmId > -1}
                ok={e => deleteSchedule(userId, deleteTargetItem[0].id)}
                cancel={e => cancelDeleteSchedule(deleteTargetItem.id)}/>

            <ScheduleEditDialog title="スケジュール編集" userId={userId}
                                isOpen={editedSchedule !== null && editedSchedule.scheduleId >= 0}
                                schedule={editedSchedule}
                                changeSelectedRentalReason={changeSelectedRentalReason}
                                changeStart={changeStart} changeEnd={changeEnd}
                                customers={customers} changeSelectedCustomer={changeSelectedCustomer}
                                staffs={staffs} changeSelectedStaff={changeSelectedStaff}
                                cancel={cancelEditSchedule} saveSchedule={saveSchedule}
                                confirmDeleteSchedule={confirmDeleteSchedule} addSchedule={null}
                                changeMemo={changeMemo}
                                messages={messages}/>

            <ScheduleEditDialog title="新規スケジュール" userId={userId}
                                isOpen={editedSchedule !== null && editedSchedule.scheduleId < 0}
                                schedule={editedSchedule}
                                changeSelectedRentalReason={changeSelectedRentalReason}
                                changeStart={changeStart} changeEnd={changeEnd}
                                customers={customers} changeSelectedCustomer={changeSelectedCustomer}
                                staffs={staffs} changeSelectedStaff={changeSelectedStaff}
                                cancel={cancelEditSchedule} addSchedule={addSchedule}
                                confirmDeleteSchedule={null} saveSchedule={null}
                                changeMemo={changeMemo}
                                messages={messages}/>

            <div style={{opacity: isLoading ? 0.3: 1}}>

                <Timeline
                    groups={groups}
                    items={items}
                    keys={keys}
                    fullUpdate
                    sidebarContent={
                        <div style={{ padding: 10, height: "100%"}}>
                            <CommonDropDown
                                showLabel={true} fullWidth={true} defaultValue={-1}
                                disableUnderline={true}
                                list={TransmissionTypes}
                                inputId={"filter_type"}
                                value={filterType}
                                onChange={e => changeFilterType(e.target.value)}/>
                        </div>
                    }
                    lineHeight={36}
                    itemsSorted
                    itemTouchSendsClick={false}
                    stackItems
                    itemHeightRatio={1}
                    showCursorLine
                    canMove={true}
                    canResize={"both"}
                    useResizeHandle={true}
                    defaultTimeStart={moment().startOf("day")}
                    defaultTimeEnd={moment().startOf("day").add(30, "day")}
                    onTimeChange={(start, end, updateScrollCanvas) => updateScrollCanvas(start, end)}
                    onItemClick={(scheduleId, e, time) => {
                        const schedule = schedules.find(s => s.scheduleId === scheduleId);
                        if((typeof schedule === "undefined"))
                            return;

                        const facility = facilities.find(f => f.facilityId === schedule.facilityId);
                        if((typeof facility === "undefined"))
                            return;

                        editSchedule({
                            scheduleId: scheduleId,
                            facilityId: schedule.facilityId,
                            facilityName: facility.name,
                            customerId: schedule.customerId,
                            staffId: schedule.staffId,
                            start: schedule.start,
                            end: schedule.end,
                            memo: schedule.memo,
                            rentalReason: schedule.rentalReason
                        });
                    }}
                    onItemMove={(scheduleId, start, groupIndex) => {
                        const newStart = moment(start).local();
                        const schedule = schedules.find(s => s.scheduleId === scheduleId);
                        const end = moment(newStart + schedule.end - schedule.start);
                        saveSchedule(scheduleId, userId, groups[groupIndex].id,
                            schedule.customerId, schedule.staffId, newStart, end, schedule.memo, schedule.rentalReason);
                    }}
                    onItemResize={(scheduleId, time, edge) => {
                        const newTime = moment(time).local();
                        const schedule = schedules.find(s => s.scheduleId === scheduleId);
                        const start = edge === "left" ? newTime : schedule.start;
                        const end = edge === "left" ? schedule.end : newTime;
                        saveSchedule(scheduleId, userId, schedule.facilityId,
                            schedule.customerId, schedule.staffId, start, end, schedule.memo, schedule.rentalReason);
                    }}
                    onCanvasClick={(facilityId, start, e) => {
                        if(customers.length <= 0 || staffs.length <= 0)
                            return;

                        const facility = facilities.find(f => f.facilityId === facilityId);
                        if((typeof facility === "undefined"))
                            return;

                        const startTime = moment(start).local().startOf('day');
                        const endTime = moment(start).local().startOf('day').add(1, 'days');
                        newSchedule(facilityId, facility.name, startTime, endTime)
                    }}
                    itemRenderer={itemRenderer} >


                </Timeline>
            </div>
        </div>
    );
};