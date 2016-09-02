import React from 'react';
import Fetch from 'whatwg-fetch';


const SERVER_HOST = __SERVER_HOST__ + 'rest/secured/';
const feedsUrl = SERVER_HOST + 'feeds/page/';
const addFeedUrl = SERVER_HOST + 'feeds/add';
const postsUrl = SERVER_HOST + 'feeds';
const deleteFeedUrl = SERVER_HOST + 'feeds/delete/';
const setViewedUrl = SERVER_HOST + 'feeds/post/';
const refreshFeedUrl = SERVER_HOST + 'feeds/refresh';
const refreshFeedListUrl = SERVER_HOST + 'feeds/pages/';
const getPostUrl = SERVER_HOST + 'feeds/post/';

module.exports = {

//------------------FEED API-------------------------
    fetchNextFeedPage: function (page) {
        console.log(localStorage.getItem('token'));
        return fetch(feedsUrl + page, {
            credentials: "include",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                return response;
            });
    },

    fetchFeedPages: function (pages) {
        return fetch(refreshFeedListUrl + pages, {
            credentials: "include",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                return response;
            });
    },


    deleteFeed: function (id) {
        return fetch(deleteFeedUrl + id, {
            credentials: "include",
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                return response;
            });
    },

    addFeed: function (feed) {
        return fetch(addFeedUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(feed)
        }).then(function (response) {
            return response;
        })
    },

    refreshFeeds: function () {
        return fetch(refreshFeedUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            return response;
        })
    },
    //------------------POST API-------------------------


    fetchNextPostPage: function (feedId, pattern, sortField, sortDir, page) {
        var url = "/" + feedId;
        if (pattern) {
            url = url + "/search/" + pattern;
        }
        if (sortField) {
            url = url + "/sortField/" + sortField + "/sortDir/" + sortDir
        }
        url = url + "/page/" + page;

        return fetch(postsUrl + url, {
            credentials: "include",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                return response;
            });
    },


    setPostViewed: function (id) {
        console.log(localStorage.getItem('token'));
        return fetch(setViewedUrl + id, {
            credentials: "include",
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                return response;
            });
    },

    getPost: function (id) {
        return fetch(getPostUrl + id, {
            credentials: "include",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                return response;
            });
    }


};


