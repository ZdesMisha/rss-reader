const initialState = {
    feeds:[],
    page: 0,
    totalPages: 5,
    isRequesting: false
};


export default function (state =initialState, action) {
    switch (action.type) {
        case 'FEEDS_CHANGED':
            return {
                feeds: action.payload.feeds,
                page: action.payload.page,
                totalPages: 5,
                isRequesting: false
            };
            break;
        case 'FEEDS_REFRESHED':
            return {
                feeds: action.payload.feeds,
                page: action.payload.page,
                totalPages: 5,
                isRequesting: false
            };
            break;
    }
    return state;
}