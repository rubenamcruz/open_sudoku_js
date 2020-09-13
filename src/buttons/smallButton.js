import React from 'react';


class SmallButton extends React.Component{

    render(){
        return (
            <button className="button-unselected small" onClick={this.props.onClick}
                title={this.props.title}>
                    {this.props.name}
            </button>
        )
    }

}

export default SmallButton;