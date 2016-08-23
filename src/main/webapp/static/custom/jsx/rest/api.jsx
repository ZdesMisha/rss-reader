import React from 'react';
import Fetch from 'whatwg-fetch';


const SERVER_HOST = __SERVER_HOST__;
var feedsUrl = SERVER_HOST + 'rest/feed/list/';
var addFeedUrl = SERVER_HOST + 'rest/feed/post';
var postsUrl = SERVER_HOST + 'rest/feed';
var findPostsUrl = SERVER_HOST + 'rest/feed/search';
var deleteFeedUrl = SERVER_HOST + 'rest/feed/';
var sortedPostsUrl = SERVER_HOST + 'rest/feed/sort/';
var setViewedUrl = __SERVER_HOST__ + 'rest/feed/item/';
var refreshFeedUrl = __SERVER_HOST__ + 'rest/feed/refresh';
var refreshFeedListUrl = __SERVER_HOST__ + 'rest/feed/refreshList/';

module.exports = {


    getNextPage: function (feedId, pattern, sortField, sortDir, page) {
        var url = "/"+feedId;
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


    fetchNextPage: function (page) {
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

    fetchPages: function (pages) {
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

    getSortedPosts: function (field, order, page) {
        return fetch(postsUrl + field + "/" + order + "/" + page, {
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

    getPosts: function (id, page) {
        return fetch(postsUrl + id + "/" + page, {
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

    findPosts: function (id, pattern, page) {
        return fetch(findPostsUrl + "/" + id + "/" + pattern + "/" + page, {
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
    }

};


