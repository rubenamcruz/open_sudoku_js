import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/squares.css';
import './css/buttons.css';
import './css/navbar.css';
import './css/clock.css';
import GameWrapper from './views/gameWrapper.js';
import GameList from './views/gamelist.js';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";





class Page extends React.Component {



    render() {
      return (
        <Router>
          <Switch>
              <Route exact path="/">
                <GameList/>
              </Route>
    
              <Route path="/game">
                <GameWrapper />
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
  