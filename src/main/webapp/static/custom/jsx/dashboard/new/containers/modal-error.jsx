import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import * as ErrorActions from '../actions/error-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class ModalError extends Component {
    close() {
        console.log('close');
    }

    render() {
        return (<Modal show={this.props.dashboardError.show} onHide={this.props.errorActions.hideError}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{this.props.dashboardError.message}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn  btn-danger" onClick={this.props.errorActions.hideError}>Back</button>
            </Modal.Footer>
        </Modal>)
    }
}

function mapStateToProps(state) {
    return {
        dashboardError: state.dashboardError
    };
}

function matchDispatchToProps(dispatch) {
    return {
        errorActions: bindActionCreators(ErrorActions, dispatch)
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ModalError);
