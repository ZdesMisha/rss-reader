export function request(url, config, onSuccess, onFailure) {
    return dispatch => {
        return fetch(url, config)
            .then(checkStatus)
            .then(parseJson)
            .then((jsonBody)=> {
                dispatch(onSuccess(jsonBody));
            })
            .catch((error)=> {
                dispatch(onFailure(error))
            })
    }
}

export function loginRequest(url, config, onSuccess, onFailure) {
    return dispatch => {
        return fetch(url, config)
            .then(checkLoginReqStatus)
            .then(parseJson)
            .then((jsonBody)=> {
                dispatch(onSuccess(jsonBody));
            })
            .catch((error)=> {
                dispatch(onFailure(error))
            })
    }
}

export function checkStatus(response) {
    switch (response.status) {
        case 200:
            return response;
            break;
        default:
            var error = new Error();
            error.status = response.status;
            throw error;
            break;
    }
}
export function checkLoginReqStatus(response) {
    switch (response.status) {
        case 200:
            localStorage.setItem('token', response.headers.get('token'));
            return response;
            break;
        default:
            var error = new Error();
            error.status = response.status;
            throw error;
            break;
    }
}

export function parseJson(response) {
    return response.json();
}
