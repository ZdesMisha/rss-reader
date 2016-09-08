import React from 'react';
import Reflux from 'reflux';
import SinglePostStore from './store/single-post-store';
import jQuery from 'jquery';


module.exports = React.createClass({

    mixins: [
        Reflux.listenTo(SinglePostStore, 'onChange')
    ],

    getInitialState: function () {
        return {
            post: {}
        }
    },

    render: function () {

        if (jQuery.isEmptyObject(this.state.post)) {
            return ( <div className="col-md-6 main-black">
                <p className="empty-list">Click on post to see detailed info</p>
            </div>);
        } else {
            return ( <div className="col-md-6 main-black">
                <h2 className="page-header">{this.state.post.title}</h2>
                <div className="post-description">{this.state.post.description}</div>
                <div className="post-link post-info-link"><a href={this.state.post.link}>Link to full article</a></div>
                <div className="post-date post-info-date">{this.state.post.pubDate}</div>

            </div>);
        }
    },

    onChange: function (event, post) {
        this.setState({post: post});
    }

})
;