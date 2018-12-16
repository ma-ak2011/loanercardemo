import { customerReducer, initialCustomerState } from 'reducers/customerReducer';
import * as actions from 'actions/customerActions';


describe('customerReducer', () => {
    describe('customerReducer()', () => {
        it('should create new state with new driver type', () => {

            const state = Object.assign({}, initialCustomerState, {
                editingCustomer: {
                    customerId: -1,
                    name: "",
                    driverType: -1,
                    memo: "",
                }
            });

            const newState = customerReducer(state, actions.changeCustomerDriverType(2));
            expect(newState.editingCustomer.driverType).toBe(2)
        })
    })
})