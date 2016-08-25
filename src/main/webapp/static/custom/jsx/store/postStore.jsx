/**
 * Created by misha on 09.06.16.
 */
var Api = require('../rest/api');
var Reflux = require('reflux');
var Actions = require('../action/actions');
var FeedStore = require('./feedStore');

module.exports = Reflux.createStore({


    listenables: [Actions],

    feed: {
        id: "",
        title: "",
        posts: []
    },

    viewedPost: {},

    page: 0,
    sortField: "pubDate",
    sortDir: "desc",
    searchPattern: "",


    getNextPage: function (page) {
        this.page = ++page;
        return Api.fetchNextPostPage(this.feed.id, this.searchPattern, this.sortField, this.sortDir, this.page).then(function (response) {
            this.status = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            if (this.status == 200) {
                this.feed.posts = this.feed.posts.concat(jsonBody.posts);
                console.log(jsonBody);
                this.triggerChange();
            }
            else {
                console.log("GET NEXT PAGE ERROR OCCURRED");
            }
            return this.status;
        }.bind(this));
    },

    

    viewedFeedChanged: function () {
        this.feed = {
            id: FeedStore.viewedFeed.id,
            title: FeedStore.viewedFeed.title,
            posts: []
        };
        if (this.feed.id != null) {
            this.getNextPage(0);
        } else {
            this.triggerChange()
        }
        this.viewedPost = {};
        Actions.viewedPostChanged();
    },

    setViewedPost: function (id) {
        this.viewedPost={id:id};
        Actions.viewedPostChanged();
    },


    setViewed: function (id) { //TODO finish it
        return Api.setPostViewed(id).then(function (response) {
        }.bind(this));
    },

    setPattern: function (pattern) {
        this.cleanStorage();
        this.searchPattern = pattern;
        this.getNextPage(0)
    },

    setSortField: function (sortField) {
        this.cleanStorage();
        this.sortField = sortField;
        this.getNextPage(0)
    },

    setSortDirection: function (sortDir) {
        this.cleanStorage();
        this.sortDir = sortDir;
        this.getNextPage(0)
    },

    cleanStorage: function () {
        this.feed.posts = [];
        this.page = 0;
    },

    triggerChange: function () {
        this.trigger('change', this.feed, this.page);
    }
});