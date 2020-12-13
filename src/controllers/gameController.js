import React from 'react';
import {
    useLocation
} from "react-router-dom";
import Game from '../views/game.js';
import { getSudokuById} from "../data/sudokuDataAccesser.js";

//todo: fix memory leak
function GameController(props) {
    let query = useQuery();
    let sudokuId = query.get("id");
    return (<Game sudokuId={sudokuId}/>);
}

function useQuery() {
    const location = useLocation();
    return new URLSearchParams(location.search);
}


export default GameController;
