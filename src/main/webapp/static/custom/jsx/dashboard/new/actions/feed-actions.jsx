import React from 'react';
import * as PostActions from './post-actions';
import {request} from '../api/api';
const SERVER_HOST = __SERVER_HOST__ + 'rest/secured/';
const feedsUrl = SERVER_HOST + 'feeds/page/';
const addFeedUrl = SERVER_HOST + 'feeds/add';
const deleteFeedUrl = SERVER_HOST + 'feeds/delete/';
const refreshFeedListUrl = SERVER_HOST + 'feeds/pages/';
const refreshFeedUrl = SERVER_HOST + 'feeds/refresh';


// export function getPage(page) {
//     return dispatch => {
//         fetch(feedsUrl + page, {
//             credentials: "include",
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': localStorage.getItem('token')
//             }
//         }).then(result => {
//             if (result.status == 200) {
//                 return result.json()
//             } else {
//                 throw err;
//             }
//         }).then(jsonBody => {
//             dispatch({
//                 type: 'FEEDS_CHANGED',
//                 payload: {
//                     feeds: jsonBody,
//                     page: page
//                 }
//             })
//         }).catch(() => {
//             dispatch({
//                 type: 'SERVER_ERROR',
//                 payload: {message: "UNABLE TO COMPLETE REQUEST"}
//             })
//         })
//     }
// }

function onGetPageSuccess(payload) {
    return dispatch => {
        console.log('SUCCESS', payload);
        dispatch({
            type: 'FEEDS_CHANGED',
            payload: {
                feeds: payload,
                page: 0
            }
        })
    };
}
function onGetPageFailure(error) {
    return dispatch => {
        if (error.status != undefined && error.status == 401) {
            dispatch({
                type: 'AUTHORIZATION_ERROR',
                message: 'Authorization error.Bad Token. Please login again.'
            });
        } else {
            dispatch({
                type: 'SERVER_ERROR',
                message: 'Unable to execute request. Unpredictable error occurred '
            });
        }
    };
}
export function getPage(page) {
    var url = feedsUrl + page;
    var config = {
        credentials: "include",
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             'Authorization': localStorage.getItem('token')
           // 'Authorization': 123123123
        }
    };
    return request(url, config, onGetPageSuccess, onGetPageFailure)

}

export function addFeed(feed) {
    return dispatch => {
        fetch(addFeedUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(feed)
        }).then(result => {
            if (result.status == 200) {
                dispatch(refreshFeedList(0));
            } else {
                throw err;
            }
        }).catch(() => {
            dispatch({
                type: 'ADD_RSS_ERROR_OCCURRED',
                payload: {message: "UNABLE TO ADD FEED"}
            })
        })
    }
}


export function deleteFeed(id) {
    return (dispatch, getState) => {
        fetch(deleteFeedUrl + id, {
            credentials: "include",
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(result => {
            if (result.status == 200) {
                if (getState().viewedFeed.feed.id == id) {
                    dispatch({
                        type: 'CLEAN_POST_STORE'
                    });
                    dispatch({
                        type: 'CLEAN_VIEWED_FEED'
                    });
                    dispatch({
                        type: 'CLEAN_VIEWED_POST'
                    })
                }
                dispatch(refreshFeedList(0));
            } else {
                throw err;
            }
        }).catch(() => {
            dispatch({
                type: 'SERVER_ERROR',
                payload: {message: "UNABLE TO DELETE FEED"}
            })
        })
    }
}

function refreshFeedList() {
    return dispatch => {
        fetch(refreshFeedListUrl + 0, {
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
            dispatch({
                type: 'FEEDS_REFRESHED',
                payload: {
                    feeds: jsonBody,
                    page: 0
                }
            })
        }).catch(() => {
            dispatch({
                type: 'SERVER_ERROR',
                payload: {message: "UNABLE TO REFRESH FEED LIST"}
            })
        })
    }
}


export function refreshFeeds() {
    return (dispatch, getState) => {
        fetch(refreshFeedUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(result => {
            if (result.status == 200) {
                var viewedFeed = getState().viewedFeed.feed;
                var postList = getState().postList;
                dispatch(PostActions.getPage(viewedFeed.id, postList.searchPattern, postList.sortField, postList.sortDir, 0))
            } else {
                throw err;
            }
        }).catch(() => {
            dispatch({
                type: 'SERVER_ERROR',
                payload: {message: "UNABLE TO REFRESH FEED LIST"}
            })
        })
    }
}


export function test(page) {
    return (dispatch, getState) => {
        console.log('TEST STATE', getState())
    };
}