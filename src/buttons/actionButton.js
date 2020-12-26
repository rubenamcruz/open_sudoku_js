import React from 'react';
import {annotationType, annotationText} from '../utils/annotations';



class ActionButton extends React.Component{

    render(){
        return (
                <button id={this.props.id}  href={this.props.href} className={this.getButtonClass()} onClick={this.props.onClick} title={this.props.title ? this.props.title : ""}>
                        {this.props.name}
                    </button>
        )
        
    }

    getButtonClass(){

        return "standard-button button-color " + this.props.extraClass;
    }


}

export default ActionButton;