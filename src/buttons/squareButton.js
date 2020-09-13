import React from 'react';


class SquareButton extends React.Component{

    render(){
        return (
            <button className="button-square-unselected" onClick={this.props.onClick}
                title={this.props.title}>
                    {this.props.name}
            </button>
        )
    }

}

export default SquareButton;