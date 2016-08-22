import React from 'react';
import ReactDOM from 'react-dom';
import {Overlay} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';
import PostStore from './store/postStore';



module.exports = React.createClass({

    getInitialState() {
        return {
            showDescTooltip: false,
            showAscTooltip:false
        };
    },

    toggleDescTooltip() {
        this.setState({ showDescTooltip: true });
    },

    hideDescTooltip() {
        this.setState({ showDescTooltip: false });
    },

    toggleAscTooltip() {
        this.setState({ showAscTooltip: true });
    },

    hideAscTooltip() {
        this.setState({ showAscTooltip: false });
    },

    onSortDesc() {
        PostStore.sortByDate('pubDate','desc');
    },

    onSortAsc: function () {
        PostStore.sortByDate('pubDate','asc');
    },

    render: function () {

        const onSortDescProps = {
            show: this.state.showDescTooltip,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.DescSortBtn)
        };
        const onSortAscProps = {
            show: this.state.showAscTooltip,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.AscSortBtn)
        };

        return (<div className="control-panel">
            <button  ref="DescSortBtn" onMouseEnter={this.toggleDescTooltip} onMouseOut={this.hideDescTooltip} className="btn btn-xs btn-primary glyphicon glyphicon-arrow-up refresh-btn"/>
            <button  ref="AscSortBtn" onMouseEnter={this.toggleAscTooltip} onMouseOut={this.hideAscTooltip} className="btn btn-xs btn-primary glyphicon glyphicon-arrow-down "/>
            <Overlay {...onSortDescProps} placement="top">
                <Tooltip id="desc-right">Show newest</Tooltip>
            </Overlay>
            <Overlay {...onSortAscProps} placement="top">
                <Tooltip id="asc-right">Show oldest</Tooltip>
            </Overlay>
        </div>);
    }
});