export default function (state = {
    show: false,
    message: ''
}, action) {
    switch (action.type) {
        case 'SHOW_ERROR':
            console.log('SERVER ERROR SHOW', action.payload);
            return {
                show: true,
                message: action.payload
            };
            break;
        case 'HIDE_ERROR':
            console.log('ERROR HIDE', action.payload);
            return {
                show: false,
                message: ''
            };
            break;
    }
    return state;
}