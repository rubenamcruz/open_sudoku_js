import React from 'react';
import {Link} from "react-router-dom";
import {getSudokuList} from '../data/sudokuDataAccesser.js'; 

class GameList extends React.Component {

    constructor(){
        super();
        this.state = {data: []};
    }

    componentDidMount(){
        getSudokuList().then((sudokus) => { 
            console.log(sudokus); 
            this.setState({data: sudokus})
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        let count = 1;
        let game_list = this.state.data.map(game => {
            // let puzzle = game.puzzle.toString().split(',').join('');
            let sudoku_id = game.sudoku_id;
            return (<li key={count++} ><Link to={"/game?id=" + sudoku_id}>{game.name}</Link></li>)
        });
        return(
            <ul>
                {game_list}
            </ul>
        )
    }
}

export default GameList;