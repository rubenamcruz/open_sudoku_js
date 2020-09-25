import React from 'react';
import AnnotationButton from '../buttons/annotationButton.js';
import SmallButton from '../buttons/smallButton.js';
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
            <div style={{height: "225px"}}> 
                <div style={{ float: "left" }}>
                    <AnnotationButton name={"number"}
                        onClick={() => this.props.setButtonAnnotation(annotationType.NONE)}
                        key_annotation={this.props.key_annotation}
                        button_annotation={this.props.button_annotation} />
                    <div style={{ clear: "left" }}>
                        <AnnotationButton name={"center"}
                            onClick={() => this.props.setButtonAnnotation(annotationType.CENTER)}
                            key_annotation={this.props.key_annotation}
                            button_annotation={this.props.button_annotation} />
                    </div>
                    <div style={{ clear: "left" }}>
                        <AnnotationButton name={"corner"}
                            onClick={() => this.props.setButtonAnnotation(annotationType.CORNER)}
                            key_annotation={this.props.key_annotation}
                            button_annotation={this.props.button_annotation} />
                    </div>
                    <div style={{ clear: "left" }}>
                        <AnnotationButton name={"color"}
                            onClick={() => this.props.setButtonAnnotation(annotationType.COLOR)}
                            key_annotation={this.props.key_annotation}
                            button_annotation={this.props.button_annotation} />
                    </div>
                    <div>
                        <SmallButton name='check' onClick={() => this.props.checkSolution()} title="Check if solution is valid" />
                    </div>
                    <div>
                        <SmallButton onClick={() => this.props.clearConflicts()}
                            title="Clear conflict annotation" name='clear' />
                    </div>
                </div>
                <div style={{ float: "left" }}>
                    {inputGrid}
                </div>
            </div>
        )
    }
}



export default ButtonField;
