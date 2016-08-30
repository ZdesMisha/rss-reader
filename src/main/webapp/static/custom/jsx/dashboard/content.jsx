/**
 * Created by misha on 07.06.16.
 */
import React from 'react';
import Dashboard from './dashboard';
import LoginForm from './user/loginForm';
import RegistrationForm from './user/registrationForm';
import UserStore from './store/userStore';
var Reflux = require('reflux');


module.exports = React.createClass({

    mixins: [
        Reflux.listenTo(UserStore, 'onChange')
    ],
    
    getInitialState: function() {
      return {
          state:'login'
      }  
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
            case 'logged':
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