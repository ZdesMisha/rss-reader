/**
 * Created by misha on 09.06.16.
 */
var Reflux = require('reflux');
import Api from '../rest/api';
import PostStore from './postStore';
var Actions = require('../action/actions');
import jQuery from 'jquery';



module.exports = Reflux.createStore({

    listenables: [Actions],

    post: {},

    showPost: function (id) {
        return Api.getPost(id).then(function (response) {
            this.status = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            if (this.status == 200) {
                console.log("GET POST SUCCESS");
                this.post = jsonBody;
                this.triggerChange();
            } else {
                console.log("GET POST ERROR OCCURRED");//TODO error message
            }
            return this.status;
        }.bind(this));
    },


    viewedPostChanged: function () {

        this.post = PostStore.viewedPost;
        if (jQuery.isEmptyObject(this.post)) {
            this.triggerChange();
        } else {
            this.showPost(this.post.id);
        }
    },

    triggerChange: function () {
        this.trigger('change', this.post);
    }

});