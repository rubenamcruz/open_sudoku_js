import React from 'react';


class Square extends React.Component{
    render() {
        return (
        <button className={this.getClassValue()} onClick={() => this.props.onClick()}>
            {this.props.value}
        </button>
        )
    }


    getClassValue(){
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