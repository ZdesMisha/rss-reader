import React from 'react';
import jQuery from 'jquery';
import UserStore from './store/user-store';
var PostActions = require('./action/post-actions');


module.exports = React.createClass({

    getInitialState: function () {
        return {value: ''};
    },

    handleChange: function (event) {
        this.setState({value: event.target.value});
        PostActions.setSearchPattern(event.target.value);
        PostActions.getNextPage().then(function (status) {
            switch (status) {
                case 200:
                    break;
                case 401:
                    UserStore.changeStatus('login');
                    break;
                default:
                    this.showAlert();
                    break;
            }
        }.bind(this));
    },

    hideAlert: function () {
        jQuery('#search-alert').hide();
    },

    showAlert: function () {
        jQuery('#search-alert').show();
        jQuery('#search-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#search-alert").slideUp(500);
        });
    },
    render: function () {
        return (
            <div>
                <form id="form-search" className="navbar-form navbar-right">
                    <span>
                    <input type="text"
                           placeholder="Search for posts..."
                           onChange={this.handleChange} className="form-control"/>
                    <div className="alert alert-danger dashboard-alert" id="search-alert" hidden="hidden">
                        <a href="#" className="close alert-close-btn" data-dismiss="alert" aria-label="close"
                           onClick={this.hideAlert}>&times;</a>
                        <span className="sr-only">Error:</span>
                        Server error occurred
                    </div>
                        </span>
                </form>

            </div>

        );
    }
});