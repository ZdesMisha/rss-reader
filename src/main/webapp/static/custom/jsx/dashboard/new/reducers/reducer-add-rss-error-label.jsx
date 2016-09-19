export default function (state = {hidden: true, text: ''}, action) {
    switch (action.type) {
        case 'ADD_RSS_ERROR_OCCURRED':
            return {hidden: false, text: action.payload.message};
            break;
        case 'ADD_RSS_HIDE_ERROR':
            return {hidden: true, text: ''};
            break;
    }
    return state;
}