/**
 * Created by misha on 09.06.16.
 */
var Reflux = require('reflux');
import Api from '../rest/api'

module.exports = Reflux.createStore({

    showPost: function (id, title, description, link, pubDate) {
        this.post = {
            id: id,
            title: title,
            description: description,
            link: link,
            pubDate: pubDate
        };
        this.triggerChange();
    },

    setViewed: function (id) {
        return Api.setPostViewed(id).then(function (response) {
        }.bind(this));
    },

    triggerChange: function () {
        this.trigger('change', this.post);
    }

});