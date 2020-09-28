import React from 'react';
import Board from '../game/board.js';
import ButtonField from '../game/buttonField.js';
import NavBar from '../game/navbar.js';
import { annotationType, annotationText, colorMap } from '../utils/annotations';
import global_verifier from '../utils/sudoku_verifier.js';
import {column_rule, line_rule, square_rule} from '../utils/rules/basic_rules.js';

class Game extends React.Component {

    constructor(props) {
        super(props);
        let squares = null;
        let locked = null;
        let center_values = null;
        let corner_values = null;
        let color_values = null;
        let conflicts = null;
        if (this.props.puzzle != null) {
            squares = this.props.puzzle;
            locked = this.props.puzzle.map(x => x.map(y => y != null));
            conflicts = this.props.puzzle.map(x => x.map(y => false));
            center_values = this.props.puzzle.map(x => x.map(y => this.emptyValues()));
            corner_values = this.props.puzzle.map(x => x.map(y => this.emptyValues()));
            color_values = this.props.puzzle.map(x => x.map(y => colorMap[1]));
        } else {
            squares = Array(9).fill(null);
            locked = Array(9).fill(null);
            center_values = Array(9).fill(null);
            corner_values = Array(9).fill(null);
            color_values = Array(9).fill(null);
            conflicts = Array(9).fill(null);
            for (let i = 0; i < 9; i++) {
                squares[i] = Array(9).fill(null);
                locked[i] = Array(9).fill(false);
                conflicts[i] = Array(9).fill(false);
                center_values[i] = Array(9).fill(this.emptyValues());
                corner_values[i] = Array(9).fill(this.emptyValues());
                color_values[i] = Array(9).fill(colorMap[1]);
            }
        }
        this.state = {
            squares: squares,
            locked: locked,
            selected: { line: null, column: null },
            center_values: center_values,
            corner_values: corner_values,
            color_values: color_values,
            conflicts: conflicts,
            button_annotation: annotationType.NONE,
            key_annotation: annotationType.NONE,
            finished: false
        };
    }

    emptyValues() {
        return { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false };
    }

    emptyBooleanGrid() {
        let value = Array(9).fill(null);
        for (let i = 0; i < 9; i++) {
            value[i] = Array(9).fill(false);
        }
        return value;
    }

    changeSelectedTile(line, column) {
        this.setState({ selected: { line: line, column: column } });
    }



    fillTheValues(key) {
        if (this.state.selected.line !== null && this.state.selected.column !== null && !this.state.locked[this.state.selected.line][this.state.selected.column]) {
            let squares = this.state.squares.slice();
            if (key >= 1 && key <= 9) {
                squares[this.state.selected.line][this.state.selected.column] = Number(key);
            }
            this.setState({ squares: squares });
        }
    }

    updateCenter(key) {
        if (this.state.selected.line !== null && this.state.selected.column !== null && !this.state.locked[this.state.selected.line][this.state.selected.column]) {
            let center_values = this.state.center_values.slice();
            if (key >= 1 && key <= 9) {
                center_values[this.state.selected.line][this.state.selected.column][Number(key)] = !center_values[this.state.selected.line][this.state.selected.column][Number(key)];
            }
            this.setState({ center_values: center_values });
        }
    }

    updateCorner(key) {
        if (this.state.selected.line !== null && this.state.selected.column !== null && !this.state.locked[this.state.selected.line][this.state.selected.column]) {
            let corner_values = this.state.corner_values.slice();
            if (key >= 1 && key <= 9) {
                corner_values[this.state.selected.line][this.state.selected.column][Number(key)] = !corner_values[this.state.selected.line][this.state.selected.column][Number(key)];
            }
            this.setState({ corner_values: corner_values });
        }
    }

    deleteValueOrAnnotations() {
        if (this.state.selected.line !== null && this.state.selected.column !== null && !this.state.locked[this.state.selected.line][this.state.selected.column]) {
            if (this.state.squares[this.state.selected.line][this.state.selected.column]) {
                let squares = this.state.squares.slice();
                squares[this.state.selected.line][this.state.selected.column] = null;
                this.setState({ squares: squares });
            } else {
                let corner_values = this.state.corner_values.slice();
                let center_values = this.state.center_values.slice();
                corner_values[this.state.selected.line][this.state.selected.column] = this.emptyValues();
                center_values[this.state.selected.line][this.state.selected.column] = this.emptyValues();
                this.setState({ corner_values: corner_values });
                this.setState({ center_values: center_values });
            }
        }
    }


