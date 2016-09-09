import {combineReducers} from 'redux';
import AppStateReducer from './reducer-app-state';
import LoginReducer from './reducer-login-template';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const AllReducers = combineReducers({
    status: AppStateReducer,
    template: LoginReducer
});

export default AllReducers