import React,{Component} from 'react';
import * as PostActions from '../actions/post-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Post extends Component{

    constructor(props){
        super(props);
        this.state={style: props.isViewed ? {'background-color': '#a7d0f2'} : {'background-color': '#e8ebed'}}
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            style: nextProps.isViewed ? {'background-color': '#a7d0f2'} : {'background-color': '#e8ebed'}
        });
    }

    setViewed () {
        if (!this.props.isViewed) {
            this.setState({style: {'background-color': '#a7d0f2'}});
        }
        this.props.postActions.getPostInfo(this.props.id)
    }

    render() {
        return ( <div className="post-item" style={this.state.style} onClick={this.setViewed.bind(this)}>
            <div className="post-title">{this.props.title}</div>
            <div className="post-feed">{this.props.feedtitle}</div>
            <div className="post-date">{this.props.pubDate}</div>
        </div>);
    }

}


function matchDispatchToProps(dispatch) {
    return {
        postActions: bindActionCreators(PostActions, dispatch)
    }
}

export default connect(null,matchDispatchToProps)(Post);

