import React from 'react';
import jQuery from 'jquery';
import UserActions from '../action/user-actions';
import UserStore from '../store/user-store';


module.exports = React.createClass({


    login: function (event) {
        event.preventDefault();
        var form = jQuery('#form-login');
        var arr = form.serializeArray();
        var json = {};
        jQuery.map(arr, function (n, i) {
            json[n['name']] = n['value'];
        });
        UserStore.login(json).then(function (status) {
            this.showAlert();
        }.bind(this));
    },

    switchToRegistration: function (event) {
        event.preventDefault();
        UserActions.switchToRegistrationForm();
    },

    hideAlert: function () {
        jQuery('#login-alert').hide();
    },

    showAlert: function () {
        jQuery('#login-alert').show();
        jQuery('#login-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#login-alert").slideUp(500);
        });
    },

    render: function () {
        return <div className="container form-body">

            <form id="form-login" className="form-signin form-login">
                <h2 className="form-signin-heading">Log in</h2>
                <label className="sr-only">Email address</label>
                <input type="email" id="login-email" className="form-control" placeholder="Email address" name="email"/>
                <label className="sr-only">Password</label>
                <input type="password" id="login-pass" className="form-control" placeholder="Password" name="password"/>

                <button onClick={this.login} className="btn btn-lg btn-primary btn-block form-signin">Log in</button>
                <button onClick={this.switchToRegistration} className="btn btn-lg btn-primary btn-block form-signin">
                    Registration
                </button>
                <div className="alert alert-danger" id="login-alert" hidden="hidden">
                    <a href="#" className="close" data-dismiss="alert" aria-label="close"
                       onClick={this.hideAlert}>&times;</a>
                    <span className="sr-only">Error:</span>
                    Wrong email or password
                </div>
            </form>


        </div>
    }

});