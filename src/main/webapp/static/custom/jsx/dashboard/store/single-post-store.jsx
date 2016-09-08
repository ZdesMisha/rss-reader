/**
 * Created by misha on 09.06.16.
 */
import Api from '../rest/feed-api';
import PostStore from './post-store';
import jQuery from 'jquery';
import UserStore from './user-store';
var SinglePostActions = require('../action/single-post-actions');
var Reflux = require('reflux');


module.exports = Reflux.createStore({

    listenables: [SinglePostActions],

    post: {},

    showPost: function () {
        return Api.getPost(this.post.id).then(function (response) {
            this.responseStatus = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            if (this.responseStatus == 200) {

                this.post = jsonBody;
                this.triggerChange();
                return this.responseStatus;
            }
        }.bind(this));
    },


    changeViewedPost: function (postId) {
        this.post.id = postId;
    },

    cleanStore: function () {
        this.post = {};
        this.triggerChange();
    },

    triggerChange: function () {
        console.log('post', this.post);
        this.trigger('change', this.post);
    }

});