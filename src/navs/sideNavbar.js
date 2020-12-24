import React from 'react';

class SideNavbar extends React.Component {

    
    render(){
        return(
            <div className="sideNavbar">
                {this.props.children}
            </div>
        )
    }
}

export default SideNavbar;