const initialState = {
    feed: {
        id: '',
        title: ''
    }
};


export default function (state = initialState, action) {
    switch (action.type) {
        case 'VIEWED_FEED_CHANGED':
            return {
                feed: {
                    id: action.payload.id,
                    title: action.payload.title
                }
            };
            break;
        case 'CLEAN_VIEWED_FEED':
            return initialState;
            break;
    }
    return state;
}