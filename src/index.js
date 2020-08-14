import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/squares.css';
import Board from './views/board.js';


class Page extends React.Component {
    

    render() {
      return (
        <div className="page-class" >
            <Board />
        </div>
      );
    }
  }




ReactDOM.render(
    <Page />,
    document.getElementById('root')
  );
  