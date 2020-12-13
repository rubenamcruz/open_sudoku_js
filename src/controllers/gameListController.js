import React from 'react';
import {
    useLocation
} from "react-router-dom";
import GameList from '../views/gamelist.js';

//todo: fix memory leak
function GameListController(props) {
    return (<GameList />);
}

export default GameListController;
