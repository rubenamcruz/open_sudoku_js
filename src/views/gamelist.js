import React from 'react';
import { getSudokuList, organizeSudokuByLevels } from '../data/sudokuDataAccesser.js';
import Navbar from '../navs/navbar.js';
import SideNavbar from '../navs/sideNavbar.js';
import Category from '../navs/items/category.js';
import Item from '../navs/items/item.js';
import Board from '../game/board.js';
import {parsePuzzle} from '../utils/sudokuParser.js';
import {initializeGame} from '../states/squareState.js';
import ActionButton from '../buttons/actionButton.js';

class GameList extends React.Component {

    constructor() {
        super();
        this.state = { data: [], error: null, board: null, gameRef: null };
    }

    componentDidMount() {
        console.log("let me see those puzzles");
        getSudokuList().then((sudokus) => {
            this.setState({ data: sudokus })
        }).catch((error) => {
            this.setState({ error: "Could Not Load Game List. Please try again!" });
            console.log(error);
        });
    }

    render() {
        let categoriesAndItems = this.processData();
        let previewBoard = this.state.board;
        let gameAccess = this.state.gameRef? <a className={"button-wrapper"} href={this.state.gameRef}><ActionButton extraClass={"widest"} name={"Play me!"}/></a> : null;
        return (
            <div>
                <Navbar children={""} />
                <div style={{ height: "96vh", display: "flex"}}>
                    <SideNavbar children={categoriesAndItems} />
                    <div className={"game-preview"}>
                            <div style={{display: "block"}}>
                            {previewBoard}
                            {gameAccess}
                            </div>
                    </div>
                </div>
            </div>
        )
    }

    createOrUpdatePreviewBoard(sudokuItem){
        let puzzle = parsePuzzle(sudokuItem.puzzle);
        this.setState({board: <Board squares={puzzle} />, gameRef: "/game?id=" + sudokuItem.sudoku_id })
    }


    processData(){
        if(this.state.data.length === 0){
            return "";
        }
        let sudokus = this.state.data;
        let categoriesAndItems = [];
        let level_name = sudokus[0].level;
        let level_id = sudokus[0].level_id;
        let items = [];
        for(let sudoku of sudokus ) {
            if(sudoku.level === level_name){
                items = items.concat(this.createItem(sudoku));
            }
            else{
                let category = <Category text={level_name} items={items.slice()} key={level_id}/>;
                categoriesAndItems = categoriesAndItems.concat(category);
                items = [];
                level_name = sudoku.level;
                level_id = sudoku.level_id;
                items = items.concat(this.createItem(sudoku));
            }
        }
        let category = <Category text={level_name} items={items} key={level_id}/>;
        categoriesAndItems = categoriesAndItems.concat(category);
        return categoriesAndItems;
    }

    createItem(sudoku){
        return  <Item text={sudoku.name} key={sudoku.id} onClick={() => this.createOrUpdatePreviewBoard(sudoku)}/>;
    }
}

export default GameList;