import React from 'react';
import Games from '../games/games.json';
import {Link} from "react-router-dom";

class GameList extends React.Component {

    render(){
        let count = 1;
        let game_list = Games.map(game => {
            let puzzle = game.board.toString().split(',').join('');
            return (<li key={count++} ><Link to={"/game?puzzle=" + puzzle}>{game.name}</Link></li>)
        });
        return(
            <ul>
                {game_list}
            </ul>
        )
    }
}

export default GameList;