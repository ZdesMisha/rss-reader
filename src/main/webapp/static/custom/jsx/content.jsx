/**
 * Created by misha on 07.06.16.
 */
import React from 'react';
import MenuBar from './menu-bar';
import News from './news';

module.exports = React.createClass({
    render: function(){
        return <div className="main-container">
            <MenuBar></MenuBar>
            <News></News>
        </div>
    }
    
});