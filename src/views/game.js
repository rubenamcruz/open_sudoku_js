import React from 'react';
import Board from '../game/board.js';
import ButtonField from '../game/buttonField.js';
import GameNavbar from '../navs/gameNavbar.js';
import { annotationType, annotationText, colorMap } from '../utils/annotations';
import global_verifier from '../utils/sudoku_verifier.js';
import { column_rule, line_rule, square_rule } from '../utils/rules/basic_rules.js';
import {initializeGame, deepCopyOfObjectOrArray} from '../states/squareState.js'
import {getSudokuById} from "../data/sudokuDataAccesser.js";
import { parsePuzzle} from "../utils/sudokuParser";

class Game extends React.Component {

    constructor(props) {
        super(props);
        // todo: history over squares values; no history for selected squares; separate history for a single anotation
        this.state = {
            history: [initializeGame(null)],
            future: [],
            previous_action: null,
            current_action: annotationType.NUMBER,
            finished: false,
            multipleSquareSelection: false,
            selected: this.emptyBooleanGrid()
        }
        this.sudoku = null;
    }

    async componentDidMount(){
        let raw_sudoku = await getSudokuById(this.props.sudokuId);

        this.sudoku = parsePuzzle(raw_sudoku.puzzle);
        this.setState({history: [initializeGame(this.sudoku)]} );
    }

