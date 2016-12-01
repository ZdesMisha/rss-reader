
export function hideAddRssError(){
    return {
        type: 'HIDE_RSS_ADD_ERROR'
    }
}
export function showAddRssError(message){
    return {
        type: 'SHOW_RSS_ADD_ERROR',
        payload: {message: message}
    }
}
export function hideRegistrationError(){
    return {
        type: 'HIDE_REGISTRATION_ERROR'
    }
}
export function showRegistrationError(message){
    return {
        type: 'SHOW_REGISTRATION_ERROR',
        payload: {message: message}
    }
}
export function hideLoginError(){
    return {
        type: 'HIDE_LOGIN_ERROR'
    }
}
export function showLoginError(message){
    return {
        type: 'SHOW_LOGIN_ERROR',
        payload: {message: message}
    }
}