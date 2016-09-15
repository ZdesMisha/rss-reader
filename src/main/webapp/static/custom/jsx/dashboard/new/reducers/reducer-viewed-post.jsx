const initialState = {
    feed: {}
};


export default function (state = initialState, action) {
    switch (action.type) {
        case 'VIEWED_POST_CHANGED':
            return {
                post: {
                    id: action.payload.id,
                    title: action.payload.title,
                    description: action.payload.description,
                    link: action.payload.link,
                    pubDate: action.payload.pubDate
                }
            };
            break;
        case 'CLEAN_VIEWED_POST':
            return initialState;
            break;
    }
    return state;
}