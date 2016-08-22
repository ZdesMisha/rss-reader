import React from 'react';
import FeedList from './feedList';
import PostList from './postList';
import PostInfo from './postInfo';


module.exports = React.createClass({


    render: function () {
        return (<div className="container-fluid dashboard">
                    <div className="row main-row">
                        <FeedList/>
                        <PostList/>
                        <PostInfo/>
                    </div>
                </div>
        );
    }

});

