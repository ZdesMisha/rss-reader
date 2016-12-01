import React from 'react';

const SERVER_HOST = __SERVER_HOST__ + 'rest/secured/';
const postsUrl = SERVER_HOST + 'feeds';
const setViewedUrl = SERVER_HOST + 'feeds/post/';
const getPostUrl = SERVER_HOST + 'feeds/post/';


export function getPage(feedId, pattern, sortField, sortDir, page) {
    return dispatch => {
        var url = "/" + feedId;
        if (pattern) {
            url = url + "/search/" + pattern;
        }
        if (sortField) {
            url = url + "/sortField/" + sortField + "/sortDir/" + sortDir
        }
        url = url + "/page/" + page;

        fetch(postsUrl + url, {
            credentials: "include",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(result => {
                if (result.status == 200) {
                    return result.json()
                } else {
                    throw err;
                }
            }).then(jsonBody => {
            dispatch({
                type: 'POSTS_CHANGED',
                payload: {
                    posts: jsonBody.posts,
                    page: page,
                    searchPattern: pattern,
                    totalPages: 10,
                    sortField: sortField,
                    sortDir: sortDir
                }
            })
        }).catch(() => {
            dispatch({
                type: 'SERVER_ERRORRRRR',
                payload: {message: "UNABLE TO GET POSTS PAGE"}
            })
        })
    }
}

export function changeViewedFeed(id, title) {
    return dispatch => {
        dispatch({
            type: 'VIEWED_FEED_CHANGED',
            payload: {
                id: id,
                title: title
            }
        });
        dispatch({
            type: 'CLEAN_POST_STORE'
        });
        dispatch({
            type: 'CLEAN_VIEWED_POST'
        })
        dispatch(getPage(id, '', 'pubDate', 'desc', 0))
    }
}

export function getPostInfo(id) {
    return dispatch => {
        fetch(getPostUrl + id, {
            credentials: "include",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(result => {
            if (result.status == 200) {
                return result.json()
            } else {
                throw err;
            }
        }).then(jsonBody => {
            console.log('POSTS INFO', jsonBody);
            dispatch({
                type: 'VIEWED_POST_CHANGED',
                payload: {
                    id: jsonBody.id,
                    title: jsonBody.title,
                    description: jsonBody.description,
                    link: jsonBody.link,
                    pubDate: jsonBody.pubDate
                }
            });
        }).catch(() => {
            dispatch({
                type: 'SERVER_ERROR',
                payload: {message: "UNABLE TO GET POSTS PAGE"}
            })
        })
    }
}

export function search(pattern) {
    return (dispatch, getState) => {
        dispatch({
            type: 'CLEAN_POST_STORE'
        });
        dispatch({
            type: 'CLEAN_VIEWED_POST'
        });
        var viewedFeed = getState().viewedFeed.feed;
        var postList = getState().postList;
        console.log('FEED SEARCH ', viewedFeed);
        dispatch(getPage(viewedFeed.id, pattern, postList.sortField, postList.sortDir, 0))
    }
}

export function sort(direction) {
    return (dispatch, getState) => {
        var viewedFeed = getState().viewedFeed.feed;
        var postList = getState().postList;
        if (postList.sortDir != direction) {
            dispatch({
                type: 'CLEAN_POST_STORE'
            });
            dispatch({
                type: 'CLEAN_VIEWED_POST'
            });
            dispatch(getPage(viewedFeed.id, postList.searchPattern, postList.sortField, direction, 0))
        }
    }
}


export function setPostViewed(id) {
    return dispatch => {
        return fetch(setViewedUrl + id, {
            credentials: "include",
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(result => {
            if (result.status == 200) {
                dispatch({
                    type: 'POST_VIEWED'
                })
            } else {
                throw err;
            }
        }).catch(() => {
            dispatch({
                type: 'SERVER_ERROR',
                payload: {message: "UNABLE TO GET POSTS PAGE"}
            })
        })
    }
}