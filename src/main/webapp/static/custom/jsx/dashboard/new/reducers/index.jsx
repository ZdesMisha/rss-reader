import {combineReducers} from 'redux';
import AppStateReducer from './reducer-app-state';
import LoginErrorReducer from './reducer-login-error';
import FeedListReducer from './reducer-feed-list';
import ViewedPostReducer from './reducer-viewed-post';
import PostListReducer from './reducer-post-list';
import DashboardErrorReducer from './reducer-dashboard-error';
import ViewedFeedReducer from './reducer-viewed-feed';
import rssAddErrorLabel from './reducer-add-rss-error-label';


const AllReducers = combineReducers({
    status: AppStateReducer,
    error: LoginErrorReducer,
    feedList: FeedListReducer,
    postList: PostListReducer,
    viewedPost: ViewedPostReducer,
    dashboardError: DashboardErrorReducer,
    viewedFeed: ViewedFeedReducer,
    rssLabelError: rssAddErrorLabel

});

export default AllReducers