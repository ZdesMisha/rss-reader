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
        link: "",
        posts: []
    },

    page: 0,

    viewedPost: {},

    getPosts: function (page) { //todo page
        return Api.getPosts(this.feed.id, page).then(function (response) {
            this.status = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            if (this.status == 200) {
                this.feed.posts = this.feed.posts.concat(jsonBody.posts);
                this.page = page;
                console.log(jsonBody);
                this.triggerChange();
            }
            else {
                console.log("GET POSTS ERROR OCCURRED");
            }
            return this.status;
        }.bind(this));
    },


    findPosts: function (pattern, page) {
        return Api.findPosts(this.feed.id, pattern, page).then(function (response) {
            this.status = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            if (this.status == 200) {
                this.feed.posts = this.feed.posts.concat(jsonBody.posts);
                this.page = page;
                console.log(jsonBody);
                this.triggerChange();
            }
            else {
                console.log("FIND POSTS ERROR OCCURRED");
            }
            return this.status;
        }.bind(this));
    },

    sortByDate: function (order, page) { //todo page
        return Api.getSortedPosts("pubDate", order, page).then(function (response) {
            this.status = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            if (this.status == 200) {
                this.feed.posts = this.feed.posts.concat(jsonBody.posts);
                this.page = page;
                console.log(jsonBody);
                this.triggerChange();
            }
            else {
                console.log("SORT POSTS ERROR OCCURRED");
            }
            return this.status;
        }.bind(this));
    },


    refreshPosts: function () {
        return Api.getPosts(this.feed.id, 0).then(function (response) {
            this.status = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            if (this.status == 200) {
                this.feed.posts = jsonBody.posts;
                this.page = 0;
                console.log(jsonBody);
                this.triggerChange();
            }
            else {
                console.log("REFRESH POSTS ERROR OCCURRED");
            }
            return this.status;
        }.bind(this));
    },

    changeViewedFeedContent: function () {
        this.feed.id = FeedStore.viewedFeed.id;
        this.feed.title = FeedStore.viewedFeed.title;
        this.feed.posts = [];
        console.log("check id ",this.feed.id);
        if (this.feed.id != null) {
            this.getPosts(0);

        } else {
            this.triggerChange()

        }
    },

    triggerChange: function () {
        this.trigger('change', this.feed);
    }
});