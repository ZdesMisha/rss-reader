export default function (state = null, action) {
    switch (action.type) {
        case 'STATE_CHANGED':
            return action.payload;
            break;
    }
    return state;
}