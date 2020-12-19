const fetch = require("node-fetch");

const url = process.env.REACT_APP_API_URL;
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

