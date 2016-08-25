import React from 'react';
import Fetch from 'whatwg-fetch';


const SERVER_HOST = __SERVER_HOST__;
var feedsUrl = SERVER_HOST + 'rest/feed/list/';
var addFeedUrl = SERVER_HOST + 'rest/feed/add';
var postsUrl = SERVER_HOST + 'rest/feed';
var findPostsUrl = SERVER_HOST + 'rest/feed/search';
var deleteFeedUrl = SERVER_HOST + 'rest/feed/delete/';
var sortedPostsUrl = SERVER_HOST + 'rest/feed/sort/';
var setViewedUrl = __SERVER_HOST__ + 'rest/feed/item/';
var refreshFeedUrl = __SERVER_HOST__ + 'rest/feed/refresh';
var refreshFeedListUrl = __SERVER_HOST__ + 'rest/feed/refreshList/';
var getPostUrl = __SERVER_HOST__ + 'rest/feed/post/';

module.exports = {

//------------------FEED API-------------------------
    fetchNextFeedPage: function (page) {
        return fetch(feedsUrl + page, {
            credentials: "include",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response;
            });
    },


    setPostViewed: function (id) {
        return fetch(setViewedUrl + id, {
            credentials: "include",
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response;
            });
    }


};


