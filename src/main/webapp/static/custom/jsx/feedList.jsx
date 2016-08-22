import React from 'react';
import Feed from './feed';
import Reflux from 'reflux';
import FeedStore from './store/feedStore';
import ControlPanel from './controlPanel'
import ReactScrollPagination from 'react-scroll-pagination';


module.exports = React.createClass({

    mixins: [
        Reflux.listenTo(FeedStore, 'onChange')
    ],

    isolate: {
        pageNumber: 0,
        isRequesting: false,
        totalPages: 0
    },

    getInitialState: function () {
        return {
            feeds: [],
            totalPages: 0
        }
    },

    getNextPage: function () {
        if (this.isolate.isRequesting || (this.isolate.pageNumber > 0 && this.isolate.pageNumber >= this.isolate.totalPages)) {
            return
        }
        this.isolate.pageNumber++;
        this.isolate.isRequesting = true;
        FeedStore.getFeeds(this.isolate.pageNumber);
    },

    componentDidMount: function () {
        this.getNextPage()
    },


    render: function () {

        let feedlist = this.state.feeds.map((feed, index) => {
            return <Feed key={index} id={feed.id} title={feed.title}/>
        });

        return (<div className="col-md-3 sidebar">
            <ControlPanel/>
            {feedlist}
            <ReactScrollPagination
                fetchFunc={this.getNextPage}
                totalPages={this.state.totalPages}
            />
        </div>);
    },

    onChange: function (event, feeds) {
        this.isolate.isRequesting = false;
        this.isolate.totalPages = 10;
        this.setState({feeds: feeds});
    }
});