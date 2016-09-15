import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import jQuery from 'jquery';
import Post from './post';
import * as PostActions from '../actions/post-actions'
import PostControlBar from './post-control-bar';


class PostList extends Component {


    getNextPage() {
        var isRequesting = false;
        var scrollHeight = document.getElementById("all-posts").scrollHeight;
        var scrollBottom = jQuery('#all-posts').scrollTop();
        var windowHeight = jQuery('#all-posts').innerHeight();
        if (scrollBottom + windowHeight >= scrollHeight) {
            if (isRequesting || (this.props.postList.page > 0 && this.props.postList.page >= this.props.postList.totalPages)) {
                return;
            }
            isRequesting = true;
            this.props.postActions.getPage(
                this.props.viewedFeed.id,
                this.props.postList.searchPattern,
                this.props.postList.sortField,
                this.props.postList.sortDir,
                this.props.postList.page+1);
            console.log('get next page');
        }

    }

    render() {
        var postList;
        if (this.props.postList.posts.length > 0) {
            postList = this.props.postList.posts.map((post, i) => {
                return <Post key={i}
                             id={post.id}
                             title={post.title}
                             link={post.link}
                             description={post.description}
                             pubDate={post.pubDate}
                             isViewed={post.viewed}
                             feedtitle={this.props.viewedFeed.title}

                />
            });
        } else {
            postList = <p className="empty-list">No posts</p>
        }

        return (<div className="col-md-3 main" id="all-posts" onScroll={this.getNextPage.bind(this)}>
            <PostControlBar/>
            {postList}
        </div>);
    }

}

function mapStateToProps(state) {
    console.log('STATE IN POST LIST', state);
    return {
        postList: state.postList,
        viewedFeed: state.viewedFeed.feed
    };
}

function matchDispatchToProps(dispatch){
    return {
        postActions:bindActionCreators(PostActions,dispatch)
    }
}

export default connect(mapStateToProps,matchDispatchToProps)(PostList);


