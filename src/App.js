import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './components/withAuth';
import Home from './container/Home';
import Join from './container/Join';
import Login from './container/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <Link to="/home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/join">Join</Link>
      </div>

      <Switch>
        <Route path="/home" component={withAuth(Home)} />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
      </Switch>
    </div>
  );
}

export default App;
