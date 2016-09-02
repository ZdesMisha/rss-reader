import React from 'react';
import jQuery from 'jquery';
import UserStore from '../store/user-store';
import {Alert} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


module.exports = React.createClass({


    login: function () {
        var form = jQuery('#form-login');
        var arr = form.serializeArray();
        var json = {};
        jQuery.map(arr, function (n, i) {
            json[n['name']] = n['value'];
        });
        console.log(json);
        UserStore.login(json).then(function (result) {
            console.log('errorrrrrrr');
            jQuery('#alert').show();
        }.bind(this));
    },

    switchToRegistration: function () {
        UserStore.switchToRegistration();
    },

    hideAlert: function () {
        jQuery('#alert').hide();
    },

    render: function () {
        return <div className="container form-body">

            <form id="form-login" className="form-signin form-login">
                <h2 className="form-signin-heading">Log in</h2>
                <label className="sr-only">Email address</label>
                <input type="email" id="login-email" className="form-control" placeholder="Email address" name="email"/>
                <label className="sr-only">Password</label>
                <input type="password" id="login-pass" className="form-control" placeholder="Password" name="password"/>
            </form>
            <button onClick={this.login} className="btn btn-lg btn-primary btn-block form-signin">Log in</button>
            <button onClick={this.switchToRegistration} className="btn btn-lg btn-primary btn-block form-signin">
                Registration
            </button>
            <div className="alert alert-danger" id="alert" hidden="hidden">
                <a href="#" className="close" data-dismiss="alert" aria-label="close" onClick={this.hideAlert}>&times;</a>
                <span className="sr-only">Error:</span>
                ERROR OCCURRED
            </div>

        </div>
    }

});