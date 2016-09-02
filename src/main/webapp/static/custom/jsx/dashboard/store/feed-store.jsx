/**
 * Created by misha on 09.06.16.
 */
import Api from '../rest/feed-api';
import UserStore from './user-store';
import PostStore from './post-store';
var Reflux = require('reflux');
var FeedActions = require('../action/feed-actions');

module.exports = Reflux.createStore({

    listenables: [FeedActions],

    feedStore: {
        feeds: [],
    },
    page: 0,
    viewedFeed: {},

    
    getNextPage: function () {
        return Api.fetchNextFeedPage(this.page).then(function (response) {
            this.responseStatus = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            switch (this.responseStatus) {
                case 200:
                    this.page++;
                    this.feedStore.feeds = this.feedStore.feeds.concat(jsonBody);
                    this.triggerChange();
                    break;
                case 401:
                    UserStore.changeStatus('login');
                    break;
                default:
                    return jsonBody.error;
            }
        }.bind(this));
    },

    deleteFeed: function (id) {
        return Api.deleteFeed(id).then(function (response) {
            this.responseStatus = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            switch (this.responseStatus) {
                case 200:
                    if (id == this.viewedFeed.id) {
                        this.changeViewedFeed({});
                    }
                    break;
                case 401:
                    UserStore.changeStatus('login');
                    break;
                default:
                    return jsonBody.error;
            }
        }.bind(this));
    },

    addFeed: function (feed) {
        return Api.addFeed(feed).then(function (response) {
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

    refreshFeedList: function () {
        return Api.fetchFeedPages(this.page).then(function (response) {
            this.responseStatus = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            console.log('feed pages',jsonBody);
            switch (this.responseStatus) {
                case 200:
                    this.feedStore.feeds = jsonBody;
                    this.triggerChange();
                    break;
                case 401:
                    UserStore.changeStatus('login');
                    break;
                default:
                    return jsonBody.error;
            }
        }.bind(this));
    },

    refreshFeeds: function () {
        return Api.refreshFeeds().then(function (response) {
            this.responseStatus = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            switch (this.responseStatus) {
                case 200:
                    this.triggerChange();
                    break;
                case 401:
                    UserStore.changeStatus('login');
                    break;
                default:
                    return jsonBody.error;
            }
        }.bind(this));
    },


    changeViewedFeed: function (feed) {
        this.viewedFeed = feed;
        PostStore.setViewedFeed(feed);
    },
    
    triggerChange: function () {
        this.trigger('change', this.feedStore.feeds);
    }

});