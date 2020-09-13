import React from 'react';
import SquareButton from './squareButton.js'

class ColoredButtonGrid extends React.Component{

    render(){
        return (
            <div>
                <div style={{clear:"right"}}>
                    <SquareButton name='' title="" color={1} onClick={() => this.props.onClick(1)}/>
                    <SquareButton name='' title="" color={2} onClick={() => this.props.onClick(2)}/>
                    <SquareButton name='' title="" color={3} onClick={() => this.props.onClick(3)}/>
                </div>

                <div style={{clear:"right"}}>
                    <SquareButton name='' title="" color={4} onClick={() => this.props.onClick(4)}/>
                    <SquareButton name='' title="" color={5} onClick={() => this.props.onClick(5)}/>
                    <SquareButton name='' title="" color={6} onClick={() => this.props.onClick(6)}/>
                </div>

                <div style={{clear:"right"}}>
                    <SquareButton name='' title="" color={7} onClick={() => this.props.onClick(7)}/>
                    <SquareButton name='' title="" color={8} onClick={() => this.props.onClick(8)}/>
                    <SquareButton name='' title="" color={9} onClick={() => this.props.onClick(9)}/>
                </div>

            </div>
        )
    }

}

export default ColoredButtonGrid;