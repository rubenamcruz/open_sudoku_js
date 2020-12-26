import React from 'react';

//todo: fix spacing so that every number fits the square
class CenterSquare extends React.Component{
    render() {
        return (
            <div className="center_square" >
                {this.centerNumberString()}
            </div>
        )
    }

    centerNumberString(){
        let input_numbers = this.props.values;
        let result_numbers = "";
        if(input_numbers){
            for(let i = 1; i <=9; i++){
                if(input_numbers[i]){
                    result_numbers += i;
                }
            }
        }
        return result_numbers;
    }

}

export default CenterSquare;