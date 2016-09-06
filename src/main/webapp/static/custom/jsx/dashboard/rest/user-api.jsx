import React from 'react';
import Fetch from 'whatwg-fetch';


const SERVER_HOST = __SERVER_HOST__;
const loginUrl = SERVER_HOST + 'rest/login';
const registerUrl = SERVER_HOST + 'rest/register';
const logoutUrl = SERVER_HOST + 'rest/logout';

module.exports = {

    logout: function (json) {
        return fetch(logoutUrl, {
            credentials: "include",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            return response;
        })
    },

    register: function (json) {
        return fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }).then(function (response) {
            return response;
        })
    },

    login: function (json) {
        return fetch(loginUrl, {
            credentials: "include",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }).then(function (response) {
            console.log("response ",response);
            return response;
        })

    }
};