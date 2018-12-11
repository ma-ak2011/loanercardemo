import request from 'superagent';
import { Environment } from "../config/config";
import moment from 'moment';


function createAccount(payload) {
    return new Promise((resolve, reject) => {
        request
            .post(Environment.ApiUrl + '/users')
            .type('form')
            .set('Content-Type', 'application/json')
            .send({ email: payload.email, password: payload.password })
            .end((err, res) =>{
                resolve(res.body);
            });
    });
}

function login(payload) {
    return new Promise((resolve, reject) => {
        request
            .post(Environment.ApiUrl + '/login')
            .type('form')
            .set('Content-Type', 'application/json')
            .send({ email: payload.email, password: payload.password })
            .end((err, res) =>{
                resolve(res.body);
            });
    });
}

function logout(payload) {
    return new Promise((resolve, reject) => {
        request
            .delete(Environment.ApiUrl + '/logout')
            .set('Authorization', 'Bearer ' + payload.token)
            .end((err, res) =>{
                resolve(res);
            });
    });
}

function fetchLoginState(payload) {
    return new Promise((resolve, reject) => {
        request
            .get(Environment.ApiUrl + '/authenticate')
            .set('Authorization', 'Bearer ' + payload.token)
            .end((err, res) =>{
                resolve(res.body);
            });
    });
}


function getCustomers(payload) {
    return new Promise((resolve, reject) => {
        request
            .get(Environment.ApiUrl + '/users/' + payload.userId + "/customers")
            .set('Authorization', 'Bearer ' + payload.token)
            .end((err, res) =>{
                resolve({
                    status: res.body.status,
                    customers: res.body.customers.map(f => {
                        return {
                            customerId: f.id,
                            name: f.name,
                            driverType: f.driver_type,
                            memo: f.memo,
                            userId: f.user_id
                        };
                    })
                });
            });
    });
}

function addCustomer(payload) {
    return new Promise((resolve, reject) => {
        request
            .post(Environment.ApiUrl + '/users/' + payload.userId + "/customers")
            .type('form')
            .set('Authorization', 'Bearer ' + payload.token)
            .send({ name: payload.name, driver_type: payload.driverType,
                memo: payload.memo })
            .end((err, res) =>{
                resolve({ status: res.body.status, customerId: res.body.id });
            });
    });
}

function saveCustomer(payload) {
    return new Promise((resolve, reject) => {
        request
            .put(Environment.ApiUrl + '/users/' + payload.userId + "/customers/" + payload.customerId)
            .set('Authorization', 'Bearer ' + payload.token)
            .send({ name: payload.name, driver_type: payload.driverType,
                memo: payload.memo })
            .end((err, res) =>{
                resolve({ status: res.body.status, customerId: res.body.id });
            });
    });
}

function deleteCustomer(payload) {
    return new Promise((resolve, reject) => {
        request
            .delete(Environment.ApiUrl + '/users/' + payload.userId + "/customers/" + payload.customerId)
            .set('Authorization', 'Bearer ' + payload.token)
            .end((err, res) =>{
                resolve(res.body);
            });
    });
}

function getStaffs(payload) {
    return new Promise((resolve, reject) => {
        request
            .get(Environment.ApiUrl + '/users/' + payload.userId + "/staffs")
            .set('Authorization', 'Bearer ' + payload.token)
            .end((err, res) =>{
                resolve({
                    status: res.body.status,
                    staffs: res.body.staffs.map(f => {
                        return {
                            staffId: f.id,
                            name: f.name,
                            memo: f.memo,
                            userId: f.user_id
                        };
                    })
                });
            });
    });
}

function addStaff(payload) {
    return new Promise((resolve, reject) => {
        request
            .post(Environment.ApiUrl + '/users/' + payload.userId + "/staffs")
            .type('form')
            .set('Authorization', 'Bearer ' + payload.token)
            .send({ name: payload.name, memo: payload.memo })
            .end((err, res) =>{
                resolve({ status: res.body.status, staffId: res.body.id });
            });
    });
}

function saveStaff(payload) {
    return new Promise((resolve, reject) => {
        request
            .put(Environment.ApiUrl + '/users/' + payload.userId + "/staffs/" + payload.staffId)
            .set('Authorization', 'Bearer ' + payload.token)
            .send({ name: payload.name, memo: payload.memo })
            .end((err, res) =>{
                resolve({ status: res.body.status, staffId: res.body.id });
            });
    });
}

function deleteStaff(payload) {
    return new Promise((resolve, reject) => {
        request
            .delete(Environment.ApiUrl + '/users/' + payload.userId + "/staffs/" + payload.staffId)
            .set('Authorization', 'Bearer ' + payload.token)
            .end((err, res) =>{
                resolve(res.body);
            });
    });
}

