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

    onLinkClick: function () {
        FeedActions.changeViewedFeed({
            id: this.props.id,
            title: this.props.title
        });
        PostStore.getNextPage();
    },

    onDeleteClick: function () {
        FeedActions.deleteFeed(this.props.id);
        FeedActions.refreshFeedList();
    },

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
        </div>);
    }

});