//rules should be a list of methods we call on each iteration
function global_verifier(grid, rules){
    let colisions = []
    for(let line = 0; line <9; line++){
        for(let column=0; column <9; column++){
            let square_result = checkSquare(grid, line, column, rules);
            if(square_result != null){
                colisions = colisions.concat(square_result);
            }
        }
    }
    return colisions;
}

function checkSquare(grid, line, column, rules){
    let colisions = [];
    if(grid[line][column] == null){
        return colisions;
    }
    for(let j=column+1; j < 9; j++){
        for(let rule of rules){
            if(!rule(grid, line, column, line, j)){
                colisions.push({line: line, column:j});
            }
        }
    }
    for(let l=line+1; l < 9; l++){
        for(let c=0; c < 9; c++){
            for(let rule of rules){
                if(!rule(grid, line, column, l, c)){
                    colisions.push({line: l, column:c});
                }   
            }
        }
    }

    if(colisions.length > 0){
        colisions.push({line: line, column:column});
    }
    return colisions;
}

export default global_verifier;