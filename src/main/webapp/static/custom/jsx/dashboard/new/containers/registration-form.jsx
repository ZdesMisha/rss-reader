import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeStatus} from '../actions/actions'
import jQuery from 'jquery';


class RegistrationForm extends  Component{

    register(event) {
        event.preventDefault();
        var form = jQuery('#form-registration');
        var arr = form.serializeArray();
        var json = {};
        jQuery.map(arr, function (n, i) {
            json[n['name']] = n['value'];
        });
        UserStore.register(json).then(function () {
            this.showAlert();
        }.bind(this));
    }

    hideAlert() {
        jQuery('#registration-alert').hide();
    }

    showAlert() {
        jQuery('#registration-alert').show();
        jQuery('#registration-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#registration-alert").slideUp(500);
        });
    }

    switchToLogin(event) {
        event.preventDefault();
        this.props.changeStatus('login');
    }

    render () {
        return <div className="container form-body">

            <form id="form-registration" className="form-signin form-register">
                <h2 className="form-signin-heading">Sign in</h2>
                <label htmlFor="reg-email" className="sr-only">Email address</label>
                <input type="email" id="reg-email" className="form-control" placeholder="Email address" name="email"/>
                <label htmlFor="reg-pass" className="sr-only">Password</label>
                <input type="password" id="reg-pass" className="form-control" placeholder="Password" name="password"/>
                <label htmlFor="reg-pass-conf" className="sr-only">Password</label>
                <input type="password" id="reg-pass-conf" className="form-control form-register-confirm"
                       placeholder="Confirm Password" name="confirmedPassword"/>
                <button onClick={this.register} className="btn btn-lg btn-primary btn-block form-signin">Sign in
                </button>
                <button onClick={this.switchToLogin} className="btn btn-lg btn-primary btn-block form-signin">Back to
                    login page
                </button>
                <div className="alert alert-danger" id="registration-alert" hidden="hidden">
                    <a href="#" className="close" data-dismiss="alert" aria-label="close"
                       onClick={this.hideAlert}>&times;</a>
                    <span className="sr-only">Error:</span>
                    Such email is already exists
                </div>
            </form>

        </div>
    }

}


// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeStatus: changeStatus}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(matchDispatchToProps)(RegistrationForm);

