import React from 'react';
import {annotationType, annotationText} from '../utils/annotations';



class ActionButton extends React.Component{

    render(){
        return (
            <button className={this.getButtonClass()} onClick={this.props.onClick} title={this.props.title ? this.props.title : ""}>
                    {this.props.name}
                </button>
        )
    }

    getButtonClass(){

        return "button-unselected " + this.props.extraClass;
    }


}

export default ActionButton;