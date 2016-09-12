import React, {Component} from 'react';
import {connect} from 'react-redux';
import jQuery from 'jquery';


class LoginError extends Component{

    hideAlert() {
        jQuery('#login-alert').hide();
    }

    showAlert() {
        jQuery('#login-alert').show();
        jQuery('#login-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#login-alert").slideUp(500);
        });
    }


    render(){
        console.log('ERROR BAR RENDER');
        if (!jQuery.isEmptyObject(this.props.error)) {
            return <div className="alert alert-danger" id="login-alert">
                <a href="#" className="close" data-dismiss="alert" aria-label="close"
                   onClick={this.hideAlert}>&times;</a>
                <span className="sr-only">Error:</span>
                {this.props.error.message}
            </div>
        } else {
            return <div></div>
        }
    }

}

function mapStateToProps(state) {
    return {
        error: state.error
    };
}

export default connect(mapStateToProps)(LoginError);


