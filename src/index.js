import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/squares.css';



class Square extends React.Component{
    render() {
        return (
        <button className={this.getClassValue()}>
            {this.props.value}
        </button>
        )
    }


    getClassValue(){
        let value = "square ";
        
        if(this.props.line === 1){
            value += "square_top_outer_bold ";
        }else if(this.props.line%3 === 1){
            value += "square_top_bold ";
        }else{
            value += "square_top_border ";
        }

        if(this.props.line === 9){
            value += "square_bottom_outer_bold ";
        } else if(this.props.line%3 === 0){
            value += "square_bottom_bold ";
        } else{
            value += "square_bottom_border ";
        }

        if(this.props.column === 1){
            value += "square_left_outer_bold ";
        } else if(this.props.column%3 === 1){
            value += "square_left_bold ";
        } else{
            value += "square_left_border ";
        }

        if(this.props.column === 9){
            value += "square_right_outer_bold ";
        } else if(this.props.column%3 === 0){
            value += "square_right_bold ";
        } else{
            value += "square_right_border ";
        }

        return value;

    }
}


class Board extends React.Component{

    constructor(props) {
        super(props);
      }

    renderSquare(line, column){
        return(
        <Square line={line} column={column}/>
        )
    }

    renderLine(line_number){
        return (
          <div className="board-row">
            {this.renderSquare(line_number, 1)}
            {this.renderSquare(line_number, 2)}
            {this.renderSquare(line_number, 3)}
            {this.renderSquare(line_number, 4)}
            {this.renderSquare(line_number, 5)}
            {this.renderSquare(line_number, 6)}
            {this.renderSquare(line_number, 7)}
            {this.renderSquare(line_number, 8)}
            {this.renderSquare(line_number, 9)}
        </div>
        )
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


class Page extends React.Component {
    

    render() {
      return (
        <div className="page-class" >
            <Board />
        </div>
      );
    }
  }




ReactDOM.render(
    <Page />,
    document.getElementById('root')
  );
  