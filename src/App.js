import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './container/Home';
import Join from './container/Join';
import Login from './container/Login';
import withAuth from './components/withAuth';
import InitialLoading from './components/InitialLoading';
import { logOut, loadingApp } from './actions';
import Game from './container/Game';
import './App.scss';

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
        <>
          <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/join">Join</Link>
            <button onClick={onClick}>로그아웃</button>
          </div>
          <Switch>
            <Route exact path="/" component={withAuth(Home)} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/join" component={Join} />
            <Route exact path="/game" component={withAuth(Game)} />
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
