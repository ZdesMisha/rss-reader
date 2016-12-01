import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import jQuery from 'jquery';
import * as ErrorActions from '../actions/error-actions';


class RegistrationError extends Component {

    hideAlert() {
        jQuery('#login-alert').hide();
    }

    showAlert() {
        jQuery('#login-alert').show();
        jQuery('#login-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#login-alert").slideUp(500);
        });
    }


    render() {
        return <div className="alert alert-danger" id="login-alert" hidden={this.props.error.hidden}>
            <a href="#" className="close" data-dismiss="alert" aria-label="close"
               onClick={this.props.errorActions.hideRegistrationError}>&times;</a>
            <span className="sr-only">Error:</span>
            {this.props.error.message}
        </div>
    }

}

function mapStateToProps(state) {
    return {
        error: state.registrationError
    };
}

function matchDispatchToProps(dispatch) {
    return {
        errorActions: bindActionCreators(ErrorActions, dispatch)
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(RegistrationError);



