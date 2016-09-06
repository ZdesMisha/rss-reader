import React from 'react';
import Feed from './feed';
import Reflux from 'reflux';
import FeedActions from './action/feed-actions';
import FeedStore from './store/feed-store';
import jQuery from 'jquery';
import ControlPanel from './feed-control-bar';
import UserStore from './store/user-store';


module.exports = React.createClass({

    mixins: [
        Reflux.listenTo(FeedStore, 'onChange')
    ],

    isRequesting: false,

    getInitialState: function () {
        return {
            feeds: []
        }
    },

    componentDidMount: function () {
        FeedActions.getNextPage().then(function (status) {
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
    },

    hideAlert: function () {
        jQuery('#feed-list-alert').hide();
    },

    showAlert: function () {
        jQuery('#feed-list-alert').show();
        jQuery('#feed-list-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#feed-list-alert").slideUp(500);
        });
    },

    getNextPage: function () {
        var scrollHeight = document.getElementById("all-feeds").scrollHeight;
        var scrollBottom = jQuery('#all-feeds').scrollTop();
        var windowHeight = jQuery('#all-feeds').innerHeight();

        if (scrollBottom + windowHeight >= scrollHeight) {
            if (this.isolate.isRequesting || (this.isolate.pageNo > 0 && this.isolate.pageNo >= this.isolate.totalPages)) {
                return;
            }
            this.isRequesting = true;
            FeedActions.getNextPage().then(function (status) {
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
                <div className="alert alert-danger dashboard-alert" id="feed-list-alert" hidden="hidden">
                    <a href="#" className="close alert-close-btn" data-dismiss="alert" aria-label="close"
                       onClick={this.hideAlert}>&times;</a>
                    <span className="sr-only">Error:</span>
                    Server error occurred
                </div>
            </div>
        )
    },

    onChange: function (event, feeds) {
        this.isRequesting = true;
        this.setState({
            feeds: feeds
        });
    }
});