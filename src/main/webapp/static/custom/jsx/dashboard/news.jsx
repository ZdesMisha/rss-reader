import React from 'react';
import FeedList from './feed-list';
import PostList from './post-list';
import PostInfo from './post-info';
import ControlPanel from './feed-control-bar'


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