    chooseAction(event) {
        if (event.ctrlKey) {
            this.setState({ key_annotation: annotationType.CENTER });
        }
        else if (event.shiftKey) {
            this.setState({ key_annotation: annotationType.CORNER });
        }

        if (event.key === 'Delete') {
            this.deleteValueOrAnnotations();
        }
        else {
            this.applyAction(event.keyCode - 48);
        }
    }

    applyAction(number) {
        if ((this.state.button_annotation === annotationType.CENTER && this.state.key_annotation === annotationType.NONE) ||
            this.state.key_annotation === annotationType.CENTER) {
            this.updateCenter(number);
        }
        else if ((this.state.button_annotation === annotationType.CORNER && this.state.key_annotation === annotationType.NONE) ||
            this.state.key_annotation === annotationType.CORNER) {
            this.updateCorner(number);
        }
        else {
            this.fillTheValues(number)
        }
    }

    liftState(event) {
        if (event.key === "Control" || event.key === "Shift") {
            this.setState({ key_annotation: annotationType.NONE });
        }
    }

    render() {
        return (
            <div style={{height:"100%"}}>
            <NavBar finished={this.state.finished}/>
            <div tabIndex={0} onKeyDown={(event) => { event.preventDefault(); this.chooseAction(event) }}
                onKeyUp={(event) => { this.liftState(event) }} className="board">
                <div style={{width: "50%", float:"left"}}>
                <Board
                    squares={this.state.squares}
                    selected={this.state.selected}
                    locked={this.state.locked}
                    center_values={this.state.center_values}
                    corner_values={this.state.corner_values}
                    color_values={this.state.color_values}
                    conflicts={this.state.conflicts}
                    changeSelectedTile={(line, column) => this.changeSelectedTile(line, column)} />
                    </div>
                    <div className="button-div">
                    <ButtonField
                        number_annotation={!(this.state.key_annotation === annotationType.NONE && this.state.button_annotation === annotationType.COLOR)}
                        numberBehaviour={(number) => this.applyAction(number)}
                        colorBehaviour={(number) => this.colorMeSoftly(number)}
                        setButtonAnnotation={(annotationType) => this.setButtonAnnotation(annotationType)}
                        key_annotation={this.state.key_annotation}
                        button_annotation={this.state.button_annotation}
                        checkSolution={() => this.checkSolution()}
                        clearConflicts={() => this.setState({ conflicts: this.emptyBooleanGrid() })}
                    />
                    </div>
            </div>
            </div>
        )
    }

    colorMeSoftly(number) {
        if (this.state.selected.line !== null && this.state.selected.column !== null) {
            let color_values = this.state.color_values.slice();
            color_values[this.state.selected.line][this.state.selected.column] = number;
            this.setState({ color_values: color_values });
        }
    }

    getButtonClass(button_type) {
        if ((this.state.key_annotation === annotationType.NONE && annotationText[this.state.button_annotation] === button_type) ||
            annotationText[this.state.key_annotation] === button_type) {
            return "button-selected"
        }
        return "button-unselected";
    }

    setButtonAnnotation(newAnnotationType) {

        if (this.state.button_annotation === newAnnotationType) {
            this.setState({ button_annotation: annotationType.NONE });
        } else {
            this.setState({ button_annotation: newAnnotationType });
        }
    }

    checkSolution() {
        let results = global_verifier(this.state.squares, [column_rule, line_rule, square_rule]);
        if (results.length === 0) {
            if(this.checkIfThereIsNoNullValues()){
                this.setState({finished: true});
                alert("Good Job!");
            }else{
                alert("Sounds all right so far!");
            }
        } else {
            let conflicts = this.emptyBooleanGrid();
            for (let result of results) {
                conflicts[result.line][result.column] = true;
            }
            this.setState({ conflicts: conflicts });
            alert("There are conflicts");
        }
    }

    checkIfThereIsNoNullValues(){
        for(let line of this.state.squares){
            for(let elem of line){
                if(elem == null){
                    return false;
                }
            }
        }
        return true;
    }


}



export default Game;
