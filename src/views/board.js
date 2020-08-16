import React from 'react';
import Square from '../squares/square.js';

class Board extends React.Component{

    constructor(props) {
        super(props);
        let squares = null;
        let locked = null;
        if(this.props.puzzle != null){
            squares = this.props.puzzle;
            locked = this.props.puzzle.map(x => x.map(y => y != null));
        } else{
            squares = Array(9).fill(null);
            locked = Array(9).fill(null);
            for(let i = 0; i < 9; i++){
                squares[i] = Array(9).fill(null);
                locked[i] = Array(9).fill(false);
            }
        }
        this.state = {
          squares: squares,
          locked: locked,
          selected: {line: null, column: null}
        };
      }

    renderSquare(line, column, value){
        let selected = this.state.selected.line === line-1 && this.state.selected.column === column-1; 
        let locked = this.state.locked[line-1][column-1];
        let centerValues = line == 1 && column == 1 ? [1, 2, 3, 4, ] : [];
        return(
        <Square line={line} column={column} value={value} 
            selected = {selected}
            locked = {locked}
            centerValues = {centerValues}
            onClick={() => this.changeSelectedTile(line-1, column-1)}/>
        )
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

    render(){
        return (
            <div onKeyPress={(event) => this.fillTheValues(event.key)}>
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
        
        )
    }
}

export default Board;
