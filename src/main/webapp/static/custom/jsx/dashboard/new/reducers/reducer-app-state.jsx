
export default function (state = null, action) {
    switch (action.type) {
        case 'CHANGE_STATUS':
            return action.payload;
            break;
    }
    return state;
}