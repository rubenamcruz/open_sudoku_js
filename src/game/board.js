import React from 'react';
import Square from '../squares/square.js';

class Board extends React.Component {

    renderSquare(line, column) {
        let value = this.props.squares[line][column];
        let selected = this.props.selected[line][column];
        let locked = this.props.locked[line][column];
        let centerValues = this.props.center_values[line][column];
        let cornerValues = this.props.corner_values[line][column];
        let colorValue = this.props.color_values[line][column];
        let conflicts = this.props.conflicts[line][column];
        return (
            <Square line={line} column={column} value={value}
                selected={selected}
                locked={locked}
                centerValues={centerValues}
                cornerValues={cornerValues}
                conflicts={conflicts}
                color={colorValue}
                onClick={() => this.props.changeSelectedTile(line, column)} />
        )
    }

    renderLine(line_number) {
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


    render() {
        return (
            <div className="board">
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
        )
    }
}



export default Board;
