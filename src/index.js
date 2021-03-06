import React from 'react';
import ReactDOM from 'react-dom';

import GameController from './controllers/gameController.js';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GameListController from './controllers/gameListController.js';





class Page extends React.Component {



    render() {
      return (
        <Router>
          <Switch>
              <Route exact path="/">
                <GameListController/>
              </Route>
    
              <Route path="/game">
                <GameController />
              </Route>
          </Switch>
        </Router>
      )
    }
  }




ReactDOM.render(
    <Page />,
    document.getElementById('root')
    /** todo: create several pages */
  );
  