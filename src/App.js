import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Pages/Login';
import Jogo from './Pages/Jogo';
import Config from './Pages/Config';
import Feedback from './Pages/Feedback';

class App extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/jogo" component={ Jogo } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>

    );
  }
}

export default App;
