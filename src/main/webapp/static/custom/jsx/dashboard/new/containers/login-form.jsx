import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import loginActions from '../actions/login-actions'
//import loginErrorActions from '../actions/login-error-actions'
import * as loginActions from '../actions/login-actions'
import * as loginErrorActions from '../actions/login-error-actions'
import ErrorBar from './login-error-bar'
import jQuery from 'jquery';


class LoginForm extends Component {


    // login(event) {
    //     event.preventDefault();
    //     var form = jQuery('#form-login');
    //     var arr = form.serializeArray();
    //     var json = {};
    //     jQuery.map(arr, function (n, i) {
    //         json[n['name']] = n['value'];
    //     });
    //
    // }

    render() {

        return <div className="container form-body">

            <form id="form-login" className="form-signin form-login">
                <h2 className="form-signin-heading">Log in</h2>
                <label className="sr-only">Email address</label>
                <input type="email" id="login-email" className="form-control" placeholder="Email" name="email"/>
                <label className="sr-only">Password</label>
                <input type="password" id="login-pass" className="form-control" placeholder="Password" name="password"/>

                <button onClick={(event) =>{
                    event.preventDefault();
                    var form = jQuery('#form-login');
                    var arr = form.serializeArray();
                    var json = {};
                    jQuery.map(arr, function (n, i) {
                       json[n['name']] = n['value'];
                     });
                     console.log('PREPARED JSON',json);
                    this.props.loginErrorActions.login(json);}} className="btn btn-lg btn-primary btn-block form-signin">Log
                    in
                </button>

                <button onClick={(event) =>{
                    event.preventDefault();
                    this.props.loginActions.changeStatus('registration');}}
                        className="btn btn-lg btn-primary btn-block form-signin">
                    Registration
                </button>
                <ErrorBar />
            </form>
        </div>
    }

}


function matchDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        loginErrorActions: bindActionCreators(loginErrorActions, dispatch)
    }
}

export default connect(null, matchDispatchToProps)(LoginForm);

