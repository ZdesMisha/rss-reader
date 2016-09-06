import React from 'react';
import ReactDOM from 'react-dom';
import {Overlay} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';
import PostActions from './action/post-actions';
import UserStore from './store/user-store';


module.exports = React.createClass({

    getInitialState() {
        return {
            showDescTooltip: false,
            showAscTooltip: false
        };
    },

    toggleDescTooltip() {
        this.setState({showDescTooltip: true});
    },

    hideDescTooltip() {
        this.setState({showDescTooltip: false});
    },

    toggleAscTooltip() {
        this.setState({showAscTooltip: true});
    },

    hideAscTooltip() {
        this.setState({showAscTooltip: false});
    },

    onSortDesc() {
        PostActions.setSortDirection('desc');
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
    },

    onSortAsc: function () {
        PostActions.setSortDirection('asc');
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
    },

    hideAlert: function () {
        jQuery('#post-control-bar-alert').hide();
    },

    showAlert: function () {
        jQuery('#post-control-bar-alert').show();
        jQuery('#post-control-bar-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#post-control-bar-alert").slideUp(500);
        });
    },

    render: function () {

        const onSortDescProps = {
            show: this.state.showDescTooltip,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.DescSortBtn)
        };
        const onSortAscProps = {
            show: this.state.showAscTooltip,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.AscSortBtn)
        };

        return (<div className="control-panel">
            <button ref="DescSortBtn" onClick={this.onSortDesc} onMouseEnter={this.toggleDescTooltip}
                    onMouseOut={this.hideDescTooltip}
                    className="btn btn-xs btn-primary glyphicon glyphicon-arrow-up refresh-btn"/>
            <button ref="AscSortBtn" onClick={this.onSortAsc} onMouseEnter={this.toggleAscTooltip}
                    onMouseOut={this.hideAscTooltip}
                    className="btn btn-xs btn-primary glyphicon glyphicon-arrow-down "/>
            <div className="alert alert-danger dashboard-alert" id="post-control-bar-alert" hidden="hidden">
                <a href="#" className="close alert-close-btn" data-dismiss="alert" aria-label="close"
                   onClick={this.hideAlert}>&times;</a>
                <span className="sr-only">Error:</span>
                Server error occurred
            </div>
            <Overlay {...onSortDescProps} placement="top">
                <Tooltip id="desc-right">Show newest</Tooltip>
            </Overlay>
            <Overlay {...onSortAscProps} placement="top">
                <Tooltip id="asc-right">Show oldest</Tooltip>
            </Overlay>
        </div>);
    }
});