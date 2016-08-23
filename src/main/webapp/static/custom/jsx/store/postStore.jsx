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
    sortDir: "asc",
    searchPattern: "",


    getNextPage: function (page) {
        console.log("pattern ",this.searchPattern);
        this.page = ++page;
        return Api.getNextPage(this.feed.id, this.searchPattern, this.sortField, this.sortDir, this.page).then(function (response) {
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


    // getPosts: function (page) { 
    //     return Api.getPosts(this.feed.id, page).then(function (response) {
    //         this.status = response.status;
    //         return response.json();
    //     }.bind(this)).then(function (jsonBody) {
    //         if (this.status == 200) {
    //             this.feed.posts = this.feed.posts.concat(jsonBody.posts);
    //             this.page = page;
    //             console.log(jsonBody);
    //             this.triggerChange();
    //         }
    //         else {
    //             console.log("GET POSTS ERROR OCCURRED");
    //         }
    //         return this.status;
    //     }.bind(this));
    // },
    //
    //
    // findPosts: function (pattern, page) {
    //     return Api.findPosts(this.feed.id, pattern, page).then(function (response) {
    //         this.status = response.status;
    //         return response.json();
    //     }.bind(this)).then(function (jsonBody) {
    //         if (this.status == 200) {
    //             this.feed.posts = this.feed.posts.concat(jsonBody.posts);
    //             this.page = page;
    //             console.log(jsonBody);
    //             this.triggerChange();
    //         }
    //         else {
    //             console.log("FIND POSTS ERROR OCCURRED");
    //         }
    //         return this.status;
    //     }.bind(this));
    // },

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
        this.feed = {
            id: FeedStore.viewedFeed.id,
            title: FeedStore.viewedFeed.title,
            posts: []
        };
        console.log("check id ", this.feed.id);
        if (this.feed.id != null) {
            this.getNextPage(0);

        } else {
            this.triggerChange()

        }
    },

    cleanStorage: function () {
        this.feed.posts = [];
        this.page = 0;
    },

    setPattern: function (pattern) {
        console.log("CHANGING pattern ",this.searchPattern);
        this.searchPattern = pattern;
    },

    triggerChange: function () {
        this.trigger('change', this.feed, this.page);
    }
});