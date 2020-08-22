import React from 'react';
import CenterSquare from './centerSquare.js';
import CornerSquare from './cornerSquare.js';

class Square extends React.Component{
    render() {
        if(this.props.value != null){
            return this.renderNumberedSquare();
        }else{
            return this.generateMicroSquares();
        }
    }

    renderNumberedSquare(){
        return (
            <div className={this.getClassValue(this.props.color)} onClick={() => this.props.onClick()}>
                {this.props.value}
            </div>
        )
    }

    generateMicroSquares(){
        let centerSquare = <CenterSquare values={this.props.centerValues} />;
        let cornerSquares = [];
        if(this.props.cornerValues){
            let key = 1;
            for(let i = 1; i <= 9; i++){
                if(this.props.cornerValues[i]){
                    cornerSquares.push(<CornerSquare key={i} order={key++} value={i}/>);
                }
            }
        }

        return (
            <div className={this.getClassValue(this.props.color)} onClick={() => this.props.onClick()} style={{position:"relative"}} >
                {centerSquare}
                {cornerSquares}
            </div>
          )
    }


    getClassValue(backgroundColor){
        let value = "square ";

        if(this.props.selected){
            value += "selected ";
        }
        if(!this.props.locked){
            value += "not_locked ";
        }
        
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

export default Square;