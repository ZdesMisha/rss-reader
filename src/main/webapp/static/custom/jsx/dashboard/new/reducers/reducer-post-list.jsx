const initialState = {
    posts:[],
    page: 0,
    totalPages: 0,
    sortField: 'pubDate',
    sortDir: 'desc',
    searchPattern: ''
};


export default function (state = initialState, action) {
    switch (action.type) {
        case 'POSTS_CHANGED':
            return {
                posts:state.posts.concat(action.payload.posts),
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                sortField: action.payload.sortField,
                sortDir: action.payload.sortDir,
                searchPattern: action.payload.searchPattern
            };
            break;
        case 'CLEAN_POST_STORE':
            return initialState;
            break;
    }
    return state;
}