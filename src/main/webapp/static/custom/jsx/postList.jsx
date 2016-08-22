import React from 'react';
import Post from './post';
import Reflux from 'reflux';
import PostStore from './store/postStore';
import FeedStore from './store/feedStore';
import SortingPanel from './sortingPanel';


module.exports = React.createClass({

    mixins: [
        Reflux.listenTo(PostStore, 'onChange'),
        Reflux.listenTo(FeedStore, 'onInitChange')
    ],

    isolate: {
        pageNo: 0,
        isRequesting: false,
        totalPages: 0
    },

    getInitialState: function () {
        return {
            posts: [],
            feedTitle: "",
            totalPages: 0,
            feedId: ""

        }
    },

    getPosts: function(page){
        PostStore.getPosts(page)
    },

    getNextPage: function () {
        var scrollHeight = document.getElementById("all-posts").scrollHeight;
        var scrollBottom = jQuery('#all-posts').scrollTop();
        var windowHeight = jQuery('#all-posts').innerHeight();
        //
        // console.log("windowHeight ", windowHeight);
        // console.log("trueheight ", scrollHeight);
        // console.log("scrollBottom ", scrollBottom);
        if (scrollBottom + windowHeight >= scrollHeight) {
            if (this.isolate.isRequesting || (this.isolate.pageNo > 0 && this.isolate.pageNo >= this.isolate.totalPages)) {
                return;
            }
            this.isolate.pageNo++;
            this.isolate.isRequesting = true;
            this.getPosts(this.isolate.pageNo)
        }

    },

    render: function () {

        var postList = this.state.posts.map((post, i) => {
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

        return (<div className="col-md-3 main" id="all-posts" onScroll={this.getNextPage}>
            <SortingPanel/>
            {postList}
        </div>);
    },

    onChange: function (event, feed) {
        this.isolate.isRequesting = false;
        this.isolate.totalPages = 10;
        this.setState({
            posts: this.state.posts.concat(feed.posts)
        });
    },
    onInitChange: function (event, feeds) {
        this.isolate.totalPages=10;
        this.setState({
            feedId: feeds[0].id,
            feedTitle: feeds[0].title
        });
        this.getPosts(0);
    }

});