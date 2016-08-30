import React from 'react';
import ReactDOM from 'react-dom';
import FeedStore from './store/feedStore';
import {Modal} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Overlay} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';


module.exports = React.createClass({

    getInitialState() {
        return {
            showModal: false,
            value: '',
            showAddBtnTooltip: false,
            showRefreshBtnTooltip:false
        };
    },

    toggleAddBtnTooltip() {
        this.setState({ showAddBtnTooltip: true });
    },

    hideAddBtnTooltip() {
        this.setState({ showAddBtnTooltip: false });
    },

    toggleRefreshBtnTooltip() {
        this.setState({ showRefreshBtnTooltip: true });
    },

    hideRefreshBtnTooltip() {
        this.setState({ showRefreshBtnTooltip: false });
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

    onSubmitBtnClick: function () {
        var feed = {};
        feed['link'] = this.state.value;
        FeedStore.addFeed(feed)
    },

    onRefreshBtnClick: function () {
        FeedStore.refreshFeeds();
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
            <button ref="addBtn" onMouseEnter={this.toggleAddBtnTooltip} onMouseOut={this.hideAddBtnTooltip} onClick={this.onOpenBtnClick} className="btn btn-xs btn-success glyphicon glyphicon-plus refresh-btn"/>
            <button ref="refreshBtn" onMouseEnter={this.toggleRefreshBtnTooltip} onMouseOut={this.hideRefreshBtnTooltip} onClick={this.onRefreshBtnClick} className="btn btn-xs btn-primary glyphicon glyphicon-repeat"/>
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
                        <Button onClick={this.onSubmitBtnClick}>
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