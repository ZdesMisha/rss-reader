import {Overlay} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom'
import FeedActions from './action/feed-actions';
import PostActions from './action/post-actions';
import PostStore from './store/post-store';
import UserStore from './store/user-store';
import jQuery from 'jquery';


module.exports = React.createClass({

    getInitialState() {
        return {
            showTooltip: false
        };
    },

    toggle() {
        this.setState({showTooltip: true});
    },

    hide() {
        this.setState({showTooltip: false});
    },

    hideAlert: function () {
        jQuery('#feed-alert').hide();
    },

    showAlert: function () {
        jQuery('#feed-alert').show();
        jQuery('#feed-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#feed-alert").slideUp(500);
        });
    },

    onLinkClick: function () {
        FeedActions.changeViewedFeed({
            id: this.props.id,
            title: this.props.title
        });
        PostStore.getNextPage().then(function (status) {
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

    onDeleteClick: function () {
        FeedActions.deleteFeed(this.props.id).then(function (status) {
            switch (status) {
                case 200:
                    FeedActions.refreshFeedList().then(function (status) {
                        switch (status) {
                            case 200:
                                PostActions.cleanPostList();
                                break;
                            case 401:
                                UserStore.changeStatus('login');
                                break;
                            default:
                                this.showAlert();
                                break;
                        }
                    }.bind(this));
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
    ,

    render: function () {
        const onDeleteProps = {
            show: this.state.showTooltip,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.deleteBtn)
        };
        return (<div className="feed-item">
           <span className="feed-title">
                <a onClick={this.onLinkClick}>{this.props.title}</a>
               <button ref="deleteBtn" onMouseEnter={this.toggle} onMouseOut={this.hide} onClick={this.onDeleteClick}
                       className="btn btn-xs btn-danger glyphicon glyphicon-remove delete-btn"/>
               <Overlay {...onDeleteProps} placement="left">
                <Tooltip id="del-tooltip-left">Delete feed</Tooltip>
            </Overlay>
           </span>
            <div className="alert alert-danger dashboard-alert" id="feed-alert" hidden="hidden">
                <a href="#" className="close alert-close-btn" data-dismiss="alert" aria-label="close"
                   onClick={this.hideAlert}>&times;</a>
                <span className="sr-only">Error:</span>
                Server error occurred
            </div>
        </div>);
    }

})
;