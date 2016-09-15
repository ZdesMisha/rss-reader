import React, {Component} from 'react';
import MenuBar from './menu-bar';
import News from './news';

class Dashboard extends Component{
    
    
    
    render(){
        return <div className="main-container">
            <MenuBar></MenuBar>
            <News></News>
        </div>
    }

}

export default Dashboard;