import React from 'react';
import {annotationType, annotationText, colorMap} from "../utils/annotations.js"

class SquareButton extends React.Component{

    render(){
        return (
            <button className={this.getButtonClass()} onClick={this.props.onClick}
                title={this.props.title}>
                    {this.props.name}
            </button>
        )
    }

    getButtonClass(){
        let button_class = "standard-button square-button ";
        if(this.props.color != null){
            button_class += colorMap[this.props.color];
        }else{
            button_class += "button-color"
        }
        return button_class;
    }

}

export default SquareButton;