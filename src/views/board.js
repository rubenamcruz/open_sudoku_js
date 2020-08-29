import React from 'react';
import Square from '../squares/square.js';
import global_verifier from '../utils/sudoku_verifier';
import {column_rule, line_rule, square_rule} from '../utils/rules/basic_rules';
import {annotationType, annotationText} from '../utils/annotations';

class Board extends React.Component{

    constructor(props) {
        super(props);
        let squares = null;
        let locked = null;
        let center_values = null;
        let corner_values = null;
        let conflicts = null;
        if(this.props.puzzle != null){
            squares = this.props.puzzle;
            locked = this.props.puzzle.map(x => x.map(y => y != null));
            conflicts = this.props.puzzle.map(x => x.map(y => false));
            center_values = this.props.puzzle.map(x => x.map(y => this.emptyValues()));
            corner_values = this.props.puzzle.map(x => x.map(y => this.emptyValues()));
        } else{
            squares = Array(9).fill(null);
            locked = Array(9).fill(null);
            center_values = Array(9).fill(null);
            corner_values = Array(9).fill(null);
            conflicts = Array(9).fill(null);
            for(let i = 0; i < 9; i++){
                squares[i] = Array(9).fill(null);
                locked[i] = Array(9).fill(false);
                conflicts[i] = Array(9).fill(false);
                center_values[i] = Array(9).fill(this.emptyValues());
                corner_values[i] = Array(9).fill(this.emptyValues());
            }
        }
        this.state = {
          squares: squares,
          locked: locked,
          selected: {line: null, column: null},
          center_values: center_values,
          corner_values: corner_values,
          conflicts: conflicts,
          button_annotation: annotationType.NONE,
          key_annotation: annotationType.NONE
        };
    }

    renderSquare(line, column){
        let value = this.state.squares[line][column];
        let selected = this.state.selected.line === line && this.state.selected.column === column; 
        let locked = this.state.locked[line][column];
        let centerValues = this.state.center_values[line][column];
        let cornerValues = this.state.corner_values[line][column];
        let conflicts = this.state.conflicts[line][column];
        return(
        <Square line={line} column={column} value={value} 
            selected = {selected}
            locked = {locked}
            centerValues = {centerValues}
            cornerValues = {cornerValues}
            conflicts = {conflicts}
            onClick={() => this.changeSelectedTile(line, column)}/>
        )
    }

    emptyValues(){
        return {1:false, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false, 9:false};
    }

    emptyBooleanGrid(){
        let value = Array(9).fill(null);
        for(let i=0; i < 9; i++){
            value[i] = Array(9).fill(false);
        }
        return value;
    }

    changeSelectedTile(line, column){
        this.setState({selected: {line: line, column: column}});
    }

    renderLine(line_number){
        return (
          <div className="board-row">
            {this.renderSquare(line_number, 0)}
            {this.renderSquare(line_number, 1)}
            {this.renderSquare(line_number, 2)}
            {this.renderSquare(line_number, 3)}
            {this.renderSquare(line_number, 4)}
            {this.renderSquare(line_number, 5)}
            {this.renderSquare(line_number, 6)}
            {this.renderSquare(line_number, 7)}
            {this.renderSquare(line_number, 8)}
        </div>
        )
    }


    fillTheValues(key){
        if(!this.state.locked[this.state.selected.line][this.state.selected.column]){
            let squares = this.state.squares.slice();
            if(key >= '0' && key <= '9'){
                squares[this.state.selected.line][this.state.selected.column] = Number(key);
            }
            this.setState({squares: squares});
        }
    }
    
    updateCenter(key){
        if(!this.state.locked[this.state.selected.line][this.state.selected.column]){
            let center_values = this.state.center_values.slice();
            if(key >= '0' && key <= '9'){
                center_values[this.state.selected.line][this.state.selected.column][Number(key)] = !center_values[this.state.selected.line][this.state.selected.column][Number(key)];
            }
            this.setState({center_values: center_values});
        }
    }

