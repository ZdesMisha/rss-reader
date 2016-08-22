import React from 'react';
import Reflux from 'reflux';
import SinglePostStore from './store/singlePostStore';
import PostStore from './store/postStore';

module.exports = React.createClass({

    mixins: [
        Reflux.listenTo(SinglePostStore, 'onChange'),
        Reflux.listenTo(PostStore, 'onInitChange')

    ],

    getInitialState: function(){
      return {
          post:{
              // id: 1,
              // title: "test",
              // description: "test",
              // link: "test",
              // pubDate: "test"
          }
      }
    },

    render: function () {
        return ( <div className="col-md-6 main-black">
            <h2 className="page-header">{this.state.post.title}</h2>
            <div className="post-description">{this.state.post.description}</div>
            <div className="post-link post-info-link"><a href={this.state.post.link}>Link to full article</a></div>
            <div className="post-date post-info-date">{this.state.post.pubDate}</div>

        </div>);
    },

    onChange: function (event, post) {
        this.setState({post: post});
    },

    onInitChange: function (event, feed) {
        this.setState({post: feed.posts[0]});
    }
});