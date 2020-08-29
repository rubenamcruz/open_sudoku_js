import React from 'react';
import CenterSquare from './centerSquare.js';
import CornerSquare from './cornerSquare.js';

class Square extends React.Component{
    render() {
        if(this.props.value != null){
            return this.renderNumberedSquare();
        }else{
            return this.renderAnnotationNumberSquares();
        }
    }

    renderNumberedSquare(){
        return (
            <div className={this.getClassValue(this.props.color)} onClick={() => this.props.onClick()}>
                {this.props.value}
            </div>
        )
    }

    renderAnnotationNumberSquares(){
        return (
            <div className={this.getClassValue(this.props.color)} onClick={() => this.props.onClick()} style={{position:"relative"}} >
                <CenterSquare values={this.props.centerValues} />
                <CornerSquare values = {this.props.cornerValues} />
            </div>
          )
    }


    getClassValue(backgroundColor){
        let value = "square ";

        if(this.props.conflicts){
            value += "conflict ";
        }
        else if(this.props.selected){
            value += "selected ";
        }
        
        if(!this.props.locked){
            value += "not_locked ";
        }
        
        if(this.props.line === 0){
            value += "square_top_outer_bold ";
        }else if(this.props.line%3 === 0){
            value += "square_top_bold ";
        }else{
            value += "square_top_border ";
        }

        if(this.props.line === 8){
            value += "square_bottom_outer_bold ";
        } else if(this.props.line%3 === 2){
            value += "square_bottom_bold ";
        } else{
            value += "square_bottom_border ";
        }

        if(this.props.column === 0){
            value += "square_left_outer_bold ";
        } else if(this.props.column%3 === 0){
            value += "square_left_bold ";
        } else{
            value += "square_left_border ";
        }

        if(this.props.column === 8){
            value += "square_right_outer_bold ";
        } else if(this.props.column%3 === 2){
            value += "square_right_bold ";
        } else{
            value += "square_right_border ";
        }

        return value;

    }
}

export default Square;