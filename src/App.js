import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Pages/Login';
import Jogo from './Pages/Jogo';
import Config from './Pages/Config';

class App extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/jogo" component={ Jogo } />
        <Route path="/config" component={ Config } />
      </Switch>

    );
  }
}

export default App;
