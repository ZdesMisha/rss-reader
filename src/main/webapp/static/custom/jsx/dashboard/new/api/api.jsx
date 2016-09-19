export function request(url, config, onSuccess, onFailure) {
    return dispatch => {
        return fetch(url, config)
            .then(checkStatus)
            .then(parseJson)
            .then((jsonBody)=> {
                console.log('request success');
                dispatch(onSuccess(jsonBody));
            })
            .catch((error)=> {
                console.log('request error', error);
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

export function parseJson(response) {
    return response.json();
}
