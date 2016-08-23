import React from 'react';
import PostStore from './store/postStore';
import PostList from './postList';

module.exports = React.createClass({

    getInitialState: function () {
        return {value: ''};
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
        if (event.target.value == "") {
            PostStore.refreshPosts();
        } else {
            PostList.findPosts(event.target.value);
        }
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