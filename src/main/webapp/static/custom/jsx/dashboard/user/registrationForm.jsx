import React from 'react';
import UserStore from '../store/userStore';


module.exports = React.createClass({

    register: function () {
        var form = jQuery('#form-registration');
        var arr = form.serializeArray();
        var json = {};
        jQuery.map(arr, function (n, i) {
            json[n['name']] = n['value'];
        });
        UserStore.register(json);
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

        </div>
    }

});