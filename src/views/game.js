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
        // todo: history over squares values; no history for selected squares; separate history for a single anotation
        let squares = null;
        let locked = null;
        let center_values = null;
        let corner_values = null;
        let color_values = null;
        let conflicts = null;
        let selected = this.emptyBooleanGrid();
        if (this.props.puzzle != null) {
            squares = this.props.puzzle;
            locked = this.props.puzzle.map(x => x.map(y => y != null));
            conflicts = this.props.puzzle.map(x => x.map(y => false));
            center_values = this.props.puzzle.map(x => x.map(y => this.emptyValues()));
            corner_values = this.props.puzzle.map(x => x.map(y => this.emptyValues()));
            color_values = this.props.puzzle.map(x => x.map(y => 1));
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
                color_values[i] = Array(9).fill(1);
            }
        }
        this.state = {
            squares: squares,
            locked: locked,
            selected: selected,
            center_values: center_values,
            corner_values: corner_values,
            color_values: color_values,
            conflicts: conflicts,
            button_annotation: annotationType.NONE,
            key_annotation: annotationType.NONE,
            finished: false,
            multipleSquareSelection: false
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
        let selected = null;
        if(this.state.multipleSquareSelection){
            selected = this.state.selected.slice();
        }else{
            selected = this.emptyBooleanGrid();
        }
        selected[line][column] = !selected[line][column];
        this.setState({ selected: selected });
    }



    fillSquareValues(key) {
        let squares = this.state.squares.slice();
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(this.state.selected[i][j] && !this.state.locked[i][j]){
                    if (key >= 1 && key <= 9) {
                        squares[i][j] = Number(key);
                    }
                }
            }    
        }
        this.setState({ squares: squares });
    }

    updateCenter(key) {
        let center_values = this.state.center_values.slice();
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(this.state.selected[i][j] && !this.state.locked[i][j]){
                    if (key >= 1 && key <= 9) {
                        center_values[i][j][Number(key)] = !center_values[i][j][Number(key)];
                    }
                }
            }    
        }
        this.setState({ center_values: center_values });
    }

    updateCorner(key) {
        let corner_values = this.state.corner_values.slice();
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(this.state.selected[i][j] && !this.state.locked[i][j]){
                    if (key >= 1 && key <= 9) {
                        corner_values[i][j][Number(key)] = !corner_values[i][j][Number(key)];
                    }
                }
            }    
        }
        this.setState({ corner_values: corner_values });
    }

    deleteValueOrAnnotations() {
        let squares = this.state.squares.slice();
        let corner_values = this.state.corner_values.slice();
        let center_values = this.state.center_values.slice();
            
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(this.state.selected[i][j] && !this.state.locked[i][j]){
                    if (squares[i][j]) {
                        squares[i][j] = null;
                    } else {
                        corner_values[i][j] = this.emptyValues();
                        center_values[i][j] = this.emptyValues();
                    }
                }
            }    
        }
        this.setState({ squares: squares, corner_values: corner_values, center_values: center_values });
    }


    chooseAction(event) {
        if (event.ctrlKey) {
            this.setState({ key_annotation: annotationType.CENTER, multipleSquareSelection: true });
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
            this.fillSquareValues(number)
        }
    }

    liftState(event) {
        if (event.key === "Control"){
            this.setState({ key_annotation: annotationType.NONE,  multipleSquareSelection: false });

        } 
        if(event.key === "Shift") {
            this.setState({ key_annotation: annotationType.NONE });
        }
    }

    render() {
        return (
            <div>
                <NavBar finished={this.state.finished} />
                <div className="main-area">
                    <div tabIndex={0} onKeyDown={(event) => { event.preventDefault(); this.chooseAction(event) }}
                        onKeyUp={(event) => { this.liftState(event) }} className="game-div">

                        <Board
                            squares={this.state.squares}
                            selected={this.state.selected}
                            locked={this.state.locked}
                            center_values={this.state.center_values}
                            corner_values={this.state.corner_values}
                            color_values={this.state.color_values}
                            conflicts={this.state.conflicts}
                            changeSelectedTile={(line, column) => this.changeSelectedTile(line, column)} />

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
        let color_values = this.state.color_values.slice();
        for(let i = 0;i < 9;  i++){
            for(let j=0; j<9; j++){
                if(this.state.selected[i][j]){
                    color_values[i][j] = number;
                }
            }
        }
        this.setState({ color_values: color_values });
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
