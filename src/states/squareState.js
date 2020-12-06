import _ from 'lodash';

export function initializeGame(initial_values) {
    let puzzle = initial_values == null ? emptyMatrix() : initial_values.map(x => x.slice());

    let squares = puzzle;
    let locked = puzzle.map(x => x.map(y => y != null));
    let conflicts = puzzle.map(x => x.map(y => false));
    let center_values = puzzle.map(x => x.map(y => emptyValues()));
    let corner_values = puzzle.map(x => x.map(y => emptyValues()));
    let color_values = puzzle.map(x => x.map(y => 1));
    
    return {
        squares: squares,
        locked: locked,
        center_values: center_values,
        corner_values: corner_values,
        color_values: color_values,
        conflicts: conflicts,
    };
};

function emptyMatrix(){
    let matrix = Array(9).fill(null);
    for (let i = 0; i < 9; i++) {
        matrix[i] = Array(9).fill(null);
    }
    return matrix;
}



function emptyValues() {
    return { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false };
}


export function deepCopyOfObjectOrArray(state){
    let deepCopy = _.cloneDeep(state);
    return deepCopy;
}