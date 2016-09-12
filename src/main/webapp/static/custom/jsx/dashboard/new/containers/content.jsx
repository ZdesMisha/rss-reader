import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dashboard from './dashboard';
import LoginForm from './login-form';
import RegistrationForm from './registration-form';

class Content extends Component {

    renderLoginForm() {
        return <LoginForm/>
    }

    renderRegistrationForm() {
        return <RegistrationForm />
    }

    renderDashboard() {
        return <Dashboard/>
    }

    render() {
        console.log('STATUS',this.props.status);
        if (!this.props.status) {
            return this.renderLoginForm();
        } else {
            switch (this.props.status) {
                case'dashboard':
                    return this.renderDashboard();
                    break;
                case'login':
                    return this.renderLoginForm();
                    break;
                case'registration':
                    return this.renderRegistrationForm();
                    break;
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        status: state.status
    };
}

export default connect(mapStateToProps)(Content);
