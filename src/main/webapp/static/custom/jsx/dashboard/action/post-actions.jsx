import Reflux from 'reflux';

module.exports = Reflux.createActions([
    'changeViewedPost',
    'refreshPostList',
    'cleanPostList',
    'cleanPostStore',
    'getNextPage',
    'setViewed',
    'setSortDirection',
    'setSearchPattern'
]);