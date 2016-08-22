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

    getPosts: function (page) { //todo page
        this.feed.id = 189;
        return Api.getPosts(189,page).then(function (response) {
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            this.feed = jsonBody;
            console.log(jsonBody);
            this.triggerChange();
            return this.response;
        }.bind(this));
    },


    findPosts: function (pattern) { //todo page
        return Api.findPosts(this.feed.id , pattern,1).then(function (response) {
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            this.feed.posts = jsonBody;
            console.log(jsonBody);
            this.triggerChange();
            return this.response;
        }.bind(this));
    },

    sortByDate: function (field, order) { //todo page
        return Api.getSortedPosts(field, order,1).then(function (response) {
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            this.feed.posts = jsonBody;
            console.log(jsonBody);
            this.triggerChange();
            return this.response;
        }.bind(this));
    },


    refreshPosts: function () { //todo page
        return Api.getPosts(this.feed.id ,1).then(function (response) {
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            this.feed = jsonBody;
            console.log(jsonBody);
            this.triggerChange();
            return this.response;
        }.bind(this));
    },

    triggerChange: function () {
        this.trigger('change', this.feed);
    }
});