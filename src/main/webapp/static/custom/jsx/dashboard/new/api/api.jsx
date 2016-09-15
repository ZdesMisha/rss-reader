export function request(url, config, onSuccess, onFailure) {

    return fetch(url, config)
        .then(checkStatus)
        .then(parseJson)
        .then((jsonBody)=>{
            console.log('request success');
            dispatch(onSuccess(jsonBody));
        })
        .catch((error)=> {
            console.log('request error', error);
            dispatch(onFailure(error))
        })
}

export function checkStatus(response) {
    switch (response.status) {
        case 200:
            return response;
            break;
        case 401:
            throw new Error('Token is not valid'); //TODO switch to login
            break;
        default:
            throw new Error('Server error occurred');
            break;
    }
}

export function parseJson(response){
    return response.json();
}
