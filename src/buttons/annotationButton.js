import React from 'react';
import {annotationType, annotationText} from '../utils/annotations';



class AnnotationButton extends React.Component{

    render(){
        return (
            <button className={this.getButtonClass(this.props.name)} onClick={this.props.onClick}>
                    {this.props.name}
                </button>
        )
    }

    getButtonClass(button_type){
        let baseClass = "standard-button regular button-color "
        if(annotationText[0] === button_type){
            if(this.props.key_annotation === annotationType.NUMBER && this.props.button_annotation === annotationType.NUMBER){
                baseClass += "selected";
            }
        }
        else if ((this.props.key_annotation === annotationType.NUMBER && annotationText[this.props.button_annotation] === button_type) ||
            annotationText[this.props.key_annotation] === button_type){
            baseClass += "selected";
        }
        return baseClass;
    }


}

export default AnnotationButton;