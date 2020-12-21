import React from 'react';
import { Link } from "react-router-dom";
import { getSudokuList } from '../data/sudokuDataAccesser.js';
import Navbar from '../navs/navbar.js';

class GameList extends React.Component {

    constructor() {
        super();
        this.state = { data: [], error: null };
    }

    componentDidMount() {
        getSudokuList().then((sudokus) => {
            this.setState({ data: sudokus })
        }).catch((error) => {
            this.setState({ error: "Could Not Load Game List. Please try again!" });
            console.log(error);
        });
    }

    render() {
        let count = 1;
        let game_list = this.state.data.map(game => {
            let sudoku_id = game.sudoku_id;
            return (<li key={count++} ><Link to={"/game?id=" + sudoku_id}>{game.name}</Link></li>)
        });
        return (
            <div>
                <Navbar children={""} />
                <ul>
                    {game_list}
                </ul>
            </div>
        )
    }
}

export default GameList;