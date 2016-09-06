import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import {Modal} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Overlay} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';
import FeedActions from './action/feed-actions';
import PostActions from './action/post-actions';
import UserStore from './store/user-store';


module.exports = React.createClass({

    getInitialState() {
        return {
            showModal: false,
            value: '',
            showAddBtnTooltip: false,
            showRefreshBtnTooltip: false
        };
    },

    toggleAddBtnTooltip() {
        this.setState({showAddBtnTooltip: true});
    },

    hideAddBtnTooltip() {
        this.setState({showAddBtnTooltip: false});
    },

    toggleRefreshBtnTooltip() {
        this.setState({showRefreshBtnTooltip: true});
    },

    hideRefreshBtnTooltip() {
        this.setState({showRefreshBtnTooltip: false});
    },

    onClose() {
        this.setState({showModal: false});
    },

    onOpenBtnClick() {
        this.setState({showModal: true});
    },

    getValidationState() {
        const value = this.state.value.length;
        if (value >= 10) return 'success';
        else if (value < 10) return 'error';
    },

    handleChange(e) {
        this.setState({value: e.target.value});
    },

    onAddBtnClick: function () {
        var feed = {};
        feed['link'] = this.state.value;
        FeedActions.addFeed(feed).then(function (status) {
            switch (status) {
                case 200:
                    FeedActions.refreshFeedList().then(function (status) {
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

    onRefreshBtnClick: function () {
        FeedActions.refreshFeeds().then(function (status) {
            if (status != 200) {
                this.showAlert();
            } else {
                PostActions.cleanPostList();
                PostActions.getNextPage().then(function (status) {
                    if (status != 200) {
                        this.showAlert();
                    }
                }.bind(this));
            }
        }.bind(this));
    },

    hideAlert: function () {
        jQuery('#feed-control-bar-alert').hide();
    },

    showAlert: function () {
        jQuery('#feed-control-bar-alert').show();
        jQuery('#feed-control-bar-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#feed-control-bar-alert").slideUp(500);
        });
    },

    render: function () {

        const addBtnProps = {
            show: this.state.showAddBtnTooltip,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.addBtn)
        };
        const refreshBtnProps = {
            show: this.state.showRefreshBtnTooltip,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.refreshBtn)
        };


        return (<div className="control-panel">
            <span>
            <button ref="addBtn" onMouseEnter={this.toggleAddBtnTooltip} onMouseOut={this.hideAddBtnTooltip}
                    onClick={this.onOpenBtnClick}
                    className="btn btn-xs btn-success glyphicon glyphicon-plus refresh-btn"/>
            <button ref="refreshBtn" onMouseEnter={this.toggleRefreshBtnTooltip} onMouseOut={this.hideRefreshBtnTooltip}
                    onClick={this.onRefreshBtnClick} className="btn btn-xs btn-primary glyphicon glyphicon-repeat"/>
            <div className="alert alert-danger dashboard-alert" id="feed-control-bar-alert" hidden="hidden">
                <a href="#" className="close alert-close-btn" data-dismiss="alert" aria-label="close"
                   onClick={this.hideAlert}>&times;</a>
                <span className="sr-only">Error:</span>
                Server error occurred
            </div>
                </span>
            <Overlay {...addBtnProps} placement="top">
                <Tooltip id="add-right">Add feed</Tooltip>
            </Overlay>
            <Overlay {...refreshBtnProps} placement="top">
                <Tooltip id="refresh-right">Refresh feeds</Tooltip>
            </Overlay>
            <Modal show={this.state.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Rss feed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.getValidationState()}>
                            <ControlLabel>Please add your rss feed link</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Enter text"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <div className="alert alert-danger dashboard-alert" id="feed-control-bar-alert">
                            <a href="#" className="close alert-close-btn" data-dismiss="alert" aria-label="close"
                               onClick={this.hideAlert}>&times;</a>
                            <span className="sr-only">Error:</span>
                            ERROR OCCURRED
                        </div>
                        <Button onClick={this.onAddBtnClick}>
                            Submit
                        </Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>);
    }
});