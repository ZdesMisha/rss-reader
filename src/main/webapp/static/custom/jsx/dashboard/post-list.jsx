import React from 'react';
import Post from './post';
import Reflux from 'reflux';
import jQuery from 'jquery';
import PostActions from './action/post-actions';
import PostStore from './store/post-store';
import SortingPanel from './post-control-bar'
import UserStore from './store/user-store';


module.exports = React.createClass({

    mixins: [
        Reflux.listenTo(PostStore, 'onChange')
    ],

    isRequesting: false,

    getInitialState: function () {
        return {
            posts: [],
            feedTitle: "",
            feedId: ""

        }
    },

    hideAlert: function () {
        jQuery('#post-list-alert').hide();
    },

    showAlert: function () {
        jQuery('#post-list-alert').show();
        jQuery('#post-list-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#post-list-alert").slideUp(500);
        });
    },

    getNextPage: function () {
        var scrollHeight = document.getElementById("all-posts").scrollHeight;
        var scrollBottom = jQuery('#all-posts').scrollTop();
        var windowHeight = jQuery('#all-posts').innerHeight();
        if (scrollBottom + windowHeight >= scrollHeight) {
            if (this.isRequesting) {
                return;
            }
            this.isRequesting = true;
            PostActions.getNextPage().then(function (status) {
                switch (status) {
                    case 200:
                        break;
                    case 401:
                        UserStore.changeStatus('login');
                        break;
                    default:
                        this.showAlert();
                        break;
                }
            }.bind(this));
        }

    },

    render: function () {
        var postList;
        if (this.state.posts.length > 0) {
            postList = this.state.posts.map((post, i) => {
                return <Post key={i}
                             id={post.id}
                             title={post.title}
                             link={post.link}
                             description={post.description}
                             pubDate={post.pubDate}
                             isViewed={post.viewed}
                             feedtitle={this.state.feedTitle}

                />
            });
        } else {
            postList = <p className="empty-list">No posts</p>
        }

        return (<div className="col-md-3 main" id="all-posts" onScroll={this.getNextPage}>
            <SortingPanel/>
            {postList}
            <div className="alert alert-danger dashboard-alert" id="post-list-alert" hidden="hidden">
                <a href="#" className="close alert-close-btn" data-dismiss="alert" aria-label="close"
                   onClick={this.hideAlert}>&times;</a>
                <span className="sr-only">Error:</span>
                Server error occurred
            </div>
        </div>);
    },

    onChange: function (event, feed) {
        this.isRequesting = false;
        this.setState({
            posts: feed.posts,
            feedId: feed.id,
            feedTitle: feed.title,
        });
    }

});