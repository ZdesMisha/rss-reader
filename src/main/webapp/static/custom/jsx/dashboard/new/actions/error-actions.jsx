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