function getFacilities(payload) {
    return new Promise((resolve, reject) => {
        request
            .get(Environment.ApiUrl + '/users/' + payload.userId + "/facilities")
            .set('Authorization', 'Bearer ' + payload.token)
            .end((err, res) =>{
                resolve({
                    status: res.body.status,
                    facilities: res.body.facilities.map(f => {
                        return {
                            facilityId: f.id,
                            name: f.name,
                            carType: f.car_type,
                            expireDate: moment(f.expire_date),
                            memo: f.memo,
                            userId: f.user_id
                        };
                    })
                });
            });
    });
}

function addFacility(payload) {
    return new Promise((resolve, reject) => {
        request
            .post(Environment.ApiUrl + '/users/' + payload.userId + "/facilities")
            .type('form')
            .set('Authorization', 'Bearer ' + payload.token)
            .send({ name: payload.name, car_type: payload.carType,
                expire_date: payload.expireDate.format(), memo: payload.memo })
            .end((err, res) =>{
                resolve({ status: res.body.status, facilityId: res.body.id });
            });
    });
}

function saveFacility(payload) {
    return new Promise((resolve, reject) => {
        request
            .put(Environment.ApiUrl + '/users/' + payload.userId + "/facilities/" + payload.facilityId)
            .set('Authorization', 'Bearer ' + payload.token)
            .send({ name: payload.name, car_type: payload.carType,
                expire_date: payload.expireDate.format(), memo: payload.memo })
            .end((err, res) =>{
                resolve({ status: res.body.status, facilityId: res.body.id });
            });
    });
}

function deleteFacility(payload) {
    return new Promise((resolve, reject) => {
        request
            .delete(Environment.ApiUrl + '/users/' + payload.userId + "/facilities/" + payload.facilityId)
            .set('Authorization', 'Bearer ' + payload.token)
            .end((err, res) =>{
                resolve(res.body);
            });
    });
}

function getSchedules(payload) {
    return new Promise((resolve, reject) => {
        request
            .get(Environment.ApiUrl + '/users/' + payload.userId + "/schedules")
            .set('Authorization', 'Bearer ' + payload.token)
            .end((err, res) => {
                resolve({
                    status: res.body.status,
                    schedules: res.body.schedules.map(s => {
                        return {
                            scheduleId: s.id,
                            customerId: s.customer_id,
                            facilityId: s.facility_id,
                            staffId: s.staff_id,
                            start: moment(s.start),
                            end: moment(s.end),
                            memo: s.memo,
                            rentalReason: s.rental_reason,
                            userId: s.user_id
                        };
                    })
                });
            });
    });
}

function addSchedule(payload) {
    return new Promise((resolve, reject) => {
        request
            .post(Environment.ApiUrl + '/users/' + payload.userId + "/schedules")
            .type('form')
            .set('Authorization', 'Bearer ' + payload.token)
            .send({
                customer_id: payload.customerId, staff_id: payload.staffId, facility_id: payload.facilityId,
                start: payload.start.format(), end: payload.end.format(), memo: payload.memo,
                rental_reason: payload.rentalReason
            })
            .end((err, res) =>{
                resolve({ status: res.body.status, scheduleId: res.body.id });
            });
    });
}

function saveSchedule(payload) {
    return new Promise((resolve, reject) => {
        request
            .put(Environment.ApiUrl + '/users/' + payload.userId + "/schedules/" + payload.scheduleId)
            .type('form')
            .set('Authorization', 'Bearer ' + payload.token)
            .send({
                customer_id: payload.customerId, staff_id: payload.staffId, facility_id: payload.facilityId,
                start: payload.start.format(), end: payload.end.format(), memo: payload.memo,
                rental_reason: payload.rentalReason
            })
            .end((err, res) =>{
                resolve(res.body);
            });
    });
}

function deleteSchedule(payload) {
    return new Promise((resolve, reject) => {
        request
            .delete(Environment.ApiUrl + '/users/' + payload.userId + "/schedules/" + payload.scheduleId)
            .set('Authorization', 'Bearer ' + payload.token)
            .end((err, res) =>{
                resolve(res.body);
            });
    });
}

export default { 
    createAccount, login, fetchLoginState, logout, 
    getCustomers, addCustomer, deleteCustomer, saveCustomer,
    getStaffs, addStaff, deleteStaff, saveStaff,
    getFacilities, addFacility, deleteFacility, saveFacility,
    getSchedules, addSchedule, saveSchedule, deleteSchedule
};