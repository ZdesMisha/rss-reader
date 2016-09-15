import React, {Component} from 'react';
import * as postActions from '../actions/post-actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Search extends Component {


    handleChange(event) {
        if (this.props.feedId!=null) {
            this.props.postActions.search(event.target.value);
        }
    }

    render() {
        return (
            <div>
                <form id="form-search" className="navbar-form navbar-right">
                    <input type="text"
                           placeholder="Search for posts..."
                           onChange={this.handleChange.bind(this)} className="form-control"/>
                </form>

            </div>

        );
    }
}
function matchStateToProps(state){
    return {
        feedId: state.viewedFeed.feed.id
    }
}

function matchDispatchToProps(dispatch) {
    return {
        postActions: bindActionCreators(postActions, dispatch)
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Search);