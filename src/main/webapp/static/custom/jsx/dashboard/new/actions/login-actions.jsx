const SERVER_HOST = __SERVER_HOST__;
const loginUrl = SERVER_HOST + 'rest/login';


export function login(json) {
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
            if (result.status == 200) {
                console.log('RECEIVED TOKEN ',result.headers.get('token'));
                localStorage.setItem('token',result.headers.get('token'));
                dispatch({
                    type: 'CHANGE_STATUS',
                    payload: 'dashboard'
                });
            } else {
                throw new Error();
            }
        }).catch(result => {
            console.log('error ',result);
            dispatch({
                type: 'LOGIN_ERROR_OCCURRED',
                payload: {message: "UNABLE TO COMPLETE REQUEST"}
            })
        })
    }
}

export function loginTest(json){
    console.log('loginTest');
    return dispatch => {

                dispatch({
                    type: 'CHANGE_STATUS',
                    payload: 'dashboard'
                });

    }
}


export function logout(json) {
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
            if (result.status == 200) {
                dispatch({
                    type: 'CHANGE_STATUS',
                    payload: 'login'
                })
            } else {
                throw new Error();
            }
        }).catch(result => {
            dispatch({
                type: 'LOGIN_ERROR_OCCURRED',
                payload: {message: "UNABLE TO COMPLETE REQUEST"}
            })
        })
    }
}


export function switchToLogin(){
    console.log("Switch to login ");
    return {
        type: "CHANGE_STATUS",
        payload: 'login'
    }
}

export function switchToRegistration(){
    console.log("Switch to registration");
    return {
        type: "CHANGE_STATUS",
        payload: 'registration'
    }
}
