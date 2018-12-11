import React            from 'react';
import { connect } from 'react-redux';
import { Customer } from '../../../components/pages/member/Customer';
import * as actions  from '../../../actions/actions';


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
        changeCustomerName: name => dispatch(actions.changeCustomerName(name)),
        changeCustomerDriverType: type => dispatch(actions.changeCustomerDriverType(type)),
        changeCustomerMemo: memo => dispatch(actions.changeCustomerMemo(memo)),

        newCustomer: () => dispatch(actions.newCustomer()),
        editCustomer: customer => dispatch(actions.editCustomer(customer)),
        cancelEditCustomer: () => dispatch(actions.cancelEditCustomer()),
        addCustomer: (userId, name, type, date, memo) => dispatch(actions.addCustomer(userId, name, type, date, memo)),
        saveCustomer: (userId, customerId, name, driverType, memo) =>
            dispatch(actions.saveCustomer(userId, customerId, name, driverType, memo)),

        deleteCustomer: (userId, customerId) => dispatch(actions.deleteCustomer(userId, customerId)),
        cancelDeleteCustomer: () => dispatch(actions.cancelDeleteCustomer()),
        confirmDeleteCustomer: customerId => dispatch(actions.confirmDeleteCustomer(customerId)),

    })
)(Customer);