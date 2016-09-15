import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Overlay,Tooltip} from 'react-bootstrap';
import * as FeedActions from '../actions/feed-actions';
import * as PostActions from '../actions/post-actions';



class Feed extends Component{

    constructor(props){
        super(props);
        console.log('feed props ',props);
        this.state={showTooltip:false}
    }

    toggle() {
        this.setState({showTooltip: true});
    }

    hide() {
        this.setState({showTooltip: false});
    }

    onLinkClick() {
        this.props.postActions.changeViewedFeed(this.props.id,this.props.title)
    }

    onDeleteClick () {
        this.props.feedActions.deleteFeed(this.props.id,this.props.feedList.page)
    }

    render() {
        const onDeleteProps = {
            show: this.state.showTooltip,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.deleteBtn)
        };
        return (<div className="feed-item">
           <span className="feed-title">
                <a onClick={this.onLinkClick.bind(this)}>{this.props.title}</a>
               <button ref="deleteBtn" onMouseEnter={this.toggle.bind(this)} onMouseOut={this.hide.bind(this)} onClick={this.onDeleteClick.bind(this)}
                       className="btn btn-xs btn-danger glyphicon glyphicon-remove delete-btn"/>
               <Overlay {...onDeleteProps} placement="left">
                <Tooltip id="del-tooltip-left">Delete feed</Tooltip>
            </Overlay>
           </span>
        </div>);
    }

}

function mapStateToProps(state) {
    return {
        feedList: state.feedList
    };
}

function matchDispatchToProps(dispatch) {
    return {
        feedActions: bindActionCreators(FeedActions, dispatch),
        postActions: bindActionCreators(PostActions, dispatch)
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Feed);


