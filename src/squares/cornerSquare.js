import React from 'react';


class CornerSquare extends React.Component{

    render() {
        const corner_square_position = {1: {top:"0px" , left:"0px"}, 
                                        2: {top:"0px",  left:"38px"}, 
                                        4: {top:"38px",  left:"0px"}, 
                                        3: {top:"38px",  left:"38px"}, 
                                        5: {top:"0px",  left:"19px"},
                                        6: {top:"38px",  left:"19px"},
                                        7: {top:"19px",  left:"0px"},
                                        8: {top:"19px",  left:"38px"},
                                        9: {top:"19px",  left:"19px"}};

        return (
            <div className="corner_square" style={corner_square_position[this.props.order]}>
                {this.props.value}
            </div>
        )
    }
}

export default CornerSquare;