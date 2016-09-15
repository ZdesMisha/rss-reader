import React,{Component} from 'react';
import Search from './search-field';


class MenuBar extends  Component{

    logoutClickHandler() {
        console.log('logout Clicked');
    }

    render() {
        return (<nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar"
                            aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">RSS</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><a onClick={this.logoutClickHandler}>Logout</a></li>
                    </ul>
                    <Search />
                </div>
            </div>
        </nav>)
    }
}

export default MenuBar;
