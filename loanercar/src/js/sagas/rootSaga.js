import 'babel-polyfill';
import { all } from 'redux-saga/effects';
import { facilitySaga } from "./facilitySaga";
import { customerSaga } from "./customerSaga";
import { staffSaga } from "./staffSaga";
import { scheduleSaga } from "./scheduleSaga";
import { loginSaga } from "./loginSaga";

export default function* rootSaga() {
    yield all([
        ...facilitySaga,
        ...customerSaga,
        ...staffSaga,
        ...scheduleSaga,
        ...loginSaga,
    ]);
}