import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import {Modal} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Overlay} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';
import * as FeedActions from '../actions/feed-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class FeedControlBar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showModal: false,
            showAddBtnTooltip: false,
            showRefreshBtnTooltip: false
        }

    }

    toggleAddBtnTooltip() {
        this.setState({showAddBtnTooltip: true});
    }

    hideAddBtnTooltip() {
        this.setState({showAddBtnTooltip: false});
    }

    toggleRefreshBtnTooltip() {
        this.setState({showRefreshBtnTooltip: true});
    }

    hideRefreshBtnTooltip() {
        this.setState({showRefreshBtnTooltip: false});
    }

    onClose() {
        this.setState({showModal: false});
    }

    onOpenBtnClick() {
        this.setState({showModal: true});
    }

    getValidationState() {
        const value = this.state.value.length;
        if (value >= 10) return 'success';
        else if (value < 10) return 'error';
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    onAddBtnClick() {
        var feed = {};
        feed['link'] = this.state.value;
        this.props.feedActions.addFeed(feed,this.props.feedList.page)    }

    onRefreshBtnClick() {
    }

    hideAlert() {
        jQuery('#feed-control-bar-alert').hide();
    }

    showAlert() {
        jQuery('#feed-control-bar-alert').show();
        jQuery('#feed-control-bar-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#feed-control-bar-alert").slideUp(500);
        });
    }

    render() {

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
            <button ref="addBtn" onMouseEnter={this.toggleAddBtnTooltip.bind(this)}
                    onMouseOut={this.hideAddBtnTooltip.bind(this)}
                    onClick={this.onOpenBtnClick.bind(this)}
                    className="btn btn-xs btn-success glyphicon glyphicon-plus refresh-btn"/>
            <button ref="refreshBtn" onMouseEnter={this.toggleRefreshBtnTooltip.bind(this)}
                    onMouseOut={this.hideRefreshBtnTooltip.bind(this)}
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
            <Modal show={this.state.showModal} onHide={this.onClose.bind(this)}>
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
                                onChange={this.handleChange.bind(this)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <div className="alert alert-danger dashboard-alert" id="feed-control-bar-alert">
                            <a href="#" className="close alert-close-btn" data-dismiss="alert" aria-label="close"
                               onClick={this.hideAlert}>&times;</a>
                            <span className="sr-only">Error:</span>
                            Unable to process rss resource
                        </div>
                        <Button onClick={this.onAddBtnClick.bind(this)}>
                            Submit
                        </Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>);
    }
}


function mapStateToProps(state) {
    return {
        feedList: state.feedList
    };
} //TODO remove from here

function matchDispatchToProps(dispatch) {
    return {
        feedActions: bindActionCreators(FeedActions, dispatch)
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(FeedControlBar);