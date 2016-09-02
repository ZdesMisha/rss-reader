import React from 'react';
var PostActions = require('./action/post-actions');


module.exports = React.createClass({

    getInitialState: function () {
        return {value: ''};
    },

    handleChange: function (event) {
        this.setState({value: event.target.value});
        PostActions.setSearchPattern(event.target.value);
        PostActions.getNextPage();
    },

    render: function () {
        return (
            <div>
                <form id="form-search" className="navbar-form navbar-right">
                    <input type="text"
                           placeholder="Search for posts..."
                           onChange={this.handleChange} className="form-control"/>
                </form>
            </div>

        );
    }
});