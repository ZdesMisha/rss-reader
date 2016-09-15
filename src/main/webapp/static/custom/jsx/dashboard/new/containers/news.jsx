import React,{Component} from 'react';
import FeedList from './feed-list';
import PostList from './post-list';
import PostInfo from './post-info';
import ModalError from './modal-error';

class News extends Component{


    render () {
        return (<div className="container-fluid dashboard">
                <div className="row main-row">
                    <FeedList/>
                    <PostList/>
                    <PostInfo/>
                    <ModalError/>
                </div>
            </div>
        );
    }

}

export default News;

