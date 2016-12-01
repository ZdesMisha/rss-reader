export default function (state = {
    show: false,
    message: ''
}, action) {
    switch (action.type) {
        case 'SHOW_MAIN_ERROR':
            return {
                show: true,
                message: action.payload.message
            };
            break;
        case 'HIDE_MAIN_ERROR':
            return {
                show: false,
                message: ''
            };
            break;
    }
    return state;
}
