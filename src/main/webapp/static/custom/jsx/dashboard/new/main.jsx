import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import Content from './containers/content';
import AllReducers from './reducers/index';

const logger = createLogger();
const store = createStore(
    AllReducers,
    applyMiddleware(thunk, promise, logger)

);
ReactDOM.render(
    <Provider store={store}>
        <Content />
    </Provider>,
    document.getElementById("main"));