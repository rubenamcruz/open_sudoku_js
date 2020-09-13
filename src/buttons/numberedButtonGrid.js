import React from 'react';
import SquareButton from './squareButton.js'

class NumberedButtonGrid extends React.Component{

    render(){
        return (
            <div>
                <div style={{clear:"right"}}>
                    <SquareButton name='1' title="" onClick={() => this.props.onClick(1)}/>
                    <SquareButton name='2' title="" onClick={() => this.props.onClick(2)}/>
                    <SquareButton name='3' title="" onClick={() => this.props.onClick(3)}/>
                </div>

                <div style={{clear:"right"}}>
                    <SquareButton name='4' title="" onClick={() => this.props.onClick(4)}/>
                    <SquareButton name='5' title="" onClick={() => this.props.onClick(5)}/>
                    <SquareButton name='6' title="" onClick={() => this.props.onClick(6)}/>
                </div>

                <div style={{clear:"right"}}>
                    <SquareButton name='7' title="" onClick={() => this.props.onClick(7)}/>
                    <SquareButton name='8' title="" onClick={() => this.props.onClick(8)}/>
                    <SquareButton name='9' title="" onClick={() => this.props.onClick(9)}/>
                </div>

            </div>
        )
    }

}

export default NumberedButtonGrid;