import React from 'react';
import Games from '../games/games.json';
import {Link} from "react-router-dom";
import {getSudokuList} from '../data/sudokuDataAccesser.js'; 

class GameList extends React.Component {

    constructor(){
        super();
        this.state = {data: []};
    }

    async componentDidMount(){
        let sudokus = await getSudokuList();
        this.setState({data: sudokus} );
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