import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeStatus} from '../actions/actions'
import jQuery from 'jquery';


class LoginForm extends Component{


    login(event) {
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
    }

    switchToRegistration(event) {
        event.preventDefault();
        changeStatus('registration');
    }

    hideAlert() {
        jQuery('#login-alert').hide();
    }

    showAlert () {
        jQuery('#login-alert').show();
        jQuery('#login-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#login-alert").slideUp(500);
        });
    }

    render () {
        return <div className="container form-body">

            <form id="form-login" className="form-signin form-login">
                <h2 className="form-signin-heading">Log in</h2>
                <label className="sr-only">Email address</label>
                <input type="email" id="login-email" className="form-control" placeholder={this.props.template.email} name="email"/>
                <label className="sr-only">Password</label>
                <input type="password" id="login-pass" className="form-control" placeholder={this.props.template.password} name="password"/>

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

}


function mapStateToProps(state) {
    return {
        template: state.template
    };
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeStatus: changeStatus}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps,matchDispatchToProps)(LoginForm);

