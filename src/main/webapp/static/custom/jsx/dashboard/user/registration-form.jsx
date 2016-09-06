import React from 'react';
import UserStore from '../store/user-store';
import jQuery from 'jquery';



module.exports = React.createClass({

    register: function () {
        var form = jQuery('#form-registration');
        var arr = form.serializeArray();
        var json = {};
        jQuery.map(arr, function (n, i) {
            json[n['name']] = n['value'];
        });
        UserStore.register(json).then(function () {
            this.showAlert();
        }.bind(this));
    },

    hideAlert: function () {
        jQuery('#registration-alert').hide();
    },

    showAlert: function () {
        jQuery('#registration-alert').show();
        jQuery('#registration-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#registration-alert").slideUp(500);
        });
    },

    switchToLogin: function () {
        UserStore.switchToLogin();
    },

    render: function () {
        return <div className="container form-body">

            <form className="form-signin form-register">
                <h2 className="form-signin-heading">Sign in</h2>
                <label for="reg-email" className="sr-only">Email address</label>
                <input type="email" id="reg-email" className="form-control" placeholder="Email address" name="email"/>
                <label for="reg-pass" className="sr-only">Password</label>
                <input type="password" id="reg-pass" className="form-control" placeholder="Password" name="password"/>
                <label for="reg-pass-conf" className="sr-only">Password</label>
                <input type="password" id="reg-pass-conf" className="form-control form-register-confirm"
                       placeholder="Confirm Password" name="confirmPassword"/>
            </form>
            <button onClick={this.register} className="btn btn-lg btn-primary btn-block form-signin">Sign in</button>
            <button onClick={this.switchToLogin} className="btn btn-lg btn-primary btn-block form-signin" >Back to login page</button>
            <div className="alert alert-danger" id="registration-alert" hidden="hidden">
                <a href="#" className="close" data-dismiss="alert" aria-label="close" onClick={this.hideAlert}>&times;</a>
                <span className="sr-only">Error:</span>
                Server error occurred
            </div>
        </div>
    }

});