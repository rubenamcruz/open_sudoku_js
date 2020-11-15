import React from 'react';
import AnnotationButton from '../buttons/annotationButton.js';
import ActionButton from '../buttons/actionButton.js';
import NumberedButtonGrid from '../buttons/numberedButtonGrid.js'
import ColoredButtonGrid from '../buttons/coloredButtonGrid.js'
import { annotationType, annotationText, colorMap } from '../utils/annotations';

class ButtonField extends React.Component {

    render() {
        let inputGrid;
        if(!this.props.number_annotation){
            inputGrid = <ColoredButtonGrid onClick={(number) => this.props.colorBehaviour(number)} ></ColoredButtonGrid>;
        }else{
            inputGrid = <NumberedButtonGrid onClick={(number) => this.props.numberBehaviour(number)} ></NumberedButtonGrid>
        }
        return (
            <div className="button-div"> 
            <div className="button-grid">
                <div style={{display: "inline-block"}}>
                    <AnnotationButton name={"number"}
                        onClick={() => this.props.setButtonAnnotation(annotationType.NUMBER)}
                        key_annotation={this.props.key_annotation}
                        button_annotation={this.props.button_annotation} />
                    <div>
                        <AnnotationButton name={"center"}
                            onClick={() => this.props.setButtonAnnotation(annotationType.CENTER)}
                            key_annotation={this.props.key_annotation}
                            button_annotation={this.props.button_annotation} />
                    </div>
                    <div>
                        <AnnotationButton name={"corner"}
                            onClick={() => this.props.setButtonAnnotation(annotationType.CORNER)}
                            key_annotation={this.props.key_annotation}
                            button_annotation={this.props.button_annotation} />
                    </div>
                    <div>
                        <AnnotationButton name={"color"}
                            onClick={() => this.props.setButtonAnnotation(annotationType.COLOR)}
                            key_annotation={this.props.key_annotation}
                            button_annotation={this.props.button_annotation} />
                    </div>
                </div>
                <div style={{display: "inline-block"}}>
                    {inputGrid}
                    <ActionButton name='delete' onClick={() => console.log("delete")} extraClass="wide" />
                </div>
                <div style={{display: "block"}}>
                    <div>
                    <ActionButton name={"undo"}
                            onClick={() => console.log("undo")}
                            extraClass="half-full-width" />
                    <ActionButton name={"redo"}
                            onClick={() => console.log("redo")} 
                            extraClass="half-full-width" />
                    </div>
                    <div>
                        <ActionButton name='check' 
                            onClick={() => this.props.checkSolution()} title="Check if solution is valid" 
                            extraClass="half-full-width" />
                        <ActionButton name='clear'
                            onClick={() => this.props.clearConflicts()}
                            title="Clear conflict annotation"  
                            extraClass="half-full-width" />
                    </div>
                    <div>
                        <ActionButton name={"restart"}
                            onClick={() => console.log("restart")}
                            extraClass="wide" />
                    </div>
                </div>
                </div>
            </div>
        )
    }
}



export default ButtonField;
