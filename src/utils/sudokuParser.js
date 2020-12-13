export function parsePuzzle(rawPuzzle) {
    let puzzle_numbers = rawPuzzle.split('').map(number => number === '0' ? null : parseInt(number));
    let puzzle = []
    let puzzle_row = []
    for (let elem of puzzle_numbers) {
        if (puzzle_row.length === 9) {
            puzzle = puzzle.concat([puzzle_row]);
            puzzle_row = []
        }
        puzzle_row = puzzle_row.concat(elem);
        
    }
    puzzle = puzzle.concat([puzzle_row]);
    return puzzle;
}
