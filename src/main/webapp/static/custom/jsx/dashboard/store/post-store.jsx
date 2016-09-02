/**
 * Created by misha on 09.06.16.
 */
import Api from '../rest/feed-api';
import UserStore from './user-store';
var Reflux = require('reflux');
var PostActions = require('../action/post-actions');
import SinglePostStore from './single-post-store';

module.exports = Reflux.createStore({


    listenables: [PostActions],

    feed: {
        id: "",
        title: "",
        posts: []
    },

    viewedPost: {},

    page: 0,
    totalPages: 5,
    sortField: "pubDate",
    sortDir: "desc",
    searchPattern: "",


    getNextPage: function () {
        if (this.page < this.totalPages && this.page >= 0) {
            return Api.fetchNextPostPage(this.feed.id, this.searchPattern, this.sortField, this.sortDir, this.page).then(function (response) {
                this.responseStatus = response.status;
                return response.json();
            }.bind(this)).then(function (jsonBody) {
                console.log(jsonBody);
                console.log(this.feed);
                switch (this.responseStatus) {
                    case 200:
                        this.page++;
                        this.feed.posts = this.feed.posts.concat(jsonBody.posts);
                        this.triggerChange();
                        break;
                    case 401:
                        UserStore.changeStatus('login');
                        break;
                    default:
                        return jsonBody.error;
                }
            }.bind(this));
        }
    },

    setViewed: function (id) {
        return Api.setPostViewed(id).then(function (response) {
            this.responseStatus = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            switch (this.responseStatus) {
                case 200:
                    break;
                case 401:
                    UserStore.changeStatus('login');
                    break;
                default:
                    return jsonBody.error;
            }
        }.bind(this));
    },

    setSearchPattern: function (pattern) {
        this.cleanPostList();
        this.searchPattern = pattern;
    },

    setSortField: function (sortField) {
        this.cleanPostList();
        this.sortField = sortField;
    },

    setSortDirection: function (sortDir) {
        this.cleanPostList();
        this.sortDir = sortDir;
    },

    cleanPostList: function () {
        this.feed.posts = [];
        this.viewedPost = {};
        this.page = 0;
        this.triggerChange();
    },

    cleanStore: function () {
        this.feed = {};
        this.viewedPost = {};
        this.page = 0;
        this.triggerChange();
    },

    setViewedFeed: function (feed) {
        this.feed = {
            id: feed.id,
            title: feed.title

        };
        this.cleanPostList();
        SinglePostStore.cleanStore();
    },

    changeViewedPost: function (postId) {
        this.viewedPost.id = postId;
        SinglePostStore.changeViewedPost(postId);
    },


    triggerChange: function () {
        this.trigger('change', this.feed);
    }
});