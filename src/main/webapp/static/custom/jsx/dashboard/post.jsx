import React from 'react';
import jQuery from 'jquery';
import SinglePostActions from './action/single-post-actions';
import PostActions from './action/post-actions';
import UserStore from './store/user-store';

module.exports = React.createClass({

    getInitialState: function () {
        return {
            style: this.props.isViewed ? {'background-color': '#a7d0f2'} : {'background-color': '#e8ebed'}
        }
    },


    componentWillReceiveProps: function (nextProps) {
        this.setState({
            style: nextProps.isViewed ? {'background-color': '#a7d0f2'} : {'background-color': '#e8ebed'}
        });
    },

    hideAlert: function () {
        jQuery('#post-alert').hide();
    },

    showAlert: function () {
        jQuery('#post-alert').show();
        jQuery('#post-alert').fadeTo(2000, 500).slideUp(500, function () {
            $("#post-alert").slideUp(500);
        });
    },


    setViewed: function () {
        if (!this.props.isViewed) {
            this.setState({style: {'background-color': '#a7d0f2'}});
            PostActions.setViewed(this.props.id).then(function (status) {
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
        }
        PostActions.changeViewedPost(this.props.id);
        SinglePostActions.showPost().then(function (status) {
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

    render: function () {
        return ( <div className="post-item" style={this.state.style} onClick={this.setViewed}>
            <div className="post-title">{this.props.title}</div>
            <div className="post-feed">{this.props.feedtitle}</div>
            <div className="post-date">{this.props.pubDate}</div>
            <div className="alert alert-danger dashboard-alert" id="post-alert" hidden="hidden">
                <a href="#" className="close alert-close-btn" data-dismiss="alert" aria-label="close"
                   onClick={this.hideAlert}>&times;</a>
                <span className="sr-only">Error:</span>
                Server error occurred
            </div>
        </div>);
    }

});