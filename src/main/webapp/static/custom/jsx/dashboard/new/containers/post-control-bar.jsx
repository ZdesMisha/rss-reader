import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Overlay} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';
import * as PostActions from '../actions/post-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class PostControlBar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showDescTooltip: false,
            showAscTooltip: false
        }

    }

    toggleDescTooltip() {
        this.setState({showDescTooltip: true});
    }

    hideDescTooltip() {
        this.setState({showDescTooltip: false});
    }

    toggleAscTooltip() {
        this.setState({showAscTooltip: true});
    }

    hideAscTooltip() {
        this.setState({showAscTooltip: false});
    }

    onSortDesc() {
        this.props.postActions.sort('desc');
    }

    onSortAsc () {
        this.props.postActions.sort('asc');
    }

    render() {

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
            <button ref="DescSortBtn" onClick={this.onSortDesc.bind(this)} onMouseEnter={this.toggleDescTooltip.bind(this)}
                    onMouseOut={this.hideDescTooltip.bind(this)}
                    className="btn btn-xs btn-primary glyphicon glyphicon-arrow-up refresh-btn"/>
            <button ref="AscSortBtn" onClick={this.onSortAsc.bind(this)} onMouseEnter={this.toggleAscTooltip.bind(this)}
                    onMouseOut={this.hideAscTooltip.bind(this)}
                    className="btn btn-xs btn-primary glyphicon glyphicon-arrow-down "/>
            <Overlay {...onSortDescProps} placement="top">
                <Tooltip id="desc-right">Show newest</Tooltip>
            </Overlay>
            <Overlay {...onSortAscProps} placement="top">
                <Tooltip id="asc-right">Show oldest</Tooltip>
            </Overlay>
        </div>);
    }
}


function matchDispatchToProps(dispatch) {
    return {
        postActions: bindActionCreators(PostActions, dispatch)
    }
}

export default connect(null, matchDispatchToProps)(PostControlBar);