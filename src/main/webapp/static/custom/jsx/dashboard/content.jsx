/**
 * Created by misha on 07.06.16.
 */
import React from 'react';
import Dashboard from './dashboard';
import LoginForm from './user/login-form';
import RegistrationForm from './user/registration-form';
import UserStore from './store/user-store';
import UserActions from './action/user-actions';
import Reflux from 'reflux';

module.exports = React.createClass({

    mixins: [
        Reflux.listenTo(UserStore, 'onChange')
    ],
    
    getInitialState: function() {
      return {
          state:'login'
      }
    },
    
    componentDidMount: function() {
      UserActions.statusRequest();
    },
    
    renderLoginForm: function() {
        return <LoginForm/>
    },
    
    renderRegistrationForm: function() {
      return <RegistrationForm/>
    },
    
    renderDashboard: function () {
        return <Dashboard/>
    },

    render: function () {
        switch (this.state.state) {
            case 'dashboard':
                return this.renderDashboard();
                break;
            case 'login':
                return this.renderLoginForm();
                break;
            case 'registration':
                return this.renderRegistrationForm();
                break;
        }
    },

    onChange: function (event, status) {
        this.setState({
            state: status
        });
    }

});