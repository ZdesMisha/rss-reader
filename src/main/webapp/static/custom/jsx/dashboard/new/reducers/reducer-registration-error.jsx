export default function (state = {hidden: true, message: ''}, action) {
    switch (action.type) {
        case 'SHOW_REGISTRATION_ERROR':
            return {hidden: false, message: action.payload.message};
            break;
        case 'HIDE_REGISTRATION_ERROR':
            return {hidden: true, message: ''};
            break;
    }
    return state;
}

