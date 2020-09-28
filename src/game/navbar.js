import React from 'react';
import Clock from './clock.js';

class NavBar extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="navbar">
                <Clock finished={this.props.finished}/>
            </div>
        )
    }
}

export default NavBar;