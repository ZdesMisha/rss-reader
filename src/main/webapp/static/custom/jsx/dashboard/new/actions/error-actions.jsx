export function showError() {
    return {
        type: 'SHOW_ERROR',
        payload: 'TEST ERROR MESSAGE'
    }
}
export function hideError() {
    return {
        type: 'HIDE_ERROR'
    }
}

export function hideAddRssError(){
    return {
        type: 'ADD_RSS_HIDE_ERROR'
    }
}
export function showAddRssError(message){
    return {
        type: 'ADD_RSS_ERROR_OCCURRED',
        payload: {message: message}
    }
}