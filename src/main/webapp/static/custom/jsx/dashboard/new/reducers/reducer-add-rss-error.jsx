export default function (state = {hidden: true, message: ''}, action) {
    switch (action.type) {
        case 'SHOW_RSS_ADD_ERROR':
            return {hidden: false, message: action.payload.message};
            break;
        case 'HIDE_RSS_ADD_ERROR':
            return {hidden: true, message: ''};
            break;
    }
    return state;
}