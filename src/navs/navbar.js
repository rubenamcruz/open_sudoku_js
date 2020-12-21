import React from 'react';

class Navbar extends React.Component {

    
    render(){
        return(
            <div className="navbar">
                {this.props.children}
            </div>
        )
    }
}

export default Navbar;