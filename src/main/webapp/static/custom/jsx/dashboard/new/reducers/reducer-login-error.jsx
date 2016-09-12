export default function (state = {}, action) {
    switch (action.type) {
        case 'LOGIN_ERROR_OCCURRED':
            return action.payload;
            break;
        case 'LOGIN_SUCCEED':
            return action.payload;
            break;
        case 'LOGIN_FAILED':
            return action.payload;
            break;
    }
    return state;
}