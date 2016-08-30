import React from 'react';
import Feed from './feed';
import Reflux from 'reflux';
import FeedStore from './store/feedStore';
import jQuery from 'jquery';
import ControlPanel from './controlPanel';


module.exports = React.createClass({

    mixins: [
        Reflux.listenTo(FeedStore, 'onChange')
    ],

    isolate: {
        pageNo: 0,
        isRequesting: false,
        totalPages: 0
    },

    getInitialState: function () {
        return {
            feeds: [],
            totalPages: 5 //todo something with it
        }
    },

    componentDidMount: function() {
      this.getFeeds(0);
    },

    getFeeds: function (page) {
        FeedStore.getNextPage(page)
    },
    getNextPage: function () {
        var scrollHeight = document.getElementById("all-feeds").scrollHeight;
        var scrollBottom = jQuery('#all-feeds').scrollTop();
        var windowHeight = jQuery('#all-feeds').innerHeight();

        console.log("windowHeight ", windowHeight);
        console.log("trueheight ", scrollHeight);
        console.log("scrollBottom ", scrollBottom);
        if (scrollBottom + windowHeight >= scrollHeight) {
            if (this.isolate.isRequesting || (this.isolate.pageNo > 0 && this.isolate.pageNo >= this.isolate.totalPages)) {
                return;
            }
            this.isolate.isRequesting = true;
            this.getFeeds(this.isolate.pageNo++)
        }

    },

    render: function () {
        var feedlist;
        if (this.state.feeds.length > 0) {
            feedlist = this.state.feeds.map((feed, index) => {
                return <Feed key={index} id={feed.id} title={feed.title}/>
            });
        } else {
            feedlist = <p className="empty-list">No feeds. Click plus to add new feed</p>
        }

        return (
            <div className="col-md-3 sidebar" id="all-feeds" onScroll={this.getNextPage}>
                <ControlPanel/>
                {feedlist}
            </div>
        )
    },

    onChange: function (event, feeds) {
        this.isolate.isRequesting = false;
        this.setState({
            feeds: feeds
        });
    }
});