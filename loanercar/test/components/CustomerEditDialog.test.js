import { shallow, mount } from 'enzyme'
import { CustomerEditDialog } from 'components/CustomerEditDialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from "react";
import Enzyme from "enzyme/build/index";
import Adapter from "enzyme-adapter-react-16/build/index";

Enzyme.configure({ adapter: new Adapter() });


describe('toHaveBeenCalled example', () => {
    let cancelEditCustomer;
    let addCustomer;
    let saveCustomer;
    let changeCustomerName;
    let changeCustomerDriverType;
    let changeCustomerMemo;
    let subject;
    let isLoading = false;
    let isOpen = true;
    let messages = [];
    let userId = 1;
    let title = "テストタイトル";
    let customer = {
        customerId: -1,
        name: "",
        driverType: -1,
        memo: "",
    };

    beforeEach(() => {
        changeCustomerName = jest.fn();
        isLoading = false;
        subject = shallow(<CustomerEditDialog
            userId={userId}
            customer={customer}
            isLoading={isLoading}
            title={title}
            isOpen={isOpen}
            messages={messages}
            changeCustomerName={changeCustomerName}
            cancelEditCustomer={cancelEditCustomer}
            addCustomer={addCustomer}
            saveCustomer={saveCustomer}
            changeCustomerDriverType={changeCustomerDriverType}
            changeCustomerMemo={changeCustomerMemo}
        />);
    });

    /*test('render title テストタイトル', () => {
        expect(subject.find(DialogTitle).text()).toBe("テストタイトル");
    });*/

    test('handle changeCustomerName', () => {
        const event = { target: { value: "お客様名" } };
        subject.find("#textFieldCustomerName").simulate('change', event)
        expect(changeCustomerName).toHaveBeenCalledWith("お客様名")
    });
});