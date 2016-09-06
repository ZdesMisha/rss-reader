/**
 * Created by misha on 09.06.16.
 */
import UserApi from '../rest/user-api';
var Reflux = require('reflux');

module.exports = Reflux.createStore({


    token: '',
    status: '',
    responseStatus: '',


    init: function () {
        this.token = localStorage.getItem('token');
        if (this.token == null) {
            this.status = 'login'; //TODO temporary
        } else {
            this.status = 'dashboard';
        }
    },

    switchToLogin: function () {
        this.status = 'login';
        this.triggerChange()
    },

    switchToRegistration: function () {
        this.status = "registration";
        this.triggerChange();
    },


    login: function (json) {
        return UserApi.login(json).then(function (response) {
            this.responseStatus = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            switch (this.responseStatus) {
                case 200:
                    var token = jsonBody.token;
                    this.status = 'dashboard';
                    localStorage.setItem('token', token);
                    this.triggerChange();
                    return this.responseStatus;
                default:
                    return this.responseStatus;
            }
        }.bind(this));
    },


    register: function (json) {
        return UserApi.register(json).then(function (response) {
            this.responseStatus = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            switch (this.responseStatus) {
                case 200:
                    var token = jsonBody.token;
                    this.status = 'dashboard';
                    localStorage.setItem('token', token);
                    this.triggerChange();
                    return this.responseStatus;
                default:
                    return this.responseStatus;
            }
        }.bind(this));
    },


    logout: function () {
        return UserApi.logout().then(function (response) {
            this.responseStatus = response.status;
            return response.json();
        }.bind(this)).then(function (jsonBody) {
            switch (this.responseStatus) {
                case 200:
                    this.status = 'login';
                    localStorage.setItem('token', '');
                    this.triggerChange();
                    return this.responseStatus;
                default:
                    return this.responseStatus;
            }
        }.bind(this));
    },

    statusRequest: function () {
        this.triggerChange()
    },

    changeStatus: function (status) {
        this.status = status;
        this.triggerChange();
    },
    
    triggerChange: function () {
        this.trigger('change', this.status);
    }
})
;

