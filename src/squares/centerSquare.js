import React from 'react';


class CenterSquare extends React.Component{
    render() {
        let result_numbers = "";
        let input_numbers = this.props.values;
        if(input_numbers != null){
            for(let i = 0; i < input_numbers.length; i++){
                result_numbers += input_numbers[i];
            }
        }
        return (
            <div className="center_square" >
                {result_numbers}
            </div>
        )
    }
}

export default CenterSquare;