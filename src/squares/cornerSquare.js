import React from 'react';


class CornerSquare extends React.Component{

    constructor(props){
        super(props);
        this.corner_square_position = {1: {top:"0px" , left:"0px"}, 
                                        2: {top:"0px",  left:"38px"}, 
                                        4: {top:"38px",  left:"0px"}, 
                                        3: {top:"38px",  left:"38px"}, 
                                        5: {top:"0px",  left:"19px"},
                                        6: {top:"38px",  left:"19px"},
                                        7: {top:"19px",  left:"0px"},
                                        8: {top:"19px",  left:"38px"},
                                        9: {top:"19px",  left:"19px"}};
    }

    render() {
        let cornerSquares = [];
        if(this.props.values){
            let key = 1;
            for(let i = 1; i <= 9; i++){
                if(this.props.values[i]){
                    cornerSquares.push(this.generateSingleCornerSquare(key++, i));
                }
            }
        }
        return (
            <div>
            {cornerSquares}
            </div>
        )
    }

    generateSingleCornerSquare(key, value){
        return (<div className="corner_square" key={key} style={this.corner_square_position[key]}>
                    {value}
                </div>)
    }
}

export default CornerSquare;