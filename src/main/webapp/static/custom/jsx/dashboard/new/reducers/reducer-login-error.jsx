export default function (state = {hidden: true, message: ''}, action) {
    switch (action.type) {
        case 'SHOW_LOGIN_ERROR':
            return {hidden: false, message: action.message};
            break;
        case 'HIDE_LOGIN_ERROR':
            return {hidden: true, message: ''};
            break;
    }
    return state;
}

