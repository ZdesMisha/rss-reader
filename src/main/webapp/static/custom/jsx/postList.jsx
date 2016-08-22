import React from 'react';
import Post from './post';
import Reflux from 'reflux';
import PostStore from './store/postStore';
import FeedStore from './store/feedStore';
import SortingPanel from './sortingPanel';
import ReactScrollPagination from 'react-scroll-pagination';



module.exports = React.createClass({

    mixins: [
        Reflux.listenTo(PostStore, 'onChange'),
        Reflux.listenTo(FeedStore, 'onInitChange')
    ],

    isolate: {
        pageNumber: 0,
        isRequesting: false,
        totalPages: 0
    },

    getInitialState: function () {
        return {
            posts: [],
            feedTitle: "",
            totalPages: 0

        }
    },

    componentDidMount: function () {
        this.getNextPage()
    },

    getNextPage: function () {
        if (this.isolate.isRequesting || (this.isolate.pageNumber > 0 && this.isolate.pageNumber >= this.isolate.totalPages)) {
            return
        }
        this.isolate.pageNumber++;
        this.isolate.isRequesting = true;
        console.log("next page");
        PostStore.getPosts(this.isolate.pageNumber);
    },

    render: function () {

        let postList = this.state.posts.map((post, i) => {
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

        return (<div className="col-md-3 main">
            <SortingPanel/>
            {postList}
            <ReactScrollPagination
                fetchFunc={this.getNextPage}
                totalPages={this.state.totalPages}
            />
        </div>);
    },

    onChange: function (event, feed) {
        this.isolate.isRequesting = false;
        this.isolate.totalPages = 10;
        this.setState({
            posts: feed.posts,
            feedTitle: feed.title
        });
    },
    onInitChange: function (event, feeds) {
        PostStore.getPosts(1);
    }

});