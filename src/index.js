import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/squares.css';
import './css/buttons.css';
import Game from './views/game.js';


class Page extends React.Component {
    

    render() {
      return (
        <div className="page-class" >
            <Game puzzle={[[null,1, 6, null, null, null, 4, 3, 8], 
                            [3, 4, null, null, 9, 6, 2, null, null],
                            [8, null, null, null, null, null, 5, 6, null],
                            [1, null, null, null, 5, 3, null, null, null],
                            [5, null, 7, null, null, null, 3, null, 1],
                            [null, null, null, 6, 1, null, null, null, 5],
                            [null, 9, 1, null, null, null, null, null, 3],
                            [null, null, 3, 2, 8, null, null, 9, 4],
                            [7, 2, 8, null, null, null, 1, 5, null]]} />
        </div>
      );
    }
  }




ReactDOM.render(
    <Page />,
    document.getElementById('root')
    /** todo: create several pages */
  );
  