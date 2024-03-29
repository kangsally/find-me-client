import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './container/Home';
import Join from './container/Join';
import Login from './container/Login';
import withAuth from './components/withAuth';
import InitialLoading from './components/InitialLoading';
import Game from './container/Game';

function App() {
  const initialLoading = useSelector(state => state.initialLoading);
  return (
    <div className="App">
      {!initialLoading ? (
        <InitialLoading />
      ) : (
        <Switch>
          <Route exact path="/" component={withAuth(Home)} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/game" component={withAuth(Game)} />
        </Switch>
      )}
    </div>
  );
}

export default App;
