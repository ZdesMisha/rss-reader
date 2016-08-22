/**
 * Created by misha on 09.06.16.
 */
var Api = require('../rest/api');
var Reflux = require('reflux');
var Actions = require('../action/actions');

module.exports = Reflux.createStore({

    listenables: [Actions],

    getFeeds: function (page) { //TODO page 
        return Api.getFeeds(page).then(function (response) {
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            this.feeds = jsonBody;
            console.log(jsonBody);
            this.triggerChange();
            return this.response;
        }.bind(this));
    },


    deleteFeed: function(id) {
        return Api.deleteFeed(id).then(function (response) {
            this.getFeeds();
        }.bind(this));
    },
    
    addFeed: function(feed) {
        return Api.addFeed(feed).then(function (response) {
            this.getFeeds();
        }.bind(this));
    },
    
    refreshFeeds: function() {
        return Api.refreshFeeds().then(function (response) {
            this.triggerChange();
        }.bind(this));
    },
    
    triggerChange: function () {
        this.trigger('change', this.feeds);
    }

});