import React from 'react';
import AnnotationButton from '../buttons/annotationButton.js';
import ActionButton from '../buttons/actionButton.js';
import NumberedButtonGrid from '../buttons/numberedButtonGrid.js'
import ColoredButtonGrid from '../buttons/coloredButtonGrid.js'
import { annotationType, annotationText, colorMap } from '../utils/annotations';

class ButtonField extends React.Component {

    constructor(props) {
        super(props);
        this.state = { restart: false };

        this.restartButton = <ActionButton name={"restart"}
            onClick={() => this.switchRestartWithConfirmationButton()}
            extraClass="wide" />;

        this.confirmRestartButton = <ActionButton name={"Are you sure?"}
            onClick={() => {this.props.restartGame(); this.setRestartButton()}}
            extraClass="wide warning" />;
    }

    render() {
        let inputGrid;
        if (!this.props.number_annotation) {
            inputGrid = <ColoredButtonGrid onClick={(number) => this.props.colorBehaviour(number)} ></ColoredButtonGrid>;
        } else {
            inputGrid = <NumberedButtonGrid onClick={(number) => this.props.numberBehaviour(number)} ></NumberedButtonGrid>
        }

        let restart = this.state.restart ? this.confirmRestartButton : this.restartButton;

        return (
            <div className="button-div">
                <div className="button-grid">
                    <div onClick={() => this.setRestartButton()}>
                        <div style={{ display: "inline-block" }}>
                            <AnnotationButton name={"number"}
                                onClick={() => this.props.changeAction(annotationType.NUMBER)}
                                currentAction={this.props.currentAction} />
                            <div>
                                <AnnotationButton name={"center"}
                                    onClick={() => this.props.changeAction(annotationType.CENTER)}
                                    currentAction={this.props.currentAction} />
                            </div>
                            <div>
                                <AnnotationButton name={"corner"}
                                    onClick={() => this.props.changeAction(annotationType.CORNER)}
                                    currentAction={this.props.currentAction} />
                            </div>
                            <div>
                                <AnnotationButton name={"color"}
                                    onClick={() => this.props.changeAction(annotationType.COLOR)}
                                    currentAction={this.props.currentAction} />
                            </div>
                        </div>
                        <div style={{ display: "inline-block" }}>
                            {inputGrid}
                            <ActionButton name='delete' onClick={() => this.props.deleteBehaviour()} extraClass="wide" />
                        </div>
                        <div style={{ display: "block" }}>
                            <div>
                                <ActionButton name={"undo"}
                                    onClick={() => this.props.undoBehaviour()}
                                    extraClass="half-full-width" />
                                <ActionButton name={"redo"}
                                    onClick={() => this.props.redoBehaviour()}
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
                        </div>
                    </div>

                    <div>
                        {restart}
                    </div>
                </div>
            </div>
        )
    }

    switchRestartWithConfirmationButton() {
        this.setState({ restart: true });
    }

    setRestartButton() {
        this.setState({ restart: false });
    }
}



export default ButtonField;
