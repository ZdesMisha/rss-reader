import Fetch from 'whatwg-fetch';
const SERVER_HOST = __SERVER_HOST__;
const loginUrl = SERVER_HOST + 'rest/login';

export function showError() {
    console.log("Error OCCURRED ");
    return {
        type: "LOGIN_ERROR_OCCURRED",
        payload: {message:"Unable to login"}
    }

}

export function login(json) {
    console.log("LOGIN REQUEST ");

    return dispatch => {
        fetch(loginUrl, {
            credentials: "include",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }).then(result => {
            if (result.status==200) {
                dispatch({
                    type: 'LOGIN_SUCCEED',
                    payload: {message: result.status}
                })
            } else {
                return result.json()
            }
        }).then(jsonBody => {
            dispatch({
                type: 'LOGIN_FAILED',
                payload: {message: jsonBody.error}
            })
        }).catch(result => {
                dispatch({
                    type: 'UNABLE TO PROCESS REQUEST',
                    payload: {message:"LOGIN FAILED"}
                })
            })
    }
}