import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './container/Home';
import Join from './container/Join';
import Login from './container/Login';
import withAuth from './components/withAuth';
import InitialLoading from './components/InitialLoading';
import { logOut } from './actions';
import Game from './container/Game';
import SeekWaiting from './components/SeekWaiting';

function App() {
  const dispatch = useDispatch();
  const initialLoading = useSelector(state => state.initialLoading);
  const onClick = () => {
    dispatch(logOut);
  };
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
