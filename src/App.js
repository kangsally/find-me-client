import React, { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import withAuth from './components/withAuth';
import Home from './container/Home';
import Join from './container/Join';
import Login from './container/Login';
import { logOut, loadingApp } from './actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const initialLoading = useSelector(state => state.initialLoading);
  useEffect(() => {
    setTimeout(() => {
      dispatch(loadingApp);
    }, 7000);
    console.log(5)
  }, []);

  const onClick = () => {
    dispatch(logOut);
  };

  return (
    <div className="App">
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/join">Join</Link>
        <button onClick={onClick}>로그아웃</button>
      </div>
      {!initialLoading ? (
        <div>나를 찾아줘</div>
      ) : (
        <Switch>
          <Route path="/" exact component={withAuth(Home)} />
          <Route path="/login" component={Login} />
          <Route path="/join" component={Join} />
        </Switch>
      )}
    </div>
  );
}

export default App;
