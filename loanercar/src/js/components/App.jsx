import React from 'react';
import CreateAccount from "../containers/pages/CreateAccount";
import Login  from "../containers/pages/Login";
import Customers  from "../containers/pages/member/Customer";
import Staff  from "../containers/pages/member/Staff";
import Facility  from "../containers/pages/member/Facility";
import Schedule  from "../containers/pages/member/Schedule";
import Authorization from "./authorization/Authorization";
import HeaderForMember from "../containers/HeaderForMember";
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import { Provider }  from 'react-redux';
import ErrorBoundary from './ErrorBoundary';
import createHistory from 'history/createBrowserHistory';
import { Urls } from '../constant/url';
import { rootStore } from '../stores/stores';
import { fetchLoginState } from '../actions/loginActions';
import WithTracker from "./WithTracker";


const history = createHistory();
const store = rootStore(history);

class App extends React.Component {

    componentDidMount() {
        store.dispatch(fetchLoginState());
    }

    render() {
        return (
            <ErrorBoundary>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <div className="App" style={{height:'100%'}}>
                            <Switch>
                                <Route exact path={Urls.CreateAccount.path} component={WithTracker(CreateAccount)}/>
                                <Route path={Urls.Login.path} component={WithTracker(Login)}/>

                                <Authorization>
                                    <HeaderForMember>
                                        <Switch>
                                            <Route exact path={Urls.Schedule.path} component={WithTracker(Schedule)}/>
                                            <Route path={Urls.Customer.path} component={WithTracker(Customers)}/>
                                            <Route path={Urls.Staff.path} component={WithTracker(Staff)}/>
                                            <Route path={Urls.Facility.path} component={WithTracker(Facility)}/>
                                        </Switch>
                                    </HeaderForMember>
                                </Authorization>

                            </Switch>
                        </div>
                    </ConnectedRouter>
                </Provider>
            </ErrorBoundary>
        );
    }
};

export default App;
