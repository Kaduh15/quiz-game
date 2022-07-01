import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Pages/Login';
import Game from './Pages/Game';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

//

export default App;
