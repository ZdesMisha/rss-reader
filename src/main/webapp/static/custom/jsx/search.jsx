import React from 'react';
import PostStore from './store/postStore';
var Actions = require('./action/actions');


module.exports = React.createClass({

    getInitialState: function () {
        return {value: ''};
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
        console.log("pattern before  ",event.target.value);
        PostStore.cleanStorage();
        PostStore.setPattern(event.target.value);
        PostStore.getNextPage(0)
    },

    render: function () {
        return (
            <div>
                <form id="form-search" className="navbar-form navbar-right">
                    <input type="text"
                           placeholder="Global search"
                           onChange={this.handleChange} className="form-control"/>
                </form>
            </div>

        );
    }
});