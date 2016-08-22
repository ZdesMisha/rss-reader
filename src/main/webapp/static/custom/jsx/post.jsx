import React from 'react';
import SinglePostStore from './store/singlePostStore';

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
            SinglePostStore.setViewed(this.props.id)
        }
        SinglePostStore.showPost(this.props.id,
            this.props.title,
            this.props.description,
            this.props.link,
            this.props.pubDate)
    },

    render: function(){
        return ( <div className="post-item" style={this.state.style} onClick={this.setViewed}>
            <div className="post-title">{this.props.title}</div>
            <div className="post-feed">{this.props.feedtitle}</div>
            <div className="post-date">{this.props.pubDate}</div>
        </div>);
    }

});