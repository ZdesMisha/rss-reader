
export default function (state = null, action) {
    switch (action.type) {
        case 'STATUS_CHANGED':
            return action.payload;
            break;
    }
    return state;
}