    updateCorner(key){
        if(!this.state.locked[this.state.selected.line][this.state.selected.column]){
            let corner_values = this.state.corner_values.slice();
            if(key >= '0' && key <= '9'){
                corner_values[this.state.selected.line][this.state.selected.column][Number(key)] = !corner_values[this.state.selected.line][this.state.selected.column][Number(key)];
            }
            this.setState({corner_values: corner_values});
        }
    }

    deleteValueOrAnnotations(){
        if(!this.state.locked[this.state.selected.line][this.state.selected.column]){
            if(this.state.squares[this.state.selected.line][this.state.selected.column]){
                let squares= this.state.squares.slice();
                squares[this.state.selected.line][this.state.selected.column] = null;
                this.setState({squares: squares});
            }else{
                let corner_values = this.state.corner_values.slice();
                let center_values = this.state.center_values.slice();
                corner_values[this.state.selected.line][this.state.selected.column] = this.emptyValues();
                center_values[this.state.selected.line][this.state.selected.column] = this.emptyValues();
                this.setState({corner_values: corner_values});
                this.setState({center_values: center_values});
            }
        }
    }


    chooseAction(key){

        if(key === 'Delete'){
            this.deleteValueOrAnnotations();
        }
        else if((this.state.button_annotation === annotationType.CENTER  && this.state.key_annotation === annotationType.NONE )||
                    this.state.key_annotation === annotationType.CENTER){
            this.updateCenter(key);
        }
        else if((this.state.button_annotation === annotationType.CORNER  && this.state.key_annotation === annotationType.NONE )||
            this.state.key_annotation === annotationType.CORNER){
            this.updateCorner(key);
        }
        else{
            this.fillTheValues(key)
        }
    }

    render(){
        return (
            <div tabIndex={0} onKeyPress={(event) => {this.chooseAction(event.key)}}>
            <div>
               {this.renderLine(0)}
               {this.renderLine(1)}
               {this.renderLine(2)}
               {this.renderLine(3)}
               {this.renderLine(4)}
               {this.renderLine(5)}
               {this.renderLine(6)}
               {this.renderLine(7)}
               {this.renderLine(8)}
            </div>
            <br/>
            <div>
                <div style={{float:"left"}}>
                <button className={this.getButtonClass("center")} onClick={() => this.setButtonAnnotation(annotationType.CENTER) }>
                    center
                </button>

                <button className={this.getButtonClass("corner")} onClick={() =>  this.setButtonAnnotation(annotationType.CORNER)}>
                    corner
                </button>
                </div>
                        <div style={{float:"left"}}>
                <button className="button-unselected small" onClick={() => 
                        {
                            let results = global_verifier(this.state.squares, [column_rule, line_rule, square_rule]);
                            if(results.length === 0){
                                alert("Sound all right!");
                            }else{
                                let conflicts = this.emptyBooleanGrid();
                                for(let result of results){
                                    conflicts[result.line][result.column] = true;
                                }
                                this.setState({conflicts: conflicts});
                                alert("There are conflicts");
                            }
                        }} title="Check if solution is valid">
                    check
                </button>
                <div>
                <button className="button-unselected small" onClick={() => this.setState({conflicts: this.emptyBooleanGrid()}) }
                        title="Clear conflict annotation">
                    clear
                </button>
                </div>
                </div>
            </div>
            </div>
        )
    }

    getButtonClass(button_type){
        if((this.state.key_annotation === annotationType.NONE && annotationText[this.state.button_annotation] === button_type) ||
            annotationText[this.state.key_annotation] === button_type){
            return "button-selected" 
        }
        return "button-unselected";
    }

    setButtonAnnotation(newAnnotationType){
        if(this.state.button_annotation === newAnnotationType){
            this.setState({button_annotation: annotationType.NONE});
        }else{
            this.setState({button_annotation: newAnnotationType});
        }
    }


}



export default Board;