    restartGame(){
        this.setState({ history: [initializeGame(this.sudoku)]});
        this.setState({future: []});
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

    getCurrentBoardState(){
        return this.state.history[this.state.history.length -1];
    }

    getCopyOfBoardState(){
        return deepCopyOfObjectOrArray(this.state.history[this.state.history.length -1]);
    }

    updateCurrentState(newState){
        let newHistory = this.state.history.concat(newState)
        this.setState({history : newHistory, future: [] });
    }

    undoBehaviour() {
        if (this.state.history.length > 1) {
            let newHistory = deepCopyOfObjectOrArray(this.state.history);
            let newFuture = this.state.future.concat(newHistory.pop());
            this.setState({ history: newHistory, future: newFuture });
        }
    }

    redoBehaviour() {
        if (this.state.future.length > 0) {
            let newFuture = deepCopyOfObjectOrArray(this.state.future);
            let newHistory = this.state.history.concat(newFuture.pop());
            this.setState({ history: newHistory, future: newFuture });
        }
    }

    render() {
        return (
            <div>
                <GameNavbar finished={this.state.finished} />
                <div className="main-area">
                    <div tabIndex={0} onKeyDown={(event) => { event.preventDefault(); this.chooseKeyBasedAction(event) }}
                        onKeyUp={(event) => { this.removeKeyBasedAnnotation(event) }} className="game-div">

                        <Board
                            squares={this.getCurrentBoardState().squares}
                            selected={this.state.selected}
                            locked={this.getCurrentBoardState().locked}
                            center_values={this.getCurrentBoardState().center_values}
                            corner_values={this.getCurrentBoardState().corner_values}
                            color_values={this.getCurrentBoardState().color_values}
                            conflicts={this.getCurrentBoardState().conflicts}
                            changeSelectedTile={(line, column) => this.selectNewSquare(line, column)} />

                        <ButtonField
                            number_annotation={!(this.state.current_action === annotationType.COLOR)}
                            numberBehaviour={(number) => this.applyAction(number)}
                            deleteBehaviour={() => this.deleteSquareValueOrAnnotations()}
                            colorBehaviour={(number) => this.colorSelectedSquares(number)}
                            changeAction={(annotationType) => this.changeAction(annotationType)}
                            currentAction={this.state.current_action}
                            checkSolution={() => this.checkSolution()}
                            clearConflicts={() => this.clearConflicts()}
                            restartGame={() => this.restartGame()}
                            undoBehaviour={() => this.undoBehaviour()}
                            redoBehaviour={() => this.redoBehaviour()}
                        />
                    </div>
                </div>
            </div>
        )
    }

    chooseKeyBasedAction(event) {
        let previous_action = this.state.current_action;
        if (event.ctrlKey) {
            this.setState({ previous_action: previous_action, current_action: annotationType.CENTER, multipleSquareSelection: true });
        }
        else if (event.shiftKey) {
            this.setState({ previous_action: previous_action, current_action: annotationType.CORNER });
        }

        if (event.key === 'Delete') {
            this.deleteSquareValueOrAnnotations();
        }
        else if(parseInt(event.key) > 0 && parseInt(event.key) < 10){
            this.applyAction(event.key);
        }
    }

    removeKeyBasedAnnotation(event) {
        let current_action = this.state.previous_action;
        if (event.key === "Control") {
            this.setState({ current_action: current_action, previous_action: null, multipleSquareSelection: false });

        }
        if (event.key === "Shift") {
            this.setState({ current_action: current_action, previous_action: null });
        }
    }

    selectNewSquare(line, column) {
        let selectedSquares = this.state.multipleSquareSelection ? this.state.selected.map(row => row.slice()) : this.emptyBooleanGrid();
        selectedSquares[line][column] = !selectedSquares[line][column];
        this.setState({ selected: selectedSquares });
    }



    updateValues(key) {
        let stateCopy = this.getCopyOfBoardState();
        let squares = stateCopy.squares;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.state.selected[i][j] && !stateCopy.locked[i][j]) {
                    if (key >= 1 && key <= 9) {
                        squares[i][j] = Number(key);
                    }
                }
            }
        }
        this.updateCurrentState(stateCopy);
    }

    updateCenter(key) {
        let stateCopy = this.getCopyOfBoardState();
        let center_values = stateCopy.center_values;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.state.selected[i][j] && !stateCopy.locked[i][j]) {
                    if (key >= 1 && key <= 9) {
                        center_values[i][j][Number(key)] = !center_values[i][j][Number(key)];
                    }
                }
            }
        }
        this.updateCurrentState(stateCopy);
    }

    updateCorner(key) {
        let stateCopy = this.getCopyOfBoardState();
        let corner_values = stateCopy.corner_values;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.state.selected[i][j] && !stateCopy.locked[i][j]) {
                    if (key >= 1 && key <= 9) {
                        corner_values[i][j][Number(key)] = !corner_values[i][j][Number(key)];
                    }
                }
            }
        }
        this.updateCurrentState(stateCopy);
    }

    deleteSquareValueOrAnnotations() {
        let stateCopy = this.getCopyOfBoardState();
        let squares = stateCopy.squares;
        let corner_values = stateCopy.corner_values;
        let center_values = stateCopy.center_values;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.state.selected[i][j] && !stateCopy.locked[i][j]) {
                    if (squares[i][j]) {
                        squares[i][j] = null;
                    } else {
                        corner_values[i][j] = this.emptyValues();
                        center_values[i][j] = this.emptyValues();
                    }
                }
            }
        }
        this.updateCurrentState(stateCopy);
    }



    applyAction(number) {
        if (this.state.current_action === annotationType.CENTER) {
            this.updateCenter(number);
        }
        else if (this.state.current_action === annotationType.CORNER) {
            this.updateCorner(number);
        }
        else {
            this.updateValues(number)
        }
    }



    colorSelectedSquares(number) {
        let stateCopy = this.getCopyOfBoardState();
        let color_values = stateCopy.color_values;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.state.selected[i][j]) {
                    color_values[i][j] = number;
                }
            }
        }
        this.updateCurrentState(stateCopy);
    }


    changeAction(newAnnotationType) {
        if (this.state.previous_action == null) {
            if (this.state.current_action === newAnnotationType) {
                this.setState({ current_action: annotationType.NUMBER });
            } else {
                this.setState({ current_action: newAnnotationType });
            }
        } else {
            if (this.state.previous_action === newAnnotationType) {
                this.setState({ previous_action: annotationType.NUMBER });
            } else {
                this.setState({ previous_action: newAnnotationType });
            }
        }
    }

    checkSolution() {
        let results = global_verifier(this.getCurrentBoardState().squares, [column_rule, line_rule, square_rule]);
        if (results.length === 0) {
            if (this.checkIfThereIsNoNullValues()) {
                this.setState({ finished: true });
                alert("Good Job!");
            } else {
                alert("Sounds all right so far!");
            }
        } else {
            let stateCopy = this.getCopyOfBoardState();
            
            let conflicts = this.emptyBooleanGrid();
            for (let result of results) {
                conflicts[result.line][result.column] = true;
            }
            stateCopy.conflicts = conflicts;
            this.updateCurrentState(stateCopy);
            alert("There are conflicts");
        }
    }

    checkIfThereIsNoNullValues() {
        for (let line of this.getCurrentBoardState().squares) {
            for (let elem of line) {
                if (elem == null) {
                    return false;
                }
            }
        }
        return true;
    }

    clearConflicts(){
        let state = this.getCopyOfBoardState();
        state.conflicts = this.emptyBooleanGrid();
        this.updateCurrentState(state);
    }
    

}



export default Game;
