import React,{Component} from 'react';
import {connect} from 'react-redux';
import jQuery from 'jquery';


class SinglePost extends Component{


    render() {

        if (jQuery.isEmptyObject(this.props.viewedPost)) {
            return ( <div className="col-md-6 main-black">
                <p className="empty-list">Click on post to see detailed info</p>
            </div>);
        } else {
            return ( <div className="col-md-6 main-black">
                <h2 className="page-header">{this.props.viewedPost.title}</h2>
                <div className="post-description">{this.props.viewedPost.description}</div>
                <div className="post-link post-info-link"><a href={this.props.viewedPost.link}>Link to full article</a></div>
                <div className="post-date post-info-date">{this.props.viewedPost.pubDate}</div>

            </div>);
        }
    }

}

function mapStateToProps(state) {
    return {
        viewedPost: state.viewedPost.post
    };
}

export default connect(mapStateToProps)(SinglePost);