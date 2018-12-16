import React from 'react';
import {connect} from 'react-redux';
import {Customer} from '../../../components/pages/member/Customer';
import {
    addCustomer,
    cancelDeleteCustomer,
    cancelEditCustomer,
    changeCustomerDriverType,
    changeCustomerMemo,
    changeCustomerName,
    confirmDeleteCustomer,
    deleteCustomer,
    editCustomer,
    newCustomer,
    saveCustomer
} from "../../../actions/customerActions";


export default connect(
    state => ({
        customers: state.customerReducer.customers,
        customerName: state.customerReducer.customerName,
        driverType: state.customerReducer.driverType,
        messages: state.customerReducer.messages,
        userId: state.userReducer.user.id,
        confirmDeleteId: state.customerReducer.confirmDeleteId,
        editingCustomer: state.customerReducer.editingCustomer,
        isLoading: state.customerReducer.isLoading,
    }),
    (dispatch) => ({
        changeCustomerName: name => dispatch(changeCustomerName(name)),
        changeCustomerDriverType: type => dispatch(changeCustomerDriverType(type)),
        changeCustomerMemo: memo => dispatch(changeCustomerMemo(memo)),

        newCustomer: () => dispatch(newCustomer()),
        editCustomer: customer => dispatch(editCustomer(customer)),
        cancelEditCustomer: () => dispatch(cancelEditCustomer()),
        addCustomer: (userId, name, type, date, memo) => dispatch(addCustomer(userId, name, type, date, memo)),
        saveCustomer: (userId, customerId, name, driverType, memo) =>
            dispatch(saveCustomer(userId, customerId, name, driverType, memo)),

        deleteCustomer: (userId, customerId) => dispatch(deleteCustomer(userId, customerId)),
        cancelDeleteCustomer: () => dispatch(cancelDeleteCustomer()),
        confirmDeleteCustomer: customerId => dispatch(confirmDeleteCustomer(customerId)),

    })
)(Customer);