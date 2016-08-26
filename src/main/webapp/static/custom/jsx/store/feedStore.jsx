/**
 * Created by misha on 09.06.16.
 */
var Api = require('../rest/api');
var Reflux = require('reflux');
var Actions = require('../action/actions');

module.exports = Reflux.createStore({

    feedStorage: {
        feeds: [],
        page: 0
    },

    viewedFeed: {},

    init(){
        this.getNextPage(this.feedStorage.page);
    },

    setViewedFeed: function (feed) {
        this.viewedFeed = feed;
        Actions.viewedFeedChanged();
    },

    getNextPage: function (page) {
        return Api.fetchNextFeedPage(page).then(function (response) {
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
        return Api.deleteFeed(id).then(function (response) {
            this.status = response.status;
            if (this.status == 200) {
                if (id == this.viewedFeed.id) {
                    this.setViewedFeed({});
                }
                this.getFeedPages();
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
                this.getFeedPages();
            } else {
                console.log("ADD ERROR OCCURRED");//TODO error message
            }
            return this.status;
        }.bind(this));
    },

    getFeedPages:function(){
        return Api.fetchFeedPages(this.feedStorage.page).then(function (response) {
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