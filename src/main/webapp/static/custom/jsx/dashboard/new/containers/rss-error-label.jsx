import React, {Component} from 'react';
import jQuery from 'jquery';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ErrorActions from '../actions/error-actions';

class RssErrorLabel extends Component {




    showAlert(message) {
        jQuery('#feed-control-bar-alert').text(message);
        jQuery('#feed-control-bar-alert').show();
        jQuery('#feed-control-bar-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#feed-control-bar-alert").slideUp(500);
        });
    }

    render() {
        return ( <div className="alert alert-danger dashboard-alert" id="feed-control-bar-alert" hidden={this.props.error.hidden}>
            <a href="#" className="close alert-close-btn" data-dismiss="alert" aria-label="close"
               onClick={this.props.errorActions.hideAddRssError}>&times;</a>
            <span className="sr-only">Error:</span>
            {this.props.error.text}
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        error: state.rssLabelError
    };
}

function matchDispatchToProps(dispatch) {
    return {
        errorActions: bindActionCreators(ErrorActions, dispatch)
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(RssErrorLabel);