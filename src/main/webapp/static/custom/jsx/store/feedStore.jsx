/**
 * Created by misha on 09.06.16.
 */
var Api = require('../rest/api');
var Reflux = require('reflux');
var Actions = require('../action/actions');

module.exports = Reflux.createStore({

    listenables: [Actions],

    feedStorage: {
        feeds: [],
        page: 0
    },

    viewedFeed: {},


    init(){
        this.fetchNextPage(this.feedStorage.page);
        console.log("init storage");
    },

    setViewedFeed: function (feed) {
        this.viewedFeed = feed;
        console.log("SET VIEWED VIEWED ID ",this.viewedFeed.id);//TODO error message
        Actions.changeViewedFeedContent();
    },

    getFeeds: function () {
        return this.feedStorage.feeds;
    },

    fetchNextPage: function (page) {
        return Api.fetchNextPage(page).then(function (response) {
            this.status = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            if (this.status == 200) {
                this.feedStorage.feeds = this.feedStorage.feeds.concat(jsonBody);
                this.feedStorage.page = page;
                console.log(jsonBody);
                this.triggerChange();
            } else {
                console.log("ALL FEEDS ERROR OCCURRED");//TODO error message
            }
            return this.status;
        }.bind(this));
    },


    deleteFeed: function (id) {
        console.log("delete staart");
        return Api.deleteFeed(id).then(function (response) {
            this.status = response.status;
            if (this.status == 200) {
                console.log("delete success");
                console.log("VIEWED ID ",this.viewedFeed.id);//TODO error message
                console.log("ID TO DELETE",id);//TODO error message

                if (id == this.viewedFeed.id) {
                    this.viewedFeed = {};
                    Actions.changeViewedFeedContent();
                }
                this.refreshFeedList();
            } else {
                console.log("DELETE ERROR OCCURRED");//TODO error message
            }
            return this.status;
        }.bind(this));
    },

    addFeed: function (feed) {
        return Api.addFeed(feed).then(function (response) {
            this.status = response.status;
            if (this.status == 200) {
                console.log("ADD SUCCESS");
                this.refreshFeedList();
            } else {
                console.log("ADD ERROR OCCURRED");//TODO error message
            }
            return this.status;
        }.bind(this));
    },

    refreshFeedList:function(){
        return Api.fetchPages(this.feedStorage.page).then(function (response) {
            this.status = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            if (this.status == 200) {
                this.feedStorage.feeds = jsonBody;
                console.log(jsonBody);
                this.triggerChange();
            } else {
                console.log("REFRESH FEED LIST FEEDS ERROR OCCURRED");//TODO error message
            }
            return this.status;
        }.bind(this));
    },

    refreshFeeds: function () { //TODO !!!!!!!!!!!!!
        return Api.refreshFeeds().then(function (response) {
            this.triggerChange();
        }.bind(this));
    },

    triggerChange: function () {
        this.trigger('change', this.feedStorage.feeds);
    }

});