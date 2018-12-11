import React from 'react';import { connectRouter, routerMiddleware } from 'connected-react-router';
import { rootReducer } from '../reducers/rootReducer';
import { createStore, applyMiddleware} from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';


export const rootStore = history => {

    const sagaMiddleware = createSagaMiddleware();
    const middlewareForRouter = routerMiddleware(history);

    const initialState = {};
    const store = createStore(
        connectRouter(history)(rootReducer),
        initialState,
        applyMiddleware(
            sagaMiddleware, logger, middlewareForRouter
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
};