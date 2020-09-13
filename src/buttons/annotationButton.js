import React from 'react';
import {annotationType, annotationText} from '../utils/annotations';



class AnnotationButton extends React.Component{

    render(){
        return (
            <button className={this.getButtonClass(this.props.name)} onClick={this.props.onClick}>
                    {this.props.name}
                    {this.props.annotationType}
                </button>
        )
    }

    getButtonClass(button_type){
        if((this.props.key_annotation === annotationType.NONE && annotationText[this.props.button_annotation] === button_type) ||
            annotationText[this.props.key_annotation] === button_type){
            return "button-selected" 
        }
        return "button-unselected";
    }


}

export default AnnotationButton;