import React,{Component} from 'react';
import Feed from './feed'
import FeedControlBar from './feed-control-bar'
import jQuery from 'jquery';
import * as FeedActions from '../actions/feed-actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



class FeedList extends Component{



    componentDidMount() {
        console.log('get next page');
        console.log('props',this.props);
        this.props.feedActions.getPage(this.props.feedList.page);
    }
    
    componentWillReceiveProps(newProps){
        this.isRequesting=newProps.feedList.isRequesting;
    }

    getNextPage() {
        var scrollHeight = document.getElementById("all-feeds").scrollHeight;
        var scrollBottom = jQuery('#all-feeds').scrollTop();
        var windowHeight = jQuery('#all-feeds').innerHeight();

        if (scrollBottom + windowHeight >= scrollHeight) {
            if (this.isRequesting || (this.props.feedList.page > 0 && this.props.feedList.page >= this.props.feedList.totalPages)) {
                return;
            }
            this.isRequesting = true;
            this.props.feedActions.getPage(this.props.feedList.page+1);
            console.log('get next page');
        }
    }

    render() {
        var feedlist;
        if (this.props.feedList.feeds.length > 0) {
            feedlist = this.props.feedList.feeds.map((feed, index) => {
                return <Feed key={index} id={feed.id} title={feed.title}/>
            });
        } else {
            feedlist = <p className="empty-list">No feeds. Click plus to add new feed</p>
        }

        return (
            <div className="col-md-3 sidebar" id="all-feeds" onScroll={this.getNextPage}>
                <FeedControlBar/>
                {feedlist}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        feedList: state.feedList
    };
}

function matchDispatchToProps(dispatch) {
    return {
        feedActions: bindActionCreators(FeedActions, dispatch)
    }
}

export default connect(mapStateToProps,matchDispatchToProps)(FeedList);