import React from 'react';
import CenterSquare from './centerSquare.js';
import CornerSquare from './cornerSquare.js';
import { colorMap } from '../utils/annotations.js';

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

        
        
        if(!this.props.locked){
            value += "not_locked ";
        }
        
        if(this.props.line === 0 ){
            value += "square_top_border_bold ";
        }

        if(this.props.line === 8 || this.props.line%3 === 2){
            value += "square_bottom_border_bold ";
        } else{
            value += "square_bottom_border_regular ";
        }

        if(this.props.column === 0){
            value += "square_left_border_bold ";
        }

        if(this.props.column === 8 || this.props.column%3 === 2){
            value += "square_right_border_bold ";
        } else{
            value += "square_right_border_regular ";
        }
        

        
        if(this.props.conflicts){
            value += "conflict";
        }else if(backgroundColor){
            value += colorMap[backgroundColor];
        }
        if(this.props.selected){
            value += "_selected ";
        }
        return value;

    }
}

export default Square;