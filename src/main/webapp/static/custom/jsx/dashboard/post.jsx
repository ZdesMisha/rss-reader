import React from 'react';
import SinglePostActions from './action/single-post-actions';
import PostActions from './action/post-actions';

module.exports = React.createClass({

    getInitialState: function(){
      return {
          style:this.props.isViewed ? {'background-color': '#a7d0f2'} : {'background-color': '#e8ebed'}
      }
    },


    componentWillReceiveProps: function(nextProps) {
        this.setState({
            style: nextProps.isViewed ? {'background-color': '#a7d0f2'} : {'background-color': '#e8ebed'}
        });
    },

    

    setViewed: function(){
        if(!this.props.isViewed){
            this.setState({style:{'background-color': '#a7d0f2'}})
            PostActions.setViewed(this.props.id)
        }
        PostActions.changeViewedPost(this.props.id);
        SinglePostActions.showPost();
    },

    render: function(){
        return ( <div className="post-item" style={this.state.style} onClick={this.setViewed}>
            <div className="post-title">{this.props.title}</div>
            <div className="post-feed">{this.props.feedtitle}</div>
            <div className="post-date">{this.props.pubDate}</div>
        </div>);
    }

});