import * as PostActions from './post-actions';
import {request} from '../api/api';


const SERVER_HOST = __SERVER_HOST__ + 'rest/secured/';
const feedsUrl = SERVER_HOST + 'feeds/page/';
const addFeedUrl = SERVER_HOST + 'feeds/add';
const deleteFeedUrl = SERVER_HOST + 'feeds/delete/';
const refreshFeedListUrl = SERVER_HOST + 'feeds/pages/';
const refreshFeedUrl = SERVER_HOST + 'feeds/refresh';


//---------------GET FEED PAGE
function onGetPageSuccess(payload) {
    return dispatch => {
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
                type: 'CHANGE_STATUS',
                payload: 'login'
            });
            dispatch({
                type: 'SHOW_LOGIN_ERROR',
                message: 'Authorization error.Bad Token. Please login again.'
            });
        } else {
            dispatch({
                type: 'SHOW_MAIN_ERROR',
                message: 'Unable to execute request. Unpredictable error occurred.'
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
        }
    };
    return request(url, config, onGetPageSuccess, onGetPageFailure)

}

//---------------ADD FEED


function onAddFeedSuccess() {
    return dispatch => {
        dispatch(refreshFeedList(0));
    };
}
function onAddFeedFailure(error) {
    return dispatch => {
        if (error.status != undefined && error.status == 401) {
            dispatch({
                type: 'CHANGE_STATUS',
                payload: 'login'
            });
            dispatch({
                type: 'SHOW_LOGIN_ERROR',
                message: 'Authorization error.Bad Token. Please login again.'
            });
        } else {
            dispatch({
                type: 'SHOW_ADD_RSS_ERROR',
                message: 'Unable to process rss feed'
            });
        }
    };
}

export function addFeed(feed) {
    var url = addFeedUrl;
    var config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(feed)
    };
    return request(url, config, onAddFeedSuccess, onAddFeedFailure);
}


//---------------DELETE FEED

function onDeleteFeedSuccess(deletedFeedId, viewedFeedId) {
    return function (payload) {
        return dispatch => {
            if (viewedFeedId == deletedFeedId) {
                dispatch({
                    type: 'CLEAN_POST_STORE'
                });
                dispatch({
                    type: 'CLEAN_VIEWED_FEED'
                });
                dispatch({
                    type: 'CLEAN_VIEWED_POST'
                });
            }
            dispatch(refreshFeedList(0));
        };
    }
}
function onDeleteFeedFailure(error) {
    return dispatch => {
        if (error.status != undefined && error.status == 401) {
            dispatch({
                type: 'CHANGE_STATUS',
                payload: 'login'
            });
            dispatch({
                type: 'SHOW_LOGIN_ERROR',
                message: 'Authorization error.Bad Token. Please login again.'
            });
        } else {
            dispatch({
                type: 'SHOW_MAIN_ERROR',
                message: 'Unable to execute delete request. Unpredictable error occurred.'
            });
        }
    };
}
export function deleteFeed(id) {

    var url = deleteFeedUrl + id;
    var config = {
        credentials: "include",
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    };
    return (dispatch, getState)=> {
        var viewedFeedId = getState().viewedFeed.feed.id;
        dispatch(request(url, config, onDeleteFeedSuccess(id, viewedFeedId), onDeleteFeedFailure))
    }
}


//---------------REFRESH FEED LIST

function onRefreshFeedListSuccess(jsonBody) {
    return dispatch => {
        dispatch({
            type: 'FEEDS_REFRESHED',
            payload: {
                feeds: jsonBody,
                page: 0
            }
        })
    };
}
function onRefreshFeedListFailure(error) {
    return dispatch => {
        if (error.status != undefined && error.status == 401) {
            dispatch({
                type: 'CHANGE_STATUS',
                payload: 'login'
            });
            dispatch({
                type: 'SHOW_LOGIN_ERROR',
                message: 'Authorization error.Bad Token. Please login again.'
            });
        } else {
            dispatch({
                type: 'SHOW_MAIN_ERROR',
                message: 'Unable to execute refresh feed list request. Unpredictable error occurred.'
            });
        }
    };
}
function refreshFeedList() {

    var url = refreshFeedListUrl + 0;
    var config = {
        credentials: "include",
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    };
    return request(url, config, onRefreshFeedListSuccess, onRefreshFeedListFailure);
}

//---------------REFRESH FEED INFO
function onRefreshFeedsSuccess() {
    return (dispatch, getState) => {
        dispatch({
            type: 'CLEAN_POST_STORE'
        });
        var viewedFeed = getState().viewedFeed.feed;
        var postList = getState().postList;
        dispatch(PostActions.getPage(viewedFeed.id, postList.searchPattern, postList.sortField, postList.sortDir, 0))
    };
}
function onRefreshFeedsFailure(error) {
    return dispatch => {
        if (error.status != undefined && error.status == 401) {
            dispatch({
                type: 'CHANGE_STATUS',
                payload: 'login'
            });
            dispatch({
                type: 'SHOW_LOGIN_ERROR',
                message: 'Authorization error.Bad Token. Please login again.'
            });
        } else {
            dispatch({
                type: 'SHOW_MAIN_ERROR',
                message: 'Unable to execute refresh feed list request. Unpredictable error occurred.'
            });
        }
    };
}
export function refreshFeeds() {
    var url = refreshFeedUrl;
    var config = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    };
    return request(url, config, onRefreshFeedsSuccess, onRefreshFeedsFailure);
}
