const fetch = require("node-fetch");

const url = "http://localhost:3001/";
const sudokuListEndpoint = "sudoku/list";
const sudokuDetailsEndpoint = "sudoku/";

export async function getSudokuList(){
    let fetchResponse = await fetch(url + sudokuListEndpoint);
    let sudokuList = await fetchResponse.json();
    return sudokuList;
}


export async function getSudokuById(sudokuId){
    let fetchResponse = await fetch(url + sudokuDetailsEndpoint + sudokuId);
    let sudokuList = await fetchResponse.json();
    return sudokuList;
}

