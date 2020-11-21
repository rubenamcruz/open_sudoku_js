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
        if(annotationText[this.props.currentAction] === button_type){
            baseClass += "selected";
        }
        return baseClass;
    }


}

export default AnnotationButton;