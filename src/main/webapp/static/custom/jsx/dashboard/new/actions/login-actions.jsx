const SERVER_HOST = __SERVER_HOST__;
const loginUrl = SERVER_HOST + 'rest/login';
const registerUrl = SERVER_HOST + 'rest/register';
const logoutUrl = SERVER_HOST + 'rest/logout';
import {loginRequest, request} from '../api/api';

function onLoginSuccess(payload) {
    return dispatch => {
        dispatch({
            type: 'CHANGE_STATUS',
            payload: 'dashboard'
        });
    };
}
function onLoginFailure(error) {
    return dispatch => {
        if (error.status != undefined && error.status == 401) {
            dispatch({
                type: 'SHOW_LOGIN_ERROR',
                message: 'Wrong email or password.'
            });
        } else {
            dispatch({
                type: 'SHOW_LOGIN_ERROR',
                message: 'Unable to execute login request.'
            });
        }
    };
}
export function login(json) {
    var url = loginUrl;
    var config = {
        credentials: "include",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    };
    return loginRequest(url, config, onLoginSuccess, onLoginFailure)
}


function onLogoutSuccess(payload) {
    return dispatch => {
        dispatch({
            type: 'CHANGE_STATUS',
            payload: 'login'
        })
    };
}
function onLogoutFailure(error) {
    return dispatch => {
        if (error.status != undefined && error.status == 401) {
            dispatch({
                type: 'CHANGE_STATUS',
                payload: 'login'
            });
            dispatch({
                type: 'SHOW_LOGIN_ERROR',
                message: 'Authorization error.Bad Token. Please login again.'
            });
        } else {
            dispatch({
                type: 'SHOW_LOGIN_ERROR',
                message: 'Unable to execute logout request.'
            });
        }
    };
}
export function logout() {

    var url = logoutUrl;
    var config = {
        credentials: "include",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    };
    return request(url, config, onLogoutSuccess, onLogoutFailure)
}


function onRegistrationSuccess(payload) {
    return dispatch => {
        dispatch({
            type: 'CHANGE_STATUS',
            payload: 'dashboard'
        })
    };
}
function onRegistrationFailure(error) {
    return dispatch => {
        if (error.status != undefined && error.status == 401) {
            dispatch({
                type: 'SHOW_REGISTRATION_ERROR',
                message: 'Authorization error.Bad Token. Please login again.'
            });
        } else {
            dispatch({
                type: 'SHOW_REGISTRATION_ERROR',
                message: 'Unable to execute registration request.'
            });
        }
    };
}
export function register(json) {

    var url = registerUrl;
    var config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    };
    return loginRequest(url, config, onRegistrationSuccess, onRegistrationFailure)
}


export function switchToLogin() {
    return {
        type: "CHANGE_STATUS",
        payload: 'login'
    }
}

export function switchToRegistration() {
    return {
        type: "CHANGE_STATUS",
        payload: 'registration'
    }
}
