/**
 * Created by misha on 09.06.16.
 */
import UserApi from '../rest/userApi';
var Reflux = require('reflux');

module.exports = Reflux.createStore({

    status: '',

    switchToLogin: function() {
        this.status="login";
        this.triggerChange()
    },
    switchToRegistration: function() {
        this.status="registration";
        this.triggerChange();
    },

    login: function (json) {
        return UserApi.login(json).then(function (response) {
            if (response.status == 200) {
                var token = response.headers.get("Authorization");
                localStorage.setItem("token",token);
                console.log('TOKEN ',token);
                this.status = 'logged';
                this.triggerChange()
            }
        }.bind(this));
    },

    register: function (json) {
        return UserApi.register(json).then(function (response) {
            if (response.status == 200) {
                this.status = 'logged';
                this.triggerChange()
            }
        }.bind(this));
    },
    logout: function () {
        return UserApi.logout().then(function (response) {
            if (response.status == 200) {
                this.status = 'logged';
                this.triggerChange()
            }
        }.bind(this));
    },


    triggerChange: function () {
        this.trigger('change', this.status);
    }
});

