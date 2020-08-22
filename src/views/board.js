import React from 'react';
import Square from '../squares/square.js';
import global_verifier from '../utils/sudoku_verifier';
import {column_rule, line_rule, square_rule} from '../utils/rules/basic_rules';


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
          center: false
        };
      }

    renderSquare(line, column, value){
        let selected = this.state.selected.line === line-1 && this.state.selected.column === column-1; 
        let locked = this.state.locked[line-1][column-1];
        let centerValues = this.state.center_values[line-1][column-1];
        let cornerValues = this.state.corner_values[line-1][column-1];
        let conflicts = this.state.conflicts[line-1][column-1];
        return(
        <Square line={line} column={column} value={value} 
            selected = {selected}
            locked = {locked}
            centerValues = {centerValues}
            cornerValues = {cornerValues}
            conflicts = {conflicts}
            onClick={() => this.changeSelectedTile(line-1, column-1)}/>
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
            {this.renderSquare(line_number, 1, this.state.squares[line_number-1][0])}
            {this.renderSquare(line_number, 2, this.state.squares[line_number-1][1])}
            {this.renderSquare(line_number, 3, this.state.squares[line_number-1][2])}
            {this.renderSquare(line_number, 4, this.state.squares[line_number-1][3])}
            {this.renderSquare(line_number, 5, this.state.squares[line_number-1][4])}
            {this.renderSquare(line_number, 6, this.state.squares[line_number-1][5])}
            {this.renderSquare(line_number, 7, this.state.squares[line_number-1][6])}
            {this.renderSquare(line_number, 8, this.state.squares[line_number-1][7])}
            {this.renderSquare(line_number, 9, this.state.squares[line_number-1][8])}
        </div>
        )
    }


    fillTheValues(key){
        if(!this.state.locked[this.state.selected.line][this.state.selected.column]){
            let squares = this.state.squares.slice();
            if(key === 'Delete'){
                squares[this.state.selected.line][this.state.selected.column] = null;
            }else if(key >= '0' && key <= '9'){
                squares[this.state.selected.line][this.state.selected.column] = Number(key);
            }
            this.setState({squares: squares});
        }
    }
    
    updateCenter(key){
        if(!this.state.locked[this.state.selected.line][this.state.selected.column]){
            let center_values = this.state.center_values.slice();
            if(key === 'Delete'){
                center_values[this.state.selected.line][this.state.selected.column] = this.emptyValues();
            }else if(key >= '0' && key <= '9'){
                center_values[this.state.selected.line][this.state.selected.column][Number(key)] = !center_values[this.state.selected.line][this.state.selected.column][Number(key)];
            }
            this.setState({center_values: center_values});
        }
    }

    updateCorner(key){
        if(!this.state.locked[this.state.selected.line][this.state.selected.column]){
            let corner_values = this.state.corner_values.slice();
            if(key === 'Delete'){
                corner_values[this.state.selected.line][this.state.selected.column] = this.emptyValues();
            }else if(key >= '0' && key <= '9'){
                corner_values[this.state.selected.line][this.state.selected.column][Number(key)] = !corner_values[this.state.selected.line][this.state.selected.column][Number(key)];
            }
            this.setState({corner_values: corner_values});
        }
    }

    chooseAction(event){
        if(this.state.center){
            this.updateCenter(event.key);
        }
        else if(this.state.corner){
            this.updateCorner(event.key);
        }
        else{
            this.fillTheValues(event.key)
        }
    }

    render(){
        return (
            <div tabIndex={0} onKeyPress={(event) => {this.chooseAction(event)}}>
            <div>
               {this.renderLine(1)}
               {this.renderLine(2)}
               {this.renderLine(3)}
               {this.renderLine(4)}
               {this.renderLine(5)}
               {this.renderLine(6)}
               {this.renderLine(7)}
               {this.renderLine(8)}
               {this.renderLine(9)}
            </div>
            <br/>
            <div>
                <div style={{float:"left"}}>
                <button className={this.getButtonClass("center")} onClick={() => {this.setState({corner: false}); this.setState({center: !this.state.center})}}>
                    center
                </button>

                <button className={this.getButtonClass("corner")} onClick={() => 
                        {
                            this.setState({center: false});
                            this.setState({corner: !this.state.corner})
                        }}>
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
        if(button_type === "center"){
            return this.state.center ? "button-selected" : "button-unselected";
        }
        if(button_type === "corner"){
            return this.state.corner ? "button-selected" : "button-unselected";
        }
    }



}



export default Board;
