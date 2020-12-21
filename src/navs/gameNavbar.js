import React from 'react';
import Clock from './items/clock.js';
import Navbar from './navbar.js';

class GameNavbar extends React.Component {

    
    render(){
        let clock = <Clock finished={this.props.finished}/>;
        return(
            <Navbar children={clock} />
        )
    }
}

export default GameNavbar;