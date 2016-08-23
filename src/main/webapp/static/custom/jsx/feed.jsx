import React from 'react';
import ReactDOM from 'react-dom'
import FeedStore from './store/feedStore';
import {Overlay} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';


module.exports = React.createClass({

    getInitialState() {
        return {
            showTooltip: false,
        };
    },

    toggle() {
        this.setState({showTooltip: true});
    },

    hide() {
        this.setState({showTooltip: false});
    },

    onLinkClick: function () {
        console.log("Clicked Link", this.props.id);
        FeedStore.setViewedFeed({
            id: this.props.id,
            title: this.props.title
        });
    },

    onDeleteClick: function () {
        console.log("Clicked delete btn", this.props.id);
        FeedStore.deleteFeed(this.props.id);
    },

    render: function () {
        const onDeleteProps = {
            show: this.state.showTooltip,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.deleteBtn)
        };
        return (<div className="feed-item" >
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