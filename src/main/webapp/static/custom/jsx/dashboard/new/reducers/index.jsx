import {combineReducers} from 'redux';
import AppStateReducer from './reducer-app-state';
import LoginErrorReducer from './reducer-login-error';
import FeedListReducer from './reducer-feed-list';
import ViewedPostReducer from './reducer-viewed-post';
import PostListReducer from './reducer-post-list';
import MainErrorReducer from './reducer-main-error';
import RegistrationErrorReducer from './reducer-registration-error';
import ViewedFeedReducer from './reducer-viewed-feed';
import RssAddErrorReducer from './reducer-add-rss-error';


const AllReducers = combineReducers({
    status: AppStateReducer,
    feedList: FeedListReducer,
    postList: PostListReducer,
    viewedPost: ViewedPostReducer,
    viewedFeed: ViewedFeedReducer,
    mainError: MainErrorReducer,
    addRssError: RssAddErrorReducer,
    loginError: LoginErrorReducer,
    registrationError: RegistrationErrorReducer
});

export default AllReducers