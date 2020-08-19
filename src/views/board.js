import React from 'react';
import Square from '../squares/square.js';

class Board extends React.Component{

    constructor(props) {
        super(props);
        let squares = null;
        let locked = null;
        let center_values = null;
        if(this.props.puzzle != null){
            squares = this.props.puzzle;
            locked = this.props.puzzle.map(x => x.map(y => y != null));
            center_values = this.props.puzzle.map(x => x.map(y => this.emptyCenterValues()));
        } else{
            squares = Array(9).fill(null);
            locked = Array(9).fill(null);
            center_values = Array(9).fill(null);
            for(let i = 0; i < 9; i++){
                squares[i] = Array(9).fill(null);
                locked[i] = Array(9).fill(false);
                center_values[i] = Array(9).fill(this.emptyCenterValues());
            }
        }
        this.state = {
          squares: squares,
          locked: locked,
          selected: {line: null, column: null},
          center_values: center_values,
          center: false
        };
      }

    renderSquare(line, column, value){
        let selected = this.state.selected.line === line-1 && this.state.selected.column === column-1; 
        let locked = this.state.locked[line-1][column-1];
        let centerValues = this.state.center_values[line-1][column-1];
        return(
        <Square line={line} column={column} value={value} 
            selected = {selected}
            locked = {locked}
            centerValues = {centerValues}
            onClick={() => this.changeSelectedTile(line-1, column-1)}/>
        )
    }

    emptyCenterValues(){
        return {1:false, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false, 9:false};
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
        console.log("hello");
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
                center_values[this.state.selected.line][this.state.selected.column] = this.emptyCenterValues();
            }else if(key >= '0' && key <= '9'){
                center_values[this.state.selected.line][this.state.selected.column][Number(key)] = !center_values[this.state.selected.line][this.state.selected.column][Number(key)];
            }
            this.setState({center_values: center_values});
        }
    }

    chooseAction(event){
        if(this.state.center){
            this.updateCenter(event.key);
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
                <button className={this.getButtonClass()} onClick={() => this.setState({center: !this.state.center})}>
                    center
                </button>
            </div>
            </div>
        )
    }

    getButtonClass(){
        return this.state.center ? "button-selected" : "button-unselected";
    }
}

export default Board;
