import React from 'react';
import jQuery from 'jquery';
import UserStore from '../store/userStore';


module.exports = React.createClass({


    login: function () {
        var form = jQuery('#form-login');
        var arr = form.serializeArray();
        var json = {};
        jQuery.map(arr, function (n, i) {
            json[n['name']] = n['value'];
        });
        console.log(json);
        UserStore.login(json);
    },

    switchToRegistration: function() {
      UserStore.switchToRegistration();
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
            <button onClick={this.switchToRegistration} className="btn btn-lg btn-primary btn-block form-signin" >Registration</button>

        </div>
    }

});