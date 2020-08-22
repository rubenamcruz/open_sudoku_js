module.exports ={
    column_rule(grid, line1, column1, line2, column2){
        return column1 !== column2 || grid[line1][column1] !== grid[line2][column2];
    },
    line_rule(grid, line1, column1, line2, column2){
        return line1 !== line2 || grid[line1][column1] !== grid[line2][column2];
    },
    square_rule(grid, line1, column1, line2, column2){
        let square_line_1 = Math.floor(line1/3);
        let square_column_1 = Math.floor(column1/3);
    
        let square_line_2 = Math.floor(line2/3);
        let square_column_2 = Math.floor(column2/3);
        if(square_line_1 === square_line_2 && square_column_1 === square_column_2){
            return grid[line1][column1] !== grid[line2][column2]
        }
        return true;
    }
}